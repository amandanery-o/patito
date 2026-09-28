import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import audit from '../../docs/operations/published-content-audit-2026-09-28.json'

describe('manifesto da auditoria editorial completa', () => {
  it('vincula as 420 decisões aos arquivos exatos publicados', () => {
    expect(audit.totals).toEqual({ banks: 7, questions: 420, corrected: 10, unchanged: 410 })
    expect(Object.keys(audit.decisions)).toHaveLength(420)
    expect(Object.values(audit.decisions).every(({ decision }) => decision === 'approved')).toBe(true)

    for (const bank of audit.banks) {
      const digest = createHash('sha256')
        .update(readFileSync(resolve(bank.file)))
        .digest('hex')
      expect(digest, bank.file).toBe(bank.sha256)
    }
  })
})
