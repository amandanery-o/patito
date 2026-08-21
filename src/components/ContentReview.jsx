import Mascot from './Mascot'

export default function ContentReview({ topic, onBack, onStart }) {
  const hasQuestions = topic.questions.length > 0

  return (
    <div className="min-h-screen bg-amber-50 pb-10">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-orange-500 px-4 py-4 text-white shadow-sm">
        <button onClick={onBack} className="text-2xl font-bold" aria-label="Voltar">
          ‹
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-orange-100">
            {topic.reviewLabel || `Revisão do capítulo ${topic.chapter}`}
          </p>
          <h1 className="text-lg font-extrabold leading-tight">{topic.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-5 px-4 py-6">
        <section className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
          <Mascot mood="feliz" size="sm" />
          <p className="font-semibold text-gray-700">
            Leia com calma. Depois, tente explicar cada parte com suas próprias palavras.
          </p>
        </section>

        {topic.summarySections.map((section) => (
          <section key={section.title} className="rounded-3xl border-2 border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-extrabold text-orange-700">{section.title}</h2>
            <p className="leading-relaxed text-gray-700">{section.text}</p>
          </section>
        ))}

        <section className="rounded-3xl bg-green-50 p-5 ring-2 ring-green-100">
          <h2 className="mb-3 text-lg font-extrabold text-green-800">O que lembrar</h2>
          <ul className="space-y-2 text-gray-700">
            {topic.keyIdeas.map((idea) => (
              <li key={idea} className="flex gap-2">
                <span aria-hidden="true">✓</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </section>

        {hasQuestions ? (
          <button
            onClick={onStart}
            className="w-full rounded-2xl bg-blue-600 px-5 py-4 font-extrabold text-white shadow-md active:scale-95"
          >
            Começar questões
          </button>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-4 text-center font-semibold text-yellow-700">
            As questões deste capítulo estão sendo preparadas. 🐥
          </div>
        )}
      </main>
    </div>
  )
}
