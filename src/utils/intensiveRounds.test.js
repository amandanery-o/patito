import { describe, expect, it } from 'vitest'
import { STUDY_SUBJECTS } from '../data/appConfig'
import { validateEditorialContent } from '../editorial/contentValidator'
import { intensiveRounds } from './intensiveRounds'

const subjects = ['matematica', 'ciencias', 'historia']

describe('intensivão das provas restantes', () => {
  it.each(subjects)('%s tem conteúdo aprovado e duas rodadas estáveis, novas e distintas', (subjectId) => {
    const subject = STUDY_SUBJECTS.find((item) => item.id === subjectId)
    const topic = subject.topics.find((item) => item.reviewLabel === 'NOVEMBRO')
    const content = topic.intensive
    expect(validateEditorialContent({ ...content, id: content.contentId, subjectId })).toEqual({
      valid: true,
      errors: [],
      warnings: [],
    })
    expect(content.editorialApproval.reviewerType).toBe('agent')
    expect(content.editorialApproval.draftDigest).toMatch(/^[0-9a-f]{64}$/)
    expect(content.summarySections.length).toBeGreaterThan(0)
    expect(content.questions.filter((q) => q.type === 'multipleChoice')).toHaveLength(45)
    expect(content.questions.filter((q) => q.type === 'matchColumns')).toHaveLength(15)

    const rounds = intensiveRounds(topic)
    expect(rounds).toEqual(intensiveRounds(topic))
    expect(rounds).toHaveLength(2)
    const previousIds = new Set(subject.topics.flatMap((item) => item.questions.map((q) => q.id)))
    const previousQuestions = new Set(subject.topics.flatMap((item) => item.questions.map((q) => q.question)))
    const ids = rounds.flatMap((round) => round.questions.map((q) => q.id))
    expect(new Set(ids).size).toBe(60)
    expect(new Set(ids)).toEqual(new Set(content.questions.map((q) => q.id)))
    for (const round of rounds) {
      expect(round.id).not.toBe(topic.id)
      expect(round.questions).toHaveLength(30)
      expect(round.questions.some((q) => q.type === 'matchColumns')).toBe(true)
      expect(round.questions.every((q) => !previousIds.has(q.id) && !previousQuestions.has(q.question))).toBe(true)
    }
    expect(rounds[0].id).not.toBe(rounds[1].id)
  })

  it('não oferece intensivos incompletos, não aprovados ou para provas já realizadas', () => {
    expect(intensiveRounds({})).toEqual([])
    expect(intensiveRounds({ intensive: { status: 'draft', questions: Array(60).fill({}) } })).toEqual([])
    expect(intensiveRounds({ intensive: { status: 'approved', questions: [] } })).toEqual([])
    for (const subject of STUDY_SUBJECTS.filter((item) => !subjects.includes(item.id))) {
      expect(subject.topics.flatMap(intensiveRounds)).toEqual([])
    }
  })
})
