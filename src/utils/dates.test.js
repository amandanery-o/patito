import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { daysUntil, formatDate } from './dates'

describe('formatDate', () => {
  it('converte YYYY-MM-DD para DD/MM/YYYY', () => {
    expect(formatDate('2026-03-27')).toBe('27/03/2026')
    expect(formatDate('2026-12-01')).toBe('01/12/2026')
  })
})

describe('daysUntil', () => {
  beforeEach(() => {
    // Fixa "hoje" em 2026-03-22
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-22T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('retorna 0 para hoje', () => {
    expect(daysUntil('2026-03-22')).toBe(0)
  })

  it('retorna 1 para amanhã', () => {
    expect(daysUntil('2026-03-23')).toBe(1)
  })

  it('retorna 5 para daqui 5 dias', () => {
    expect(daysUntil('2026-03-27')).toBe(5)
  })

  it('retorna negativo para datas passadas', () => {
    expect(daysUntil('2026-03-21')).toBeLessThan(0)
  })
})
