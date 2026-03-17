/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array (does not mutate the original)
 */
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Pick N random items from an array
 */
export function pickRandom(array, n) {
  return shuffle(array).slice(0, n)
}
