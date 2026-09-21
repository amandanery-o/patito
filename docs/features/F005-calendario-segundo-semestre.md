# F005 — Agenda escolar do segundo semestre

## Requisitos

`REQ-036`–`REQ-039`

## Resultado

O aluno consulta provas, trabalhos e outros compromissos na **Agenda escolar**, com visualização mensal ou em lista, e recebe alertas de proximidade sem editar os eventos oficiais.

## Regras

- A mantenedora publica as datas extraídas do PDF da professora.
- Alunos possuem acesso somente de leitura aos eventos oficiais.
- Alertas apresentam tipo, matéria e dias restantes.
- Datas antigas do primeiro semestre não aparecem como próximas.
- Na interface infantil, usar **Agenda** no menu e **Agenda escolar** como título. “Provas” e “Trabalhos” são tipos de evento, não o nome da área.
- Mensagens gerais sobre compromissos próximos convidam a conferir a Agenda e não presumem que todos os eventos sejam provas.

## Critérios de aceite

- Eventos publicados aparecem para todos os alunos.
- O alerta “em N dias” respeita a data local.
- Alunos não conseguem criar, editar ou excluir eventos oficiais.
- A importação valida datas, matérias e duplicidades antes de publicar.
- Comunicados posteriores da professora prevalecem sobre as datas do PDF original. Cada correção registra a fonte e mantém o histórico do lote anterior.

## Correção de 17/09/2026

O comunicado à Turma 43 altera três provas P1: Matemática de 22/09 para 02/10, Geografia de 21/09 para 05/10 e História de 24/09 para 08/10. Conteúdo, peso e tipo permanecem os do cronograma anterior. O manifesto `v2` registra somente essas três alterações, e a correção SQL preserva os UUIDs dos eventos existentes.
