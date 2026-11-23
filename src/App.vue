<script setup lang="ts">
// The portfolio over the live Creature World (task #1 spike). While the screen is up, the world shows through but
// can't be touched (the screen catches the pointer; the iframe is `inert` for keyboard and screen-reader users).
// "Meet the residents" lifts it; "Back to portfolio" (top-right) brings it back — so does Escape.
// The screen is hidden (v-show), not removed, so coming back keeps your scroll position and focus.
import {
  defineAsyncComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue'
import PortfolioPage from './PortfolioPage.vue'
import { CREATURE_WORLD_URL, SCREEN, screenStyle, type ScreenLook } from './screen'

// Dev only: `import.meta.env.DEV` is replaced by `false` in production builds, so the whole dynamic import is dead
// code there and the tuning panel never reaches the bundle.
const TuningPanel = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./TuningPanel.vue'))
  : undefined

const screenUp = ref(true)
const look = ref<ScreenLook>({ blur: SCREEN.blur, tint: SCREEN.tint, saturate: SCREEN.saturate })
const liftButton = useTemplateRef<HTMLButtonElement>('lift')
const backButton = useTemplateRef<HTMLButtonElement>('back')
/** The button that lifted the screen (nav or The Ink Tank card) — focus goes back to it. */
let liftedFrom: HTMLElement | null = null

async function lift() {
  liftedFrom = document.activeElement instanceof HTMLElement ? document.activeElement : null
  screenUp.value = false
  await nextTick()
  backButton.value?.focus() // keyboard users land on the way back
}

async function lower() {
  screenUp.value = true
  await nextTick()
  ;(liftedFrom ?? liftButton.value)?.focus({ preventScroll: true })
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && !screenUp.value) void lower()
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <iframe
    class="world"
    :src="CREATURE_WORLD_URL"
    title="The Ink Tank — a living tide pool of curious creatures"
    :inert="screenUp || undefined"
    :tabindex="screenUp ? -1 : 0"
  />

  <Transition name="screen">
    <div v-show="screenUp" class="screen" :style="screenStyle(look)">
      <span id="top"></span>
      <header class="nav">
        <a href="#top" class="name display">Michael Beamish</a>
        <nav aria-label="Main">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <button ref="lift" type="button" class="meet" @click="lift">
          Meet the residents <span class="octo" aria-hidden="true">🐙</span>
        </button>
      </header>
      <PortfolioPage @lift="lift" />
    </div>
  </Transition>

  <Transition name="back">
    <button v-if="!screenUp" ref="back" type="button" class="back" @click="lower">
      ← Back to portfolio
    </button>
  </Transition>

  <TuningPanel v-if="TuningPanel && screenUp" v-model="look" />
</template>

<style>
/* Fredoka (SIL Open Font License, see assets/fonts/OFL.txt): a rounded, friendly face for headings only.
   Self-hosted; `swap` shows the system font at once and switches when Fredoka arrives (no invisible text). */
@font-face {
  font-family: 'Fredoka';
  font-style: normal;
  font-weight: 500 700;
  font-display: swap;
  src: url('./assets/fonts/fredoka-latin.woff2') format('woff2');
}

html,
body,
#app {
  margin: 0;
  height: 100%;
  background: #0e2a3a;
  font-family: system-ui, sans-serif;
}

h1,
h2,
h3,
h4,
.display {
  font-family: 'Fredoka', system-ui, sans-serif;
  font-weight: 600;
  letter-spacing: 0.01em;
}

