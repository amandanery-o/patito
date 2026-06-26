#!/usr/bin/env python3
"""
Baixa o mapa de conteúdo do Richmond Studio via Brave + AppleScript.
Salva em scripts/richmond/content_map.json para uso pelo scraper.

Uso:
  python3 scripts/richmond/fetch_content_map.py
"""

import subprocess, json
from pathlib import Path

COURSE_ID = "4adba760-d201-42c3-bcbc-02959ee3d356"
GROUP_ID  = "00000000-0000-1000-0000-000001251631"
OUT = Path(__file__).parent / "content_map.json"


def run_in_brave(js_code):
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


def get_token():
    raw = run_in_brave("localStorage.getItem('accessToken')")
    if not raw or raw == 'missing value':
        raise RuntimeError("Token não encontrado. Abra o Brave e logue em richmondstudio.global")
    return raw


def fetch_content_map(token):
    """Faz GET /api/courses/{course_id}/content_nodes via XHR no Brave."""
    js = f"""
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/courses/{COURSE_ID}/content_nodes?group_id={GROUP_ID}&include=content', false);
xhr.setRequestHeader('Authorization', 'Bearer {token}');
xhr.setRequestHeader('Accept', 'application/json');
xhr.send(null);
JSON.stringify({{status: xhr.status, body: xhr.responseText}});
"""
    raw = run_in_brave(js)
    resp = json.loads(raw)
    if resp['status'] != 200:
        raise RuntimeError(f"API retornou {resp['status']}")
    return json.loads(resp['body'])


def flatten_nodes(data):
    """Achata a árvore de nós de conteúdo em lista plana."""
    nodes = []
    items = data.get('data', data) if isinstance(data, dict) else data

    def walk(items, unit="", unit_num=0):
        for item in items:
            attrs = item.get('attributes', {})
            title = attrs.get('title', item.get('title', ''))
            ntype = attrs.get('type', item.get('type', ''))
            content = attrs.get('content', {}) or {}
            content_uuid = (content.get('id') or
                           content.get('uuid') or
                           attrs.get('content_uuid') or
                           item.get('content_uuid', ''))
            content_type = (content.get('type') or
                           attrs.get('content_type') or
                           item.get('content_type', ''))

            # detectar unit
            if 'Unit' in title and ntype in ['chapter', 'module', 'unit']:
                import re
                m = re.search(r'Unit\s+(\d+)', title)
                u_num = int(m.group(1)) if m else 0
                unit = title
                unit_num = u_num

            if content_uuid:
                nodes.append({
                    'title': title,
                    'type': ntype,
                    'content_uuid': content_uuid,
                    'content_type': content_type,
                    'unit': unit,
                    'unit_num': unit_num,
                })

            # recursivo
            children = (item.get('relationships', {}).get('children', {}).get('data', []) or
                       attrs.get('children', []) or
                       item.get('children', []))
            if children:
                walk(children, unit, unit_num)

    walk(items)
    return nodes


def main():
    print("Obtendo token do Brave...")
    token = get_token()
    print(f"Token OK ({token[:20]}...)")

    print("Baixando mapa de conteúdo...")
    data = fetch_content_map(token)

    nodes = flatten_nodes(data)
    OUT.write_text(json.dumps(nodes, ensure_ascii=False, indent=2))
    print(f"Salvo {len(nodes)} nós em {OUT}")

    # resumo por unit
    from collections import Counter
    units = Counter(n['unit_num'] for n in nodes if n['unit_num'])
    for unit_num in sorted(units):
        n = [x for x in nodes if x['unit_num'] == unit_num]
        interactive = [x for x in n if 'Interactive' in x.get('content_type', '')]
        print(f"  Unit {unit_num}: {len(n)} nós, {len(interactive)} interativos")


if __name__ == '__main__':
    main()
