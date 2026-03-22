import { useState } from 'react'

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export default function CalendarMonth({ exams, subjects, examTypes, onEdit, onRemove }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(null)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  // Dias do mês
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Mapeia exames por dia (YYYY-MM-DD)
  const examsByDay = {}
  exams.forEach(exam => {
    const d = exam.date
    if (!examsByDay[d]) examsByDay[d] = []
    examsByDay[d].push(exam)
  })

  function dayKey(day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const selectedKey = selectedDay ? dayKey(selectedDay) : null
  const selectedExams = selectedKey ? (examsByDay[selectedKey] || []) : []

  const isToday = (day) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  }

  // Células da grade (dias do mês + padding inicial)
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="space-y-3">
      {/* Navegação */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={prevMonth}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-600 font-bold"
        >
          ‹
        </button>
        <span className="font-bold text-gray-800 text-base">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-600 font-bold"
        >
          ›
        </button>
      </div>

      {/* Grade */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cabeçalho dias da semana */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {WEEKDAYS.map(wd => (
            <div key={wd} className="text-center text-xs font-semibold text-gray-400 py-2">
              {wd}
            </div>
          ))}
        </div>

        {/* Células */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const key = day ? dayKey(day) : null
            const dayExams = key ? (examsByDay[key] || []) : []
            const selected = day === selectedDay
            const today_ = day && isToday(day)

            return (
              <button
                key={i}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                disabled={!day}
                className={`
                  relative flex flex-col items-center py-1.5 min-h-[52px] border-b border-r border-gray-50 last:border-r-0
                  transition-colors
                  ${!day ? 'bg-gray-50/50' : 'hover:bg-gray-50 active:bg-gray-100'}
                  ${selected ? 'bg-blue-50' : ''}
                `}
              >
                {day && (
                  <>
                    <span className={`
                      text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                      ${today_ ? 'bg-blue-500 text-white font-bold' : selected ? 'text-blue-600' : 'text-gray-700'}
                    `}>
                      {day}
                    </span>
                    {/* Pontos de exame */}
                    {dayExams.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center px-1">
                        {dayExams.slice(0, 3).map(exam => {
                          const subj = subjects.find(s => s.id === exam.subject)
                          return (
                            <span
                              key={exam.id}
                              className={`w-1.5 h-1.5 rounded-full ${subj?.color || 'bg-gray-400'}`}
                            />
                          )
                        })}
                        {dayExams.length > 3 && (
                          <span className="text-gray-400" style={{ fontSize: 8 }}>+{dayExams.length - 3}</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Detalhes do dia selecionado */}
      {selectedDay && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-500 px-1">
            {String(selectedDay).padStart(2, '0')}/{String(month + 1).padStart(2, '0')}/{year}
          </p>
          {selectedExams.length === 0 ? (
            <div className="bg-white rounded-2xl p-4 text-center text-gray-400 text-sm border border-gray-100">
              Nenhuma atividade neste dia 🐥
            </div>
          ) : (
            selectedExams.map(exam => {
              const subj = subjects.find(s => s.id === exam.subject)
              const et = examTypes.find(t => t.id === exam.type)
              return (
                <div key={exam.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                  <div className={`w-9 h-9 shrink-0 ${subj?.color || 'bg-gray-400'} rounded-xl flex items-center justify-center text-lg`}>
                    {subj?.icon || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-800">{subj?.name || exam.subject}</p>
                      {et && <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${et.badge}`}>{et.label}</span>}
                      {exam.weight && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Peso {exam.weight}</span>}
                    </div>
                    {exam.content && <p className="text-xs text-gray-500 mt-0.5">{exam.content}</p>}
                    {exam.notes && <p className="text-xs text-gray-400 mt-0.5">📌 {exam.notes}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => onEdit(exam)} className="text-gray-300 hover:text-blue-400 transition-colors">✏️</button>
                    <button onClick={() => onRemove(exam.id)} className="text-gray-300 hover:text-red-400 transition-colors text-lg">✕</button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
