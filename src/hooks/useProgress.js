import { useState, useCallback } from 'react'

const STORAGE_KEY = 'patito_progress'

const defaultProgress = {}

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultProgress
  } catch {
    return defaultProgress
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(() => loadProgress())

  const updateTopicProgress = useCallback((subjectId, topicId, { stars, score, total }) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [subjectId]: {
          ...prev[subjectId],
          [topicId]: {
            stars,
            completed: true,
            bestScore: score,
            total,
            lastPlayed: new Date().toISOString()
          }
        }
      }
      saveProgress(next)
      return next
    })
  }, [])

  const getTopicProgress = useCallback((subjectId, topicId) => {
    return progress[subjectId]?.[topicId] || { stars: 0, completed: false, bestScore: 0 }
  }, [progress])

  const getSubjectProgress = useCallback((subjectId, topics) => {
    if (!topics || topics.length === 0) return 0
    const subjectProg = progress[subjectId] || {}
    const completed = topics.filter(t => subjectProg[t.id]?.completed).length
    return Math.round((completed / topics.length) * 100)
  }, [progress])

  return { progress, updateTopicProgress, getTopicProgress, getSubjectProgress }
}
