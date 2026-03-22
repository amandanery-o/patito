const MONTHS_SHORT = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']

function CalendarIcon() {
  const today = new Date()
  return (
    <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 flex flex-col shadow-sm">
      <div className="bg-red-500 text-white text-center leading-none py-0.5" style={{ fontSize: 8, fontWeight: 700 }}>
        {MONTHS_SHORT[today.getMonth()]}
      </div>
      <div className="flex-1 bg-white flex items-center justify-center font-bold text-gray-800" style={{ fontSize: 14 }}>
        {today.getDate()}
      </div>
    </div>
  )
}

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
          className="hover:scale-110 transition-transform"
          aria-label="Calendário de provas"
        >
          <CalendarIcon />
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
