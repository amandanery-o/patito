-- Atualização informada pela mantenedora em 10/11/2026: prova de Matemática em 17/11.
-- Mantém o conteúdo e preserva a linha existente do evento.
begin;

do $$
declare
  updated_count integer;
begin
  update public.school_events
  set date = '2026-11-17',
      external_id = 't43-2026-s2-20261117-prova-matematica',
      notes = 'Data atualizada para 17/11 conforme informação da família em 10/11/2026',
      source_version = 'turma-43-2026-s2-v4',
      updated_at = now()
  where external_id = 't43-2026-s2-20261110-prova-matematica'
    and date = '2026-11-10'
    and type = 'prova'
    and subject_id = 'matematica';

  get diagnostics updated_count = row_count;
  if updated_count <> 1 then
    raise exception 'Esperada uma prova de Matemática em 10/11/2026; encontradas %', updated_count;
  end if;
end $$;

commit;
