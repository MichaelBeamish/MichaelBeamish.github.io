# 0001 — Embed Creature World with an iframe (don't copy or fork it)

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The portfolio's background is the live Creature World, behind a frosted "screen" that can be lifted. Creature World
is its own project with its own workflow, deployed at `https://michaelbeamish.github.io/creature-world/`. The owner
doesn't want to change it for the portfolio. Options: copy it into this repo, keep a long-lived branch of it, publish
it as a package / web component, or embed the deployed site in an `<iframe>`.

## Decision
- **Embed the deployed Creature World in a full-screen `<iframe>`** (`CREATURE_WORLD_URL` in `src/screen.ts`).
- The screen is a separate layer on top: while it's up it catches the pointer and the iframe is `inert` (no keyboard
  or screen-reader access); lifting it makes the world fully interactive.
- Anything Creature World ever needs for embedding (e.g. an optional `?embed` mode) is made **in its own repo**,
  through its own workflow — never forked here.

## Consequences
- ➕ One Creature World: improvements there show up here automatically; no "fork tax".
- ➕ Zero changes to Creature World; complete isolation (its own JS, CSS, audio and errors).
- ➕ Once this site is the user site (`michaelbeamish.github.io`), both share an origin — they could talk later
  (`postMessage`), e.g. to pause the world while it's hidden.
- ➖ An iframe is a second page: a little more memory, and the world can't be styled from here.
- ➖ The portfolio depends on Creature World being deployed (it is, on every merge there).
- Alternative for later: a package / web component — tighter integration, but it would require changing Creature
  World into a library.
