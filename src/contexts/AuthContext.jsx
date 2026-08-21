import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const E2E_SESSION = { user: { id: '00000000-0000-4000-8000-000000000001', user_metadata: { name: 'Aluno de teste' } } }
const E2E_PROFILE = { id: E2E_SESSION.user.id, name: 'Aluno de teste', avatar: '🦁' }

export function AuthProvider({ children, client = supabase }) {
  const [session, setSession] = useState(undefined) // undefined = carregando
  const [profile, setProfile] = useState(undefined)
  const userId = session?.user?.id
  const userName = session?.user?.user_metadata?.name

  useEffect(() => {
    if (import.meta.env.VITE_E2E_AUTH === '1') {
      setSession(E2E_SESSION)
      setProfile(E2E_PROFILE)
      return
    }
    if (!client) {
      setSession(null)
      setProfile(null)
      return
    }

    client.auth.getSession().then(({ data }) => setSession(data.session))

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_, s) => {
      setSession(s)
      setProfile(s ? undefined : null)
    })
    return () => subscription.unsubscribe()
  }, [client])

  useEffect(() => {
    if (!userId || !client) return
    client
      .from('profiles')
      .select('id, name, avatar, created_at')
      .eq('id', userId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Não foi possível carregar o perfil do aluno.', error)
          setProfile({
            id: userId,
            name: userName || 'Estudante',
            avatar: '🦆',
          })
          return
        }
        setProfile(data)
      })
  }, [client, userId, userName])

  async function signIn(email, password) {
    if (!client) return new Error('Supabase não configurado')
    const { error } = await client.auth.signInWithPassword({ email, password })
    return error
  }

  async function signUp(email, password, name) {
    if (!client) return new Error('Supabase não configurado')
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    return error
  }

  async function resetPassword(email) {
    if (!client) return new Error('Supabase não configurado')
    const redirectTo = `${window.location.origin}/`
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo })
    return error
  }

  async function signOut() {
    if (client) await client.auth.signOut()
  }

  async function updateProfileName(name) {
    if (!session?.user?.id || !client) return new Error('authentication_required')
    const { error } = await client.from('profiles').upsert({ id: session.user.id, name })
    if (error) return error
    setProfile((p) => ({ ...p, name }))
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        configured: Boolean(client) || import.meta.env.VITE_E2E_AUTH === '1',
        signIn,
        signUp,
        resetPassword,
        signOut,
        updateProfileName,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
