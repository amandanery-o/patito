import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ContentReview from '../ContentReview'

const topic = {
  chapter: 7,
  title: 'Atividades econômicas do espaço rural',
  summarySections: [{ title: 'Agricultura', text: 'Resumo da agricultura.' }],
  keyIdeas: ['Agricultura e pecuária formam a agropecuária.'],
  questions: [],
}

describe('ContentReview', () => {
  it('mostra o resumo e informa quando as questões estão em preparação', () => {
    render(<ContentReview topic={topic} onBack={() => {}} onStart={() => {}} />)
    expect(screen.getByRole('heading', { name: topic.title })).toBeInTheDocument()
    expect(screen.getByText('Resumo da agricultura.')).toBeInTheDocument()
    expect(screen.getByText(/questões deste capítulo estão sendo preparadas/i)).toBeInTheDocument()
  })

  it('permite voltar para a matéria', () => {
    const onBack = vi.fn()
    render(<ContentReview topic={topic} onBack={onBack} onStart={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }))
    expect(onBack).toHaveBeenCalledOnce()
  })
})
