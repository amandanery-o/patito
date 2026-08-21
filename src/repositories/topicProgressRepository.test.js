import { describe, expect, it, vi } from 'vitest'
import { createTopicProgressRepository } from './topicProgressRepository'

describe('topicProgressRepository', () => {
  it('consulta somente o progresso do aluno atual', async () => {
    const query = {
      select: vi.fn(() => query),
      eq: vi.fn().mockResolvedValue({ data: [], error: null }),
    }
    const client = { from: vi.fn(() => query) }
    const repository = createTopicProgressRepository(client)
    await expect(repository.list('student-1')).resolves.toEqual([])
    expect(client.from).toHaveBeenCalledWith('topic_progress')
    expect(query.eq).toHaveBeenCalledWith('user_id', 'student-1')
  })

  it('informa quando o Supabase não está configurado', () => {
    expect(createTopicProgressRepository(null).configured).toBe(false)
  })
})
