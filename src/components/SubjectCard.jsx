export default function SubjectCard({ subject, progress, onClick }) {
  const { completed, total, percent } = progress

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 active:scale-95 transition-all duration-150 hover:shadow-md text-left"
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
          {subject.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-base leading-tight truncate">{subject.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{completed}/{total} tópicos</p>
        </div>
        <span className="text-gray-300 text-lg">›</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${subject.color} rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </button>
  )
}
