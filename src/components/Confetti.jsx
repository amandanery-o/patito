import { useMemo } from 'react'

const COLORS = ['#F5C518','#4CAF50','#FF6B6B','#3B82F6','#8B5CF6','#F97316','#EC4899']
const SHAPES = ['rounded-full','rounded-sm','rounded']

export default function Confetti({ count = 40 }) {
  const pieces = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left:  `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.5}s`,
      size:  `${6 + Math.random() * 8}px`,
      shape: SHAPES[i % SHAPES.length],
    })), [count]
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className={`absolute animate-confetti ${p.shape}`}
          style={{
            left:            p.left,
            top:             '-10px',
            width:           p.size,
            height:          p.size,
            backgroundColor: p.color,
            animationDelay:  p.delay,
          }}
        />
      ))}
    </div>
  )
}
