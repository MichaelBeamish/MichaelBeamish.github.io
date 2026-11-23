/**
 * Drift test for docs/architecture/code-map.md — keeps the code map honest.
 *
 * Fails if:
 *  1. a non-test source file in src/ is missing from the map,
 *  2. the map names a src/ file that doesn't exist,
 *  3. a knob in the "To change X, edit Y" table names a constant (or key) that doesn't exist in its file.
 *
 * Uses Vite's `import.meta.glob` (list + read files at build time) and `?raw` imports instead of Node's fs,
 * so it needs no extra type packages and works anywhere Vitest runs.
 */
import { describe, expect, it } from 'vitest'
import map from '../docs/architecture/code-map.md?raw'

/** Every .ts/.vue file in src/ with its source text, keyed like "/src/simulation/world.ts". */
const sources = import.meta.glob<string>('/src/**/*.{ts,vue}', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const asMapPath = (globKey: string) => globKey.replace(/^\//, '') // "/src/x.ts" → "src/x.ts"
const sourceFiles = Object.keys(sources)
  .map(asMapPath)
  .filter((f) => !f.endsWith('.test.ts'))
  .sort()
const existing = new Set(Object.keys(sources).map(asMapPath))
// import.meta.glob never includes the importing module itself, so add this file explicitly.
existing.add('src/codeMap.test.ts')

/** All `src/...` file paths mentioned in backticks anywhere in the map. */
const mappedFiles = [
  ...new Set([...map.matchAll(/`(src\/[^`\s]+\.(?:ts|vue))`/g)].map((m) => m[1]!)),
]

/** Knob rows: | description | `CONSTANT.key.path` | `src/file` | */
function knobRows(): { constant: string; keys: string[]; file: string }[] {
  const section = map.slice(map.indexOf('## To change X, edit Y'), map.indexOf('## Common changes'))
  return [
    ...section.matchAll(
      /\|\s*`([A-Z][A-Z0-9_]*)((?:\.[A-Za-z][A-Za-z0-9]*)*)`\s*\|\s*`(src\/[^`]+)`\s*\|/g,
    ),
  ].map((m) => ({ constant: m[1]!, keys: m[2]!.split('.').filter(Boolean), file: m[3]! }))
}

describe('code map (docs/architecture/code-map.md)', () => {
  it('lists every non-test source file in src/', () => {
    const missing = sourceFiles.filter((f) => !map.includes('`' + f + '`'))
    expect(missing, 'Add these files to the code map').toEqual([])
  })

  it('only names files that exist', () => {
    const stale = mappedFiles.filter((f) => !existing.has(f))
    expect(stale, 'These files are in the code map but not in the repo').toEqual([])
  })

  it('has a knob table whose constants and keys really exist', () => {
    const rows = knobRows()
    expect(rows.length).toBeGreaterThan(0) // the table was found and parsed
    const problems: string[] = []
    for (const { constant, keys, file } of rows) {
      const source = sources['/' + file]
      if (source === undefined) {
        problems.push(`${file} does not exist (for ${constant})`)
        continue
      }
      if (!new RegExp(`\\bconst\\s+${constant}\\b`).test(source)) {
        problems.push(`${constant} is not declared in ${file}`)
      }
      for (const key of keys) {
        if (!new RegExp(`\\b${key}\\s*:`).test(source))
          problems.push(`${constant}.${key}: no "${key}:" in ${file}`)
      }
    }
    expect(problems, 'Fix the knob table or the code').toEqual([])
  })
})
