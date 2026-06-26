#!/usr/bin/env python3
"""
Richmond Studio → Patito scraper
Baixa conteúdo de atividades do Richmond Studio via Brave browser (AppleScript)
e converte para o formato de questões do patito.

Pré-requisitos:
  - Brave browser aberto e logado em richmondstudio.global
  - "View > Developer > Allow JavaScript from Apple Events" ativado no Brave
  - Python 3.9+

Uso:
  python3 scripts/richmond/scraper.py --unit 3 4 --output src/data/ingles.js
  python3 scripts/richmond/scraper.py --unit 3     (só Unit 3)
  python3 scripts/richmond/scraper.py --list        (lista atividades disponíveis)
"""

import subprocess, json, re, argparse
import xml.etree.ElementTree as ET
from pathlib import Path

# ── Configuração ────────────────────────────────────────────────────────────

COURSE_ID = "4adba760-d201-42c3-bcbc-02959ee3d356"
GROUP_ID  = "00000000-0000-1000-0000-000001251631"
USER_ID   = "00000000-0000-1000-0000-000015336842"
CONTENT_MAP = Path(__file__).parent / "content_map.json"
CACHE_DIR   = Path(__file__).parent / ".cache"

NS = "http://www.imsglobal.org/xsd/imsqti_v2p1"

# ── Brave / AppleScript ─────────────────────────────────────────────────────

def get_token_from_brave():
    """Lê accessToken do localStorage do Brave via AppleScript."""
    script = '''tell application "Brave Browser"
        repeat with w in windows
            repeat with t in tabs of w
                if URL of t contains "richmondstudio.global" then
                    return execute t javascript "localStorage.getItem('accessToken')"
                end if
            end repeat
        end repeat
    end tell'''
    r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=10)
    token = r.stdout.strip()
    if not token or token == 'missing value':
        raise RuntimeError(
            "Token não encontrado. Certifique-se que:\n"
            "1. Brave está aberto e logado em richmondstudio.global\n"
            "2. 'View > Developer > Allow JavaScript from Apple Events' está ativado"
        )
    return token


def run_in_brave(js_code):
    """Executa JavaScript síncrono no tab do Brave que tem richmondstudio.global."""
    script = f'''tell application "Brave Browser"
        repeat with w in windows
            repeat with t in tabs of w
                if URL of t contains "richmondstudio.global" then
                    return execute t javascript {json.dumps(js_code)}
                end if
            end repeat
        end repeat
    end tell'''
    r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=30)
    return r.stdout.strip()


def fetch_datajs(uuid, token):
    """Faz /open + cmi5fetch + data.js via XHR dentro do Brave."""
    body = json.dumps({"context": {"user_id": USER_ID, "course_node_id": COURSE_ID}})
    js = f"""
var xhr1 = new XMLHttpRequest();
xhr1.open('POST', '/api/contents/{uuid}/open?group_id={GROUP_ID}', false);
xhr1.setRequestHeader('Authorization', 'Bearer {token}');
xhr1.setRequestHeader('X-PWA-origin', 'browser');
xhr1.setRequestHeader('Content-Type', 'application/json');
xhr1.setRequestHeader('Accept', 'application/json');
xhr1.send({json.dumps(body)});
if (xhr1.status !== 200) {{
    JSON.stringify({{error: 'open failed: ' + xhr1.status}});
}} else {{
    var fetchUrl = JSON.parse(xhr1.responseText).authorization.data.attributes.fetch_url;
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', fetchUrl, false);
    xhr2.setRequestHeader('Authorization', 'Bearer {token}');
    xhr2.send(null);
    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'https://richmondstudio.global/system/uploads/content/file/{uuid}/data.js', false);
    xhr3.send(null);
    JSON.stringify({{status: xhr3.status, content: xhr3.responseText}});
}}
"""
    raw = run_in_brave(js)
    if not raw:
        return None
    resp = json.loads(raw)
    if 'error' in resp or resp.get('status') != 200:
        return None
    return resp['content']


# ── QTI Parser ──────────────────────────────────────────────────────────────

def q(tag):
    return f"{{{NS}}}{tag}"


def inner_text(el):
    return ''.join(el.itertext()).strip()


def serialize_with_gaps(el, gap_marker="____"):
    parts = []
    if el.text and el.text.strip():
        parts.append(el.text.strip())
    for child in el:
        local = child.tag.split('}')[-1]
        if local == 'textEntryInteraction':
            rid = child.get('responseIdentifier', '')
            parts.append(f"[{gap_marker}:{rid}]")
        elif local == 'inlineChoiceInteraction':
            rid = child.get('responseIdentifier', '')
            parts.append(f"[DROPDOWN:{rid}]")
        elif local in ['img']:
            pass
        elif local in ['br']:
            parts.append(' ')
        else:
            parts.append(serialize_with_gaps(child, gap_marker))
        if child.tail and child.tail.strip():
            parts.append(child.tail.strip())
    return ' '.join(p for p in parts if p)


