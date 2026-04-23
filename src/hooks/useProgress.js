import { useState } from 'react'
import { SEMESTER_EXAMS, SEED_VERSION } from '../data/semesterExams'
import { parseLocalDate } from '../utils/dates'

const STORAGE_KEY = 'patito_data'
const STORAGE_VERSION = 2

function freshState(base = {}) {
  return {
    user: base.user || { name: 'Estudante', avatar: '🦁', xp: 0, streak: { current: 0, lastStudyDate: null, best: 0 }, trophies: [] },
    progress: base.progress || {},
    exams: SEMESTER_EXAMS,
    seedVersion: SEED_VERSION,
    storageVersion: STORAGE_VERSION,
  }
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Versão de storage mudou: reseta exams mas preserva progresso e XP
      if ((parsed.storageVersion || 0) < STORAGE_VERSION) {
        const data = freshState(parsed)
        saveData(data)
        return data
      }
      // Seed atualizado: substitui só as provas do seed, mantém as do usuário
      if ((parsed.seedVersion || 0) < SEED_VERSION) {
        const seedIds = new Set(SEMESTER_EXAMS.map(e => e.id))
        const userExams = (parsed.exams || []).filter(e => !seedIds.has(e.id))
        const data = { ...parsed, exams: [...SEMESTER_EXAMS, ...userExams], seedVersion: SEED_VERSION }
        saveData(data)
        return data
      }
      return parsed
    }
  } catch {}
  const data = freshState()
  saveData(data)
  return data
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
