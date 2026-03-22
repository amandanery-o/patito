import CalendarIcon from './CalendarIcon'
import Mascot from './Mascot'

export default function Header({ user, onCalendarClick }) {
  const hasStreak = user.streak.current > 0

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
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
    </header>
  )
}
