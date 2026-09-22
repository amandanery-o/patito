import { describe, expect, it } from 'vitest'
import { ENGLISH_TOPICS } from './ingles'

describe('material de Inglês P1', () => {
  it('publica as unidades 5 e 6 com leitura e banco completo', () => {
    expect(ENGLISH_TOPICS).toHaveLength(1)
    const [topic] = ENGLISH_TOPICS
    expect(topic.chapter).toBe('5 e 6')
    expect(topic.source.resourceId).toBe('go-primary-4/digital-book/units-5-6')
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(5)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
