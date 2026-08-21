import { describe, expect, it, vi } from 'vitest'
import { createSchoolEventsRepository, mapSchoolEvent } from './schoolEventsRepository'

describe('schoolEventsRepository', () => {
  it('converte os nomes do banco para o formato da interface', () => {
    expect(
      mapSchoolEvent({
        id: 'e1',
        subject_id: 'matematica',
        type: 'prova',
        date: '2026-08-25',
        end_date: null,
        time: '14:30:00',
        weight: 2,
        content: 'Frações',
        notes: null,
      }),
    ).toEqual({
      id: 'e1',
      externalId: undefined,
      subject: 'matematica',
      type: 'prova',
      date: '2026-08-25',
      endDate: null,
      time: '14:30',
      weight: 2,
      content: 'Frações',
      notes: null,
    })
  })

  it('consulta eventos em ordem de data', async () => {
    const query = { select: vi.fn(() => query), order: vi.fn().mockResolvedValue({ data: [], error: null }) }
    const client = { from: vi.fn(() => query) }
    await expect(createSchoolEventsRepository(client).list()).resolves.toEqual([])
    expect(client.from).toHaveBeenCalledWith('school_events')
    expect(query.order).toHaveBeenCalledWith('date')
  })
})
