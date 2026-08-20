import { useEffect, useMemo, useState } from 'react'
import { parseLocalDate } from '../utils/dates'

const STORAGE_KEY = 'patito_data'
const STORAGE_VERSION = 3

function freshState(base = {}, profile = null) {
  return {
    user: {
      name: profile?.name || 'Estudante',
      avatar: profile?.avatar || '🦁',
      xp: profile?.xp || 0,
      streak: {
        current: profile?.streak_current || 0,
        lastStudyDate: null,
        best: profile?.streak_best || 0,
      },
      trophies: [],
      ...(base.user || {}),
    },
    progress: base.progress || {},
    exams: base.exams || [],
    storageVersion: STORAGE_VERSION,
  }
}

function loadData(storageKey, profile) {
  try {
    const raw = localStorage.getItem(storageKey) ||
      (storageKey.endsWith(':offline') ? localStorage.getItem(STORAGE_KEY) : null)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (!localStorage.getItem(storageKey)) saveData(storageKey, parsed)
      // Versão de storage mudou: reseta exams mas preserva progresso e XP
      if ((parsed.storageVersion || 0) < STORAGE_VERSION) {
        const data = freshState({
          user: {
            name: profile?.name || parsed.user?.name || 'Estudante',
            avatar: profile?.avatar || parsed.user?.avatar || '🦁',
            xp: 0,
            streak: { current: 0, lastStudyDate: null, best: 0 },
            trophies: [],
          },
        }, profile)
        saveData(storageKey, data)
        return data
      }
      return parsed
    }
  } catch {}
  const data = freshState({}, profile)
  saveData(storageKey, data)
  return data
}

function saveData(storageKey, data) {
  localStorage.setItem(storageKey, JSON.stringify(data))
}

function nextStreak(streak = {}) {
  const today = new Date()
  const todayKey = today.toLocaleDateString('en-CA')
  if (streak.lastStudyDate === todayKey) return streak

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = yesterday.toLocaleDateString('en-CA')
  const current = streak.lastStudyDate === yesterdayKey ? (streak.current || 0) + 1 : 1
  return { current, best: Math.max(streak.best || 0, current), lastStudyDate: todayKey }
}

export function useProgress({ userId = null, profile = null } = {}) {
  const storageKey = useMemo(() => `${STORAGE_KEY}:${userId || 'offline'}`, [userId])
  const [data, setData] = useState(() => loadData(storageKey, profile))

  useEffect(() => {
    setData(loadData(storageKey, profile))
  }, [storageKey, profile])

  useEffect(() => {
    if (!profile) return
    setData(prev => {
      const isUntouched = prev.user.name === 'Estudante' && prev.user.xp === 0
      if (!isUntouched) return prev
      const next = {
        ...prev,
        user: {
          ...prev.user,
          name: profile.name || prev.user.name,
          avatar: profile.avatar || prev.user.avatar,
          xp: profile.xp || 0,
          streak: {
            ...prev.user.streak,
            current: profile.streak_current || 0,
            best: profile.streak_best || 0,
          },
        },
      }
      saveData(storageKey, next)
      return next
    })
  }, [profile, storageKey])

  function updateTopicProgress(subjectId, topicId, stars, xpEarned) {
    const updatedUser = {
      ...data.user,
      xp: data.user.xp + xpEarned,
      streak: nextStreak(data.user.streak),
    }
    setData(prev => {
      const subjectProgress = { ...(prev.progress[subjectId] || {}) }
      const existing = subjectProgress[topicId] || { stars: 0, completed: false, bestScore: 0 }
      subjectProgress[topicId] = {
        stars: Math.max(existing.stars, stars),
        completed: true,
        bestScore: Math.max(existing.bestScore, stars),
      }
      const next = {
        ...prev,
        progress: { ...prev.progress, [subjectId]: subjectProgress },
        user: {
          ...prev.user,
          xp: prev.user.xp + xpEarned,
          streak: nextStreak(prev.user.streak),
        },
      }
      saveData(storageKey, next)
      return next
    })
    return updatedUser
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
      saveData(storageKey, next)
      return next
    })
  }

  function updateExam(id, changes) {
    setData(prev => {
      const next = { ...prev, exams: prev.exams.map(e => e.id === id ? { ...e, ...changes } : e) }
      saveData(storageKey, next)
      return next
    })
  }

  function setUserName(name) {
    setData(prev => {
      const next = { ...prev, user: { ...prev.user, name } }
      saveData(storageKey, next)
      return next
    })
  }

  function removeExam(id) {
    setData(prev => {
      const next = { ...prev, exams: prev.exams.filter(e => e.id !== id) }
      saveData(storageKey, next)
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
