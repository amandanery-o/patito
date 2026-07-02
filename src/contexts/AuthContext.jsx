import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession]   = useState(undefined) // undefined = carregando
  const [profile, setProfile]   = useState(null)

  useEffect(() => {
    if (!supabase) { setSession(null); return }

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s)
      if (!s) setProfile(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user?.id || !supabase) return
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => { if (data) setProfile(data) })
  }, [session?.user?.id])

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error
  }

  async function signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return error
    // Atualizar o nome no perfil (o trigger já criou o registro)
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, name })
    }
    return null
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function syncXp(totalXp, streakCurrent, streakBest) {
    if (!session?.user?.id || !supabase) return
    await supabase.from('profiles').upsert({
      id: session.user.id,
      xp: totalXp,
      streak_current: streakCurrent,
      streak_best: streakBest,
    })
  }

  async function updateProfileName(name) {
    if (!session?.user?.id || !supabase) return
    await supabase.from('profiles').upsert({ id: session.user.id, name })
    setProfile(p => ({ ...p, name }))
  }

  return (
    <AuthContext.Provider value={{ session, profile, signIn, signUp, signOut, syncXp, updateProfileName }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
