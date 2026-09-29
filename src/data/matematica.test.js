import { describe, expect, it } from 'vitest'
import { MATHEMATICS_TOPICS } from './matematica'

describe('materiais de Matemática', () => {
  it('publica T2, P1 e P2 nos recortes definidos pelo calendário oficial', () => {
    expect(MATHEMATICS_TOPICS.map((topic) => topic.chapter)).toEqual(['4 e 8', '5, 6 e 7', '9, 10 e 11'])
    expect(MATHEMATICS_TOPICS.map((topic) => topic.source.resourceId)).toEqual([
      'courseware-250/chapters-4-8',
      'courseware-250/chapters-5-6-7',
      'courseware-250/chapters-9-10-11',
    ])
  })

  it.each(MATHEMATICS_TOPICS)('$reviewLabel possui resumo e banco aprovado completo', (topic) => {
    expect(topic.summarySections.length).toBeGreaterThanOrEqual(5)
    expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    expect(topic.questions).toHaveLength(60)
    expect(topic.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(topic.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })
})
