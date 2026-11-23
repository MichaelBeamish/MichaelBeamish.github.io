# Backlog

Status: `todo` · `planned` · `in-progress` · `done` · `dropped`. One task at a time (CLAUDE.md).

| # | Task | Status |
|---|---|---|
| 1 | Spike: the screen over Creature World | done |
| 2 | GitHub repo, CI and auto-deploy to michaelbeamish.github.io | done |
| 3 | Portfolio content: about, projects, contact | todo |

### 1. Spike: the screen over Creature World — approved 2026-11-22
Answer one question cheaply: **does the feel work?** A full-screen iframe of the live Creature World; a frosted,
tinted screen on top with placeholder portfolio content and a nav with **"Meet the residents 🐙"**; lifting it makes
the world interactive; **"← Back to portfolio"** (top-right) brings it back. A dev-only tuning panel (blur, tint,
saturate) to find the look together. Local only — no GitHub repo, no deploy.
- **Accept:** the world shows through but can't be touched while the screen is up (pointer and keyboard); lifting
  and lowering work (button, Escape; focus moves sensibly); reduced motion: a plain fade; the owner tries it and
  either approves the look (values noted in `SCREEN`) or asks for changes; all checks pass.

### 2. GitHub repo, CI and auto-deploy
Create the public repo `MichaelBeamish/michaelbeamish.github.io` (a GitHub *user site*: served at
`https://michaelbeamish.github.io/`, next to `/creature-world/`), protect `main` like Creature World, CI on PRs, and
deploy to Pages on every merge (same pattern as Creature World's ADR 0005). Needs the owner's OK before creating
anything on GitHub.
- **Approved 2026-11-22.** The name was taken by the 2019 portfolio: renamed `portfolio-2019` and archived (ADR 0002).

### 3. Portfolio content
The real portfolio on the screen: about, projects (Creature World first), contact. To plan with the owner.
- **Source:** the owner's resume (`docs/*resume*.pdf`, git-ignored). Contact: email + LinkedIn, no phone number.
- **Owner's wish:** a section for the **2019 projects** (from the archived `MichaelBeamish/portfolio-2019` and the
  projects it linked) — fun to show what the owner built before AI and before their first software job.
