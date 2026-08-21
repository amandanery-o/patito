import { describe, expect, it } from 'vitest'
import { upcomingSchoolEvents } from './useSchoolEvents'

describe('upcomingSchoolEvents', () => {
  const today = new Date(2026, 7, 20, 12)

  it('inclui hoje e os próximos sete dias usando a data local', () => {
    const events = [
      { id: 'today', date: '2026-08-20' },
      { id: 'limit', date: '2026-08-27' },
      { id: 'later', date: '2026-08-28' },
      { id: 'past', date: '2026-08-19' },
    ]
    expect(upcomingSchoolEvents(events, 7, today).map((event) => event.id)).toEqual(['today', 'limit'])
  })

  it('mantém eventos de período enquanto estiverem acontecendo', () => {
    const events = [{ id: 'week', date: '2026-08-18', endDate: '2026-08-21' }]
    expect(upcomingSchoolEvents(events, 7, today)).toHaveLength(1)
  })
})
