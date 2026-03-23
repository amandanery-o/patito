import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  it('exibe 50% corretamente', () => {
    render(<ProgressBar current={5} total={10} />)
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('5/10 questões')).toBeInTheDocument()
  })

  it('exibe 0% quando current=0', () => {
    render(<ProgressBar current={0} total={10} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('esconde label quando showLabel=false', () => {
    render(<ProgressBar current={5} total={10} showLabel={false} />)
    expect(screen.queryByText('50%')).not.toBeInTheDocument()
  })
})
