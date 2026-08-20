import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ onBack }) {
  const [rows, setRows]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.rpc('get_usage_ranking').then(({ data }) => {
        setRows(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl" aria-label="Voltar">‹</button>
        <h1 className="font-bold text-gray-800 text-lg flex-1">Ranking da Turma</h1>
        <span className="text-2xl">🏆</span>
      </div>

      <main className="max-w-lg sm:max-w-xl mx-auto px-4 py-5">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16 text-gray-400 font-semibold">
            <p className="text-4xl mb-3">🐥</p>
            <p>Ninguém no ranking ainda!</p>
            <p className="text-sm mt-1">Complete um tópico para aparecer aqui.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Top 3 destaque */}
            {rows.slice(0, 3).length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[rows[1], rows[0], rows[2]].filter(Boolean).map((row, i) => {
                  const realRank = Number(row.position) - 1
                  const isMe = row.is_current_user
                  const heights = ['h-24', 'h-32', 'h-20']
                  return (
                    <div
                      key={`${row.position}-${row.name}`}
                      className={`flex flex-col items-center justify-end rounded-2xl pb-3 pt-2 gap-1
                        ${isMe ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-white border border-gray-100'}
                        ${heights[i]}`}
                    >
                      <span className="text-2xl">{row.avatar || '🦆'}</span>
                      <span className="text-xs font-extrabold text-gray-700 text-center leading-tight px-1">
                        {row.name?.split(' ')[0]}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{MEDALS[realRank]}</span>
                      </div>
                      <span className="text-xs font-bold text-yellow-600">{row.activity_points} pts</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Lista completa */}
            {rows.map((row, i) => {
              const isMe = row.is_current_user
              return (
                <div
                  key={`${row.position}-${row.name}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl
                    ${isMe ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-white border border-gray-100'}`}
                >
                  <span className="w-8 text-center font-extrabold text-gray-400 text-sm">
                    {i < 3 ? MEDALS[i] : `${row.position}º`}
                  </span>
                  <span className="text-2xl">{row.avatar || '🦆'}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold truncate ${isMe ? 'text-yellow-800' : 'text-gray-800'}`}>
                      {row.name}{isMe ? ' (você)' : ''}
                    </p>
                    <p className="text-xs text-gray-500 font-semibold">{row.questions_count} questões · {row.sessions_count} sessões</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-yellow-600 text-sm">{row.activity_points} pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
