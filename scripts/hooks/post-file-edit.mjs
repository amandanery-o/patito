#!/usr/bin/env node

import { resolve, relative, extname } from 'node:path'
import { spawnSync } from 'node:child_process'

let input = ''
for await (const chunk of process.stdin) input += chunk

let payload = {}
try {
  payload = JSON.parse(input)
} catch {
  process.exit(0)
}

const candidate = payload.tool_input?.file_path
if (!candidate) process.exit(0)

const root = resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd())
const file = resolve(candidate)
const pathFromRoot = relative(root, file)
const supported = new Set(['.js', '.jsx', '.mjs', '.json', '.md', '.css', '.yml', '.yaml'])
if (pathFromRoot.startsWith('..') || !supported.has(extname(file))) process.exit(0)

const result = spawnSync('npx', ['prettier', '--write', file], { cwd: root, stdio: 'inherit' })
process.exit(result.status ?? 1)
