# Component Library

This document catalogs reusable components across jobseekers.html, employers.html, partners.html, and about.html.

---

## Design Decisions & Recommendations

### Color Theming (KEEP - Intentional)
- **Jobseekers & About:** Red accent (`--aw-red`) — warmer, more personal tone
- **Employers & Partners:** Blue accent (`--aw-blue`) — professional, corporate tone

This applies to: nav CTA buttons, scroll progress bar, hero overlays, quote marks, section label prefixes, button colors, hover accents.

### Section Background Rule (STANDARDIZE)

Use consistent backgrounds based on content type, not position:

| Section Type | Background |
|--------------|------------|
| Hero | Dark (gray-950 with image overlay) |
| Stats/Trust strips | White |
| Split sections | White (content side can use gray-50 with `.alt-bg`) |
| Process/Steps grids | Gray-50 |
| Testimonials | White |
| FAQ | Gray-50 |
| CTA | Dark (gray-950) |
| Footer | Dark (gray-900) |

This ensures users develop consistent expectations and prevents adjacent same-colored sections.

### Components to Consolidate (Unintentional Differences)

| Component | Current State | Recommendation |
|-----------|---------------|----------------|
| **Process/Steps Grid** | 3 different implementations across pages | Unify into one `.process-grid` with card/no-card modifier |
| **Testimonial Cards** | Partners has left border accent; Jobseekers doesn't | Standardize on Partners version (with border) using page colors |
| **FAQ Accordion** | Employers uses full border box; Partners uses border-bottom only | Pick one style (recommend border-bottom for cleaner look) |
| **Feature lists in split sections** | Partners has elaborate bordered grid; Jobseekers has simple bullets | Unify to one pattern |
| **CTA button arrows** | Inconsistent presence | Always include arrow on primary CTAs |

### Components That Are Fine As-Is (Intentional Variation)

- Split section `.reverse` alternating (creates visual rhythm)
- Split section `.alt-bg` modifier (provides contrast)
- Secondary nav links per page (different sections to link to)
- Testimonial grid columns (2 vs 3 based on content amount)
- About page unique components (timeline, evidence grid, founder cards)

---

## 1. Head/Setup Components

### Tailwind Config
**Used on:** All pages (identical)
```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { display, body, mono, crimson },
      fontSize: { 'display-xl', 'display-lg', 'display-md' },
      colors: { 'aw-red', 'aw-blue', 'accent-cyan', 'accent-green' },
      maxWidth: { 'container': '87.5rem' }
    }
  }
}
```

### CSS Variables (`:root`)
**Used on:** All pages (identical)
- Typography: `--font-display`, `--font-body`, `--font-mono`
- Type Scale: `--text-display-xl` through `--text-xs`
- Brand Colors: `--aw-red`, `--aw-blue`, accents
- Grays: `--gray-50` through `--gray-950`
- Shadows, Spacing, Easing

### Grain Texture Overlay (`body::before`)
**Used on:** All pages (identical)
- Fixed SVG noise texture at 3% opacity

---

## 2. Navigation Components

### Primary Navigation (`.primary-nav`)
**Used on:** All pages (identical structure)
- Fixed position, transparent initially
- Logo + site name
- Nav links: Jobseekers, Employers, Partners, News, Events, About
- CTA button (Contact)
- Three scroll states: transparent → blur in hero → solid below hero

**Variation:** CTA button color
- Jobseekers: `--aw-red`
- Employers, Partners, About: `--aw-blue`

### Secondary Navigation (`.secondary-nav`)
**Used on:** All pages (different links per page)
- Appears after scrolling past hero
- Page-specific section links
- Same styling as primary nav

**Variations by page:**
- Jobseekers: Services, Process, Stories, Get Started
- Employers: Why Partner, Process, FAQ, Submit Job Order
- Partners: Services, Why Partner, Process, FAQ, Contact
- About: Evidence, Populations, Timeline, Founders, Request Briefing

### Scroll Progress Bar (`.scroll-progress-bar`)
**Used on:** All pages
- Fixed 3px bar at top of page

**Variation:** Color
- Jobseekers, About: `--aw-red`
- Employers, Partners: `--aw-blue`

---

## 3. Hero Section

### Full-Screen Hero (`.hero`)
**Used on:** All pages
- `min-height: 100vh`
- Background image with gradient overlay
- Hero content: label, headline, subheadline, CTA buttons

**Structure:**
```html
<section class="hero">
  <div class="hero-image-bg"><img></div>
  <div class="hero-overlay"></div>
  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-label">// Label Text</div>
      <h1 class="hero-headline">...</h1>
      <p class="hero-subheadline">...</p>
      <div class="hero-ctas">...</div>
    </div>
  </div>
</section>
```

**Variations:**
| Page | Overlay Gradient |
|------|------------------|
| Jobseekers | Red (75%) → Blue (65%) |
| Employers | Blue (85%) → Blue-dark (75%) |
| Partners | Blue (85%) → Blue-dark (75%) |
| About | Red (85%) → Blue (75%) |

