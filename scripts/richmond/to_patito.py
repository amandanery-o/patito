#!/usr/bin/env python3
"""
Converte questões brutas do scraper Richmond para o formato patito (ingles.js).
Usa Claude API para gerar explicações em português.

Uso:
  python3 scripts/richmond/to_patito.py --input /tmp/questions.json --topic ing-p2 --start-id 82
  python3 scripts/richmond/to_patito.py --input /tmp/questions.json --topic ing-p2 --start-id 82 --no-ai

Saída: imprime o bloco JS pronto para colar em src/data/ingles.js
"""

import json, re, argparse, sys
from pathlib import Path


def slugify_question(q):
    """Gera texto da questão no formato patito."""
    qtype = q.get('type', '')

    if qtype == 'choiceInteraction':
        return q.get('prompt') or q.get('instruction', '')

    if qtype in ('inlineChoice', 'dropdown'):
        ctx = q.get('context', '')
        resp_id = q.get('response_id', '')
        return ctx.replace(f'[DROPDOWN:{resp_id}]', '___').strip()

    if qtype in ('textEntry', 'gap_fill'):
        ctx = q.get('context', '')
        resp_id = q.get('response_id', '')
        return ctx.replace(f'[____:{resp_id}]', '___').strip()

    if qtype in ('associate', 'matching'):
        return q.get('instruction', 'Match the pairs.')

    return q.get('instruction', q.get('prompt', ''))


def make_explanation_simple(q):
    """Gera explicação básica em português sem IA."""
    qtype = q.get('type', '')
    correct = q.get('correct_texts') or q.get('correct') or []
    if isinstance(correct, str):
        correct = [correct]

    if qtype == 'choiceInteraction':
        return f"A resposta correta é: {', '.join(correct)}."

    if qtype in ('inlineChoice', 'dropdown'):
        return f"A palavra correta é: {', '.join(correct)}."

    if qtype in ('textEntry', 'gap_fill'):
        return f"Complete com: {', '.join(correct)}."

    if qtype in ('associate', 'matching'):
        pairs = q.get('correct_pairs', [])
        if pairs:
            p = [f"{a} ↔ {b}" for a, b in pairs] if isinstance(pairs[0], (list, tuple)) else pairs
            return "Pares corretos: " + "; ".join(p) + "."
        return "Combine os pares corretamente."

    return ""


def make_explanation_ai(q, claude_client):
    """Gera explicação em português usando Claude."""
    prompt = slugify_question(q)
    correct = q.get('correct_texts') or q.get('correct') or []
    if isinstance(correct, str):
        correct = [correct]

    choices_info = ""
    if 'choices' in q:
        choices_info = "\nOpções: " + ", ".join(c['text'] for c in q['choices'])

    msg = f"""Você está criando uma explicação didática em português para um quiz de inglês do Ensino Fundamental.

Questão: {prompt}{choices_info}
Resposta correta: {', '.join(str(c) for c in correct)}
Tipo: {q.get('type', '')}

Escreva UMA frase explicando por que a resposta correta está certa.
- Use português simples (aluno de ~10 anos)
- Máximo 2 frases
- Não repita a pergunta
- Explique o conceito gramatical se for relevante"""

    resp = claude_client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=150,
        messages=[{"role": "user", "content": msg}]
    )
    return resp.content[0].text.strip()


