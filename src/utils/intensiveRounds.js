export function intensiveRounds(topic) {
  const content = topic.intensive
  if (content?.status !== 'approved' || content.questions?.length !== 60) return []

  return [0, 1].map((round) => ({
    ...topic,
    intensive: undefined,
    id: `${content.contentId}-rodada-${round + 1}`,
    title: `${content.title} · Rodada ${round + 1}`,
    summary: content.summary,
    summarySections: content.summarySections,
    keyIdeas: content.keyIdeas,
    source: content.source,
    questions: content.questions.filter((_, index) => index % 2 === round),
  }))
}
