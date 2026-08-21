const ALLOWED_KINDS = new Set(['question', 'general'])

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export function buildProblemReport(input, appVersion = 'dev') {
  const kind = ALLOWED_KINDS.has(input.kind) ? input.kind : 'general'
  return {
    correlationId: input.correlationId || crypto.randomUUID(),
    kind,
    subjectId: clean(input.subjectId, 80) || null,
    contentId: clean(input.contentId, 120) || null,
    questionId: clean(input.questionId, 120) || null,
    description: clean(input.description, 1000),
    appVersion: clean(appVersion, 80),
  }
}

export function containsPersonalFields(value) {
  const forbidden = new Set(['name', 'email', 'userId', 'user_id', 'answer', 'response'])
  return Object.keys(value).some((key) => forbidden.has(key))
}
