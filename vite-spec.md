# Vite + React + Tailwind Specification

## Overview

Convert the America Works multi-HTML static site into a Vite + React + TypeScript + Tailwind application with comprehensive shared components.

---

## Decisions

| Decision | Choice |
|----------|--------|
| Language | TypeScript |
| Components | Comprehensive (~32 shared components) |
| CSS approach | Hybrid: Tailwind for utilities, custom CSS for hero/gradients/animations |
| Theming | CSS classes (`.theme-red`, `.theme-blue`) on page wrapper |
| Animations | Preserve all scroll behaviors via React hooks/Intersection Observer |
| Scope | Core pages only (skip reviews.html, chatbot/ for now) |

---

## Project Structure

```
site/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── index.html
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── styles/
│   │   ├── globals.css          # Tailwind directives + CSS variables
│   │   ├── animations.css       # Scroll animations, transitions
│   │   └── components.css       # Complex component styles (hero overlays, etc.)
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useNavScrollState.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── SecondaryNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ScrollProgressBar.tsx
│   │   │
│   │   ├── heroes/
│   │   │   ├── HomeHero.tsx     # Full dashboard hero with metrics
│   │   │   └── PageHero.tsx     # Shared subpage hero
│   │   │
│   │   ├── sections/
│   │   │   ├── SplitSection.tsx
│   │   │   ├── ProcessGrid.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── SectionHeader.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── ValueCard.tsx
│   │   │   ├── RoleItem.tsx
│   │   │   ├── PathCard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ValueProp.tsx
│   │   │   └── PopulationItem.tsx
│   │   │
│   │   ├── grids/
│   │   │   ├── TrustStrip.tsx
│   │   │   ├── ListGrid.tsx
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── GlanceGrid.tsx
│   │   │   ├── EvidenceGrid.tsx
│   │   │   ├── MatrixGrid.tsx
│   │   │   └── ScorecardGrid.tsx
│   │   │
│   │   ├── interactive/
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── ProgramGrid.tsx
│   │   │   ├── CaseStudiesTabs.tsx
│   │   │   ├── HomeTimeline.tsx
│   │   │   └── AboutTimeline.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── FeatureList.tsx
│   │       └── GrainOverlay.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Jobseekers.tsx
│   │   ├── Employers.tsx
│   │   ├── Partners.tsx
│   │   ├── About.tsx
│   │   ├── Events.tsx
│   │   ├── News.tsx
│   │   └── NotFound.tsx
│   │
│   ├── content/
│   │   ├── events/*.md
│   │   └── news/*.md
│   │
│   └── lib/
│       ├── content.ts           # Markdown loader
│       └── types.ts             # Shared TypeScript types
│
└── public/
    ├── images/
    └── fonts/
```

---

## Component Inventory

### Layout Components
| Component | Source | Notes |
|-----------|--------|-------|
| `Nav` | All pages | 3-state scroll behavior, mobile menu |
| `SecondaryNav` | All pages | Page-specific anchor links |
| `Footer` | All pages | Identical structure |
| `ScrollProgressBar` | All pages | Red/blue based on theme |

### Hero Components
| Component | Source | Notes |
|-----------|--------|-------|
| `HomeHero` | index.html | Dashboard with metrics, unique to home |
| `PageHero` | Subpages | Shared, accepts title/subtitle/backgroundVariant props |

### Section Components
| Component | Source | Props |
|-----------|--------|-------|
| `SplitSection` | Jobseekers, Employers, Partners | `reverse`, `blue`, `altBg`, image, content |
| `ProcessGrid` | All pages | `variant: 'cards' \| 'minimal'`, items array |
| `CTASection` | All pages | headline, description, buttons |
| `SectionHeader` | All pages | label, headline, intro |

### Card Components
| Component | Source | Props |
|-----------|--------|-------|
| `TestimonialCard` | All pages | quote, author, source |
| `ValueCard` | Employers | number, title, description |
| `RoleItem` | Employers | icon, label |
| `PathCard` | Index | title, description, href, icon |
| `MetricCard` | Index | value, label, status, animated |
| `ValueProp` | Index | number, title, description |
| `PopulationItem` | Index | icon, title, description |

