import Mascot from './Mascot'

export default function FeedbackPanel({ correct, explanation, onContinue }) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 animate-slide-up
        ${correct ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <Mascot mood={correct ? 'feliz' : 'triste'} size="md" />
          <div>
            <p className="font-extrabold text-white text-lg sm:text-2xl">
              {correct ? 'Arrasou! 🎉' : 'Quase lá! 💪'}
            </p>
            {explanation && (
              <p className="text-white/90 text-sm sm:text-base leading-snug">{explanation}</p>
            )}
          </div>
        </div>
        <button
          onClick={onContinue}
          className={`w-full font-extrabold text-lg sm:text-xl rounded-2xl py-3 sm:py-4 transition-all active:scale-95 select-none
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
