# 🐥 Patito — App de Estudos

App educacional gamificado para alunos do **4º ano do Ensino Fundamental**, inspirado no Duolingo. Sessões curtas, feedback imediato, recompensas e progresso visível.

## Funcionalidades

- 9 áreas de estudo, incluindo Português, Matemática, Ciências e olimpíadas
- 6 tipos de exercício: múltipla escolha, verdadeiro/falso, lacunas, flashcards, ordenação e associação
- XP, níveis, sequência diária e progresso por tópico
- Calendário de avaliações e horário semanal
- Login e ranking por turma com Supabase (opcional)
- Modo offline com dados locais separados por usuário
- PWA responsivo e mobile-first

## Stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Supabase para autenticação, perfil e ranking
- Vitest, Testing Library e Playwright
- Persistência local por usuário para progresso, provas e relatórios

## Rodando localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`.

O aplicativo funciona sem Supabase em modo offline. Para habilitar login e ranking:

```bash
cp .env.example .env.local
```

Preencha as duas variáveis e aplique [supabase/schema.sql](./supabase/schema.sql) no SQL Editor do projeto Supabase.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `/dist` |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Verifica o código com ESLint |
| `npm test` | Executa os testes unitários |
| `npm run test:e2e` | Executa os testes de navegador com Playwright |

## Estrutura do projeto

```
src/
├── components/   # Componentes de UI
├── contexts/     # Sessão e perfil do Supabase
├── data/         # Conteúdo e questões por matéria
├── hooks/        # Hooks de estado (XP, progresso, streak)
└── utils/        # Funções auxiliares (pontuação, shuffle)
```

## Qualidade e CI

Cada push e pull request para `main` executa instalação limpa, lint, testes unitários, build e testes E2E em Chromium.

Veja o [SPEC.md](./SPEC.md) para a especificação completa do projeto.
