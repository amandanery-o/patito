import { useState } from 'react'
import { SCHEDULE, SUBJECT_COLORS, DAY_SHORT, DAY_NAMES } from '../data/schedule'

const WEEKDAYS = [1, 2, 3, 4, 5]

const SUBJECT_ICONS = {
  'Língua Portuguesa':  '📝',
  'Educação Física':    '⚽',
  'Língua Inglesa':     '🇬🇧',
  'Matemática':         '🔢',
  'Ciências':           '🔬',
  'História':           '📜',
  'Arte':               '🎨',
  'Geografia':          '🌍',
  'Ensino Religioso':   '✨',
  'Laboratório':        '🧪',
  'Robótica/Matemática':'🤖',
}

function getColors(subject) {
  const key = subject?.split('/')[0]
  return SUBJECT_COLORS[key] || SUBJECT_COLORS[subject] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: '#9CA3AF' }
}

export default function ScheduleView() {
  const todayDay = new Date().getDay()
  const defaultDay = WEEKDAYS.includes(todayDay) ? todayDay : 1
  const [selectedDay, setSelectedDay] = useState(defaultDay)

  const lessons = SCHEDULE[selectedDay] || []

  return (
    <div className="px-4 sm:px-6 pb-6 space-y-4">

      {/* Abas de dias */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {WEEKDAYS.map(d => {
          const isToday = d === todayDay
          const isActive = d === selectedDay
          return (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`shrink-0 flex flex-col items-center px-4 py-2 rounded-2xl font-extrabold transition-all
                ${isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-300'
                }`}
            >
              <span className="text-sm">{DAY_SHORT[d]}</span>
              {isToday && (
                <span className={`text-xs font-bold mt-0.5 ${isActive ? 'text-blue-100' : 'text-blue-500'}`}>
                  hoje
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Título do dia */}
      <div className="flex items-center gap-2">
        <h2 className="font-extrabold text-gray-800 text-lg">{DAY_NAMES[selectedDay]}</h2>
        <span className="text-sm text-gray-400 font-semibold">{lessons.length} aulas</span>
      </div>

      {/* Lista de aulas */}
      <div className="space-y-3">
        {lessons.map((lesson, i) => {
          const colors = getColors(lesson.subject)
          const icon = SUBJECT_ICONS[lesson.subject] || '📚'
          return (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-2xl p-4 border-2 ${colors.bg}
                border-transparent shadow-sm`}
            >
              {/* Horário */}
              <div className="shrink-0 text-center">
                <p className={`text-sm font-extrabold ${colors.text}`}>{lesson.time}</p>
              </div>

              {/* Divisor */}
              <div className={`w-0.5 h-10 rounded-full opacity-30 ${colors.text} bg-current`} />

              {/* Matéria */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className={`font-extrabold text-base leading-tight ${colors.text}`}>
                    {lesson.subject}
                  </p>
                  {lesson.quinzenal && (
                    <span className="text-xs font-bold text-gray-400">⚠️ Quinzenal</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Nota de rodapé */}
      <p className="text-xs text-gray-400 text-center font-semibold pt-2">
        Turno da tarde · 13h30 às 18h00 · Turma 43
      </p>
    </div>
  )
}
