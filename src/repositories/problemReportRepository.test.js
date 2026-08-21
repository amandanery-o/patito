import { describe, expect, it, vi } from 'vitest'
import { createProblemReportRepository } from './problemReportRepository'

describe('problemReportRepository', () => {
  it('envia o payload pela função protegida', async () => {
    const invoke = vi.fn().mockResolvedValue({ data: { ok: true }, error: null })
    const payload = { correlationId: 'r1', kind: 'general', description: 'Tela travou' }
    await expect(createProblemReportRepository({ functions: { invoke } }).submit(payload)).resolves.toEqual({
      ok: true,
    })
    expect(invoke).toHaveBeenCalledWith('report-problem', { body: payload })
  })

  it('propaga a falha do servidor', async () => {
    const error = new Error('github unavailable')
    const invoke = vi.fn().mockResolvedValue({ data: null, error })
    await expect(createProblemReportRepository({ functions: { invoke } }).submit({})).rejects.toBe(error)
  })
})
