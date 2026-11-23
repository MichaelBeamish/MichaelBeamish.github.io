<script setup lang="ts">
// The portfolio itself (task #3): lays out `content.ts`. It knows nothing about the screen or the world behind it —
// it only asks App to lift the screen ("lift"), from The Ink Tank card.
import {
  CONTACT,
  EARLY_PROJECTS,
  EARLY_PROJECTS_INTRO,
  EDUCATION,
  EXPERIENCE,
  FEATURED,
  PROFILE,
} from './content'

defineEmits<{ lift: [] }>()

/** Links that leave the page open in a new tab (mailto: doesn't). */
const isExternal = (href: string) => href.startsWith('https://')
</script>

<template>
  <main class="page">
    <section id="about" class="about" aria-labelledby="about-title">
      <img :src="PROFILE.photo" :alt="PROFILE.photoAlt" class="photo" width="160" height="160" />
      <div>
        <h1 id="about-title">{{ PROFILE.greeting }}</h1>
        <p class="role">{{ PROFILE.role }}</p>
        <p v-for="(paragraph, i) in PROFILE.about" :key="i">{{ paragraph }}</p>
      </div>
    </section>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>

      <article class="card featured" aria-labelledby="featured-title">
        <h3 id="featured-title">{{ FEATURED.title }}</h3>
        <p>{{ FEATURED.description }}</p>
        <p v-if="FEATURED.challenge" class="challenge">{{ FEATURED.challenge }}</p>
        <ul class="stack" aria-label="Built with">
          <li v-for="tech in FEATURED.stack" :key="tech">{{ tech }}</li>
        </ul>
        <div class="links">
          <button type="button" class="meet" @click="$emit('lift')">Meet the residents 🐙</button>
          <a
            v-for="link in FEATURED.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener"
          >
            {{ link.label
            }}<span class="sr-only"> — {{ FEATURED.title }} (opens in a new tab)</span>
          </a>
        </div>
      </article>

      <!-- Native disclosure: closed by default, keyboard + screen-reader friendly, no JS state. -->
      <details class="early">
        <summary>
          <span class="early-title">Before my first software job</span>
          <span class="early-sub">
            Galvanize student projects, 2018–19 ·
            <span class="when-closed">Show {{ EARLY_PROJECTS.length }} projects</span>
            <span class="when-open">Hide</span>
          </span>
        </summary>
        <p class="early-intro">{{ EARLY_PROJECTS_INTRO }}</p>
        <div class="grid">
          <article v-for="project in EARLY_PROJECTS" :key="project.title" class="card">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.imageAlt"
              class="shot"
              width="640"
              height="360"
              loading="lazy"
            />
            <h4>{{ project.title }}</h4>
            <p>{{ project.description }}</p>
            <ul class="stack" aria-label="Built with">
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>
            <div class="links">
              <a
                v-for="link in project.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener"
              >
                {{ link.label
                }}<span class="sr-only"> — {{ project.title }} (opens in a new tab)</span>
              </a>
            </div>
          </article>
        </div>
      </details>
    </section>

    <section id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <article v-for="job in EXPERIENCE" :key="job.role + job.dates" class="job">
        <h3>
          {{ job.role }} <span class="company">· {{ job.company }}</span>
        </h3>
        <p class="dates">{{ job.dates }}</p>
        <ul>
          <li v-for="point in job.points" :key="point">{{ point }}</li>
        </ul>
      </article>
      <h3>Education</h3>
      <ul>
        <li v-for="school in EDUCATION" :key="school">{{ school }}</li>
      </ul>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <p>The best way to reach me is email — I'd love to hear from you.</p>
      <div class="links">
        <a
          v-for="link in CONTACT"
          :key="link.href"
          :href="link.href"
          :target="isExternal(link.href) ? '_blank' : undefined"
          :rel="isExternal(link.href) ? 'noopener' : undefined"
        >
          {{ link.label
          }}<span v-if="isExternal(link.href)" class="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 820px;
  margin: 6vh auto 0;
  padding: 0 24px 80px;
  line-height: 1.6;
}
section {
  margin-top: 64px;
  scroll-margin-top: 24px;
}
.about {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-top: 0;
}
.photo {
  flex: none;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  object-fit: cover;
}
h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.15;
  margin: 0.2em 0 0.1em;
}
.role {
  margin-top: 0;
  color: #ffe9b0;
}
h2 {
  font-size: 1.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.3em;
}
.card {
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
}
.card h3,
.card h4 {
  margin: 0 0 0.3em;
  font-size: 1.2rem;
}
.card p {
  margin: 0 0 0.8em;
}
/* A card's screenshot runs edge to edge; width/height reserve its space so nothing jumps when it loads. */
.shot {
  display: block;
  width: calc(100% + 40px);
  height: auto;
  aspect-ratio: 16 / 9;
  margin: -18px -20px 14px;
  border-radius: 13px 13px 0 0;
  object-fit: cover;
}
.featured {
  border-color: rgba(255, 233, 176, 0.45);
}
/* The 2018–19 group: a clearly separate, collapsed section. */
.early {
  margin-top: 40px;
  border-top: 1px dashed rgba(255, 255, 255, 0.25);
  padding-top: 16px;
}
.early summary {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  align-items: baseline;
  cursor: pointer;
  list-style: none; /* our own chevron instead of the default triangle */
  border-radius: 8px;
}
.early summary::-webkit-details-marker {
  display: none;
}
.early summary::before {
  content: '▸';
  grid-row: span 2;
  color: #ffe9b0;
  transition: transform 0.2s ease;
}
.early[open] summary::before {
  transform: rotate(90deg);
}
.early summary:focus-visible {
  outline: 2px solid #ffe9b0;
  outline-offset: 4px;
}
.early-title {
  font-size: 1.15rem;
  font-weight: 700;
}
.early-sub {
  font-size: 0.95rem;
  opacity: 0.85;
}
.when-closed,
.when-open {
  color: #ffe9b0;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.early[open] .when-closed,
.early:not([open]) .when-open {
  display: none;
}
.early-intro {
  margin: 14px 0 16px;
  opacity: 0.9;
}
.challenge {
  font-weight: 600;
  color: #ffe9b0;
}
@media (prefers-reduced-motion: reduce) {
  .early summary::before {
    transition: none;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
}
.stack li {
  padding: 1px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
}
.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 18px;
}
a {
  color: #ffe9b0;
  text-underline-offset: 3px;
}
a:focus-visible {
  outline: 2px solid #ffe9b0;
  outline-offset: 2px;
}
.meet {
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.meet:hover,
.meet:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  outline: 2px solid #ffe9b0;
  outline-offset: 2px;
}
.job h3 {
  margin-bottom: 0;
  font-size: 1.1rem;
}
.company {
  font-weight: 400;
}
.dates {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .about {
    flex-direction: column;
    gap: 12px;
  }
  .photo {
    width: 112px;
    height: 112px;
  }
  section {
    margin-top: 48px;
  }
}
</style>
