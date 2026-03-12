import { useState } from 'react'

const STORAGE_KEY = 'patito_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    user: {
      name: 'Estudante',
      avatar: '🦁',
      xp: 0,
      streak: { current: 0, lastStudyDate: null, best: 0 },
      trophies: [],
    },
    progress: {},
    exams: [],
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [data, setData] = useState(loadData)

  function updateTopicProgress(subjectId, topicId, stars, xpEarned) {
    setData(prev => {
      const next = { ...prev }
      if (!next.progress[subjectId]) next.progress[subjectId] = {}
      const existing = next.progress[subjectId][topicId] || { stars: 0, completed: false, bestScore: 0 }
      next.progress[subjectId][topicId] = {
        stars: Math.max(existing.stars, stars),
        completed: true,
        bestScore: Math.max(existing.bestScore, stars),
      }
      next.user = { ...next.user, xp: next.user.xp + xpEarned }
      saveData(next)
      return next
    })
  }

  function getTopicProgress(subjectId, topicId) {
    return data.progress[subjectId]?.[topicId] || { stars: 0, completed: false }
  }

  function getSubjectProgress(subjectId, totalTopics) {
    const sp = data.progress[subjectId] || {}
    const completed = Object.values(sp).filter(t => t.completed).length
    return { completed, total: totalTopics, percent: totalTopics ? Math.round((completed / totalTopics) * 100) : 0 }
  }

  function addExam(exam) {
    setData(prev => {
      const next = { ...prev, exams: [...prev.exams, { ...exam, id: `exam-${Date.now()}` }] }
      saveData(next)
      return next
    })
  }

  function removeExam(id) {
    setData(prev => {
      const next = { ...prev, exams: prev.exams.filter(e => e.id !== id) }
      saveData(next)
      return next
    })
  }

  function getUpcomingExams(daysAhead = 7) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return data.exams
      .filter(e => {
        const d = new Date(e.date)
        const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24))
        return diff >= 0 && diff <= daysAhead
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  return {
    user: data.user,
    exams: data.exams,
    updateTopicProgress,
    getTopicProgress,
    getSubjectProgress,
    addExam,
    removeExam,
    getUpcomingExams,
  }
}
