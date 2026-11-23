/**
 * Everything the portfolio says, as data (task #3). The page (`PortfolioPage.vue`) only lays it out, so changing the
 * words never touches the layout — and `content.test.ts` can check every link and keep personal details out.
 * Sources: the owner's resume and the 2019 portfolio (the archived, private `portfolio-2019` repo).
 */
import backpackShot from './assets/2019/backpack.webp'
import battleshipShot from './assets/2019/battleship.webp'
import loveLetterShot from './assets/2019/love-letter.webp'
import satelliteShot from './assets/2019/satellite.webp'
import profilePhoto from './assets/profile.webp'

/** The icons `LinkIcon.vue` can draw. */
export const ICON_NAMES = [
  'github',
  'linkedin',
  'mail',
  'play',
  'open',
  'copy',
  'check',
  'file',
] as const
export type IconName = (typeof ICON_NAMES)[number]

export interface Link {
  /** What the link does, e.g. "Code" — the page adds the project's name for screen readers. */
  label: string
  href: string
  /** Shown before the label (decorative; hidden from screen readers). */
  icon: IconName
}

export interface Project {
  title: string
  description: string
  stack: string[]
  links: Link[]
  /** An invitation shown under the description (the featured project). */
  challenge?: string
  /** A screenshot of the app (imported, so Vite hashes it) — always with `imageAlt`. */
  image?: string
  imageAlt?: string
}

export interface Job {
  role: string
  company: string
  dates: string
  points: string[]
}

export const PROFILE = {
  name: 'Michael Beamish',
  greeting: "Hi, I'm Mike.",
  role: 'Software Engineer — Frontend · Vue.js · JavaScript & TypeScript',
  photo: profilePhoto,
  photoAlt: 'Mike Beamish smiling outdoors, with pine trees and mountains behind him',
  about: [
    "I build web apps people enjoy using. Since 2019 I've written production Vue.js — most of it for " +
      "MicrochipDirect, Microchip Technology's online store, where I helped move the whole frontend from legacy .NET " +
      'to Vue and built its product comparison tool.',
    'In 2022 I stepped away from software to raise my kids. Now I’m back and building again: The Ink Tank — the ' +
      'little world living behind this page — and this site are my first projects since, made with Vue 3, strict ' +
      'TypeScript, Vitest and a CI + pull-request workflow, with Claude Code as my pair programmer.',
    "I'm open to frontend and full-stack roles — remote or relocation.",
  ],
}

/**
 * The project the page is built around — it's the world behind the screen. Shown as "The Ink Tank"; the project and
 * its repo are still called Creature World.
 */
export const FEATURED: Project = {
  title: 'The Ink Tank',
  description:
    'A tiny living tide pool in the browser. Furry, octopus-like creatures with personalities — curious, shy, ' +
    'friendly or grumpy — notice your cursor and each react in their own way. Boop them, feed them shrimp, drop in ' +
    "toys, dress them up. It's the world behind this page.",
  challenge: "Challenge: Cheer up the grumpy one. (They don't love being shaken.)",
  stack: ['Vue 3', 'TypeScript', 'Canvas 2D', 'Web Audio', 'Vitest', 'GitHub Actions'],
  links: [
    {
      label: 'Open full screen',
      href: 'https://michaelbeamish.github.io/creature-world/',
      icon: 'open',
    },
    { label: 'Code', href: 'https://github.com/MichaelBeamish/creature-world', icon: 'github' },
  ],
}

export const EARLY_PROJECTS_INTRO =
  'Student projects from Galvanize, built before my first software job — and long before AI pair programmers. ' +
  "Rough around the edges, but I'm still proud of them."

/**
 * The 2018–19 Galvanize projects (from the 2019 portfolio). Their old live demos no longer run, so each links to the
 * owner's 2019 demo video (unlisted on YouTube) and the code. Screenshots are the videos' thumbnails (a friend's name
 * blurred on Love Letter's).
 */
