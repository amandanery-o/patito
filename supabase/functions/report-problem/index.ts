const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const allowedKinds = new Set(['question', 'general'])
const allowedKeys = new Set([
  'correlationId', 'kind', 'subjectId', 'contentId', 'questionId', 'description', 'appVersion',
])

function text(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function code(value: string): string {
  return `\`${value.replaceAll('`', '') || 'não informado'}\``
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return Response.json({ error: 'method_not_allowed' }, { status: 405, headers: corsHeaders })

  try {
    const input = await request.json()
    if (!input || typeof input !== 'object' || Object.keys(input).some(key => !allowedKeys.has(key))) {
      return Response.json({ error: 'invalid_payload' }, { status: 400, headers: corsHeaders })
    }

    const kind = allowedKinds.has(input.kind) ? input.kind : 'general'
    const correlationId = text(input.correlationId, 80)
    const description = text(input.description, 1000)
    if (!correlationId || (kind === 'general' && !description)) {
      return Response.json({ error: 'missing_fields' }, { status: 400, headers: corsHeaders })
    }

    const token = Deno.env.get('GITHUB_ISSUES_TOKEN')
    const repository = Deno.env.get('GITHUB_ISSUES_REPOSITORY') || 'amandanery-o/patito'
    if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('github_not_configured')

    const title = kind === 'question'
      ? `[Relato] Questão ${text(input.questionId, 120) || 'sem ID'}`
      : `[Relato] Problema no Patito`
    const body = [
      '## Relato anônimo',
      '',
      `- Tipo: ${code(kind)}`,
      `- Matéria: ${code(text(input.subjectId, 80))}`,
      `- Conteúdo: ${code(text(input.contentId, 120))}`,
      `- Questão: ${code(text(input.questionId, 120))}`,
      `- Versão: ${code(text(input.appVersion, 80))}`,
      `- Correlação: ${code(correlationId)}`,
      '',
      '## Descrição',
      '',
      description || 'Relato enviado pelo botão da questão.',
      '',
      '> Este relato não inclui nome, e-mail, ID do aluno ou resposta enviada.',
    ].join('\n')

    const githubResponse = await fetch(`https://api.github.com/repos/${repository}/issues`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'patito-report-function',
      },
      body: JSON.stringify({ title, body, labels: ['relato'] }),
    })
    if (!githubResponse.ok) throw new Error(`github_${githubResponse.status}`)
    const issue = await githubResponse.json()
    return Response.json({ ok: true, issueNumber: issue.number, correlationId }, { headers: corsHeaders })
  } catch (error) {
    console.error('report-problem failed', error instanceof Error ? error.message : 'unknown')
    return Response.json({ error: 'report_failed' }, { status: 502, headers: corsHeaders })
  }
})
