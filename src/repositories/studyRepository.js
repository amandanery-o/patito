import { supabase } from '../lib/supabase'

function requireClient(client) {
  if (!client) throw new Error('Supabase não configurado')
  return client
}

function unwrap(result) {
  if (result.error) throw result.error
  return result.data
}

export function createStudyRepository(client = supabase) {
  return {
    async findOpenSession(contentId) {
      const result = await requireClient(client)
        .from('study_sessions')
        .select('*')
        .eq('content_id', contentId)
        .in('status', ['active', 'review'])
        .maybeSingle()
      return unwrap(result)
    },

    async createSession({ id = crypto.randomUUID(), userId, subjectId, contentId, questionIds }) {
      const result = await requireClient(client)
        .from('study_sessions')
        .insert({
          id,
          user_id: userId,
          subject_id: subjectId,
          content_id: contentId,
          question_ids: questionIds,
        })
        .select()
        .single()
      return unwrap(result)
    },

    async listAnswers(sessionId) {
      const result = await requireClient(client)
        .from('session_answers')
        .select('*')
        .eq('session_id', sessionId)
        .order('answered_at')
      return unwrap(result)
    },

    async saveAnswer({ sessionId, answerId = crypto.randomUUID(), questionId, answer, isCorrect }) {
      const result = await requireClient(client).rpc('save_session_answer', {
        p_session_id: sessionId,
        p_answer_id: answerId,
        p_question_id: questionId,
        p_answer: answer,
        p_is_correct: isCorrect,
      })
      return unwrap(result)
    },

    async completeSession(sessionId) {
      const result = await requireClient(client).rpc('complete_study_session', {
        p_session_id: sessionId,
      })
      return unwrap(result)
    },
  }
}
