# Patito Agent Guide

## Project overview

Patito is a Portuguese-language study PWA for fourth-grade students. It provides subject trails, multiple-choice and association exercises, text summaries, official school dates, student-managed homework, Supabase authentication, durable progress, anonymous problem reports, and a class-scoped usage leaderboard. Treat child privacy, learning accuracy, synchronization, and data durability as product requirements.

## Source of truth

- `docs/PRD.md` defines product outcomes and global requirements once it exists.
- `docs/features/` defines feature behavior and acceptance criteria.
- `docs/tasks/` contains implementation work linked to features.
- `src/data/` contains educational content and the subject catalog.
- `supabase/schema.sql` is the current backend schema reference.
- `README.md` describes setup and supported functionality.
- `docs/operations/next-subject-playbook.md` is the mandatory end-to-end procedure for publishing each new subject or assessment.

Do not invent unresolved product behavior. Record meaningful unknowns in the relevant PRD or feature under “Open questions”.

## Commands

Use Node.js 22 as declared in `.nvmrc`.

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run format:check
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
- `src/hooks/useProgress.js` adapts profile and topic progress for the active student.
- `src/hooks/useReports.js` owns question reports.
- `src/data/appConfig.js` owns the subject catalog and app-level constants.
- `src/utils/` contains deterministic domain helpers.
- `e2e/` contains Playwright journeys.

The local fallback exists only for development and automated tests. The released product requires Supabase; authenticated data must remain isolated by user ID and must never silently fall back to another student's local data.

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

### Review-material UX invariant

- Treat **Material de revisão** and **Praticar questões** as two explicit actions within the same assessment card.
- Never represent book chapters, summaries, and question banks as equivalent consecutive trail steps.
- When a P1/P2 material already groups chapters, do not repeat those chapters as competing cards on the subject screen.
- Student-facing progress counts published review materials (P1/P2), never internal topic records or hidden chapters.
- Use child-friendly copy that makes the next action understandable without adult support.
- Use **Agenda** in bottom navigation and **Agenda escolar** as the student-facing area name; “Prova” and “Trabalho” are event types, never the section label.
- Any agent changing educational content or subject navigation must update the PRD/feature traceability and preserve this invariant in UI tests.
- For a new subject, follow the full source → material → generation → independent review → publication → test sequence in the playbook; do not publish question-only packages.

## Change discipline

- Inspect the working tree before editing and preserve unrelated user changes.
- Prefer reversible migrations and backward-compatible local-storage changes.
- Update documentation when behavior, setup, schema, or commands change.
- Do not weaken tests, lint, RLS, or CI gates merely to make a check pass.
- Report any required manual deployment step, especially Supabase SQL changes.
