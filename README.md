# Michael Beamish — portfolio

My portfolio site — with a living secret behind it. The page sits on a frosted screen in front of
[Creature World](https://github.com/MichaelBeamish/creature-world), a tide pool of curious, furry creatures. Lift the
screen ("Meet the residents 🐙") and they're all yours; "← Back to portfolio" brings the page back.

**Status:** early spike, live at **https://michaelbeamish.github.io/** (deployed on every merge to `main`).

## Try it

Requires Node ≥ 22.12 and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:5173 — a dev-only panel tunes the screen's look
```

| Command                        | Purpose                         |
| ------------------------------ | ------------------------------- |
| `pnpm test`                    | Unit tests (Vitest)             |
| `pnpm typecheck` / `pnpm lint` | Type-check (`vue-tsc`) / ESLint |
| `pnpm format:check`            | Prettier                        |
| `pnpm build`                   | Type-check + production build   |

## How it works

Creature World is embedded as-is in a full-screen iframe ([ADR 0001](docs/decisions/0001-embed-creature-world.md));
the portfolio lives on a frosted layer on top. Details: [architecture overview](docs/architecture/overview.md) ·
[code map](docs/architecture/code-map.md).

Built with [Claude Code](https://claude.com/claude-code), with the same plan → implement → verify → PR workflow as
Creature World (see `CLAUDE.md` and `.claude/skills/`).
