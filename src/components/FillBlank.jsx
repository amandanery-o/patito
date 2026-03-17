import { useState } from 'react'

export default function FillBlank({ question, onAnswer }) {
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
      return 'bg-white border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 text-gray-700'
    }
    if (index === question.correct) {
      return 'bg-green-100 border-2 border-green-500 text-green-800 animate-bounce-in'
    }
    if (index === selected && index !== question.correct) {
      return 'bg-red-100 border-2 border-red-500 text-red-800 animate-shake'
    }
    return 'bg-white border-2 border-gray-200 text-gray-400 opacity-60'
  }

  // Highlight the blank in the question
  const parts = question.question.split('___')

  return (
    <div className="space-y-4">
      {/* Question with blank highlighted */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center text-lg font-medium text-blue-900 leading-relaxed">
        {parts[0]}
        <span className="inline-block bg-white border-b-2 border-blue-500 mx-2 px-4 text-blue-400 italic min-w-16">
          {answered ? question.options[question.correct] : '___'}
        </span>
        {parts[1]}
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={answered}
            className={`px-4 py-3 rounded-xl font-medium text-base transition-all ${getButtonStyle(index)}`}
            style={{ minHeight: '52px' }}
          >
            {option}
            {answered && index === question.correct && ' ✅'}
            {answered && index === selected && index !== question.correct && ' ❌'}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`p-3 rounded-xl text-sm font-medium ${selected === question.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
          {selected === question.correct ? '✅ ' : '💡 '}
          {question.explanation}
        </div>
      )}
    </div>
  )
}
