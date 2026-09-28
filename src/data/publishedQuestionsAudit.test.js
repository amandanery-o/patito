import { describe, expect, it } from 'vitest'
import science from './generated/cienciasP1Content.json'
import geographyP1 from './generated/geografiaP1Questions.json'
import geographyP2 from './generated/geografiaP2Content.json'
import english from './generated/inglesP1Content.json'
import mathematicsP1 from './generated/matematicaP1Content.json'
import mathematicsT2 from './generated/matematicaT2Content.json'
import portuguese from './generated/portuguesP1Content.json'

const banks = [
  science.questions,
  geographyP1,
  geographyP2.questions,
  english.questions,
  mathematicsP1.questions,
  mathematicsT2.questions,
  portuguese.questions,
]
const questions = banks.flat()
const byId = new Map(questions.map((question) => [question.id, question]))

describe('auditoria das questões publicadas', () => {
  it('cobre os sete bancos e as 420 questões ativas', () => {
    expect(banks).toHaveLength(7)
    expect(banks.every((bank) => bank.length === 60)).toBe(true)
    expect(questions).toHaveLength(420)
    expect(new Set(questions.map(({ id }) => id)).size).toBe(420)
  })

  it('mantém alternativas e associações estruturalmente inequívocas', () => {
    for (const question of questions) {
      expect(question.question.trim(), question.id).not.toBe('')
      expect(question.explanation.trim(), question.id).not.toBe('')
      expect(question.sourceRef.section.trim(), question.id).not.toBe('')
      expect(question.sourceRef.pages.trim(), question.id).not.toBe('')

      if (question.type === 'multipleChoice') {
        expect(question.options, question.id).toHaveLength(4)
        expect(
          new Set(question.options.map((option) => option.trim().toLocaleLowerCase('pt-BR'))).size,
          question.id,
        ).toBe(4)
        expect(question.correctIndex, question.id).toBeGreaterThanOrEqual(0)
        expect(question.correctIndex, question.id).toBeLessThan(4)
      } else {
        expect(question.pairs.length, question.id).toBeGreaterThanOrEqual(3)
        expect(question.pairs.length, question.id).toBeLessThanOrEqual(6)
        expect(
          new Set(question.pairs.map(({ left }) => left.trim().toLocaleLowerCase('pt-BR'))).size,
          question.id,
        ).toBe(question.pairs.length)
        expect(
          new Set(question.pairs.map(({ right }) => right.trim().toLocaleLowerCase('pt-BR'))).size,
          question.id,
        ).toBe(question.pairs.length)
      }
    }
  })

  it('preserva as correções factuais e de ambiguidade da revisão completa', () => {
    expect(byId.get('mat-t2-026').question).toContain('5 000 kg')
    expect(byId.get('mat-t2-026').options[byId.get('mat-t2-026').correctIndex]).toBe('Toneladas')
    expect(byId.get('cie-p1-049').explanation).toContain('o vapor esfriando')
    expect(byId.get('eng-p1-028').options).toContain('Nenhuma das ações está escrita com -ing.')
    expect(byId.get('por-p1-060').pairs[2].left).toContain('antes da aula de Arte')
    expect(byId.get('geo-p1-024').explanation).toContain('Ser artesanal, sozinho, não garante sustentabilidade')
  })
})
