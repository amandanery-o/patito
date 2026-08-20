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

  it('registra a conclusão sem notas ou gamificação', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.updateTopicProgress('ingles', 'ing-p1')
    })

    expect(result.current.getTopicProgress('ingles', 'ing-p1')).toMatchObject({
      completed: true,
    })
    expect(result.current.user).not.toHaveProperty('xp')
    expect(result.current.user).not.toHaveProperty('streak')
  })

  it('permite repetir o conteúdo sem criar métricas de desempenho', () => {
    const { result } = renderHook(() => useProgress())

    act(() => result.current.updateTopicProgress('ingles', 'ing-p1'))
    act(() => result.current.updateTopicProgress('ingles', 'ing-p1'))

    expect(result.current.getTopicProgress('ingles', 'ing-p1')).toEqual({ completed: true })
  })

  it('isola os dados entre usuários autenticados', () => {
    const first = renderHook(() => useProgress({ userId: 'aluno-a' }))
    act(() => first.result.current.updateTopicProgress('ingles', 'ing-p1'))
    first.unmount()

    const second = renderHook(() => useProgress({ userId: 'aluno-b' }))
    expect(second.result.current.getTopicProgress('ingles', 'ing-p1').completed).toBe(false)
  })
})
