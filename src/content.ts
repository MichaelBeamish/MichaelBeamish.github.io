/**
 * Everything the portfolio says, as data (task #3). The page (`PortfolioPage.vue`) only lays it out, so changing the
 * words never touches the layout — and `content.test.ts` can check every link and keep personal details out.
 * Sources: the owner's resume and the 2019 portfolio (the archived, private `portfolio-2019` repo).
 */
import profilePhoto from './assets/profile.webp'

export interface Link {
  /** What the link does, e.g. "Code" — the page adds the project's name for screen readers. */
  label: string
  href: string
}

export interface Project {
  title: string
  description: string
  stack: string[]
  links: Link[]
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
  role: 'Frontend developer · Vue.js · JavaScript & TypeScript',
  photo: profilePhoto,
  photoAlt: 'Mike Beamish smiling outdoors, with pine trees and mountains behind him',
  about: [
    "I build web apps people enjoy using. Since 2019 I've written production Vue.js — most of it for " +
      "MicrochipDirect, Microchip Technology's online store, where I helped move the whole frontend from legacy .NET " +
      'to Vue and built its product comparison tool.',
    'In 2022 I stepped away from software to raise my kids. Now I’m back and building again: Creature World — the ' +
      'little world living behind this page — and this site are my first projects since, made with Vue 3, strict ' +
      'TypeScript, Vitest and a CI + pull-request workflow, with Claude Code as my pair programmer.',
    "I'm open to frontend and full-stack roles — remote, or I'm happy to relocate.",
  ],
}

/** The project the page is built around — it's the world behind the screen. */
export const FEATURED: Project = {
  title: 'Creature World',
  description:
    'A tiny living tide pool in the browser. Furry, octopus-like creatures with personalities — curious, shy, ' +
    'friendly or grumpy — notice your cursor and each react in their own way. Boop them, feed them, play fetch, ' +
    "dress them up. It's the world behind this page.",
  stack: ['Vue 3', 'TypeScript', 'Canvas 2D', 'Web Audio', 'Vitest', 'GitHub Actions'],
  links: [
    { label: 'Open full screen', href: 'https://michaelbeamish.github.io/creature-world/' },
    { label: 'Code', href: 'https://github.com/MichaelBeamish/creature-world' },
  ],
}

export const EARLY_PROJECTS_INTRO =
  'Built at Galvanize in 2018–19, before my first software job — and long before AI pair programmers. ' +
  "Rough around the edges, but I'm still proud of them."

/** The 2018–19 Galvanize projects (from the 2019 portfolio). Their old demos no longer run, so: code only. */
export const EARLY_PROJECTS: Project[] = [
  {
    title: 'Love Letter',
    description:
      'My favorite. On our breaks at Galvanize we played the card game Love Letter, so I built it so we could ' +
      'play online.',
    stack: ['React', 'Redux', 'Firebase'],
    links: [{ label: 'Code', href: 'https://github.com/MichaelBeamish/react-love-letter' }],
  },
  {
    title: 'Battleship',
    description: 'My third-quarter project at Galvanize: the classic game, two players, online.',
    stack: ['React', 'Redux', 'Firebase', 'Materialize'],
    links: [{ label: 'Code', href: 'https://github.com/MichaelBeamish/react-battleship' }],
  },
  {
    title: 'Backpack App',
    description:
      'Our second-quarter group project: an app that keeps track of who is bringing what on a camping trip.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Bootstrap'],
    links: [{ label: 'Code', href: 'https://github.com/MichaelBeamish/Backpack-project' }],
  },
  {
    title: 'Satellite Tracker',
    description:
      'My first project at Galvanize: live satellite positions on a map, from several public APIs.',
    stack: ['Node.js', 'Axios', 'Bootstrap'],
    links: [{ label: 'Code', href: 'https://github.com/MichaelBeamish/q1-project' }],
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

export const CONTACT: Link[] = [
  { label: 'Email', href: 'mailto:michaelbeamish89@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-beamish/' },
  { label: 'GitHub', href: 'https://github.com/MichaelBeamish' },
]
