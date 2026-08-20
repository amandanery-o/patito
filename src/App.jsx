import { lazy, Suspense, useState } from 'react'
import Header from './components/Header'
import Onboarding from './components/Onboarding'
import LoginScreen from './components/LoginScreen'
import { useAuth } from './contexts/AuthContext'
import SubjectCard from './components/SubjectCard'
import ExerciseCard from './components/ExerciseCard'
import ResultScreen from './components/ResultScreen'
import CalendarIcon from './components/CalendarIcon'
import Mascot from './components/Mascot'
import BottomNav from './components/BottomNav'
import TopicTrail from './components/TopicTrail'
import HomeworkView from './components/HomeworkView'
import { useProgress } from './hooks/useProgress'
import { useStudySession } from './hooks/useStudySession'
import { useHomework } from './hooks/useHomework'
import { upcomingSchoolEvents, useSchoolEvents } from './hooks/useSchoolEvents'
import { useReports } from './hooks/useReports'
import { shuffle } from './utils/shuffle'
import { daysUntil, formatDate, parseLocalDate } from './utils/dates'
import { SCHEDULE, SUBJECT_COLORS, DAY_NAMES } from './data/schedule'
import {
  EXAM_TYPES, STUDY_SUBJECTS, SUBJECTS, VIEWS,
  examAlertText, getMascotState,
} from './data/appConfig'

const Leaderboard = lazy(() => import('./components/Leaderboard'))
const CalendarMonth = lazy(() => import('./components/CalendarMonth'))
const ScheduleView = lazy(() => import('./components/ScheduleView'))

