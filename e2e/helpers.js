export async function seedUser(page, overrides = {}) {
  await page.addInitScript((seed) => {
    localStorage.setItem('patito_data:offline', JSON.stringify({
      user: {
        name: 'Aluno de teste',
        avatar: '🦁',
        ...seed.user,
      },
      progress: {},
      exams: [],
      storageVersion: 4,
      ...seed,
    }))
  }, overrides)
}
