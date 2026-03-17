/**
 * Calculate stars based on score percentage
 * 1 star = completed (any result)
 * 2 stars = 70%+
 * 3 stars = 100%
 */
export function calculateStars(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) return 0
  const percentage = (correctAnswers / totalQuestions) * 100

  if (percentage === 100) return 3
  if (percentage >= 70) return 2
  return 1
}

/**
 * Calculate XP for a session
 */
export function calculateXP(correctAnswers, totalQuestions) {
  const isPerfect = correctAnswers === totalQuestions
  const baseXP = correctAnswers * 10
  const completionBonus = 20
  const perfectBonus = isPerfect ? 50 : 0
  const total = baseXP + completionBonus + perfectBonus

  return {
    total,
    baseXP,
    completionBonus,
    perfectBonus,
    isPerfect
  }
}

/**
 * Get encouragement message based on score
 */
export function getEncouragementMessage(correctAnswers, totalQuestions) {
  const percentage = (correctAnswers / totalQuestions) * 100

  if (percentage === 100) {
    const messages = [
      'Incrível! Você acertou tudo! 🎉',
      'Perfeito! Você é um gênio! 🌟',
      'Uau! 100%! Você arrasou! 🏆'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else if (percentage >= 70) {
    const messages = [
      'Muito bem! Você está mandando muito! 👏',
      'Ótimo trabalho! Continue assim! 💪',
      'Quase lá! Você está aprendendo muito! 🌟'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  } else {
    const messages = [
      'Bom começo! Com prática vai melhorar! 💪',
      'Continue tentando! Você consegue! 🌈',
      'Não desista! Cada erro é um aprendizado! 📚'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }
}
