# Patito Agent Guide

## Project overview

Patito is a Portuguese-language, gamified study PWA for fourth-grade students. It provides subject trails, six exercise formats, XP, daily streaks, exams, a weekly schedule, optional Supabase authentication, and a class-scoped leaderboard. Treat child privacy, learning accuracy, offline behavior, and data durability as product requirements.

## Source of truth

- `docs/PRD.md` defines product outcomes and global requirements once it exists.
- `docs/features/` defines feature behavior and acceptance criteria.
- `docs/tasks/` contains implementation work linked to features.
- `src/data/` contains educational content and the subject catalog.
- `supabase/schema.sql` is the current backend schema reference.
- `README.md` describes setup and supported functionality.

Do not invent unresolved product behavior. Record meaningful unknowns in the relevant PRD or feature under “Open questions”.

## Commands

Use Node.js 22 as declared in `.nvmrc`.

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run test:e2e
npx harness-score
```

Before declaring implementation complete, run lint, unit tests, build, and the relevant E2E tests. Use `npm ci` when validating lockfile reproducibility.

## Architecture

- `src/App.jsx` coordinates navigation and top-level application flows.
- `src/components/` contains focused React UI components.
- `src/contexts/AuthContext.jsx` owns Supabase session and profile state.
- `src/hooks/useProgress.js` owns local progress, XP, streak, and exam persistence.
- `src/hooks/useReports.js` owns question reports.
- `src/data/appConfig.js` owns the subject catalog and app-level constants.
- `src/utils/` contains deterministic domain helpers.
- `e2e/` contains Playwright journeys.

The app must continue to work without Supabase environment variables. Authenticated local data must remain isolated by user ID.

## Coding conventions

- Use functional React components and hooks.
- Keep business calculations in testable utilities or hooks, not JSX branches.
- Preserve immutable state updates.
- Add stable accessible labels or `data-testid` only where semantic selectors are insufficient.
- Keep user-facing copy in Brazilian Portuguese and appropriate for children.
- Add tests for bug fixes and meaningful behavior changes.
- Do not add a dependency when a small existing utility is sufficient.
- Never commit `.env`, credentials, generated `dist/`, Playwright reports, or `node_modules/`.

## Supabase safety

- Treat schema and RLS changes as security-sensitive.
- Preserve offline mode and document migration/rollout steps.
- Scope student-visible data by user or class as appropriate.
- Never expose service-role keys to Vite or browser code.
- Do not mutate production Supabase from local scripts without explicit user approval.

## Product workflow

For new product requirements, use `.agents/skills/plan-product-work/SKILL.md`.

Maintain traceability:

```text
PRD requirement → Feature ID → Task ID → tests → commit/PR
```

Every feature must include user value, scope, rules, data implications, acceptance criteria, edge cases, dependencies, rollout, and explicit non-goals. Tasks should be independently verifiable and small enough for one focused implementation cycle.

## Change discipline

- Inspect the working tree before editing and preserve unrelated user changes.
- Prefer reversible migrations and backward-compatible local-storage changes.
- Update documentation when behavior, setup, schema, or commands change.
- Do not weaken tests, lint, RLS, or CI gates merely to make a check pass.
- Report any required manual deployment step, especially Supabase SQL changes.