function ViewLoader({ children }) {
  return (
    <Suspense fallback={(
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )}>
      {children}
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function App() {
  const { session, profile, updateProfileName, signOut } = useAuth()

  // Supabase ativo e ainda carregando sessão → spinner
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (session && profile === undefined) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Supabase ativo mas não logado → tela de login
  if (session === null && typeof window !== 'undefined' &&
      import.meta.env.VITE_SUPABASE_URL) {
    return <LoginScreen />
  }

  return (
    <AppInner
      key={session?.user?.id || 'offline'}
      updateProfileName={updateProfileName}
      signOut={signOut}
      session={session}
      profile={profile}
    />
  )
}

function AppInner({ updateProfileName, signOut, session, profile }) {
  const [view, setView]                     = useState(VIEWS.HOME)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTopic, setSelectedTopic]   = useState(null)
  const [sessionQuestions, setSessionQuestions] = useState([])
  const [questionIndex, setQuestionIndex]   = useState(0)
  const [correct, setCorrect]               = useState(0)
  const [incorrectQuestions, setIncorrectQuestions] = useState([])
  const [calendarView, setCalendarView]     = useState('month')

  const {
    user,
    updateTopicProgress, getTopicProgress, getSubjectProgress,
    setUserName,
  } = useProgress({ userId: session?.user?.id, profile })

  const schoolEvents = useSchoolEvents(Boolean(session?.user?.id))
  const exams = schoolEvents.events
  const upcomingExams = upcomingSchoolEvents(exams, 7)

  const { reports, addReport, clearReports } = useReports(session?.user?.id)
  const [showReports, setShowReports] = useState(false)
  const {
    session: studySession,
    startOrResume,
    saveAnswer: saveStudyAnswer,
    complete: completeStudySession,
  } = useStudySession()
  const homework = useHomework(session?.user?.id)

  // -------------------------------------------------------------------------
  // Handlers de sessão
  // -------------------------------------------------------------------------

  async function startSession(subject, topic) {
    setSelectedSubject(subject)
    setSelectedTopic(topic)
    const selectedQuestions = shuffle(topic.questions).slice(0, 30)

    if (session?.user?.id) {
      try {
        const resumed = await startOrResume({
          userId: session.user.id,
          subjectId: subject.id,
          contentId: topic.id,
          questionIds: selectedQuestions.map(question => question.id),
        })
        const questionsById = new Map(topic.questions.map(question => [question.id, question]))
        const orderedQuestions = resumed.session.question_ids.map(id => questionsById.get(id)).filter(Boolean)
        setSessionQuestions(orderedQuestions)
        setQuestionIndex(Math.min(resumed.session.current_index, Math.max(orderedQuestions.length - 1, 0)))
        setCorrect(resumed.answers.filter(answer => answer.is_correct).length)
        setIncorrectQuestions(resumed.answers
          .filter(answer => !answer.is_correct)
          .map(answer => questionsById.get(answer.question_id))
          .filter(Boolean))
        setView(resumed.session.status === 'review' ? VIEWS.RESULT : VIEWS.SESSION)
        return
      } catch {
        // O aluno autenticado não deve iniciar uma sessão que não possa ser salva.
        setView(VIEWS.SUBJECT)
        return
      }
    }

    setSessionQuestions(selectedQuestions)
    setQuestionIndex(0)
    setCorrect(0)
    setIncorrectQuestions([])
    setView(VIEWS.SESSION)
  }

  async function handleAnswer({ isCorrect, answer }) {
    const question = sessionQuestions[questionIndex]
    if (session?.user?.id) {
      await saveStudyAnswer({
        answerId: crypto.randomUUID(),
        questionId: question.id,
        answer,
        isCorrect,
      })
    }
    const newCorrect = isCorrect ? correct + 1 : correct
    setCorrect(newCorrect)
    if (!isCorrect) setIncorrectQuestions(previous => [...previous, question])

    const nextIndex      = questionIndex + 1
    const isLastQuestion = nextIndex >= sessionQuestions.length
    if (isLastQuestion) {
      updateTopicProgress(selectedSubject.id, selectedTopic.id)
      setView(VIEWS.RESULT)
    } else {
      setQuestionIndex(nextIndex)
    }
  }

  async function finishResult(destination) {
    if (session?.user?.id && studySession?.status === 'review') {
      await completeStudySession()
    }
    setView(destination)
  }

  // -------------------------------------------------------------------------
  // VIEW: LEADERBOARD
  // -------------------------------------------------------------------------

  if (view === VIEWS.LEADERBOARD) {
    return <ViewLoader><Leaderboard onBack={() => setView(VIEWS.HOME)} /></ViewLoader>
  }

  if (view === VIEWS.HOMEWORK) {
    return (
      <>
        <HomeworkView
          items={homework.items}
          loading={homework.loading}
          saving={homework.saving}
          error={homework.error}
          onCreate={homework.createHomework}
          onUpdate={homework.updateHomework}
          onRemove={homework.removeHomework}
          onBack={() => setView(VIEWS.HOME)}
        />
        <BottomNav
          activeView="homework"
          onHome={() => setView(VIEWS.HOME)}
          onHomework={() => setView(VIEWS.HOMEWORK)}
          onSchedule={() => setView(VIEWS.SCHEDULE)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
          onLeaderboard={() => setView(VIEWS.LEADERBOARD)}
        />
      </>
    )
  }

  // -------------------------------------------------------------------------
  // ONBOARDING — primeira vez (nome ainda é o padrão)
  // -------------------------------------------------------------------------

  if (user.name === 'Estudante') {
    return <Onboarding onComplete={(name) => {
      setUserName(name)
      updateProfileName?.(name)
    }} />
  }

  // -------------------------------------------------------------------------
  // VIEW: HOME
  // -------------------------------------------------------------------------

  if (view === VIEWS.HOME) {
    const { mood, message } = getMascotState(user.name, upcomingExams.length)
    const TODAY_MS = Date.now()
    const NEW_THRESHOLD_DAYS = 7
    const hasQuestions = s => s.topics.some(t => t.questions.length > 0)
    const isNew = s => s.lastUpdated &&
      (TODAY_MS - parseLocalDate(s.lastUpdated).getTime()) / 86400000 <= NEW_THRESHOLD_DAYS

    const subjectsWithContent = STUDY_SUBJECTS
      .filter(hasQuestions)
      .sort((a, b) => {
        if (a.lastUpdated && b.lastUpdated) return parseLocalDate(b.lastUpdated) - parseLocalDate(a.lastUpdated)
        if (a.lastUpdated) return -1
        if (b.lastUpdated) return 1
        return 0
      })
    const subjectsComingSoon  = STUDY_SUBJECTS.filter(s => !hasQuestions(s))

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header
          user={user}
          onCalendarClick={() => setView(VIEWS.CALENDAR)}
          onSignOut={session ? signOut : null}
        />
        {reports.length > 0 && (
          <button
            onClick={() => setShowReports(true)}
            className="mx-auto flex items-center gap-2 bg-orange-100 border border-orange-300 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mt-2 block"
          >
            🚩 {reports.length} erro{reports.length > 1 ? 's' : ''} reportado{reports.length > 1 ? 's' : ''}
          </button>
        )}

        <main className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-5 sm:py-8 space-y-5 sm:space-y-6">

          {/* Boas-vindas — mascote hero proporcional à tela */}
          <div className="bg-yellow-50 shadow-sm rounded-3xl px-4 sm:px-8 pt-4 sm:pt-6 pb-5 sm:pb-7 flex flex-col items-center text-center gap-1">
            <Mascot mood={mood} size="hero" className="my-2" />
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-yellow-900 leading-snug mt-2">{message}</p>
          </div>

          {/* Aulas de hoje */}
          {(() => {
            const todayDay = new Date().getDay()
            const todayLessons = SCHEDULE[todayDay] || []
            const isWeekend = todayDay === 0 || todayDay === 6
            return (
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <p className="font-extrabold text-gray-700 text-sm uppercase tracking-wide mb-3">
                  {isWeekend ? 'Sem aulas hoje' : `Aulas de ${DAY_NAMES[todayDay]}`}
                </p>
                {isWeekend ? (
                  <p className="text-sm text-gray-400 font-semibold">Aproveite para estudar! 🐥</p>
                ) : (
                  <>
                    <div className="flex gap-2">
                      {todayLessons.map((lesson, i) => {
                        const colorKey = lesson.subject.split('/')[0]
                        const colors = SUBJECT_COLORS[colorKey] || SUBJECT_COLORS[lesson.subject] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                        const SHORT_NAMES = {
                          'Língua Portuguesa':   'Português',
                          'Língua Inglesa':      'Inglês',
                          'Educação Física':     'Ed. Física',
                          'Ensino Religioso':    'Religioso',
                          'Robótica/Matemática': 'Robótica',
                        }
                        const shortName = SHORT_NAMES[lesson.subject] || lesson.subject
                        return (
                          <div key={i} className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-0.5 ${colors.bg}`}>
                            <span className={`text-[10px] sm:text-xs font-extrabold ${colors.text}`}>{lesson.time}</span>
                            <span className={`text-[11px] sm:text-xs font-bold text-center leading-tight ${colors.text}`}>{shortName}</span>
                            {lesson.quinzenal && <span className="text-[9px] text-gray-400 font-bold">quinz.</span>}
                          </div>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => setView(VIEWS.SCHEDULE)}
                      className="mt-3 text-xs font-bold text-blue-500 hover:text-blue-700 w-full text-right"
                    >
                      Ver semana completa →
                    </button>
                  </>
                )}
              </div>
            )
          })()}

          {/* Alertas de provas */}
          {upcomingExams.length > 0 && (
            <div className="space-y-2">
              {upcomingExams.slice(0, 3).map(exam => {
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
                    <CalendarIcon size="sm" date={exam.endDate || exam.date} />
                    <p className="text-sm font-bold text-blue-800 flex-1">
                      {examAlertText(exam, subj?.name || exam.subject, days)}
                    </p>
                    {canStudy && <span className="text-blue-400 text-xl font-bold">›</span>}
                  </button>
                )
              })}
            </div>
          )}

          {/* Matérias com conteúdo */}
          {subjectsWithContent.length > 0 && (
            <div className="space-y-3">
              {subjectsWithContent.map(subject => {
                const progress = getSubjectProgress(subject.id, subject.topics.length)
                return (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    progress={progress}
                    isNew={isNew(subject)}
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
          onHomework={() => setView(VIEWS.HOMEWORK)}
          onSchedule={() => setView(VIEWS.SCHEDULE)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
          onLeaderboard={() => setView(VIEWS.LEADERBOARD)}
        />

        {showReports && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
                <h2 className="font-extrabold text-gray-800 text-lg">🚩 Erros reportados</h2>
                <button onClick={() => setShowReports(false)} className="text-gray-400 text-2xl leading-none">✕</button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-3">
                {reports.map(r => (
                  <div key={r.questionId} className="bg-orange-50 border border-orange-200 rounded-2xl p-3">
                    <p className="text-xs font-bold text-orange-500 uppercase tracking-wide">{r.subjectName} · {r.topicTitle}</p>
                    <p className="text-sm text-gray-700 mt-1">{r.question}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: {r.questionId}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => { clearReports(); setShowReports(false) }}
                  className="w-full py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold text-sm"
                >
                  Limpar todos
                </button>
              </div>
            </div>
          </div>
        )}
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
        <div className={`${subject.color} px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sticky top-0 z-10`}>
          <button onClick={() => setView(VIEWS.HOME)} className="text-white text-2xl sm:text-3xl font-bold" aria-label="Voltar">‹</button>
          <span className="text-2xl sm:text-3xl">{subject.icon}</span>
          <h1 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl flex-1">{subject.name}</h1>
        </div>

        <main className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-6">
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
        <main className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-8 md:px-10 py-5 sm:py-8 pb-40">
          <ExerciseCard
            question={question}
            current={questionIndex + 1}
            total={sessionQuestions.length}
            onAnswer={handleAnswer}
            onReport={() => addReport({
              questionId: question.id,
              question: question.question,
              subjectName: selectedSubject.name,
              topicTitle: selectedTopic.title,
            })}
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
        <main className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
          <ResultScreen
            correct={correct}
            total={sessionQuestions.length}
            incorrectQuestions={incorrectQuestions}
            onContinue={() => finishResult(VIEWS.SUBJECT)}
            onHome={() => finishResult(VIEWS.HOME)}
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
            <h1 className="font-bold text-gray-800 text-lg flex-1">Calendário escolar</h1>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Oficial</span>
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

        <main className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 py-5 space-y-5">
          {/* Visão mensal */}
          {calendarView === 'month' && (
            <ViewLoader><CalendarMonth
              exams={exams}
              subjects={SUBJECTS}
              examTypes={EXAM_TYPES}
            /></ViewLoader>
          )}

          {/* Visão de lista */}
          {calendarView === 'list' && (
            <div>
              <h2 className="font-bold text-gray-700 mb-3">Datas da turma</h2>
              {schoolEvents.error && <p className="bg-red-50 text-red-700 rounded-xl p-3 text-sm font-bold mb-3">{schoolEvents.error}</p>}
              {schoolEvents.loading ? (
                <p className="text-center py-10 text-gray-400 font-semibold">Carregando calendário…</p>
              ) : exams.length === 0 ? (
                <div className="text-center py-10 space-y-2 flex flex-col items-center">
                  <Mascot mood="neutro" size="md" />
                  <p className="text-gray-400 text-sm">Nenhuma data oficial publicada ainda.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...exams]
                    .sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date))
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
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          )}
        </main>

        <BottomNav
          activeView="calendar"
          onHome={() => setView(VIEWS.HOME)}
          onHomework={() => setView(VIEWS.HOMEWORK)}
          onSchedule={() => setView(VIEWS.SCHEDULE)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
          onLeaderboard={() => setView(VIEWS.LEADERBOARD)}
        />
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // VIEW: SCHEDULE — grade semanal de aulas
  // -------------------------------------------------------------------------

  if (view === VIEWS.SCHEDULE) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setView(VIEWS.HOME)} className="text-2xl" aria-label="Voltar">‹</button>
          <h1 className="font-bold text-gray-800 text-lg">Horário da Turma 43</h1>
        </div>
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto pt-5 sm:pt-8">
          <p className="px-4 sm:px-6 text-xs text-gray-400 font-semibold mb-3">
            Turno da tarde · 13h30 às 18h00 · *Robótica é quinzenal nas quartas
          </p>
          <ViewLoader><ScheduleView /></ViewLoader>
        </div>
        <BottomNav
          activeView="schedule"
          onHome={() => setView(VIEWS.HOME)}
          onHomework={() => setView(VIEWS.HOMEWORK)}
          onSchedule={() => setView(VIEWS.SCHEDULE)}
          onCalendar={() => setView(VIEWS.CALENDAR)}
          onLeaderboard={() => setView(VIEWS.LEADERBOARD)}
        />
      </div>
    )
  }

  return null
}
