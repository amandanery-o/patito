import { expect, test } from '@playwright/test'
import { seedUser } from './helpers.js'

async function openGeographySession(page) {
  await page.getByRole('button', { name: /Jogar agora/i }).click()
  await page.getByRole('button', { name: /Revisão P1 — Espaços rural e urbano/i }).click()
}

async function answerCurrentQuestion(page) {
  const progressText = await page.getByText(/\d+\/30 questões/).textContent()
  const currentQuestion = Number(progressText.split('/')[0])
  const exerciseGrid = page.locator('main .grid-cols-2, main .grid-cols-1').first()
  await exerciseGrid.waitFor()
  const isMatchQuestion = (await exerciseGrid.getAttribute('class')).includes('grid-cols-2')
  if (isMatchQuestion) {
    const columns = exerciseGrid.locator(':scope > div')
    const leftButtons = columns.nth(0).locator('button')
    const pairCount = await leftButtons.count()
    for (let index = 0; index < pairCount; index += 1) {
      await leftButtons.nth(index).click()
      await columns.nth(1).locator('button:not([disabled])').first().click()
    }
  } else {
    await exerciseGrid.locator('button:not([disabled])').first().click()
  }
  await page.getByRole('button', { name: 'Continuar', exact: true }).evaluate((button) => button.click())
  if (currentQuestion < 30)
    await expect(page.getByText(`${currentQuestion + 1}/30 questões`, { exact: true })).toBeVisible()
  else await expect(page.getByText('Revisão concluída! 🎉')).toBeVisible()
}

test('abandona, retoma, recarrega, conclui e começa uma nova tentativa', async ({ page }) => {
  test.setTimeout(120_000)
  await seedUser(page)
  await page.goto('/')
  await openGeographySession(page)
  await expect(page.getByText('1/30 questões', { exact: true })).toBeVisible()

  await answerCurrentQuestion(page)
  await expect(page.getByText('2/30 questões', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Fechar sessão' }).click()

  await page.getByRole('button', { name: /Revisão P1 — Espaços rural e urbano/i }).click()
  await expect(page.getByText('2/30 questões', { exact: true })).toBeVisible()

  await page.reload()
  await openGeographySession(page)
  await expect(page.getByText('2/30 questões', { exact: true })).toBeVisible()

  for (let question = 2; question <= 30; question += 1) await answerCurrentQuestion(page)
  await expect(page.getByText('Revisão concluída! 🎉')).toBeVisible()
  await expect(page.getByText('Você respondeu 30 questões')).toBeVisible()

  await page.getByRole('button', { name: /Início/i }).click()
  await openGeographySession(page)
  await expect(page.getByText('1/30 questões', { exact: true })).toBeVisible()
})
