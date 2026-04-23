/** Parseia 'YYYY-MM-DD' em horário local (evita shift de fuso UTC). */
export function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Retorna quantos dias faltam até uma data no formato 'YYYY-MM-DD'. */
export function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = parseLocalDate(dateStr)
  const days = Math.ceil((d - today) / (1000 * 60 * 60 * 24))
  // Normaliza -0 para 0 (comportamento de Math.ceil com valores entre -1 e 0)
  return days === 0 ? 0 : days
}

/** Formata 'YYYY-MM-DD' para 'DD/MM/YYYY'. */
export function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}
