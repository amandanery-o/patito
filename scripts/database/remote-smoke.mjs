#!/usr/bin/env node

import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const publicKey = process.env.VITE_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !publicKey || !serviceKey) throw new Error('Variáveis do teste remoto não configuradas')

const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
const runId = `${Date.now()}-${randomUUID().slice(0, 8)}`
const password = `Patito-${randomUUID()}-9a!`
const users = []

function client() {
  return createClient(url, publicKey, { auth: { persistSession: false, autoRefreshToken: false } })
}

async function unwrap(promise) {
  const result = await promise
  if (result.error) throw result.error
  return result.data
}

async function createTestUser(label) {
  const email = `patito-smoke-${label}-${runId}@example.com`
  const created = await unwrap(
    admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { name: `Teste ${label}` } }),
  )
  users.push(created.user.id)
  const userClient = client()
  await unwrap(userClient.auth.signInWithPassword({ email, password }))
  return { client: userClient, id: created.user.id }
}

try {
  const [studentA, studentB] = await Promise.all([createTestUser('A'), createTestUser('B')])
  const profileA = await unwrap(studentA.client.from('profiles').select('id,name').single())
  assert.equal(profileA.id, studentA.id)
  assert.equal(profileA.name, 'Teste A')

  const events = await unwrap(studentA.client.from('school_events').select('external_id'))
  assert.equal(events.length, 27)

  const homeworkId = randomUUID()
  await unwrap(
    studentA.client.from('homework').insert({
      id: homeworkId,
      user_id: studentA.id,
      description: 'Tema descartável do smoke test',
      pages: '1–2',
      due_date: '2026-08-31',
    }),
  )
  const ownHomework = await unwrap(studentA.client.from('homework').select('id').eq('id', homeworkId))
  const foreignHomework = await unwrap(studentB.client.from('homework').select('id').eq('id', homeworkId))
  assert.equal(ownHomework.length, 1)
  assert.equal(foreignHomework.length, 0)

  const sessionId = randomUUID()
  const session = await unwrap(
    studentA.client
      .from('study_sessions')
      .insert({
        id: sessionId,
        user_id: studentA.id,
        subject_id: 'geografia',
        content_id: `remote-smoke-${runId}`,
        question_ids: ['smoke-q-1'],
      })
      .select()
      .single(),
  )
  await unwrap(
    studentA.client.rpc('save_session_answer', {
      p_session_id: sessionId,
      p_answer_id: randomUUID(),
      p_question_id: 'smoke-q-1',
      p_answer: { optionIndex: 0 },
      p_is_correct: true,
      p_expected_updated_at: session.updated_at,
    }),
  )
  const completed = await unwrap(studentA.client.rpc('complete_study_session', { p_session_id: sessionId }))
  assert.equal(completed.status, 'completed')
  const hiddenSession = await unwrap(studentB.client.from('study_sessions').select('id').eq('id', sessionId))
  assert.equal(hiddenSession.length, 0)

  const ranking = await unwrap(studentA.client.rpc('get_usage_ranking'))
  assert.ok(ranking.some((entry) => entry.is_current_user))
  console.log('Smoke remoto aprovado: Auth, perfil, calendário, RLS, Tema, sessão e ranking')
} finally {
  for (const userId of users) await admin.auth.admin.deleteUser(userId)
}
