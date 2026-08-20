import { test, expect } from '@playwright/test'
import { seedUser } from './helpers.js'

async function openInglesSession(page) {
  await page.getByTestId('subject-ingles').getByRole('button', { name: /Jogar agora/i }).click()
  await page.getByRole('button', { name: /Revisão P1/i }).click()
}

test.describe('Sessão — Inglês', () => {
  test.beforeEach(async ({ page }) => {
    await seedUser(page)
    await page.goto('/')
  })

  test('SubjectCard de Inglês está visível', async ({ page }) => {
    const inglesCard = page.getByTestId('subject-ingles')
    await expect(inglesCard).toBeVisible()
  })

  test('trilha mostra 35 questões', async ({ page }) => {
    await page.getByTestId('subject-ingles').getByRole('button', { name: /Jogar agora/i }).click()
    await expect(page.getByText('35 questões')).toBeVisible()
  })

  test('trilha mostra também a revisão P2', async ({ page }) => {
    await page.getByTestId('subject-ingles').getByRole('button', { name: /Jogar agora/i }).click()
    await expect(page.getByRole('button', { name: /Revisão P2/i })).toBeVisible()
  })

  test('sessão inicia com 1/35', async ({ page }) => {
    await openInglesSession(page)
    await expect(page.getByText('1/35 questões')).toBeVisible()
  })

  test('responde e avança para 2/35', async ({ page }) => {
    await openInglesSession(page)
    await page.locator('.bg-white.rounded-2xl.shadow-lg button').first().click()
    await page.getByRole('button', { name: /Continuar/i }).click()
    await expect(page.getByText('2/35 questões')).toBeVisible()
  })

  test('nenhuma questão com tipo desconhecido', async ({ page }) => {
    await openInglesSession(page)
    for (let i = 0; i < 2; i++) {
      await expect(page.getByText(/Tipo desconhecido/i)).not.toBeVisible()
      const opts = page.locator('.bg-white.rounded-2xl.shadow-lg button')
      if (await opts.count() === 0) break
      await opts.first().click()
      await page.getByRole('button', { name: /Continuar/i }).click()
    }
  })

  test('permite fechar a sessão e voltar à trilha', async ({ page }) => {
    await openInglesSession(page)
    await page.getByRole('button', { name: /Fechar sessão/i }).click()
    await expect(page.getByRole('button', { name: /Revisão P1/i })).toBeVisible()
  })

  test('encerra a sessão ao perder as três vidas', async ({ page }) => {
    // Torna a ordem previsível: as três primeiras perguntas têm resposta B/C/D.
    await page.evaluate(() => { Math.random = () => 0 })
    await openInglesSession(page)

    for (let attempt = 0; attempt < 3; attempt++) {
      await page.locator('.bg-white.rounded-2xl.shadow-lg button').first().click()
      await page.getByRole('button', { name: /Continuar/i }).click()
    }

    await expect(page.getByText('Resultado')).toBeVisible()
  })
})
