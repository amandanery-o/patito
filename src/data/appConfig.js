import { daysUntil } from '../utils/dates'
import { GEOGRAPHY_TOPICS } from './geografia'

export const SUBJECTS = [
  {
    id: 'portugues',
    name: 'Português',
    icon: '📝',
    color: 'bg-blue-500',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: '🔢',
    color: 'bg-green-500',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'geografia',
    name: 'Geografia',
    icon: '🌍',
    color: 'bg-orange-500',
    topics: GEOGRAPHY_TOPICS,
    calendarOnly: false,
    lastUpdated: '2026-08-20',
  },
  {
    id: 'ingles',
    name: 'Inglês',
    icon: '🇬🇧',
    color: 'bg-purple-500',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'ciencias',
    name: 'Ciências',
    icon: '🔬',
    color: 'bg-cyan-500',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'historia',
    name: 'História',
    icon: '📜',
    color: 'bg-amber-700',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'ensino-religioso',
    name: 'Ens. Religioso',
    icon: '✨',
    color: 'bg-yellow-500',
    topics: [],
    calendarOnly: false,
    lastUpdated: null,
  },
  {
    id: 'educacao-fisica',
    name: 'Educ. Física',
    icon: '⚽',
    color: 'bg-red-500',
    topics: [],
    calendarOnly: true,
    lastUpdated: null,
  },
  { id: 'arte', name: 'Arte', icon: '🎨', color: 'bg-pink-500', topics: [], calendarOnly: true, lastUpdated: null },
]

export const STUDY_SUBJECTS = SUBJECTS.filter((subject) => !subject.calendarOnly)

export const EXAM_TYPES = [
  { id: 'trabalho', label: 'Trabalho (T)', badge: 'bg-blue-100 text-blue-700' },
  { id: 'prova', label: 'Prova (P)', badge: 'bg-green-100 text-green-700' },
  { id: 'recuperacao', label: 'Recuperação', badge: 'bg-orange-100 text-orange-700' },
  { id: 'evento', label: 'Evento', badge: 'bg-teal-100 text-teal-700' },
]

export const VIEWS = {
  HOME: 'home',
  SUBJECT: 'subject',
  SESSION: 'session',
  RESULT: 'result',
  REVIEW: 'review',
  CALENDAR: 'calendar',
  SCHEDULE: 'schedule',
  LEADERBOARD: 'leaderboard',
  HOMEWORK: 'homework',
}

export function getMascotState(userName, upcomingCount) {
  if (upcomingCount > 0) return { mood: 'neutro', message: `Oi, ${userName}! Bora se preparar para as provas? 💪` }
  return { mood: 'feliz', message: `Oi, ${userName}! Que matéria estudamos hoje? 📚` }
}

export function examAlertText(exam, subjectName, days) {
  const typeLabel = EXAM_TYPES.find((type) => type.id === exam.type)?.label || 'Prova'
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
