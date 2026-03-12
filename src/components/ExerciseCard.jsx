import MultipleChoice from './MultipleChoice'
import TrueFalse from './TrueFalse'
import FillBlank from './FillBlank'
import Flashcard from './Flashcard'
import ProgressBar from './ProgressBar'

export default function ExerciseCard({ question, current, total, lives, xp, onAnswer }) {
  function renderExercise() {
    switch (question.type) {
      case 'multipleChoice': return <MultipleChoice question={question} onAnswer={onAnswer} />
      case 'trueFalse':      return <TrueFalse question={question} onAnswer={onAnswer} />
      case 'fillBlank':      return <FillBlank question={question} onAnswer={onAnswer} />
      case 'flashcard':      return <Flashcard question={question} onAnswer={onAnswer} />
      default: return <p className="text-red-500">Tipo de exercício desconhecido: {question.type}</p>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < lives ? 'text-red-500 text-xl' : 'text-gray-200 text-xl'}>❤️</span>
          ))}
        </div>
        <span className="font-bold text-yellow-600">⚡ {xp} XP</span>
      </div>
      <ProgressBar current={current} total={total} />
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-2">
        {renderExercise()}
      </div>
    </div>
  )
}
