---
description: Security and migration rules for Supabase-related changes
paths:
  - "supabase/**"
  - "src/lib/supabase.js"
  - "src/contexts/AuthContext.jsx"
  - "src/components/Leaderboard.jsx"
---

# Supabase rules

- Enable RLS on every student-facing table and define least-privilege policies.
- Scope reads by authenticated user, guardian relationship, or class membership.
- Never place a service-role key in browser code or a `VITE_*` variable.
- Design schema changes for idempotent application and document rollout steps.
- Keep offline behavior functional when Supabase is unavailable.
- Add tests for client-side sync logic and manually review every RLS change.
