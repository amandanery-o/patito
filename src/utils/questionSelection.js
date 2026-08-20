import { shuffle } from './shuffle'

function shuffledWith(items, random) {
  if (random === Math.random) return shuffle(items)
  const result = [...items]
  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function selectStudyQuestions(questions, {
  limit = 30,
  mode = 'reinforcement',
  seenIds = [],
  incorrectIds = [],
  random = Math.random,
} = {}) {
  const seen = new Set(seenIds)
  const incorrect = new Set(incorrectIds)
  const wrong = questions.filter(question => incorrect.has(question.id))
  const unseen = questions.filter(question => !seen.has(question.id) && !incorrect.has(question.id))
  const remaining = questions.filter(question => seen.has(question.id) && !incorrect.has(question.id))
  const groups = mode === 'exam' ? [wrong, unseen, remaining] : [unseen, wrong, remaining]
  return groups.flatMap(group => shuffledWith(group, random)).slice(0, limit)
}

export function studyModeForSubject(events, subjectId, today = new Date()) {
  const start = new Date(today)
  start.setHours(0, 0, 0, 0)
  return events.some(event => {
    if (event.subject !== subjectId || event.type !== 'prova') return false
    const date = new Date(`${event.date}T00:00:00`)
    const days = Math.ceil((date - start) / 86400000)
    return days >= 0 && days <= 7
  }) ? 'exam' : 'reinforcement'
}
