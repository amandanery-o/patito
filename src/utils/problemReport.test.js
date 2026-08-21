import { describe, expect, it } from 'vitest'
import { buildProblemReport, containsPersonalFields } from './problemReport'

describe('buildProblemReport', () => {
  it('mantém somente contexto técnico permitido', () => {
    const report = buildProblemReport(
      {
        correlationId: 'r1',
        kind: 'question',
        subjectId: 'matematica',
        questionId: 'q-10',
        description: 'Alternativas repetidas',
        name: 'Criança',
        email: 'child@example.com',
        answer: 'B',
      },
      '1.2.0',
    )
    expect(report).toEqual({
      correlationId: 'r1',
      kind: 'question',
      subjectId: 'matematica',
      contentId: null,
      questionId: 'q-10',
      description: 'Alternativas repetidas',
      appVersion: '1.2.0',
    })
    expect(containsPersonalFields(report)).toBe(false)
  })

  it('limita a descrição antes do envio', () => {
    expect(buildProblemReport({ description: 'x'.repeat(1100) }).description).toHaveLength(1000)
  })
})
