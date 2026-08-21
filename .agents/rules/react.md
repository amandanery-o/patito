---
description: React UI and state rules for Patito application code
paths:
  - 'src/**/*.jsx'
  - 'src/**/*.js'
---

# React rules

- Keep components focused and move reusable domain logic into hooks or utilities.
- Preserve immutable state updates; never mutate nested progress objects in place.
- Use semantic HTML and accessible names for interactive controls.
- Keep interface copy in Brazilian Portuguese and suitable for fourth-grade students.
- Preserve product terminology: **Agenda** in navigation and **Agenda escolar** on the page; do not label the whole area as **Provas**.
- Add or update Vitest tests for behavior changes and Playwright coverage for critical journeys.
- Preserve the no-Supabase offline path.
