#!/usr/bin/env python3
"""
Monta o mapa de capítulos da plataforma Edebe.

Passo 1: API student-status → lista de chapter IDs por courseware
Passo 2: Brave+AppleScript → navega em cada courseware e lê os links do DOM
          para extrair as URLs dos arquivos (UUIDs)

Salva em scripts/edebe/chapter_map.json

Uso:
  python3 scripts/edebe/fetch_chapter_map.py
  python3 scripts/edebe/fetch_chapter_map.py --courseware 249 253 255
"""

import subprocess, json, re, sys, argparse, urllib.request, urllib.error
from pathlib import Path
import sys; sys.path.insert(0, str(Path(__file__).parent.parent.parent))

API_BASE = "https://us-east1-edebe-282216.cloudfunctions.net/api-edebe-prod/v1"
EDEBE_HOST = "plataforma.edebe.com.br"
OUT = Path(__file__).parent / "chapter_map.json"

COURSEWARES = {
    249: "Ciências",
    253: "Língua Portuguesa",
    255: "História",
}


def api_get(path, token):
    url = f"{API_BASE}{path}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"API {path} → {e.code}: {e.reason}")


def run_in_brave(js_code):
    script = f'''tell application "Brave Browser"
        repeat with w in windows
            repeat with t in tabs of w
                if URL of t contains "{EDEBE_HOST}" then
                    return execute t javascript {json.dumps(js_code)}
                end if
            end repeat
        end repeat
    end tell'''
    r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=30)
    return r.stdout.strip()


def navigate_in_brave(url):
    """Navega o tab do Edebe para uma URL e aguarda carregamento."""
    script = f'''tell application "Brave Browser"
        repeat with w in windows
            repeat with t in tabs of w
                if URL of t contains "{EDEBE_HOST}" then
                    set URL of t to "{url}"
                    delay 3
                    return "ok"
                end if
            end repeat
        end repeat
    end tell'''
    r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=15)
    return r.stdout.strip() == 'ok'


def get_chapter_ids_from_api(courseware_id, token):
    """Retorna lista de {chapter_id, content_count, progress} via student-status API."""
    data = api_get(f"/coursewares/student-status/{courseware_id}", token)

    chapters = []
    # A resposta pode ter estrutura variada — extrair recursivamente
    def extract(obj):
        if isinstance(obj, dict):
            # Detectar um chapter node
            if 'chapter' in obj or 'chapterId' in obj or ('id' in obj and 'contents' in obj):
                cid = obj.get('chapterId') or obj.get('id')
                contents = obj.get('contents', []) or obj.get('contentIds', [])
                if cid:
                    chapters.append({
                        'chapter_id': cid,
                        'content_count': len(contents) if isinstance(contents, list) else contents,
                        'progress': obj.get('progress', 0),
                        'content_ids': contents if isinstance(contents, list) else [],
                    })
            for v in obj.values():
                extract(v)
        elif isinstance(obj, list):
            for item in obj:
                extract(item)

    extract(data)
    return chapters


def get_content_urls_from_dom(courseware_id):
    """
    Navega para a página do courseware no Brave e extrai URLs de conteúdo do DOM.
    Retorna lista de {content_id, title, file_url} a partir dos links do SPA.
    """
    url = f"https://{EDEBE_HOST}/#/pages/courseware/{courseware_id}"
    print(f"  Navegando para courseware {courseware_id}...", end=" ", flush=True)

    ok = navigate_in_brave(url)
    if not ok:
        print("FALHOU (tab não encontrado)")
        return []

    # Aguardar um pouco mais para a SPA renderizar
    import time
    time.sleep(2)

    # Tentar ler links do DOM que apontem para fullscreen-frame-annotation
    js_links = """
(function() {
    var links = [];
    document.querySelectorAll('a').forEach(function(a) {
        var href = a.href || '';
        if (href.includes('fullscreen-frame-annotation') || href.includes('files/')) {
            links.push({
                href: href,
                text: a.textContent.trim().slice(0, 80)
            });
        }
    });
    // Também tentar botões com data-* ou onclick que contenham URLs
    document.querySelectorAll('[data-url],[data-content],[data-src]').forEach(function(el) {
        var url = el.dataset.url || el.dataset.content || el.dataset.src || '';
        if (url.includes('files/') || url.includes('edebe')) {
            links.push({href: url, text: el.textContent.trim().slice(0, 80)});
        }
    });
    return JSON.stringify(links);
})()
"""
    raw = run_in_brave(js_links)
    if not raw or raw == 'missing value':
        print(f"0 links no DOM")
        return []

    try:
        links = json.loads(raw)
    except json.JSONDecodeError:
        print("erro JSON")
        return []

    print(f"{len(links)} links encontrados")

    results = []
    for link in links:
        href = link.get('href', '')
        # Extrair content URL do parâmetro ?content=...
        m = re.search(r'[?&]content=([^&]+)', href)
        file_url = m.group(1) if m else (href if 'files/' in href else '')
        if not file_url:
            continue

        # Extrair contentId e coursewareId dos parâmetros
        cid_m = re.search(r'contentId=(\d+)', href)
        cwid_m = re.search(r'coursewareId=(\d+)', href)
        title_m = re.search(r'title=([^&]+)', href)

        results.append({
            'file_url': urllib.parse.unquote(file_url) if '%' in file_url else file_url,
            'content_id': int(cid_m.group(1)) if cid_m else None,
            'courseware_id': int(cwid_m.group(1)) if cwid_m else courseware_id,
            'title': urllib.parse.unquote(title_m.group(1)).replace('+', ' ') if title_m else link.get('text', ''),
        })

    return results


