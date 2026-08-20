import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SYNC_STATUS, useStudySession } from './useStudySession'

const input = {
  userId: 'student-1', subjectId: 'matematica', contentId: 'fracoes', questionIds: ['q1'],
}

describe('useStudySession', () => {
  it('retoma sessão e respostas existentes', async () => {
    const repository = {
      findActiveSession: vi.fn().mockResolvedValue({ id: 'session-1', current_index: 1 }),
      createSession: vi.fn(),
      listAnswers: vi.fn().mockResolvedValue([{ question_id: 'q1' }]),
    }
    const { result } = renderHook(() => useStudySession(repository))

    await act(() => result.current.startOrResume(input))

    expect(repository.createSession).not.toHaveBeenCalled()
    expect(result.current.answers).toHaveLength(1)
    expect(result.current.status).toBe(SYNC_STATUS.SAVED)
  })

  it('recupera a sessão canônica quando duas abas criam juntas', async () => {
    const canonical = { id: 'canonical' }
    const repository = {
      findActiveSession: vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(canonical),
      createSession: vi.fn().mockRejectedValue({ code: '23505' }),
      listAnswers: vi.fn().mockResolvedValue([]),
    }
    const { result } = renderHook(() => useStudySession(repository))

    await act(() => result.current.startOrResume(input))

    expect(result.current.session).toEqual(canonical)
    expect(repository.findActiveSession).toHaveBeenCalledTimes(2)
  })

  it('mantém o erro visível quando o servidor não confirma', async () => {
    const repository = {
      findActiveSession: vi.fn().mockRejectedValue(new Error('network')),
    }
    const { result } = renderHook(() => useStudySession(repository))

    await act(async () => {
      await expect(result.current.startOrResume(input)).rejects.toThrow('network')
    })
    expect(result.current.status).toBe(SYNC_STATUS.ERROR)
    expect(result.current.error.message).toBe('network')
  })
})
