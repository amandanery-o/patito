import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ResultScreen from '../ResultScreen'

describe('ResultScreen', () => {
  it('impede saída enquanto salva a conclusão', () => {
    const onHome = vi.fn()
    render(<ResultScreen correct={30} total={30} onContinue={vi.fn()} onHome={onHome} saving />)
    expect(screen.getByText('Salvando…')).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: /Início/i }))
    expect(onHome).not.toHaveBeenCalled()
  })

  it('mostra a falha de sincronização para nova tentativa', () => {
    render(
      <ResultScreen
        correct={20}
        total={30}
        onContinue={vi.fn()}
        onHome={vi.fn()}
        error="Não conseguimos concluir sua revisão."
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Não conseguimos concluir sua revisão.')
  })
})
