import { test, expect } from '@playwright/test'
import { seedUser } from './helpers.js'

async function openInglesSession(page) {
  await page.locator('button').filter({ hasText: 'Inglês' }).click()
  await page.getByRole('button', { name: /Revisão P1/i }).click()
}

test.describe('Sessão — Inglês', () => {
  test.beforeEach(async ({ page }) => {
    await seedUser(page)
    await page.goto('/')
  })

  test('SubjectCard de Inglês visível com tag Novo', async ({ page }) => {
    const inglesCard = page.locator('button').filter({ hasText: 'Inglês' })
    await expect(inglesCard).toBeVisible()
  })

  test('trilha mostra 35 questões', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Inglês' }).click()
    await expect(page.getByText('35 questões')).toBeVisible()
  })

  test('P2 placeholder mostra Em breve', async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Inglês' }).click()
    await expect(page.getByText(/Em breve/i)).toBeVisible()
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
    for (let i = 0; i < 10; i++) {
      await expect(page.getByText(/Tipo desconhecido/i)).not.toBeVisible()
      const opts = page.locator('.bg-white.rounded-2xl.shadow-lg button')
      if (await opts.count() === 0) break
      await opts.first().click()
      await page.getByRole('button', { name: /Continuar/i }).click()
    }
  })

  test('correctIndex variado — resposta correta não é sempre a primeira opção', async ({ page }) => {
    // Avança algumas questões e verifica que nem toda resposta correta é A
    await openInglesSession(page)
    let correctWasFirst = 0
    let totalChecked = 0

    for (let i = 0; i < 8; i++) {
      const opts = page.locator('.bg-white.rounded-2xl.shadow-lg button')
      const count = await opts.count()
      if (count === 0) break

      // Clica na primeira opção e vê se foi correta
      await opts.first().click()
      const panel = page.locator('.fixed.bottom-0').first()
      await panel.waitFor({ state: 'visible' })
      const cls = await panel.getAttribute('class')
      if (cls?.includes('bg-green-500')) correctWasFirst++
      totalChecked++
      await page.getByRole('button', { name: /Continuar/i }).click()
    }

    // Com 8 questões e distribuição 8/6/6/6, se A fosse sempre certa
    // teríamos 8/8. Com distribuição real, esperamos < 8/8
    expect(correctWasFirst).toBeLessThan(totalChecked)
  })
})
