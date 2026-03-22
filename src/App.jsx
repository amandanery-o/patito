import { useState } from 'react'
import Header from './components/Header'
import SubjectCard from './components/SubjectCard'
import ExerciseCard from './components/ExerciseCard'
import ResultScreen from './components/ResultScreen'
import { useProgress } from './hooks/useProgress'
import { shuffle } from './utils/shuffle'
import { calcStars, calcXP } from './utils/scoring'
import { matematica } from './data/matematica'

const SUBJECTS = [
  { id: 'portugues',        name: 'Português',       icon: '📝', color: 'bg-blue-500',   topics: [],                calendarOnly: false },
  { id: 'matematica',       name: 'Matemática',      icon: '🔢', color: 'bg-green-500',  topics: matematica.topics, calendarOnly: false },
  { id: 'geografia',        name: 'Geografia',       icon: '🌍', color: 'bg-orange-500', topics: [],                calendarOnly: false },
  { id: 'ingles',           name: 'Inglês',          icon: '🇬🇧', color: 'bg-purple-500', topics: [],                calendarOnly: false },
  { id: 'ciencias',         name: 'Ciências',        icon: '🔬', color: 'bg-cyan-500',   topics: [],                calendarOnly: false },
  { id: 'historia',         name: 'História',        icon: '📜', color: 'bg-amber-700',  topics: [],                calendarOnly: false },
  { id: 'ensino-religioso', name: 'Ens. Religioso',  icon: '✨', color: 'bg-yellow-500', topics: [],                calendarOnly: false },
  { id: 'educacao-fisica',  name: 'Educ. Física',    icon: '⚽', color: 'bg-red-500',    topics: [],                calendarOnly: true  },
  { id: 'arte',             name: 'Arte',            icon: '🎨', color: 'bg-pink-500',   topics: [],                calendarOnly: true  },
]

const EXAM_TYPES = [
  { id: 'trabalho',    label: 'Trabalho (T)',  badge: 'bg-blue-100 text-blue-700'   },
  { id: 'prova',       label: 'Prova (P)',     badge: 'bg-green-100 text-green-700' },
  { id: 'recuperacao', label: 'Recuperação',   badge: 'bg-orange-100 text-orange-700' },
]

const VIEWS = { HOME: 'home', SUBJECT: 'subject', SESSION: 'session', RESULT: 'result', CALENDAR: 'calendar' }

