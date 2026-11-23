<script setup lang="ts">
// Small inline SVG icons (task #8) — no icon library. They take the text color (`currentColor`), sit on the text's
// baseline at 1em, and are hidden from screen readers: the link or button text next to them says what they do.
// GitHub mark: Simple Icons (CC0, public domain). The rest are simple shapes drawn here; the "in" mark is drawn
// here too (LinkedIn's logo was removed from Simple Icons at LinkedIn's request).
import type { IconName } from './content'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-if="name === 'github'"
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
    <path
      v-else-if="name === 'linkedin'"
      fill="currentColor"
      fill-rule="evenodd"
      d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM5.5 9.5h3v9h-3zM7 4.9a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 1 0 0-3.2zM10.5 9.5h2.9v1.3c.5-.9 1.6-1.6 3.1-1.6 2.7 0 3.5 1.7 3.5 4.3v5h-3v-4.5c0-1.2-.3-2.2-1.5-2.2s-1.9.9-1.9 2.2v4.5h-3.1z"
    />
    <g
      v-else
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="name === 'mail'">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 7 12 13l8.5-6" />
      </template>
      <template v-else-if="name === 'play'">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
      </template>
      <template v-else-if="name === 'open'">
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
      </template>
      <template v-else-if="name === 'copy'">
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
      </template>
      <path v-else-if="name === 'check'" d="M5 12.5l4.5 4.5L19 7.5" />
    </g>
  </svg>
</template>

<style scoped>
.icon {
  flex: none;
  vertical-align: -0.15em;
}
</style>
