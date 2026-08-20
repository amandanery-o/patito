import { test, expect } from '@playwright/test'
import { seedUser } from './helpers.js'

test.describe('Estrutura limpa do segundo semestre', () => {
  test.beforeEach(async ({ page }) => {
    await seedUser(page)
    await page.goto('/')
  })

  test('mostra as sete matérias regulares como conteúdo em preparação', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Em breve' })).toBeVisible()
    for (const subject of [
      'Português', 'Matemática', 'Geografia', 'Inglês',
      'Ciências', 'História', 'Ens. Religioso',
    ]) {
      await expect(page.getByText(subject, { exact: true }).first()).toBeVisible()
    }
  })

  test('não mostra olimpíadas', async ({ page }) => {
    await expect(page.getByText(/OBICT|OBLI|Olimpíada/i)).toHaveCount(0)
  })

  test('não mostra sessões ou conteúdo do primeiro semestre', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Jogar agora/i })).toHaveCount(0)
    await expect(page.getByText(/Revisão P1|Revisão P2/i)).toHaveCount(0)
  })

  test('inicia o calendário oficial vazio', async ({ page }) => {
    await page.getByRole('button', { name: /Provas/i }).last().click()
    await page.getByRole('button', { name: 'Lista' }).click()
    await expect(page.getByText(/Nenhuma atividade cadastrada/i)).toBeVisible()
  })
})
