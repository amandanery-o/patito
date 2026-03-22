/**
 * Card de matéria na home.
 * Quando `hasContent` é false, exibe estado "Em breve" e desabilita interação.
 */
export default function SubjectCard({ subject, progress, hasContent, onClick }) {
  const { completed, total, percent } = progress

  return (
    <button
      onClick={hasContent ? onClick : undefined}
      className={`w-full bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-all duration-150 text-left
        ${hasContent
          ? 'border border-gray-100 active:scale-95 hover:shadow-md cursor-pointer'
          : 'border border-dashed border-gray-200 opacity-60 cursor-default'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm
          ${!hasContent ? 'grayscale' : ''}`}>
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-base leading-tight truncate">{subject.name}</p>
          {hasContent ? (
            <p className="text-xs text-gray-400 mt-0.5">{completed}/{total} tópicos</p>
          ) : (
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 mt-0.5">
              Em breve
            </span>
          )}
        </div>
        {hasContent && <span className="text-gray-300 text-lg">›</span>}
      </div>

      {hasContent && (
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${subject.color} rounded-full transition-all duration-500`}
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </button>
  )
}
