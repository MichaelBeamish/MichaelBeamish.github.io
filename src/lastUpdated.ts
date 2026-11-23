/**
 * The "Last updated" date in the footer (task #9). The deploy workflow passes the latest commit's date in as
 * `VITE_LAST_UPDATED` (ISO 8601, e.g. "2026-11-23T10:38:48-06:00").
 */

export interface LastUpdated {
  /** Machine-readable date for `<time datetime>`, e.g. "2026-11-23". */
  date: string
  /** What people read, e.g. "November 23, 2026". */
  label: string
}

const FORMAT = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' })

/**
 * Formats a commit date. Uses the calendar date *as written in the commit* (its own time zone), so every visitor sees
 * the same date wherever they are. Returns `null` when there's no valid date (e.g. a local build).
 */
export function formatLastUpdated(iso: string | undefined): LastUpdated | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '')
  if (!match) return null
  const [, year = '', month = '', day = ''] = match
  const utc = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  // Reject dates that don't exist (e.g. Feb 30 would roll over into March).
  if (utc.getUTCMonth() !== Number(month) - 1 || utc.getUTCDate() !== Number(day)) return null
  return { date: `${year}-${month}-${day}`, label: FORMAT.format(utc) }
}
