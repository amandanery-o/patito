import Mascot from './Mascot'

export default function FeedbackPanel({ correct, explanation, onContinue }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 animate-slide-up
        ${correct ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <div className="max-w-lg mx-auto px-4 pt-4 pb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Mascot mood={correct ? 'feliz' : 'triste'} size="sm" />
          <div>
            <p className="font-extrabold text-white text-lg">
              {correct ? 'Arrasou! 🎉' : 'Quase lá! 💪'}
            </p>
            {explanation && (
              <p className="text-white/90 text-sm leading-snug">{explanation}</p>
            )}
          </div>
        </div>
        <button
          onClick={onContinue}
          className={`w-full font-extrabold text-lg rounded-2xl py-3 transition-all active:scale-95 select-none
            ${correct
              ? 'bg-white text-green-600 border-b-4 border-green-700 active:border-b-2'
              : 'bg-white text-red-600 border-b-4 border-red-700 active:border-b-2'
            }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
