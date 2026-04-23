import { useState, useEffect } from 'react'
import { shuffle } from '../utils/shuffle'

export default function OrderQuestion({ question, onSelect }) {
  const [items, setItems]       = useState([])   // shuffled steps with original index
  const [sequence, setSequence] = useState([])   // ordered list of item indices
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const shuffled = shuffle(
      question.steps.map((step, i) => ({ step, correctPos: i }))
    )
    setItems(shuffled)
    setSequence([])
    setSubmitted(false)
  }, [question.id])

  function handleTap(itemIndex) {
    if (submitted) return
    if (sequence.includes(itemIndex)) {
      // Permite desfazer apenas o último item selecionado
      if (sequence[sequence.length - 1] === itemIndex) {
        setSequence(sequence.slice(0, -1))
      }
      return
    }
    const next = [...sequence, itemIndex]
    setSequence(next)
    if (next.length === items.length) {
      setSubmitted(true)
      const correct = next.every((itemIdx, pos) => items[itemIdx].correctPos === pos)
      onSelect(correct, question.explanation || '')
    }
  }

  function getOrderNum(itemIndex) {
    const pos = sequence.indexOf(itemIndex)
    return pos === -1 ? null : pos + 1
  }

  function getItemStyle(itemIndex) {
    const num = getOrderNum(itemIndex)
    if (!submitted) {
      if (num !== null) return 'bg-blue-50 border-blue-400 text-blue-900'
      return 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 active:scale-95'
    }
    if (num === null) return 'bg-gray-50 border-gray-200 opacity-40'
    const isCorrect = items[itemIndex].correctPos === num - 1
    return isCorrect
      ? 'bg-green-50 border-green-500 text-green-900'
      : 'bg-red-50 border-red-500 text-red-900'
  }

  function getBadgeStyle(itemIndex) {
    const num = getOrderNum(itemIndex)
    if (!submitted) return num ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
    if (!num) return 'bg-gray-200 text-gray-400'
    const isCorrect = items[itemIndex].correctPos === num - 1
    return isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }

  const remaining = items.length - sequence.length

  return (
    <div className="space-y-4">
      <p className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">
        {question.question}
      </p>

      {!submitted && (
        <p className="text-sm text-gray-500">
          {remaining > 0
            ? `Toque as etapas na ordem correta — ${remaining} restante${remaining > 1 ? 's' : ''} 👆`
            : 'Verificando...'}
        </p>
      )}

      <div className="space-y-2">
        {items.map((item, i) => {
          const num = getOrderNum(i)
          return (
            <button
              key={i}
              onClick={() => handleTap(i)}
              disabled={submitted}
              className={`flex items-center gap-3 w-full text-left p-3 sm:p-4 rounded-2xl border-2 font-semibold transition-all duration-200 shadow-sm ${getItemStyle(i)}`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-colors ${getBadgeStyle(i)}`}>
                {num ?? '—'}
              </span>
              <span className="text-sm sm:text-base leading-snug">{item.step}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
