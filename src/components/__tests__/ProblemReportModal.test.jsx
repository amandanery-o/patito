import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProblemReportModal from '../ProblemReportModal'

describe('ProblemReportModal', () => {
  it('envia uma descrição sem solicitar dados pessoais', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<ProblemReportModal onSubmit={onSubmit} onClose={() => {}} />)
    expect(screen.queryByLabelText(/nome|e-mail/i)).not.toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('O que aconteceu?'), { target: { value: 'O calendário não abriu' } })
    fireEvent.click(screen.getByText('Enviar relato'))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ kind: 'general', description: 'O calendário não abriu' }))
    expect(await screen.findByText('Recebemos seu relato. Obrigado!')).toBeInTheDocument()
  })

  it('informa falha sem descartar silenciosamente', async () => {
    render(<ProblemReportModal onSubmit={vi.fn().mockRejectedValue(new Error('network'))} onClose={() => {}} />)
    fireEvent.change(screen.getByLabelText('O que aconteceu?'), { target: { value: 'Erro' } })
    fireEvent.click(screen.getByText('Enviar relato'))
    expect(await screen.findByRole('alert')).toHaveTextContent('ficou guardado')
  })
})
