#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GEOGRAPHY_TOPICS } from '../../src/data/geografia.js'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'

const API_URL = 'https://api.anthropic.com/v1/messages'
const PROMPT_VERSION = 'geography-p1-v1'
const CONTENT_ID = 'geografia-p1-capitulos-7-8'

function requiredEnvironment(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} não configurado`)
  return value
}

export function buildSourceBrief(topics = GEOGRAPHY_TOPICS) {
  return topics.map(topic => ({
    chapter: topic.chapter,
    title: topic.title,
    pages: topic.source.pages,
    sections: topic.summarySections,
    keyIdeas: topic.keyIdeas,
  }))
}

function questionSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['questions'],
    properties: {
      questions: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['type', 'question', 'explanation', 'sourceRef'],
          properties: {
            type: { enum: ['multipleChoice', 'matchColumns'] },
            question: { type: 'string', minLength: 10 },
            explanation: { type: 'string', minLength: 10 },
            options: { type: 'array', minItems: 4, maxItems: 4, items: { type: 'string' } },
            correctIndex: { type: 'integer', minimum: 0, maximum: 3 },
            pairs: {
              type: 'array', minItems: 3, maxItems: 6,
              items: {
                type: 'object', additionalProperties: false, required: ['left', 'right'],
                properties: { left: { type: 'string' }, right: { type: 'string' } },
              },
            },
            sourceRef: {
              type: 'object', additionalProperties: false, required: ['section', 'pages'],
              properties: { section: { type: 'string' }, pages: { type: 'string' } },
            },
          },
        },
      },
    },
  }
}

export function validateGeneratedQuestions(questions, expected) {
  const errors = []
  if (questions.length !== expected.total) errors.push(`esperadas ${expected.total} questões; recebidas ${questions.length}`)
  const multipleChoice = questions.filter(question => question.type === 'multipleChoice').length
  const matchColumns = questions.filter(question => question.type === 'matchColumns').length
  if (multipleChoice !== expected.multipleChoice) errors.push(`esperadas ${expected.multipleChoice} múltipla escolha; recebidas ${multipleChoice}`)
  if (matchColumns !== expected.matchColumns) errors.push(`esperadas ${expected.matchColumns} associações; recebidas ${matchColumns}`)
  return errors
}

async function generateBatch({ apiKey, model, batch, sourceBrief }) {
  const prompt = `Crie um lote editorial de questões para crianças brasileiras de 9 a 10 anos.

Regras obrigatórias:
- Produza exatamente ${batch.total} questões: ${batch.multipleChoice} de múltipla escolha e ${batch.matchColumns} de associação.
- Use somente os conceitos do material fornecido.
- Distribua as questões de modo equilibrado entre os capítulos 7 e 8 e entre as seções.
- Múltipla escolha deve ter quatro alternativas plausíveis, somente uma correta e explicação curta.
- Associação deve ter de 3 a 5 pares sem respostas ambíguas e explicação curta.
- Linguagem simples, respeitosa e apropriada para 10 anos.
- Não use pegadinhas, dupla negação ou alternativas como “todas as anteriores”.
- Não exija números de mapas ou gráficos que não estejam no material fornecido.
- Em sourceRef, informe a seção e as páginas correspondentes.
- Não inclua dados pessoais, competição, pontuação ou desempenho de alunos.
- Este é o lote ${batch.number} de 2; evite perguntas genéricas e cubra a lista de focos deste lote.

Focos: ${batch.focus.join('; ')}

Material editorial autorizado e resumido:
${JSON.stringify(sourceBrief, null, 2)}`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 12000,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
      tools: [{
        name: 'submit_question_batch',
        description: 'Entrega o lote estruturado de questões para validação editorial.',
        input_schema: questionSchema(),
      }],
      tool_choice: { type: 'tool', name: 'submit_question_batch' },
    }),
  })

  const payload = await response.json()
  if (!response.ok) throw new Error(`Anthropic API ${response.status}: ${payload.error?.message || 'falha desconhecida'}`)
  const toolUse = payload.content?.find(block => block.type === 'tool_use' && block.name === 'submit_question_batch')
  if (!toolUse?.input?.questions) throw new Error('Claude não retornou o lote estruturado esperado')
  return { questions: toolUse.input.questions, usage: payload.usage, stopReason: payload.stop_reason }
}

export function assembleDraft({ questions, model }) {
  const numbered = questions.map((question, index) => ({
    ...question,
    id: `geo-p1-${String(index + 1).padStart(3, '0')}`,
  }))
  return {
    id: CONTENT_ID,
    subjectId: 'geografia',
    title: 'Revisão P1 — Espaços rural e urbano',
    summary: 'Revisão dos capítulos 7 e 8: atividades econômicas dos espaços rural e urbano.',
    source: { provider: 'edebe', resourceId: 'courseware-252/chapters-7-8', version: '2024' },
    generation: { model, promptVersion: PROMPT_VERSION, generatedAt: new Date().toISOString() },
    status: 'draft',
    questions: numbered,
  }
}

async function main() {
  const apiKey = requiredEnvironment('ANTHROPIC_API_KEY')
  const model = requiredEnvironment('ANTHROPIC_MODEL')
  const output = resolve(process.argv[2] || 'editorial/drafts/geografia-p1.json')
  const sourceBrief = buildSourceBrief()
  const batches = [
    {
      number: 1, total: 30, multipleChoice: 23, matchColumns: 7,
      focus: ['agricultura', 'pecuária', 'extrativismo', 'sustentabilidade', 'trabalho rural'],
    },
    {
      number: 2, total: 30, multipleChoice: 22, matchColumns: 8,
      focus: ['indústria', 'bens de consumo', 'comércio', 'serviços', 'relações entre campo e cidade'],
    },
  ]

  const generated = []
  const usage = []
  for (const batch of batches) {
    const result = await generateBatch({ apiKey, model, batch, sourceBrief })
    const errors = validateGeneratedQuestions(result.questions, batch)
    if (errors.length) throw new Error(`Lote ${batch.number} inválido: ${errors.join('; ')}`)
    generated.push(...result.questions)
    usage.push({ batch: batch.number, ...result.usage, stopReason: result.stopReason })
  }

  const draft = assembleDraft({ questions: generated, model })
  const structural = validateEditorialContent(draft)
  if (!structural.valid) throw new Error(`Rascunho inválido: ${structural.errors.join('; ')}`)

  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, `${JSON.stringify({ ...draft, generation: { ...draft.generation, usage } }, null, 2)}\n`, { flag: 'wx' })
  console.log(`Rascunho criado em ${output}`)
  console.log('Status: draft — revisão humana obrigatória antes da publicação')
}

if (fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}
