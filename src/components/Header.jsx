import CalendarIcon from './CalendarIcon'
import Mascot from './Mascot'

export default function Header({ user, onCalendarClick, onSignOut }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Mascot mood="neutro" size="sm" />
          <div>
            <p className="text-xs sm:text-sm text-gray-400 leading-none">Olá,</p>
            <p className="font-bold sm:text-lg md:text-xl text-gray-800 leading-tight">{user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onCalendarClick}
            className="hover:scale-110 transition-transform"
            aria-label="Abrir agenda escolar"
          >
            <CalendarIcon />
          </button>

          {onSignOut && (
            <button
              onClick={onSignOut}
              className="text-sm font-bold text-gray-500 hover:text-gray-800 px-2 py-1"
              aria-label="Sair da conta"
              title="Sair da conta"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
