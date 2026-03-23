import { useEffect, useState } from 'react'

export default function XPToast({ amount, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, 900)
    return () => clearTimeout(t)
  }, [onDone])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed top-24 left-0 right-0 flex justify-center z-50">
      <span className="animate-float-up text-2xl font-extrabold text-yellow-500 drop-shadow-lg">
        +{amount} XP ⚡
      </span>
    </div>
  )
}
