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
