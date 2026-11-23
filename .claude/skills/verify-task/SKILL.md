---
name: verify-task
description: Verify an implemented task against its acceptance criteria, then update the backlog and progress log. Use after /implement-task, before /checkpoint.
---

# Verify a task

1. Confirm you are on the task branch (`task/<n>-…`), not `main`.
2. Run every check that exists (see Commands in `CLAUDE.md`): tests, type-check, lint, format, build.
3. Walk through each acceptance criterion and mark it ✅ / ❌ with evidence (test name, command output, or screenshot/visual check).
   - For visual criteria, run the app (use the `run` skill or ask the owner to look) — don't assume.
   - If the owner already runs `pnpm dev`, reuse it; only stop processes you started yourself.
4. Check `git status`/`git diff` for stray changes outside the task's scope.
5. Report results to the owner honestly, including failures.
6. If everything passes and the owner agrees:
   - Set the task to `done` in `docs/tasks/backlog.md`.
   - Add a dated entry to the top of `docs/progress.md` (what was done, how verified, anything learned).
   - Update `docs/architecture/overview.md` if the structure changed.
   - **Check `docs/architecture/code-map.md`**: new/renamed/removed files mapped; new or changed tuning constants in
     the "to change X, edit Y" table; recipes still accurate. (`src/codeMap.test.ts` enforces files and knobs.)
   - **Check `README.md`** (the repo's public front page): does this task change anything it describes — features,
     controls/URL options (`?debug`, `?seed=`, keys), commands, requirements, the architecture summary, links, or the
     status/roadmap? Update it if so; otherwise state "README checked — no change" in the report. Verify any new links resolve.
7. Suggest `/checkpoint`. Do not commit. CI on the pull request is the final gate before the owner merges.
