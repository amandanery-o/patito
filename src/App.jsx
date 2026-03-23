import { useState } from 'react'
import Header from './components/Header'
import Onboarding from './components/Onboarding'
import SubjectCard from './components/SubjectCard'
import ExerciseCard from './components/ExerciseCard'
import ResultScreen from './components/ResultScreen'
import CalendarMonth from './components/CalendarMonth'
import CalendarIcon from './components/CalendarIcon'
import Mascot from './components/Mascot'
import ConfirmModal from './components/ConfirmModal'
import BottomNav from './components/BottomNav'
import TopicTrail from './components/TopicTrail'
import { useProgress } from './hooks/useProgress'
import { shuffle } from './utils/shuffle'
import { calcStars, calcXP } from './utils/scoring'
import { daysUntil, formatDate } from './utils/dates'
import { matematica } from './data/matematica'

// ---------------------------------------------------------------------------
// Dados estáticos
// ---------------------------------------------------------------------------

const SUBJECTS = [
  { id: 'portugues',        name: 'Português',      icon: '📝', color: 'bg-blue-500',   topics: [],                calendarOnly: false },
  { id: 'matematica',       name: 'Matemática',     icon: '🔢', color: 'bg-green-500',  topics: matematica.topics, calendarOnly: false },
  { id: 'geografia',        name: 'Geografia',      icon: '🌍', color: 'bg-orange-500', topics: [],                calendarOnly: false },
  { id: 'ingles',           name: 'Inglês',         icon: '🇬🇧', color: 'bg-purple-500', topics: [],                calendarOnly: false },
  { id: 'ciencias',         name: 'Ciências',       icon: '🔬', color: 'bg-cyan-500',   topics: [],                calendarOnly: false },
  { id: 'historia',         name: 'História',       icon: '📜', color: 'bg-amber-700',  topics: [],                calendarOnly: false },
  { id: 'ensino-religioso', name: 'Ens. Religioso', icon: '✨', color: 'bg-yellow-500', topics: [],                calendarOnly: false },
  { id: 'educacao-fisica',  name: 'Educ. Física',   icon: '⚽', color: 'bg-red-500',    topics: [],                calendarOnly: true  },
  { id: 'arte',             name: 'Arte',           icon: '🎨', color: 'bg-pink-500',   topics: [],                calendarOnly: true  },
]

const EXAM_TYPES = [
  { id: 'trabalho',    label: 'Trabalho (T)', badge: 'bg-blue-100 text-blue-700'     },
  { id: 'prova',       label: 'Prova (P)',    badge: 'bg-green-100 text-green-700'   },
  { id: 'recuperacao', label: 'Recuperação',  badge: 'bg-orange-100 text-orange-700' },
]

const VIEWS = {
  HOME:     'home',
  SUBJECT:  'subject',
  SESSION:  'session',
  RESULT:   'result',
  CALENDAR: 'calendar',
  ADD_EXAM: 'add_exam',
}

const EMPTY_EXAM_FORM = {
  subject: 'matematica', type: 'prova', weight: '', date: '', time: '', content: '', notes: '',
}

// Matérias que aparecem no grid de estudo da home (exclui calendarOnly)
const STUDY_SUBJECTS = SUBJECTS.filter(s => !s.calendarOnly)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Gera o estado (mood + mensagem) do mascote na home. */
function getMascotState(userName, streak, upcomingCount) {
  if (streak > 0) {
    return {
      mood: 'feliz',
      message: `Dia ${streak} de sequência, ${userName}! Continue assim! 🔥`,
    }
  }
  if (upcomingCount > 0) {
    return {
      mood: 'neutro',
      message: `Oi, ${userName}! Bora se preparar para as provas? 💪`,
    }
  }
  return {
    mood: 'feliz',
    message: `Oi, ${userName}! Que matéria estudamos hoje? 📚`,
  }
}

