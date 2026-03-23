import CalendarIcon from './CalendarIcon'
import Mascot from './Mascot'

export default function Header({ user, onCalendarClick }) {
  const hasStreak = user.streak.current > 0
  const level = Math.floor((user.xp || 0) / 100) + 1
  const xpInLevel = (user.xp || 0) % 100

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mascot mood="neutro" size="sm" />
          <div>
            <p className="text-xs text-gray-400 leading-none">Olá,</p>
            <p className="font-bold text-gray-800 leading-tight">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCalendarClick}
            className="hover:scale-110 transition-transform"
            aria-label="Calendário de provas"
          >
            <CalendarIcon />
          </button>

          {hasStreak && (
            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
              <span className="text-lg">🔥</span>
              <span className="font-bold text-orange-600">{user.streak.current}</span>
            </div>
          )}

          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-lg">⚡</span>
            <span className="font-bold text-yellow-600">{user.xp}</span>
          </div>
        </div>
      </div>

      {/* XP level bar */}
      <div className="px-4 pb-2 flex items-center gap-2">
        <span className="text-xs font-extrabold text-blue-600 shrink-0">Nv {level}</span>
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${xpInLevel}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 shrink-0">{xpInLevel}/100</span>
      </div>
    </header>
  )
}
