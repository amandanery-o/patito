import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'
import { describe, expect, it } from 'vitest'
import { calendarBatchToSql } from '../calendar/calendar-import-lib.mjs'

describe('publicação da correção das provas P1', () => {
  it('preserva os UUIDs, atualiza só três provas e falha se aplicada duas vezes', async () => {
    const database = new PGlite()
    try {
      await database.exec(`
        create role authenticated;
        create role anon;
        create schema auth;
        create table auth.users (id uuid primary key, email text, raw_user_meta_data jsonb not null default '{}'::jsonb);
        create function auth.uid() returns uuid language sql stable as $$
          select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
        $$;
      `)
      await database.exec(await readFile('supabase/schema.sql', 'utf8'))
      const previous = JSON.parse(await readFile('docs/sources/calendar-turma-43-2026-s2-v1.json', 'utf8'))
      await database.exec(calendarBatchToSql(previous.events))
      const before = await database.query('select external_id, id from school_events')
      const ids = new Map(before.rows.map((row) => [row.external_id, row.id]))

      const correction = await readFile('supabase/corrections/2026-09-17-provas-p1.sql', 'utf8')
      await database.exec(correction)
      const after = await database.query('select external_id, id, subject_id, type, date from school_events')
      expect(after.rows).toHaveLength(27)

      for (const [subject, oldDate, newDate] of [
        ['matematica', '20260922', '2026-10-02'],
        ['geografia', '20260921', '2026-10-05'],
        ['historia', '20260924', '2026-10-08'],
      ]) {
        const event = after.rows.find(
          (row) => row.external_id === `t43-2026-s2-${newDate.replaceAll('-', '')}-prova-${subject}`,
        )
        expect(event).toMatchObject({ subject_id: subject, type: 'prova' })
        expect(event.date.toISOString().slice(0, 10)).toBe(newDate)
        expect(event.id).toBe(ids.get(`t43-2026-s2-${oldDate}-prova-${subject}`))
      }

      await expect(database.exec(correction)).rejects.toThrow(/Esperadas 3 provas P1/)
      await database.exec('rollback;')
      const stillPublished = await database.query('select count(*)::integer as count from school_events')
      expect(stillPublished.rows[0].count).toBe(27)
    } finally {
      await database.close()
    }
  })
})
