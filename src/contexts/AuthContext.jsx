import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = carregando
  const [profile, setProfile] = useState(undefined)
  const userId = session?.user?.id
  const userName = session?.user?.user_metadata?.name

  useEffect(() => {
    if (!supabase) {
      setSession(null)
      setProfile(null)
      return
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s)
      setProfile(s ? undefined : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId || !supabase) return
    supabase
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
  }, [userId, userName])

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }

  async function signUp(email, password, name) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    return error
  }

  async function resetPassword(email) {
    const redirectTo = `${window.location.origin}/`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    return error
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function updateProfileName(name) {
    if (!session?.user?.id || !supabase) return
    await supabase.from('profiles').upsert({ id: session.user.id, name })
    setProfile((p) => ({ ...p, name }))
  }

  return (
    <AuthContext.Provider value={{ session, profile, signIn, signUp, resetPassword, signOut, updateProfileName }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
