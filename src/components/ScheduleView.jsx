import { SCHEDULE, SUBJECT_COLORS, DAY_SHORT } from '../data/schedule'

const TIMES = ['13h30', '14h20', '15h10', '16h20', '17h10']
const WEEKDAYS = [1, 2, 3, 4, 5] // Seg→Sex

function subjectColor(subject) {
  const base = subject?.split('/')[0]
  return SUBJECT_COLORS[base] || SUBJECT_COLORS[subject] || { bg: 'bg-gray-100', text: 'text-gray-700' }
}

function SubjectCell({ lesson, isToday }) {
  if (!lesson) return <div className="h-full bg-gray-50 rounded-lg" />
  const { bg, text } = subjectColor(lesson.subject)
  const name = lesson.subject.replace('Língua ', '').replace('Ensino ', '')
  return (
    <div className={`rounded-lg px-1 py-1.5 text-center h-full flex flex-col items-center justify-center gap-0.5
      ${bg} ${isToday ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`}>
      <span className={`text-xs font-extrabold leading-tight ${text}`} style={{ fontSize: 10 }}>
        {name}
      </span>
      {lesson.quinzenal && (
        <span className="text-gray-400 font-bold leading-none" style={{ fontSize: 8 }}>quinz.</span>
      )}
    </div>
  )
}

export default function ScheduleView() {
  const today = new Date().getDay() // 0–6

  return (
    <div className="px-4 sm:px-6 pb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 bg-gray-50 border-b border-gray-100">
          <div className="py-2 px-1" />
          {WEEKDAYS.map(d => (
            <div key={d} className={`py-2 text-center text-xs font-extrabold
              ${d === today ? 'text-blue-600' : 'text-gray-500'}`}>
              {DAY_SHORT[d]}
              {d === today && <div className="mx-auto mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </div>
          ))}
        </div>

        {/* Linhas de horário */}
        {TIMES.map(time => (
          <div key={time} className="grid grid-cols-6 border-b border-gray-50 last:border-0" style={{ minHeight: 52 }}>
            {/* Horário */}
            <div className="flex items-center justify-center px-1 py-1">
              <span className="text-gray-400 font-bold" style={{ fontSize: 9 }}>{time}</span>
            </div>
            {/* Células por dia */}
            {WEEKDAYS.map(d => {
              const lesson = SCHEDULE[d]?.find(l => l.time === time)
              return (
                <div key={d} className="p-0.5">
                  <SubjectCell lesson={lesson} isToday={d === today} />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(SUBJECT_COLORS).map(([name, { bg, text }]) => {
          const shortName = name.replace('Língua ', '').replace('Ensino ', '')
          return (
            <span key={name} className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg} ${text}`}>
              {shortName}
            </span>
          )
        })}
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
          quinz. = quinzenal
        </span>
      </div>
    </div>
  )
}
