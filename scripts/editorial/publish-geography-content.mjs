#!/usr/bin/env node

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'
import { getEditorialConfig } from './editorial-configs.mjs'

export function buildEditorialPublication(approved, config, publishedAt = new Date().toISOString()) {
  const validation = validateEditorialContent(approved)
  if (!validation.valid) throw new Error(`Conteúdo inválido: ${validation.errors.join('; ')}`)
  if (approved.status !== 'approved') throw new Error('somente conteúdo aprovado pode ser publicado')
  if (approved.id !== config.contentId) throw new Error(`conteúdo inesperado: ${approved.id}`)
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

export function buildGeographyPublication(approved, publishedAt = new Date().toISOString()) {
  return buildEditorialPublication(approved, getEditorialConfig('geografia-p2'), publishedAt)
}

async function main() {
  const configurationName = process.argv[2] || 'geografia-p2'
  const config = getEditorialConfig(configurationName)
  const input = resolve(process.argv[3] || `editorial/approved/${configurationName}.json`)
  const output = resolve(process.argv[4] || config.publicationOutput)
  if (!config.publicationOutput && !process.argv[4])
    throw new Error(`destino de publicação ausente: ${configurationName}`)
  const approved = JSON.parse(await readFile(input, 'utf8'))
  const publication = buildEditorialPublication(approved, config)
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
