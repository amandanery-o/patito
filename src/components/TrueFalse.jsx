import { useState } from 'react'

export default function TrueFalse({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  function handleSelect(value) {
    if (answered) return
    setSelected(value)
    setAnswered(true)
    const isCorrect = value === question.correct

    setTimeout(() => {
      onAnswer(isCorrect)
      setSelected(null)
      setAnswered(false)
    }, 1800)
  }

  function getButtonStyle(value) {
    if (!answered) {
      if (value === true) return 'bg-green-50 border-2 border-green-300 hover:bg-green-100 hover:border-green-500 text-green-700'
      return 'bg-red-50 border-2 border-red-300 hover:bg-red-100 hover:border-red-500 text-red-700'
    }

    const isCorrect = value === question.correct
    const isSelected = value === selected

    if (isCorrect) {
      return value === true
        ? 'bg-green-200 border-2 border-green-600 text-green-800 scale-105 animate-bounce-in'
        : 'bg-red-200 border-2 border-red-600 text-red-800 scale-105 animate-bounce-in'
    }
    if (isSelected && !isCorrect) {
      return value === true
        ? 'bg-red-100 border-2 border-red-400 text-red-600 animate-shake'
        : 'bg-green-100 border-2 border-green-400 text-green-600 animate-shake'
    }
    return 'opacity-50 border-2 border-gray-200 text-gray-400'
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect(true)}
          disabled={answered}
          className={`flex flex-col items-center justify-center py-6 rounded-2xl transition-all ${getButtonStyle(true)}`}
          style={{ minHeight: '120px' }}
        >
          <span className="text-5xl mb-2">✅</span>
          <span className="font-bold text-xl">Verdadeiro</span>
        </button>

        <button
          onClick={() => handleSelect(false)}
          disabled={answered}
          className={`flex flex-col items-center justify-center py-6 rounded-2xl transition-all ${getButtonStyle(false)}`}
          style={{ minHeight: '120px' }}
        >
          <span className="text-5xl mb-2">❌</span>
          <span className="font-bold text-xl">Falso</span>
        </button>
      </div>

      {answered && (
        <div className={`p-3 rounded-xl text-sm font-medium ${selected === question.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
          {selected === question.correct ? '✅ Correto! ' : '💡 Quase lá! '}
          {question.explanation}
        </div>
      )}
    </div>
  )
}
