# Vite Site Rebuild Plan - 98% Match

## Problem Statement
The current Vite site components are "approximations" rather than faithful conversions. They have different layouts, different text, and different structures than the original HTML files. We need a systematic rebuild using the original HTML as the source of truth.

## Guiding Principles

1. **Original HTML is source of truth** - Copy markup exactly, convert `class=` to `className=`
2. **vite-spec.md defines component organization** - Which components exist, which pages share them
3. **First instance rule** - For each component, use the first occurrence in nav order:
   - `index.html` → `jobseekers.html` → `employers.html` → `partners.html` → `about.html`
4. **Port ALL CSS** - Every style from `<style>` blocks must be in globals.css or component CSS
5. **Preserve exact text** - Copy/paste content, no paraphrasing

---

## Phase 1: CSS Foundation

**Objective:** Extract ALL custom CSS from original HTML `<style>` blocks into Vite CSS files.

- [x] 1.1 Extract CSS from `index.html` (navigation, hero, timeline, cards, dashboard)
- [x] 1.2 Extract CSS from `jobseekers.html` (split sections, case studies, process cards)
- [x] 1.3 Extract CSS from `employers.html` (value cards, role items, FAQ accordion)
- [x] 1.4 Extract CSS from `partners.html` (trust strip, program grid, feature grid)
- [x] 1.5 Extract CSS from `about.html` (vertical timeline, evidence grid, matrix grid)
- [x] 1.6 Organize into `globals.css`, `animations.css`, `components.css`
- [x] 1.7 Commit Phase 1

---

## Phase 2: Clean Slate

**Objective:** Remove existing approximation components to start fresh.

- [ ] 2.1 Delete all files in `site/src/components/`
- [ ] 2.2 Delete all files in `site/src/pages/`
- [ ] 2.3 Create empty directory structure per vite-spec.md
- [ ] 2.4 Commit Phase 2

---

## Phase 3: Layout Components

**Objective:** Build Nav and Footer first (shared across all pages).

- [ ] 3.1 Build `Nav.tsx` from index.html (3-state scroll behavior)
- [ ] 3.2 Build `Footer.tsx` from index.html (4-column layout)
- [ ] 3.3 Build `App.tsx` shell with router
- [ ] 3.4 Verify Nav/Footer render correctly
- [ ] 3.5 Commit Phase 3

---

## Phase 4: Home Page Components

**Objective:** Build all components needed for Home.tsx using index.html as source.

### 4A: Hero & Dashboard
- [ ] 4A.1 Build `HomeHero.tsx` (video background + glass metrics dashboard)
- [ ] 4A.2 Build `MetricCard.tsx` (animated counters in dashboard)

### 4B: Cards & Grids
- [ ] 4B.1 Build `GoogleReviewCard.tsx` (Google logo, 5 stars, distinct from testimonials)
- [ ] 4B.2 Build `TestimonialCard.tsx` (quote mark decoration, cite + role footer)
- [ ] 4B.3 Build `PathCard.tsx` (large cards with icons, hover effects)
- [ ] 4B.4 Build `PopulationItem.tsx` (icon + title + desc)
- [ ] 4B.5 Build `ValueProp.tsx` (numbered grid items)

### 4C: Sections
- [ ] 4C.1 Build `SectionHeader.tsx` (label + headline + intro)
- [ ] 4C.2 Build `HomeTimeline.tsx` (**VERTICAL** timeline with scroll-fill animation)
- [ ] 4C.3 Build `CTASection.tsx` (dual CTA buttons)

### 4D: Assemble Home Page
- [ ] 4D.1 Build `Home.tsx` assembling all components in correct order:
  ```
  HomeHero (video + dashboard)
  Audience Paths section
  GoogleReviewCard grid (3 cards) - "Google Reviews"
  SectionHeader ("Three steps...")
  HomeTimeline (VERTICAL with scroll animation)
  GoogleReviewCard grid (3 cards) - "Exceeded Expectations"
  PathCard stack (3 cards)
  Locations section (map + state badges)
  PopulationItem grid (7 items)
  ValueProp grid (6 items)
  TestimonialCard grid (3 cards)
  CTASection
  ```
- [ ] 4D.2 Verify Home.tsx matches index.html exactly
- [ ] 4D.3 Commit Phase 4

---

## Phase 5: Jobseekers Page

**Objective:** Build components unique to jobseekers.html, then assemble page.

- [ ] 5.1 Build `PageHero.tsx` (shared subpage hero)
- [ ] 5.2 Build `SplitSection.tsx` (image + content, reversible)
- [ ] 5.3 Build `CaseStudiesTabs.tsx` (tabbed scrollable content)
- [ ] 5.4 Build `ProcessGrid.tsx` (numbered cards)
- [ ] 5.5 Assemble `Jobseekers.tsx` matching original exactly
- [ ] 5.6 Verify Jobseekers.tsx matches jobseekers.html
- [ ] 5.7 Commit Phase 5

---

## Phase 6: Employers Page

**Objective:** Build components unique to employers.html, then assemble page.

- [ ] 6.1 Build `ValueCard.tsx` (number + title + desc)
- [ ] 6.2 Build `RoleItem.tsx` (icon + label pills)
- [ ] 6.3 Build `FAQAccordion.tsx` (expandable Q&A)
- [ ] 6.4 Assemble `Employers.tsx` matching original exactly
- [ ] 6.5 Verify Employers.tsx matches employers.html
- [ ] 6.6 Commit Phase 6

