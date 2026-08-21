# F000 — Engineering Harness

## Resultado

Agentes e pessoas conseguem planejar, implementar e validar mudanças com contexto, rastreabilidade e feedback determinístico.

## Escopo

- `AGENTS.md` e regras específicas por área.
- Skill PRD → Features → Tasks.
- Lint, testes, build, E2E e Harness Score.
- Evolução de L3 para L4 com type checking, formatter, pre-commit e hooks seguros.

## Critérios de aceite

- Requisitos, features e tasks usam IDs estáveis e links verificáveis.
- CI executa todos os checks obrigatórios.
- Harness Score não fica abaixo do nível mínimo acordado.
- Mudanças de schema, autenticação e sincronização possuem testes e plano de rollout.

## Estado atual

- Harness Score: L4, 98/108 (91%) em 20/08/2026.
- TypeScript verifica o código JavaScript/React com `checkJs` e modo estrito.
- Prettier é obrigatório localmente e na CI.
- `lint-staged` executa formatter e ESLint antes de commits.
- O gate bloqueia comandos destrutivos conhecidos e o hook de feedback formata arquivos editados.
