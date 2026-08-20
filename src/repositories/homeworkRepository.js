import { supabase } from '../lib/supabase'

function requireClient(client) {
  if (!client) throw new Error('Supabase não configurado')
  return client
}

function unwrap(result) {
  if (result.error) throw result.error
  return result.data
}

export function createHomeworkRepository(client = supabase) {
  return {
    async list() {
      const result = await requireClient(client)
        .from('homework')
        .select('*')
        .order('completed')
        .order('due_date')
      return unwrap(result)
    },

    async create({ id = crypto.randomUUID(), userId, description, pages, dueDate }) {
      const result = await requireClient(client)
        .from('homework')
        .insert({
          id,
          user_id: userId,
          description: description.trim(),
          pages: pages.trim() || null,
          due_date: dueDate,
        })
        .select()
        .single()
      return unwrap(result)
    },

    async update(id, changes) {
      const payload = { ...changes, updated_at: new Date().toISOString() }
      if ('description' in payload) payload.description = payload.description.trim()
      if ('pages' in payload) payload.pages = payload.pages.trim() || null
      if ('completed' in payload) payload.completed_at = payload.completed ? new Date().toISOString() : null

      const result = await requireClient(client)
        .from('homework')
        .update(payload)
        .eq('id', id)
        .select()
        .single()
      return unwrap(result)
    },

    async remove(id) {
      const result = await requireClient(client).from('homework').delete().eq('id', id)
      unwrap(result)
    },
  }
}
