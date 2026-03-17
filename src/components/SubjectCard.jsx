import ProgressBar from './ProgressBar'

const colorConfig = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    button: 'bg-blue-500 hover:bg-blue-600',
    iconBg: 'bg-blue-100'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    button: 'bg-green-500 hover:bg-green-600',
    iconBg: 'bg-green-100'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    button: 'bg-orange-500 hover:bg-orange-600',
    iconBg: 'bg-orange-100'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    button: 'bg-purple-500 hover:bg-purple-600',
    iconBg: 'bg-purple-100'
  },
  cyan: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-700',
    button: 'bg-cyan-500 hover:bg-cyan-600',
    iconBg: 'bg-cyan-100'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    button: 'bg-amber-600 hover:bg-amber-700',
    iconBg: 'bg-amber-100'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    button: 'bg-yellow-500 hover:bg-yellow-600',
    iconBg: 'bg-yellow-100'
  }
}

export default function SubjectCard({ subject, progress = 0, onClick }) {
  const colors = colorConfig[subject.color] || colorConfig.blue

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border-2 ${colors.bg} ${colors.border} transition-transform active:scale-95 hover:scale-105 shadow-sm`}
      style={{ minHeight: '110px' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base ${colors.text} leading-tight`}>
            {subject.name}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">
            {subject.topics?.length || 0} tópicos
          </p>
        </div>
        <div className={`text-sm font-bold ${colors.text}`}>
          {progress}%
        </div>
      </div>
      <ProgressBar value={progress} max={100} color={subject.color} height="h-2" />
    </button>
  )
}
