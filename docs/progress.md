# Progress Log

Newest first. One entry per verified task or significant decision.

## 2026-11-22 — Task #4 done: 2019 demo videos and screenshots
- The owner set the four 2019 demo videos to Unlisted (and renamed the channel). Each 2018–19 card now links to its
  video ("Watch the demo (m:ss)") and shows a screenshot of the app — the video's own thumbnail, 640 px WebP
  (6–45 KB), stored in `src/assets/2019/` rather than loaded from YouTube (no third-party requests, can't break).
- Linked, not embedded: four YouTube players would load a lot of third-party code on every visit.
- A friend's name visible in the Love Letter screenshot is blurred (in four spots); the video itself still shows it.
- Verified: 11 tests (new: every screenshot has alt text), all five checks; Chrome at 1280 px and 375 px — images
  load lazily into reserved 16:9 frames; all four video links resolve.

## 2026-11-22 — Task #3 done: the portfolio content
- The real portfolio on the screen: About (photo, the Microchip story, the career break said plainly, back and
  building), Projects (Creature World with its own "Meet the residents" button; **"Before my first job · 2018–19"**:
  Love Letter, Battleship, Backpack App, Satellite Tracker), Experience + Education, Contact (email, LinkedIn,
  GitHub — **no phone number**, enforced by `content.test.ts`).
- Structure: the words live in `src/content.ts` (data), the layout in `src/PortfolioPage.vue`; `App.vue` stays the
  screen + world shell. The screen is now hidden with `v-show`, so coming back keeps scroll position, and focus
  returns to whichever button lifted it. The tuning panel is a lazy dev-only import — gone from production.
- Photo: 2.4 MB PNG → 25 KB WebP (ImageMagick, no new dependency), imported so Vite hashes its filename.
- 2019 findings: the old live demos no longer run (blank / empty map) and the demo videos are private, so the cards
  link to code only (task #4 adds the videos if the owner unlists them). The old thumbnails were stock photos and
  game art, so they were not reused. `portfolio-2019` was made private (it had the old phone number and resume).
- Verified: 10 tests, all five checks; Chrome driven over the DevTools Protocol at 1280 px and 375 px — tab order,
  lift from the card, Escape, scroll + focus restored, tuning panel in dev only; every link checked (LinkedIn answers
  bots with 999). Owner read and approved the copy.

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
