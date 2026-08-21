import { useEffect, useMemo, useState } from 'react'
import { createSchoolEventsRepository } from '../repositories/schoolEventsRepository'
import { parseLocalDate } from '../utils/dates'

export function upcomingSchoolEvents(events, daysAhead = 7, today = new Date()) {
  const startOfToday = new Date(today)
  startOfToday.setHours(0, 0, 0, 0)
  return events
    .filter((event) => {
      const start = parseLocalDate(event.date)
      const end = event.endDate ? parseLocalDate(event.endDate) : start
      if (event.endDate) return startOfToday >= start && startOfToday <= end
      const difference = Math.ceil((start.getTime() - startOfToday.getTime()) / 86400000)
      return difference >= 0 && difference <= daysAhead
    })
    .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime())
}

export function useSchoolEvents(authenticated, repository) {
  const stableRepository = useMemo(() => repository || createSchoolEventsRepository(), [repository])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(Boolean(authenticated))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authenticated) {
      setLoading(false)
      return
    }
    let active = true
    setLoading(true)
    stableRepository
      .list()
      .then((data) => {
        if (active) setEvents(data)
      })
      .catch(() => {
        if (active) setError('Não conseguimos carregar o calendário.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [authenticated, stableRepository])

  return { events, loading, error }
}
