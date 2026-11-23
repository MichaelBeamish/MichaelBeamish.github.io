# Vision

Michael Beamish's portfolio — with a secret.

Behind the portfolio lives **Creature World**: a tide pool of furry, octopus-like creatures with personalities
(a separate project — https://github.com/MichaelBeamish/creature-world). The portfolio sits on a frosted, tinted
**screen** in front of it: you can see something alive moving behind the page, but it isn't immediately obvious it can
be touched — and while the screen is up, it can't.

A button in the navigation (**"Meet the residents 🐙"**) lifts the screen: suddenly the creatures are right there, and
they notice you. The only thing left of the portfolio is a small **"← Back to portfolio"** button in the top-right
corner, which brings the screen back.

## Principles
1. **The portfolio comes first.** Content is readable and accessible on the screen; the creatures are atmosphere, not
   a distraction.
2. **A reward for curiosity.** The world behind is noticeable, not loud. Lifting the screen should feel magical.
3. **One Creature World.** It's embedded as-is from its own project, never copied or forked (ADR 0001).
4. **Accessible.** Real buttons, keyboard and screen-reader friendly, honors "reduce motion".

## Plan
1. **Spike** (task #1): the screen over the live world, with dev-only sliders to tune the look. Local only.
2. If the feel works: the GitHub repo, CI and auto-deploy to `https://michaelbeamish.github.io/`.
3. The portfolio itself: about, projects (Creature World first), contact.
