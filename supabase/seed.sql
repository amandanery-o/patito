-- Calendário oficial da Turma 43 — 2º semestre de 2026.
-- Fonte: PDF_2026_08_17_15_16_08.pdf, versão turma-43-2026-s2-v1.
-- Seguro para reaplicação: external_id é estável e cada linha é atualizada em conflito.

insert into public.school_events
  (external_id, subject_id, type, date, end_date, weight, content, notes, source_file, source_version)
values
  ('t43-2026-s2-20260831-trabalho-geografia', 'geografia', 'trabalho', '2026-08-31', null, 2.0, 'Setores da economia. Capítulo 6.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260903-trabalho-historia', 'historia', 'trabalho', '2026-09-03', null, 2.0, 'As formas de comunicação. Capítulo 8.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260908-trabalho-matematica', 'matematica', 'trabalho', '2026-09-08', null, 2.0, 'Grandezas e medidas. Capítulos 4 e 8.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260916-trabalho-ciencias', 'ciencias', 'trabalho', '2026-09-16', null, 2.0, 'Misturas. Capítulo 7.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260921-prova-educacao-fisica', 'educacao-fisica', 'prova', '2026-09-21', '2026-09-25', 2.0, 'Habilidades motoras globais, domínio cinestésico, deslocamento e progressão rítmica e coordenada.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260921-prova-geografia', 'geografia', 'prova', '2026-09-21', null, 2.0, 'Atividades econômicas dos espaços rural e urbano. Capítulos 7 e 8.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260922-prova-matematica', 'matematica', 'prova', '2026-09-22', null, 2.0, 'Multiplicação e divisão por dois algarismos, operações inversas e valores desconhecidos. Capítulos 5, 6 e 7.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260924-prova-historia', 'historia', 'prova', '2026-09-24', null, 2.0, 'Colonização do Brasil e migrações para o Brasil. Capítulos 9 e 10.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260925-prova-ingles', 'ingles', 'prova', '2026-09-25', null, 2.0, 'Unidades 5 e 6.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260925-trabalho-ensino-religioso', 'ensino-religioso', 'trabalho', '2026-09-25', null, 2.0, 'A importância dos ritos religiosos.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260928-prova-portugues', 'portugues', 'prova', '2026-09-28', null, 2.0, 'Leitura e interpretação; adjetivos em OSO/OSA (p. 110); substantivos em AGEM/EZA (p. 124); vírgula; concordância nominal (p. 144); plural em ÃO (p. 146).', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20260930-prova-ciencias', 'ciencias', 'prova', '2026-09-30', null, 2.0, 'Transformações químicas e físicas; transformações reversíveis e irreversíveis. Capítulos 8 e 9.', 'Prova do Componente - P1', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261005-trabalho-educacao-fisica', 'educacao-fisica', 'trabalho', '2026-10-05', '2026-10-09', 2.0, 'Esportes coletivos e pré-desportivos; características, regras, sistemas, estrutura e modelo de jogo.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261009-trabalho-ingles', 'ingles', 'trabalho', '2026-10-09', null, 2.0, 'Atividade em língua inglesa realizada em sala.', 'Trabalho do Componente - T2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261109-prova-educacao-fisica', 'educacao-fisica', 'prova', '2026-11-09', '2026-11-13', 3.0, 'Evolução motora, participação, integração, rendimento, autonomia e destreza nas atividades.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261110-prova-matematica', 'matematica', 'prova', '2026-11-10', null, 3.0, 'Frações, números decimais, tabelas e gráficos. Capítulos 9, 10 e 11.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261112-prova-portugues', 'portugues', 'prova', '2026-11-12', null, 3.0, 'Leitura e interpretação; concordância verbal (p. 166); pronomes possessivos (p. 180); IZAR/ISAR (p. 182); porquês (p. 214); H inicial (p. 216).', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261113-prova-ingles', 'ingles', 'prova', '2026-11-13', null, 3.0, 'Unidades 7 e 8.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261116-prova-geografia', 'geografia', 'prova', '2026-11-16', null, 3.0, 'Características da população brasileira e fluxos migratórios. Capítulos 11 e 12.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261118-prova-ciencias', 'ciencias', 'prova', '2026-11-18', null, 3.0, 'Caminhos da matéria e da energia; os astros e o tempo. Capítulos 10 e 11.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261119-prova-historia', 'historia', 'prova', '2026-11-19', null, 3.0, 'Migrações dentro do Brasil e a sociedade brasileira atual. Capítulos 11 e 12.', 'Prova do Componente - P2', 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261130-recuperacao-geografia', 'geografia', 'recuperacao', '2026-11-30', null, 5.0, 'Atividades econômicas dos espaços rural e urbano; características da população brasileira; fluxos migratórios. Capítulos 7, 8, 11 e 12.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261201-recuperacao-matematica', 'matematica', 'recuperacao', '2026-12-01', null, 5.0, 'Multiplicação e divisão por dois algarismos, operações inversas, valores desconhecidos, frações, números decimais, tabelas e gráficos. Capítulos 5, 6, 7, 9, 10 e 11.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261202-recuperacao-ciencias', 'ciencias', 'recuperacao', '2026-12-02', null, 5.0, 'Transformações químicas e físicas; reversíveis e irreversíveis; caminhos da matéria e da energia; os astros e o tempo. Capítulos 8, 9, 10 e 11.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261203-recuperacao-historia', 'historia', 'recuperacao', '2026-12-03', null, 5.0, 'Colonização do Brasil; migrações para e dentro do Brasil; sociedade brasileira atual. Capítulos 9, 10, 11 e 12.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261204-recuperacao-ingles', 'ingles', 'recuperacao', '2026-12-04', null, 5.0, 'Unidades 5, 6, 7 e 8.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1'),
  ('t43-2026-s2-20261207-recuperacao-portugues', 'portugues', 'recuperacao', '2026-12-07', null, 5.0, 'Leitura e interpretação; OSO/OSA; AGEM/EZA; vírgula; concordância nominal e verbal; plural em ÃO; pronomes possessivos; IZAR/ISAR; porquês; H inicial. Páginas 110, 124, 144, 146, 166, 180, 182, 214 e 216.', null, 'PDF_2026_08_17_15_16_08.pdf', 'turma-43-2026-s2-v1')
on conflict (external_id) do update set
  subject_id = excluded.subject_id,
  type = excluded.type,
  date = excluded.date,
  end_date = excluded.end_date,
  weight = excluded.weight,
  content = excluded.content,
  notes = excluded.notes,
  source_file = excluded.source_file,
  source_version = excluded.source_version,
  updated_at = now();