def parse_datajs(content):
    """Extrai dict {filename: xml_string} do ajaxData."""
    match = re.search(r'ajaxData\s*=\s*\{', content)
    if not match:
        return {}
    json_str = content[match.start() + len('ajaxData = '):]
    json_str = json_str.rstrip().rstrip(';').strip()
    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        files = {}
        keys = re.findall(r'"([^"]+\.xml)"\s*:', content)
        for key in keys:
            m = re.search(f'"{re.escape(key)}"\\s*:\\s*', content)
            if m:
                rest = content[m.end():]
                try:
                    val, _ = json.decoder.JSONDecoder().raw_decode(rest.lstrip())
                    files[key] = val
                except Exception:
                    pass
        return files


def parse_qti(xml_str):
    """Retorna lista de questões estruturadas de um assessmentItem QTI."""
    try:
        root = ET.fromstring(xml_str)
    except ET.ParseError:
        return []

    if root.tag not in ['assessmentItem', q('assessmentItem')]:
        root = (root.find('.//assessmentItem') or
                root.find(f'.//{q("assessmentItem")}') or root)

    item_title = root.get("title", "")

    # correct answers map
    correct_map = {}
    for rd in root.findall('.//responseDeclaration') + root.findall(f'.//{q("responseDeclaration")}'):
        rid = rd.get("identifier", "")
        vals = []
        for cr in rd.findall('.//correctResponse') + rd.findall(f'.//{q("correctResponse")}'):
            for v in cr.findall('.//value') + cr.findall(f'.//{q("value")}'):
                if v.text:
                    vals.append(v.text.strip())
        for mm in rd.findall('.//mapping') + rd.findall(f'.//{q("mapping")}'):
            for me in mm.findall('.//mapEntry') + mm.findall(f'.//{q("mapEntry")}'):
                key = me.get('mapKey', '')
                if key and float(me.get('mappedValue', 0)) > 0:
                    vals.append(key)
        if rid:
            correct_map[rid] = list(dict.fromkeys(vals))

    item_body = root.find('.//itemBody') or root.find(f'.//{q("itemBody")}')
    if item_body is None:
        return []

    questions = []

    # choiceInteraction
    for inter in item_body.findall('.//choiceInteraction') + item_body.findall(f'.//{q("choiceInteraction")}'):
        rid = inter.get("responseIdentifier", "")
        choices, choice_map = [], {}
        for sc in inter.findall('.//simpleChoice') + inter.findall(f'.//{q("simpleChoice")}'):
            sid, stxt = sc.get("identifier", ""), inner_text(sc)
            choices.append({"id": sid, "text": stxt})
            choice_map[sid] = stxt
        prompt = ""
        for el in item_body.iter():
            if inter in list(el):
                parts = [el.text.strip()] if el.text and el.text.strip() else []
                for sib in el:
                    if sib is inter:
                        break
                    parts.append(inner_text(sib))
                    if sib.tail and sib.tail.strip():
                        parts.append(sib.tail.strip())
                prompt = ' '.join(p for p in parts if p)
                break
        correct_ids = correct_map.get(rid, [])
        questions.append({
            "type": "choiceInteraction",
            "instruction": item_title,
            "prompt": prompt,
            "choices": choices,
            "correct_ids": correct_ids,
            "correct_texts": [choice_map.get(c, c) for c in correct_ids],
        })

    # inlineChoiceInteraction (dropdown)
    for inter in item_body.findall('.//inlineChoiceInteraction') + item_body.findall(f'.//{q("inlineChoiceInteraction")}'):
        rid = inter.get("responseIdentifier", "")
        choices, choice_map = [], {}
        for ic in inter.findall('.//inlineChoice') + inter.findall(f'.//{q("inlineChoice")}'):
            iid, itxt = ic.get("identifier", ""), inner_text(ic)
            choices.append({"id": iid, "text": itxt})
            choice_map[iid] = itxt
        context = ""
        for el in item_body.iter():
            if inter in list(el):
                context = serialize_with_gaps(el)
                break
        correct_ids = correct_map.get(rid, [])
        questions.append({
            "type": "inlineChoice",
            "instruction": item_title,
            "context": context,
            "response_id": rid,
            "choices": choices,
            "correct_ids": correct_ids,
            "correct_texts": [choice_map.get(c, c) for c in correct_ids],
        })

    # textEntryInteraction (gap fill)
    for inter in item_body.findall('.//textEntryInteraction') + item_body.findall(f'.//{q("textEntryInteraction")}'):
        rid = inter.get("responseIdentifier", "")
        context = ""
        for el in item_body.iter():
            if inter in list(el):
                context = serialize_with_gaps(el)
                break
        questions.append({
            "type": "textEntry",
            "instruction": item_title,
            "context": context,
            "response_id": rid,
            "correct": correct_map.get(rid, []),
        })

    # associateInteraction (matching)
    for inter in item_body.findall('.//associateInteraction') + item_body.findall(f'.//{q("associateInteraction")}'):
        rid = inter.get("responseIdentifier", "")
        items, item_map = [], {}
        for sac in inter.findall('.//simpleAssociableChoice') + inter.findall(f'.//{q("simpleAssociableChoice")}'):
            sid, stxt = sac.get("identifier", ""), inner_text(sac)
            items.append({"id": sid, "text": stxt})
            item_map[sid] = stxt
        pairs = []
        for pair in correct_map.get(rid, []):
            pts = pair.split()
            if len(pts) == 2:
                pairs.append((item_map.get(pts[0], pts[0]), item_map.get(pts[1], pts[1])))
        questions.append({
            "type": "associate",
            "instruction": item_title,
            "items": items,
            "correct_pairs": pairs,
        })

    return questions


