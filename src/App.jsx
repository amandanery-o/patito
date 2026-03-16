import { useState, useCallback } from 'react'
import Header from './components/Header'
import SubjectCard from './components/SubjectCard'
import ExerciseCard from './components/ExerciseCard'
import ResultScreen from './components/ResultScreen'
import TrophyModal from './components/TrophyModal'
import ProgressBar from './components/ProgressBar'
import { useProgress } from './hooks/useProgress'
import { useStreak } from './hooks/useStreak'
import { useXP } from './hooks/useXP'
import { calculateStars, calculateXP, getEncouragementMessage } from './utils/scoring'
import { shuffle } from './utils/shuffle'

// Data imports
import { subject as portugues } from './data/portugues'
import { subject as matematica } from './data/matematica'
import { subject as geografia } from './data/geografia'
import { subject as ingles } from './data/ingles'
import { subject as ciencias } from './data/ciencias'
import { subject as historia } from './data/historia'
import { subject as ensinoReligioso } from './data/ensino-religioso'

const SUBJECTS = [portugues, matematica, geografia, ingles, ciencias, historia, ensinoReligioso]

const colorConfig = {
  blue: { header: 'bg-blue-500', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', btn: 'bg-blue-500 hover:bg-blue-600' },
  green: { header: 'bg-green-500', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', btn: 'bg-green-500 hover:bg-green-600' },
  orange: { header: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', btn: 'bg-orange-500 hover:bg-orange-600' },
  purple: { header: 'bg-purple-500', light: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', btn: 'bg-purple-500 hover:bg-purple-600' },
  cyan: { header: 'bg-cyan-500', light: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', btn: 'bg-cyan-500 hover:bg-cyan-600' },
  amber: { header: 'bg-amber-600', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' },
  yellow: { header: 'bg-yellow-400', light: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', btn: 'bg-yellow-400 hover:bg-yellow-500' },
}

// ========================
// Home Screen
// ========================
function HomeScreen({ onSubjectSelect, progress, xpData, streak, trophyList }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-5 mb-6 text-white shadow-md">
          <h1 className="text-2xl font-bold mb-1">Olá, vamos estudar! 📚</h1>
          <p className="text-blue-100 text-sm">Escolha uma matéria para começar</p>
        </div>

        {/* Subject grid */}
        <h2 className="text-lg font-bold text-gray-700 mb-3">Matérias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUBJECTS.map(subject => {
            const pct = progress.getSubjectProgress(subject.id, subject.topics)
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={pct}
                onClick={() => onSubjectSelect(subject)}
              />
            )
          })}
        </div>

        {/* Trophies section if any */}
        {xpData.trophies?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3">Meus Troféus 🏆</h2>
            <div className="flex flex-wrap gap-2">
              {xpData.trophies.map(trophyId => {
                const trophy = trophyList?.find(t => t.id === trophyId)
                if (!trophy) return null
                return (
                  <div key={trophyId} className="bg-white border border-yellow-200 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span>{trophy.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{trophy.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ========================
// Subject Screen
// ========================
function SubjectScreen({ subject, onBack, onStartTopic, progress }) {
  const colors = colorConfig[subject.color] || colorConfig.blue

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Subject header */}
      <div className={`${colors.header} text-white px-4 pt-4 pb-6 shadow-md`}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white text-opacity-80 hover:text-opacity-100 mb-3 text-sm font-medium"
          >
            ← Voltar
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-white text-opacity-80 text-sm">
                {subject.topics?.length} tópicos disponíveis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics list */}
      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-3">
        {subject.topics?.map((topic, index) => {
          const topicProg = progress.getTopicProgress(subject.id, topic.id)
          const isLocked = index > 0 && !progress.getTopicProgress(subject.id, subject.topics[index - 1].id).completed

          return (
            <div
              key={topic.id}
              className={`bg-white rounded-2xl p-4 border-2 ${isLocked ? 'border-gray-100 opacity-60' : `${colors.border}`} shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-500">Tópico {index + 1}</span>
                    {isLocked && <span className="text-gray-400 text-sm">🔒</span>}
                  </div>
                  <h3 className="font-bold text-gray-800 text-base">{topic.title}</h3>
                  <p className="text-gray-500 text-sm">{topic.questions?.length} questões</p>

                  {/* Stars */}
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map(n => (
                      <span key={n} className={`text-lg ${topicProg.stars >= n ? 'text-yellow-400' : 'text-gray-200'}`}>⭐</span>
                    ))}
                  </div>
                </div>

                {!isLocked && (
                  <button
                    onClick={() => onStartTopic(topic)}
                    className={`${colors.btn} text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-95`}
                    style={{ minHeight: '44px' }}
                  >
                    {topicProg.completed ? 'Repetir' : 'Começar'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ========================
// Exercise Screen
// ========================
function ExerciseScreen({ subject, topic, onComplete, onBack }) {
  const [questions] = useState(() => shuffle([...topic.questions]))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [lives, setLives] = useState(3)
  const [sessionXP, setSessionXP] = useState(0)

  const colors = colorConfig[subject.color] || colorConfig.blue
  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const correctCount = answers.filter(Boolean).length

  function handleAnswer(isCorrect) {
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setSessionXP(prev => prev + 10)
    } else {
      setLives(prev => Math.max(0, prev - 1))
    }

    const nextIndex = currentIndex + 1
    if (nextIndex >= totalQuestions || (!isCorrect && lives <= 1)) {
      // Session complete
      const finalCorrect = newAnswers.filter(Boolean).length
      const finalTotal = newAnswers.length
      setTimeout(() => onComplete(finalCorrect, finalTotal, newAnswers), 500)
    } else {
      setCurrentIndex(nextIndex)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Exercise header */}
      <div className={`${colors.header} text-white px-4 pt-3 pb-4`}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="text-white text-opacity-80 hover:text-opacity-100 text-sm font-medium">
              ✕
            </button>
            <span className="text-sm font-medium">{topic.title}</span>
            {/* Session XP */}
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-bold">
              ⭐ {sessionXP} XP
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <ProgressBar value={currentIndex} max={totalQuestions} color="white" height="h-2" />
          </div>

          <div className="flex items-center justify-between text-white text-opacity-80 text-xs">
            <span>{currentIndex + 1}/{totalQuestions}</span>
            {/* Lives */}
            <div className="flex gap-1">
              {[1, 2, 3].map(n => (
                <span key={n} className={`text-lg ${lives >= n ? '' : 'opacity-20'}`}>❤️</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exercise content */}
      <div className="max-w-2xl mx-auto px-4 pt-5">
        {currentQuestion && (
          <ExerciseCard
            key={`${topic.id}-${currentIndex}`}
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  )
}

// ========================
// Main App
// ========================
export default function App() {
  const [screen, setScreen] = useState('home') // 'home' | 'subject' | 'exercise' | 'result'
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [resultData, setResultData] = useState(null)
  const [newTrophies, setNewTrophies] = useState([])

  const progress = useProgress()
  const { streak, recordStudy } = useStreak()
  const { xpData, addXP, calculateSessionXP, TROPHIES } = useXP()

  function handleSubjectSelect(subject) {
    setSelectedSubject(subject)
    setScreen('subject')
  }

  function handleStartTopic(topic) {
    setSelectedTopic(topic)
    setScreen('exercise')
  }

  function handleExerciseComplete(correctAnswers, totalQuestions) {
    const stars = calculateStars(correctAnswers, totalQuestions)
    const { total: xpEarned, isPerfect } = calculateXP(correctAnswers, totalQuestions)
    const message = getEncouragementMessage(correctAnswers, totalQuestions)

    // Update progress
    progress.updateTopicProgress(selectedSubject.id, selectedTopic.id, {
      stars,
      score: correctAnswers,
      total: totalQuestions
    })

    // Record streak
    recordStudy()

    // Add XP and check for trophies
    const earned = addXP(xpEarned, {
      isPerfect,
      streak: streak.current + 1,
      subjectsWithCompletion: Object.keys(xpData).length,
      totalTopicsCompleted: Object.values(progress.progress).reduce((acc, s) => {
        return acc + Object.values(s).filter(t => t.completed).length
      }, 0)
    })

    if (earned && earned.length > 0) {
      setNewTrophies(earned)
    }

    setResultData({ stars, xpEarned, message, correctAnswers, totalQuestions })
    setScreen('result')
  }

  function handleContinue() {
    // Go to next topic in same subject
    if (selectedSubject && selectedTopic) {
      const topicIndex = selectedSubject.topics.findIndex(t => t.id === selectedTopic.id)
      if (topicIndex < selectedSubject.topics.length - 1) {
        const nextTopic = selectedSubject.topics[topicIndex + 1]
        setSelectedTopic(nextTopic)
        setScreen('exercise')
        return
      }
    }
    setScreen('subject')
  }

  function handleGoHome() {
    setScreen('home')
    setSelectedSubject(null)
    setSelectedTopic(null)
  }

  // Resolve trophy objects from IDs
  const resolvedTrophies = newTrophies.length > 0 ? newTrophies : []

  return (
    <>
      {/* Global header - only on home and subject screens */}
      {(screen === 'home' || screen === 'subject') && (
        <Header
          user={{ name: 'Estudante', avatar: '🦁' }}
          xp={xpData.totalXP}
          streak={streak}
        />
      )}

      {/* Screens */}
      {screen === 'home' && (
        <HomeScreen
          onSubjectSelect={handleSubjectSelect}
          progress={progress}
          xpData={xpData}
          streak={streak}
          trophyList={TROPHIES}
        />
      )}

      {screen === 'subject' && selectedSubject && (
        <SubjectScreen
          subject={selectedSubject}
          onBack={() => setScreen('home')}
          onStartTopic={handleStartTopic}
          progress={progress}
        />
      )}

      {screen === 'exercise' && selectedSubject && selectedTopic && (
        <ExerciseScreen
          subject={selectedSubject}
          topic={selectedTopic}
          onComplete={handleExerciseComplete}
          onBack={() => setScreen('subject')}
        />
      )}

      {screen === 'result' && resultData && (
        <ResultScreen
          stars={resultData.stars}
          xpEarned={resultData.xpEarned}
          message={resultData.message}
          correctAnswers={resultData.correctAnswers}
          totalQuestions={resultData.totalQuestions}
          onContinue={handleContinue}
          onHome={handleGoHome}
        />
      )}

      {/* Trophy modal */}
      {resolvedTrophies.length > 0 && (
        <TrophyModal
          trophies={resolvedTrophies}
          onClose={() => setNewTrophies([])}
        />
      )}
    </>
  )
}
