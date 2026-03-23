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
    <div className="relative flex flex-col items-center gap-6 sm:gap-8 py-10 sm:py-16 px-4 sm:px-10 text-center overflow-hidden">
      {stars === 3 && <Confetti />}

      <Mascot mood={MOOD[stars] || 'neutro'} size="hero" className={stars === 3 ? 'animate-bounce' : ''} />

      <p className="text-2xl sm:text-4xl font-extrabold text-gray-800">{msg}</p>

      {/* Estrelas com animação escalonada */}
      <div className="flex gap-3 sm:gap-5 items-center">
        {[1, 2, 3].map(s => (
          <span
            key={s}
            className={`text-5xl sm:text-7xl transition-all duration-300
              ${s <= visibleStars ? 'animate-star-pop' : 'opacity-20 grayscale'}`}
            style={{ animationDelay: `${(s - 1) * 0.3}s` }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* XP */}
      <div className="bg-yellow-50 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-yellow-200 shadow-sm w-fit mx-auto">
        <p className="text-4xl sm:text-6xl font-extrabold text-yellow-500">+{xp} XP ⚡</p>
        <p className="text-sm sm:text-lg font-semibold text-gray-500 mt-1">{correct} de {total} corretas</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <button onClick={onContinue} className="w-full text-lg sm:text-xl btn-duo-green">
          Continuar 🚀
        </button>
        <button onClick={onHome} className="w-full sm:text-lg btn-duo-gray">
          Início 🏠
        </button>
      </div>
    </div>
  )
}
