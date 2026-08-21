import { describe, expect, it } from 'vitest'
import {
  approveReviewedDraft,
  createReviewManifest,
  draftDigest,
  validateReviewManifest,
} from '../../scripts/editorial/review-manifest.mjs'

const draft = {
  id: 'geo-p2',
  status: 'draft',
  questions: [{ id: 'q-1' }, { id: 'q-2' }],
}

function completedReview() {
  const review = createReviewManifest(draft)
  review.reviewer = 'Amanda'
  review.reviewedAt = '2026-08-21T12:00:00.000Z'
  for (const decision of Object.values(review.decisions)) decision.decision = 'approved'
  return review
}

describe('manifesto de revisão editorial', () => {
  it('vincula a revisão à versão exata do rascunho', () => {
    const review = completedReview()
    expect(review.draftDigest).toBe(draftDigest(draft))
    expect(validateReviewManifest(draft, review, { requireAllApproved: true }).valid).toBe(true)
    expect(validateReviewManifest({ ...draft, title: 'Mudou' }, review).errors).toContain(
      'o rascunho mudou depois da revisão',
    )
  })

  it('impede aprovação quando existe decisão pendente ou ajuste solicitado', () => {
    const review = completedReview()
    review.decisions['q-2'].decision = 'changes_requested'
    expect(() => approveReviewedDraft(draft, review)).toThrow('q-2 ainda não foi aprovado')
  })

  it('registra a aprovação humana no conteúdo', () => {
    const approved = approveReviewedDraft(draft, completedReview())
    expect(approved.status).toBe('approved')
    expect(approved.editorialApproval).toMatchObject({ reviewer: 'Amanda', draftDigest: draftDigest(draft) })
  })
})
