import { supabase } from '../lib/supabase'

export function createTopicProgressRepository(client = supabase) {
  return {
    configured: Boolean(client),
    async list(userId) {
      if (!client) throw new Error('Supabase não configurado')
      const { data, error } = await client
        .from('topic_progress')
        .select('subject_id, content_id, sessions_completed, questions_answered, last_studied_at')
        .eq('user_id', userId)
      if (error) throw error
      return data || []
    },
  }
}