---

## 4. Section Header Component

### Centered Section Header (`.section-header`)
**Used on:** All pages (very common)

**Structure:**
```html
<header class="section-header text-center mb-24">
  <div class="section-label">// Label</div>
  <h2>Headline</h2>
  <p class="section-intro">Intro text...</p>
</header>
```

**Variations:**
- Label prefix color: Red (`--aw-red`) or Blue (`--aw-blue`)
- Some omit the intro paragraph

---

## 5. Split Section (Image + Content)

### Split Section (`.split-section`)
**Used on:** Jobseekers (4x), Employers (2x), Partners (2x)

**Structure:**
```html
<section class="split-section [reverse] [blue]">
  <div class="split-image">
    <img>
  </div>
  <div class="split-content [alt-bg]">
    <div class="split-content-inner">
      <div class="section-label">...</div>
      <h2 class="split-headline">...</h2>
      <p class="split-description">...</p>
      <ul class="feature-list">...</ul>
      <a class="btn-link">...</a>
    </div>
  </div>
</section>
```

**Variations:**
- `.reverse`: Image on right, content on left
- `.blue`: Blue accent color instead of red
- `.alt-bg`: Gray background on content side (Employers, Partners)
- Image overlay gradient color varies with `.blue` class

### Feature List (inside Split Section)
**Used on:** Jobseekers (4x), Employers (1x), Partners (2x)

```html
<ul class="feature-list">
  <li class="feature-item">Item text</li>
</ul>
```
- Left border accent bar (red or blue)

---

## 6. Process/Steps Grid

### Process Grid (`.process-grid`)
**Used on:** Jobseekers, Employers, Partners, About

**Structure:**
```html
<div class="process-grid grid-cols-4">
  <div class="process-card">
    <div class="process-number">01</div>
    <h3>Title</h3>
    <p>Description</p>
  </div>
  <!-- repeat -->
</div>
```

**Variations:**
| Page | Background | Accent Color | Card BG |
|------|------------|--------------|---------|
| Jobseekers | gray-50 | red | white |
| Employers | white | blue | gray-50 |
| Partners | gray-50 | blue | gray-50→white on hover |
| About (steps-grid) | white/gray-50 | - | - |

**Note:** About page uses `.steps-grid` with similar structure but different styling (no cards, just numbered items)

---

## 7. Card Components

### Testimonial Card (`.testimonial-card`)
**Used on:** Jobseekers (9 cards across 3 sections), Employers (5 cards), Partners (3 cards)

**Structure:**
```html
<div class="testimonial-card">
  <p class="testimonial-text">Quote...</p>
  <p class="testimonial-author">— Author</p>
</div>
```

**Features:**
- Large quotation mark pseudo-element (`::before`)
- Italic text
- Hover: lift + shadow

**Variations:**
- Quote mark color: Red (Jobseekers) or Blue (Employers, Partners)
- Grid columns: 3 (Jobseekers), 2 or 3 (Employers), 2 or 3 (Partners)

### Value/Feature Card (`.value-card`)
**Used on:** Employers (4 cards)

```html
<div class="value-card">
  <div class="value-number">01</div>
  <h3>Title</h3>
  <p>Description</p>
</div>
```
- Top line animation on hover

### Role Item Card (`.role-item`)
**Used on:** Employers only

```html
<div class="role-item">
  <i data-lucide="icon"></i>
  <span>Role name</span>
</div>
```
- Icon + text
- 3-column grid

---

## 8. Grid/List Components

### Trust Strip / Stats Grid
**Used on:** Partners (`.trust-strip`)

```html
<div class="trust-grid grid-cols-4">
  <div class="trust-item">
    <div class="trust-number">40+</div>
    <div class="trust-label">Description</div>
  </div>
</div>
```
- Large numbers, editorial style

### List Grid (`.list-grid`)
**Used on:** Partners

```html
<div class="list-grid grid-cols-3">
  <div class="list-item">
    <div class="list-icon"><i data-lucide=""></i></div>
    <p>Text</p>
  </div>
</div>
```

### Feature Grid (editorial style)
**Used on:** Partners (`.feature-grid`)
- 2-column grid of icon + title + description items

### Glance Grid
**Used on:** About (`.glance-grid`)
- Similar to trust-grid but with icons and longer descriptions
- Counter-based numbering

### Evidence Grid
**Used on:** About (`.evidence-grid`)
- 2-column grid of detailed evidence cards
- Counter numbering, hover effects

### Matrix Grid
**Used on:** About (`.matrix-grid`)
- 2-column grid for population/program descriptions
- Hover top-border animation

### Scorecard Grid
**Used on:** About (`.scorecard-grid`)
- 3-column grid of bullet-list cards

---

## 9. Program/Accordion Components

### Program Grid
**Used on:** Partners (`.program-grid`)

