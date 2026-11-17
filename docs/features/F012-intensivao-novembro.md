# F012 — Intensivão de novembro

## Estado e requisitos

Publicado em produção em 17/11/2026, no commit de implementação `bb61393`. As 180 questões e os três hashes de aprovação foram conferidos no bundle servido por https://patito-mauve.vercel.app. `REQ-079` → `TASK-068`. A mantenedora confirmou que Matemática ainda não aconteceu e deve entrar no intensivão.

## Resultado e escopo

O aluno encontra 60 questões novas em cada prova restante: Matemática (17/11), Ciências (18/11) e História (19/11). Cada banco tem 45 múltiplas escolhas e 15 associações, explicações e referências aos capítulos conferidos. Duas rodadas de 30 cobrem juntas o banco novo, sem sobreposição.

## Fluxo e regras

- O cartão existente conserva **Ler material** e **Praticar 30 questões**. Um bloco compacto **Intensivão · 60 questões novas** oferece **Rodada 1** e **Rodada 2**.
- O resumo também oferece as rodadas, inclusive quando aberto pelo destaque inicial.
- Rodadas pertencem ao material, sem novos cartões de prova nem capítulos concorrentes.
- Listas estáveis intercalam o banco para distribuir assuntos e formatos; a sessão embaralha a ordem dentro da rodada.
- IDs exclusivos separam questões, sessões e conclusão do intensivão das tentativas antigas. A conclusão aparece em cada rodada sem aumentar o total de revisões da matéria.
- Datas, capítulos e bancos anteriores não mudam. Provas passadas continuam disponíveis no histórico.

## Dados, permissões e conexão

Conteúdo estático igual para toda a turma, sem usar dados de alunos na autoria. Sessões usam o repositório e as permissões existentes com IDs novos, sem migração de schema. Conexão obrigatória em produção; falhas de gravação impedem avanço conforme o fluxo existente. Nenhuma tentativa antiga é apagada.

## Aceite e casos de borda

- Três bancos aprovados com hash auditável: 180 IDs novos, sem enunciados repetidos dos bancos anteriores.
- Duas rodadas de 30 por matéria, cobrindo exatamente as 60 novas questões.
- Leitura, prática antiga e intensivão coexistem no cartão, sem alterar a contagem de revisões.
- Sair, retomar, recarregar, concluir e reiniciar preservam respostas e isolam as rodadas.
- Botões acessíveis em tela pequena; conclusão expressa em texto.
- Banco não aprovado não aparece como intensivão.

## Dependências, observação e rollout

F003, F009 e F010. Revisor independente definido em `.claude/agents/editorial-reviewer.md`; relatórios em `docs/operations/revisao-intensivao-*-2026-11-17.md`. Integridade dos bancos, testes de componentes e E2E verificam o comportamento. Publicar pelo fluxo Vercel existente após gates do repositório.

## Não objetivos e questões abertas

Sem novo modo offline, notificações, alterações no Supabase, notas ou calendário. Sem APIs pagas de autoria. Sem novas questões para provas já realizadas. Nenhuma decisão de escopo pendente.

## Evidência de validação

155 testes unitários/integração e 19 jornadas E2E aprovados, incluindo as três matérias com leitura, isolamento das rodadas, retomada após recarga, conclusão e nova tentativa. Lint, typecheck, formatação e build passaram. O acesso pelo destaque de novembro e o bloco de duas rodadas foram conferidos visualmente na prévia. Os testes antigos foram atualizados para os botões compactos da home já existente; o simulador E2E agora projeta o progresso das sessões concluídas como o backend. A ordenação das datas passou a comparar timestamps explicitamente, preservando o comportamento e corrigindo o typecheck preexistente.
