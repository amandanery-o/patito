import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SYNC_STATUS, useStudySession } from './useStudySession'

const input = {
  userId: 'student-1',
  subjectId: 'matematica',
  contentId: 'fracoes',
  questionIds: ['q1'],
}

describe('useStudySession', () => {
  it('retoma sessão e respostas existentes', async () => {
    const repository = {
      findOpenSession: vi.fn().mockResolvedValue({ id: 'session-1', current_index: 1 }),
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
      findOpenSession: vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(canonical),
      createSession: vi.fn().mockRejectedValue({ code: '23505' }),
      listAnswers: vi.fn().mockResolvedValue([]),
    }
    const { result } = renderHook(() => useStudySession(repository))

    await act(() => result.current.startOrResume(input))

    expect(result.current.session).toEqual(canonical)
    expect(repository.findOpenSession).toHaveBeenCalledTimes(2)
  })

  it('mantém o erro visível quando o servidor não confirma', async () => {
    const repository = {
      findOpenSession: vi.fn().mockRejectedValue(new Error('network')),
    }
    const { result } = renderHook(() => useStudySession(repository))

    await act(async () => {
      await expect(result.current.startOrResume(input)).rejects.toThrow('network')
    })
    expect(result.current.status).toBe(SYNC_STATUS.ERROR)
    expect(result.current.error.message).toBe('network')
  })

  it('recarrega o estado canônico quando outra aba avançou a sessão', async () => {
    const initial = { id: 'session-1', content_id: 'fracoes', updated_at: '2026-08-20T12:00:00Z' }
    const canonical = { ...initial, current_index: 1, updated_at: '2026-08-20T12:01:00Z' }
    const repository = {
      findOpenSession: vi.fn().mockResolvedValueOnce(initial).mockResolvedValueOnce(canonical),
      createSession: vi.fn(),
      listAnswers: vi
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ question_id: 'q1', is_correct: true }]),
      saveAnswer: vi.fn().mockRejectedValue({ message: 'session_stale' }),
    }
    const { result } = renderHook(() => useStudySession(repository))
    await act(() => result.current.startOrResume(input))

    await act(async () => {
      await expect(
        result.current.saveAnswer({
          answerId: 'answer-1',
          questionId: 'q1',
          answer: { option: 1 },
          isCorrect: true,
        }),
      ).rejects.toMatchObject({ code: 'SESSION_STALE', session: canonical })
    })

    expect(repository.saveAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: 'session-1',
        expectedUpdatedAt: '2026-08-20T12:00:00Z',
      }),
    )
    expect(result.current.session).toEqual(canonical)
    expect(result.current.answers).toHaveLength(1)
    expect(result.current.status).toBe(SYNC_STATUS.STALE)
  })
})
