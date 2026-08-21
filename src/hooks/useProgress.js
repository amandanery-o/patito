import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'patito_data'
const STORAGE_VERSION = 4

function freshState(base = {}, profile = null) {
  return {
    user: {
      name: profile?.name || 'Estudante',
      avatar: profile?.avatar || '🦁',
      ...(base.user || {}),
    },
    progress: base.progress || {},
    storageVersion: STORAGE_VERSION,
  }
}

function loadData(storageKey, profile) {
  try {
    const raw =
      localStorage.getItem(storageKey) || (storageKey.endsWith(':offline') ? localStorage.getItem(STORAGE_KEY) : null)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (!localStorage.getItem(storageKey)) saveData(storageKey, parsed)
      // Não importa progresso acadêmico nem gamificação de versões antigas.
      if ((parsed.storageVersion || 0) < STORAGE_VERSION) {
        const data = freshState(
          {
            user: {
              name: profile?.name || parsed.user?.name || 'Estudante',
              avatar: profile?.avatar || parsed.user?.avatar || '🦁',
            },
          },
          profile,
        )
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

export function useProgress({ userId = null, profile = null } = {}) {
  const storageKey = useMemo(() => `${STORAGE_KEY}:${userId || 'offline'}`, [userId])
  const [data, setData] = useState(() => loadData(storageKey, profile))

  useEffect(() => {
    setData(loadData(storageKey, profile))
  }, [storageKey, profile])

  useEffect(() => {
    if (!profile) return
    setData((prev) => {
      const isUntouched = prev.user.name === 'Estudante'
      if (!isUntouched) return prev
      const next = {
        ...prev,
        user: {
          ...prev.user,
          name: profile.name || prev.user.name,
          avatar: profile.avatar || prev.user.avatar,
        },
      }
      saveData(storageKey, next)
      return next
    })
  }, [profile, storageKey])

  function updateTopicProgress(subjectId, topicId) {
    setData((prev) => {
      const subjectProgress = { ...(prev.progress[subjectId] || {}) }
      subjectProgress[topicId] = {
        completed: true,
      }
      const next = {
        ...prev,
        progress: { ...prev.progress, [subjectId]: subjectProgress },
      }
      saveData(storageKey, next)
      return next
    })
  }

  function getTopicProgress(subjectId, topicId) {
    return data.progress[subjectId]?.[topicId] || { completed: false }
  }

  function getSubjectProgress(subjectId, totalTopics) {
    const sp = data.progress[subjectId] || {}
    const completed = Object.values(sp).filter((t) => t.completed).length
    return { completed, total: totalTopics, percent: totalTopics ? Math.round((completed / totalTopics) * 100) : 0 }
  }

  function setUserName(name) {
    setData((prev) => {
      const next = { ...prev, user: { ...prev.user, name } }
      saveData(storageKey, next)
      return next
    })
  }

  return {
    user: data.user,
    updateTopicProgress,
    getTopicProgress,
    getSubjectProgress,
    setUserName,
  }
}
