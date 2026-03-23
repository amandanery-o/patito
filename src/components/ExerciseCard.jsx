import { useState, useCallback } from 'react'
import MultipleChoice from './MultipleChoice'
import TrueFalse from './TrueFalse'
import FillBlank from './FillBlank'
import Flashcard from './Flashcard'
import ProgressBar from './ProgressBar'
import FeedbackPanel from './FeedbackPanel'
import XPToast from './XPToast'

export default function ExerciseCard({ question, current, total, lives, xp, onAnswer }) {
  const [feedback, setFeedback] = useState(null)   // { correct, explanation }
  const [xpToast, setXpToast]   = useState(null)   // number | null

  const handleSelect = useCallback((isCorrect, explanation = '') => {
    setFeedback({ correct: isCorrect, explanation })
    if (isCorrect) setXpToast(10)
  }, [])

  function handleContinue() {
    const wasCorrect = feedback.correct
    setFeedback(null)
    onAnswer(wasCorrect)
  }

  function renderExercise() {
    const props = { question, onSelect: handleSelect }
    switch (question.type) {
      case 'multipleChoice': return <MultipleChoice {...props} />
      case 'trueFalse':      return <TrueFalse {...props} />
      case 'fillBlank':      return <FillBlank {...props} />
      case 'flashcard':      return <Flashcard question={question} onAnswer={onAnswer} />
      default: return <p className="text-red-500">Tipo desconhecido: {question.type}</p>
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Lives + XP */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-xl ${i < lives ? '' : 'grayscale opacity-30'}`}>❤️</span>
            ))}
          </div>
          <span className="font-extrabold text-yellow-600 text-base">⚡ {xp} XP</span>
        </div>

        {/* Barra de progresso */}
        <ProgressBar current={current} total={total} />

        {/* Card da questão */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          {renderExercise()}
        </div>

        {/* Espaço para o painel de feedback não cobrir o conteúdo */}
        {feedback && <div className="h-40" />}
      </div>

      {/* Toast de XP */}
      {xpToast && <XPToast amount={xpToast} onDone={() => setXpToast(null)} />}

      {/* Painel de feedback no rodapé */}
      {feedback && (
        <FeedbackPanel
          correct={feedback.correct}
          explanation={feedback.explanation}
          onContinue={handleContinue}
        />
      )}
    </>
  )
}
