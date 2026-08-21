import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'

const SESSION = {
  user: {
    id: 'student-1',
    user_metadata: { name: 'Alice' },
  },
}

function Probe() {
  const auth = useAuth()
  return (
    <div>
      <span data-testid="profile-name">{auth.profile?.name}</span>
      <button onClick={() => auth.signIn('alice@example.test', 'segredo')}>Entrar</button>
      <button onClick={() => auth.signUp('alice@example.test', 'segredo', 'Alice')}>Cadastrar</button>
      <button onClick={() => auth.resetPassword('alice@example.test')}>Recuperar</button>
      <button onClick={() => auth.updateProfileName('Alice Nery')}>Atualizar</button>
      <button onClick={() => auth.signOut()}>Sair</button>
    </div>
  )
}

function client() {
  let authStateCallback
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    single: vi.fn().mockResolvedValue({ data: { id: 'student-1', name: 'Alice', avatar: '🦆' }, error: null }),
    upsert: vi.fn().mockResolvedValue({ error: null }),
  }
  return {
    query,
    from: vi.fn(() => query),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: SESSION } }),
      onAuthStateChange: vi.fn((callback) => {
        authStateCallback = callback
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      }),
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signUp: vi.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    emitAuthState: (event, session) => authStateCallback(event, session),
  }
}

describe('AuthProvider', () => {
  it('carrega sessão e perfil e executa os fluxos padrão do Supabase', async () => {
    const supabaseClient = client()
    render(
      <AuthProvider client={supabaseClient}>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('profile-name')).toHaveTextContent('Alice'))

    fireEvent.click(screen.getByText('Entrar'))
    fireEvent.click(screen.getByText('Cadastrar'))
    fireEvent.click(screen.getByText('Recuperar'))
    fireEvent.click(screen.getByText('Atualizar'))
    fireEvent.click(screen.getByText('Sair'))

    await waitFor(() => {
      expect(supabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'alice@example.test',
        password: 'segredo',
      })
      expect(supabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: 'alice@example.test',
        password: 'segredo',
        options: { data: { name: 'Alice' } },
      })
      expect(supabaseClient.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'alice@example.test',
        expect.objectContaining({ redirectTo: expect.stringMatching(/^http/) }),
      )
      expect(supabaseClient.query.upsert).toHaveBeenCalledWith({ id: 'student-1', name: 'Alice Nery' })
      expect(supabaseClient.auth.signOut).toHaveBeenCalled()
      expect(screen.getByTestId('profile-name')).toHaveTextContent('Alice Nery')
    })
  })

  it('preserva o perfil quando o token da mesma sessão é renovado ao voltar ao app', async () => {
    const supabaseClient = client()
    render(
      <AuthProvider client={supabaseClient}>
        <Probe />
      </AuthProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('profile-name')).toHaveTextContent('Alice'))

    act(() => {
      supabaseClient.emitAuthState('TOKEN_REFRESHED', {
        ...SESSION,
        access_token: 'token-renovado',
      })
    })

    await waitFor(() => expect(screen.getByTestId('profile-name')).toHaveTextContent('Alice'))
    expect(supabaseClient.from).toHaveBeenCalledTimes(1)
  })
})
