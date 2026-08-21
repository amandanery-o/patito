import { useState } from 'react'
import { createProblemReportRepository } from '../repositories/problemReportRepository'
import { buildProblemReport } from '../utils/problemReport'

const STORAGE_KEY = 'patito_reports'

function load(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || []
  } catch {
    return []
  }
}

function save(storageKey, reports) {
  localStorage.setItem(storageKey, JSON.stringify(reports))
}

export function useReports(userId = null, repository = createProblemReportRepository()) {
  const storageKey = `${STORAGE_KEY}:${userId || 'offline'}`
  const [reports, setReports] = useState(() => load(storageKey))

  async function addReport(input) {
    const payload = buildProblemReport(input, import.meta.env.VITE_APP_VERSION || 'dev')
    if (reports.some((report) => report.correlationId === payload.correlationId)) return
    const pending = { ...payload, status: 'sending', reportedAt: new Date().toISOString() }
    setReports((previous) => {
      const next = [pending, ...previous]
      save(storageKey, next)
      return next
    })
    try {
      await repository.submit(payload)
      setReports((previous) => {
        const next = previous.map((report) =>
          report.correlationId === payload.correlationId ? { ...report, status: 'sent' } : report,
        )
        save(storageKey, next)
        return next
      })
    } catch (error) {
      setReports((previous) => {
        const next = previous.map((report) =>
          report.correlationId === payload.correlationId ? { ...report, status: 'error' } : report,
        )
        save(storageKey, next)
        return next
      })
      throw error
    }
  }

  function clearReports() {
    save(storageKey, [])
    setReports([])
  }

  return { reports, addReport, clearReports }
}
