import { describe, it, expect } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('retorna um array com os mesmos elementos', () => {
    const original = [1, 2, 3, 4, 5]
    const result = shuffle(original)
    expect(result).toHaveLength(original.length)
    expect(result.sort()).toEqual([...original].sort())
  })

  it('não muta o array original', () => {
    const original = [1, 2, 3]
    const copy = [...original]
    shuffle(original)
    expect(original).toEqual(copy)
  })

  it('retorna array vazio para entrada vazia', () => {
    expect(shuffle([])).toEqual([])
  })

  it('retorna array de um elemento sem alteração', () => {
    expect(shuffle([42])).toEqual([42])
  })
})
