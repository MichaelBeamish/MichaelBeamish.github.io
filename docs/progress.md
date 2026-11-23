# Progress Log

Newest first. One entry per verified task or significant decision.

## 2026-11-23 — Task #7 done: the nav stays at the top
- The nav is `position: sticky` inside the scrolling `.screen`: see-through at the top, then a solid bar in the
  screen's color fades in over the first 80 px (scroll-driven animation, `animation-timeline: scroll()`; browsers
  without it get the bar from the start). "Michael Beamish" links back to the top.
- Phones: two compact rows (name + "Meet the residents", then the links) — 81 px instead of ~120 px. "Meet the
  residents" moved out of `<nav>` (it's a button, not navigation).
- `scroll-padding-top` on `.screen` keeps anchor jumps and keyboard focus below the nav (WCAG 2.4.11, Focus Not
  Obscured); it replaces the sections' `scroll-margin-top`.
- **Learned:** a `backdrop-filter` nested inside an element that already has one (our frosted `.screen`) has no
  backdrop to blur — the computed style says `blur(12px)` but nothing blurs. And a 94%-opaque bar still lets white
  text ghost through; the bar is fully opaque.
- Verified: all five checks; Chrome over CDP at 1280 and 375 px — nav pinned at top while scrolled, every nav jump
  lands its heading 13–42 px below the nav, the name scrolls to 0, Shift+Tab never leaves focus under the nav; a
  forced solid-red bar confirmed the nav paints above the content; lift/Escape/focus return unchanged.
- Backlog: tasks #8 (contact & links) and #9 ("Last updated" footer) added.

## 2026-11-22 — Task #6 done: the look
- **Fredoka** for headings (self-hosted 30 KB Latin subset + its OFL license; `font-display: swap`); body text stays
  the system font.
- **Bioluminescent touches:** cards lift 2 px and glow cyan on hover *and* keyboard focus (`:focus-within`); section
  headings get a glowing cyan-to-gold underline; the featured card has a faint warm glow.
- **Gentle reveal:** sections rise into view with a pure-CSS scroll-driven animation (`animation-timeline: view()`),
  inside `@supports` — progressive enhancement, no JavaScript.
- **The 🐙 wiggles** on hover/focus of either "Meet the residents" button; it's `aria-hidden`, so screen readers say
  "Meet the residents".
- The reading panel was dropped: the owner's darker screen look (task #5) already fixed readability.
- Verified: all five checks; Chrome over CDP, with and without emulated "reduce motion": font applied to headings
  only; mid-reveal opacity 0.14 → none under reduce; hover lift + glow → glow only under reduce; wiggle → none under
  reduce; accessible button names.

## 2026-11-22 — Task #5 done: The Ink Tank, the Grumpy challenge, the 2018–19 section collapsed
- On the portfolio, Creature World is now **The Ink Tank** (owner's pick): the card, the About text, the iframe's
  title and the README. The project, its repo and URL keep their name; its own tab title still says "Creature World"
  (that would change in its repo, not here — ADR 0001).
- The card invites: "Challenge: Cheer up the grumpy one. (They don't love being shaken.)" — it's real: the rose
  turns the Grumpy into a Friendly (`cheerUp.ts` in Creature World). "Play fetch" is gone (you don't play it with them).
- **New screen look** (owner, for readability): `SCREEN` = blur 17.5, tint 0.77, saturate 0.85 (was 8 / 0.55 / 0.85).
- The 2018–19 projects sit in one native `<details>`, **closed by default**: "Before my first software job ·
  Galvanize student projects, 2018–19 · Show 4 projects".
- "I'd consider relocating" instead of "happy to relocate".
- Verified: all five checks; Chrome at 1280 px and 375 px — closed on load, Enter opens it, Show/Hide swaps, focus
  ring visible; lift and return unchanged.

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
