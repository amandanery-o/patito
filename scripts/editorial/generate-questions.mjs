#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'
import { GEOGRAPHY_SOURCE_TOPICS } from './geography-source-briefs.mjs'

const API_URL = 'https://api.anthropic.com/v1/messages'
const PROMPT_VERSION = 'question-batch-v2'
const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url))
const SYSTEM_PROMPT_PATH = resolve(SCRIPT_DIRECTORY, 'prompts/question-author-system-v1.md')
const BATCH_PROMPT_PATH = resolve(SCRIPT_DIRECTORY, 'prompts/question-batch-v2.md')

function requiredEnvironment(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} não configurado`)
  return value
}

const GEOGRAPHY_CONFIGS = {
  'geografia-p1': {
    assessmentName: 'P1',
    subject: 'Geografia',
    chapters: [7, 8],
    contentId: 'geografia-p1-capitulos-7-8',
    questionPrefix: 'geo-p1',
    title: 'Revisão P1 — Espaços rural e urbano',
    summary: 'Revisão dos capítulos 7 e 8: atividades econômicas dos espaços rural e urbano.',
    resourceId: 'courseware-252/chapters-7-8',
    contentScope:
      'capítulo 7 — atividades econômicas do espaço rural; capítulo 8 — atividades econômicas do espaço urbano',
    batches: [
      ['agricultura', 'grandes e pequenos produtores', 'agricultura orgânica'],
      ['pecuária', 'sistemas intensivo e extensivo', 'produtos da criação animal'],
      ['extrativismo', 'sustentabilidade', 'modernização do campo', 'êxodo rural'],
      ['indústria de base', 'bens intermediários', 'bens de consumo'],
      ['comércio', 'atacado e varejo', 'comércio interno e externo'],
      ['prestação de serviços', 'trabalho urbano', 'relações entre campo e cidade'],
    ],
  },
  'geografia-p2': {
    assessmentName: 'P2',
    subject: 'Geografia',
    chapters: [11, 12],
    contentId: 'geografia-p2-capitulos-11-12',
    questionPrefix: 'geo-p2',
    title: 'Revisão P2 — População e migrações',
    summary: 'Revisão dos capítulos 11 e 12: população brasileira e fluxos migratórios.',
    resourceId: 'courseware-252/chapters-11-12',
    contentScope: 'capítulo 11 — características da população brasileira; capítulo 12 — fluxos migratórios',
    batches: [
      ['demografia', 'indicadores demográficos', 'densidade demográfica'],
      ['distribuição da população brasileira', 'colonização', 'transportes', 'trabalho e clima'],
      ['setores de trabalho', 'trabalho formal e informal', 'direitos e igualdade'],
      ['migração', 'imigração', 'emigração', 'migração interna'],
      ['êxodo rural', 'migração sazonal', 'deslocamento pendular'],
      ['migrações internacionais', 'causas das migrações', 'diversidade cultural'],
    ],
  },
}

export function buildSourceBrief(topics = GEOGRAPHY_SOURCE_TOPICS, chapters = [7, 8]) {
  return topics
    .filter((topic) => typeof topic.chapter === 'number' && chapters.includes(topic.chapter))
    .map((topic) => ({
      chapter: topic.chapter,
      title: topic.title,
      pages: topic.pages,
      sourceSections: topic.sourceSections,
      sections: topic.sections,
      keyIdeas: topic.keyIdeas,
    }))
}

function sourceReferenceSchema() {
  return {
    type: 'object',
    properties: {
      section: { type: 'string' },
      pages: { type: 'string' },
    },
    required: ['section', 'pages'],
    additionalProperties: false,
  }
}

function questionBatchSchema() {
  const commonProperties = {
    difficulty: { type: 'string', enum: ['easy', 'intermediate', 'challenging'] },
    question: { type: 'string' },
    explanation: { type: 'string' },
    sourceRef: sourceReferenceSchema(),
  }
  return {
    type: 'object',
    properties: {
      multipleChoiceQuestions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...commonProperties,
            options: {
              type: 'array',
              items: { type: 'string' },
            },
            correctIndex: { type: 'integer' },
          },
          required: ['difficulty', 'question', 'options', 'correctIndex', 'explanation', 'sourceRef'],
          additionalProperties: false,
        },
      },
      matchColumnsQuestions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...commonProperties,
            pairs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  left: { type: 'string' },
                  right: { type: 'string' },
                },
                required: ['left', 'right'],
                additionalProperties: false,
              },
            },
          },
          required: ['difficulty', 'question', 'pairs', 'explanation', 'sourceRef'],
          additionalProperties: false,
        },
      },
    },
    required: ['multipleChoiceQuestions', 'matchColumnsQuestions'],
    additionalProperties: false,
  }
}

export function validateGeneratedQuestions(questions, expected) {
  const errors = []
  if (questions.length !== expected.total)
    errors.push(`esperadas ${expected.total} questões; recebidas ${questions.length}`)
  const multipleChoice = questions.filter((question) => question.type === 'multipleChoice').length
  const matchColumns = questions.filter((question) => question.type === 'matchColumns').length
  if (multipleChoice !== expected.multipleChoice)
    errors.push(`esperadas ${expected.multipleChoice} múltipla escolha; recebidas ${multipleChoice}`)
  if (matchColumns !== expected.matchColumns)
    errors.push(`esperadas ${expected.matchColumns} associações; recebidas ${matchColumns}`)
  for (const [difficulty, amount] of Object.entries(expected.difficulty || {})) {
    const received = questions.filter((question) => question.difficulty === difficulty).length
    if (Math.abs(received - amount) > 2)
      errors.push(`esperadas aproximadamente ${amount} questões ${difficulty}; recebidas ${received}`)
  }
  const normalizedTexts = questions
    .filter((question) => question.type === 'multipleChoice')
    .map((question) => question.question?.trim().toLocaleLowerCase('pt-BR'))
    .filter(Boolean)
  if (new Set(normalizedTexts).size !== normalizedTexts.length) errors.push('o lote contém enunciados repetidos')
  return errors
}

export function normalizeGeneratedQuestions(questions, expected) {
  const difficulties = ['easy', 'intermediate', 'challenging']
  const byTypeAndDifficulty = new Map()
  for (const type of ['multipleChoice', 'matchColumns']) {
    for (const difficulty of difficulties) {
      byTypeAndDifficulty.set(
        `${type}:${difficulty}`,
        questions.filter((question) => question.type === type && question.difficulty === difficulty),
      )
    }
  }

  for (let easy = 0; easy <= expected.difficulty.easy; easy += 1) {
    for (let intermediate = 0; intermediate <= expected.difficulty.intermediate; intermediate += 1) {
      const challenging = expected.multipleChoice - easy - intermediate
      if (challenging < 0 || challenging > expected.difficulty.challenging) continue
      const multipleTargets = { easy, intermediate, challenging }
      const matchTargets = Object.fromEntries(
        difficulties.map((difficulty) => [difficulty, expected.difficulty[difficulty] - multipleTargets[difficulty]]),
      )
      if (Object.values(matchTargets).some((amount) => amount < 0)) continue
      const enough = difficulties.every(
        (difficulty) =>
          byTypeAndDifficulty.get(`multipleChoice:${difficulty}`).length >= multipleTargets[difficulty] &&
          byTypeAndDifficulty.get(`matchColumns:${difficulty}`).length >= matchTargets[difficulty],
      )
      if (!enough) continue

      return ['multipleChoice', 'matchColumns'].flatMap((type) =>
        difficulties.flatMap((difficulty) => {
          const target = type === 'multipleChoice' ? multipleTargets[difficulty] : matchTargets[difficulty]
          return byTypeAndDifficulty.get(`${type}:${difficulty}`).slice(0, target)
        }),
      )
    }
  }
  return questions
}

export function renderPrompt(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, String(value)),
    template,
  )
}

export function structuredCollection(value) {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') return Object.values(value)
  if (typeof value === 'string') {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed
    if (parsed && typeof parsed === 'object') return Object.values(parsed)
  }
  throw new Error('Claude retornou uma coleção de questões em formato inválido')
}

async function generateBatch({
  apiKey,
  model,
  config,
  batch,
  sourceBrief,
  systemPrompt,
  batchTemplate,
  existingQuestions,
}) {
  const prompt = renderPrompt(batchTemplate, {
    BATCH_NUMBER: batch.number,
    TOTAL_BATCHES: batch.totalBatches,
    ASSESSMENT_NAME: config.assessmentName,
    SUBJECT: config.subject,
    TOTAL: batch.total,
    MULTIPLE_CHOICE: batch.multipleChoice,
    MATCH_COLUMNS: batch.matchColumns,
    CONTENT_SCOPE: config.contentScope,
    CURRICULUM_SKILLS:
      'Nenhuma habilidade curricular adicional foi fornecida. Use apenas os objetivos e conceitos da fonte editorial.',
    EASY: batch.difficulty.easy,
    INTERMEDIATE: batch.difficulty.intermediate,
    CHALLENGING: batch.difficulty.challenging,
    FOCUS: batch.focus.map((focus) => `- ${focus}`).join('\n'),
    AVOID_QUESTIONS: existingQuestions.length
      ? existingQuestions.map((question) => `- ${question.question}`).join('\n')
      : 'Nenhuma; este é o primeiro lote.',
    SOURCE_BRIEF: JSON.stringify(sourceBrief, null, 2),
  })

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 6000,
      temperature: 0.3,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
      output_config: {
        format: {
          type: 'json_schema',
          schema: questionBatchSchema(),
        },
      },
    }),
  })

  const payload = await response.json()
  if (!response.ok)
    throw new Error(`Anthropic API ${response.status}: ${payload.error?.message || 'falha desconhecida'}`)
  const textBlock = payload.content?.find((block) => block.type === 'text')
  if (!textBlock?.text) throw new Error('Claude não retornou o lote JSON esperado')
  const input = JSON.parse(textBlock.text)
  if (!input.multipleChoiceQuestions || !input.matchColumnsQuestions)
    throw new Error('Claude não retornou as coleções esperadas')
  const questions = [
    ...structuredCollection(input.multipleChoiceQuestions).map((question) => ({ ...question, type: 'multipleChoice' })),
    ...structuredCollection(input.matchColumnsQuestions).map((question) => ({ ...question, type: 'matchColumns' })),
  ]
  return { questions, usage: payload.usage, stopReason: payload.stop_reason }
}

export function assembleDraft({ questions, model, config = GEOGRAPHY_CONFIGS['geografia-p1'] }) {
  const numbered = questions.map((question, index) => {
    const id = `${config.questionPrefix}-${String(index + 1).padStart(3, '0')}`
    if (question.type !== 'multipleChoice' || !Array.isArray(question.options)) return { ...question, id }
    const rotation = index % 4
    return {
      ...question,
      id,
      options: question.options.map((_, optionIndex) => question.options[(optionIndex + rotation) % 4]),
      correctIndex: (question.correctIndex - rotation + 4) % 4,
    }
  })
  return {
    id: config.contentId,
    subjectId: 'geografia',
    title: config.title,
    summary: config.summary,
    source: { provider: 'edebe', resourceId: config.resourceId, version: '2024' },
    generation: { model, promptVersion: PROMPT_VERSION, generatedAt: new Date().toISOString() },
    status: 'draft',
    questions: numbered,
  }
}

async function main() {
  const apiKey = requiredEnvironment('ANTHROPIC_API_KEY')
  const model = requiredEnvironment('ANTHROPIC_MODEL')
  const configurationName = process.argv[2] || 'geografia-p1'
  const config = GEOGRAPHY_CONFIGS[configurationName]
  if (!config)
    throw new Error(
      `Configuração desconhecida: ${configurationName}. Opções: ${Object.keys(GEOGRAPHY_CONFIGS).join(', ')}`,
    )
  const output = resolve(process.argv[3] || `editorial/drafts/${configurationName}.json`)
  const sourceBrief = buildSourceBrief(GEOGRAPHY_SOURCE_TOPICS, config.chapters)
  const [systemPrompt, batchTemplate] = await Promise.all([
    readFile(SYSTEM_PROMPT_PATH, 'utf8'),
    readFile(BATCH_PROMPT_PATH, 'utf8'),
  ])
  const batches = config.batches.map((focus, index) => ({
    number: index + 1,
    totalBatches: config.batches.length,
    total: 10,
    multipleChoice: index < 3 ? 8 : 7,
    matchColumns: index < 3 ? 2 : 3,
    difficulty: { easy: 3, intermediate: 5, challenging: 2 },
    focus,
  }))

  const generated = []
  const usage = []
  await mkdir(dirname(output), { recursive: true })
  for (const batch of batches) {
    const checkpoint = resolve(dirname(output), `.${configurationName}-batch-${batch.number}.json`)
    let result
    let shouldWriteCheckpoint = false
    try {
      result = JSON.parse(await readFile(checkpoint, 'utf8'))
    } catch (error) {
      if (/** @type {{ code?: string }} */ (error).code !== 'ENOENT') throw error
      result = await generateBatch({
        apiKey,
        model,
        config,
        batch,
        sourceBrief,
        systemPrompt,
        batchTemplate,
        existingQuestions: generated,
      })
      shouldWriteCheckpoint = true
    }
    const normalized = normalizeGeneratedQuestions(result.questions, batch)
    const errors = validateGeneratedQuestions(normalized, batch)
    const existingTexts = new Set(
      generated
        .filter((question) => question.type === 'multipleChoice')
        .map((question) => question.question.trim().toLocaleLowerCase('pt-BR')),
    )
    const repeatedAcrossBatches = normalized.filter(
      (question) =>
        question.type === 'multipleChoice' && existingTexts.has(question.question.trim().toLocaleLowerCase('pt-BR')),
    )
    if (repeatedAcrossBatches.length)
      errors.push(`enunciado repetido em outro lote: ${repeatedAcrossBatches.map((item) => item.question).join(' | ')}`)
    if (errors.length) throw new Error(`Lote ${batch.number} inválido: ${errors.join('; ')}`)
    if (shouldWriteCheckpoint) await writeFile(checkpoint, `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' })
    generated.push(...normalized)
    usage.push({ batch: batch.number, ...result.usage, stopReason: result.stopReason })
  }

  const draft = assembleDraft({ questions: generated, model, config })
  const structural = validateEditorialContent(draft)
  if (!structural.valid) throw new Error(`Rascunho inválido: ${structural.errors.join('; ')}`)

  await writeFile(output, `${JSON.stringify({ ...draft, generation: { ...draft.generation, usage } }, null, 2)}\n`, {
    flag: 'wx',
  })
  console.log(`Rascunho criado em ${output}`)
  console.log('Status: draft — revisão editorial independente obrigatória antes da publicação')
}

if (fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
