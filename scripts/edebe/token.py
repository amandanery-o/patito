#!/usr/bin/env python3
"""
Extrai o JWT de autenticação da plataforma Edebe.

Tenta primeiro via AppleScript no Brave (mais simples).
Se falhar, descriptografa do banco de cookies do Brave (Brave pode estar aberto).

Uso:
  python3 scripts/edebe/token.py          # imprime o token
  from scripts.edebe.token import get_token
"""

import subprocess, sqlite3, shutil, tempfile, os, sys
from pathlib import Path

EDEBE_HOST = 'plataforma.edebe.com.br'
BRAVE_COOKIES = os.path.expanduser(
    "~/Library/Application Support/BraveSoftware/Brave-Browser/Default/Cookies"
)


def get_token_from_brave_tab():
    """Lê o cookie 'token' via AppleScript no tab do Edebe aberto no Brave."""
    js = (
        "var c=document.cookie.split(';').find(function(x){return x.trim().startsWith('token=');});"
        "c ? c.trim().slice(6) : ''"
    )
    script = f'''tell application "Brave Browser"
        repeat with w in windows
            repeat with t in tabs of w
                if URL of t contains "{EDEBE_HOST}" then
                    return execute t javascript {repr(js)}
                end if
            end repeat
        end repeat
    end tell'''
    r = subprocess.run(['osascript', '-e', script], capture_output=True, text=True, timeout=10)
    token = r.stdout.strip()
    if token and token.startswith('eyJ'):
        return token
    return None


def get_token_from_cookie_db():
    """Descriptografa o cookie 'token' do banco SQLite do Brave (PBKDF2 + AES-CBC)."""
    try:
        from Crypto.Cipher import AES
        from hashlib import pbkdf2_hmac
    except ImportError:
        raise ImportError("pip3 install pycryptodome")

    if not os.path.exists(BRAVE_COOKIES):
        raise FileNotFoundError(f"Banco de cookies não encontrado: {BRAVE_COOKIES}")

    # Pegar a chave do Keychain
    r = subprocess.run(
        ['security', 'find-generic-password', '-w', '-s', 'Brave Safe Storage'],
        capture_output=True, text=True
    )
    if r.returncode != 0:
        raise RuntimeError("Não foi possível obter 'Brave Safe Storage' do Keychain")
    password = r.stdout.strip()

    # Derivar chave AES via PBKDF2
    key = pbkdf2_hmac('sha1', password.encode(), b'saltysalt', 1003, dklen=16)

    # Copiar DB (pode estar em uso pelo Brave)
    tmp = tempfile.mktemp(suffix='.db')
    shutil.copy(BRAVE_COOKIES, tmp)

    try:
        conn = sqlite3.connect(tmp)
        cur = conn.cursor()
        cur.execute(
            "SELECT encrypted_value FROM cookies "
            "WHERE host_key=? AND name='token' "
            "ORDER BY last_access_utc DESC LIMIT 1",
            (EDEBE_HOST,)
        )
        row = cur.fetchone()
        conn.close()
    finally:
        os.unlink(tmp)

    if not row:
        raise RuntimeError(f"Cookie 'token' não encontrado para {EDEBE_HOST}")

    encrypted = row[0]
    cipher = AES.new(key, AES.MODE_CBC, IV=b' ' * 16)
    raw = cipher.decrypt(encrypted[3:])  # pula prefixo 'v10'

    start = raw.find(b'eyJ')
    if start == -1:
        raise RuntimeError("JWT não encontrado no cookie descriptografado")

    padding = raw[-1]
    token = raw[start:-padding].decode('ascii')
    return token


def get_token():
    """Retorna token válido, tentando Brave tab primeiro, depois cookie DB."""
    token = get_token_from_brave_tab()
    if token:
        print("[token] obtido via Brave tab (AppleScript)", file=sys.stderr)
        return token

    print("[token] tab não encontrado, tentando cookie DB...", file=sys.stderr)
    token = get_token_from_cookie_db()
    print("[token] obtido via cookie DB (descriptografado)", file=sys.stderr)
    return token


if __name__ == '__main__':
    try:
        token = get_token()
        print(f"Token OK ({token[:30]}...)")
        print(f"\nExportar para usar com curl:")
        print(f'export EDEBE_TOKEN="{token}"')
    except Exception as e:
        print(f"ERRO: {e}", file=sys.stderr)
        sys.exit(1)
