import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginScreen from '../LoginScreen'

const auth = vi.hoisted(() => ({
  requestEmailCode: vi.fn(),
  verifyEmailCode: vi.fn(),
}))

vi.mock('../../contexts/AuthContext', () => ({ useAuth: () => auth }))

describe('LoginScreen', () => {
  beforeEach(() => vi.clearAllMocks())

  it('usa o mesmo início para entrar ou criar uma conta sem revelar se o e-mail existe', async () => {
    auth.requestEmailCode.mockResolvedValue(null)
    render(<LoginScreen />)

    expect(screen.getByText(/Se você já tem conta/)).toBeVisible()
    expect(screen.queryByPlaceholderText('••••••••')).not.toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'familia@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continuar 🐥' }))

    await waitFor(() => expect(auth.requestEmailCode).toHaveBeenCalledWith('familia@example.com'))
    expect(screen.getByText('Digite o código de 6 números')).toBeVisible()
    expect(screen.getByText('familia@example.com')).toBeVisible()
  })

  it('confirma o código de seis números recebido por e-mail', async () => {
    auth.requestEmailCode.mockResolvedValue(null)
    auth.verifyEmailCode.mockResolvedValue(null)
    render(<LoginScreen />)

    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'familia@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continuar 🐥' }))
    await screen.findByText('Digite o código de 6 números')

    const code = screen.getByPlaceholderText('000000')
    fireEvent.change(code, { target: { value: '12a34567' } })
    expect(code).toHaveValue('123456')
    fireEvent.click(screen.getByRole('button', { name: 'Entrar no Patito' }))

    await waitFor(() => expect(auth.verifyEmailCode).toHaveBeenCalledWith('familia@example.com', '123456'))
  })

  it('permite reenviar o código e corrigir o endereço', async () => {
    auth.requestEmailCode.mockResolvedValue(null)
    render(<LoginScreen />)

    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'errado@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continuar 🐥' }))
    await screen.findByText('Digite o código de 6 números')

    fireEvent.click(screen.getByRole('button', { name: 'Enviar outro código' }))
    await waitFor(() => expect(auth.requestEmailCode).toHaveBeenCalledTimes(2))
    expect(screen.getByText(/Enviamos um novo código/)).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'Corrigir o e-mail' }))
    expect(screen.getByDisplayValue('errado@example.com')).toBeVisible()
  })

  it('traduz erro de código vencido sem apagar o e-mail', async () => {
    auth.requestEmailCode.mockResolvedValue(null)
    auth.verifyEmailCode.mockResolvedValue({ message: 'Token has expired or is invalid' })
    render(<LoginScreen />)

    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'familia@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continuar 🐥' }))
    await screen.findByText('Digite o código de 6 números')
    fireEvent.change(screen.getByPlaceholderText('000000'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar no Patito' }))

    expect(await screen.findByText(/Esse código venceu/)).toBeVisible()
    expect(screen.getByText('familia@example.com')).toBeVisible()
  })
})
