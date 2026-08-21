import { describe, expect, it, vi } from 'vitest'
import { createHomeworkRepository } from './homeworkRepository'

function queryResult(data, error = null) {
  const query = {
    select: vi.fn(() => query),
    insert: vi.fn(() => query),
    update: vi.fn(() => query),
    delete: vi.fn(() => query),
    eq: vi.fn(() => query),
    order: vi.fn(() => query),
    single: vi.fn(() => Promise.resolve({ data, error })),
    then: (resolve) => Promise.resolve({ data, error }).then(resolve),
  }
  return query
}

describe('createHomeworkRepository', () => {
  it('lista pendentes primeiro e ordena por entrega', async () => {
    const query = queryResult([])
    const repository = createHomeworkRepository({ from: vi.fn(() => query) })
    await repository.list('student-1')
    expect(query.eq).toHaveBeenCalledWith('user_id', 'student-1')
    expect(query.order).toHaveBeenNthCalledWith(1, 'completed')
    expect(query.order).toHaveBeenNthCalledWith(2, 'due_date')
  })

  it('normaliza os campos ao criar', async () => {
    const query = queryResult({ id: 'homework-1' })
    const repository = createHomeworkRepository({ from: vi.fn(() => query) })
    await repository.create({
      id: 'homework-1',
      userId: 'student-1',
      description: '  Ler capítulo  ',
      pages: ' 10-12 ',
      dueDate: '2026-08-25',
    })
    expect(query.insert).toHaveBeenCalledWith({
      id: 'homework-1',
      user_id: 'student-1',
      description: 'Ler capítulo',
      pages: '10-12',
      due_date: '2026-08-25',
    })
  })

  it('registra o horário ao concluir', async () => {
    const query = queryResult({ id: 'homework-1', completed: true })
    const repository = createHomeworkRepository({ from: vi.fn(() => query) })
    await repository.update('homework-1', { completed: true }, 'student-1')
    expect(query.update).toHaveBeenCalledWith(
      expect.objectContaining({
        completed: true,
        completed_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    )
    expect(query.eq).toHaveBeenCalledWith('user_id', 'student-1')
  })

  it('restringe a exclusão ao aluno autenticado', async () => {
    const query = queryResult(null)
    const repository = createHomeworkRepository({ from: vi.fn(() => query) })
    await repository.remove('homework-1', 'student-1')
    expect(query.eq).toHaveBeenNthCalledWith(1, 'id', 'homework-1')
    expect(query.eq).toHaveBeenNthCalledWith(2, 'user_id', 'student-1')
  })
})
