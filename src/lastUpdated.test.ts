import { describe, expect, it } from 'vitest'
import { formatLastUpdated } from './lastUpdated'

describe('formatLastUpdated', () => {
  it('formats a commit date for people and for <time datetime>', () => {
    expect(formatLastUpdated('2026-11-23T10:38:48-06:00')).toEqual({
      date: '2026-11-23',
      label: 'November 23, 2026',
    })
  })

  it("keeps the commit's own date, even when it's already the next day in UTC", () => {
    // 11:30 pm in Central time is 5:30 am on the 24th in UTC.
    expect(formatLastUpdated('2026-11-23T23:30:00-06:00')?.label).toBe('November 23, 2026')
  })

  it('returns null when there is no usable date (local builds, bad input)', () => {
    expect(formatLastUpdated(undefined)).toBeNull()
    expect(formatLastUpdated('')).toBeNull()
    expect(formatLastUpdated('not a date')).toBeNull()
    expect(formatLastUpdated('2026-02-30T12:00:00Z')).toBeNull()
  })
})
