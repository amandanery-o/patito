import { useEffect, useState } from 'react'

function Star({ filled, delay = 0 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      className={`text-5xl transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      style={{ display: 'inline-block' }}
    >
      {filled ? '⭐' : '☆'}
    </span>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][i % 6],
    left: `${8 + i * 7}%`,
    delay: `${i * 0.1}s`,
    duration: `${1.5 + (i % 3) * 0.3}s`
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className={`confetti-piece absolute w-3 h-3 rounded-sm ${piece.color}`}
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            top: '-20px'
          }}
        />
      ))}
    </div>
  )
}

export default function ResultScreen({ stars, xpEarned, message, correctAnswers, totalQuestions, onContinue, onHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 relative">
      {stars === 3 && <Confetti />}

      <div className="relative z-10 w-full max-w-md space-y-6 text-center">
        {/* Trophy/Result icon */}
        <div className="text-7xl animate-bounce-in">
          {stars === 3 ? '🏆' : stars === 2 ? '🌟' : '👍'}
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2">
          <Star filled={stars >= 1} delay={200} />
          <Star filled={stars >= 2} delay={400} />
          <Star filled={stars >= 3} delay={600} />
        </div>

        {/* Score */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">Resultado</p>
          <p className="text-4xl font-bold text-gray-800">
            {correctAnswers}/{totalQuestions}
          </p>
          <p className="text-gray-600 mt-1">questões corretas</p>
        </div>

        {/* XP earned */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center justify-center gap-3">
          <span className="text-3xl">⭐</span>
          <div>
            <p className="font-bold text-yellow-700 text-xl">+{xpEarned} XP</p>
            <p className="text-yellow-600 text-sm">ganhos nesta sessão</p>
          </div>
        </div>

        {/* Encouragement */}
        <p className="text-gray-700 text-lg font-medium">{message}</p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95"
            style={{ minHeight: '56px' }}
          >
            Continuar 🚀
          </button>
          <button
            onClick={onHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition-all active:scale-95"
            style={{ minHeight: '48px' }}
          >
            Ir para o Início 🏠
          </button>
        </div>
      </div>
    </div>
  )
}
