# Progress Log

Newest first. One entry per verified task or significant decision.

## 2026-11-22 — Task #2 done: GitHub repo, CI and auto-deploy
- **The 2019 portfolio** held the user-site name: renamed `MichaelBeamish/portfolio-2019` and archived (renaming
  ended its Pages site). Nothing deleted; its projects are wanted as a section in task #3.
- **New public repo** `MichaelBeamish/MichaelBeamish.github.io`, set up like Creature World: squash only, branches
  deleted on merge, "Protect main" ruleset (PR + both CI checks required, no force-push/deletion), Pages from Actions.
- `deploy.yml` (Creature World's, unchanged apart from the ADR number); the resume is git-ignored. **ADR 0002.**
- Lesson: a repo named `<user>.github.io` gets Pages turned on *from the branch* the moment it's pushed — switch it to
  Actions right away (an unbuilt Vite `index.html` is a blank page). We cancelled that first build.
- Verified: all five checks locally, CI green on `main` and the PR; the live site is checked after the merge.

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
