import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { compareCalendarBatches, validateCalendarBatch } from './calendar-import-lib.mjs'

const previous = JSON.parse(readFileSync('docs/sources/calendar-turma-43-2026-s2-v1.json', 'utf8'))
const corrected = JSON.parse(readFileSync('docs/sources/calendar-turma-43-2026-s2-v2.json', 'utf8'))

describe('correção das provas P1 da Turma 43', () => {
  it('altera somente as três datas comunicadas e mantém os 27 eventos válidos', () => {
    const expected = new Map([
      ['matematica', ['2026-09-22', '2026-10-02']],
      ['geografia', ['2026-09-21', '2026-10-05']],
      ['historia', ['2026-09-24', '2026-10-08']],
    ])
    const difference = compareCalendarBatches(previous.events, corrected.events)

    expect(corrected.events).toHaveLength(27)
    expect(validateCalendarBatch(corrected.events)).toEqual([])
    expect(difference.changed).toEqual([])
    expect(difference.added).toHaveLength(3)
    expect(difference.removed).toHaveLength(3)

    for (const [subject, [oldDate, newDate]] of expected) {
      const before = difference.removed.find((event) => event.subject_id === subject)
      const after = difference.added.find((event) => event.subject_id === subject)
      expect(before.date).toBe(oldDate)
      expect(after.date).toBe(newDate)
      expect(after).toMatchObject({
        ...before,
        date: newDate,
        external_id: `t43-2026-s2-${newDate.replaceAll('-', '')}-prova-${subject}`,
        source_file: 'IMG_6847.PNG',
        source_version: 'turma-43-2026-s2-v2',
      })
    }
  })
})
