import { describe, it, expect } from 'vitest'
import { calcStars, calcXP } from './scoring'

describe('calcStars', () => {
  it('retorna 3 estrelas com acertos perfeitos', () => {
    expect(calcStars(10, 10)).toBe(3)
    expect(calcStars(5, 5)).toBe(3)
  })

  it('retorna 2 estrelas com >= 70% de acertos', () => {
    expect(calcStars(7, 10)).toBe(2)
    expect(calcStars(8, 10)).toBe(2)
    expect(calcStars(9, 10)).toBe(2)
  })

  it('retorna 1 estrela com < 70% de acertos', () => {
    expect(calcStars(6, 10)).toBe(1)
    expect(calcStars(0, 10)).toBe(1)
  })
})

describe('calcXP', () => {
  it('inclui XP base de 20', () => {
    expect(calcXP(0, 10)).toBe(20)
  })

  it('soma 10 XP por questão correta', () => {
    expect(calcXP(5, 10)).toBe(20 + 50)     // base + 5*10
  })

  it('aplica bônus de 50 XP por acerto perfeito', () => {
    expect(calcXP(10, 10)).toBe(20 + 100 + 50) // base + 10*10 + bonus
  })

  it('não aplica bônus quando não é perfeito', () => {
    expect(calcXP(9, 10)).toBe(20 + 90)
  })
})
