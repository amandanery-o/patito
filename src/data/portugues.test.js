import { describe, expect, it } from 'vitest'
import { PORTUGUESE_TOPICS } from './portugues'

describe('material de Português P1', () => {
  it('publica o escopo oficial com leitura e banco completo', () => {
    expect(PORTUGUESE_TOPICS).toHaveLength(1)
    const [topic] = PORTUGUESE_TOPICS
    expect(topic.source.resourceId).toBe('courseware-253/pages-110-124-144-146')
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(6)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(6)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
