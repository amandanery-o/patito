import { describe, expect, it } from 'vitest'
import { GEOGRAPHY_TOPICS } from './geografia'

describe('conteúdos de Geografia', () => {
  it('mantém os materiais aprovados do segundo semestre rastreáveis à Edebê', () => {
    expect(GEOGRAPHY_TOPICS.map((topic) => topic.chapter)).toEqual([7, 8, '7 e 8', '10 e 11'])
    for (const topic of GEOGRAPHY_TOPICS.filter((topic) => topic.source.provider === 'edebe')) {
      expect(topic.source.provider).toBe('edebe')
      expect(topic.source.resourceId).toMatch(/^courseware-252(?:-|\/)/)
      expect(topic.summarySections.length).toBeGreaterThanOrEqual(3)
      expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    }
  })

  it('publica a revisão da P1 com 60 questões', () => {
    const p1 = GEOGRAPHY_TOPICS.find((topic) => topic.id === 'geografia-p1-espacos-rural-urbano')
    expect(p1.questions).toHaveLength(60)
    expect(p1.questions.filter((question) => question.type === 'multipleChoice')).toHaveLength(45)
    expect(p1.questions.filter((question) => question.type === 'matchColumns')).toHaveLength(15)
  })

  it('publica a revisão de novembro com a data do calendário escolar', () => {
    const november = GEOGRAPHY_TOPICS.find((topic) => topic.id === 'geografia-novembro-2026')
    expect(november.reviewLabel).toBe('NOVEMBRO')
    expect(november.chapter).toBe('10 e 11')
    expect(november.questions).toHaveLength(60)
    expect(november.examDate).toBe('2026-11-16')
    expect(november.datePending).toBeUndefined()
  })
})
