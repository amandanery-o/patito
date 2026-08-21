#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import {
  assertPdf,
  calendarBatchToSql,
  compareCalendarBatches,
  parseCalendarMarkdown,
  sha256File,
  validateCalendarBatch,
} from './calendar-import-lib.mjs'

function options(argv) {
  const result = {}
  for (let index = 0; index < argv.length; index += 2) result[argv[index].replace(/^--/, '')] = argv[index + 1]
  return result
}

const args = options(process.argv.slice(2))
if (!args.pdf || !args.source || !args.version || !args.output) {
  console.error(
    'Uso: npm run calendar:import -- --pdf arquivo.pdf --source transcricao.md --version versao --output lote.sql [--manifest lote.json] [--compare lote-anterior.json]',
  )
  process.exit(1)
}

const pdfPath = resolve(args.pdf)
const sourcePath = resolve(args.source)
const outputPath = resolve(args.output)
const pdf = await readFile(pdfPath)
assertPdf(pdf)
const source = await readFile(sourcePath, 'utf8')
const sourceVersion = args.version
const metadata = {
  year: Number(args.year || sourceVersion.match(/20\d{2}/)?.[0]),
  id_prefix: args.prefix || sourceVersion.replace(/-v\d+$/, ''),
  source_file: basename(pdfPath),
  source_version: sourceVersion,
}
if (!metadata.year) throw new Error('Não foi possível determinar o ano do calendário.')

const events = parseCalendarMarkdown(source, metadata)
const errors = validateCalendarBatch(events)
if (!events.length) errors.push('Nenhum evento encontrado na transcrição.')
if (errors.length) throw new Error(`Lote rejeitado:\n- ${errors.join('\n- ')}`)

const pdfSha256 = await sha256File(pdfPath)
const manifest = { schema_version: 1, pdf_sha256: pdfSha256, ...metadata, events }
let comparison = { added: events, changed: [], removed: [] }
if (args.compare) {
  const previous = JSON.parse(await readFile(resolve(args.compare), 'utf8'))
  comparison = compareCalendarBatches(previous.events, events)
}

await writeFile(outputPath, calendarBatchToSql(events, comparison.removed))
if (args.manifest) await writeFile(resolve(args.manifest), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Lote válido: ${events.length} eventos.`)
console.log(`PDF SHA-256: ${pdfSha256}`)
console.log(`Mudanças: +${comparison.added.length} ~${comparison.changed.length} -${comparison.removed.length}`)
console.log(`SQL: ${outputPath}`)
