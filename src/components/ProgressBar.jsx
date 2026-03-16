export default function ProgressBar({ value = 0, max = 100, color = 'blue', height = 'h-3' }) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0

  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    amber: 'bg-amber-600',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }

  const barColor = colorMap[color] || 'bg-blue-500'

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${barColor} ${height} rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
