import { useState } from 'react'
import { SEMESTER_EXAMS, SEED_VERSION } from '../data/semesterExams'
import { parseLocalDate } from '../utils/dates'

const STORAGE_KEY = 'patito_data'

function applySeed(data) {
  if ((data.seedVersion || 0) >= SEED_VERSION) return data
  const seedIds = new Set(SEMESTER_EXAMS.map(e => e.id))
  // Mantém provas adicionadas pelo usuário (ids não são seed-*) e substitui as do seed pela versão atualizada
  const userExams = (data.exams || []).filter(e => !seedIds.has(e.id))
  return { ...data, exams: [...SEMESTER_EXAMS, ...userExams], seedVersion: SEED_VERSION }
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = applySeed(JSON.parse(raw))
      saveData(data)
      return data
    }
  } catch {}
  const initial = {
    user: {
      name: 'Estudante',
      avatar: '🦁',
      xp: 0,
      streak: { current: 0, lastStudyDate: null, best: 0 },
      trophies: [],
    },
    progress: {},
    exams: SEMESTER_EXAMS,
    seedVersion: SEED_VERSION,
  }
  saveData(initial)
  return initial
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

  function updateExam(id, changes) {
    setData(prev => {
      const next = { ...prev, exams: prev.exams.map(e => e.id === id ? { ...e, ...changes } : e) }
      saveData(next)
      return next
    })
  }

  function setUserName(name) {
    setData(prev => {
      const next = { ...prev, user: { ...prev.user, name } }
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
        const start = parseLocalDate(e.date)
        const end   = e.endDate ? parseLocalDate(e.endDate) : start
        // Evento com período: ativo se hoje está dentro do intervalo
        if (e.endDate) return today >= start && today <= end
        // Evento simples: dentro dos próximos N dias
        const diff = Math.ceil((start - today) / (1000 * 60 * 60 * 24))
        return diff >= 0 && diff <= daysAhead
      })
      .sort((a, b) => {
        // Provas e eventos com período aparecem primeiro
        const priority = { prova: 0, recuperacao: 1, trabalho: 2 }
        const pa = a.endDate ? 0 : (priority[a.type] ?? 2)
        const pb = b.endDate ? 0 : (priority[b.type] ?? 2)
        if (pa !== pb) return pa - pb
        return parseLocalDate(a.endDate || a.date) - parseLocalDate(b.endDate || b.date)
      })
  }

  return {
    user: data.user,
    exams: data.exams,
    updateTopicProgress,
    getTopicProgress,
    getSubjectProgress,
    addExam,
    updateExam,
    removeExam,
    getUpcomingExams,
    setUserName,
  }
}
