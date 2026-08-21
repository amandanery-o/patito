#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { validateEditorialContent } from '../../src/editorial/contentValidator.js'
import { approveReviewedDraft } from './review-manifest.mjs'

const draftPath = resolve(process.argv[2] || 'editorial/drafts/geografia-p2.json')
const reviewPath = resolve(process.argv[3] || 'editorial/reviews/geografia-p2-review.json')
const outputPath = resolve(process.argv[4] || 'editorial/approved/geografia-p2.json')
const [draft, review] = await Promise.all([
  readFile(draftPath, 'utf8').then(JSON.parse),
  readFile(reviewPath, 'utf8').then(JSON.parse),
])
const approved = approveReviewedDraft(draft, review)
const validation = validateEditorialContent(approved)
if (!validation.valid) throw new Error(`Conteúdo inválido: ${validation.errors.join('; ')}`)
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(approved, null, 2)}\n`, { flag: 'wx' })
console.log(`Conteúdo aprovado criado em ${outputPath}`)
