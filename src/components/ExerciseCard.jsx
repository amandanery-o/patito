import MultipleChoice from './MultipleChoice'
import TrueFalse from './TrueFalse'
import FillBlank from './FillBlank'
import Flashcard from './Flashcard'

const typeLabels = {
  'multiple-choice': { label: 'Múltipla Escolha', icon: '📋', color: 'blue' },
  'true-false': { label: 'Verdadeiro ou Falso', icon: '⚖️', color: 'green' },
  'fill-blank': { label: 'Complete a Frase', icon: '✏️', color: 'purple' },
  'flashcard': { label: 'Flashcard', icon: '🃏', color: 'orange' }
}

export default function ExerciseCard({ question, onAnswer }) {
  const meta = typeLabels[question.type] || typeLabels['multiple-choice']

  const renderExercise = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoice question={question} onAnswer={onAnswer} />
      case 'true-false':
        return <TrueFalse question={question} onAnswer={onAnswer} />
      case 'fill-blank':
        return <FillBlank question={question} onAnswer={onAnswer} />
      case 'flashcard':
        return <Flashcard question={question} onAnswer={onAnswer} />
      default:
        return <MultipleChoice question={question} onAnswer={onAnswer} />
    }
  }

  return (
    <div className="space-y-4">
      {/* Exercise type badge */}
      <div className="flex items-center gap-2">
        <span className="text-base">{meta.icon}</span>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {meta.label}
        </span>
      </div>

      {/* Question text */}
      {question.type !== 'fill-blank' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-gray-800 font-semibold leading-relaxed" style={{ fontSize: '1.125rem' }}>
            {question.question}
          </p>
        </div>
      )}

      {/* Exercise component */}
      {renderExercise()}
    </div>
  )
}
