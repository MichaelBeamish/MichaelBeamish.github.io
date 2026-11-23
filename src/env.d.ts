/// <reference types="vite/client" />

/** The `VITE_*` variables this app reads (Vite exposes them as `import.meta.env`). */
interface ImportMetaEnv {
  /** Point at a different Creature World (e.g. a local one) — see the code map's recipes. */
  readonly VITE_CREATURE_WORLD_URL?: string
  /** The latest commit's date (ISO 8601), set by the deploy workflow; absent in local builds. */
  readonly VITE_LAST_UPDATED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