---

## Phase 7: Partners Page

**Objective:** Build components unique to partners.html, then assemble page.

- [ ] 7.1 Build `TrustStrip.tsx` (stats with large numbers)
- [ ] 7.2 Build `ProgramGrid.tsx` (label + content rows)
- [ ] 7.3 Build `FeatureGrid.tsx` (2-col icon/title/desc)
- [ ] 7.4 Build `ListGrid.tsx` (icon + text items)
- [ ] 7.5 Assemble `Partners.tsx` matching original exactly
- [ ] 7.6 Verify Partners.tsx matches partners.html
- [ ] 7.7 Commit Phase 7

---

## Phase 8: About Page

**Objective:** Build components unique to about.html, then assemble page.

- [ ] 8.1 Build `AboutTimeline.tsx` (vertical alternating timeline)
- [ ] 8.2 Build `GlanceGrid.tsx` (counter items)
- [ ] 8.3 Build `EvidenceGrid.tsx` (detailed evidence cards)
- [ ] 8.4 Build `MatrixGrid.tsx` (population/program descriptions)
- [ ] 8.5 Build `ScorecardGrid.tsx` (bullet-list cards)
- [ ] 8.6 Assemble `About.tsx` matching original exactly
- [ ] 8.7 Verify About.tsx matches about.html
- [ ] 8.8 Commit Phase 8

---

## Phase 9: JavaScript Behaviors

**Objective:** Convert scroll animations and behaviors to React hooks.

- [ ] 9.1 Build `useNavScrollState.ts` (3-state: transparent → scrolled → below-hero)
- [ ] 9.2 Build `useIntersectionObserver.ts` (generic scroll-triggered animations)
- [ ] 9.3 Build `useScrollProgress.ts` (timeline progress, scroll bar)
- [ ] 9.4 Build `useCountUp.ts` (animated number counters)
- [ ] 9.5 Apply hooks to all components needing animation
- [ ] 9.6 Verify all scroll animations work
- [ ] 9.7 Commit Phase 9

---

## Phase 10: Final Verification

**Objective:** Ensure 98% match across all pages.

### Build & Lint
- [ ] 10.1 Run `npm run build` - fix all errors
- [ ] 10.2 Run `npm run lint` on changed files - fix errors

### Visual Verification (per page)
- [ ] 10.3 Home: Layout, text, colors, fonts, spacing, hover, scroll animations, mobile
- [ ] 10.4 Jobseekers: Layout, text, colors, fonts, spacing, hover, scroll animations, mobile
- [ ] 10.5 Employers: Layout, text, colors, fonts, spacing, hover, scroll animations, mobile
- [ ] 10.6 Partners: Layout, text, colors, fonts, spacing, hover, scroll animations, mobile
- [ ] 10.7 About: Layout, text, colors, fonts, spacing, hover, scroll animations, mobile

### Final
- [ ] 10.8 Fix any remaining discrepancies
- [ ] 10.9 Final commit

---

## Component Reference Quick Lookup

| Component | Source File | Key Feature |
|-----------|-------------|-------------|
| `Nav` | index.html | 3-state scroll behavior |
| `Footer` | index.html | 4-column layout |
| `HomeHero` | index.html | Video background + glass dashboard |
| `MetricCard` | index.html | Animated counters |
| `GoogleReviewCard` | index.html | Google logo, 5 stars |
| `TestimonialCard` | index.html | Quote mark, cite footer |
| `PathCard` | index.html | Large cards, hover effects |
| `PopulationItem` | index.html | Icon + title + desc |
| `ValueProp` | index.html | Numbered grid items |
| `SectionHeader` | index.html | Label + headline + intro |
| `HomeTimeline` | index.html | **VERTICAL** scroll-fill |
| `CTASection` | index.html | Dual CTA buttons |
| `PageHero` | jobseekers.html | Shared subpage hero |
| `SplitSection` | jobseekers.html | Image + content, reversible |
| `CaseStudiesTabs` | jobseekers.html | Tabbed scrollable |
| `ProcessGrid` | jobseekers.html | Numbered cards |
| `ValueCard` | employers.html | Number + title + desc |
| `RoleItem` | employers.html | Icon + label pills |
| `FAQAccordion` | employers.html | Expandable Q&A |
| `TrustStrip` | partners.html | Stats, large numbers |
| `ProgramGrid` | partners.html | Label + content rows |
| `FeatureGrid` | partners.html | 2-col icon/title/desc |
| `ListGrid` | partners.html | Icon + text items |
| `AboutTimeline` | about.html | Vertical alternating |
| `GlanceGrid` | about.html | Counter items |
| `EvidenceGrid` | about.html | Detailed cards |
| `MatrixGrid` | about.html | Grid descriptions |
| `ScorecardGrid` | about.html | Bullet-list cards |

---

## Files to Modify

### Delete & Rebuild
- All files in `site/src/components/`
- All files in `site/src/pages/`

### Update
- `site/src/styles/globals.css` - All CSS variables, base styles, theme classes
- `site/src/styles/animations.css` - Scroll animations, transitions
- `site/src/styles/components.css` - Complex component styles

### Keep As-Is
- `site/package.json`
- `site/vite.config.ts`
- `site/tailwind.config.ts`
- `site/postcss.config.js`
