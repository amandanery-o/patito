import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PGlite } from '@electric-sql/pglite'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const ALICE = '00000000-0000-4000-8000-000000000001'
const BOB = '00000000-0000-4000-8000-000000000002'

function uuid(number) {
  return `10000000-0000-4000-8000-${String(number).padStart(12, '0')}`
}

function eventRows(userId, type, date, count, offset = 0) {
  return Array.from(
    { length: count },
    (_, index) => `('${userId}', '${type}', '${uuid(offset + index)}', '${date}')`,
  ).join(',\n')
}

describe('get_usage_ranking SQL', () => {
  let database

  beforeAll(async () => {
    database = new PGlite()
    await database.exec(`
      create schema auth;
      create function auth.uid() returns uuid language sql stable as $$
        select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
      $$;
      create table public.profiles (
        id uuid primary key,
        name text not null,
        avatar text
      );
      create table public.usage_events (
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references public.profiles(id),
        event_type text not null,
        source_id uuid not null,
        study_date date not null,
        unique (user_id, event_type, source_id)
      );
    `)

    const schema = await readFile(resolve(process.cwd(), 'supabase/schema.sql'), 'utf8')
    const rankingFunction = schema.match(/create or replace function public\.get_usage_ranking\(\)[\s\S]*?\n\$\$;/)?.[0]
    if (!rankingFunction) throw new Error('Função get_usage_ranking não encontrada no schema.')
    await database.exec(rankingFunction)

    await database.exec(`
      insert into public.profiles(id, name, avatar) values
        ('${ALICE}', 'Alice da Silva', '🐥'),
        ('${BOB}', 'Bento Nery', '🦆');

      insert into public.usage_events(user_id, event_type, source_id, study_date) values
        ${eventRows(ALICE, 'question_answered', '2026-08-20', 61, 1)},
        ${eventRows(ALICE, 'session_completed', '2026-08-20', 3, 100)},
        ${eventRows(ALICE, 'question_answered', '2026-08-21', 1, 200)},
        ${eventRows(BOB, 'question_answered', '2026-08-20', 60, 300)},
        ${eventRows(BOB, 'session_completed', '2026-08-20', 2, 400)};

      insert into public.usage_events(user_id, event_type, source_id, study_date)
        values ('${ALICE}', 'question_answered', '${uuid(1)}', '2026-08-20')
        on conflict (user_id, event_type, source_id) do nothing;

      select set_config('request.jwt.claim.sub', '${ALICE}', false);
    `)
  })

  afterAll(async () => {
    await database?.close()
  })

  it('não duplica eventos com a mesma origem', async () => {
    const result = await database.query(
      `select count(*)::integer as count from usage_events
       where user_id = $1 and event_type = 'question_answered' and source_id = $2`,
      [ALICE, uuid(1)],
    )
    expect(result.rows[0].count).toBe(1)
  })

  it('aplica os limites por dia e volta a contar no dia seguinte', async () => {
    const result = await database.query('select * from public.get_usage_ranking()')
    expect(result.rows[0]).toMatchObject({
      position: 1,
      name: 'Alice',
      questions_count: 61,
      sessions_count: 2,
      activity_points: 81,
      is_current_user: true,
    })
    expect(result.rows[1]).toMatchObject({
      position: 2,
      name: 'Bento',
      questions_count: 60,
      sessions_count: 2,
      activity_points: 80,
      is_current_user: false,
    })
  })
})
