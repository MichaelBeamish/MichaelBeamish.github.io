import { describe, expect, it } from 'vitest'
import * as content from './content'
import {
  CONTACT,
  EARLY_PROJECTS,
  EMAIL,
  FEATURED,
  ICON_NAMES,
  PROFILE,
  SITE_SOURCE,
} from './content'

const projects = [FEATURED, ...EARLY_PROJECTS]
const allLinks = [...projects.flatMap((p) => p.links), ...CONTACT, SITE_SOURCE]

describe('portfolio content', () => {
  it('gives every project a title, a description, its stack and at least one link', () => {
    for (const p of projects) {
      expect(p.title, JSON.stringify(p)).not.toBe('')
      expect(p.description.length, p.title).toBeGreaterThan(20)
      expect(p.stack.length, p.title).toBeGreaterThan(0)
      expect(p.links.length, p.title).toBeGreaterThan(0)
    }
  })

  it('gives every link an icon the page can draw', () => {
    for (const link of allLinks) expect(ICON_NAMES, link.label).toContain(link.icon)
  })

  it('shows a plausible email address', () => {
    expect(EMAIL).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/)
  })

  it('only links to https:// or mailto: addresses', () => {
    for (const link of allLinks) expect(link.href, link.label).toMatch(/^(https:\/\/|mailto:)/)
  })

  it('gives every project screenshot alt text', () => {
    for (const p of projects.filter((p) => p.image)) {
      expect(p.imageAlt?.length ?? 0, p.title).toBeGreaterThan(10)
    }
    expect(EARLY_PROJECTS.every((p) => p.image)).toBe(true)
  })

  it('has a photo with alt text', () => {
    expect(PROFILE.photo).toBeTruthy()
    expect(PROFILE.photoAlt.length).toBeGreaterThan(10)
  })

  // The owner's rule: no phone number on the public site.
  it('contains no phone number', () => {
    const everything = JSON.stringify(content)
    expect(everything).not.toMatch(/\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/)
  })
})
