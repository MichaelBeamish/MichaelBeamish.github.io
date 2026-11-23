/// <reference types="vitest/config" />
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/  ·  https://vitest.dev/config/
// A GitHub *user* site is served from the domain root (https://michaelbeamish.github.io/), so `base` stays '/'.
export default defineConfig({
  plugins: [vue()],
  test: {
    // Node environment on purpose: pure logic is tested without a DOM.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
