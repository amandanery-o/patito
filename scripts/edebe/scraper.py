#!/usr/bin/env python3
"""
Baixa HTMLs dos capítulos da plataforma Edebe.

Usa chapter_map.json para saber quais URLs baixar.
Salva os HTMLs em .cache/{content_id}.html

Uso:
  python3 scripts/edebe/scraper.py                        # tudo
  python3 scripts/edebe/scraper.py --courseware 249       # só Ciências
  python3 scripts/edebe/scraper.py --chapter 290 291      # capítulos específicos
  python3 scripts/edebe/scraper.py --url "https://..."    # URL avulsa

Saída: scripts/edebe/.cache/{content_id}.html
"""

import urllib.request, urllib.error, json, sys, argparse, re
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from token import get_token

CHAPTER_MAP = Path(__file__).parent / "chapter_map.json"
CACHE_DIR   = Path(__file__).parent / ".cache"
EDEBE_FILES_BASE = "https://plataforma.edebe.com.br/files/"


def download_file(url, token, dest_path):
    """Baixa um arquivo HTML com cookie de autenticação."""
    req = urllib.request.Request(url, headers={
        "Cookie": f"token={token}",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "Accept": "text/html,*/*",
    })
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            content = r.read()
            dest_path.write_bytes(content)
            return len(content)
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code}: {e.reason} → {url}")


def extract_text_from_html(html_path):
    """Extrai texto limpo de um HTML Webflow (remove scripts, estilos, navegação)."""
    from html.parser import HTMLParser

    class Extractor(HTMLParser):
        def __init__(self):
            super().__init__()
            self.chunks = []
            self._skip = 0
            self._skip_tags = {'script', 'style', 'nav', 'head', 'footer', 'noscript'}

        def handle_starttag(self, tag, attrs):
            if tag in self._skip_tags:
                self._skip += 1
            # Ignorar divs de navegação/menu por class/id
            attrs_dict = dict(attrs)
            cls = attrs_dict.get('class', '')
            aid = attrs_dict.get('id', '')
            if any(k in cls + aid for k in ['nav', 'menu', 'sidebar', 'footer', 'header']):
                self._skip += 1

        def handle_endtag(self, tag):
            if tag in self._skip_tags:
                self._skip = max(0, self._skip - 1)

        def handle_data(self, data):
            if self._skip == 0:
                text = data.strip()
                if text and len(text) > 2:
                    self.chunks.append(text)

    html = html_path.read_text(encoding='utf-8', errors='ignore')
    parser = Extractor()
    parser.feed(html)
    return '\n'.join(parser.chunks)


def load_chapter_map():
    if not CHAPTER_MAP.exists():
        raise FileNotFoundError(
            f"chapter_map.json não encontrado. Execute:\n"
            f"  python3 scripts/edebe/fetch_chapter_map.py"
        )
    return json.loads(CHAPTER_MAP.read_text())


def scrape(token, courseware_ids=None, chapter_ids=None, urls=None):
    CACHE_DIR.mkdir(exist_ok=True)

    if urls:
        # Download direto de URLs avulsas
        for i, url in enumerate(urls):
            dest = CACHE_DIR / f"manual_{i:03d}.html"
            print(f"  {url[:70]}... ", end="", flush=True)
            if dest.exists():
                print("(cache)")
                continue
            size = download_file(url, token, dest)
            print(f"{size:,} bytes")
        return

    chapters = load_chapter_map()

    if courseware_ids:
        chapters = [c for c in chapters if c['courseware_id'] in courseware_ids]
    if chapter_ids:
        chapters = [c for c in chapters if c['chapter_id'] in chapter_ids]

    results = []
    for ch in chapters:
        cw_name = ch['courseware_name']
        ch_id = ch['chapter_id']
        files = ch.get('files', [])

        if not files:
            print(f"  [{cw_name}] cap {ch_id}: sem arquivos mapeados — pular")
            continue

        print(f"  [{cw_name}] cap {ch_id}:")
        ch_results = []

        for f in files:
            url = f['file_url']
            content_id = f.get('content_id') or re.search(r'contentId=(\d+)', url)
            title = f.get('title', '')

            # determinar nome do arquivo cache
            uuid_m = re.search(r'/files/([a-f0-9\-]+_[a-z0-9]+)', url)
            cache_name = f"{content_id or uuid_m.group(1) if uuid_m else 'unknown'}.html"
            dest = CACHE_DIR / cache_name

            print(f"    {title[:50] or url[:50]}... ", end="", flush=True)

            if dest.exists():
                text = extract_text_from_html(dest)
                print(f"(cache, {len(text)} chars)")
                ch_results.append({'content_id': content_id, 'title': title,
                                   'cache_path': str(dest), 'text_length': len(text)})
                continue

            try:
                size = download_file(url, token, dest)
                text = extract_text_from_html(dest)
                print(f"{size:,} bytes, {len(text)} chars de texto")
                ch_results.append({'content_id': content_id, 'title': title,
                                   'cache_path': str(dest), 'text_length': len(text)})
            except Exception as e:
                print(f"ERRO: {e}")

        results.append({
            'courseware_id': ch['courseware_id'],
            'courseware_name': cw_name,
            'chapter_id': ch_id,
            'files': ch_results,
        })

    return results


def main():
    parser = argparse.ArgumentParser(description="Edebe chapter downloader")
    parser.add_argument('--courseware', nargs='+', type=int)
    parser.add_argument('--chapter', nargs='+', type=int)
    parser.add_argument('--url', nargs='+', help='URLs avulsas para baixar')
    parser.add_argument('--no-cache', action='store_true')
    args = parser.parse_args()

    if args.no_cache and CACHE_DIR.exists():
        import shutil; shutil.rmtree(CACHE_DIR)

    print("Obtendo token...")
    token = get_token()
    print(f"Token OK\n")

    scrape(token,
           courseware_ids=args.courseware,
           chapter_ids=args.chapter,
           urls=args.url)


if __name__ == '__main__':
    main()
