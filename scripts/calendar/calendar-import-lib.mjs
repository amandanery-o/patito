import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

export const SUBJECT_IDS = new Map([
  ['Língua Portuguesa', 'portugues'],
  ['Língua Inglesa', 'ingles'],
  ['Matemática', 'matematica'],
  ['Geografia', 'geografia'],
  ['História', 'historia'],
  ['Ciências', 'ciencias'],
  ['Educação Física', 'educacao-fisica'],
  ['Ensino Religioso', 'ensino-religioso'],
  ['Arte', 'arte'],
])

const VALID_TYPES = new Set(['trabalho', 'prova', 'recuperacao', 'evento'])
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function slug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseDateRange(value, year) {
  const normalized = value.replace(/–/g, '-').trim()
  const range = normalized.match(/^(\d{1,2})-(\d{1,2})\/(\d{2})$/)
  if (range) {
    const [, startDay, endDay, month] = range
    return {
      date: `${year}-${month}-${startDay.padStart(2, '0')}`,
      end_date: `${year}-${month}-${endDay.padStart(2, '0')}`,
    }
  }
  const single = normalized.match(/^(\d{1,2})\/(\d{2})$/)
  if (!single) throw new Error(`Data inválida: ${value}`)
  const [, day, month] = single
  return { date: `${year}-${month}-${day.padStart(2, '0')}`, end_date: null }
}

function classifyType(label, section) {
  if (section === 'recuperacoes') return { type: 'recuperacao', notes: null }
  const normalized = label.toLowerCase()
  if (normalized.startsWith('trabalho')) return { type: 'trabalho', notes: label }
  if (normalized.startsWith('prova')) return { type: 'prova', notes: label }
  throw new Error(`Tipo de avaliação desconhecido: ${label}`)
}

function parseWeight(value) {
  const weight = Number(value.replace(',', '.'))
  if (!Number.isFinite(weight)) throw new Error(`Peso inválido: ${value}`)
  return weight
}

export function parseCalendarMarkdown(markdown, metadata) {
  let section = null
  const events = []

  for (const rawLine of markdown.split(/\r?\n/)) {
    if (rawLine.startsWith('## Trabalhos e provas')) section = 'avaliacoes'
    if (rawLine.startsWith('## Recuperações')) section = 'recuperacoes'
    if (rawLine.startsWith('## Registros sem data')) section = null
    if (!section || !rawLine.startsWith('|')) continue

    const columns = rawLine
      .slice(1, -1)
      .split('|')
      .map((column) => column.trim())
    if (!/^\d/.test(columns[0])) continue

    const [dateText, subjectName, labelOrWeight, weightOrContent, maybeContent] = columns
    const label = section === 'recuperacoes' ? 'Recuperação' : labelOrWeight
    const weightText = section === 'recuperacoes' ? labelOrWeight : weightOrContent
    const content = section === 'recuperacoes' ? weightOrContent : maybeContent
    const subjectId = SUBJECT_IDS.get(subjectName)
    if (!subjectId) throw new Error(`Matéria desconhecida: ${subjectName}`)
    const dates = parseDateRange(dateText, metadata.year)
    const classification = classifyType(label, section)
    const dateCompact = dates.date.replaceAll('-', '')

    events.push({
      external_id: `${metadata.id_prefix}-${dateCompact}-${classification.type}-${subjectId}`,
      subject_id: subjectId,
      type: classification.type,
      ...dates,
      time: null,
      weight: parseWeight(weightText),
      content,
      notes: classification.notes,
      source_file: metadata.source_file,
      source_version: metadata.source_version,
    })
  }

  return events
}

function isRealDate(value) {
  if (!DATE_PATTERN.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export function validateCalendarBatch(events, validSubjectIds = new Set(SUBJECT_IDS.values())) {
  const errors = []
  const externalIds = new Set()

  for (const [index, event] of events.entries()) {
    const field = (message) => errors.push(`Evento ${index + 1}: ${message}`)
    if (!event.external_id) field('external_id obrigatório')
    else if (externalIds.has(event.external_id)) field(`external_id duplicado: ${event.external_id}`)
    else externalIds.add(event.external_id)
    if (!validSubjectIds.has(event.subject_id)) field(`matéria desconhecida: ${event.subject_id}`)
    if (!VALID_TYPES.has(event.type)) field(`tipo inválido: ${event.type}`)
    if (!isRealDate(event.date)) field(`data inválida: ${event.date}`)
    if (event.end_date && (!isRealDate(event.end_date) || event.end_date < event.date)) field('data final inválida')
    if (event.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.time)) field(`horário inválido: ${event.time}`)
    if (event.weight != null && (event.weight < 0 || event.weight > 10)) field(`peso inválido: ${event.weight}`)
    if (event.content?.length > 1000) field('conteúdo excede 1.000 caracteres')
    if (event.notes?.length > 500) field('observação excede 500 caracteres')
    if (!event.source_file) field('source_file obrigatório')
    if (!event.source_version) field('source_version obrigatório')
  }

  return errors
}

export function compareCalendarBatches(previous = [], next = []) {
  const before = new Map(previous.map((event) => [event.external_id, event]))
  const after = new Map(next.map((event) => [event.external_id, event]))
  const added = next.filter((event) => !before.has(event.external_id))
  const removed = previous.filter((event) => !after.has(event.external_id))
  const changed = next.filter((event) => {
    const old = before.get(event.external_id)
    return old && JSON.stringify(old) !== JSON.stringify(event)
  })
  return { added, changed, removed }
}

function sqlValue(value) {
  if (value == null) return 'null'
  if (typeof value === 'number') return String(value)
  return `'${String(value).replaceAll("'", "''")}'`
}

export function calendarBatchToSql(events, removed = []) {
  const columns = [
    'external_id',
    'subject_id',
    'type',
    'date',
    'end_date',
    'time',
    'weight',
    'content',
    'notes',
    'source_file',
    'source_version',
  ]
  const rows = events.map((event) => `  (${columns.map((column) => sqlValue(event[column])).join(', ')})`)
  const updated = columns.slice(1).map((column) => `  ${column} = excluded.${column}`)
  return [
    '-- Gerado por scripts/calendar/import-calendar.mjs. Não editar manualmente.',
    'begin;',
    `insert into public.school_events (${columns.join(', ')})`,
    'values',
    rows.join(',\n'),
    'on conflict (external_id) do update set',
    `${updated.join(',\n')},`,
    '  updated_at = now();',
    removed.length
      ? `delete from public.school_events where external_id in (${removed.map((event) => sqlValue(event.external_id)).join(', ')});`
      : null,
    'commit;',
    '',
  ]
    .filter((line) => line != null)
    .join('\n')
}

export async function sha256File(path) {
  const content = await readFile(path)
  return createHash('sha256').update(content).digest('hex')
}

export function assertPdf(content) {
  if (!content.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('O arquivo informado não é um PDF válido.')
}
