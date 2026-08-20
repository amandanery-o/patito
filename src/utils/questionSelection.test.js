import { describe, expect, it } from 'vitest'
import { selectStudyQuestions, studyModeForSubject } from './questionSelection'

const questions = Array.from({ length: 60 }, (_, index) => ({ id: `q-${index}` }))

describe('selectStudyQuestions', () => {
  it('seleciona 30 questões sem repetição', () => {
    const selected = selectStudyQuestions(questions, { random: () => 0.5 })
    expect(selected).toHaveLength(30)
    expect(new Set(selected.map(question => question.id)).size).toBe(30)
  })

  it('prioriza erros durante a semana de prova', () => {
    const selected = selectStudyQuestions(questions, {
      limit: 3, mode: 'exam', seenIds: questions.map(question => question.id),
      incorrectIds: ['q-10', 'q-20'], random: () => 0.5,
    })
    expect(selected.slice(0, 2).map(question => question.id).sort()).toEqual(['q-10', 'q-20'])
  })
})

describe('studyModeForSubject', () => {
  it('ativa semana de prova apenas para a matéria relacionada', () => {
    const events = [{ subject: 'matematica', type: 'prova', date: '2026-08-25' }]
    const today = new Date(2026, 7, 20, 12)
    expect(studyModeForSubject(events, 'matematica', today)).toBe('exam')
    expect(studyModeForSubject(events, 'historia', today)).toBe('reinforcement')
  })
})
