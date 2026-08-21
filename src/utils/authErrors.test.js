import { describe, expect, it } from 'vitest'
import { friendlyAuthError } from './authErrors'

describe('friendlyAuthError', () => {
  it('traduz credenciais inválidas', () => {
    expect(friendlyAuthError({ message: 'Invalid login credentials' })).toBe(
      'Não encontramos uma conta com esses dados. Confira o e-mail e a senha. Se ainda não fez cadastro, toque em Criar agora.',
    )
  })

  it('não mostra detalhes técnicos desconhecidos', () => {
    expect(friendlyAuthError({ message: 'internal database detail' })).toBe(
      'Não conseguimos concluir agora. Tente novamente.',
    )
  })

  it('aceita ausência de erro', () => {
    expect(friendlyAuthError(null)).toBe('')
  })
})
