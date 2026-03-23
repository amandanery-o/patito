import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FeedbackPanel from '../FeedbackPanel'

// Mock Mascot para evitar dependência de imagem
vi.mock('../Mascot', () => ({ default: ({ mood }) => <div data-testid="mascot" data-mood={mood} /> }))

describe('FeedbackPanel', () => {
  it('exibe mensagem de acerto quando correct=true', () => {
    render(<FeedbackPanel correct={true} explanation="Explicação" onContinue={() => {}} />)
    expect(screen.getByText(/Arrasou/i)).toBeInTheDocument()
  })

  it('exibe mensagem de erro quando correct=false', () => {
    render(<FeedbackPanel correct={false} explanation="Explicação" onContinue={() => {}} />)
    expect(screen.getByText(/Quase lá/i)).toBeInTheDocument()
  })

  it('chama onContinue ao clicar em Continuar', () => {
    const onContinue = vi.fn()
    render(<FeedbackPanel correct={true} explanation="" onContinue={onContinue} />)
    fireEvent.click(screen.getByText('Continuar'))
    expect(onContinue).toHaveBeenCalledOnce()
  })

  it('exibe mascote com mood correto', () => {
    render(<FeedbackPanel correct={true} explanation="" onContinue={() => {}} />)
    expect(screen.getByTestId('mascot')).toHaveAttribute('data-mood', 'feliz')
  })
})
