export default function Header({ user, onCalendarClick }) {
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-3xl">{user.avatar}</span>
        <div>
          <p className="text-xs text-gray-400 leading-none">Olá,</p>
          <p className="font-bold text-gray-800 leading-tight">{user.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onCalendarClick}
          className="text-2xl hover:scale-110 transition-transform"
          aria-label="Calendário de provas"
        >
          📅
        </button>
        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
          <span className="text-lg">🔥</span>
          <span className="font-bold text-orange-600">{user.streak.current}</span>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-yellow-600">{user.xp}</span>
        </div>
      </div>
    </header>
  )
}
