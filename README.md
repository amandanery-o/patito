# 🐥 Patito — App de Estudos

App educacional gamificado para alunos do **4º ano do Ensino Fundamental**, inspirado no Duolingo. Sessões curtas, feedback imediato, recompensas e progresso visível.

## Funcionalidades

- 7 matérias: Português, Matemática, Geografia, Inglês, Ciências, História e Ensino Religioso
- 4 tipos de exercício: Múltipla Escolha, Verdadeiro/Falso, Complete a Frase e Flashcard
- Sistema de XP, streak diário e troféus
- Progresso salvo no `localStorage` (sem backend)
- Design responsivo e mobile-first

## Stack

- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Persistência via `localStorage`

## Rodando localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `/dist` |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Verifica o código com ESLint |

## Estrutura do projeto

```
src/
├── components/   # Componentes de UI
├── data/         # Conteúdo e questões por matéria
├── hooks/        # Hooks de estado (XP, progresso, streak)
└── utils/        # Funções auxiliares (pontuação, shuffle)
```

Veja o [SPEC.md](./SPEC.md) para a especificação completa do projeto.
