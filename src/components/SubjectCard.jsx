export default function SubjectCard({ subject, progress, onClick, isNew }) {
  const { completed, total, percent } = progress

  return (
    <div className={`w-full ${subject.color} rounded-2xl p-4 shadow-md flex flex-col gap-3`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-extrabold text-white text-base leading-tight">{subject.name}</p>
            {isNew && (
              <span className="text-[10px] font-extrabold bg-white/30 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                Novo
              </span>
            )}
          </div>
          <p className="text-xs text-white/80 mt-0.5">{completed}/{total} tópicos</p>
        </div>
      </div>

      <div className="w-full h-2.5 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <button
        onClick={onClick}
        className="w-full bg-white text-gray-800 font-extrabold rounded-xl py-2.5 text-sm border-b-4 active:border-b-2 active:translate-y-0.5 transition-all select-none hover:brightness-95"
        style={{ borderBottomColor: 'rgba(0,0,0,0.15)' }}
      >
        Jogar agora 🎮
      </button>
    </div>
  )
}
