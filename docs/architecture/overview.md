# Architecture overview

The *why*. For the *where*, see the [code map](code-map.md).

## The layers on the page (back to front)
1. **Creature World** — a full-screen `<iframe>` of the deployed site (ADR 0001). It runs on its own; this app never
   reaches into it.
2. **The screen** — a fixed, frosted layer (`backdrop-filter: blur() saturate()` + a dark tint) holding the whole
   portfolio. Its look is three numbers (`ScreenLook`: blur, tint, saturate) turned into CSS custom properties by a
   pure function (`screenStyle`), so it's easy to tune and test. The portfolio on it is `PortfolioPage`, which only
   lays out `content.ts` — the words live in data, the layout in the component.
3. **The way back** — while the screen is lifted, only a "← Back to portfolio" button (top-right) remains.

## Interaction
- **Screen up:** the screen covers and catches the pointer, so the creatures never see the cursor (they just live
  their calm idle life). The iframe is `inert` and `tabindex="-1"`: no keyboard or screen-reader access to it.
- **"Meet the residents 🐙"** (in the nav, and on the Creature World card) lifts the screen (a fade + un-blur; reduced motion: a quick fade) and moves focus to the
  way back. The creatures become fully interactive.
- **"← Back to portfolio"** (or **Escape**) brings it back and returns focus to the button that lifted it. The screen
  is only hidden (`v-show`) while lifted, so the reader comes back to the same scroll position.

## Deploy
This repo is the GitHub *user site*: every merge to `main` is checked and published to
`https://michaelbeamish.github.io/` by `.github/workflows/deploy.yml` (ADR 0002). The workflow also passes the latest
commit's date to the build (`VITE_LAST_UPDATED`), which the footer shows as "Last updated". Creature World deploys itself to
`/creature-world/` on the same origin.

## Look
The nav sticks to the top of the screen; a scroll-driven animation (`animation-timeline: scroll()`) fades in its
solid bar over the first 80 px. `.screen`'s `scroll-padding-top` keeps anchor jumps and keyboard focus below it.
Headings use Fredoka (self-hosted, `font-display: swap`); body text is the system font. Cards glow softly on hover and
keyboard focus (`:focus-within`); sections rise into view with a CSS scroll-driven animation (`animation-timeline:
view()`, inside `@supports`). Everything that moves stops under "reduce motion".

## Dev tooling
A dev-only `TuningPanel` (shown only under `pnpm dev`) has sliders for the screen's look and prints the values to
copy into `SCREEN`. It's imported lazily behind `import.meta.env.DEV`, so production builds leave it out entirely.
