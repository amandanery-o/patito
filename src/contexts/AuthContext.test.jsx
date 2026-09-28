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
      <button onClick={() => auth.requestEmailCode('alice@example.test')}>Enviar código</button>
      <button onClick={() => auth.verifyEmailCode('alice@example.test', '123456')}>Confirmar código</button>
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
      signInWithOtp: vi.fn().mockResolvedValue({ error: null }),
      verifyOtp: vi.fn().mockResolvedValue({ error: null }),
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

    fireEvent.click(screen.getByText('Enviar código'))
    fireEvent.click(screen.getByText('Confirmar código'))
    fireEvent.click(screen.getByText('Atualizar'))
    fireEvent.click(screen.getByText('Sair'))

    await waitFor(() => {
      expect(supabaseClient.auth.signInWithOtp).toHaveBeenCalledWith({
        email: 'alice@example.test',
        options: {
          shouldCreateUser: true,
          emailRedirectTo: expect.stringMatching(/^http/),
          data: { name: 'Estudante' },
        },
      })
      expect(supabaseClient.auth.verifyOtp).toHaveBeenCalledWith({
        email: 'alice@example.test',
        token: '123456',
        type: 'email',
      })
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