# ── Content Map ─────────────────────────────────────────────────────────────

def load_content_map():
    if not CONTENT_MAP.exists():
        raise FileNotFoundError(
            f"content_map.json não encontrado em {CONTENT_MAP}\n"
            "Execute primeiro: python3 scripts/richmond/fetch_content_map.py"
        )
    return json.loads(CONTENT_MAP.read_text())


def filter_by_unit(nodes, units):
    result = []
    for n in nodes:
        for u in units:
            label = f"Unit {u}"
            if label in n['title'] and 'non-interactive' not in n['title'] and n['content_type'] == 'Unity::Core::Interactive':
                result.append(n)
                break
    return result


# ── Main pipeline ────────────────────────────────────────────────────────────

def scrape_units(units, token):
    """Baixa e parseia todas as atividades das units especificadas."""
    nodes = load_content_map()
    targets = filter_by_unit(nodes, units)
    print(f"Atividades encontradas: {len(targets)}")

    CACHE_DIR.mkdir(exist_ok=True)
    all_questions = []

    for node in targets:
        uuid = node['content_uuid']
        title = node['title']
        cache_file = CACHE_DIR / f"{uuid}.json"

        print(f"  {title[:60]}...", end=" ", flush=True)

        if cache_file.exists():
            files = json.loads(cache_file.read_text())
            print("(cache)")
        else:
            datajs = fetch_datajs(uuid, token)
            if not datajs:
                print("ERRO")
                continue
            files = parse_datajs(datajs)
            cache_file.write_text(json.dumps(files, ensure_ascii=False))
            print(f"{len(files)} files")

        for fname, xml_str in files.items():
            if fname.endswith('.xml') and 'LearningObjectInfo' not in fname:
                qs = parse_qti(xml_str)
                for q_item in qs:
                    q_item['source_title'] = title
                    q_item['source_uuid'] = uuid
                all_questions.extend(qs)

    return all_questions


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Richmond Studio → Patito scraper")
    parser.add_argument('--unit', nargs='+', type=int, default=[3, 4],
                        help='Números das units (ex: --unit 3 4)')
    parser.add_argument('--list', action='store_true',
                        help='Listar atividades sem baixar')
    parser.add_argument('--no-cache', action='store_true',
                        help='Ignorar cache e re-baixar tudo')
    parser.add_argument('--output', type=str,
                        help='Arquivo de saída JSON (ex: /tmp/questions.json)')
    args = parser.parse_args()

    if args.list:
        nodes = load_content_map()
        for u in args.unit:
            matches = filter_by_unit(nodes, [u])
            print(f"\nUnit {u}: {len(matches)} atividades")
            for n in matches:
                print(f"  {n['title']}")
        return

    if args.no_cache and CACHE_DIR.exists():
        import shutil
        shutil.rmtree(CACHE_DIR)

    print("Obtendo token do Brave...")
    token = get_token_from_brave()
    print(f"Token OK ({token[:20]}...)\n")

    questions = scrape_units(args.unit, token)
    print(f"\nTotal de questões: {len(questions)}")

    if args.output:
        Path(args.output).write_text(json.dumps(questions, ensure_ascii=False, indent=2))
        print(f"Salvo em {args.output}")
    else:
        print(json.dumps(questions[:3], ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
