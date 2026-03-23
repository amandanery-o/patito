/**
 * Visualização em trilha dos tópicos de uma matéria.
 * Cada nó é um círculo; nós completos ficam cheios, incompletos vazados.
 * Conectados por uma linha vertical.
 */
export default function TopicTrail({ subject, topics, getTopicProgress, onStart }) {
  return (
    <div className="flex flex-col items-center gap-0 pb-8">
      {topics.map((topic, index) => {
        const tp        = getTopicProgress(subject.id, topic.id)
        const completed = tp.completed
        const stars     = tp.stars || 0
        // Um tópico está bloqueado se não for o primeiro e o anterior não foi completado
        const prevTp    = index > 0 ? getTopicProgress(subject.id, topics[index - 1].id) : null
        const locked    = index > 0 && !prevTp?.completed

        return (
          <div key={topic.id} className="flex flex-col items-center w-full max-w-xs sm:max-w-sm">
            {/* Linha de conexão acima (exceto primeiro) */}
            {index > 0 && (
              <div className={`w-1 h-8 rounded-full ${completed ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}

            {/* Nó + Card */}
            <div className="flex items-center gap-4 w-full px-4">
              {/* Nó circular */}
              <div
                className={`w-14 h-14 shrink-0 rounded-full border-4 flex items-center justify-center text-xl shadow-md transition-all
                  ${completed
                    ? `${subject.color} border-white text-white shadow-lg`
                    : locked
                      ? 'bg-gray-100 border-gray-200 text-gray-300'
                      : 'bg-white border-blue-300 text-blue-500 shadow-md'
                  }`}
              >
                {completed
                  ? (stars === 3 ? '⭐' : stars === 2 ? '🌟' : '✅')
                  : locked
                    ? <span className="text-2xl">🔒</span>
                    : <span className="font-extrabold text-base text-blue-600">{index + 1}</span>
                }
              </div>

              {/* Card do tópico */}
              <button
                onClick={() => !locked && onStart(topic)}
                disabled={locked}
                title={locked ? 'Complete o tópico anterior para liberar' : undefined}
                className={`flex-1 rounded-2xl p-4 text-left transition-all
                  ${completed
                    ? 'bg-green-50 border-2 border-green-200 hover:bg-green-100 active:scale-95'
                    : locked
                      ? 'bg-gray-50 border-2 border-gray-200 cursor-not-allowed opacity-60'
                      : 'bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-md shadow-sm active:scale-95'
                  }`}
              >
                <p className={`font-extrabold text-base ${completed ? 'text-green-700' : locked ? 'text-gray-400' : 'text-gray-800'}`}>
                  {topic.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {locked
                    ? <span className="text-xs text-gray-400">Complete o anterior para liberar</span>
                    : <>
                        <span className="text-xs text-gray-400">{topic.questions.length} questões</span>
                        {completed && (
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map(s => (
                              <span key={s} className={`text-sm ${s <= stars ? 'text-yellow-400' : 'text-gray-200'}`}>⭐</span>
                            ))}
                          </div>
                        )}
                      </>
                  }
                </div>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
