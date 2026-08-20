import { supabase } from '../lib/supabase'

export function createProblemReportRepository(client = supabase) {
  return {
    async submit(payload) {
      if (!client) throw new Error('Supabase não configurado')
      const { data, error } = await client.functions.invoke('report-problem', { body: payload })
      if (error) throw error
      return data
    },
  }
}
