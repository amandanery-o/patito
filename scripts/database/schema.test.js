import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { PGlite } from '@electric-sql/pglite'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const ALICE = '00000000-0000-4000-8000-000000000001'
const BOB = '00000000-0000-4000-8000-000000000002'

describe('Supabase schema completo', () => {
  let database

  beforeAll(async () => {
    database = new PGlite()
    await database.exec(`
      create role authenticated;
      create role anon;
      create schema auth;
      create table auth.users (
        id uuid primary key,
        email text,
        raw_user_meta_data jsonb not null default '{}'::jsonb
      );
      create function auth.uid() returns uuid language sql stable as $$
        select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
      $$;
    `)
    const schema = await readFile(resolve(process.cwd(), 'supabase/schema.sql'), 'utf8')
    const seed = await readFile(resolve(process.cwd(), 'supabase/seed.sql'), 'utf8')
    await database.exec(schema)
    await database.exec(seed)
    await database.exec(`
      insert into auth.users(id, email, raw_user_meta_data) values
        ('${ALICE}', 'alice@example.test', '{"name":"Alice da Silva"}'),
        ('${BOB}', 'bento@example.test', '{"name":"Bento Nery"}');
    `)
  })

  afterAll(async () => {
    await database?.close()
  })

  it('cria perfis automaticamente sem métricas legadas', async () => {
    const result = await database.query(`select name, avatar, updated_at from profiles where id = $1`, [ALICE])
    expect(result.rows[0]).toMatchObject({ name: 'Alice da Silva', avatar: '🦆' })

    const columns = await database.query(
      `select column_name from information_schema.columns where table_schema = 'public' and table_name = 'profiles'`,
    )
    const names = columns.rows.map((row) => row.column_name)
    expect(names).toEqual(expect.arrayContaining(['id', 'name', 'avatar', 'created_at', 'updated_at']))
    expect(names).not.toEqual(expect.arrayContaining(['xp', 'streak_current', 'streak_best', 'class_code']))
  })

  it('publica os 27 eventos oficiais sem duplicar o seed', async () => {
    await database.exec(await readFile(resolve(process.cwd(), 'supabase/seed.sql'), 'utf8'))
    const result = await database.query('select count(*)::integer as count from school_events')
    expect(result.rows[0].count).toBe(27)
  })

  it('isola perfis quando a consulta usa o papel autenticado', async () => {
    await database.exec(`select set_config('request.jwt.claim.sub', '${ALICE}', false); set role authenticated;`)
    const result = await database.query('select id, name from profiles order by name')
    await database.exec('reset role;')
    expect(result.rows).toEqual([{ id: ALICE, name: 'Alice da Silva' }])
  })

  it('permite CRUD próprio e bloqueia escrita de tema para outro aluno', async () => {
    await database.exec(`select set_config('request.jwt.claim.sub', '${ALICE}', false); set role authenticated;`)
    await database.exec(`
      insert into homework(id, user_id, description, due_date)
      values ('40000000-0000-4000-8000-000000000001', '${ALICE}', 'Ler capítulo', '2026-08-25');
    `)
    await expect(
      database.exec(`
        insert into homework(id, user_id, description, due_date)
        values ('40000000-0000-4000-8000-000000000002', '${BOB}', 'Tema alheio', '2026-08-25');
      `),
    ).rejects.toThrow(/row-level security/)
    const ownRows = await database.query('select user_id, description from homework')
    await database.exec('reset role;')
    expect(ownRows.rows).toEqual([{ user_id: ALICE, description: 'Ler capítulo' }])
  })
})
