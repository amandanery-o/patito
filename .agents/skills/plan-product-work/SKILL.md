---
name: plan-product-work
description: Transform raw Patito product requirements into a traceable PRD, feature specifications, and implementation tasks. Use when the user provides new requirements, asks to plan a feature, requests a roadmap or backlog, or needs product decisions decomposed before implementation.
---

# Plan Product Work

Turn unstructured input into durable planning artifacts without silently inventing product decisions.

## Workflow

1. Read `AGENTS.md`, current product docs, relevant code, and `references/artifact-contract.md`.
2. Normalize the input into confirmed requirements, assumptions, open questions, constraints, and non-goals.
3. Ask only questions whose answers materially change scope, data ownership, permissions, or user experience. Continue with clearly labeled assumptions when safe.
4. Create or update `docs/PRD.md`. Preserve stable requirement IDs.
5. Group requirements into independently valuable features under `docs/features/FNNN-slug.md`.
6. Decompose accepted features into verifiable tasks under `docs/tasks/` or the shared backlog.
7. Add a traceability matrix linking requirements, features, tasks, and acceptance tests.
8. Validate links, IDs, contradictions, missing acceptance criteria, and unresolved security or migration decisions.

## Planning rules

- Describe user outcomes before implementation details.
- Keep confirmed facts separate from proposals.
- Never mark an open question as a decision without user confirmation.
- Include offline behavior, synchronization, privacy, permissions, accessibility, migration, and failure handling where relevant.
- Prefer vertical features that deliver observable value.
- Make tasks small enough for one focused implementation and give each a deterministic completion check.
- Do not modify application code unless the user also requests implementation.

## Output

Summarize what was created, the highest-risk assumptions, decisions required from the user, and the recommended first feature. Keep all artifact links relative within `docs/`.
