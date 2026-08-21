---
description: Mandatory editorial and UX rules for study materials and questions
paths:
  - 'scripts/editorial/**'
  - 'src/data/**'
  - 'src/components/TopicTrail.jsx'
  - 'src/components/ContentReview.jsx'
  - 'src/components/SubjectCard.jsx'
  - 'docs/sources/**'
---

# Editorial content rules

- Follow `docs/operations/next-subject-playbook.md` for every new subject or assessment.
- Never generate or publish questions before the authorized source and assessment scope are documented.
- Publish a complete assessment unit: source metadata, child-friendly summary, key ideas, at least 60 approved questions, source references, and auditable approval.
- Keep authoring and independent review as separate logical roles. Unresolved source doubts fail closed.
- Never commit book text, protected images, credentials, cookies, student sessions, or editorial secrets.
- In the student UI, keep **Ler material** and **Praticar 30 questões** explicit within one assessment card.
- Do not repeat chapters already grouped by P1/P2 as competing navigation cards.
- Count only published assessment materials in student-facing progress; never expose internal topic counts.
- Update PRD, features, backlog, traceability, unit tests, and E2E journeys with each publication.
