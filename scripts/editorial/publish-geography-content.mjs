#!/usr/bin/env node

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'

const EXPECTED_CONTENT_ID = 'geografia-p2-capitulos-11-12'

export function buildGeographyPublication(approved, publishedAt = new Date().toISOString()) {
  const validation = validateEditorialContent(approved)
  if (!validation.valid) throw new Error(`Conteúdo inválido: ${validation.errors.join('; ')}`)
  if (approved.status !== 'approved') throw new Error('somente conteúdo aprovado pode ser publicado')
  if (approved.id !== EXPECTED_CONTENT_ID) throw new Error(`conteúdo inesperado: ${approved.id}`)
  if (!approved.editorialApproval?.reviewer || !approved.editorialApproval?.draftDigest)
    throw new Error('aprovação editorial auditável é obrigatória')
  return {
    status: 'approved',
    contentId: approved.id,
    title: approved.title,
    summary: approved.summary,
    source: approved.source,
    generation: approved.generation,
    editorialApproval: approved.editorialApproval,
    publishedAt,
    questions: approved.questions,
  }
}

async function main() {
  const input = resolve(process.argv[2] || 'editorial/approved/geografia-p2.json')
  const output = resolve(process.argv[3] || 'src/data/generated/geografiaP2Content.json')
  const approved = JSON.parse(await readFile(input, 'utf8'))
  const publication = buildGeographyPublication(approved)
  const temporary = `${output}.tmp`
  await mkdir(dirname(output), { recursive: true })
  await writeFile(temporary, `${JSON.stringify(publication, null, 2)}\n`, { flag: 'wx' })
  await rename(temporary, output)
  console.log(`Conteúdo publicado atomicamente em ${output}`)
}

if (fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