def get_current_page_content_url():
    """Lê a URL atual do tab para extrair content_url depois de navegar para um capítulo."""
    js = "window.location.href"
    raw = run_in_brave(js)
    if not raw:
        return None
    m = re.search(r'[?&]content=([^&\s]+)', raw)
    return m.group(1) if m else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--courseware', nargs='+', type=int,
                        default=list(COURSEWARES.keys()))
    args = parser.parse_args()

    # Token
    try:
        from scripts.edebe.token import get_token
    except ImportError:
        sys.path.insert(0, str(Path(__file__).parent))
        from token import get_token

    import urllib.parse  # noqa

    print("Obtendo token...")
    token = get_token()
    print(f"Token OK\n")

    chapter_map = []

    for cw_id in args.courseware:
        name = COURSEWARES.get(cw_id, f"Courseware {cw_id}")
        print(f"=== {name} (courseware {cw_id}) ===")

        # Passo 1: chapter IDs via API
        print("  Buscando chapter IDs via API...")
        try:
            chapters = get_chapter_ids_from_api(cw_id, token)
            print(f"  {len(chapters)} capítulos encontrados")
        except Exception as e:
            print(f"  ERRO API: {e}")
            chapters = []

        # Passo 2: file URLs via DOM
        content_urls = get_content_urls_from_dom(cw_id)
        url_by_content_id = {r['content_id']: r for r in content_urls if r.get('content_id')}

        for ch in chapters:
            entry = {
                'courseware_id': cw_id,
                'courseware_name': name,
                'chapter_id': ch['chapter_id'],
                'content_ids': ch.get('content_ids', []),
                'progress': ch.get('progress', 0),
                'files': [],
            }

            for content_id in ch.get('content_ids', []):
                if content_id in url_by_content_id:
                    r = url_by_content_id[content_id]
                    entry['files'].append({
                        'content_id': content_id,
                        'title': r.get('title', ''),
                        'file_url': r['file_url'],
                    })

            chapter_map.append(entry)

        # Capítulos sem content_ids também incluir (para navegação manual depois)
        if not chapters and content_urls:
            for r in content_urls:
                chapter_map.append({
                    'courseware_id': cw_id,
                    'courseware_name': name,
                    'chapter_id': None,
                    'files': [{'content_id': r.get('content_id'), 'title': r.get('title', ''), 'file_url': r['file_url']}],
                })

        print()

    OUT.write_text(json.dumps(chapter_map, ensure_ascii=False, indent=2))
    total_files = sum(len(e['files']) for e in chapter_map)
    print(f"Salvo: {len(chapter_map)} capítulos, {total_files} arquivos → {OUT}")

    if total_files == 0:
        print("\nNenhuma URL de arquivo encontrada via DOM.")
        print("Alternativa: navegar manualmente pelos capítulos no Brave e depois rodar:")
        print("  python3 scripts/edebe/fetch_chapter_map.py --from-history")


if __name__ == '__main__':
    # Importar urllib.parse no escopo global para usar em get_content_urls_from_dom
    import urllib.parse
    main()
