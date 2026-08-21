function chapterNumbers(value) {
  return (
    String(value || '')
      .match(/\d+/g)
      ?.map(Number) || []
  )
}

function assessmentName(topic) {
  return (
    topic.reviewLabel?.match(/P\d/i)?.[0]?.toUpperCase() || topic.title.match(/P\d/i)?.[0]?.toUpperCase() || 'Revisão'
  )
}

function sourceDescription(topic) {
  const chapters = topic.chapter ? `Capítulos ${topic.chapter}` : 'Conteúdo do livro'
  const pages = topic.source?.pages ? ` · páginas ${topic.source.pages}` : ''
  return `${chapters}${pages}`
}

export default function TopicTrail({ subject, topics, getTopicProgress, onStart, onReview }) {
  const reviewMaterials = topics.filter((topic) => topic.questions.length > 0 && topic.summarySections?.length)
  const coveredChapters = new Set(reviewMaterials.flatMap((topic) => chapterNumbers(topic.chapter)))
  const preparing = topics.filter(
    (topic) =>
      topic.questions.length === 0 && !chapterNumbers(topic.chapter).some((chapter) => coveredChapters.has(chapter)),
  )

  return (
    <div className="space-y-8 px-4 pb-8">
      <section aria-labelledby="review-materials-title">
        <div className="mb-4">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-600">Estude no seu ritmo</p>
          <h2 id="review-materials-title" className="text-2xl font-extrabold text-gray-900">
            Material de revisão
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Primeiro leia o resumo. Quando estiver pronto, pratique as questões.
          </p>
        </div>

        <div className="space-y-4">
          {reviewMaterials.map((topic) => {
            const completed = getTopicProgress(subject.id, topic.id).completed
            const label = assessmentName(topic)

            return (
              <article
                key={topic.id}
                className="overflow-hidden rounded-3xl border-2 border-orange-100 bg-white shadow-sm"
              >
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-700">
                        {label}
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold leading-tight text-gray-900">{topic.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{sourceDescription(topic)}</p>
                    </div>
                    <span className="text-3xl" aria-hidden="true">
                      {completed ? '✅' : '📚'}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-700">
                    {topic.summary || 'Resumo dos conteúdos da prova, com os pontos mais importantes do livro.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-orange-100 bg-orange-50 p-4">
                  <button
                    type="button"
                    onClick={() => onReview(topic)}
                    aria-label={`Ler material da ${topic.title}`}
                    className="rounded-2xl border-2 border-orange-200 bg-white px-3 py-3 text-sm font-extrabold text-orange-700 active:scale-95"
                  >
                    Ler material
                  </button>
                  <button
                    type="button"
                    onClick={() => onStart(topic)}
                    aria-label={`Praticar ${topic.title}`}
                    className="rounded-2xl bg-blue-600 px-3 py-3 text-sm font-extrabold text-white shadow-sm active:scale-95"
                  >
                    Praticar 30 questões
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {preparing.length > 0 && (
        <section aria-labelledby="preparing-title">
          <h2 id="preparing-title" className="mb-3 text-lg font-extrabold text-gray-800">
            Em preparação
          </h2>
          <div className="space-y-3">
            {preparing.map((topic) => (
              <div key={topic.id} className="rounded-2xl border-2 border-yellow-100 bg-yellow-50 p-4">
                <p className="font-extrabold text-yellow-800">{topic.title}</p>
                <p className="mt-1 text-xs text-yellow-700">Material e questões chegando em breve 🐥</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