### Grid Components
| Component | Source | Notes |
|-----------|--------|-------|
| `TrustStrip` | Partners | Stats with large numbers |
| `ListGrid` | Partners | Icon + text items |
| `FeatureGrid` | Partners | 2-column icon/title/desc |
| `GlanceGrid` | About | Counter-numbered items |
| `EvidenceGrid` | About | Detailed evidence cards |
| `MatrixGrid` | About | Population/program descriptions |
| `ScorecardGrid` | About | Bullet-list cards |

### Interactive Components
| Component | Source | Notes |
|-----------|--------|-------|
| `FAQAccordion` | Employers, Partners | Border-bottom style, expand/collapse |
| `ProgramGrid` | Partners | Label + content rows |
| `CaseStudiesTabs` | Jobseekers | Tabbed content with scrollable area |
| `HomeTimeline` | Index | Horizontal progressive timeline with scroll animation |
| `AboutTimeline` | About | Vertical alternating timeline with scroll animation |

### UI Components
| Component | Notes |
|-----------|-------|
| `Button` | Variants: primary, secondary, white, outline, link |
| `FeatureList` | Bullet list with accent border |
| `GrainOverlay` | Fixed noise texture overlay |

---

## Theming System

### CSS Classes
```css
/* Apply to page wrapper */
.theme-red { --theme-color: var(--aw-red); }
.theme-blue { --theme-color: var(--aw-blue); }
```

### Page Theme Assignments
| Page | Theme Class |
|------|-------------|
| Home | `.theme-red` |
| Jobseekers | `.theme-red` |
| About | `.theme-red` |
| Employers | `.theme-blue` |
| Partners | `.theme-blue` |
| Events | `.theme-blue` |
| News | `.theme-blue` |

**Exception:** Home page nav CTA uses blue (`--aw-blue`) despite red theme elsewhere.

### Section Backgrounds
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

---

## Scroll Behavior Hooks

### `useScrollProgress`
- Returns 0-1 scroll progress
- Updates ScrollProgressBar width

### `useNavScrollState`
- Returns: `'top' | 'in-hero' | 'below-hero'`
- Controls nav background/text color transitions

### `useIntersectionObserver`
- Generic hook for scroll-triggered animations
- Used by: testimonial cards, timeline, value props

---

## Tailwind Config

```ts
// tailwind.config.ts
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        body: ['General Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        crimson: ['Crimson Text', 'serif'],
      },
      colors: {
        'aw-red': { DEFAULT: '#ec140c', dark: '#c7130c' },
        'aw-blue': { DEFAULT: '#323b97', dark: '#252e6e' },
        'accent-cyan': '#00d4ff',
        'accent-green': '#10b981',
      },
      maxWidth: {
        'container': '87.5rem',
      },
    },
  },
};
```

---

## Source Files Reference

| Current File | Key Components to Extract |
|--------------|---------------------------|
| `index.html` | HomeHero, HomeTimeline, PathCard, MetricCard, ValueProp, PopulationItem |
| `jobseekers.html` | PageHero, SplitSection, CaseStudiesTabs, TestimonialCard |
| `employers.html` | ValueCard, RoleItem, FAQAccordion, ProcessGrid |
| `partners.html` | TrustStrip, ProgramGrid, FeatureGrid, ListGrid |
| `about.html` | AboutTimeline (vertical), EvidenceGrid, MatrixGrid, GlanceGrid, ScorecardGrid |
| `components.md` | Component patterns reference |

---

## CSS Organization

### globals.css
- Tailwind directives (`@tailwind base/components/utilities`)
- CSS custom properties (colors, typography, spacing)
- Theme classes (`.theme-red`, `.theme-blue`)

### animations.css
- Scroll-triggered fade/slide animations
- Timeline progress animations
- Nav transition states

### components.css
- Hero overlay gradients
- Complex hover effects
- Grain texture overlay
- Any styles too complex for Tailwind utilities

---

## Notes

- Keep complex CSS (hero overlays, gradient animations) in separate CSS files, not inline Tailwind
- Use CSS variables for values that need runtime access (theming)
- Preserve existing Tailwind utility classes from HTML files
- Each component should be self-contained with its required styles
