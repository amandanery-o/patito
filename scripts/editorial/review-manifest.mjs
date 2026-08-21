import { createHash } from 'node:crypto'

export const REVIEW_DECISIONS = Object.freeze({
  APPROVED: 'approved',
  CHANGES_REQUESTED: 'changes_requested',
  PENDING: 'pending',
})

export function draftDigest(draft) {
  return createHash('sha256').update(JSON.stringify(draft)).digest('hex')
}

export function createReviewManifest(draft) {
  return {
    schemaVersion: 1,
    contentId: draft.id,
    draftDigest: draftDigest(draft),
    reviewer: '',
    reviewedAt: null,
    decisions: Object.fromEntries(
      draft.questions.map((question) => [question.id, { decision: REVIEW_DECISIONS.PENDING, comment: '' }]),
    ),
  }
}

export function validateReviewManifest(draft, manifest, { requireAllApproved = false } = {}) {
  const errors = []
  if (manifest?.schemaVersion !== 1) errors.push('schemaVersion da revisão deve ser 1')
  if (manifest?.contentId !== draft.id) errors.push('a revisão pertence a outro conteúdo')
  if (manifest?.draftDigest !== draftDigest(draft)) errors.push('o rascunho mudou depois da revisão')
  if (typeof manifest?.reviewer !== 'string' || !manifest.reviewer.trim()) errors.push('reviewer é obrigatório')
  if (!manifest?.reviewedAt || Number.isNaN(Date.parse(manifest.reviewedAt)))
    errors.push('reviewedAt deve ser uma data válida')

  const expectedIds = new Set(draft.questions.map((question) => question.id))
  const receivedIds = new Set(Object.keys(manifest?.decisions || {}))
  for (const id of expectedIds) {
    const entry = manifest?.decisions?.[id]
    if (!entry) {
      errors.push(`falta decisão para ${id}`)
      continue
    }
    if (!Object.values(REVIEW_DECISIONS).includes(entry.decision)) errors.push(`decisão inválida para ${id}`)
    if (requireAllApproved && entry.decision !== REVIEW_DECISIONS.APPROVED) errors.push(`${id} ainda não foi aprovado`)
  }
  for (const id of receivedIds) if (!expectedIds.has(id)) errors.push(`decisão desconhecida: ${id}`)
  return { valid: errors.length === 0, errors }
}

export function approveReviewedDraft(draft, manifest) {
  const review = validateReviewManifest(draft, manifest, { requireAllApproved: true })
  if (!review.valid) throw new Error(review.errors.join('; '))
  return {
    ...draft,
    status: 'approved',
    editorialApproval: {
      reviewer: manifest.reviewer.trim(),
      reviewedAt: manifest.reviewedAt,
      draftDigest: manifest.draftDigest,
      schemaVersion: manifest.schemaVersion,
    },
  }
}