/* The 🐙 in "Meet the residents" waves when its button is hovered or focused. */
.octo {
  display: inline-block;
  transform-origin: 50% 80%;
}
button:hover .octo,
button:focus-visible .octo {
  animation: octo-wiggle 0.8s ease-in-out;
}
@keyframes octo-wiggle {
  0%,
  100% {
    transform: rotate(0);
  }
  20% {
    transform: rotate(-14deg);
  }
  45% {
    transform: rotate(12deg);
  }
  70% {
    transform: rotate(-6deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  button:hover .octo,
  button:focus-visible .octo {
    animation: none;
  }
}
</style>

<style scoped>
.world {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* The screen: frosted glass with a dark tint; it covers (and catches) everything while it's up. */
.screen {
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow-y: auto;
  color: #eef3f7;
  background: rgba(8, 14, 26, var(--screen-tint));
  backdrop-filter: blur(var(--screen-blur)) saturate(var(--screen-saturate));
  /* Anchor jumps and keyboard focus stop below the sticky nav, never under it (WCAG 2.4.11). */
  scroll-padding-top: 108px;
}
.screen-enter-active,
.screen-leave-active {
  transition:
    opacity var(--screen-lift) ease,
    backdrop-filter var(--screen-lift) ease;
}
.screen-enter-from,
.screen-leave-to {
  opacity: 0;
  backdrop-filter: blur(0) saturate(1);
}

/* The nav stays at the top of the screen while you scroll: see-through at the very top, then a solid bar in the
   screen's own color, so text scrolling under it never ghosts through. (No backdrop-filter: inside the already
   frosted .screen, a nested one has no backdrop to blur — a known browser limitation.) */
.nav {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px 24px;
  padding: 18px 32px;
  border-bottom: 1px solid transparent;
}
/* Tied to how far the screen has scrolled (scroll-driven animation): over the first 80 px the bar fades in.
   Browsers without support get the bar from the start. */
@supports (animation-timeline: scroll()) {
  .nav {
    animation: nav-frost linear both;
    animation-timeline: scroll();
    animation-range: 0 80px;
  }
}
@supports not (animation-timeline: scroll()) {
  .nav {
    background-color: rgb(9, 18, 31);
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }
}
@keyframes nav-frost {
  from {
    background-color: rgba(9, 18, 31, 0);
    border-bottom-color: transparent;
  }
  to {
    background-color: rgb(9, 18, 31);
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }
}
.nav .name {
  margin-right: auto;
  font-weight: 700;
  letter-spacing: 0.02em;
  opacity: 1;
  text-decoration: none;
}
.nav nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 22px;
}
.nav a {
  color: inherit;
  text-decoration: none;
  opacity: 0.85;
}
.nav a:hover,
.nav a:focus-visible {
  opacity: 1;
  text-decoration: underline;
}
.meet,
.back {
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.meet:hover,
.meet:focus-visible,
.back:hover,
.back:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  outline: 2px solid #ffe9b0;
  outline-offset: 2px;
}
/* The way back: the only thing left of the portfolio while the creatures are out. */
.back {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 20;
  color: #eef3f7;
  background: rgba(8, 14, 26, 0.65);
}
.back-enter-active,
.back-leave-active {
  transition: opacity 0.4s ease;
}
.back-enter-from,
.back-leave-to {
  opacity: 0;
}

/* Phones: two compact rows — name + "Meet the residents", then the section links. */
@media (max-width: 600px) {
  .screen {
    scroll-padding-top: 112px;
  }
  .nav {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'name meet'
      'links links';
    gap: 8px 12px;
    padding: 10px 16px 8px;
  }
  .nav .name {
    grid-area: name;
  }
  .nav nav {
    grid-area: links;
    gap: 4px 18px;
    font-size: 0.92rem;
  }
  .nav .meet {
    grid-area: meet;
    padding: 6px 12px;
    font-size: 0.92rem;
  }
}

/* Reduced motion: a plain, quick fade — no blur animation. */
@media (prefers-reduced-motion: reduce) {
  .screen-enter-active,
  .screen-leave-active {
    transition: opacity 0.25s ease;
  }
  .screen-enter-from,
  .screen-leave-to {
    backdrop-filter: blur(var(--screen-blur)) saturate(var(--screen-saturate));
  }
}
</style>
