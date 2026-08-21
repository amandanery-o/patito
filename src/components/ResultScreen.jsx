import Mascot from './Mascot'
import Confetti from './Confetti'

export default function ResultScreen({ correct, total, incorrectQuestions = [], onContinue, onHome, saving, error }) {
  return (
    <div className="relative flex flex-col items-center gap-6 sm:gap-8 py-10 sm:py-16 px-4 sm:px-10 text-center overflow-hidden">
      <Confetti />

      <Mascot mood="celebrando" size="hero" className="animate-bounce" />

      <p className="text-2xl sm:text-4xl font-extrabold text-gray-800">Revisão concluída! 🎉</p>

      <div className="bg-blue-50 rounded-2xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-blue-200 shadow-sm w-full">
        <p className="text-xl sm:text-2xl font-extrabold text-blue-700">Você respondeu {total} questões</p>
        <p className="text-sm sm:text-lg font-semibold text-gray-500 mt-1">
          {correct} corretas · {total - correct} para revisar
        </p>
      </div>

      {incorrectQuestions.length > 0 && (
        <div className="w-full text-left space-y-2">
          <h2 className="font-extrabold text-gray-700">Vamos rever estas questões:</h2>
          {incorrectQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-sm font-semibold text-gray-700"
            >
              {question.question}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="w-full rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 w-full">
        <button
          disabled={saving}
          onClick={onContinue}
          className="w-full text-lg sm:text-xl btn-duo-green disabled:opacity-60"
        >
          {saving ? 'Salvando…' : 'Continuar 🚀'}
        </button>
        <button disabled={saving} onClick={onHome} className="w-full sm:text-lg btn-duo-gray disabled:opacity-60">
          Início 🏠
        </button>
      </div>
    </div>
  )
}
