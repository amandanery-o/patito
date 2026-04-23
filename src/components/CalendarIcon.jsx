import { parseLocalDate } from '../utils/dates'

const MONTHS_SHORT = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']

export default function CalendarIcon({ size = 'md', date }) {
  const today = date ? parseLocalDate(date) : new Date()
  const sizes = {
    sm: { wrapper: 'w-7 h-7', month: 'text-[7px]', day: 'text-xs' },
    md: { wrapper: 'w-9 h-9', month: 'text-[8px]', day: 'text-sm' },
    lg: { wrapper: 'w-11 h-11', month: 'text-[9px]', day: 'text-base' },
  }
  const s = sizes[size] || sizes.md
  return (
    <div className={`${s.wrapper} rounded-lg overflow-hidden border border-gray-200 flex flex-col shadow-sm shrink-0`}>
      <div className={`bg-red-500 text-white text-center leading-none py-0.5 font-bold ${s.month}`}>
        {MONTHS_SHORT[today.getMonth()]}
      </div>
      <div className={`flex-1 bg-white flex items-center justify-center font-extrabold text-gray-800 ${s.day}`}>
        {today.getDate()}
      </div>
    </div>
  )
}
