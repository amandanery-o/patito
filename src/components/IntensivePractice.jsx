import { intensiveRounds } from '../utils/intensiveRounds'

export default function IntensivePractice({ topic, onStart, isCompleted }) {
  const rounds = intensiveRounds(topic)
  if (!rounds.length) return null

  return (
    <section aria-label={`Intensivão da ${topic.title}`} className="border-t border-orange-100 bg-amber-50 p-4">
      <h3 className="font-extrabold text-amber-900">Intensivão · 60 questões novas</h3>
      <p className="mb-3 mt-1 text-sm text-amber-900">Duas rodadas diferentes. Faça uma de cada vez!</p>
      <div className="grid grid-cols-2 gap-3">
        {rounds.map((round, index) => (
          <button
            key={round.id}
            type="button"
            onClick={() => onStart(round)}
            aria-label={`Intensivão da ${topic.title}, rodada ${index + 1}`}
            className="rounded-2xl border-2 border-amber-300 bg-white px-3 py-3 text-sm font-extrabold text-amber-900 active:scale-95"
          >
            <span className="block">Rodada {index + 1} · 30 questões</span>
            {isCompleted?.(round.id) && (
              <span className="mt-1 block text-xs text-green-700">✓ Concluída · refazer</span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
