import { describe, expect, it } from 'vitest'
import {
  assembleDraft,
  buildSourceBrief,
  normalizeGeneratedQuestions,
  renderPrompt,
  structuredCollection,
  validateQuestionDetails,
  validateGeneratedQuestions,
} from '../../scripts/editorial/generate-questions.mjs'
import { getEditorialConfig } from '../../scripts/editorial/editorial-configs.mjs'

function questions(multipleChoice, matchColumns) {
  return [
    ...Array.from({ length: multipleChoice }, (_, index) => ({
      type: 'multipleChoice',
      difficulty: 'intermediate',
      question: `Múltipla escolha ${index + 1}`,
    })),
    ...Array.from({ length: matchColumns }, (_, index) => ({
      type: 'matchColumns',
      difficulty: 'intermediate',
      question: `Associação ${index + 1}`,
    })),
  ]
}

describe('gerador editorial', () => {
  it('envia apenas o conteúdo editorial necessário, sem dados de aluno', () => {
    const config = getEditorialConfig('geografia-p1')
    const brief = buildSourceBrief(config.sourceTopics, config.chapters)
    const serialized = JSON.stringify(brief)
    expect(brief.map((item) => item.chapter)).toEqual([7, 8])
    expect(serialized).not.toMatch(/user|email|resposta do aluno/i)
  })

  it('seleciona somente os capítulos solicitados para outro lote', () => {
    const config = getEditorialConfig('geografia-p2')
    expect(buildSourceBrief(config.sourceTopics, config.chapters).map((item) => item.chapter)).toEqual([11, 12])
  })

  it.each([
    ['matematica-t2', [4, 8], 'matematica-t2-capitulos-4-8'],
    ['matematica-p1', [5, 6, 7], 'matematica-p1-capitulos-5-6-7'],
  ])('mantém o recorte oficial de %s', (configurationName, chapters, contentId) => {
    const config = getEditorialConfig(configurationName)
    const brief = buildSourceBrief(config.sourceTopics, config.chapters)
    expect(brief.map((item) => item.chapter)).toEqual(chapters)
    expect(config).toMatchObject({ subjectId: 'matematica', contentId })
  })

  it('valida quantidade e distribuição de formatos', () => {
    expect(validateGeneratedQuestions(questions(23, 7), { total: 30, multipleChoice: 23, matchColumns: 7 })).toEqual([])
    expect(
      validateGeneratedQuestions(questions(24, 6), { total: 30, multipleChoice: 23, matchColumns: 7 }),
    ).toHaveLength(2)
  })

  it('rejeita explicação ausente, referência inventada e associação ambígua', () => {
    const sourceBrief = buildSourceBrief(getEditorialConfig('matematica-p1').sourceTopics, [5])
    const invalid = [
      {
        type: 'matchColumns',
        explanation: '',
        sourceRef: { section: 'Seção inventada', pages: '1–2' },
        pairs: [
          { left: 'A', right: 'Mesmo' },
          { left: 'B', right: 'Mesmo' },
          { left: 'C', right: 'Outro' },
        ],
      },
    ]
    expect(validateQuestionDetails(invalid, sourceBrief)).toHaveLength(4)
  })

  it('valida a distribuição de dificuldade', () => {
    const generated = [
      ...Array.from({ length: 9 }, () => ({ type: 'multipleChoice', difficulty: 'easy' })),
      ...Array.from({ length: 14 }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
      ...Array.from({ length: 6 }, () => ({ type: 'matchColumns', difficulty: 'challenging' })),
      { type: 'matchColumns', difficulty: 'intermediate' },
    ]
    expect(
      validateGeneratedQuestions(generated, {
        total: 30,
        multipleChoice: 23,
        matchColumns: 7,
        difficulty: { easy: 9, intermediate: 15, challenging: 6 },
      }),
    ).toEqual([])
  })

  it('aceita uma variação de duas questões na distribuição aproximada', () => {
    const generated = [
      ...Array.from({ length: 11 }, () => ({ type: 'multipleChoice', difficulty: 'easy' })),
      ...Array.from({ length: 12 }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
      ...Array.from({ length: 3 }, () => ({ type: 'matchColumns', difficulty: 'intermediate' })),
      ...Array.from({ length: 4 }, () => ({ type: 'matchColumns', difficulty: 'challenging' })),
    ]
    expect(
      validateGeneratedQuestions(generated, {
        total: 30,
        multipleChoice: 23,
        matchColumns: 7,
        difficulty: { easy: 9, intermediate: 15, challenging: 6 },
      }),
    ).toEqual([])
  })

  it('reduz conteúdo excedente preservando formato e dificuldade', () => {
    const generated = [
      ...Array.from({ length: 11 }, () => ({ type: 'multipleChoice', difficulty: 'easy' })),
      ...Array.from({ length: 12 }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
      ...Array.from({ length: 3 }, () => ({ type: 'multipleChoice', difficulty: 'challenging' })),
      ...Array.from({ length: 4 }, () => ({ type: 'matchColumns', difficulty: 'intermediate' })),
      ...Array.from({ length: 3 }, () => ({ type: 'matchColumns', difficulty: 'challenging' })),
    ]
    const expected = {
      total: 30,
      multipleChoice: 23,
      matchColumns: 7,
      difficulty: { easy: 9, intermediate: 15, challenging: 6 },
    }
    const normalized = normalizeGeneratedQuestions(generated, expected)
    expect(validateGeneratedQuestions(normalized, expected)).toEqual([])
  })

  it('monta um rascunho com IDs determinísticos', () => {
    const draft = assembleDraft({ questions: questions(1, 1), model: 'modelo-configurado' })
    expect(draft.status).toBe('draft')
    expect(draft.questions.map((question) => question.id)).toEqual(['geo-p1-001', 'geo-p1-002'])
  })

  it('mantém matéria e fonte definidas pela configuração', () => {
    const config = {
      ...getEditorialConfig('geografia-p1'),
      subjectId: 'matematica',
      questionPrefix: 'mat-p1',
      contentId: 'matematica-p1',
      source: { provider: 'edebe', resourceId: 'livro-matematica/capitulos-5-7', version: '2024' },
    }
    const draft = assembleDraft({ questions: questions(1, 0), model: 'modelo-configurado', config })
    expect(draft.subjectId).toBe('matematica')
    expect(draft.questions[0].id).toBe('mat-p1-001')
    expect(draft.source.resourceId).toBe('livro-matematica/capitulos-5-7')
  })

  it('distribui a posição das respostas ao montar o rascunho', () => {
    const input = Array.from({ length: 8 }, () => ({
      type: 'multipleChoice',
      difficulty: 'easy',
      question: 'Questão',
      options: ['Errada 1', 'Certa', 'Errada 2', 'Errada 3'],
      correctIndex: 1,
    }))
    const draft = assembleDraft({ questions: input, model: 'modelo-configurado' })
    expect(draft.questions.map((question) => question.correctIndex)).toEqual([1, 0, 3, 2, 1, 0, 3, 2])
    for (const question of draft.questions) expect(question.options[question.correctIndex]).toBe('Certa')
  })

  it('rejeita enunciados repetidos dentro de um lote', () => {
    const repeated = questions(2, 0).map((question) => ({ ...question, question: 'Mesmo enunciado' }))
    expect(validateGeneratedQuestions(repeated, { total: 2, multipleChoice: 2, matchColumns: 0 })).toContain(
      'o lote contém enunciados repetidos',
    )
  })

  it('renderiza todas as variáveis do prompt', () => {
    expect(renderPrompt('Lote {{BATCH}}: {{COUNT}} questões', { BATCH: 1, COUNT: 30 })).toBe('Lote 1: 30 questões')
  })

  it('permite inserir a crítica da tentativa anterior no novo pedido', () => {
    expect(renderPrompt('Corrija: {{RETRY_FEEDBACK}}', { RETRY_FEEDBACK: '- associação repetida' })).toBe(
      'Corrija: - associação repetida',
    )
  })

  it('normaliza coleções indexadas devolvidas pela ferramenta', () => {
    expect(structuredCollection({ 0: { question: 'A' }, 1: { question: 'B' } })).toEqual([
      { question: 'A' },
      { question: 'B' },
    ])
  })
})
