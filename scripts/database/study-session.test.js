import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PGlite } from '@electric-sql/pglite'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const ALICE = '00000000-0000-4000-8000-000000000001'
const BOB = '00000000-0000-4000-8000-000000000002'
const ALICE_SESSION = '20000000-0000-4000-8000-000000000001'
const BOB_SESSION = '20000000-0000-4000-8000-000000000002'

function extractFunction(schema, name) {
  const match = schema.match(new RegExp(`create or replace function public\\.${name}\\([\\s\\S]*?\\n\\$\\$;`))
  if (!match) throw new Error(`Função ${name} não encontrada no schema.`)
  return match[0]
}

describe('study session SQL', () => {
  let database
  let firstVersion

  beforeAll(async () => {
    database = new PGlite()
    await database.exec(`
      create schema auth;
      create function auth.uid() returns uuid language sql stable as $$
        select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
      $$;
      create table public.profiles (id uuid primary key, name text not null);
      create table public.study_sessions (
        id uuid primary key,
        user_id uuid not null references public.profiles(id),
        subject_id text not null,
        content_id text not null,
        question_ids text[] not null,
        current_index integer not null default 0,
        status text not null default 'active',
        started_at timestamptz not null default now(),
        completed_at timestamptz,
        updated_at timestamptz not null default now()
      );
      create unique index study_sessions_one_open_content
        on public.study_sessions(user_id, content_id) where status in ('active', 'review');
      create table public.session_answers (
        id uuid primary key,
        session_id uuid not null references public.study_sessions(id),
        user_id uuid not null references public.profiles(id),
        question_id text not null,
        answer jsonb not null,
        is_correct boolean not null,
        answered_at timestamptz not null default now(),
        unique (session_id, question_id)
      );
      create table public.topic_progress (
        user_id uuid not null references public.profiles(id),
        subject_id text not null,
        content_id text not null,
        sessions_completed integer not null default 0,
        questions_answered integer not null default 0,
        last_studied_at timestamptz,
        updated_at timestamptz not null default now(),
        primary key (user_id, content_id)
      );
      create table public.usage_events (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references public.profiles(id),
        event_type text not null,
        source_id uuid not null,
        occurred_at timestamptz not null default now(),
        study_date date not null default current_date,
        unique (user_id, event_type, source_id)
      );
    `)

    const schema = await readFile(resolve(process.cwd(), 'supabase/schema.sql'), 'utf8')
    await database.exec(extractFunction(schema, 'save_session_answer'))
    await database.exec(extractFunction(schema, 'complete_study_session'))
    await database.exec(`
      insert into profiles(id, name) values ('${ALICE}', 'Alice'), ('${BOB}', 'Bento');
      insert into study_sessions(id, user_id, subject_id, content_id, question_ids) values
        ('${ALICE_SESSION}', '${ALICE}', 'geografia', 'geo-p1', array['q1', 'q2']),
        ('${BOB_SESSION}', '${BOB}', 'geografia', 'geo-p1', array['q1']);
      select set_config('request.jwt.claim.sub', '${ALICE}', false);
    `)
    const session = await database.query('select updated_at from study_sessions where id = $1', [ALICE_SESSION])
    firstVersion = session.rows[0].updated_at
  })

  afterAll(async () => {
    await database?.close()
  })

  it('impede um aluno de salvar resposta na sessão de outro', async () => {
    await expect(
      database.query('select public.save_session_answer($1, $2, $3, $4, $5, $6)', [
        BOB_SESSION,
        '30000000-0000-4000-8000-000000000001',
        'q1',
        JSON.stringify('A'),
        true,
        null,
      ]),
    ).rejects.toThrow(/session_not_found/)
  })

  it('salva uma resposta de forma idempotente e permite retomá-la', async () => {
    const answerId = '30000000-0000-4000-8000-000000000002'
    await database.query('select public.save_session_answer($1, $2, $3, $4, $5, $6)', [
      ALICE_SESSION,
      answerId,
      'q1',
      JSON.stringify('A'),
      true,
      firstVersion,
    ])
    await database.query('select public.save_session_answer($1, $2, $3, $4, $5, $6)', [
      ALICE_SESSION,
      '30000000-0000-4000-8000-000000000099',
      'q1',
      JSON.stringify('B'),
      false,
      null,
    ])

    const answers = await database.query(
      'select id, question_id, answer, is_correct from session_answers where session_id = $1',
      [ALICE_SESSION],
    )
    const events = await database.query(
      "select count(*)::integer as count from usage_events where user_id = $1 and event_type = 'question_answered'",
      [ALICE],
    )
    expect(answers.rows).toEqual([{ id: answerId, question_id: 'q1', answer: 'B', is_correct: false }])
    expect(events.rows[0].count).toBe(1)
  })

  it('rejeita a versão antiga quando outra aba já avançou', async () => {
    await expect(
      database.query('select public.save_session_answer($1, $2, $3, $4, $5, $6)', [
        ALICE_SESSION,
        '30000000-0000-4000-8000-000000000003',
        'q2',
        JSON.stringify('A'),
        true,
        firstVersion,
      ]),
    ).rejects.toThrow(/session_stale/)
  })

  it('conclui uma vez e libera uma nova tentativa', async () => {
    const current = await database.query('select updated_at from study_sessions where id = $1', [ALICE_SESSION])
    await database.query('select public.save_session_answer($1, $2, $3, $4, $5, $6)', [
      ALICE_SESSION,
      '30000000-0000-4000-8000-000000000004',
      'q2',
      JSON.stringify('A'),
      true,
      current.rows[0].updated_at,
    ])
    await database.query('select public.complete_study_session($1)', [ALICE_SESSION])
    await database.query('select public.complete_study_session($1)', [ALICE_SESSION])

    const progress = await database.query('select * from topic_progress where user_id = $1', [ALICE])
    const completionEvents = await database.query(
      "select count(*)::integer as count from usage_events where user_id = $1 and event_type = 'session_completed'",
      [ALICE],
    )
    expect(progress.rows[0]).toMatchObject({ sessions_completed: 1, questions_answered: 2 })
    expect(completionEvents.rows[0].count).toBe(1)

    await expect(
      database.exec(`
        insert into study_sessions(id, user_id, subject_id, content_id, question_ids)
        values ('20000000-0000-4000-8000-000000000003', '${ALICE}', 'geografia', 'geo-p1', array['q1']);
      `),
    ).resolves.not.toThrow()
  })
})
