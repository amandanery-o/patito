import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Mascot from './Mascot'

export default function LoginScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode]       = useState('login') // 'login' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]       = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    let err
    if (mode === 'login') {
      err = await signIn(email, password)
    } else {
      if (!name.trim()) { setError('Digite seu nome'); setLoading(false); return }
      err = await signUp(email, password, name.trim())
      if (!err) {
        setError('Confirme seu e-mail e depois faça login!')
        setLoading(false)
        setMode('login')
        return
      }
    }

    if (err) setError(err.message === 'Invalid login credentials'
      ? 'E-mail ou senha incorretos.'
      : err.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">

        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-2">
          <Mascot mood="feliz" size="lg" />
          <h1 className="text-3xl font-extrabold text-yellow-900">patito</h1>
          <p className="text-sm text-yellow-700 font-semibold">
            {mode === 'login' ? 'Entre na sua conta para estudar!' : 'Crie sua conta para começar!'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-sm font-bold text-gray-600 block mb-1">Seu nome</label>
              <input
                type="text"
                placeholder="Como você se chama?"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
            </div>
          )}

          <div>
            <label className="text-sm font-bold text-gray-600 block mb-1">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoFocus={mode === 'login'}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600 block mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {error && (
            <p className={`text-sm font-semibold rounded-xl px-3 py-2 ${
              error.startsWith('Confirme') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-extrabold py-3.5 rounded-2xl text-base transition-all active:scale-95 disabled:opacity-60"
          >
            {loading ? '...' : mode === 'login' ? 'Entrar 🐥' : 'Criar conta'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500">
          {mode === 'login' ? 'Ainda não tem conta?' : 'Já tem conta?'}{' '}
          <button
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError('') }}
            className="font-bold text-yellow-700 hover:underline"
          >
            {mode === 'login' ? 'Criar agora' : 'Fazer login'}
          </button>
        </p>
      </div>
    </div>
  )
}
