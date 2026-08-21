import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SubjectCard from '../SubjectCard'

const subject = {
  id: 'matematica',
  name: 'Matemática',
  icon: '🔢',
  color: 'bg-green-500',
  topics: [{ questions: [{ id: 'q1' }] }],
}
const progress = { completed: 1, total: 3, percent: 33 }

describe('SubjectCard', () => {
  it('exibe nome e progresso', () => {
    render(<SubjectCard subject={subject} progress={progress} onClick={() => {}} />)
    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('1/3 tópicos')).toBeInTheDocument()
  })

  it('chama onClick ao clicar', () => {
    const onClick = vi.fn()
    render(<SubjectCard subject={subject} progress={progress} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('convida para revisar quando ainda não há questões', () => {
    render(<SubjectCard subject={{ ...subject, topics: [{ questions: [] }] }} progress={progress} onClick={() => {}} />)
    expect(screen.getByRole('button', { name: /Revisar agora/i })).toBeInTheDocument()
  })
})
