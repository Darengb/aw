# Vite Conversion Plan

Implementation plan for converting America Works site to Vite + React + TypeScript + Tailwind.

See `vite-spec.md` for full specification.

---

## Phase 1: Project Setup

- [ ] Create new Vite + React + TypeScript project in `site/` folder
  ```bash
  npm create vite@latest site -- --template react-ts
  ```
- [ ] Install core dependencies
  ```bash
  npm install react-router-dom lucide-react gray-matter
  npm install -D tailwindcss postcss autoprefixer @types/node
  ```
- [ ] Initialize Tailwind CSS
  ```bash
  npx tailwindcss init -p
  ```
- [ ] Configure `tailwind.config.ts` with brand colors and fonts
- [ ] Create `src/styles/globals.css` with Tailwind directives and CSS variables
- [ ] Create `src/styles/animations.css` for scroll animations
- [ ] Create `src/styles/components.css` for complex component styles
- [ ] Import styles in `src/main.tsx`
- [ ] Copy images from current `images/` to `site/public/images/`
- [ ] Verify dev server runs: `npm run dev`
- [ ] **Commit**: "Phase 1: Project setup with Tailwind"

---

## Phase 2: Hooks & Utilities

- [ ] Create `src/lib/types.ts` with shared TypeScript interfaces
- [ ] Create `src/hooks/useScrollProgress.ts`
- [ ] Create `src/hooks/useNavScrollState.ts`
- [ ] Create `src/hooks/useIntersectionObserver.ts`
- [ ] **Commit**: "Phase 2: Add scroll behavior hooks"

---

## Phase 3: Layout Components

- [ ] Create `src/components/layout/Nav.tsx`
  - 3-state scroll behavior (top, in-hero, below-hero)
  - Mobile menu toggle
- [ ] Create `src/components/layout/SecondaryNav.tsx`
  - Page-specific anchor links
  - Appears below hero
- [ ] Create `src/components/layout/Footer.tsx`
- [ ] Create `src/components/layout/ScrollProgressBar.tsx`
- [ ] Create `src/components/ui/GrainOverlay.tsx`
- [ ] Set up React Router in `src/App.tsx` with layout shell
- [ ] Verify layout renders on all routes
- [ ] **Commit**: "Phase 3: Layout components and routing"

---

## Phase 4: Hero Components

- [ ] Create `src/components/heroes/PageHero.tsx`
  - Props: title, subtitle, label, backgroundImage, theme
  - Used by: Jobseekers, Employers, Partners, About, Events, News
- [ ] Create `src/components/heroes/HomeHero.tsx`
  - Full dashboard with metrics panel
  - Animated counters
  - Extract from index.html
- [ ] **Commit**: "Phase 4: Hero components"

---

## Phase 5: Section Components

- [ ] Create `src/components/sections/SectionHeader.tsx`
  - Props: label, headline, intro, centered
- [ ] Create `src/components/sections/SplitSection.tsx`
  - Props: reverse, blue, altBg, image, children
  - Image overlay with theme color
- [ ] Create `src/components/sections/ProcessGrid.tsx`
  - Props: items, variant ('cards' | 'minimal')
  - Numbered cards with hover effects
- [ ] Create `src/components/sections/CTASection.tsx`
  - Dark background with grid pattern
  - Props: headline, description, primaryCta, secondaryCta
- [ ] **Commit**: "Phase 5: Section components"

---

## Phase 6: Card Components

- [ ] Create `src/components/cards/TestimonialCard.tsx`
  - Border-left accent style
  - Quote mark decoration
  - Props: quote, author, source
- [ ] Create `src/components/cards/ValueCard.tsx`
  - Numbered cards with top-line hover animation
- [ ] Create `src/components/cards/RoleItem.tsx`
  - Icon + label
- [ ] Create `src/components/cards/PathCard.tsx`
  - Audience navigation cards (home page)
- [ ] **Commit**: "Phase 6: Card components"

---

## Phase 7: Grid Components

- [ ] Create `src/components/grids/TrustStrip.tsx` (Partners)
- [ ] Create `src/components/grids/ListGrid.tsx` (Partners)
- [ ] Create `src/components/grids/FeatureGrid.tsx` (Partners)
- [ ] Create `src/components/grids/GlanceGrid.tsx` (About)
- [ ] Create `src/components/grids/EvidenceGrid.tsx` (About)
- [ ] Create `src/components/grids/MatrixGrid.tsx` (About)
- [ ] Create `src/components/grids/ScorecardGrid.tsx` (About)
- [ ] **Commit**: "Phase 7: Grid components"

