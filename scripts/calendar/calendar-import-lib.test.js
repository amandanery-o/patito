import { describe, expect, it } from 'vitest'
import {
  calendarBatchToSql,
  compareCalendarBatches,
  parseCalendarMarkdown,
  validateCalendarBatch,
} from './calendar-import-lib.mjs'

const metadata = {
  year: 2026,
  id_prefix: 'turma-43-2026-s2',
  source_file: 'calendario.pdf',
  source_version: 'turma-43-2026-s2-v1',
}

describe('calendar importer', () => {
  it('converte avaliações e intervalos da transcrição revisada', () => {
    const source = `
## Trabalhos e provas
| Data | Matéria | Tipo | Peso | Conteúdo |
| --- | --- | --- | ---: | --- |
| 21–25/09 | Educação Física | Prova P1 | 2,0 | Habilidades motoras |

## Recuperações
| Data | Matéria | Peso | Conteúdo |
| --- | --- | ---: | --- |
| 30/11 | Geografia | 5,0 | Capítulos 7 e 8 |

## Registros sem data
`
    const events = parseCalendarMarkdown(source, metadata)
    expect(events).toHaveLength(2)
    expect(events[0]).toMatchObject({
      date: '2026-09-21',
      end_date: '2026-09-25',
      subject_id: 'educacao-fisica',
      type: 'prova',
    })
    expect(events[1]).toMatchObject({ type: 'recuperacao', weight: 5 })
    expect(validateCalendarBatch(events)).toEqual([])
  })

  it('rejeita datas impossíveis, matérias e IDs duplicados', () => {
    const event = {
      external_id: 'same',
      subject_id: 'desconhecida',
      type: 'prova',
      date: '2026-02-30',
      end_date: null,
      weight: 2,
      content: '',
      notes: null,
      source_file: 'calendar.pdf',
      source_version: 'v1',
    }
    const errors = validateCalendarBatch([event, { ...event, subject_id: 'geografia' }])
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.stringContaining('matéria desconhecida'),
        expect.stringContaining('data inválida'),
        expect.stringContaining('external_id duplicado'),
      ]),
    )
  })

  it('relata inclusões, alterações e remoções entre versões', () => {
    const previous = [{ external_id: 'changed', content: 'antes' }, { external_id: 'removed' }]
    const next = [{ external_id: 'changed', content: 'depois' }, { external_id: 'added' }]
    const diff = compareCalendarBatches(previous, next)
    expect(diff.added.map((item) => item.external_id)).toEqual(['added'])
    expect(diff.changed.map((item) => item.external_id)).toEqual(['changed'])
    expect(diff.removed.map((item) => item.external_id)).toEqual(['removed'])
  })

  it('gera upsert SQL escapando apóstrofos', () => {
    const sql = calendarBatchToSql(
      [
        {
          external_id: 'event-1',
          subject_id: 'geografia',
          type: 'prova',
          date: '2026-09-21',
          end_date: null,
          time: null,
          weight: 2,
          content: "Migrações d'água",
          notes: null,
          source_file: 'calendar.pdf',
          source_version: 'v1',
        },
      ],
      [{ external_id: 'old-event' }],
    )
    expect(sql).toContain("Migrações d''água")
    expect(sql).toContain('on conflict (external_id) do update set')
    expect(sql).toContain("delete from public.school_events where external_id in ('old-event')")
    expect(sql).toMatch(/begin;[\s\S]+commit;/)
  })
})