/** Texto do alerta de prova/trabalho na home. */
function examAlertText(exam, subjName, days) {
  const typeLabel = EXAM_TYPES.find(t => t.id === exam.type)?.label || 'Prova'
  const daysText = days === 0 ? 'hoje!' : `em ${days} dia${days > 1 ? 's' : ''}!`

  if (exam.type === 'prova') {
    return `${typeLabel} de ${subjName} ${daysText} Bora revisar? 🐥`
  }
  return `${typeLabel} de ${subjName} ${daysText} Fique atento! 📌`
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function App() {
  const [view, setView]                     = useState(VIEWS.HOME)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTopic, setSelectedTopic]   = useState(null)
  const [sessionQuestions, setSessionQuestions] = useState([])
  const [questionIndex, setQuestionIndex]   = useState(0)
  const [correct, setCorrect]               = useState(0)
  const [lives, setLives]                   = useState(3)
  const [sessionXP, setSessionXP]           = useState(0)
  const [finalStars, setFinalStars]         = useState(0)
  const [finalXP, setFinalXP]               = useState(0)
  const [examForm, setExamForm]             = useState(EMPTY_EXAM_FORM)
  const [editingExamId, setEditingExamId]   = useState(null)
  const [calendarView, setCalendarView]     = useState('month')
  const [confirmExamId, setConfirmExamId]   = useState(null)

  const {
    user, exams,
    updateTopicProgress, getTopicProgress, getSubjectProgress,
    addExam, updateExam, removeExam, getUpcomingExams, setUserName,
  } = useProgress()

  const upcomingExams = getUpcomingExams(7)

  // -------------------------------------------------------------------------
  // Handlers de sessão
  // -------------------------------------------------------------------------

  function startSession(subject, topic) {
    setSelectedSubject(subject)
    setSelectedTopic(topic)
    setSessionQuestions(shuffle(topic.questions).slice(0, 10))
    setQuestionIndex(0)
    setCorrect(0)
    setLives(3)
    setSessionXP(0)
    setView(VIEWS.SESSION)
  }

  function handleAnswer(isCorrect) {
    const newCorrect = isCorrect ? correct + 1 : correct
    const newLives   = isCorrect ? lives : lives - 1
    const newXP      = isCorrect ? sessionXP + 10 : sessionXP

    setCorrect(newCorrect)
    setLives(newLives)
    setSessionXP(newXP)

    const nextIndex      = questionIndex + 1
    const isLastQuestion = nextIndex >= sessionQuestions.length
    const outOfLives     = newLives <= 0

    if (isLastQuestion || outOfLives) {
      const stars = calcStars(newCorrect, sessionQuestions.length)
      const xp    = calcXP(newCorrect, sessionQuestions.length)
      setFinalStars(stars)
      setFinalXP(xp)
      updateTopicProgress(selectedSubject.id, selectedTopic.id, stars, xp)
      setView(VIEWS.RESULT)
    } else {
      setQuestionIndex(nextIndex)
    }
  }

  // -------------------------------------------------------------------------
  // Handlers de exames
  // -------------------------------------------------------------------------

  function handleAddExam(e) {
    e.preventDefault()
    if (!examForm.date) return
    if (editingExamId) {
      updateExam(editingExamId, examForm)
      setEditingExamId(null)
    } else {
      addExam(examForm)
    }
    setExamForm(EMPTY_EXAM_FORM)
    setView(VIEWS.CALENDAR)
  }

  function startEditExam(exam) {
    setExamForm({
      subject: exam.subject,
      type:    exam.type    || 'prova',
      weight:  exam.weight  || '',
      date:    exam.date,
      time:    exam.time    || '',
      content: exam.content || '',
      notes:   exam.notes   || '',
    })
    setEditingExamId(exam.id)
    setView(VIEWS.ADD_EXAM)
  }

  function openAddExam() {
    setEditingExamId(null)
    setExamForm(EMPTY_EXAM_FORM)
    setView(VIEWS.ADD_EXAM)
  }

  function cancelAddExam() {
    setEditingExamId(null)
    setView(VIEWS.CALENDAR)
  }

  // -------------------------------------------------------------------------
  // ONBOARDING — primeira vez (nome ainda é o padrão)
  // -------------------------------------------------------------------------

  if (user.name === 'Estudante') {
    return <Onboarding onComplete={setUserName} />
  }

  // -------------------------------------------------------------------------
  // VIEW: HOME
  // -------------------------------------------------------------------------

  if (view === VIEWS.HOME) {
    const { mood, message } = getMascotState(user.name, user.streak.current, upcomingExams.length)
    const subjectsWithContent = STUDY_SUBJECTS.filter(s => s.topics.length > 0)
    const subjectsComingSoon  = STUDY_SUBJECTS.filter(s => s.topics.length === 0)
    const heroSubject = subjectsWithContent[0] || null

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header user={user} onCalendarClick={() => setView(VIEWS.CALENDAR)} />

        <main className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-8 space-y-5 sm:space-y-6">

          {/* Boas-vindas — mascote hero proporcional à tela */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-3xl px-4 sm:px-8 pt-4 sm:pt-6 pb-5 sm:pb-7 flex flex-col items-center text-center gap-1">
            <Mascot mood={mood} size="hero" className="scale-110 sm:scale-125 my-2" />
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-yellow-900 leading-snug mt-2">{message}</p>
            {user.streak.current > 0 && (
              <div className="flex items-center gap-1.5 bg-orange-100 rounded-full px-4 py-1.5 mt-1">
                <span className="text-xl leading-none">🔥</span>
                <span className="text-sm sm:text-base font-extrabold text-orange-600">{user.streak.current} dias seguidos</span>
              </div>
            )}
          </div>

          {/* Alertas de provas */}
          {upcomingExams.length > 0 && (
            <div className="space-y-2">
              {upcomingExams.slice(0, 2).map(exam => {
                const days     = daysUntil(exam.date)
                const subj     = SUBJECTS.find(s => s.id === exam.subject)
                const isProva  = exam.type === 'prova'
                const canStudy = isProva && subj && !subj.calendarOnly

                return (
                  <button
                    key={exam.id}
                    onClick={() => { if (!canStudy) return; setSelectedSubject(subj); setView(VIEWS.SUBJECT) }}
                    className={`w-full bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center gap-3 text-left transition-all
                      ${canStudy ? 'active:scale-95 hover:bg-blue-100 hover:border-blue-300' : 'cursor-default'}`}
                  >
                    <CalendarIcon size="sm" />
                    <p className="text-sm font-bold text-blue-800 flex-1">
                      {examAlertText(exam, subj?.name || exam.subject, days)}
                    </p>
                    {canStudy && <span className="text-blue-400 text-xl font-bold">›</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* Hero card — primeira matéria com conteúdo */}
          {heroSubject && (() => {
            const progress = getSubjectProgress(heroSubject.id, heroSubject.topics.length)
            const firstIncompleteTopic = heroSubject.topics.find(t => !getTopicProgress(heroSubject.id, t.id).completed)
              ?? heroSubject.topics[0]
            return (
              <div className={`${heroSubject.color} rounded-3xl px-5 sm:px-10 pt-6 sm:pt-10 pb-5 sm:pb-8 shadow-lg text-white`}>
                {/* Mascote centrado em destaque */}
                <div className="flex justify-center mb-3 sm:mb-5">
                  <Mascot mood="neutro" size="lg" />
                </div>
                <div className="text-center mb-3 sm:mb-5">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/70 mb-1">Estudar agora</p>
                  <p className="text-2xl sm:text-4xl font-extrabold">{heroSubject.name}</p>
                  {firstIncompleteTopic && (
                    <p className="text-sm sm:text-base text-white/80 mt-1">📖 {firstIncompleteTopic.title}</p>
                  )}
                </div>
                <div className="w-full h-3 sm:h-4 bg-white/30 rounded-full overflow-hidden mb-4 sm:mb-6">
                  <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress.percent}%` }} />
                </div>
                <button
                  onClick={() => { setSelectedSubject(heroSubject); setView(VIEWS.SUBJECT) }}
                  className="w-full bg-white text-gray-800 font-extrabold rounded-2xl py-3 sm:py-4 text-base sm:text-xl border-b-4 active:border-b-2 active:translate-y-0.5 transition-all select-none"
                  style={{ borderBottomColor: 'rgba(0,0,0,0.20)' }}
                >
                  Jogar agora 🎮
                </button>
              </div>
            )
          })()}

          {/* Outras matérias com conteúdo */}
          {subjectsWithContent.length > 1 && (
            <div className="space-y-3">
              <h2 className="font-extrabold text-gray-700 text-sm uppercase tracking-wide">Outras matérias</h2>
              {subjectsWithContent.slice(1).map(subject => {
                const progress = getSubjectProgress(subject.id, subject.topics.length)
                return (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    progress={progress}
                    onClick={() => { setSelectedSubject(subject); setView(VIEWS.SUBJECT) }}
                  />
                )
              })}
            </div>
          )}

          {/* Em breve — chips horizontais */}
          {subjectsComingSoon.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-extrabold text-gray-700 text-sm uppercase tracking-wide">Em breve</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                {subjectsComingSoon.map(s => (
                  <div key={s.id} className="subject-chip shrink-0">
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <BottomNav
          activeView="home"
          onHome={() => setView(VIEWS.HOME)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
        />
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // VIEW: SUBJECT — lista de tópicos
  // -------------------------------------------------------------------------

  if (view === VIEWS.SUBJECT) {
    const subject = selectedSubject
    return (
      <div className="min-h-screen bg-gray-50 pb-6">
        {/* Header colorido */}
        <div className={`${subject.color} px-4 py-4 flex items-center gap-3 sticky top-0 z-10`}>
          <button onClick={() => setView(VIEWS.HOME)} className="text-white text-2xl font-bold" aria-label="Voltar">‹</button>
          <span className="text-2xl">{subject.icon}</span>
          <h1 className="font-extrabold text-white text-lg flex-1">{subject.name}</h1>
        </div>

        <main className="max-w-lg mx-auto pt-6">
          {subject.topics.length === 0 ? (
            <div className="text-center py-16 space-y-3 flex flex-col items-center px-4">
              <Mascot mood="surpreso" size="lg" />
              <p className="text-gray-500 font-semibold">Conteúdo em breve! Estamos preparando as questões. 🐥</p>
            </div>
          ) : (
            <TopicTrail
              subject={subject}
              topics={subject.topics}
              getTopicProgress={getTopicProgress}
              onStart={(topic) => startSession(subject, topic)}
            />
          )}
        </main>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // VIEW: SESSION — exercícios
  // -------------------------------------------------------------------------

  if (view === VIEWS.SESSION) {
    const question = sessionQuestions[questionIndex]
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView(VIEWS.SUBJECT)} className="text-2xl" aria-label="Fechar sessão">✕</button>
          <span className="text-base font-semibold text-gray-700 flex-1">{selectedTopic.title}</span>
        </div>
        <main className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-8 py-5 sm:py-8 pb-40">
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

  // -------------------------------------------------------------------------
  // VIEW: RESULT
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // VIEW: CALENDAR — calendário de provas
  // -------------------------------------------------------------------------

  if (view === VIEWS.CALENDAR) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header compacto + tab bar em container sticky único */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center gap-3">
            <button onClick={() => setView(VIEWS.HOME)} className="text-2xl" aria-label="Voltar">‹</button>
            <CalendarIcon size="sm" />
            <h1 className="font-bold text-gray-800 text-lg flex-1">Provas</h1>
            <button
              onClick={openAddExam}
              className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center text-xl active:scale-95 transition-all"
              aria-label="Adicionar atividade"
            >
              +
            </button>
          </div>

          {/* Toggle Mês / Lista */}
          <div className="px-4 pb-2 border-t border-gray-50">
            <div className="flex bg-gray-100 rounded-xl p-0.5 text-sm font-semibold w-fit">
              <button
                onClick={() => setCalendarView('month')}
                className={`px-4 py-1.5 rounded-lg transition-all ${calendarView === 'month' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
              >
                Mês
              </button>
              <button
                onClick={() => setCalendarView('list')}
                className={`px-4 py-1.5 rounded-lg transition-all ${calendarView === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>

        <main className="max-w-lg mx-auto px-4 py-5 space-y-5">
          {/* Visão mensal */}
          {calendarView === 'month' && (
            <CalendarMonth
              exams={exams}
              subjects={SUBJECTS}
              examTypes={EXAM_TYPES}
              onEdit={startEditExam}
              onRemove={removeExam}
            />
          )}

          {/* Visão de lista */}
          {calendarView === 'list' && (
            <div>
              <h2 className="font-bold text-gray-700 mb-3">Suas Atividades</h2>
              {exams.length === 0 ? (
                <div className="text-center py-10 space-y-2 flex flex-col items-center">
                  <Mascot mood="neutro" size="md" />
                  <p className="text-gray-400 text-sm">Nenhuma atividade cadastrada ainda!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...exams]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(exam => {
                      const subj = SUBJECTS.find(s => s.id === exam.subject)
                      const days = daysUntil(exam.date)
                      const et   = EXAM_TYPES.find(t => t.id === exam.type)
                      return (
                        <div
                          key={exam.id}
                          className={`bg-white rounded-2xl p-4 shadow-sm border flex gap-3
                            ${days <= 1 ? 'border-red-200' : days <= 3 ? 'border-yellow-200' : 'border-gray-100'}`}
                        >
                          {/* Ícone da matéria */}
                          <div className={`w-10 h-10 shrink-0 ${subj?.color || 'bg-gray-400'} rounded-xl flex items-center justify-center text-xl`}>
                            {subj?.icon || '📚'}
                          </div>

                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-gray-800">{subj?.name || exam.subject}</p>
                              {et && (
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${et.badge}`}>
                                  {et.label}
                                </span>
                              )}
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

                          {/* Ações */}
                          <div className="flex gap-2 shrink-0 items-start">
                            <button
                              onClick={() => startEditExam(exam)}
                              className="text-gray-300 hover:text-blue-400 text-lg transition-colors"
                              aria-label="Editar"
                            >✏️</button>
                            <button
                              onClick={() => setConfirmExamId(exam.id)}
                              className="text-gray-300 hover:text-red-400 text-xl transition-colors"
                              aria-label="Remover"
                            >✕</button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Confirmação de remoção (lista) */}
        {confirmExamId && (
          <ConfirmModal
            message="Remover esta atividade do calendário?"
            onConfirm={() => { removeExam(confirmExamId); setConfirmExamId(null) }}
            onCancel={() => setConfirmExamId(null)}
          />
        )}

        <BottomNav
          activeView="calendar"
          onHome={() => setView(VIEWS.HOME)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
        />
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // VIEW: ADD_EXAM — adicionar / editar atividade
  // -------------------------------------------------------------------------

  if (view === VIEWS.ADD_EXAM) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={cancelAddExam} className="text-2xl" aria-label="Voltar">‹</button>
          <h1 className="font-bold text-gray-800 text-lg">
            {editingExamId ? 'Editar Atividade' : 'Nova Atividade'}
          </h1>
        </div>

        <main className="max-w-lg mx-auto px-4 py-5">
          <form onSubmit={handleAddExam} className="space-y-4">
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
                  placeholder="Ex: 2"
                  value={examForm.weight}
                  onChange={e => setExamForm(f => ({ ...f, weight: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-3 text-base"
                />
              </div>
            </div>

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

            <button type="submit" className="w-full btn-duo-blue">
              {editingExamId ? 'Salvar alterações ✏️' : 'Adicionar'}
            </button>
          </form>
        </main>
      </div>
    )
  }

  return null
}
