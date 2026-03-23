import { useEffect } from 'react'

export default function TrophyModal({ trophies = [], onClose }) {
  useEffect(() => {
    if (trophies.length > 0) {
      const timer = setTimeout(onClose, 4000)
      return () => clearTimeout(timer)
    }
  }, [trophies, onClose])

  if (!trophies || trophies.length === 0) return null

  const trophy = trophies[0]

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Sparkle effect */}
        <div className="text-5xl mb-2">✨</div>

        {/* Trophy icon */}
        <div className="text-7xl mb-4 animate-bounce">
          {trophy.icon}
        </div>

        <div className="bg-yellow-50 rounded-2xl p-4 mb-4">
          <p className="text-yellow-600 text-sm font-medium uppercase tracking-wider mb-1">
            Troféu Desbloqueado!
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            {trophy.name}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {trophy.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-2xl transition-all"
        >
          Incrível! 🎉
        </button>
      </div>
    </div>
  )
}
