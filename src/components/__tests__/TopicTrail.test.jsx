import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TopicTrail from '../TopicTrail'

const chapter = {
  id: 'chapter-7',
  chapter: 7,
  title: 'Atividades econômicas do espaço rural',
  summarySections: [{ title: 'Agricultura', text: 'Resumo.' }],
  questions: [],
}

const review = {
  id: 'geografia-p1',
  chapter: '7 e 8',
  title: 'Revisão P1 — Espaços rural e urbano',
  summary: 'Resumo dos espaços rural e urbano.',
  summarySections: [{ title: 'Espaços', text: 'Resumo.' }],
  source: { pages: '70–87' },
  questions: Array.from({ length: 60 }, (_, index) => ({ id: `q-${index}` })),
}

describe('TopicTrail', () => {
  it('separa leitura e prática sem repetir capítulos cobertos', () => {
    const onStart = vi.fn()
    const onReview = vi.fn()
    render(
      <TopicTrail
        subject={{ id: 'geografia' }}
        topics={[chapter, review]}
        getTopicProgress={() => ({ completed: false })}
        onStart={onStart}
        onReview={onReview}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Material de revisão' })).toBeInTheDocument()
    expect(screen.queryByText(chapter.title)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Ler material da Revisão P1/i }))
    expect(onReview).toHaveBeenCalledWith(review)

    fireEvent.click(screen.getByRole('button', { name: /Praticar Revisão P1/i }))
    expect(onStart).toHaveBeenCalledWith(review)
  })
})