---

## Phase 8: Interactive Components

- [ ] Create `src/components/interactive/FAQAccordion.tsx`
  - Expand/collapse with animation
  - Border-bottom style
- [ ] Create `src/components/interactive/ProgramGrid.tsx` (Partners)
- [ ] Create `src/components/interactive/CaseStudiesTabs.tsx` (Jobseekers)
  - Tabbed content with video area
- [ ] Create `src/components/interactive/HomeTimeline.tsx`
  - Horizontal progressive timeline
  - Scroll-triggered fill animation
- [ ] **Commit**: "Phase 8: Interactive components"

---

## Phase 9: UI Components

- [ ] Create `src/components/ui/Button.tsx`
  - Variants: primary, secondary, white, outline, link
  - Arrow icon option
- [ ] Create `src/components/ui/FeatureList.tsx`
  - Bullet list with accent border
- [ ] **Commit**: "Phase 9: UI components"

---

## Phase 10: Page - Home

- [ ] Create `src/pages/Home.tsx`
- [ ] Implement HomeHero section
- [ ] Implement value propositions section
- [ ] Implement "How it works" with HomeTimeline
- [ ] Implement populations served section
- [ ] Implement testimonials section
- [ ] Implement path cards (audience navigation)
- [ ] Implement CTA section
- [ ] Verify all scroll animations work
- [ ] **Commit**: "Phase 10: Home page"

---

## Phase 11: Page - Jobseekers

- [ ] Create `src/pages/Jobseekers.tsx` with `.theme-red`
- [ ] Implement PageHero
- [ ] Implement split sections (4x)
- [ ] Implement process grid
- [ ] Implement case studies tabs
- [ ] Implement testimonials (3 sections)
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 11: Jobseekers page"

---

## Phase 12: Page - Employers

- [ ] Create `src/pages/Employers.tsx` with `.theme-blue`
- [ ] Implement PageHero
- [ ] Implement value cards section
- [ ] Implement split sections
- [ ] Implement process grid
- [ ] Implement roles section with RoleItems
- [ ] Implement testimonials
- [ ] Implement FAQ accordion
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 12: Employers page"

---

## Phase 13: Page - Partners

- [ ] Create `src/pages/Partners.tsx` with `.theme-blue`
- [ ] Implement PageHero
- [ ] Implement trust strip (stats)
- [ ] Implement services section with feature grid
- [ ] Implement split sections
- [ ] Implement program grid
- [ ] Implement process grid
- [ ] Implement testimonials
- [ ] Implement FAQ accordion
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 13: Partners page"

---

## Phase 14: Page - About

- [ ] Create `src/pages/About.tsx` with `.theme-red`
- [ ] Implement PageHero
- [ ] Implement glance grid (intro stats)
- [ ] Implement evidence grid
- [ ] Implement matrix grid (populations)
- [ ] Implement vertical timeline
- [ ] Implement scorecard grid
- [ ] Implement founders section
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 14: About page"

---

## Phase 15: Pages - Events & News

- [ ] Create `src/lib/content.ts` for markdown loading
- [ ] Create sample markdown files in `src/content/events/`
- [ ] Create sample markdown files in `src/content/news/`
- [ ] Create `src/pages/Events.tsx`
  - List upcoming events from markdown
- [ ] Create `src/pages/News.tsx`
  - List news items with external links
- [ ] Create `src/pages/NotFound.tsx`
- [ ] **Commit**: "Phase 15: Events, News, and NotFound pages"

---

## Phase 16: Final Polish

- [ ] Run `npm run build` and fix any errors
- [ ] Test all routes navigate correctly
- [ ] Verify scroll progress bar works on all pages
- [ ] Verify nav state transitions work
- [ ] Verify theme colors apply correctly per page
- [ ] Test responsive behavior on mobile
- [ ] Run lint on all files and fix errors
- [ ] **Commit**: "Phase 16: Final polish and fixes"

---

## Completion Checklist

- [ ] All pages render without errors
- [ ] All scroll animations function correctly
- [ ] Nav transitions between 3 states
- [ ] Theme colors (red/blue) apply per page
- [ ] Mobile responsive
- [ ] Build completes successfully
- [ ] Ready for deployment testing
