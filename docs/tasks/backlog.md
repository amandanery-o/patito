# Backlog da próxima versão

Status: em implementação contínua. Itens com `✅` possuem evidência no código e nos testes; bloqueios externos permanecem explícitos.

## F000 — Engineering Harness

- `TASK-001` ✅ Adicionar type checking para JavaScript/React e script `typecheck`.
- `TASK-002` ✅ Configurar formatter e verificação na CI.
- `TASK-003` ✅ Adicionar pre-commit para checks rápidos.
- `TASK-004` ✅ Adicionar hooks seguros de gate e feedback e atingir Harness Score L4.

## F001 — Conta do aluno com Supabase Auth

- `TASK-005` ✅ Revisar e completar o schema de perfil ligado ao Supabase Auth.
- `TASK-006` ✅ Ajustar cadastro e login padrão com nome, e-mail e senha.
- `TASK-007` ✅ Implementar encerramento de sessão e recuperação de senha por e-mail.
- `TASK-008` ✅ Criar RLS e testes de isolamento entre alunos.
- `TASK-009` ✅ Auditar e migrar identidades existentes somente se forem encontradas ao conectar o projeto Supabase remoto (projeto novo criado sem identidades legadas).

## F002 — Sincronização de progresso

- `TASK-010` ✅ Modelar sessões, respostas, progresso e eventos de utilização conforme `docs/architecture/data-model.md`.
- `TASK-011` ✅ Criar migrações, índices, constraints e políticas RLS idempotentes.
- `TASK-012` ✅ Implementar funções transacionais idempotentes para resposta e conclusão de sessão.
- `TASK-013` ✅ Implementar corte versionado que ignora dados locais do primeiro semestre sem importação automática.
- `TASK-014` ✅ Implementar repositório cliente e estados loading/saving/saved/error/stale.
- `TASK-015` ✅ Testar no PostgreSQL recarga/retomada, duas abas, troca de cliente, isolamento e repetição de requisições.

## F003 — Sessão de estudos v2

- `TASK-016` ✅ Remover vidas e formatos fora do escopo da experiência ativa.
- `TASK-017` ✅ Persistir ordem aleatória, posição e respostas da sessão.
- `TASK-018` ✅ Implementar retorno à página inicial e retomada.
- `TASK-019` ✅ Implementar revisão de erros ao final.
- `TASK-020` ✅ Cobrir conclusão, abandono, retomada após recarga e nova tentativa com E2E.

## F004 — Conteúdo do segundo semestre

- `TASK-021` ✅ Remover conteúdo do primeiro semestre e olimpíadas da experiência ativa, preservando recuperação pelo histórico do Git.
- `TASK-022` ✅ Definir schema de livro, conteúdo, resumo e questões.
- `TASK-023` 🟡 Publicar resumos textuais e exercícios do segundo semestre por matéria (Geografia P1 e P2 publicadas; demais matérias aguardam fontes).
- `TASK-024` ✅ Validar estrutura, IDs, relações e quantidade de questões.

## F005 — Agenda escolar

- `TASK-025` ✅ Remover edição de eventos oficiais da interface do aluno.
- `TASK-026` ✅ Atualizar seed/eventos para o segundo semestre.
- `TASK-027` ✅ Criar importador validado de PDF para eventos oficiais.
- `TASK-028` ✅ Testar alertas, fuso horário e duplicidades.

## F006 — Temas

- `TASK-029` ✅ Criar tabela, RLS e cliente de temas.
- `TASK-030` ✅ Implementar lista e formulário mobile-first.
- `TASK-031` ✅ Implementar edição, exclusão e conclusão.
- `TASK-032` ✅ Cobrir CRUD, isolamento e persistência com testes.

## F007 — Ranking por utilização

- `TASK-033` ✅ Definir pesos de questão e sessão dentro dos limites aprovados.
- `TASK-034` ✅ Implementar eventos idempotentes e agregação diária.
- `TASK-035` ✅ Aplicar teto de 60 questões e duas sessões por dia.
- `TASK-036` ✅ Atualizar ranking para remover métricas de desempenho.
- `TASK-037` ✅ Testar no PostgreSQL a duplicação, a virada do dia e o uso após o limite.

## F008 — Relato de problemas

- `TASK-038` ✅ Definir payload anônimo de relato.
- `TASK-039` ✅ Criar função segura para abertura de issue no GitHub.
- `TASK-040` ✅ Integrar relato de questão e erro geral na interface.
- `TASK-041` ✅ Testar remoção de dados pessoais e falhas do GitHub.

## F009 — Pipeline editorial

- `TASK-042` 🟡 Documentar contratos e permissões da Edebê (catálogo e fontes documentados; acesso oficial por API ainda não fornecido).
- `TASK-043` 🟡 Documentar contratos e permissões da Richmond College (acesso oficial ainda não fornecido).
- `TASK-044` ✅ Criar armazenamento seguro de credenciais editoriais.
- `TASK-045` 🟡 Implementar adaptadores quando configurações oficiais e permissões forem entregues; é proibido extrair senha, cookies ou sessão do aluno.
- `TASK-046` ✅ Registrar origem, versão e validação dos lotes.
- `TASK-047` ✅ Integrar importação do calendário em PDF com transcrição revisada, manifesto, comparação de versões e SQL transacional.
- `TASK-048` ✅ Definir schema versionado de conteúdo e questões geradas por IA.
- `TASK-049` ✅ Validar banco mínimo de 60 questões, formatos, IDs e referências de origem.
- `TASK-050` ✅ Implementar gerador de rascunhos com IA quando o provedor e o modelo forem configurados.
- `TASK-051` ✅ Implementar etapa explícita de revisão e aprovação antes da publicação.
- `TASK-052` ⬜ Generalizar o catálogo editorial de Geografia para configurações por matéria e prova.
- `TASK-053` ⬜ Publicar Matemática P1 seguindo o roteiro editorial completo.
- `TASK-054` ⬜ Publicar História P1 seguindo o roteiro editorial completo.
- `TASK-055` ⬜ Publicar Inglês P1 seguindo o roteiro editorial completo.
- `TASK-056` ⬜ Publicar Português P1 seguindo o roteiro editorial completo.
- `TASK-057` ⬜ Publicar Ciências P1 seguindo o roteiro editorial completo.
