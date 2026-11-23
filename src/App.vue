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
      <header class="nav">
        <span class="name">Michael Beamish</span>
        <nav aria-label="Main">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <button ref="lift" type="button" class="meet" @click="lift">Meet the residents 🐙</button>
        </nav>
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
html,
body,
#app {
  margin: 0;
  height: 100%;
  background: #0e2a3a;
  font-family: system-ui, sans-serif;
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

.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px 24px;
  padding: 20px 32px;
}
.name {
  font-weight: 700;
  letter-spacing: 0.02em;
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

@media (max-width: 600px) {
  .nav {
    padding: 16px 20px;
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
