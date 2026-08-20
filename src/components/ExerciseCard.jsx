import { useState, useCallback } from 'react'
import MultipleChoice from './MultipleChoice'
import MatchColumns from './MatchColumns'
import ProgressBar from './ProgressBar'
import FeedbackPanel from './FeedbackPanel'

export default function ExerciseCard({ question, current, total, onAnswer, onReport }) {
  const [feedback, setFeedback] = useState(null)   // { correct, explanation }
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleSelect = useCallback((isCorrect, explanation = '', answer = {}) => {
    setFeedback({ correct: isCorrect, explanation, answer })
  }, [])

  async function handleContinue() {
    setSaving(true)
    setSaveError('')
    try {
      await onAnswer({ isCorrect: feedback.correct, answer: feedback.answer })
      setFeedback(null)
    } catch {
      setSaveError('Não conseguimos salvar. Confira a internet e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  function renderExercise() {
    const props = { question, onSelect: handleSelect }
    switch (question.type) {
      case 'multipleChoice': return <MultipleChoice {...props} />
      case 'matchColumns':   return <MatchColumns {...props} />
      default: return <p className="text-red-500">Esta questão precisa ser revisada antes de aparecer aqui.</p>
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Barra de progresso */}
        <ProgressBar current={current} total={total} />

        {/* Card da questão */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 md:p-9 shadow-lg border border-gray-100">
          {renderExercise()}
        </div>

        {/* Espaço para o painel de feedback não cobrir o conteúdo */}
        {feedback && <div className="h-44 sm:h-48" />}
      </div>

      {/* Painel de feedback no rodapé */}
      {feedback && (
        <div>
          {saveError && (
            <p className="fixed bottom-36 left-4 right-4 z-[60] max-w-lg mx-auto bg-red-100 text-red-700 rounded-xl px-4 py-3 text-sm font-bold shadow">
              {saveError}
            </p>
          )}
          <FeedbackPanel
            correct={feedback.correct}
            explanation={saving ? 'Salvando sua resposta…' : feedback.explanation}
            onContinue={saving ? undefined : handleContinue}
            onReport={onReport}
          />
        </div>
      )}
    </>
  )
}
