#!/usr/bin/env python3
"""
Gera questões para o patito a partir dos HTMLs baixados da Edebe.

Usa Claude API (claude-haiku) para gerar questões de múltipla escolha,
verdadeiro/falso e preencher lacunas a partir do texto de cada capítulo.

Uso:
  python3 scripts/edebe/to_patito.py --html .cache/483.html --subject ciencias --topic cie-p2 --start-id 50
  python3 scripts/edebe/to_patito.py --html .cache/483.html --subject ciencias --topic cie-p2 --start-id 50 --count 10
  python3 scripts/edebe/to_patito.py --courseware 249 --topic cie-p2 --start-id 50

Saída: bloco JS pronto para colar em src/data/ciencias.js (ou historia.js, portugues.js)
"""

import json, sys, argparse, re
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from scraper import extract_text_from_html, CACHE_DIR
from token import get_token

SUBJECT_PREFIX = {
    'ciencias':  'ci',
    'historia':  'hi',
    'portugues': 'pt',
    'ingles':    'en',
    'matematica': 'ma',
}

QUESTION_PROMPT = """Você é um professor criando questões de quiz para um aluno do 4º ano do Ensino Fundamental.

Com base no texto abaixo, crie EXATAMENTE {count} questões variadas (mix de múltipla escolha, verdadeiro/falso e completar lacuna).

Regras:
- Português simples e claro para criança de 9-10 anos
- Cada questão deve ter exatamente 4 opções (ou ser true/false)
- Cobrir diferentes partes do texto
- Explicação curta em português (1-2 frases) dizendo por que a resposta é correta
- Não repetir o mesmo conceito
- Para questões de completar lacuna, usar ___ na pergunta

Retorne SOMENTE um array JSON válido, sem markdown, sem texto extra:
[
  {{
    "type": "multipleChoice",
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "correctIndex": 0,
    "explanation": "..."
  }},
  {{
    "type": "trueFalse",
    "question": "...",
    "correct": true,
    "explanation": "..."
  }},
  {{
    "type": "fillBlank",
    "question": "A ___ é responsável por...",
    "options": ["...", "...", "...", "..."],
    "correctIndex": 0,
    "explanation": "..."
  }}
]

TEXTO DO CAPÍTULO:
{text}
"""


def extract_text(html_path, max_chars=8000):
    """Extrai e limpa texto do HTML, truncando para caber no contexto."""
    text = extract_text_from_html(Path(html_path))
    # Remover linhas muito curtas (números de página, bullets soltos)
    lines = [l for l in text.split('\n') if len(l.strip()) > 10]
    text = '\n'.join(lines)
    return text[:max_chars]


def generate_questions(text, count, claude_client):
    """Chama Claude API para gerar questões a partir do texto."""
    prompt = QUESTION_PROMPT.format(count=count, text=text)
    resp = claude_client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = resp.content[0].text.strip()

    # Extrair JSON do response (às vezes vem com markdown code fence)
    json_match = re.search(r'\[[\s\S]*\]', raw)
    if not json_match:
        raise ValueError(f"Resposta não contém JSON válido:\n{raw[:200]}")
    return json.loads(json_match.group(0))


def assign_ids(questions, prefix, start_id):
    """Atribui IDs sequenciais às questões."""
    for i, q in enumerate(questions):
        q['id'] = f"{prefix}{start_id + i:03d}"
    return questions


def format_js(questions):
    """Formata questões para o formato JS do patito."""
    lines = []
    for q in questions:
        qid = q['id']
        qtype = q['type']

        if qtype == 'multipleChoice':
            opts = json.dumps(q['options'], ensure_ascii=False)
            lines.append(
                f"  {{ id: '{qid}', type: 'multipleChoice', "
                f"question: {json.dumps(q['question'], ensure_ascii=False)}, "
                f"options: {opts}, correctIndex: {q['correctIndex']}, "
                f"explanation: {json.dumps(q['explanation'], ensure_ascii=False)} }}"
            )
        elif qtype == 'trueFalse':
            correct = str(q['correct']).lower()
            lines.append(
                f"  {{ id: '{qid}', type: 'trueFalse', "
                f"question: {json.dumps(q['question'], ensure_ascii=False)}, "
                f"correct: {correct}, "
                f"explanation: {json.dumps(q['explanation'], ensure_ascii=False)} }}"
            )
        elif qtype == 'fillBlank':
            opts = json.dumps(q['options'], ensure_ascii=False)
            lines.append(
                f"  {{ id: '{qid}', type: 'fillBlank', "
                f"question: {json.dumps(q['question'], ensure_ascii=False)}, "
                f"options: {opts}, correctIndex: {q['correctIndex']}, "
                f"explanation: {json.dumps(q['explanation'], ensure_ascii=False)} }}"
            )

    return ',\n'.join(lines) + ','


