import { useState, useEffect } from 'react'
import { shuffle } from '../utils/shuffle'

export default function MatchColumns({ question, onSelect }) {
  const [rightItems, setRightItems] = useState([])
  const [activeLeft, setActiveLeft] = useState(null) // index do par esquerdo selecionado
  const [matches, setMatches] = useState({}) // leftIndex → rightValue
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setRightItems(shuffle(question.pairs.map((p) => p.right)))
    setActiveLeft(null)
    setMatches({})
    setSubmitted(false)
  }, [question])

  function handleLeftTap(leftIndex) {
    if (submitted) return
    if (matches[leftIndex] !== undefined) {
      setMatches((current) => {
        const next = { ...current }
        delete next[leftIndex]
        return next
      })
      setActiveLeft(null)
      return
    }
    setActiveLeft(activeLeft === leftIndex ? null : leftIndex)
  }

  function handleRightTap(rightValue) {
    if (submitted) return
    const matchedLeft = Object.keys(matches).find((leftIndex) => matches[leftIndex] === rightValue)
    if (matchedLeft !== undefined) {
      setMatches((current) => {
        const next = { ...current }
        delete next[matchedLeft]
        return next
      })
      setActiveLeft(null)
      return
    }
    if (activeLeft === null) return

    const next = { ...matches, [activeLeft]: rightValue }
    setMatches(next)
    setActiveLeft(null)
  }

  function handleSubmit() {
    if (submitted || Object.keys(matches).length !== question.pairs.length) return
    setSubmitted(true)
    const correct = question.pairs.every((pair, i) => matches[i] === pair.right)
    onSelect(correct, question.explanation || '', { matches })
  }

  function leftStyle(i) {
    if (matches[i] !== undefined) {
      if (!submitted) return 'bg-blue-100 border-blue-400 text-blue-900'
      return matches[i] === question.pairs[i].right
        ? 'bg-green-100 border-green-500 text-green-900'
        : 'bg-red-100 border-red-500 text-red-900'
    }
    if (activeLeft === i) return 'bg-yellow-100 border-yellow-500 text-yellow-900 ring-2 ring-yellow-300'
    return 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 active:scale-95'
  }

  function rightStyle(rightValue) {
    const matched = Object.values(matches).includes(rightValue)
    if (matched) {
      if (!submitted) return 'bg-blue-100 border-blue-400 text-blue-900 opacity-50 cursor-default'
      const leftIdx = parseInt(Object.keys(matches).find((k) => matches[k] === rightValue))
      return matches[leftIdx] === question.pairs[leftIdx].right
        ? 'bg-green-100 border-green-500 text-green-900 opacity-50 cursor-default'
        : 'bg-red-100 border-red-500 text-red-900 opacity-50 cursor-default'
    }
    if (activeLeft !== null)
      return 'bg-purple-50 border-purple-300 hover:bg-purple-100 hover:border-purple-500 active:scale-95'
    return 'bg-gray-50 border-gray-200 text-gray-400 cursor-default'
  }

  const matched = Object.keys(matches).length
  const total = question.pairs.length

  return (
    <div className="space-y-4">
      <p className="text-lg sm:text-xl font-bold text-gray-800 leading-snug">{question.question}</p>

      {!submitted && (
        <p className="text-sm text-gray-500">
          {activeLeft === null
            ? matched === total
              ? 'Tudo conectado! Revise os pares ou confira suas respostas. 🐥'
              : `Toque um item à esquerda para começar (${matched}/${total} conectados) 👈`
            : `Agora toque o item correspondente à direita ➡️`}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        {/* Coluna esquerda */}
        <div className="space-y-2">
          {question.pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleLeftTap(i)}
              disabled={submitted}
              aria-label={matches[i] !== undefined ? `${pair.left}, conectado; toque para desfazer` : pair.left}
              className={`w-full min-h-[56px] p-3 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200 shadow-sm ${leftStyle(i)}`}
            >
              {pair.left}
            </button>
          ))}
        </div>

        {/* Coluna direita */}
        <div className="space-y-2">
          {rightItems.map((rightValue, i) => (
            <button
              key={i}
              onClick={() => handleRightTap(rightValue)}
              disabled={submitted || (activeLeft === null && !Object.values(matches).includes(rightValue))}
              aria-label={
                Object.values(matches).includes(rightValue)
                  ? `${rightValue}, conectado; toque para desfazer`
                  : rightValue
              }
              className={`w-full min-h-[56px] p-3 rounded-xl border-2 text-sm font-semibold text-left transition-all duration-200 shadow-sm ${rightStyle(rightValue)}`}
            >
              {rightValue}
            </button>
          ))}
        </div>
      </div>

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={matched !== total}
          className="w-full rounded-2xl bg-blue-600 px-5 py-3.5 font-extrabold text-white shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Conferir respostas
        </button>
      )}
    </div>
  )
}
