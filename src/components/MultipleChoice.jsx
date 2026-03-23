import { useState, useEffect } from 'react'

const LABELS = ['A', 'B', 'C', 'D']

export default function MultipleChoice({ question, onSelect }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => { setSelected(null) }, [question.id])

  function handleSelect(index) {
    if (selected !== null) return
    setSelected(index)
    const correct = index === question.correctIndex
    onSelect(correct, question.explanation || '')
  }

  function getStyle(index) {
    if (selected === null)
      return 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400 active:scale-95 active:shadow-inner'
    if (index === question.correctIndex)
      return 'bg-green-100 border-green-500 text-green-800'
    if (index === selected)
      return 'bg-red-100 border-red-500 text-red-800'
    return 'bg-gray-50 border-gray-200 opacity-40'
  }

  function getLabelStyle(index) {
    if (selected === null) return 'bg-blue-200 text-blue-800'
    if (index === question.correctIndex) return 'bg-green-500 text-white'
    if (index === selected) return 'bg-red-500 text-white'
    return 'bg-gray-200 text-gray-400'
  }

  return (
    <div className="space-y-3">
      <p className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">{question.question}</p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`flex items-center gap-3 w-full text-left p-4 rounded-2xl border-2 font-semibold transition-all duration-200 shadow-sm ${getStyle(i)}`}
          >
            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all ${getLabelStyle(i)}`}>
              {LABELS[i]}
            </span>
            <span className="text-base sm:text-lg">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
