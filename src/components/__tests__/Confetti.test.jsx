import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Confetti from '../Confetti'

describe('Confetti', () => {
  it('renderiza o número correto de peças', () => {
    const { container } = render(<Confetti count={10} />)
    const pieces = container.querySelectorAll('.animate-confetti')
    expect(pieces).toHaveLength(10)
  })

  it('usa count=40 por padrão', () => {
    const { container } = render(<Confetti />)
    const pieces = container.querySelectorAll('.animate-confetti')
    expect(pieces).toHaveLength(40)
  })
})
