import { daysUntil, formatDate, parseLocalDate } from '../utils/dates'

function getNovemberAssessments(subjects, today) {
  const assessments = subjects.flatMap((subject) =>
    subject.topics
      .filter(
        (topic) =>
          topic.reviewLabel === 'NOVEMBRO' &&
          topic.examDate &&
          topic.questions.length > 0 &&
          topic.summarySections?.length,
      )
      .map((topic) => ({ subject, topic })),
  )

  const currentMonthAssessments = assessments.filter(({ topic }) => {
    const examDate = parseLocalDate(topic.examDate)
    return examDate.getFullYear() === today.getFullYear() && examDate.getMonth() === today.getMonth()
  })

  const upcoming = currentMonthAssessments
    .filter(({ topic }) => daysUntil(topic.examDate, today) >= 0)
    .sort((a, b) => parseLocalDate(a.topic.examDate) - parseLocalDate(b.topic.examDate))
  const past = currentMonthAssessments
    .filter(({ topic }) => daysUntil(topic.examDate, today) < 0)
    .sort((a, b) => parseLocalDate(b.topic.examDate) - parseLocalDate(a.topic.examDate))

  return { upcoming, past }
}

function daysLabel(date, today) {
  const days = daysUntil(date, today)
  if (days === 0) return 'Hoje'
  if (days === 1) return 'Amanhã'
  return `Em ${days} dias`
}

function AssessmentRow({ subject, topic, today, onSelect, past = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(subject, topic)}
      aria-label={`${past ? 'Rever' : 'Estudar'} ${subject.name}, prova em ${formatDate(topic.examDate)}`}
      className="flex w-full items-center gap-3 rounded-2xl border border-yellow-100 bg-white p-3 text-left shadow-sm transition hover:border-yellow-300 hover:bg-yellow-50 active:scale-[0.99]"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${subject.color} text-xl`}
        aria-hidden="true"
      >
        {subject.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-extrabold text-gray-800">{subject.name}</span>
        <span className="mt-0.5 block text-sm text-gray-500">Prova em {formatDate(topic.examDate)}</span>
      </span>
      {past ? (
        <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-extrabold text-gray-600">
          Rever
        </span>
      ) : (
        <span className="shrink-0 text-right">
          <span className="block text-xs font-extrabold text-orange-700">{daysLabel(topic.examDate, today)}</span>
          <span className="block text-sm font-extrabold text-yellow-800">Estudar ›</span>
        </span>
      )}
    </button>
  )
}

export default function NovemberExamSpotlight({ subjects, today = new Date(), onSelect }) {
  const { upcoming, past } = getNovemberAssessments(subjects, today)
  if (upcoming.length === 0 && past.length === 0) return null

  return (
    <section
      aria-labelledby="november-exams-title"
      className="overflow-hidden rounded-3xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-200 text-2xl"
          aria-hidden="true"
        >
          🎓
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-orange-700">Foco do mês</p>
          <h2 id="november-exams-title" className="text-xl font-extrabold text-gray-900">
            Provas de novembro
          </h2>
        </div>
      </div>

      {upcoming.length > 0 ? (
        <div className="space-y-2">
          {upcoming.map(({ subject, topic }) => (
            <AssessmentRow
              key={`${subject.id}-${topic.id}`}
              subject={subject}
              topic={topic}
              today={today}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white/80 p-3 text-sm font-semibold text-gray-700">
          Todas as provas de novembro já aconteceram. Você ainda pode rever os materiais abaixo. 🐥
        </p>
      )}

      {past.length > 0 && (
        <details className="mt-3 rounded-2xl border border-yellow-200 bg-white/70 p-3">
          <summary className="cursor-pointer list-none text-sm font-extrabold text-gray-700">
            <span className="mr-2 inline-block transition-transform open:rotate-90">›</span>
            Já aconteceram ({past.length})
          </summary>
          <div className="mt-3 space-y-2">
            {past.map(({ subject, topic }) => (
              <AssessmentRow
                key={`${subject.id}-${topic.id}`}
                subject={subject}
                topic={topic}
                today={today}
                onSelect={onSelect}
                past
              />
            ))}
          </div>
        </details>
      )}
    </section>
  )
}
