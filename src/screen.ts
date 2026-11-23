/**
 * The "screen": a frosted, tinted layer between the portfolio and the live Creature World behind it (task #1).
 * Pure data + functions — the look is a few numbers turned into CSS custom properties, so it's easy to tune and test.
 */

/** Where the live Creature World is (its own project, embedded as-is — ADR 0001). Overridable for local testing. */
export const CREATURE_WORLD_URL: string =
  import.meta.env.VITE_CREATURE_WORLD_URL ?? 'https://michaelbeamish.github.io/creature-world/'

export interface ScreenLook {
  /** Background blur behind the screen (px). */
  blur: number
  /** Opacity of the dark tint (0 = clear glass, 1 = solid). */
  tint: number
  /** Color saturation of what shows through (1 = unchanged). */
  saturate: number
}

/** The starting look — tuned in the spike with the dev-only panel. */
export const SCREEN: ScreenLook & { liftSeconds: number } = {
  blur: 8,
  tint: 0.55,
  saturate: 0.85,
  /** How long lifting (or lowering) the screen takes (s). */
  liftSeconds: 0.7,
}

/** The slider ranges for the dev-only tuning panel (and the limits any look is clamped to). */
export const LIMITS: Record<keyof ScreenLook, { min: number; max: number; step: number }> = {
  blur: { min: 0, max: 24, step: 0.5 },
  tint: { min: 0, max: 0.95, step: 0.01 },
  saturate: { min: 0, max: 1.5, step: 0.05 },
}

/** A look kept within the limits. */
export function clampLook(look: ScreenLook): ScreenLook {
  const clamp = (key: keyof ScreenLook) =>
    Math.min(LIMITS[key].max, Math.max(LIMITS[key].min, look[key]))
  return { blur: clamp('blur'), tint: clamp('tint'), saturate: clamp('saturate') }
}

/** The look as CSS custom properties for the screen element. */
export function screenStyle(look: ScreenLook): Record<string, string> {
  const l = clampLook(look)
  return {
    '--screen-blur': `${l.blur}px`,
    '--screen-tint': String(l.tint),
    '--screen-saturate': String(l.saturate),
    '--screen-lift': `${SCREEN.liftSeconds}s`,
  }
}
