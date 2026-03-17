#!/bin/bash
set -euo pipefail

# Only run in remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install dependencies
npm install

# Kill any existing vite dev server
pkill -f "vite" 2>/dev/null || true
sleep 1

# Start vite dev server in the background
nohup npx vite --port 5173 --host > /tmp/vite-dev.log 2>&1 &

echo "Dev server started on port 5173 (PID: $!)"
