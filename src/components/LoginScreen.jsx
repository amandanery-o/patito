import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { friendlyAuthError } from '../utils/authErrors'
import Mascot from './Mascot'

export default function LoginScreen() {
  const { requestEmailCode, verifyEmailCode } = useAuth()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendCode() {
    setError('')
    setMessage('')
    setLoading(true)
    const authError = await requestEmailCode(email.trim())
    setLoading(false)
    if (authError) {
      setError(friendlyAuthError(authError))
      return false
    }
    setCode('')
    setStep('verify')
    return true
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (step === 'email') {
      await sendCode()
      return
    }

    setError('')
    setMessage('')
    setLoading(true)
    const authError = await verifyEmailCode(email.trim(), code)
    setLoading(false)
    if (authError) setError(friendlyAuthError(authError))
  }

  async function resendCode() {
    if (await sendCode()) setMessage('Enviamos um novo código. O anterior deixou de valer.')
  }

  function editEmail() {
    setStep('email')
    setCode('')
    setError('')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <Mascot mood="feliz" size="lg" />
          <h1 className="text-3xl font-extrabold text-yellow-900">patito</h1>
          <p className="text-sm text-yellow-700 font-semibold">
            {step === 'email' ? 'Entre ou crie sua conta' : 'Confira seu e-mail'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
          {step === 'email' ? (
            <>
              <div>
                <label className="text-sm font-bold text-gray-600 block mb-1" htmlFor="auth-email">
                  E-mail
                </label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Se você já tem conta, vamos entrar nela. Se for seu primeiro acesso, criaremos uma conta para você.
              </p>
            </>
          ) : (
            <>
              <div className="space-y-2 text-center">
                <div className="text-4xl" aria-hidden="true">
                  ✉️
                </div>
                <h2 className="text-lg font-extrabold text-gray-800">Digite o código de 6 números</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  Enviamos para <strong className="break-all text-gray-800">{email}</strong>.
                </p>
                <p className="text-xs leading-relaxed text-gray-500">
                  Confira também spam e promoções. Se o e-mail trouxer um botão de acesso, você também pode usá-lo.
                </p>
              </div>
              <div>
                <label className="sr-only" htmlFor="auth-code">
                  Código de acesso
                </label>
                <input
                  id="auth-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.35em] font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </>
          )}

          {error && <p className="text-sm font-semibold rounded-xl px-3 py-2 bg-red-50 text-red-600">{error}</p>}
          {message && (
            <p className="text-sm font-semibold rounded-xl px-3 py-2 bg-green-50 text-green-700">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading || (step === 'verify' && code.length !== 6)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-extrabold py-3.5 rounded-2xl text-base transition-all active:scale-95 disabled:opacity-60"
          >
            {loading ? '...' : step === 'email' ? 'Continuar 🐥' : 'Entrar no Patito'}
          </button>

          {step === 'verify' && (
            <>
              <button
                type="button"
                onClick={resendCode}
                disabled={loading}
                className="w-full text-sm font-bold text-yellow-800 hover:underline disabled:opacity-60"
              >
                Enviar outro código
              </button>
              <button
                type="button"
                onClick={editEmail}
                className="w-full text-sm font-semibold text-gray-500 hover:underline"
              >
                Corrigir o e-mail
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
