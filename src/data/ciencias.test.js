import { describe, expect, it } from 'vitest'
import { SCIENCE_TOPICS } from './ciencias'

describe('material de Ciências P1', () => {
  it('publica os capítulos 8 e 9 com leitura e banco completo', () => {
    expect(SCIENCE_TOPICS).toHaveLength(1)
    const [topic] = SCIENCE_TOPICS
    expect(topic.chapter).toBe('8 e 9')
    expect(topic.source.resourceId).toBe('courseware-249/chapters-8-9')
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(5)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
