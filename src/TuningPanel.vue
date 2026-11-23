<script setup lang="ts">
// Dev-only (task #1 spike): sliders to find the screen's look together, plus the values to copy into SCREEN.
import { computed } from 'vue'
import { LIMITS, type ScreenLook } from './screen'

const look = defineModel<ScreenLook>({ required: true })
const keys = Object.keys(LIMITS) as (keyof ScreenLook)[]
const asCode = computed(
  () => `blur: ${look.value.blur}, tint: ${look.value.tint}, saturate: ${look.value.saturate}`,
)

function set(key: keyof ScreenLook, event: Event) {
  look.value = { ...look.value, [key]: Number((event.target as HTMLInputElement).value) }
}
</script>

<template>
  <aside class="tuning" aria-label="Screen tuning (dev only)">
    <strong>Screen look (dev)</strong>
    <label v-for="key in keys" :key="key">
      <span>{{ key }} {{ look[key] }}</span>
      <input
        type="range"
        :min="LIMITS[key].min"
        :max="LIMITS[key].max"
        :step="LIMITS[key].step"
        :value="look[key]"
        @input="set(key, $event)"
      />
    </label>
    <code>{{ asCode }}</code>
  </aside>
</template>

<style scoped>
.tuning {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 30;
  display: grid;
  gap: 6px;
  width: 240px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #dfe8f0;
  font:
    12px/1.3 ui-monospace,
    monospace;
}
label {
  display: grid;
  gap: 2px;
}
code {
  color: #ffd98a;
  white-space: normal;
}
</style>
