import { describe, expect, it } from 'vitest'
import { getMascotState } from './appConfig'

describe('getMascotState', () => {
  it('convida para conferir a Agenda quando existe qualquer compromisso próximo', () => {
    expect(getMascotState('Bento', 1)).toEqual({
      mood: 'neutro',
      message: 'Oi, Bento! Tem coisa importante chegando! Vamos conferir a Agenda? 📅',
    })
  })

  it('mantém o convite de estudo quando não há compromisso próximo', () => {
    expect(getMascotState('Bento', 0)).toEqual({
      mood: 'feliz',
      message: 'Oi, Bento! Que matéria estudamos hoje? 📚',
    })
  })
})
