import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import MatchColumns from '../MatchColumns'

vi.mock('../../utils/shuffle', () => ({ shuffle: (items) => items }))

const question = {
  question: 'Ligue cada letra ao número.',
  explanation: 'Cada letra possui um número.',
  pairs: [
    { left: 'A', right: '1' },
    { left: 'B', right: '2' },
    { left: 'C', right: '3' },
  ],
}

describe('MatchColumns', () => {
  it('permite desfazer um par antes da conferência', () => {
    render(<MatchColumns question={question} onSelect={() => {}} />)

    fireEvent.click(screen.getByRole('button', { name: 'A' }))
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    expect(screen.getByText(/1\/3 conectados/)).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'A, conectado; toque para desfazer' }))
    expect(screen.getByText(/0\/3 conectados/)).toBeVisible()
    expect(screen.getByRole('button', { name: 'A' })).toBeEnabled()
  })

  it('só envia depois que todos os pares forem conectados e conferidos', () => {
    const onSelect = vi.fn()
    render(<MatchColumns question={question} onSelect={onSelect} />)
    const submit = screen.getByRole('button', { name: 'Conferir respostas' })
    expect(submit).toBeDisabled()

    for (const [left, right] of [
      ['A', '1'],
      ['B', '2'],
      ['C', '3'],
    ]) {
      fireEvent.click(screen.getByRole('button', { name: left }))
      fireEvent.click(screen.getByRole('button', { name: right }))
    }

    expect(onSelect).not.toHaveBeenCalled()
    expect(submit).toBeEnabled()
    fireEvent.click(submit)
    expect(onSelect).toHaveBeenCalledWith(true, question.explanation, {
      matches: { 0: '1', 1: '2', 2: '3' },
    })
  })
})
