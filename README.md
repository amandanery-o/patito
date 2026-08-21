# 🐥 Patito — estudos do 4º ano

Sistema web mobile-first para tornar o estudo do segundo semestre mais simples e atraente para crianças de aproximadamente 10 anos.

## O que existe hoje

- Conta individual com nome, e-mail e senha pelo Supabase Auth.
- Sete matérias, com estado claro de “em preparação” quando ainda não há conteúdo.
- Resumos textuais e sessões de aproximadamente 30 questões.
- Exercícios de múltipla escolha e associação.
- Retomada da sessão após sair ou recarregar, revisão dos erros e tentativas ilimitadas.
- Calendário oficial de provas e trabalhos, com alertas de proximidade.
- CRUD de Temas: descrição, páginas, entrega e conclusão.
- Ranking somente por utilização, sem usar acertos ou desempenho.
- Relato anônimo de problemas e questões para o GitHub.
- Pipeline editorial com geração assistida por Claude e aprovação humana obrigatória.

O produto não possui vidas, flashcards, streak, níveis, olimpíadas, papéis de professor/responsável ou administração pelo aluno.

## Stack

- React 18, Vite e Tailwind CSS.
- Supabase Auth e Postgres como fonte de verdade dos dados do aluno.
- Vitest, Testing Library, PostgreSQL isolado com PGlite e Playwright.
- PWA responsiva; funcionamento offline não é um requisito.

## Rodando localmente

```bash
npm ci
npm run dev
```

Acesse `http://127.0.0.1:5173/`. Sem variáveis do Supabase, a interface abre somente como demonstração local; conta, calendário oficial, ranking e sincronização remota exigem a configuração abaixo.

## Ativando o Supabase

1. Copie `.env.example` para `.env.local`.
2. Preencha a URL e a chave pública `anon` do projeto.
3. Execute `supabase/schema.sql` no SQL Editor do Supabase.
4. Execute `supabase/seed.sql` para publicar o calendário oficial.
5. Em Authentication, habilite cadastro por e-mail/senha e configure a URL do site para recuperação de senha.
6. Reinicie `npm run dev` e valide cadastro, login, retomada e ranking com duas contas de teste.

Nunca use a chave `service_role` em uma variável `VITE_` ou no navegador.

## Comandos principais

| Comando                   | Descrição                                        |
| ------------------------- | ------------------------------------------------ |
| `npm run dev`             | Inicia o servidor local                          |
| `npm run build`           | Gera o build de produção em `dist/`              |
| `npm run lint`            | Executa ESLint                                   |
| `npm run typecheck`       | Verifica os tipos de JavaScript/React            |
| `npm run format:check`    | Verifica a formatação                            |
| `npm test`                | Executa testes unitários e de PostgreSQL isolado |
| `npm run test:e2e`        | Executa as jornadas de navegador em Chromium     |
| `npm run calendar:import` | Valida o lote do calendário e gera manifesto/SQL |

Nos testes de navegador, `VITE_E2E_AUTH=1` é definido apenas pelo Playwright e ativa uma conta/repositório de teste sem credenciais. As funções reais do Supabase são testadas separadamente em PostgreSQL isolado por `scripts/database/`.

## Estrutura

```text
docs/               PRD, features, tasks, arquitetura e fontes editoriais
e2e/                jornadas completas no navegador
scripts/calendar/   importação validada do calendário
scripts/database/   testes das funções PostgreSQL reais
scripts/editorial/  geração, validação e aprovação de conteúdo
src/                aplicação React
supabase/           schema, seed e função de relato de problemas
```

O estado da implementação está em `docs/tasks/backlog.md` e a relação entre requisitos e entregas em `docs/tasks/traceability.md`.
