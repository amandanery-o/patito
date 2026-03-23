import { useState, useEffect } from 'react'

export default function Flashcard({ question, onAnswer }) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setFlipped(false)
  }, [question.id])

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">Toque no cartão para ver a resposta</p>

      <div
        className="relative w-full cursor-pointer h-52 sm:h-56"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Frente */}
          <div
            className="absolute inset-0 bg-white border-2 border-blue-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-md"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-5xl mb-3">🃏</span>
            <p className="text-lg font-semibold text-gray-800">{question.question}</p>
          </div>
          {/* Verso */}
          <div
            className="absolute inset-0 bg-blue-50 border-2 border-blue-400 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-md"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-5xl mb-3">💡</span>
            <p className="text-lg font-semibold text-blue-800">{question.answer}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => onAnswer(false)}
            className="p-4 rounded-xl border-2 border-red-300 bg-red-50 text-red-700 font-bold text-base active:scale-95 transition-all"
          >
            😕 Errei
          </button>
          <button
            onClick={() => onAnswer(true)}
            className="p-4 rounded-xl border-2 border-green-300 bg-green-50 text-green-700 font-bold text-base active:scale-95 transition-all"
          >
            😄 Acertei
          </button>
        </div>
      )}
    </div>
  )
}
