import { describe, expect, it } from 'vitest'
import { HISTORY_TOPICS } from './historia'

describe('material de História P1', () => {
  it('publica os capítulos 9 e 10 com leitura e banco completo', () => {
    expect(HISTORY_TOPICS).toHaveLength(1)
    const [topic] = HISTORY_TOPICS
    expect(topic.chapter).toBe('9 e 10')
    expect(topic.source.resourceId).toBe('courseware-255/chapters-9-10')
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(6)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
