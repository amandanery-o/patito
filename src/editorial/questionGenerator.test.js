import { describe, expect, it } from 'vitest'
import {
  assembleDraft, buildSourceBrief, normalizeGeneratedQuestions, renderPrompt, structuredCollection, validateGeneratedQuestions,
} from '../../scripts/editorial/generate-questions.mjs'

function questions(multipleChoice, matchColumns) {
  return [
    ...Array.from({ length: multipleChoice }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
    ...Array.from({ length: matchColumns }, () => ({ type: 'matchColumns', difficulty: 'intermediate' })),
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

  it('valida a distribuição de dificuldade', () => {
    const generated = [
      ...Array.from({ length: 9 }, () => ({ type: 'multipleChoice', difficulty: 'easy' })),
      ...Array.from({ length: 14 }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
      ...Array.from({ length: 6 }, () => ({ type: 'matchColumns', difficulty: 'challenging' })),
      { type: 'matchColumns', difficulty: 'intermediate' },
    ]
    expect(validateGeneratedQuestions(generated, {
      total: 30, multipleChoice: 23, matchColumns: 7,
      difficulty: { easy: 9, intermediate: 15, challenging: 6 },
    })).toEqual([])
  })

  it('aceita uma variação de duas questões na distribuição aproximada', () => {
    const generated = [
      ...Array.from({ length: 11 }, () => ({ type: 'multipleChoice', difficulty: 'easy' })),
      ...Array.from({ length: 12 }, () => ({ type: 'multipleChoice', difficulty: 'intermediate' })),
      ...Array.from({ length: 3 }, () => ({ type: 'matchColumns', difficulty: 'intermediate' })),
      ...Array.from({ length: 4 }, () => ({ type: 'matchColumns', difficulty: 'challenging' })),
    ]
    expect(validateGeneratedQuestions(generated, {
      total: 30, multipleChoice: 23, matchColumns: 7,
      difficulty: { easy: 9, intermediate: 15, challenging: 6 },
    })).toEqual([])
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
      total: 30, multipleChoice: 23, matchColumns: 7,
      difficulty: { easy: 9, intermediate: 15, challenging: 6 },
    }
    const normalized = normalizeGeneratedQuestions(generated, expected)
    expect(validateGeneratedQuestions(normalized, expected)).toEqual([])
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

  it('normaliza coleções indexadas devolvidas pela ferramenta', () => {
    expect(structuredCollection({ 0: { question: 'A' }, 1: { question: 'B' } }))
      .toEqual([{ question: 'A' }, { question: 'B' }])
  })
})
