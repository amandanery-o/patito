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
      'Português',
      'Matemática',
      'Geografia',
      'Inglês',
      'Ciências',
      'História',
      'Ens. Religioso',
    ]) {
      await expect(page.getByText(subject, { exact: true }).first()).toBeVisible()
    }
  })

  test('não mostra olimpíadas', async ({ page }) => {
    await expect(page.getByText(/OBICT|OBLI|Olimpíada/i)).toHaveCount(0)
  })

  test('publica as revisões aprovadas de Geografia', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Jogar agora/i })).toHaveCount(1)
    await page.getByRole('button', { name: /Jogar agora/i }).click()
    await expect(page.getByRole('heading', { name: 'Material de revisão' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Ler material da Revisão P1/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Praticar Revisão P1/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Ler material da Revisão P2/i })).toBeVisible()
    await expect(page.getByText('Atividades econômicas do espaço rural', { exact: true })).toHaveCount(0)
    await expect(page.getByText('Atividades econômicas do espaço urbano', { exact: true })).toHaveCount(0)
    await expect(page.getByText(/flashcard|olimpíada|primeiro semestre/i)).toHaveCount(0)
  })

  test('inicia uma sessão de 30 questões da P2 de Geografia', async ({ page }) => {
    await page.getByRole('button', { name: /Jogar agora/i }).click()
    await page.getByRole('button', { name: /Praticar Revisão P2 — População e migrações/i }).click()
    await expect(page.getByText('Revisão P2 — População e migrações', { exact: true })).toBeVisible()
    await expect(page.getByText('1/30 questões', { exact: true })).toBeVisible()
  })

  test('inicia uma sessão de 30 questões da P1 de Geografia', async ({ page }) => {
    await page.getByRole('button', { name: /Jogar agora/i }).click()
    await page.getByRole('button', { name: /Praticar Revisão P1 — Espaços rural e urbano/i }).click()
    await expect(page.getByText('Revisão P1 — Espaços rural e urbano', { exact: true })).toBeVisible()
    await expect(page.getByText('1/30 questões', { exact: true })).toBeVisible()
  })

  test('inicia o calendário oficial vazio', async ({ page }) => {
    await page
      .getByRole('button', { name: /Provas/i })
      .last()
      .click()
    await expect(page.getByText('Oficial')).toBeVisible()
    await expect(page.getByRole('button', { name: /Adicionar atividade/i })).toHaveCount(0)
    await page.getByRole('button', { name: 'Lista' }).click()
    await expect(page.getByText(/Nenhuma data oficial publicada/i)).toBeVisible()
  })

  test('abre o cadastro mobile de temas', async ({ page }) => {
    await page.getByRole('button', { name: 'Temas' }).click()
    await expect(page.getByRole('heading', { name: 'Temas' })).toBeVisible()
    await expect(page.getByText('Nenhum tema pendente')).toBeVisible()
    await page.getByRole('button', { name: '+ Novo' }).click()
    await expect(page.getByLabel('O que precisa fazer?')).toBeVisible()
    await expect(page.getByLabel('Entregar em')).toBeVisible()
  })

  test('abre um relato geral sem pedir dados pessoais', async ({ page }) => {
    await page.getByRole('button', { name: 'Reportar um problema' }).click()
    await expect(page.getByRole('heading', { name: 'Reportar um problema' })).toBeVisible()
    await expect(page.getByLabel('O que aconteceu?')).toBeVisible()
    await expect(page.getByText(/não envia seus dados ou respostas/i)).toBeVisible()
    await expect(page.getByLabel(/nome|e-mail/i)).toHaveCount(0)
  })
})
