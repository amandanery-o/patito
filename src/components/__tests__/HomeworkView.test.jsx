import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import HomeworkView from '../HomeworkView'

const baseProps = {
  items: [],
  loading: false,
  saving: false,
  error: '',
  onCreate: vi.fn(),
  onUpdate: vi.fn(),
  onRemove: vi.fn(),
  onBack: vi.fn(),
}

describe('HomeworkView', () => {
  it('mostra o estado vazio e abre o formulário', () => {
    render(<HomeworkView {...baseProps} />)
    expect(screen.getByText('Nenhum tema pendente')).toBeInTheDocument()
    fireEvent.click(screen.getByText('+ Novo'))
    expect(screen.getByText('Novo tema')).toBeInTheDocument()
  })

  it('cria um tema com descrição, páginas e data', async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined)
    render(<HomeworkView {...baseProps} onCreate={onCreate} />)
    fireEvent.click(screen.getByText('+ Novo'))
    fireEvent.change(screen.getByPlaceholderText('Ex.: Exercícios de Matemática'), {
      target: { value: 'Ler Ciências' },
    })
    fireEvent.change(screen.getByPlaceholderText('20 a 24'), { target: { value: '30-32' } })
    fireEvent.change(screen.getByLabelText('Entregar em'), { target: { value: '2026-08-25' } })
    fireEvent.click(screen.getByText('Salvar'))
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith({
        description: 'Ler Ciências',
        pages: '30-32',
        dueDate: '2026-08-25',
      }),
    )
  })

  it('marca um tema como concluído', () => {
    const onUpdate = vi.fn().mockResolvedValue(undefined)
    render(
      <HomeworkView
        {...baseProps}
        onUpdate={onUpdate}
        items={[
          {
            id: 'h1',
            description: 'Exercícios',
            pages: null,
            due_date: '2026-08-25',
            completed: false,
          },
        ]}
      />,
    )
    fireEvent.click(screen.getByLabelText('Marcar como concluído'))
    expect(onUpdate).toHaveBeenCalledWith('h1', { completed: true })
  })
})
