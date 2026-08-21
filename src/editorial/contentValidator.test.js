import { describe, expect, it } from 'vitest'
import { validateEditorialContent } from './contentValidator'

function question(index, type = 'multipleChoice') {
  const base = {
    id: `q-${index}`,
    type,
    difficulty: 'intermediate',
    question: `Pergunta ${index}?`,
    explanation: 'Explicação baseada no livro.',
    sourceRef: { section: 'Capítulo 1', pages: '10–20' },
  }
  return type === 'multipleChoice'
    ? { ...base, options: ['A', 'B', 'C', 'D'], correctIndex: 0 }
    : {
        ...base,
        pairs: [
          { left: 'A', right: '1' },
          { left: 'B', right: '2' },
          { left: 'C', right: '3' },
        ],
      }
}

function content(overrides = {}) {
  return {
    id: 'mat-fracoes',
    subjectId: 'matematica',
    title: 'Frações',
    summary: 'Resumo do capítulo.',
    source: { provider: 'edebe', resourceId: 'book-1/chapter-2', version: '2026-s2' },
    generation: { model: 'configured-model', promptVersion: 'v1' },
    status: 'approved',
    questions: Array.from({ length: 60 }, (_, index) =>
      question(index, index < 15 ? 'matchColumns' : 'multipleChoice'),
    ),
    ...overrides,
  }
}

describe('validateEditorialContent', () => {
  it('aprova um lote rastreável com 60 questões', () => {
    expect(validateEditorialContent(content())).toEqual({ valid: true, errors: [], warnings: [] })
  })

  it('impede publicação com banco menor que 60', () => {
    const result = validateEditorialContent(content({ questions: [question(1)] }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('conteúdo aprovado deve ter ao menos 60 questões')
  })

  it('rejeita questão sem referência ao livro', () => {
    const questions = content().questions
    questions[0] = { ...questions[0], sourceRef: undefined }
    expect(validateEditorialContent(content({ questions })).errors).toContain(
      'questions[0].sourceRef.section é obrigatória',
    )
  })

  it('rejeita associações com respostas repetidas', () => {
    const questions = content().questions
    questions[0] = {
      ...questions[0],
      pairs: [
        { left: 'A', right: 'Mesmo' },
        { left: 'B', right: 'Mesmo' },
        { left: 'C', right: 'Outro' },
      ],
    }
    const result = validateEditorialContent(content({ questions }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('questions[0].pairs não pode repetir itens da coluna direita')
  })
})
