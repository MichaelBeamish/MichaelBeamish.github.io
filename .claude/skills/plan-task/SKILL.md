---
name: plan-task
description: Turn a backlog task into a short implementation spec and get the owner's approval before any code is written. Use when starting a new task, e.g. "/plan-task 3".
---

# Plan a task

1. Read `CLAUDE.md`, `docs/tasks/backlog.md`, `docs/architecture/overview.md`, and any relevant ADRs.
2. Identify the task (by number from the argument, or the first `todo` task). Confirm earlier tasks it depends on are `done`.
3. Inspect the current code that the task touches. Start from `docs/architecture/code-map.md` (where things are,
   "to change X, edit Y"), then **confirm every file and symbol you will mention by searching/reading the code** —
   never from memory.
4. Write a spec in chat (do not create files) with:
   - **Goal** — one sentence.
   - **Files** — to create / modify, with the exact functions/types/constants touched; each confirmed to exist in
     the code, or marked *new*.
   - **Approach** — 3–8 bullets; mention any concept worth teaching the owner.
   - **Acceptance criteria** — copied from the backlog, refined to be concrete and testable.
   - **Tests** — what will be unit-tested; what is checked visually.
   - **Open questions / decisions** — anything needing the owner (new deps, deviations from ADRs).
5. Keep it short. Stop and ask for approval. Do not write code.
6. On approval, set the task's status to `planned` in the backlog.
