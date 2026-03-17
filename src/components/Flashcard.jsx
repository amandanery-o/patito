import { useState } from 'react'

export default function Flashcard({ question, onAnswer }) {
  const [flipped, setFlipped] = useState(false)
  const [answered, setAnswered] = useState(false)

  function handleFlip() {
    if (!answered) setFlipped(true)
  }

  function handleAnswer(isCorrect) {
    if (answered) return
    setAnswered(true)
    setTimeout(() => {
      onAnswer(isCorrect)
      setFlipped(false)
      setAnswered(false)
    }, 300)
  }

  return (
    <div className="space-y-4">
      {/* Flip Card */}
      <div className="flip-card w-full" style={{ height: '200px' }} onClick={!flipped ? handleFlip : undefined}>
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flip-card-front bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer shadow-lg">
            <span className="text-white text-opacity-80 text-sm mb-2 font-medium">PERGUNTA</span>
            <p className="text-white text-center text-lg font-bold leading-snug">
              {question.question}
            </p>
            {!flipped && (
              <p className="text-blue-100 text-sm mt-4 animate-pulse">
                Toque para virar o cartão 👆
              </p>
            )}
          </div>

          {/* Back */}
          <div className="flip-card-back bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex flex-col items-center justify-center p-6 shadow-lg">
            <span className="text-white text-opacity-80 text-sm mb-2 font-medium">RESPOSTA</span>
            <p className="text-white text-center text-base font-medium leading-relaxed">
              {question.correct}
            </p>
          </div>
        </div>
      </div>

      {/* Self-assessment buttons (shown after flip) */}
      {flipped && !answered && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center justify-center gap-2 bg-red-50 border-2 border-red-300 hover:bg-red-100 text-red-700 font-bold py-4 rounded-xl transition-all"
            style={{ minHeight: '56px' }}
          >
            <span className="text-2xl">😅</span>
            <span className="text-base">Errei</span>
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center justify-center gap-2 bg-green-50 border-2 border-green-300 hover:bg-green-100 text-green-700 font-bold py-4 rounded-xl transition-all"
            style={{ minHeight: '56px' }}
          >
            <span className="text-2xl">🎉</span>
            <span className="text-base">Acertei!</span>
          </button>
        </div>
      )}

      {!flipped && (
        <button
          onClick={handleFlip}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          Ver resposta
        </button>
      )}
    </div>
  )
}
