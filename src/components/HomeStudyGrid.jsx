export default function HomeStudyGrid({ subjects, getTopicProgress, onSelect }) {
  if (subjects.length === 0) return null

  return (
    <section aria-labelledby="study-subjects-title" className="space-y-3">
      <div>
        <h2 id="study-subjects-title" className="text-lg font-extrabold text-gray-800">
          Estude uma matéria
        </h2>
        <p className="mt-0.5 text-sm text-gray-500">Escolha o que você quer revisar agora.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {subjects.map((subject) => {
          const materials = subject.topics.filter(
            (topic) => topic.questions.length > 0 && topic.summarySections?.length,
          )
          const completed = materials.filter((topic) => getTopicProgress(subject.id, topic.id).completed).length

          return (
            <button
              key={subject.id}
              type="button"
              data-testid={`subject-${subject.id}`}
              onClick={() => onSelect(subject)}
              aria-label={`${subject.name}, ${completed} de ${materials.length} revisões concluídas`}
              className="flex min-h-20 items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition hover:border-yellow-200 hover:shadow active:scale-[0.98]"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${subject.color} text-xl`}
                aria-hidden="true"
              >
                {subject.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-gray-800">{subject.name}</span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  {completed}/{materials.length} revisões
                </span>
              </span>
              <span className="shrink-0 text-lg font-bold text-gray-300" aria-hidden="true">
                ›
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
