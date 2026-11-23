# Portfolio (michaelbeamish.github.io) — Project Instructions

The owner's portfolio website. Its signature: the live **Creature World** (a separate project,
`MichaelBeamish/creature-world`, deployed at `https://michaelbeamish.github.io/creature-world/`) runs **behind** the
portfolio, seen through a frosted "screen". A nav button lifts the screen and the creatures become interactive; a
button in the top-right corner brings the portfolio back.
The owner is an experienced Vue developer returning after a break (since 2022). Same way of working as Creature World.

## Mentoring (owner preference)
Claude leads development, and the owner wants to grow as a developer along the way.
- When implementing something **important**, briefly explain the concepts, architectural choices, and techniques behind it.
- Focus on what helps the owner **confidently maintain the app** or **discuss it in a technical interview**:
  the *why*, the tradeoffs, the alternatives, and the name of the pattern.
- **Skip trivial code.** Keep explanations short (a few bullets), and put them at the end of a task summary rather than in the middle of the work.

## Read first
- `docs/product/vision.md` — what this site is for, and the screen idea
- `docs/architecture/overview.md` — structure and the *why*
- `docs/architecture/code-map.md` — every file, what it exports, and "to change X, edit Y" (the *where*)
- `docs/tasks/backlog.md` — the next task to work on
- `docs/decisions/` — accepted decisions (ADRs); don't contradict them silently

## Working rules
1. **Plan before code.** Every task gets a short spec (`/plan-task`) approved by the owner before implementation.
2. **One task at a time.** Small, independently testable increments. No drive-by features or refactors.
3. **Ask before major decisions.** New dependencies, architecture changes, or deviations from an ADR → discuss first, then record with `/adr`.
4. **Verify before done.** A task is complete only after `/verify-task` passes its acceptance criteria.
5. **No commits without the owner's explicit approval; nothing reaches GitHub without it; only the owner decides to merge.**
6. **Keep docs current.** Update `docs/progress.md` and the backlog when tasks complete; update architecture docs when
   structure changes. **Check `README.md` on every task**; say "README checked — no change" otherwise.
7. **Verify before you reference.** Before naming a file, function, type or constant, look it up in the code map
   **and** confirm it in the code. New things are marked *new*. Keep the code map in sync (`src/codeMap.test.ts`).
8. **Prefer simple.** Fewer files, fewer abstractions, no speculative generality.
9. **Creature World is not changed from here.** It is embedded as-is (ADR 0001). Any change it needs (e.g. an
   optional embed mode) is planned and made in its own repo, with its own workflow.

## Git workflow (one branch + pull request per task)
The repo is `MichaelBeamish/MichaelBeamish.github.io` (a GitHub user site; ADR 0002). Same flow as Creature World:
1. `/plan-task n` → owner approves. 2. `/implement-task n` → branch `task/<n>-<slug>` from an up-to-date `main`.
3. `/verify-task n`. 4. `/checkpoint` → one approval covers commit + push + PR. 5. CI green → share the link.
6. **The owner merges.** 7. After the merge: switch to `main`, `git pull --ff-only`, delete the local branch.
Never commit directly to `main`. Never amend pushed commits, force-push, or skip hooks unless the owner asks.

## Stack
Vite · TypeScript (strict) · Vue 3 `<script setup>` · Vitest · ESLint + Prettier · pnpm (same as Creature World).

## Code conventions
- Pure logic (no DOM, no Vue) in plain `.ts` modules with tests beside them; components stay thin.
- Accessibility first: real buttons, keyboard and screen-reader friendly, respect "reduce motion", readable contrast.
- Tuning values live in an `UPPERCASE` constant object at the top of the module that uses them.

## Commands
Requires Node >= 22.12 and pnpm (version pinned in `package.json` → `packageManager`).

| Command | Purpose |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server with hot reload (http://localhost:5173) |
| `pnpm build` | Type-check, then production build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Run unit tests once (Vitest) |
| `pnpm typecheck` | Type-check app + config (`vue-tsc -b`) |
| `pnpm lint` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier write / check (Markdown excluded) |

Before marking a task done, `test`, `typecheck`, `lint`, `format:check`, and `build` must all pass.
