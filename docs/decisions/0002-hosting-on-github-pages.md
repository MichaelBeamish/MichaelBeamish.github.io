# 0002 — Host as the GitHub user site, deployed by GitHub Actions

- **Status:** Accepted
- **Date:** 2026-11-22

## Context
The portfolio should live at `https://michaelbeamish.github.io/`, next to Creature World (`/creature-world/`, its
ADR 0005). That root URL belongs to the repo named `MichaelBeamish.github.io` — a GitHub *user site*. A repo with
that name already held the owner's 2019 portfolio (static HTML, published from its `master` branch).

## Decision
- **The 2019 repo is renamed `portfolio-2019` and archived** (read-only; nothing deleted). Renaming it ended its Pages
  site. Its projects may come back as a section of the new portfolio (task #3).
- **This project is the new public `MichaelBeamish/MichaelBeamish.github.io`**, set up like Creature World: squash
  merges only, branches deleted after merge, and the "Protect main" ruleset (PR required, both CI checks required, no
  force-push or deletion).
- **Deploy with GitHub Actions** (`.github/workflows/deploy.yml`) on every push to `main`: the same five checks as CI,
  then `upload-pages-artifact` + `deploy-pages`. Pages publishes from Actions, not from a branch.
- **Vite `base` stays `/`**: a user site is served from the domain root.

## Consequences
- ➕ Same setup as Creature World: one workflow to learn, the owner merges, only checked code goes live.
- ➕ Same origin as Creature World, so the two could talk later (`postMessage`, ADR 0001).
- ➖ No per-PR preview links; changes are checked locally first.
- ➖ The 2019 site is offline; it can be brought back (unarchive, re-enable Pages) if wanted.
