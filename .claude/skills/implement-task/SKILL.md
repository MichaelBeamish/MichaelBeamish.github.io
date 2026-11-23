---
name: implement-task
description: Implement one approved, planned backlog task on its own branch, in small steps following CLAUDE.md conventions. Use after /plan-task has been approved.
---

# Implement a task

1. Confirm the task is `planned` and its spec was approved in this conversation. If not, run `/plan-task` first.
2. Create the task branch from an up-to-date `main` (uncommitted backlog edits carry over):
   `git switch main && git pull --ff-only && git switch -c task/<n>-<short-slug>`.
   If the branch already exists (resuming work), switch to it instead.
3. Set the task status to `in-progress` in `docs/tasks/backlog.md`.
4. Implement in small steps; after each meaningful step, run the relevant tests/type-check.
   - Write tests alongside pure logic (`x.test.ts` beside `x.ts`).
   - Keep components thin: pure logic lives in plain `.ts` modules (no DOM, no Vue).
5. Stay inside the spec. If something outside it is needed (new dependency, design change, extra scope), stop and ask.
6. Briefly explain notable techniques or modern practices used, for the owner's learning (see CLAUDE.md → Mentoring).
7. When done, hand off to `/verify-task`. Do not commit.
