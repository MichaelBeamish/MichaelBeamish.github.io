// ESLint "flat config" (ESLint 9+): one array of config objects, applied in order.
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist/', 'coverage/']),

  js.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    // TypeScript (vue-tsc) already reports undefined names; ESLint's version misfires on browser globals.
    rules: { 'no-undef': 'off' },
  },

  // Must be last: turns off stylistic rules that would fight Prettier.
  prettier,
])
