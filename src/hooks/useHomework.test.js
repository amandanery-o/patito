import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useHomework } from './useHomework'

function repository(items = []) {
  return {
    list: vi.fn().mockResolvedValue(items),
    create: vi.fn().mockResolvedValue({}),
    update: vi.fn().mockResolvedValue({}),
    remove: vi.fn().mockResolvedValue(undefined),
  }
}

describe('useHomework', () => {
  it('recarrega os temas persistidos depois de criar', async () => {
    const repo = repository([])
    repo.list.mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: 'h1', description: 'Ler' }])
    const { result } = renderHook(() => useHomework('student-1', repo))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(() => result.current.createHomework({ description: 'Ler', pages: '', dueDate: '2026-08-25' }))

    expect(repo.create).toHaveBeenCalledWith({
      userId: 'student-1',
      description: 'Ler',
      pages: '',
      dueDate: '2026-08-25',
    })
    expect(repo.list).toHaveBeenLastCalledWith('student-1')
    expect(result.current.items).toEqual([{ id: 'h1', description: 'Ler' }])
  })

  it('usa somente o identificador do aluno atual em todas as operações', async () => {
    const repo = repository([])
    const { result } = renderHook(() => useHomework('student-2', repo))
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(() => result.current.updateHomework('h1', { completed: true }))
    await act(() => result.current.removeHomework('h1'))

    expect(repo.update).toHaveBeenCalledWith('h1', { completed: true }, 'student-2')
    expect(repo.remove).toHaveBeenCalledWith('h1', 'student-2')
    expect(repo.list).toHaveBeenCalledWith('student-2')
  })
})
