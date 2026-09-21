# Contrato de importação do calendário

O PDF enviado pela escola é convertido fora do navegador para uma lista validada antes da publicação. O aluno nunca recebe permissão de escrita em `school_events`.

Cada evento deve conter:

- `external_id`: identificador determinístico formado por versão, data, tipo e matéria;
- `subject_id`: um ID existente em `src/data/appConfig.js`;
- `type`: `trabalho`, `prova`, `recuperacao` ou `evento`;
- `date`: data inicial no formato `YYYY-MM-DD`;
- `end_date`: data final opcional, igual ou posterior à inicial;
- `time`: horário opcional no formato `HH:MM`;
- `weight`: peso opcional entre 0 e 10;
- `content`: conteúdo opcional, até 1.000 caracteres;
- `notes`: observação opcional, até 500 caracteres;
- `source_file`: nome do PDF de origem;
- `source_version`: versão imutável do lote.

## Validação antes de publicar

1. Rejeitar datas inválidas, matérias desconhecidas e campos acima do limite.
2. Rejeitar `external_id` duplicado dentro do lote.
3. Comparar o lote com a versão publicada e exibir inclusões, alterações e remoções.
4. Publicar com credencial de servidor em uma única transação.
5. Registrar versão, horário e resultado sem armazenar dados pessoais dos alunos.

## Comando editorial

A extração visual do PDF é revisada em `docs/sources/avaliacoes-segundo-semestre-2026.md`. Depois da revisão, o importador valida a transcrição, confirma que a fonte é um PDF, registra seu SHA-256, compara versões e gera um SQL transacional e idempotente:

```bash
npm run calendar:import -- \
  --pdf /caminho/calendario.pdf \
  --source docs/sources/avaliacoes-segundo-semestre-2026.md \
  --version turma-43-2026-s2-v1 \
  --prefix t43-2026-s2 \
  --output supabase/seed.sql \
  --manifest docs/sources/calendar-turma-43-2026-s2-v1.json
```

Para uma nova versão, acrescente `--compare` apontando para o manifesto anterior. O relatório informa inclusões, alterações e remoções; o SQL aplica o lote e remove apenas os identificadores ausentes que estavam no manifesto comparado, dentro da mesma transação.

O PDF original não entra no Git. O manifesto guarda seu hash para comprovar exatamente qual arquivo foi revisado.

## Correções posteriores ao PDF

O comunicado da professora de 17/09/2026 substitui três datas do PDF original. A transcrição está em `docs/sources/correcao-provas-p1-2026-09-17.md`; o manifesto `calendar-turma-43-2026-s2-v2.json` mantém os 27 eventos e registra o SHA-256 da imagem recebida, sem copiar a imagem com dados pessoais para o Git. Somente os três eventos alterados recebem `source_file` e `source_version` novos. Os demais mantêm a proveniência do PDF.

`supabase/seed.sql` representa o estado completo para uma instalação nova. Em um banco já publicado, aplicar `supabase/corrections/2026-09-17-provas-p1.sql` em uma única transação. Ele altera os três registros existentes, preserva seus UUIDs e aborta se o estado anterior não corresponder ao esperado. Confirmar as três novas datas em `school_events` após a aplicação.
