-- Atualização baseada no comunicado da professora de 30/10/2026.
-- A data de 16/11 vem do cronograma anterior e não foi confirmada no comunicado.
begin;

do $$
declare
  updated_count integer;
begin
  update public.school_events
  set content = 'População brasileira — capítulo 10; características da população brasileira — capítulo 11',
      notes = 'Prova de novembro; data de 16/11 mantida provisoriamente do cronograma anterior',
      source_file = 'comunicado-geografia-2026-10-30.png',
      source_version = 'turma-43-2026-s2-v3',
      updated_at = now()
  where external_id = 't43-2026-s2-20261116-prova-geografia'
    and date = '2026-11-16'
    and type = 'prova'
    and notes = 'Prova P2';

  get diagnostics updated_count = row_count;
  if updated_count <> 1 then
    raise exception 'Esperada uma prova de Geografia P2 em 16/11/2026; encontradas %', updated_count;
  end if;
end $$;

commit;
