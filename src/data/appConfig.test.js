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

  it('conecta os materiais publicados às matérias corretas', () => {
    expect(SUBJECTS.find((subject) => subject.id === 'matematica').topics).toHaveLength(3)
    expect(SUBJECTS.find((subject) => subject.id === 'portugues').topics.map(({ id }) => id)).toEqual([
      'portugues-p1-leitura-lingua',
      'portugues-novembro-2026',
    ])
    expect(SUBJECTS.find((subject) => subject.id === 'historia').topics.map(({ id }) => id)).toEqual([
      'historia-p1-colonizacao-migracoes',
      'historia-novembro-2026',
    ])
  })
})
