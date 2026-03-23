export function calcStars(correct, total) {
  if (correct === total) return 3
  if (correct / total >= 0.7) return 2
  return 1
}

export function calcXP(correct, total) {
  const base = 20
  const perCorrect = correct * 10
  const perfectBonus = correct === total ? 50 : 0
  return base + perCorrect + perfectBonus
}
