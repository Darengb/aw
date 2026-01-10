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

- [x] Create `src/lib/types.ts` with shared TypeScript interfaces
- [x] Create `src/hooks/useScrollProgress.ts`
- [x] Create `src/hooks/useNavScrollState.ts`
- [x] Create `src/hooks/useIntersectionObserver.ts`
- [x] **Commit**: "Phase 2: Add scroll behavior hooks"

---

## Phase 3: Layout & Router (Sequential)

> Depends on Phase 2 hooks - must complete before component phases

- [x] Create `src/components/layout/Nav.tsx`
  - 3-state scroll behavior (top, in-hero, below-hero)
  - Mobile menu toggle
- [x] Create `src/components/layout/SecondaryNav.tsx`
  - Page-specific anchor links
  - Appears below hero
- [x] Create `src/components/layout/Footer.tsx`
- [x] Create `src/components/layout/ScrollProgressBar.tsx`
- [x] Create `src/components/ui/GrainOverlay.tsx`
- [x] Set up React Router in `src/App.tsx` with layout shell
- [x] Verify layout renders on all routes
- [x] **Commit**: "Phase 3: Layout components and routing"

---

## Parallel Batch A: Independent Components

> These 3 phases can run simultaneously after Phase 3

### Phase 4A: UI Components ⚡

> No dependencies - other components need Button

- [x] Create `src/components/ui/Button.tsx`
  - Variants: primary, secondary, white, outline, link
  - Arrow icon option
- [x] Create `src/components/ui/FeatureList.tsx`
  - Bullet list with accent border
- [x] **Commit**: "Phase 4A: UI components"

### Phase 4B: Grid Components ⚡

> Minimal dependencies - just types and CSS

- [x] Create `src/components/grids/TrustStrip.tsx` (Partners)
- [x] Create `src/components/grids/ListGrid.tsx` (Partners)
- [x] Create `src/components/grids/FeatureGrid.tsx` (Partners)
- [x] Create `src/components/grids/GlanceGrid.tsx` (About)
- [x] Create `src/components/grids/EvidenceGrid.tsx` (About)
- [x] Create `src/components/grids/MatrixGrid.tsx` (About)
- [x] Create `src/components/grids/ScorecardGrid.tsx` (About)
- [x] **Commit**: "Phase 4B: Grid components"

### Phase 4C: Interactive Components ⚡

> Depends on Phase 2 hooks (useIntersectionObserver)

- [x] Create `src/components/interactive/FAQAccordion.tsx`
  - Expand/collapse with animation
  - Border-bottom style
- [x] Create `src/components/interactive/ProgramGrid.tsx` (Partners)
- [x] Create `src/components/interactive/CaseStudiesTabs.tsx` (Jobseekers)
  - Tabbed content with video area
- [x] Create `src/components/interactive/HomeTimeline.tsx`
  - Horizontal progressive timeline
  - Scroll-triggered fill animation
- [x] Create `src/components/interactive/AboutTimeline.tsx`
  - Vertical alternating timeline
  - Scroll-triggered animations
- [x] **Commit**: "Phase 4C: Interactive components"

---

## Parallel Batch B: Components Needing Button

> These 3 phases can run simultaneously after Phase 4A completes

### Phase 5A: Hero Components ⚡

> Depends on Button component

- [x] Create `src/components/heroes/PageHero.tsx`
  - Props: title, subtitle, label, backgroundImage, theme
  - Used by: Jobseekers, Employers, Partners, About, Events, News
- [x] Create `src/components/heroes/HomeHero.tsx`
  - Full dashboard with metrics panel
  - Animated counters
  - Extract from index.html
- [x] **Commit**: "Phase 5A: Hero components"

### Phase 5B: Section Components ⚡

> Depends on Button component

- [x] Create `src/components/sections/SectionHeader.tsx`
  - Props: label, headline, intro, centered
- [x] Create `src/components/sections/SplitSection.tsx`
  - Props: reverse, blue, altBg, image, children
  - Image overlay with theme color
- [x] Create `src/components/sections/ProcessGrid.tsx`
  - Props: items, variant ('cards' | 'minimal')
  - Numbered cards with hover effects
- [x] Create `src/components/sections/CTASection.tsx`
  - Dark background with grid pattern
  - Props: headline, description, primaryCta, secondaryCta
- [x] **Commit**: "Phase 5B: Section components"

### Phase 5C: Card Components ⚡

> Minimal dependencies

