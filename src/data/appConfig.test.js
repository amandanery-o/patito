import { describe, expect, it } from 'vitest'
import { getMascotState, SUBJECTS } from './appConfig'

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

  it('conecta os materiais de Matemática somente à matéria correta', () => {
    expect(SUBJECTS.find((subject) => subject.id === 'matematica').topics).toHaveLength(2)
    expect(SUBJECTS.find((subject) => subject.id === 'portugues').topics).toEqual([])
  })
})
