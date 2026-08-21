/** Parseia 'YYYY-MM-DD' em horário local (evita shift de fuso UTC). */
export function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Compara dias civis sem deixar horário de verão alterar a contagem. */
export function calendarDayDifference(dateStr, from = new Date()) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const targetDay = Date.UTC(year, month - 1, day)
  const sourceDay = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  return Math.round((targetDay - sourceDay) / 86400000)
}

/** Retorna quantos dias faltam até uma data no formato 'YYYY-MM-DD'. */
export function daysUntil(dateStr, today = new Date()) {
  return calendarDayDifference(dateStr, today)
}

/** Formata 'YYYY-MM-DD' para 'DD/MM/YYYY'. */
export function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}