export default function App() {
  const [view, setView] = useState(VIEWS.HOME)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [sessionQuestions, setSessionQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [lives, setLives] = useState(3)
  const [sessionXP, setSessionXP] = useState(0)
  const [finalStars, setFinalStars] = useState(0)
  const [finalXP, setFinalXP] = useState(0)
  const [examForm, setExamForm] = useState({ subject: 'matematica', type: 'prova', weight: '', date: '', time: '', content: '', notes: '' })
  const [editingExamId, setEditingExamId] = useState(null)

  const { user, exams, updateTopicProgress, getTopicProgress, getSubjectProgress, addExam, updateExam, removeExam, getUpcomingExams } = useProgress()

  const upcomingExams = getUpcomingExams(7)

  function startSession(subject, topic) {
    const questions = shuffle(topic.questions).slice(0, 10)
    setSelectedSubject(subject)
    setSelectedTopic(topic)
    setSessionQuestions(questions)
    setQuestionIndex(0)
    setCorrect(0)
    setLives(3)
    setSessionXP(0)
    setView(VIEWS.SESSION)
  }

  function handleAnswer(isCorrect) {
    const newCorrect = isCorrect ? correct + 1 : correct
    const newLives = isCorrect ? lives : lives - 1
    const newXP = isCorrect ? sessionXP + 10 : sessionXP

    setCorrect(newCorrect)
    setLives(newLives)
    setSessionXP(newXP)

    const nextIndex = questionIndex + 1
    const isLastQuestion = nextIndex >= sessionQuestions.length
    const outOfLives = newLives <= 0

    if (isLastQuestion || outOfLives) {
      const stars = calcStars(newCorrect, sessionQuestions.length)
      const xp = calcXP(newCorrect, sessionQuestions.length)
      setFinalStars(stars)
      setFinalXP(xp)
      updateTopicProgress(selectedSubject.id, selectedTopic.id, stars, xp)
      setView(VIEWS.RESULT)
    } else {
      setQuestionIndex(nextIndex)
    }
  }

  function handleAddExam(e) {
    e.preventDefault()
    if (!examForm.date) return
    if (editingExamId) {
      updateExam(editingExamId, examForm)
      setEditingExamId(null)
    } else {
      addExam(examForm)
    }
    setExamForm({ subject: 'matematica', type: 'prova', weight: '', date: '', time: '', content: '', notes: '' })
  }

  function startEditExam(exam) {
    setExamForm({
      subject: exam.subject,
      type: exam.type || 'prova',
      date: exam.date,
      time: exam.time || '',
      content: exam.content || '',
      notes: exam.notes || '',
    })
    setEditingExamId(exam.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function formatDate(dateStr) {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  function daysUntil(dateStr) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const d = new Date(dateStr)
    return Math.ceil((d - today) / (1000 * 60 * 60 * 24))
  }

  // HOME
  if (view === VIEWS.HOME) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onCalendarClick={() => setView(VIEWS.CALENDAR)} />
        <main className="max-w-lg mx-auto px-4 py-5 space-y-4">
          {/* Mascote / Boas-vindas */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-4xl">🐥</span>
            <p className="text-sm font-medium text-yellow-800">
              Olá! Vamos estudar hoje? Escolha uma matéria! 📚
            </p>
          </div>

          {/* Lembretes de provas */}
          {upcomingExams.length > 0 && (
            <div className="space-y-2">
              {upcomingExams.slice(0, 2).map(exam => {
                const days = daysUntil(exam.date)
                const subj = SUBJECTS.find(s => s.id === exam.subject)
                return (
                  <div key={exam.id} className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <p className="text-sm font-medium text-blue-800 flex-1">
                      {EXAM_TYPES.find(t => t.id === exam.type)?.label || 'Prova'} de {subj?.name || exam.subject} em {days === 0 ? 'hoje!' : `${days} dia${days > 1 ? 's' : ''}!`} Vamos estudar? 🐥
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Grid de matérias */}
          <h2 className="font-bold text-gray-700 text-base">Matérias</h2>
          <div className="grid grid-cols-1 gap-3">
            {SUBJECTS.map(subject => {
              const progress = getSubjectProgress(subject.id, subject.topics.length || 1)
              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  progress={progress}
                  onClick={() => {
                    setSelectedSubject(subject)
                    setView(VIEWS.SUBJECT)
                  }}
                />
              )
            })}
          </div>
        </main>
      </div>
    )
  }

  // SUBJECT — lista de tópicos
  if (view === VIEWS.SUBJECT) {
    const subject = selectedSubject
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView(VIEWS.HOME)} className="text-2xl">‹</button>
          <span className="text-2xl">{subject.icon}</span>
          <h1 className="font-bold text-gray-800 text-lg">{subject.name}</h1>
        </div>
        <main className="max-w-lg mx-auto px-4 py-5 space-y-3">
          {subject.topics.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <span className="text-5xl">🐥</span>
              <p className="text-gray-500">Conteúdo em breve! Estamos preparando as questões.</p>
            </div>
          ) : (
            subject.topics.map(topic => {
              const tp = getTopicProgress(subject.id, topic.id)
              return (
                <button
                  key={topic.id}
                  onClick={() => startSession(subject, topic)}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-95 transition-all hover:shadow-md text-left"
                >
                  <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center`}>
                    {tp.completed ? (
                      <span className="text-lg">
                        {tp.stars === 3 ? '⭐' : tp.stars === 2 ? '🌟' : '✅'}
                      </span>
                    ) : (
                      <span className="text-white font-bold text-sm">{topic.id.split('-')[1]}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{topic.title}</p>
                    <p className="text-xs text-gray-400">{topic.questions.length} questões</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(s => (
                      <span key={s} className={s <= tp.stars ? 'text-yellow-400' : 'text-gray-200'}>⭐</span>
                    ))}
                  </div>
                </button>
              )
            })
          )}
        </main>
      </div>
    )
  }

  // SESSION — exercícios
  if (view === VIEWS.SESSION) {
    const question = sessionQuestions[questionIndex]
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView(VIEWS.SUBJECT)} className="text-2xl">✕</button>
          <span className="text-base font-semibold text-gray-700 flex-1">{selectedTopic.title}</span>
        </div>
        <main className="max-w-lg mx-auto px-4 py-5">
          <ExerciseCard
            question={question}
            current={questionIndex + 1}
            total={sessionQuestions.length}
            lives={lives}
            xp={sessionXP}
            onAnswer={handleAnswer}
          />
        </main>
      </div>
    )
  }

  // RESULT
  if (view === VIEWS.RESULT) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3">
          <h1 className="font-bold text-gray-800 text-center">Resultado</h1>
        </div>
        <main className="max-w-lg mx-auto">
          <ResultScreen
            stars={finalStars}
            xp={finalXP}
            correct={correct}
            total={sessionQuestions.length}
            onContinue={() => setView(VIEWS.SUBJECT)}
            onHome={() => setView(VIEWS.HOME)}
          />
        </main>
      </div>
    )
  }

  // CALENDAR — calendário de provas
  if (view === VIEWS.CALENDAR) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView(VIEWS.HOME)} className="text-2xl">‹</button>
          <span className="text-xl">📅</span>
          <h1 className="font-bold text-gray-800 text-lg">Calendário de Provas</h1>
        </div>
        <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
          {/* Formulário de cadastro */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-3">{editingExamId ? 'Editar Atividade' : 'Adicionar Atividade'}</h2>
            <form onSubmit={handleAddExam} className="space-y-3">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Matéria</label>
                <select
                  value={examForm.subject}
                  onChange={e => setExamForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-3 text-base bg-white"
                >
                  {SUBJECTS.map(s => (
                    <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Tipo</label>
                  <select
                    value={examForm.type}
                    onChange={e => setExamForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl p-3 text-base bg-white"
                  >
                    {EXAM_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Peso</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="10"
                    placeholder="Ex: 2,0"
                    value={examForm.weight}
                    onChange={e => setExamForm(f => ({ ...f, weight: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl p-3 text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={examForm.date}
                    onChange={e => setExamForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl p-3 text-base"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Hora (opcional)</label>
                  <input
                    type="time"
                    value={examForm.time}
                    onChange={e => setExamForm(f => ({ ...f, time: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl p-3 text-base"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">O que vai cair (opcional)</label>
                <textarea
                  placeholder="Ex: Frações, medidas de comprimento, capítulos 4 e 5"
                  value={examForm.content}
                  onChange={e => setExamForm(f => ({ ...f, content: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl p-3 text-base resize-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Observações (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Trazer régua e compasso"
                  value={examForm.notes}
                  onChange={e => setExamForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-3 text-base"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-xl active:scale-95 transition-all hover:bg-blue-600"
                >
                  {editingExamId ? 'Salvar alterações ✏️' : 'Adicionar 📅'}
                </button>
                {editingExamId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingExamId(null)
                      setExamForm({ subject: 'matematica', type: 'prova', weight: '', date: '', time: '', content: '', notes: '' })
                    }}
                    className="px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista de provas */}
          <div>
            <h2 className="font-bold text-gray-700 mb-3">Suas Provas</h2>
            {exams.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <span className="text-4xl">🐥</span>
                <p className="text-gray-400 text-sm">Nenhuma prova cadastrada ainda!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...exams]
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map(exam => {
                    const subj = SUBJECTS.find(s => s.id === exam.subject)
                    const days = daysUntil(exam.date)
                    return (
                      <div key={exam.id} className={`bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-3 ${days <= 1 ? 'border-red-200' : days <= 3 ? 'border-yellow-200' : 'border-gray-100'}`}>
                        <div className={`w-10 h-10 ${subj?.color || 'bg-gray-400'} rounded-xl flex items-center justify-center text-xl`}>
                          {subj?.icon || '📚'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-gray-800">{subj?.name || exam.subject}</p>
                            {exam.type && (() => {
                              const et = EXAM_TYPES.find(t => t.id === exam.type)
                              return et ? (
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${et.badge}`}>{et.label}</span>
                              ) : null
                            })()}
                            {exam.weight && (
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                Peso {exam.weight}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatDate(exam.date)}{exam.time ? ` às ${exam.time}` : ''}
                            {days === 0 ? ' — hoje!' : days > 0 ? ` — em ${days} dia${days > 1 ? 's' : ''}` : ' — passou'}
                          </p>
                          {exam.content && <p className="text-xs text-gray-500 mt-0.5">{exam.content}</p>}
                          {exam.notes && <p className="text-xs text-gray-400 mt-0.5">📌 {exam.notes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditExam(exam)}
                            className="text-gray-300 hover:text-blue-400 text-lg transition-colors"
                            aria-label="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => removeExam(exam.id)}
                            className="text-gray-300 hover:text-red-400 text-xl transition-colors"
                            aria-label="Remover"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  return null
}
