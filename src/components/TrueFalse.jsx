import { useState, useEffect } from 'react'

export default function TrueFalse({ question, onSelect }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => { setSelected(null) }, [question.id])

  function handleSelect(value) {
    if (selected !== null) return
    setSelected(value)
    const correct = value === question.correct
    onSelect(correct, question.explanation || '')
  }

  function getStyle(value) {
    if (selected === null) {
      return value
        ? 'bg-white border-gray-300 hover:border-green-400 hover:bg-green-50 active:scale-95'
        : 'bg-white border-gray-300 hover:border-red-400 hover:bg-red-50 active:scale-95'
    }
    if (value === question.correct) return 'bg-green-100 border-green-500'
    if (value === selected)         return 'bg-red-100 border-red-500'
    return 'bg-white border-gray-200 opacity-40'
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-gray-800 leading-snug">{question.question}</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect(true)}
          disabled={selected !== null}
          className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 font-bold transition-all duration-200 ${getStyle(true)}`}
        >
          <span className="text-4xl">✅</span>
          <span className="text-base text-gray-700">Verdadeiro</span>
        </button>
        <button
          onClick={() => handleSelect(false)}
          disabled={selected !== null}
          className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border-2 font-bold transition-all duration-200 ${getStyle(false)}`}
        >
          <span className="text-4xl">❌</span>
          <span className="text-base text-gray-700">Falso</span>
        </button>
      </div>
    </div>
  )
}
