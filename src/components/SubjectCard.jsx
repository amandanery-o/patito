/**
 * Card de matéria com fundo colorido (estilo Duolingo).
 * Só é renderizado para matérias com conteúdo (hasContent = true).
 */
export default function SubjectCard({ subject, progress, onClick }) {
  const { completed, total, percent } = progress

  return (
    <button
      onClick={onClick}
      className={`w-full ${subject.color} rounded-2xl p-4 shadow-md flex flex-col gap-3 transition-all duration-150 text-left active:scale-95 active:brightness-90 hover:brightness-105`}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-white text-base leading-tight">{subject.name}</p>
          <p className="text-xs text-white/80 mt-0.5">{completed}/{total} tópicos</p>
        </div>
        <span className="text-white/50 text-xl font-bold">›</span>
      </div>

      {/* Barra de progresso branca */}
      <div className="w-full h-2.5 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </button>
  )
}
