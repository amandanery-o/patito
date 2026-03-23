import { useState, useEffect } from 'react'

export default function FillBlank({ question, onSelect }) {
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
      return 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
    if (index === question.correctIndex) return 'bg-green-100 border-green-500 text-green-800'
    if (index === selected)              return 'bg-red-100 border-red-500 text-red-800'
    return 'bg-white border-gray-200 opacity-40'
  }

  const parts = question.question.split('___')

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-gray-800 leading-snug">
        {parts[0]}
        <span className="inline-block bg-yellow-100 border-b-2 border-yellow-400 px-3 mx-1 rounded font-bold text-yellow-700 min-w-[60px] text-center">
          {selected !== null ? question.options[selected] : '?'}
        </span>
        {parts[1]}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={selected !== null}
            className={`p-4 rounded-xl border-2 text-center font-semibold text-base transition-all duration-200 ${getStyle(i)}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
