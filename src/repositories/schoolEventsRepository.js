import { supabase } from '../lib/supabase'

export function mapSchoolEvent(row) {
  return {
    id: row.id,
    externalId: row.external_id,
    subject: row.subject_id,
    type: row.type,
    date: row.date,
    endDate: row.end_date,
    time: row.time?.slice(0, 5) || '',
    weight: row.weight,
    content: row.content,
    notes: row.notes,
  }
}

export function createSchoolEventsRepository(client = supabase) {
  return {
    async list() {
      if (!client) throw new Error('Supabase não configurado')
      const { data, error } = await client.from('school_events').select('*').order('date')
      if (error) throw error
      return (data || []).map(mapSchoolEvent)
    },
  }
}
