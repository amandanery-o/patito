import { useState, useEffect } from 'react'

const LABELS = ['A', 'B', 'C', 'D']

export default function MultipleChoice({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(null)
  }, [question.id])

  function handleSelect(index) {
    if (selected !== null) return
    setSelected(index)
    const correct = index === question.correctIndex
    setTimeout(() => onAnswer(correct), 1500)
  }

  function getStyle(index) {
    if (selected === null) return 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
    if (index === question.correctIndex) return 'bg-green-100 border-green-500 text-green-800'
    if (index === selected) return 'bg-red-100 border-red-500 text-red-800'
    return 'bg-white border-gray-200 opacity-50'
  }

  return (
    <div className="space-y-3">
      <p className="text-lg font-semibold text-gray-800 leading-snug">{question.question}</p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`flex items-center gap-3 w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${getStyle(i)}`}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
              {LABELS[i]}
            </span>
            <span className="text-base">{opt}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${selected === question.correctIndex ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {selected === question.correctIndex ? '✅ Correto! ' : '❌ Quase lá! '}
          {question.explanation}
        </div>
      )}
    </div>
  )
}
