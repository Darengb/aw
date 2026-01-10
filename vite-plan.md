# Vite Conversion Plan

Implementation plan for converting America Works site to Vite + React + TypeScript + Tailwind.

See `vite-spec.md` for full specification.

---

## Phase 1: Project Setup ✅

- [x] Create new Vite + React + TypeScript project in `site/` folder
- [x] Install core dependencies
- [x] Initialize Tailwind CSS
- [x] Configure `tailwind.config.ts` with brand colors and fonts
- [x] Add Google Fonts links to `index.html`
- [x] Create `src/styles/globals.css` with Tailwind directives and CSS variables
- [x] Create `src/styles/animations.css` for scroll animations
- [x] Create `src/styles/components.css` for complex component styles
- [x] Import styles in `src/main.tsx`
- [x] Copy images from current `images/` to `site/public/images/`
- [x] Verify dev server runs: `npm run dev`
- [x] **Commit**: "Phase 1: Project setup with Tailwind"

---

## Phase 2: Hooks & Utilities (Sequential)

> Foundation layer - must complete before Phase 3

- [ ] Create `src/lib/types.ts` with shared TypeScript interfaces
- [ ] Create `src/hooks/useScrollProgress.ts`
- [ ] Create `src/hooks/useNavScrollState.ts`
- [ ] Create `src/hooks/useIntersectionObserver.ts`
- [ ] **Commit**: "Phase 2: Add scroll behavior hooks"

---

## Phase 3: Layout & Router (Sequential)

> Depends on Phase 2 hooks - must complete before component phases

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

## Parallel Batch A: Independent Components

> These 3 phases can run simultaneously after Phase 3

### Phase 4A: UI Components ⚡

> No dependencies - other components need Button

- [ ] Create `src/components/ui/Button.tsx`
  - Variants: primary, secondary, white, outline, link
  - Arrow icon option
- [ ] Create `src/components/ui/FeatureList.tsx`
  - Bullet list with accent border
- [ ] **Commit**: "Phase 4A: UI components"

### Phase 4B: Grid Components ⚡

> Minimal dependencies - just types and CSS

- [ ] Create `src/components/grids/TrustStrip.tsx` (Partners)
- [ ] Create `src/components/grids/ListGrid.tsx` (Partners)
- [ ] Create `src/components/grids/FeatureGrid.tsx` (Partners)
- [ ] Create `src/components/grids/GlanceGrid.tsx` (About)
- [ ] Create `src/components/grids/EvidenceGrid.tsx` (About)
- [ ] Create `src/components/grids/MatrixGrid.tsx` (About)
- [ ] Create `src/components/grids/ScorecardGrid.tsx` (About)
- [ ] **Commit**: "Phase 4B: Grid components"

### Phase 4C: Interactive Components ⚡

> Depends on Phase 2 hooks (useIntersectionObserver)

- [ ] Create `src/components/interactive/FAQAccordion.tsx`
  - Expand/collapse with animation
  - Border-bottom style
- [ ] Create `src/components/interactive/ProgramGrid.tsx` (Partners)
- [ ] Create `src/components/interactive/CaseStudiesTabs.tsx` (Jobseekers)
  - Tabbed content with video area
- [ ] Create `src/components/interactive/HomeTimeline.tsx`
  - Horizontal progressive timeline
  - Scroll-triggered fill animation
- [ ] Create `src/components/interactive/AboutTimeline.tsx`
  - Vertical alternating timeline
  - Scroll-triggered animations
- [ ] **Commit**: "Phase 4C: Interactive components"

---

## Parallel Batch B: Components Needing Button

> These 3 phases can run simultaneously after Phase 4A completes

### Phase 5A: Hero Components ⚡

> Depends on Button component

- [ ] Create `src/components/heroes/PageHero.tsx`
  - Props: title, subtitle, label, backgroundImage, theme
  - Used by: Jobseekers, Employers, Partners, About, Events, News
- [ ] Create `src/components/heroes/HomeHero.tsx`
  - Full dashboard with metrics panel
  - Animated counters
  - Extract from index.html
- [ ] **Commit**: "Phase 5A: Hero components"

### Phase 5B: Section Components ⚡

> Depends on Button component

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
- [ ] **Commit**: "Phase 5B: Section components"

