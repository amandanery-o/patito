import { useState } from 'react'

const STORAGE_KEY = 'patito_reports'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}

function save(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
}

export function useReports() {
  const [reports, setReports] = useState(load)

  function addReport({ questionId, question, subjectName, topicTitle }) {
    setReports(prev => {
      if (prev.some(r => r.questionId === questionId)) return prev
      const next = [{ questionId, question, subjectName, topicTitle, reportedAt: new Date().toISOString() }, ...prev]
      save(next)
      return next
    })
  }

  function clearReports() {
    save([])
    setReports([])
  }

  return { reports, addReport, clearReports }
}
