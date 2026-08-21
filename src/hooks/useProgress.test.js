import { act, renderHook, waitFor } from '@testing-library/react'
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

  it('carrega do servidor o progresso concluído em outro dispositivo', async () => {
    vi.useRealTimers()
    const repository = {
      configured: true,
      list: vi.fn().mockResolvedValue([
        {
          subject_id: 'geografia',
          content_id: 'geo-p1',
          sessions_completed: 2,
          questions_answered: 60,
          last_studied_at: '2026-08-20T12:00:00Z',
        },
      ]),
    }
    const { result } = renderHook(() => useProgress({ userId: 'aluno-a', repository }))

    await waitFor(() => expect(result.current.syncing).toBe(false))
    expect(repository.list).toHaveBeenCalledWith('aluno-a')
    expect(result.current.getTopicProgress('geografia', 'geo-p1')).toMatchObject({
      completed: true,
      sessionsCompleted: 2,
      questionsAnswered: 60,
    })
  })
})
