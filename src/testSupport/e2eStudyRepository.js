const STORAGE_KEY = 'patito_e2e_study_sessions'

function load() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"sessions":[],"answers":[]}')
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function nextVersion(session) {
  return String(Number(session.updated_at || 0) + 1)
}

export const e2eStudyRepository = {
  async findOpenSession(contentId) {
    return load().sessions.find((session) => session.content_id === contentId && session.status !== 'completed') || null
  },

  async createSession({ id = crypto.randomUUID(), userId, subjectId, contentId, questionIds }) {
    const data = load()
    const session = {
      id,
      user_id: userId,
      subject_id: subjectId,
      content_id: contentId,
      question_ids: questionIds,
      current_index: 0,
      status: 'active',
      updated_at: '1',
    }
    data.sessions.push(session)
    save(data)
    return session
  },

  async listAnswers(sessionId) {
    return load().answers.filter((answer) => answer.session_id === sessionId)
  },

  async saveAnswer({ sessionId, answerId, questionId, answer, isCorrect, expectedUpdatedAt }) {
    const data = load()
    const session = data.sessions.find((item) => item.id === sessionId)
    if (!session) throw new Error('session_not_found')
    if (session.updated_at !== expectedUpdatedAt) throw new Error('session_stale')
    const existing = data.answers.find((item) => item.session_id === sessionId && item.question_id === questionId)
    if (existing) Object.assign(existing, { answer, is_correct: isCorrect })
    else
      data.answers.push({
        id: answerId,
        session_id: sessionId,
        question_id: questionId,
        answer,
        is_correct: isCorrect,
      })
    session.current_index = data.answers.filter((item) => item.session_id === sessionId).length
    session.status = session.current_index >= session.question_ids.length ? 'review' : 'active'
    session.updated_at = nextVersion(session)
    save(data)
    return session
  },

  async completeSession(sessionId) {
    const data = load()
    const session = data.sessions.find((item) => item.id === sessionId)
    if (!session || !['review', 'completed'].includes(session.status)) throw new Error('session_not_ready')
    session.status = 'completed'
    session.completed_at ||= new Date().toISOString()
    session.updated_at = nextVersion(session)
    save(data)
    return session
  },
}
