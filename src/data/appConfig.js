import { portugues } from './portugues'
import { matematica } from './matematica'
import { geografia } from './geografia'
import { historia } from './historia'
import { ciencias } from './ciencias'
import { ensinoReligioso } from './ensino-religioso'
import { ingles } from './ingles'
import { obict } from './obict'
import { obli } from './obli'
import { daysUntil } from '../utils/dates'

export const SUBJECTS = [
  { id: 'portugues', name: 'Português', icon: '📝', color: 'bg-blue-500', topics: portugues.topics, calendarOnly: false, lastUpdated: '2026-06-17' },
  { id: 'matematica', name: 'Matemática', icon: '🔢', color: 'bg-green-500', topics: matematica.topics, calendarOnly: false, lastUpdated: '2026-06-17' },
  { id: 'obict', name: 'Olimpíada Brasileira de Inovação, Ciência e Tecnologia (OBICT)', icon: '🚀', color: 'bg-violet-600', topics: obict.topics, calendarOnly: false, lastUpdated: null },
  { id: 'geografia', name: 'Geografia', icon: '🌍', color: 'bg-orange-500', topics: geografia.topics, calendarOnly: false, lastUpdated: null },
  { id: 'ingles', name: 'Inglês', icon: '🇬🇧', color: 'bg-purple-500', topics: ingles.topics, calendarOnly: false, lastUpdated: null },
  { id: 'obli', name: 'Olimpíada de Língua Inglesa (OBLI)', icon: '🏅', color: 'bg-blue-600', topics: obli.topics, calendarOnly: false, lastUpdated: null },
  { id: 'ciencias', name: 'Ciências', icon: '🔬', color: 'bg-cyan-500', topics: ciencias.topics, calendarOnly: false, lastUpdated: '2026-06-17' },
  { id: 'historia', name: 'História', icon: '📜', color: 'bg-amber-700', topics: historia.topics, calendarOnly: false, lastUpdated: null },
  { id: 'ensino-religioso', name: 'Ens. Religioso', icon: '✨', color: 'bg-yellow-500', topics: ensinoReligioso.topics, calendarOnly: false, lastUpdated: null },
  { id: 'educacao-fisica', name: 'Educ. Física', icon: '⚽', color: 'bg-red-500', topics: [], calendarOnly: true, lastUpdated: null },
  { id: 'arte', name: 'Arte', icon: '🎨', color: 'bg-pink-500', topics: [], calendarOnly: true, lastUpdated: null },
]

export const STUDY_SUBJECTS = SUBJECTS.filter(subject => !subject.calendarOnly)

export const EXAM_TYPES = [
  { id: 'trabalho', label: 'Trabalho (T)', badge: 'bg-blue-100 text-blue-700' },
  { id: 'prova', label: 'Prova (P)', badge: 'bg-green-100 text-green-700' },
  { id: 'recuperacao', label: 'Recuperação', badge: 'bg-orange-100 text-orange-700' },
  { id: 'evento', label: 'Evento', badge: 'bg-teal-100 text-teal-700' },
]

export const VIEWS = {
  HOME: 'home', SUBJECT: 'subject', SESSION: 'session', RESULT: 'result',
  CALENDAR: 'calendar', ADD_EXAM: 'add_exam', SCHEDULE: 'schedule', LEADERBOARD: 'leaderboard',
}

export const EMPTY_EXAM_FORM = {
  subject: 'matematica', type: 'prova', weight: '', date: '', time: '', content: '', notes: '',
}

export function getMascotState(userName, streak, upcomingCount) {
  if (streak > 0) return { mood: 'feliz', message: `Dia ${streak} de sequência, ${userName}! Continue assim! 🔥` }
  if (upcomingCount > 0) return { mood: 'neutro', message: `Oi, ${userName}! Bora se preparar para as provas? 💪` }
  return { mood: 'feliz', message: `Oi, ${userName}! Que matéria estudamos hoje? 📚` }
}

export function examAlertText(exam, subjectName, days) {
  const typeLabel = EXAM_TYPES.find(type => type.id === exam.type)?.label || 'Prova'
  if (exam.endDate) {
    const deadline = daysUntil(exam.endDate)
    const text = deadline === 0 ? 'hoje — último dia!' : `prazo: ${deadline} dia${deadline > 1 ? 's' : ''}!`
    return `${subjectName} em andamento — ${text} Bora estudar? 🚀`
  }
  const text = days === 0 ? 'hoje!' : `em ${days} dia${days > 1 ? 's' : ''}!`
  return exam.type === 'prova'
    ? `${typeLabel} de ${subjectName} ${text} Bora revisar? 🐥`
    : `${typeLabel} de ${subjectName} ${text} Fique atento! 📌`
}
