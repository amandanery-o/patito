import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginScreen from '../LoginScreen'

const auth = vi.hoisted(() => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
  resetPassword: vi.fn(),
}))

vi.mock('../../contexts/AuthContext', () => ({ useAuth: () => auth }))

describe('LoginScreen', () => {
  beforeEach(() => vi.clearAllMocks())

  it('orienta a criar uma conta quando os dados não correspondem a um cadastro', async () => {
    auth.signIn.mockResolvedValue({ message: 'Invalid login credentials' })
    render(<LoginScreen />)

    fireEvent.change(screen.getByPlaceholderText('seu@email.com'), { target: { value: 'novo@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'segredo' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar 🐥' }))

    await waitFor(() => expect(screen.getByText(/Não encontramos uma conta com esses dados/)).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Criar agora' })).toBeVisible()
  })

  it('pede somente o e-mail para recuperar a senha', () => {
    render(<LoginScreen />)
    fireEvent.click(screen.getByRole('button', { name: 'Esqueci minha senha' }))

    expect(screen.getByPlaceholderText('seu@email.com')).toBeVisible()
    expect(screen.queryByPlaceholderText('••••••••')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar link' })).toBeVisible()
  })
})
