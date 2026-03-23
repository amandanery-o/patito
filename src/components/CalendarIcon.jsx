const MONTHS_SHORT = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']

export default function CalendarIcon({ size = 'md', date }) {
  const today = date ? new Date(date) : new Date()
  const sizes = {
    sm: { wrapper: 'w-7 h-7', month: 7, day: 12 },
    md: { wrapper: 'w-9 h-9', month: 8, day: 14 },
    lg: { wrapper: 'w-11 h-11', month: 9, day: 17 },
  }
  const s = sizes[size] || sizes.md
  return (
    <div className={`${s.wrapper} rounded-lg overflow-hidden border border-gray-200 flex flex-col shadow-sm shrink-0`}>
      <div className="bg-red-500 text-white text-center leading-none py-0.5" style={{ fontSize: s.month, fontWeight: 700 }}>
        {MONTHS_SHORT[today.getMonth()]}
      </div>
      <div className="flex-1 bg-white flex items-center justify-center font-extrabold text-gray-800" style={{ fontSize: s.day }}>
        {today.getDate()}
      </div>
    </div>
  )
}
