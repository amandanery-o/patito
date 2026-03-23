import CalendarIcon from './CalendarIcon'

export default function BottomNav({ activeView, onHome, onSchedule, onCalendar }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex">
        <NavTab active={activeView === 'home'}     onClick={onHome}     icon="🏠" label="Início" />
        <NavTab active={activeView === 'schedule'} onClick={onSchedule} icon="📋" label="Horário" />
        <NavTab
          active={activeView === 'calendar'}
          onClick={onCalendar}
          icon={<CalendarIcon size="sm" />}
          label="Provas"
          useCustomIcon
        />
      </div>
    </nav>
  )
}

function NavTab({ active, onClick, icon, label, useCustomIcon }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-bold transition-colors
        ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      {useCustomIcon ? icon : <span className="text-2xl leading-none">{icon}</span>}
      <span>{label}</span>
      {active && <div className="w-1 h-1 rounded-full bg-blue-600" />}
    </button>
  )
}
