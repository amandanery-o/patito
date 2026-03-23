import { useState } from 'react'
import Mascot from './Mascot'

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('')
  const trimmed = name.trim()

  function handleSubmit(e) {
    e.preventDefault()
    if (!trimmed) return
    onComplete(trimmed)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex flex-col items-center justify-center px-6 py-12 animate-slide-up">
      <Mascot mood="celebrando" size="hero" className="mb-2" />

      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mt-4 text-center leading-tight">
        Bem-vindo ao<br />
        <span className="text-patito-gold">Patito!</span>
      </h1>
      <p className="text-gray-500 text-base sm:text-xl mt-2 text-center">
        Seu companheiro de estudos do 4º ano
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-10 space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1.5">
            Qual é o seu nome?
          </label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ex: Bento"
            maxLength={30}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-patito-gold focus:outline-none text-lg font-semibold text-gray-800 bg-white transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={!trimmed}
          className={`w-full text-lg btn-duo-green transition-opacity ${!trimmed ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Vamos começar! 🚀
        </button>
      </form>
    </div>
  )
}
