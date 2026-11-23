# Architecture overview

The *why*. For the *where*, see the [code map](code-map.md).

## The layers on the page (back to front)
1. **Creature World** — a full-screen `<iframe>` of the deployed site (ADR 0001). It runs on its own; this app never
   reaches into it.
2. **The screen** — a fixed, frosted layer (`backdrop-filter: blur() saturate()` + a dark tint) holding the whole
   portfolio. Its look is three numbers (`ScreenLook`: blur, tint, saturate) turned into CSS custom properties by a
   pure function (`screenStyle`), so it's easy to tune and test.
3. **The way back** — while the screen is lifted, only a "← Back to portfolio" button (top-right) remains.

## Interaction
- **Screen up:** the screen covers and catches the pointer, so the creatures never see the cursor (they just live
  their calm idle life). The iframe is `inert` and `tabindex="-1"`: no keyboard or screen-reader access to it.
- **"Meet the residents 🐙"** lifts the screen (a fade + un-blur; reduced motion: a quick fade) and moves focus to the
  way back. The creatures become fully interactive.
- **"← Back to portfolio"** (or **Escape**) brings it back and returns focus to the nav button.

## Spike tooling
A dev-only `TuningPanel` (shown only under `pnpm dev`) has sliders for the screen's look and prints the values to
copy into `SCREEN`.