```html
<div class="program-grid">
  <div class="program-item">
    <div class="program-label">Program Name</div>
    <div class="program-content"><p>Description</p></div>
  </div>
</div>
```
- Label + content two-column layout within each row

### FAQ Accordion
**Used on:** Employers, Partners

```html
<div class="faq-item">
  <button class="faq-question">
    <span>Question</span>
    <i data-lucide="chevron-down" class="faq-icon"></i>
  </button>
  <div class="faq-answer">
    <div class="faq-answer-content">Answer...</div>
  </div>
</div>
```

**Variation:** Partners has slightly different styling (border-bottom instead of full border)

---

## 10. Case Studies / Tabs Component

### Tabbed Content
**Used on:** Jobseekers only

```html
<div class="case-studies-tabs">
  <div class="flex gap-2 mb-8">
    <button class="case-tab active" data-tab="name">Name</button>
  </div>
  <div class="case-content-wrapper">
    <div class="case-content active" data-content="name">...</div>
  </div>
</div>
```
- Pill-style tab buttons
- Scrollable content area
- Video + tabs layout

---

## 11. Timeline Component

### Timeline
**Used on:** About only (`.timeline-section`)

Complex two-row alternating design with:
- Horizontal timeline line
- Animated progress bar
- Items positioned above/below line
- Dot markers with connecting lines
- Scroll-triggered animations

---

## 12. CTA Section

### Dark CTA Section (`.cta-section`)
**Used on:** All pages

**Structure:**
```html
<section class="cta-section" id="contact">
  <div class="container">
    <div class="cta-content">
      <h2>Headline</h2>
      <p>Description</p>
      <div class="cta-buttons">
        <a class="btn-white">Primary CTA</a>
        <a class="btn-outline-white">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>
```

**Features:**
- Dark background (`gray-950`)
- Grid pattern overlay
- White and outline-white buttons

**Variations:**
- About page includes a bullet list before buttons

---

## 13. Button Components

### Primary Button (`.btn-primary`)
**Used in:** Hero sections
- White background, dark text
- Arrow icon
- Hover: lift + shadow

### Secondary Button (`.btn-secondary`)
**Used in:** Hero sections
- Transparent, white border
- Hover: slight background

### Link Button (`.btn-link`)
**Used in:** Split sections
- Text link with arrow
- Underline animation on hover
- Color matches section accent (red/blue)

### White Button (`.btn-white`)
**Used in:** CTA sections
- Same as btn-primary but in dark context

### Outline White Button (`.btn-outline-white`)
**Used in:** CTA sections
- Transparent with white border

### Nav CTA (`.nav-cta`)
**Used in:** Navigation
- Colored background (red or blue)
- Rounded

---

## 14. Footer

### Footer (`.footer`)
**Used on:** All pages (identical structure)

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content grid-cols-4">
      <div class="footer-section">
        <h4>Column Title</h4>
        <ul class="footer-links">...</ul>
      </div>
      <!-- 4 columns total -->
    </div>
    <div class="footer-bottom">
      <p>© 2024 America Works...</p>
    </div>
  </div>
</footer>
```

**Variations:** Different links in "For [Audience]" column based on page

---

## 15. Utility/Effects

### Inline Quote
**Used on:** Jobseekers

```html
<blockquote class="border-l-3 border-aw-red pl-4 italic">Quote</blockquote>
```

### History Highlight
**Used on:** About

```html
<div class="history-highlight">Content with left border</div>
```

### Custom Scrollbar (`.custom-scrollbar`)
**Used on:** Jobseekers (case studies content wrapper)

---

## Consolidation Plan

### Process Grid → Unified Component
Merge these three patterns into one `.process-grid`:
- **Process Grid:** Numbered cards (Jobseekers, Employers)
- **Steps Grid:** Numbered items without cards (Partners, About)
- **Value Grid:** Editorial grid with borders (Employers)

**Target implementation:**
```html
<div class="process-grid [process-grid--cards] [process-grid--minimal]">
  <div class="process-item">
    <span class="process-number">01</span>
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```
- Default: minimal style (no cards)
- `--cards`: adds card backgrounds
- Colors inherit from page theme

### Editorial Grids → Keep Separate
These serve distinct purposes and should remain separate components:
- **Trust Grid:** Stats with big numbers (Partners intro)
- **Glance Grid:** Icons + short descriptions (About intro)
- **Evidence Grid:** Detailed citation cards (About only)

### Testimonial Cards → Standardize with Border
All testimonial cards should use this pattern:
```css
.testimonial-card {
  background: var(--white);
  border-left: 3px solid var(--gray-200);
  /* On hover: border-left-color changes to theme color */
}
```
Grid columns (2 or 3) remain flexible based on content.

### FAQ Accordion → Border-Bottom Style
Standardize on the cleaner border-bottom approach:
```css
.faq-item {
  border-bottom: 1px solid var(--gray-200);
}
```
