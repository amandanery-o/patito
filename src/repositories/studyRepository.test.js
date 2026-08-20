import { describe, expect, it, vi } from 'vitest'
import { createStudyRepository } from './studyRepository'

function queryResult(data, error = null) {
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    insert: vi.fn(() => query),
    order: vi.fn(() => Promise.resolve({ data, error })),
    maybeSingle: vi.fn(() => Promise.resolve({ data, error })),
    single: vi.fn(() => Promise.resolve({ data, error })),
  }
  return query
}

describe('createStudyRepository', () => {
  it('busca somente a sessão ativa do conteúdo', async () => {
    const session = { id: 'session-1' }
    const query = queryResult(session)
    const client = { from: vi.fn(() => query) }

    await expect(createStudyRepository(client).findActiveSession('mat-01')).resolves.toEqual(session)
    expect(query.eq).toHaveBeenNthCalledWith(1, 'content_id', 'mat-01')
    expect(query.eq).toHaveBeenNthCalledWith(2, 'status', 'active')
  })

  it('envia respostas pela função transacional', async () => {
    const rpc = vi.fn().mockResolvedValue({ data: { current_index: 1 }, error: null })
    const repository = createStudyRepository({ rpc })
    const result = await repository.saveAnswer({
      sessionId: 'session-1', answerId: 'answer-1', questionId: 'q1',
      answer: { optionId: 'b' }, isCorrect: true,
    })

    expect(result).toEqual({ current_index: 1 })
    expect(rpc).toHaveBeenCalledWith('save_session_answer', {
      p_session_id: 'session-1', p_answer_id: 'answer-1', p_question_id: 'q1',
      p_answer: { optionId: 'b' }, p_is_correct: true,
    })
  })

  it('propaga falhas sem fingir que salvou', async () => {
    const error = new Error('network')
    const rpc = vi.fn().mockResolvedValue({ data: null, error })
    await expect(createStudyRepository({ rpc }).completeSession('session-1')).rejects.toBe(error)
  })
})
