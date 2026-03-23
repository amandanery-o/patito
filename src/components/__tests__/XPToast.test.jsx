import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import XPToast from '../XPToast'

describe('XPToast', () => {
  it('exibe o valor de XP', () => {
    render(<XPToast amount={10} onDone={() => {}} />)
    expect(screen.getByText(/\+10 XP/)).toBeInTheDocument()
  })

  it('chama onDone após ~900ms', async () => {
    vi.useFakeTimers()
    const onDone = vi.fn()
    render(<XPToast amount={10} onDone={onDone} />)
    await act(async () => { vi.advanceTimersByTime(950) })
    expect(onDone).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
