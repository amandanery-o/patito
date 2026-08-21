import { describe, expect, it } from 'vitest'
import {
  buildEditorialPublication,
  buildGeographyPublication,
} from '../../scripts/editorial/publish-geography-content.mjs'

function question(index, type = 'multipleChoice') {
  const base = {
    id: `geo-p2-${index}`,
    type,
    difficulty: 'intermediate',
    question: `Pergunta ${index}?`,
    explanation: 'Explicação baseada na fonte.',
    sourceRef: { section: 'Migrações', pages: '118–127' },
  }
  return type === 'multipleChoice'
    ? { ...base, options: ['A', 'B', 'C', 'D'], correctIndex: 0 }
    : {
        ...base,
        pairs: [
          { left: 'A', right: '1' },
          { left: 'B', right: '2' },
          { left: 'C', right: '3' },
        ],
      }
}

function approvedContent(overrides = {}) {
  return {
    id: 'geografia-p2-capitulos-11-12',
    subjectId: 'geografia',
    title: 'Revisão P2',
    summary: 'População e migrações.',
    source: { provider: 'edebe', resourceId: 'courseware-252/chapters-11-12', version: '2024' },
    generation: { model: 'configured-model', promptVersion: 'question-batch-v2' },
    status: 'approved',
    editorialApproval: { reviewer: 'Amanda', draftDigest: 'abc', reviewedAt: '2026-08-21T12:00:00Z' },
    questions: Array.from({ length: 60 }, (_, index) => question(index, index < 15 ? 'matchColumns' : undefined)),
    ...overrides,
  }
}

describe('publicação editorial de Geografia', () => {
  it('produz um pacote rastreável com as 60 questões', () => {
    const publication = buildGeographyPublication(approvedContent(), '2026-08-21T13:00:00Z')
    expect(publication).toMatchObject({
      status: 'approved',
      contentId: 'geografia-p2-capitulos-11-12',
      publishedAt: '2026-08-21T13:00:00Z',
      editorialApproval: { reviewer: 'Amanda' },
    })
    expect(publication.questions).toHaveLength(60)
  })

  it('recusa rascunho ou conteúdo sem aprovação auditável', () => {
    expect(() => buildGeographyPublication(approvedContent({ status: 'draft' }))).toThrow(
      'somente conteúdo aprovado pode ser publicado',
    )
    expect(() => buildGeographyPublication(approvedContent({ editorialApproval: undefined }))).toThrow(
      'aprovação editorial auditável é obrigatória',
    )
  })

  it('publica outra matéria somente quando o identificador corresponde à configuração', () => {
    const approved = approvedContent({ id: 'matematica-t2-capitulos-4-8', subjectId: 'matematica' })
    const config = { contentId: 'matematica-t2-capitulos-4-8' }
    expect(buildEditorialPublication(approved, config).contentId).toBe(config.contentId)
    expect(() => buildEditorialPublication(approved, { contentId: 'matematica-p1-capitulos-5-6-7' })).toThrow(
      'conteúdo inesperado',
    )
  })
})
