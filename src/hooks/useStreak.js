import { useState, useCallback } from 'react'

const STORAGE_KEY = 'patito_streak'

function loadStreak() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { current: 0, best: 0, lastStudyDate: null }
  } catch {
    return { current: 0, best: 0, lastStudyDate: null }
  }
}

function saveStreak(streak) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streak))
  } catch {
    // Ignore
  }
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isYesterday(date, today) {
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(date, yesterday)
}

export function useStreak() {
  const [streak, setStreak] = useState(() => loadStreak())

  const recordStudy = useCallback(() => {
    setStreak(prev => {
      const today = new Date()
      const lastDate = prev.lastStudyDate ? new Date(prev.lastStudyDate) : null

      if (lastDate && isSameDay(lastDate, today)) {
        // Already studied today, no change
        return prev
      }

      let newCurrent
      if (!lastDate || !isYesterday(lastDate, today)) {
        // Streak broken or first time
        newCurrent = 1
      } else {
        // Continued streak
        newCurrent = prev.current + 1
      }

      const next = {
        current: newCurrent,
        best: Math.max(prev.best, newCurrent),
        lastStudyDate: today.toISOString()
      }
      saveStreak(next)
      return next
    })
  }, [])

  const STREAK_MILESTONES = [3, 7, 15, 30]

  const checkStreakMilestone = useCallback((current) => {
    return STREAK_MILESTONES.includes(current)
  }, [])

  return { streak, recordStudy, checkStreakMilestone }
}
