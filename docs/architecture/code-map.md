# Code map — where things are, and how to change them

**The *where*** to the [architecture overview](overview.md)'s ***why***. Use it before changing anything.

> **Kept honest by tests:** `src/codeMap.test.ts` fails if a source file in `src/` is missing here, if this map names
> a file that doesn't exist, or if a constant/key in the knob table doesn't exist in its file.
> When you add, rename or delete a file or a tuning constant, update this map in the same change.

**Conventions**

- Tests live next to the code they cover: `x.test.ts` beside `x.ts` (so test files aren't listed below).
- Tuning numbers live in an `UPPERCASE` constant object at the top of the module that uses them.

## Files by folder

### `src/`

| File | What it does | Exports |
|---|---|---|
| `src/main.ts` | Entry: mounts the Vue app | — |
| `src/App.vue` | The shell: the Creature World iframe, the screen (nav + `PortfolioPage`), the way back; Escape and focus handling; the dev-only tuning panel (lazy, never in production) | — |
| `src/PortfolioPage.vue` | The portfolio itself: lays out `content.ts` (about, projects, experience, contact); emits `lift` from the Creature World card | — |
| `src/content.ts` | Everything the site says, as data: profile, featured project, the 2018–19 projects, experience, education, contact | `Link`, `Project`, `Job`, `PROFILE`, `FEATURED`, `EARLY_PROJECTS_INTRO`, `EARLY_PROJECTS`, `EXPERIENCE`, `EDUCATION`, `CONTACT` |
| `src/assets/profile.webp` | The profile photo (480 px WebP; imported, so Vite gives it a hashed filename) | — |
| `src/screen.ts` | The screen's look as data (blur, tint, saturate) → CSS custom properties; where Creature World is | `CREATURE_WORLD_URL`, `ScreenLook`, `SCREEN`, `LIMITS`, `clampLook`, `screenStyle` |
| `src/TuningPanel.vue` | Dev-only sliders to tune the screen's look (spike) | — |
| `src/codeMap.test.ts` | Drift test for this map | — |

### Project files (outside `src/`)

| File | What it does |
|---|---|
| `vite.config.ts` | Vite + Vitest config (`base` `/`: a GitHub user site is served from the domain root) |
| `.github/workflows/ci.yml` | CI on every PR and push to `main`: format, lint, typecheck, test, build |
| `.github/workflows/deploy.yml` | Deploy on every push to `main`: the same checks, then publish `dist/` to GitHub Pages (ADR 0002) |
| `.gitignore` | Also keeps the owner's resume PDF (`docs/*resume*.pdf`) out of the public repo |

## To change X, edit Y

| To change… | Edit | In |
|---|---|---|
| How blurred the world is behind the portfolio | `SCREEN.blur` | `src/screen.ts` |
| How dark the screen's tint is | `SCREEN.tint` | `src/screen.ts` |
| How colorful the world shows through | `SCREEN.saturate` | `src/screen.ts` |
| How long lifting / lowering the screen takes | `SCREEN.liftSeconds` | `src/screen.ts` |
| The tuning slider ranges | `LIMITS.blur` | `src/screen.ts` |

## Common changes (recipes)

**Change any text, link or project on the site:** edit `src/content.ts` (layout lives in `src/PortfolioPage.vue`).
`src/content.test.ts` checks links are `https:`/`mailto:` and that no phone number slips in.

**Replace the profile photo:** resize it first (no new dependency — ImageMagick:
`magick photo.png -resize 480x480 -strip -quality 80 src/assets/profile.webp`), then keep the same filename.

**Point at a different Creature World (e.g. a local one):** set `VITE_CREATURE_WORLD_URL` in a `.env.local` file
(e.g. `VITE_CREATURE_WORLD_URL=http://localhost:5173/`) and run `pnpm dev -- --port 5174`.