- [x] Create `src/components/cards/TestimonialCard.tsx`
  - Border-left accent style
  - Quote mark decoration
  - Props: quote, author, source
- [x] Create `src/components/cards/ValueCard.tsx`
  - Numbered cards with top-line hover animation
- [x] Create `src/components/cards/RoleItem.tsx`
  - Icon + label
- [x] Create `src/components/cards/PathCard.tsx`
  - Audience navigation cards (home page)
- [x] Create `src/components/cards/MetricCard.tsx`
  - Dashboard stat cards with animated counters
  - Props: value, label, status, animated
- [x] Create `src/components/cards/ValueProp.tsx`
  - Large editorial grid cards
  - Props: number, title, description
- [x] Create `src/components/cards/PopulationItem.tsx`
  - Population type cards with icon
  - Props: icon, title, description
- [x] **Commit**: "Phase 5C: Card components"

---

## Parallel Batch C: Page Implementations

> All 6 pages can be built simultaneously after all component phases complete

### Phase 6A: Home Page ⚡

- [x] Create `src/pages/Home.tsx` with `.theme-red`
- [x] Implement HomeHero section (with MetricCard grid)
- [x] Implement ValueProp section (value propositions)
- [x] Implement "How it works" with HomeTimeline
- [x] Implement PopulationItem section (populations served)
- [x] Implement testimonials section (TestimonialCard)
- [x] Implement PathCard section (audience navigation)
- [x] Implement CTA section
- [x] Verify all scroll animations work
- [x] **Commit**: "Phase 6A: Home page"

### Phase 6B: Jobseekers Page ⚡

- [x] Create `src/pages/Jobseekers.tsx` with `.theme-red`
- [x] Implement PageHero
- [x] Implement split sections (4x)
- [x] Implement process grid
- [x] Implement case studies tabs
- [x] Implement testimonials (3 sections)
- [x] Implement CTA section
- [x] Configure SecondaryNav links
- [x] **Commit**: "Phase 6B: Jobseekers page"

### Phase 6C: Employers Page ⚡

- [x] Create `src/pages/Employers.tsx` with `.theme-blue`
- [x] Implement PageHero
- [x] Implement value cards section
- [x] Implement split sections
- [x] Implement process grid
- [x] Implement roles section with RoleItems
- [x] Implement testimonials
- [x] Implement FAQ accordion
- [x] Implement CTA section
- [x] Configure SecondaryNav links
- [x] **Commit**: "Phase 6C: Employers page"

### Phase 6D: Partners Page ⚡

- [x] Create `src/pages/Partners.tsx` with `.theme-blue`
- [x] Implement PageHero
- [x] Implement trust strip (stats)
- [x] Implement services section with feature grid
- [x] Implement split sections
- [x] Implement program grid
- [x] Implement process grid
- [x] Implement testimonials
- [x] Implement FAQ accordion
- [x] Implement CTA section
- [x] Configure SecondaryNav links
- [x] **Commit**: "Phase 6D: Partners page"

### Phase 6E: About Page ⚡

- [x] Create `src/pages/About.tsx` with `.theme-red`
- [x] Implement PageHero
- [x] Implement glance grid (intro stats)
- [x] Implement evidence grid
- [x] Implement matrix grid (populations)
- [x] Implement AboutTimeline (vertical with scroll animation)
- [x] Implement scorecard grid
- [x] Implement founders section
- [x] Implement CTA section
- [x] Configure SecondaryNav links
- [x] **Commit**: "Phase 6E: About page"

### Phase 6F: Events, News & NotFound ⚡

- [x] Create `src/lib/content.ts` for markdown loading
- [x] Create sample markdown files in `src/content/events/`
- [x] Create sample markdown files in `src/content/news/`
- [x] Create `src/pages/Events.tsx`
  - List upcoming events from markdown
- [x] Create `src/pages/News.tsx`
  - List news items with external links
- [x] Create `src/pages/NotFound.tsx`
- [x] **Commit**: "Phase 6F: Events, News, and NotFound pages"

---

## Phase 7: Final Polish (Sequential)

> Integration testing - must run after all pages complete

- [x] Run `npm run build` and fix any errors
- [x] Test all routes navigate correctly
- [x] Verify scroll progress bar works on all pages
- [x] Verify nav state transitions work
- [x] Verify theme colors apply correctly per page
- [x] Test responsive behavior on mobile
- [x] Run lint on all files and fix errors
- [x] **Commit**: "Phase 7: Final polish and fixes"

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
