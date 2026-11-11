import { describe, expect, it } from 'vitest'
import { ENGLISH_TOPICS } from './ingles'

describe('material de Inglês P1', () => {
  it('publica as unidades 5 e 6 com leitura e banco completo', () => {
    const topic = ENGLISH_TOPICS.find((item) => item.id === 'ingles-p1-acoes-horas')
    expect(topic.chapter).toBe('5 e 6')
    expect(topic.source.resourceId).toBe('go-primary-4/digital-book/units-5-6')
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(5)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })

  it('prepara a revisão de novembro para as unidades 7 e 8', () => {
    const topic = ENGLISH_TOPICS.find((item) => item.id === 'ingles-novembro-2026')
    expect(topic.title).toBe('Prova de novembro — Inglês')
    expect(topic.examDate).toBe('2026-11-13')
    expect(topic.chapter).toBe('unidades 7 e 8')
    expect(topic.source.provider).toBe('richmond')
    expect(topic.summarySections).toHaveLength(3)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(4)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
