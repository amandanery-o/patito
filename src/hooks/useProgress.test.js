import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useProgress } from './useProgress'

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 7, 20, 12))
  })

  afterEach(() => vi.useRealTimers())

  it('registra XP, conclusão e streak ao finalizar uma sessão', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.updateTopicProgress('ingles', 'ing-p1', 2, 70)
    })

    expect(result.current.user.xp).toBe(70)
    expect(result.current.user.streak).toMatchObject({ current: 1, best: 1 })
    expect(result.current.getTopicProgress('ingles', 'ing-p1')).toMatchObject({
      completed: true,
      stars: 2,
    })
  })

  it('não incrementa o streak duas vezes no mesmo dia', () => {
    const { result } = renderHook(() => useProgress())

    act(() => result.current.updateTopicProgress('ingles', 'ing-p1', 2, 20))
    act(() => result.current.updateTopicProgress('ingles', 'ing-p1', 3, 30))

    expect(result.current.user.xp).toBe(50)
    expect(result.current.user.streak.current).toBe(1)
    expect(result.current.getTopicProgress('ingles', 'ing-p1').stars).toBe(3)
  })

  it('isola os dados entre usuários autenticados', () => {
    const first = renderHook(() => useProgress({ userId: 'aluno-a' }))
    act(() => first.result.current.updateTopicProgress('ingles', 'ing-p1', 3, 100))
    first.unmount()

    const second = renderHook(() => useProgress({ userId: 'aluno-b' }))
    expect(second.result.current.user.xp).toBe(0)
    expect(second.result.current.getTopicProgress('ingles', 'ing-p1').completed).toBe(false)
  })
})
