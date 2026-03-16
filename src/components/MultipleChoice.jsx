import { useState } from 'react'

const LABELS = ['A', 'B', 'C', 'D']

export default function MultipleChoice({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  function handleSelect(index) {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const isCorrect = index === question.correct

    setTimeout(() => {
      onAnswer(isCorrect)
      setSelected(null)
      setAnswered(false)
    }, 1500)
  }

  function getButtonStyle(index) {
    if (!answered) {
      return 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
    }
    if (index === question.correct) {
      return 'bg-green-100 border-2 border-green-500 text-green-800 animate-bounce-in'
    }
    if (index === selected && index !== question.correct) {
      return 'bg-red-100 border-2 border-red-500 text-red-800 animate-shake'
    }
    return 'bg-white border-2 border-gray-200 text-gray-400 opacity-60'
  }

  return (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          disabled={answered}
          className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${getButtonStyle(index)}`}
          style={{ minHeight: '56px' }}
        >
          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold flex-shrink-0">
            {LABELS[index]}
          </span>
          <span className="text-base font-medium">{option}</span>
          {answered && index === question.correct && (
            <span className="ml-auto text-xl">✅</span>
          )}
          {answered && index === selected && index !== question.correct && (
            <span className="ml-auto text-xl">❌</span>
          )}
        </button>
      ))}

      {answered && (
        <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${selected === question.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
          {selected === question.correct ? '✅ ' : '💡 '}
          {question.explanation}
        </div>
      )}
    </div>
  )
}
