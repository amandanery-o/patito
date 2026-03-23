import { useEffect, useState } from 'react'
import Mascot from './Mascot'
import Confetti from './Confetti'

const MOOD = { 3: 'celebrando', 2: 'feliz', 1: 'triste' }

const MESSAGES = {
  3: ['Perfeito! 🎉', 'Incrível! Você é demais!', 'Mandou muito bem! 🏆'],
  2: ['Boa! Continue assim!', 'Quase perfeito! 💪', 'Você está arrasando!'],
  1: ['Bom esforço! Tente de novo!', 'Você consegue! Pratique mais!', 'Continue estudando! 📚'],
}

export default function ResultScreen({ stars, xp, correct, total, onContinue, onHome }) {
  const [visibleStars, setVisibleStars] = useState(0)
  const msg = MESSAGES[stars][Math.floor(Math.random() * 3)]

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setVisibleStars(i)
      if (i >= stars) clearInterval(t)
    }, 300)
    return () => clearInterval(t)
  }, [stars])

  return (
    <div className="relative flex flex-col items-center gap-6 py-10 px-4 text-center overflow-hidden">
      {stars === 3 && <Confetti />}

      <Mascot mood={MOOD[stars] || 'neutro'} size="xl" className={stars === 3 ? 'animate-bounce' : ''} />

      <p className="text-2xl font-extrabold text-gray-800">{msg}</p>

      {/* Estrelas com animação escalonada */}
      <div className="flex gap-3 items-center">
        {[1, 2, 3].map(s => (
          <span
            key={s}
            className={`text-5xl transition-all duration-300
              ${s <= visibleStars ? 'animate-star-pop' : 'opacity-20 grayscale'}`}
            style={{ animationDelay: `${(s - 1) * 0.3}s` }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* XP */}
      <div className="bg-yellow-50 rounded-2xl px-10 py-5 border-2 border-yellow-200 shadow-sm">
        <p className="text-4xl font-extrabold text-yellow-500">+{xp} XP ⚡</p>
        <p className="text-sm font-semibold text-gray-500 mt-1">{correct} de {total} corretas</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={onContinue} className="w-full text-lg btn-duo-green">
          Continuar 🚀
        </button>
        <button onClick={onHome} className="w-full btn-duo-gray">
          Início 🏠
        </button>
      </div>
    </div>
  )
}