def q_to_patito(q, qid, use_ai=False, claude_client=None):
    """Converte uma questão bruta para o formato patito."""
    qtype = q.get('type', '')
    question_text = slugify_question(q)

    if not question_text:
        return None

    if use_ai and claude_client:
        explanation = make_explanation_ai(q, claude_client)
    else:
        explanation = make_explanation_simple(q)

    # multipleChoice
    if qtype == 'choiceInteraction':
        choices = q.get('choices', [])
        correct_ids = q.get('correct_ids', [])
        if not choices:
            return None
        texts = [c['text'] for c in choices]
        correct_idx = next((i for i, c in enumerate(choices) if c['id'] in correct_ids), 0)
        return {
            'id': qid,
            'type': 'multipleChoice',
            'question': question_text,
            'options': texts,
            'correctIndex': correct_idx,
            'explanation': explanation,
        }

    # fillBlank (inlineChoice / textEntry)
    if qtype in ('inlineChoice', 'dropdown', 'textEntry', 'gap_fill'):
        choices = q.get('choices', [])
        correct_ids = q.get('correct_ids', []) or q.get('correct', [])
        if not choices:
            # textEntry sem opções — pular ou criar trueFalse simples
            return None
        texts = [c['text'] for c in choices]
        correct_idx = next((i for i, c in enumerate(choices) if c['id'] in correct_ids), 0)
        return {
            'id': qid,
            'type': 'fillBlank',
            'question': question_text,
            'options': texts,
            'correctIndex': correct_idx,
            'explanation': explanation,
        }

    return None


def format_js_entry(entry):
    """Formata uma questão para o formato JS do patito."""
    if entry['type'] == 'multipleChoice':
        opts = json.dumps(entry['options'], ensure_ascii=False)
        return (
            f"  {{ id: '{entry['id']}', type: 'multipleChoice', "
            f"question: {json.dumps(entry['question'], ensure_ascii=False)}, "
            f"options: {opts}, correctIndex: {entry['correctIndex']}, "
            f"explanation: {json.dumps(entry['explanation'], ensure_ascii=False)} }}"
        )
    elif entry['type'] == 'fillBlank':
        opts = json.dumps(entry['options'], ensure_ascii=False)
        return (
            f"  {{ id: '{entry['id']}', type: 'fillBlank', "
            f"question: {json.dumps(entry['question'], ensure_ascii=False)}, "
            f"options: {opts}, correctIndex: {entry['correctIndex']}, "
            f"explanation: {json.dumps(entry['explanation'], ensure_ascii=False)} }}"
        )
    elif entry['type'] == 'trueFalse':
        return (
            f"  {{ id: '{entry['id']}', type: 'trueFalse', "
            f"question: {json.dumps(entry['question'], ensure_ascii=False)}, "
            f"correct: {str(entry['correct']).lower()}, "
            f"explanation: {json.dumps(entry['explanation'], ensure_ascii=False)} }}"
        )
    return ""


def main():
    parser = argparse.ArgumentParser(description="Richmond → Patito converter")
    parser.add_argument('--input', required=True, help='JSON de questões brutas')
    parser.add_argument('--topic', default='ing-p2', help='Topic ID no patito (ex: ing-p2)')
    parser.add_argument('--prefix', default='en', help='Prefixo dos IDs (ex: en → en082)')
    parser.add_argument('--start-id', type=int, default=82, help='Número inicial dos IDs')
    parser.add_argument('--no-ai', action='store_true', help='Não usar Claude API para explicações')
    parser.add_argument('--output', help='Arquivo de saída .js (default: stdout)')
    args = parser.parse_args()

    questions = json.loads(Path(args.input).read_text())

    claude_client = None
    use_ai = not args.no_ai
    if use_ai:
        try:
            import anthropic
            claude_client = anthropic.Anthropic()
            print("# Claude API ativa para explicações", file=sys.stderr)
        except ImportError:
            print("# anthropic não instalado — usando explicações simples", file=sys.stderr)
            use_ai = False

    entries = []
    counter = args.start_id
    for q in questions:
        qid = f"{args.prefix}{counter:03d}"
        entry = q_to_patito(q, qid, use_ai=use_ai, claude_client=claude_client)
        if entry:
            entries.append(entry)
            counter += 1

    if not entries:
        print("Nenhuma questão convertida.", file=sys.stderr)
        sys.exit(1)

    lines = [format_js_entry(e) for e in entries if format_js_entry(e)]
    output = "\n".join(lines) + ","

    if args.output:
        Path(args.output).write_text(output)
        print(f"# {len(entries)} questões salvas em {args.output}", file=sys.stderr)
    else:
        print(f"// {len(entries)} questões para o tópico '{args.topic}'")
        print(f"// Cole dentro do array do tópico em src/data/ingles.js")
        print(output)


if __name__ == '__main__':
    main()
