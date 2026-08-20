import { describe, expect, it } from 'vitest'
import { GEOGRAPHY_TOPICS } from './geografia'

describe('conteúdos de Geografia', () => {
  it('mantém as duas revisões da P1 rastreáveis à Edebê', () => {
    expect(GEOGRAPHY_TOPICS.map(topic => topic.chapter)).toEqual([7, 8])
    for (const topic of GEOGRAPHY_TOPICS) {
      expect(topic.source.provider).toBe('edebe')
      expect(topic.source.resourceId).toMatch(/^courseware-252-content-/)
      expect(topic.summarySections.length).toBeGreaterThanOrEqual(5)
      expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(5)
    }
  })
})
