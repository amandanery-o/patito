export default function Header({ user, xp, streak }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Avatar + Name */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-2xl border-2 border-blue-300">
            {user?.avatar || '🦁'}
          </div>
          <span className="font-bold text-gray-700 text-sm hidden sm:block">
            {user?.name || 'Estudante'}
          </span>
        </div>

        {/* XP + Streak */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-orange-600 text-sm">{streak?.current || 0}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-yellow-600 text-sm">{xp || 0} XP</span>
          </div>
        </div>
      </div>
    </header>
  )
}
