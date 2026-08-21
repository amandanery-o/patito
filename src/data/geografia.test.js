import { describe, expect, it } from 'vitest'
import { GEOGRAPHY_TOPICS } from './geografia'

describe('conteúdos de Geografia', () => {
  it('mantém os conteúdos do segundo semestre rastreáveis à Edebê', () => {
    expect(GEOGRAPHY_TOPICS.map((topic) => topic.chapter)).toEqual([7, 8, '7 e 8', 11, 12])
    for (const topic of GEOGRAPHY_TOPICS) {
      expect(topic.source.provider).toBe('edebe')
      expect(topic.source.resourceId).toMatch(/^courseware-252-/)
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

  it('não expõe a P2 enquanto o lote estiver em preparação', () => {
    expect(GEOGRAPHY_TOPICS.find((topic) => topic.id === 'geografia-p2-populacao-migracoes')).toBeUndefined()
  })
})
