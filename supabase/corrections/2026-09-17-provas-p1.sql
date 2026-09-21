-- Correção publicada em 17/09/2026 pela professora da Turma 43.
-- Preserva os UUIDs existentes e falha se as três provas não estiverem na versão anterior.
begin;

do $$
declare
  updated_count integer;
begin
  update public.school_events
  set date = changes.new_date::date,
      external_id = changes.new_external_id,
      source_file = 'IMG_6847.PNG',
      source_version = 'turma-43-2026-s2-v2',
      updated_at = now()
  from (values
    ('t43-2026-s2-20260922-prova-matematica', '2026-09-22', '2026-10-02', 't43-2026-s2-20261002-prova-matematica'),
    ('t43-2026-s2-20260921-prova-geografia', '2026-09-21', '2026-10-05', 't43-2026-s2-20261005-prova-geografia'),
    ('t43-2026-s2-20260924-prova-historia', '2026-09-24', '2026-10-08', 't43-2026-s2-20261008-prova-historia')
  ) as changes(old_external_id, old_date, new_date, new_external_id)
  where public.school_events.external_id = changes.old_external_id
    and public.school_events.date = changes.old_date::date
    and public.school_events.type = 'prova'
    and public.school_events.notes = 'Prova P1';

  get diagnostics updated_count = row_count;
  if updated_count <> 3 then
    raise exception 'Esperadas 3 provas P1 na versão anterior; encontradas %', updated_count;
  end if;
end $$;

commit;