### Phase 5C: Card Components ⚡

> Minimal dependencies

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
- [ ] Create `src/components/cards/MetricCard.tsx`
  - Dashboard stat cards with animated counters
  - Props: value, label, status, animated
- [ ] Create `src/components/cards/ValueProp.tsx`
  - Large editorial grid cards
  - Props: number, title, description
- [ ] Create `src/components/cards/PopulationItem.tsx`
  - Population type cards with icon
  - Props: icon, title, description
- [ ] **Commit**: "Phase 5C: Card components"

---

## Parallel Batch C: Page Implementations

> All 6 pages can be built simultaneously after all component phases complete

### Phase 6A: Home Page ⚡

- [ ] Create `src/pages/Home.tsx` with `.theme-red`
- [ ] Implement HomeHero section (with MetricCard grid)
- [ ] Implement ValueProp section (value propositions)
- [ ] Implement "How it works" with HomeTimeline
- [ ] Implement PopulationItem section (populations served)
- [ ] Implement testimonials section (TestimonialCard)
- [ ] Implement PathCard section (audience navigation)
- [ ] Implement CTA section
- [ ] Verify all scroll animations work
- [ ] **Commit**: "Phase 6A: Home page"

### Phase 6B: Jobseekers Page ⚡

- [ ] Create `src/pages/Jobseekers.tsx` with `.theme-red`
- [ ] Implement PageHero
- [ ] Implement split sections (4x)
- [ ] Implement process grid
- [ ] Implement case studies tabs
- [ ] Implement testimonials (3 sections)
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 6B: Jobseekers page"

### Phase 6C: Employers Page ⚡

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
- [ ] **Commit**: "Phase 6C: Employers page"

### Phase 6D: Partners Page ⚡

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
- [ ] **Commit**: "Phase 6D: Partners page"

### Phase 6E: About Page ⚡

- [ ] Create `src/pages/About.tsx` with `.theme-red`
- [ ] Implement PageHero
- [ ] Implement glance grid (intro stats)
- [ ] Implement evidence grid
- [ ] Implement matrix grid (populations)
- [ ] Implement AboutTimeline (vertical with scroll animation)
- [ ] Implement scorecard grid
- [ ] Implement founders section
- [ ] Implement CTA section
- [ ] Configure SecondaryNav links
- [ ] **Commit**: "Phase 6E: About page"

### Phase 6F: Events, News & NotFound ⚡

- [ ] Create `src/lib/content.ts` for markdown loading
- [ ] Create sample markdown files in `src/content/events/`
- [ ] Create sample markdown files in `src/content/news/`
- [ ] Create `src/pages/Events.tsx`
  - List upcoming events from markdown
- [ ] Create `src/pages/News.tsx`
  - List news items with external links
- [ ] Create `src/pages/NotFound.tsx`
- [ ] **Commit**: "Phase 6F: Events, News, and NotFound pages"

---

## Phase 7: Final Polish (Sequential)

> Integration testing - must run after all pages complete

- [ ] Run `npm run build` and fix any errors
- [ ] Test all routes navigate correctly
- [ ] Verify scroll progress bar works on all pages
- [ ] Verify nav state transitions work
- [ ] Verify theme colors apply correctly per page
- [ ] Test responsive behavior on mobile
- [ ] Run lint on all files and fix errors
- [ ] **Commit**: "Phase 7: Final polish and fixes"

---

## Execution Summary

| Step | Type | Phases | Sub-agents |
|------|------|--------|------------|
| 1 | Sequential | Phase 2 (Hooks) | - |
| 2 | Sequential | Phase 3 (Layout) | - |
| 3 | **Parallel** | 4A, 4B, 4C | 3 |
| 4 | **Parallel** | 5A, 5B, 5C | 3 |
| 5 | **Parallel** | 6A-6F | 6 |
| 6 | Sequential | Phase 7 (Polish) | - |

**Legend:** ⚡ = Can run in parallel with other ⚡ phases in same batch

---

## Completion Checklist

- [ ] All pages render without errors
- [ ] All scroll animations function correctly
- [ ] Nav transitions between 3 states
- [ ] Theme colors (red/blue) apply per page
- [ ] Mobile responsive
- [ ] Build completes successfully
- [ ] Ready for deployment testing
