import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Onboarding from '../Onboarding'

describe('Onboarding', () => {
  it('renderiza campo de nome e botão desabilitado inicialmente', () => {
    render(<Onboarding onComplete={vi.fn()} />)
    expect(screen.getByPlaceholderText(/bento/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /vamos começar/i })).toBeDisabled()
  })

  it('habilita botão ao digitar nome', () => {
    render(<Onboarding onComplete={vi.fn()} />)
    fireEvent.change(screen.getByPlaceholderText(/bento/i), { target: { value: 'Ana' } })
    expect(screen.getByRole('button', { name: /vamos começar/i })).not.toBeDisabled()
  })

  it('chama onComplete com o nome ao submeter', () => {
    const onComplete = vi.fn()
    render(<Onboarding onComplete={onComplete} />)
    fireEvent.change(screen.getByPlaceholderText(/bento/i), { target: { value: '  Bento  ' } })
    fireEvent.click(screen.getByRole('button', { name: /vamos começar/i }))
    expect(onComplete).toHaveBeenCalledWith('Bento')
  })

  it('não chama onComplete com nome só de espaços', () => {
    const onComplete = vi.fn()
    render(<Onboarding onComplete={onComplete} />)
    fireEvent.change(screen.getByPlaceholderText(/bento/i), { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: /vamos começar/i }))
    expect(onComplete).not.toHaveBeenCalled()
  })
})
