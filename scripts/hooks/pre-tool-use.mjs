#!/usr/bin/env node

let input = ''
for await (const chunk of process.stdin) input += chunk

let payload = {}
try {
  payload = JSON.parse(input)
} catch {
  process.exit(0)
}

const command = payload.tool_input?.command || ''
const destructive = [
  /\brm\s+-[^\n]*r[^\n]*f[^\n]*(?:\s\/\s*$|\s~\/?\s*$|\$HOME|\$CODEX_HOME)/i,
  /\bgit\s+reset\s+--hard\b/i,
  /\bgit\s+clean\s+-[^\n]*[fdx][^\n]*\b/i,
]

if (destructive.some((pattern) => pattern.test(command))) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: 'Operação destrutiva bloqueada pelo guardrail do Patito.',
      },
    }),
  )
}
