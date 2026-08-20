import { useState } from 'react'

const STORAGE_KEY = 'patito_reports'

function load(storageKey) {
  try { return JSON.parse(localStorage.getItem(storageKey)) || [] } catch { return [] }
}

function save(storageKey, reports) {
  localStorage.setItem(storageKey, JSON.stringify(reports))
}

export function useReports(userId = null) {
  const storageKey = `${STORAGE_KEY}:${userId || 'offline'}`
  const [reports, setReports] = useState(() => load(storageKey))

  function addReport({ questionId, question, subjectName, topicTitle }) {
    setReports(prev => {
      if (prev.some(r => r.questionId === questionId)) return prev
      const next = [{ questionId, question, subjectName, topicTitle, reportedAt: new Date().toISOString() }, ...prev]
      save(storageKey, next)
      return next
    })
  }

  function clearReports() {
    save(storageKey, [])
    setReports([])
  }

  return { reports, addReport, clearReports }
}
