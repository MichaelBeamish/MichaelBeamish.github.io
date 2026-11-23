# Progress Log

Newest first. One entry per verified task or significant decision.

## 2026-11-22 — Task #1 done: the spike (the screen over Creature World)
- The portfolio on a frosted, tinted screen over the live Creature World iframe; "Meet the residents 🐙" lifts it,
  "← Back to portfolio" (top-right) or Escape brings it back, focus follows; reduced motion gets a plain fade.
- **The feel works.** The owner tried it with the dev tuning panel and kept the starting look:
  `SCREEN` = blur 8, tint 0.55, saturate 0.85, liftSeconds 0.7.
- Verified: test, typecheck, lint, format:check and build all pass; acceptance criteria checked against `App.vue`
  (screen catches the pointer, iframe `inert` + `tabindex="-1"` while up) and by the owner's hands-on use.
- Still local only — next is task #2 (GitHub repo, CI, deploy).

## 2026-11-22 — Project set up
- New project for the portfolio, set up with everything that worked for Creature World: CLAUDE.md (working rules,
  mentoring), the five skills (`plan-task`, `implement-task`, `verify-task`, `checkpoint`, `adr`), the docs structure
  (vision, backlog, progress, ADRs, architecture overview + code map with its drift test), the same tooling (Vite,
  Vue 3, TypeScript strict, Vitest, ESLint, Prettier, pnpm — same versions, same lockfile), the CI workflow and the PR
  template.
- **ADR 0001:** embed Creature World with an iframe — one Creature World, never copied or forked.
