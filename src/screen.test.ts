import { describe, expect, it } from 'vitest'
import { clampLook, LIMITS, SCREEN, screenStyle } from './screen'

describe('the screen look (task #1)', () => {
  it('turns into CSS custom properties', () => {
    expect(screenStyle({ blur: 8, tint: 0.5, saturate: 0.9 })).toEqual({
      '--screen-blur': '8px',
      '--screen-tint': '0.5',
      '--screen-saturate': '0.9',
      '--screen-lift': `${SCREEN.liftSeconds}s`,
    })
  })

  it('keeps every value within its limits', () => {
    const wild = clampLook({ blur: 999, tint: -3, saturate: 7 })
    expect(wild).toEqual({
      blur: LIMITS.blur.max,
      tint: LIMITS.tint.min,
      saturate: LIMITS.saturate.max,
    })
  })

  it('starts readable but see-through: the tint never fully hides the world', () => {
    expect(SCREEN.tint).toBeGreaterThan(0.3)
    expect(SCREEN.tint).toBeLessThan(0.9)
    expect(clampLook(SCREEN)).toEqual({
      blur: SCREEN.blur,
      tint: SCREEN.tint,
      saturate: SCREEN.saturate,
    })
  })
})
