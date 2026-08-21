import { useEffect, useMemo, useState } from 'react'
import { createSchoolEventsRepository } from '../repositories/schoolEventsRepository'
import { calendarDayDifference, parseLocalDate } from '../utils/dates'

export function upcomingSchoolEvents(events, daysAhead = 7, today = new Date()) {
  const uniqueEvents = new Map()
  for (const event of events) {
    const key = event.externalId || event.id
    if (!uniqueEvents.has(key)) uniqueEvents.set(key, event)
  }

  return [...uniqueEvents.values()]
    .filter((event) => {
      const startsIn = calendarDayDifference(event.date, today)
      if (!event.endDate) return startsIn >= 0 && startsIn <= daysAhead

      const endsIn = calendarDayDifference(event.endDate, today)
      const isActive = startsIn <= 0 && endsIn >= 0
      const startsSoon = startsIn >= 0 && startsIn <= daysAhead
      return isActive || startsSoon
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
        if (active) setError('Não conseguimos carregar a agenda escolar.')
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
