import { useState, useCallback } from 'react'

const STORAGE_KEY = 'patito_xp'

const TROPHIES = [
  {
    id: 'first-session',
    name: 'Primeiros Passos',
    icon: '🥇',
    description: 'Completar a primeira sessão',
    condition: (stats) => stats.sessionsCompleted >= 1
  },
  {
    id: 'on-fire',
    name: 'Em Chamas',
    icon: '🔥',
    description: 'Streak de 7 dias',
    condition: (stats) => stats.streak >= 7
  },
  {
    id: 'perfect',
    name: 'Perfeito!',
    icon: '🌟',
    description: 'Fazer 5 sessões perfeitas',
    condition: (stats) => stats.perfectSessions >= 5
  },
  {
    id: 'curious',
    name: 'Curioso',
    icon: '📚',
    description: 'Completar 1 tópico em cada matéria',
    condition: (stats) => stats.subjectsWithCompletion >= 7
  },
  {
    id: 'master',
    name: 'Mestre do 4º Ano',
    icon: '🏆',
    description: 'Completar todos os tópicos de todas as matérias',
    condition: (stats) => stats.totalTopicsCompleted >= 13
  },
  {
    id: 'genius',
    name: 'Gênio',
    icon: '🧠',
    description: 'Acumular 1000 XP',
    condition: (stats) => stats.totalXP >= 1000
  }
]

function loadXPData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {
      totalXP: 0,
      sessionsCompleted: 0,
      perfectSessions: 0,
      trophies: []
    }
  } catch {
    return { totalXP: 0, sessionsCompleted: 0, perfectSessions: 0, trophies: [] }
  }
}

function saveXPData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Ignore
  }
}

export function useXP() {
  const [xpData, setXPData] = useState(() => loadXPData())

  const addXP = useCallback((amount, { isPerfect = false, streak = 0, subjectsWithCompletion = 0, totalTopicsCompleted = 0 } = {}) => {
    const current = loadXPData()
    const newTotal = current.totalXP + amount
    const newSessions = current.sessionsCompleted + 1
    const newPerfect = current.perfectSessions + (isPerfect ? 1 : 0)

    const stats = {
      totalXP: newTotal,
      sessionsCompleted: newSessions,
      perfectSessions: newPerfect,
      streak,
      subjectsWithCompletion,
      totalTopicsCompleted
    }

    const currentTrophyIds = new Set(current.trophies)
    const earnedTrophies = []

    TROPHIES.forEach(trophy => {
      if (!currentTrophyIds.has(trophy.id) && trophy.condition(stats)) {
        earnedTrophies.push(trophy)
        currentTrophyIds.add(trophy.id)
      }
    })

    const next = {
      totalXP: newTotal,
      sessionsCompleted: newSessions,
      perfectSessions: newPerfect,
      trophies: [...currentTrophyIds]
    }
    saveXPData(next)
    setXPData(next)

    return earnedTrophies
  }, [])

  const calculateSessionXP = useCallback((correctAnswers, totalQuestions) => {
    const baseXP = correctAnswers * 10 + 20 // 10 per correct + 20 completion bonus
    const isPerfect = correctAnswers === totalQuestions
    const bonusXP = isPerfect ? 50 : 0
    return { xp: baseXP + bonusXP, isPerfect }
  }, [])

  return { xpData, addXP, calculateSessionXP, TROPHIES }
}
