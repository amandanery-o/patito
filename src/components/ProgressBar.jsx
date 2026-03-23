export default function ProgressBar({ current, total, showLabel = true }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs font-bold text-gray-500">
          <span>{current}/{total} questões</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-shimmer transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