export const EARLY_PROJECTS: Project[] = [
  {
    title: 'Love Letter',
    description:
      'My favorite. On our breaks at Galvanize we played the card game Love Letter, so I built it so we could ' +
      'play online.',
    stack: ['React', 'Redux', 'Firebase'],
    links: [
      { label: 'Watch the demo (4:37)', href: 'https://youtu.be/pt1HOM-q53g', icon: 'play' },
      {
        label: 'Code',
        href: 'https://github.com/MichaelBeamish/react-love-letter',
        icon: 'github',
      },
    ],
    image: loveLetterShot,
    imageAlt:
      "Love Letter's Host Private Game screen: a game name, the current players and a list to invite friends",
  },
  {
    title: 'Battleship',
    description: 'My third-quarter project at Galvanize: the classic game, two players, online.',
    stack: ['React', 'Redux', 'Firebase', 'Materialize'],
    links: [
      { label: 'Watch the demo (5:08)', href: 'https://youtu.be/XMg4Y0VVmyI', icon: 'play' },
      { label: 'Code', href: 'https://github.com/MichaelBeamish/react-battleship', icon: 'github' },
    ],
    image: battleshipShot,
    imageAlt:
      "Battleship's Set Up Your Board screen: a grid with ships being placed and the ships left to place",
  },
  {
    title: 'Backpack App',
    description:
      'Our second-quarter group project: an app that keeps track of who is bringing what on a camping trip.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Bootstrap'],
    links: [
      { label: 'Watch the demo (6:32)', href: 'https://youtu.be/ZEuZAw5rHDY', icon: 'play' },
      { label: 'Code', href: 'https://github.com/MichaelBeamish/Backpack-project', icon: 'github' },
    ],
    image: backpackShot,
    imageAlt:
      'The Backpack app: a camping checklist (clothes, food, headlamp, sleeping bag) over a mountain lake photo',
  },
  {
    title: 'Satellite Tracker',
    description:
      'My first project at Galvanize: live satellite positions on a map, from several public APIs.',
    stack: ['Node.js', 'Axios', 'Bootstrap'],
    links: [
      { label: 'Watch the demo (3:31)', href: 'https://youtu.be/HotoO9cmhHY', icon: 'play' },
      { label: 'Code', href: 'https://github.com/MichaelBeamish/q1-project', icon: 'github' },
    ],
    image: satelliteShot,
    imageAlt:
      'Satellite Tracker: buttons for the ISS and other satellites above a world map showing where one is now',
  },
]

export const EXPERIENCE: Job[] = [
  {
    role: 'Software Engineer',
    company: 'DocuPet (remote)',
    dates: 'Aug 2021 – Apr 2022',
    points: [
      'Built and maintained Vue.js single-page apps with real-time data streams and REST/GraphQL APIs, working ' +
        'closely with backend engineers.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Microchip Technology — MicrochipDirect',
    dates: 'Nov 2019 – Aug 2021',
    points: [
      'Helped migrate the whole storefront from legacy .NET to Vue.js: product pages, faceted search filters and ' +
        'site navigation.',
      'Built the core of an interactive product comparison tool: side-by-side specs, matching-spec highlights, a ' +
        'differences-only view and add-to-cart.',
      'Defined the API contracts for it with a distributed backend team, then integrated them.',
      'Became the primary frontend contact: trained a junior developer and reviewed frontend code before release ' +
        '(fully remote for the last 18 months).',
    ],
  },
  {
    role: 'Associate Engineer',
    company: 'Microchip Technology — MicrochipDirect',
    dates: 'Mar 2019 – Nov 2019',
    points: [
      'Converted legacy .NET features to Vue.js, added inline form validation and fixed storefront defects.',
    ],
  },
]

export const EDUCATION = [
  'Galvanize — Web Development Immersive, 2019',
  'Tech Talent South — Full-Stack Web Development, 2018',
]

/** Shown on the page (with a Copy button) — not everyone has a mail app set up for `mailto:` links. */
export const EMAIL = 'michaelbeamish89@gmail.com'

/**
 * The owner's résumé — a phone-free public copy in `public/resume.pdf` (served as-is at a fixed address). The private
 * copy with the phone number stays in `docs/` (git-ignored). Read any new version in full before replacing it.
 */
export const RESUME: Link = { label: 'Résumé (PDF)', href: '/resume.pdf', icon: 'file' }

/** This site's own code, linked from the footer. */
export const SITE_SOURCE: Link = {
  label: 'Source on GitHub',
  href: 'https://github.com/MichaelBeamish/MichaelBeamish.github.io',
  icon: 'github',
}

/** The other ways to reach the owner (email has its own row, see `EMAIL`). */
export const CONTACT: Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-beamish/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/MichaelBeamish', icon: 'github' },
]
