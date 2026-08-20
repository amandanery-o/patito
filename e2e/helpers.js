export async function seedUser(page, overrides = {}) {
  await page.addInitScript((seed) => {
    localStorage.setItem('patito_data:offline', JSON.stringify({
      user: {
        name: 'Aluno de teste',
        avatar: '🦁',
        xp: 0,
        streak: { current: 0, best: 0, lastStudyDate: null },
        trophies: [],
        ...seed.user,
      },
      progress: {},
      exams: [],
      storageVersion: 3,
      ...seed,
    }))
  }, overrides)
}