def main():
    parser = argparse.ArgumentParser(description="Edebe HTML → Patito questions")
    parser.add_argument('--html', help='Caminho para o HTML baixado')
    parser.add_argument('--courseware', type=int, help='ID do courseware (usa todos os HTMLs do cache)')
    parser.add_argument('--subject', required=True,
                        choices=list(SUBJECT_PREFIX.keys()),
                        help='Matéria (ciencias, historia, portugues...)')
    parser.add_argument('--topic', required=True,
                        help='ID do tópico no patito (ex: cie-p2)')
    parser.add_argument('--start-id', type=int, required=True,
                        help='Número inicial dos IDs (ex: 50 → ci050, ci051...)')
    parser.add_argument('--count', type=int, default=10,
                        help='Número de questões por capítulo (padrão: 10)')
    parser.add_argument('--output', help='Arquivo de saída .js (padrão: stdout)')
    args = parser.parse_args()

    # Claude client
    try:
        import anthropic
        client = anthropic.Anthropic()
    except ImportError:
        print("ERRO: pip3 install anthropic", file=sys.stderr)
        sys.exit(1)

    prefix = SUBJECT_PREFIX[args.subject]
    current_id = args.start_id
    all_questions = []

    # Determinar quais HTMLs processar
    if args.html:
        html_files = [Path(args.html)]
    elif args.courseware:
        from scraper import load_chapter_map
        chapters = [c for c in load_chapter_map() if c['courseware_id'] == args.courseware]
        html_files = []
        for ch in chapters:
            for f in ch.get('files', []):
                content_id = f.get('content_id')
                if content_id:
                    p = CACHE_DIR / f"{content_id}.html"
                    if p.exists():
                        html_files.append(p)
    else:
        print("ERRO: forneça --html ou --courseware", file=sys.stderr)
        sys.exit(1)

    if not html_files:
        print("Nenhum HTML encontrado. Execute primeiro:")
        print("  python3 scripts/edebe/scraper.py")
        sys.exit(1)

    for html_path in html_files:
        print(f"Processando {html_path.name}...", file=sys.stderr)
        text = extract_text(html_path)
        if len(text) < 200:
            print(f"  Texto muito curto ({len(text)} chars) — pulando", file=sys.stderr)
            continue

        print(f"  {len(text)} chars de texto → gerando {args.count} questões...", file=sys.stderr)
        questions = generate_questions(text, args.count, client)
        questions = assign_ids(questions, prefix, current_id)
        current_id += len(questions)
        all_questions.extend(questions)
        print(f"  {len(questions)} questões geradas (IDs {questions[0]['id']}–{questions[-1]['id']})", file=sys.stderr)

    if not all_questions:
        print("Nenhuma questão gerada.", file=sys.stderr)
        sys.exit(1)

    js_block = format_js(all_questions)
    header = (
        f"// {len(all_questions)} questões geradas por Claude (Edebe HTML)\n"
        f"// Tópico: {args.topic} | IDs: {all_questions[0]['id']}–{all_questions[-1]['id']}\n"
        f"// Cole dentro do array questions do tópico '{args.topic}' em src/data/{args.subject}.js\n"
    )

    if args.output:
        Path(args.output).write_text(header + js_block)
        print(f"\n{len(all_questions)} questões salvas em {args.output}", file=sys.stderr)
    else:
        print(header)
        print(js_block)


if __name__ == '__main__':
    main()
