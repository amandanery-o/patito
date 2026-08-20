import { describe, expect, it } from 'vitest'
import { assembleDraft, buildSourceBrief, renderPrompt, validateGeneratedQuestions } from '../../scripts/editorial/generate-questions.mjs'

function questions(multipleChoice, matchColumns) {
  return [
    ...Array.from({ length: multipleChoice }, () => ({ type: 'multipleChoice' })),
    ...Array.from({ length: matchColumns }, () => ({ type: 'matchColumns' })),
  ]
}

describe('gerador editorial', () => {
  it('envia apenas o conteúdo editorial necessário, sem dados de aluno', () => {
    const brief = buildSourceBrief()
    const serialized = JSON.stringify(brief)
    expect(brief.map(item => item.chapter)).toEqual([7, 8])
    expect(serialized).not.toMatch(/user|email|resposta do aluno/i)
  })

  it('valida quantidade e distribuição de formatos', () => {
    expect(validateGeneratedQuestions(questions(23, 7), { total: 30, multipleChoice: 23, matchColumns: 7 })).toEqual([])
    expect(validateGeneratedQuestions(questions(24, 6), { total: 30, multipleChoice: 23, matchColumns: 7 })).toHaveLength(2)
  })

  it('monta um rascunho com IDs determinísticos', () => {
    const draft = assembleDraft({ questions: questions(1, 1), model: 'modelo-configurado' })
    expect(draft.status).toBe('draft')
    expect(draft.questions.map(question => question.id)).toEqual(['geo-p1-001', 'geo-p1-002'])
  })

  it('renderiza todas as variáveis do prompt', () => {
    expect(renderPrompt('Lote {{BATCH}}: {{COUNT}} questões', { BATCH: 1, COUNT: 30 }))
      .toBe('Lote 1: 30 questões')
  })
})
