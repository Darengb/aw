# America Works: Vite to Next.js Conversion Plan

## Goal

Convert the existing Vite + React site (`/site`) to a Next.js 16 static site (`/web`) using the App Router with `output: "export"`. No server-side features. The result should be visually and functionally identical to the current site.

## Decisions

- **Fonts:** Use `next/font/google` for self-hosted Google Fonts (Instrument Serif, Inter, JetBrains Mono, Crimson Text). Remove external `<link>` tags.
- **Scope:** Strict 1:1 copy. No new features, no design changes.
- **Icons:** Remove the vanilla Lucide pattern (`createIcons` / `data-lucide`). Convert all icons to `lucide-react` React components. No icons use keyframe animations — they only have CSS transitions (scale, color) on wrapper elements, so this is safe.

## Stack

| Dependency | Version |
|---|---|
| `next` | 16.1.6 (`next@latest`) |
| `react` | 19.x |
| `react-dom` | 19.x |
| `typescript` | ~5.9 |
| `tailwindcss` | 3.4.x |
| `postcss` | 8.x |
| `autoprefixer` | 10.x |
| `lucide-react` | 0.562.x |
| `front-matter` | 4.x (for markdown content parsing) |

### Removed dependencies (not carried forward)

- `react-router-dom` — replaced by Next.js file-based routing
- `lucide` (vanilla) — replaced by `lucide-react` components
- `vite`, `@vitejs/plugin-react` — replaced by Next.js
- `gray-matter` — unused (only `front-matter` is actually called)

---

## Architecture

### File Structure

```
web/
  app/
    layout.tsx              # Server component: fonts, metadata, CSS, wraps ClientShell
    page.tsx                # Home (/) — thin server wrapper, imports HomeClient
    jobseekers/page.tsx     # Thin server wrapper
    employers/page.tsx
    partners/page.tsx
    about/page.tsx
    news/page.tsx           # Server component: reads markdown via fs, passes data to NewsClient
    events/page.tsx         # Server component: reads markdown via fs, passes data to EventsClient
    not-found.tsx           # 404 page
  components/
    layout/
      ClientShell.tsx       # "use client" — theming, scroll progress, IntersectionObserver
      Nav.tsx               # "use client" — scroll state, mobile menu, usePathname
      Footer.tsx            # "use client" — uses next/link
    home/
      HomeHero.tsx          # No hooks, no state
      HomeTimeline.tsx      # "use client" — useEffect, useRef (x4), scroll/resize listeners
      CTASection.tsx        # "use client" — uses next/link
      MetricCard.tsx        # No hooks
      PathCard.tsx          # "use client" — uses next/link
      PopulationItem.tsx    # No hooks (icon passed as React component via prop)
      SectionHeader.tsx     # No hooks
      TestimonialCard.tsx   # No hooks
      ValueProp.tsx         # No hooks (icon passed as React component via prop)
      GoogleReviewCard.tsx  # No hooks
    shared/
      PageHero.tsx          # No hooks (icons become inline lucide-react components)
      SplitSection.tsx      # No hooks (arrow-right icon becomes component)
      AboutTimeline.tsx     # "use client" — useEffect, useRef, IntersectionObserver
      ProcessGrid.tsx       # No hooks
      StepsGrid.tsx         # No hooks
      ValueCard.tsx         # No hooks
      RoleItem.tsx          # No hooks (icon passed as React component via prop)
      FAQAccordion.tsx      # "use client" — useState
      FeatureGrid.tsx       # No hooks (icon mapping via lookup)
      GlanceGrid.tsx        # No hooks (icon mapping via lookup)
      ListGrid.tsx          # No hooks (icon mapping via lookup)
      EvidenceGrid.tsx      # No hooks (uses dangerouslySetInnerHTML)
      MatrixGrid.tsx        # No hooks
      ScorecardGrid.tsx     # No hooks
      TrustStrip.tsx        # No hooks
    jobseekers/
      CaseStudiesTabs.tsx   # "use client" — useState
  hooks/
    useScrollProgress.ts    # "use client" hook — window scroll listener
    useNavScrollState.ts    # "use client" hook — window scroll listener, DOM query
    useCountUp.ts           # "use client" hook — requestAnimationFrame
    useIntersectionObserver.ts  # "use client" hook — IntersectionObserver API
  lib/
    types.ts                # Pure types (Theme, NavState, etc.) — no "use client" needed
    content.ts              # DROPPED — dead code, never imported by anything
    icons.ts                # NEW — lucide-react icon lookup map for dynamic icons
  data/
    usMapSvg.ts             # Large SVG string, dynamically imported on Home only
  utils/
    content.ts              # Rewritten: Node fs-based markdown loader (no import.meta.glob)
  content/                  # Markdown files (copied from /site/content/)
    news/*.md
    events/*.md
  styles/
    globals.css             # Copied with font-family variable fixes
    animations.css          # Copied as-is
    components.css          # Copied as-is
  public/
    images/                 # All images, videos, PDFs copied from /site/public/images/
    favicon.svg             # Copied from /site/public/vite.svg (or new favicon)
```

### Dropped files (not carried forward)

| File | Reason |
|---|---|
| `src/App.tsx` | Logic moves to `layout.tsx` + `ClientShell.tsx` |
| `src/main.tsx` | Next.js manages the entry point |
| `src/index.css` | Vite scaffold CSS (dark bg `#242424`, `color-scheme: light dark`) — orphaned, not imported by any file |
| `src/App.css` | Vite scaffold CSS (logo spin animation, `.card` padding) — orphaned, not imported by any file |
| `src/assets/react.svg` | Vite scaffold asset — not used |
| `src/lib/content.ts` | Dead code — no file imports it |
| `index.html` | Next.js manages the HTML document |
| `vite.config.ts` | Replaced by `next.config.ts` |
| `tsconfig.node.json` | Vite-specific TypeScript config |
| `tsconfig.app.json` | Vite-specific TypeScript config |
| `eslint.config.js` | Can be recreated later if needed |

---

## Layout & ClientShell

### `app/layout.tsx` (Server Component)

```tsx
import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono, Crimson_Text } from 'next/font/google'
import ClientShell from '@/components/layout/ClientShell'
import '@/styles/globals.css'
import '@/styles/animations.css'
import '@/styles/components.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'America Works - Technical Workforce Excellence',
  description: 'America Works - 40 years of proven workforce development',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} ${crimsonText.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
```

### `components/layout/ClientShell.tsx` ("use client")

Absorbs logic from the old `App.tsx > AppContent`:

- **Route theme:** Derives `theme-red` or `theme-blue` from `usePathname()`. Map:
  - Red: `/`, `/jobseekers`, `/about`
  - Blue: `/employers`, `/partners`, `/events`, `/news`
- **No-hero pages:** `['/news', '/events']` — passed as data attribute for nav styling
- **Scroll progress bar:** Uses `useRef` + direct DOM mutation (not `useState`) per performance optimization #4. Renders a `<div ref={barRef}>` and updates `style.width` on scroll.
- **Global IntersectionObserver:** Observes `.section-header`, `.path-card`, `.population-item`, `.value-prop`, `.testimonial-card`, `.metric-card`, `.step-card` — adds `is-visible` class on intersection. Runs on pathname change with 100ms delay.
- **Scroll-to-top:** `window.scrollTo(0, 0)` on pathname change.
- **Renders:** `<div className="theme-{theme}">` wrapping `<Nav />`, `<main>{children}</main>`, `<Footer />`.

---

## Routing Changes

### Files that import `react-router-dom`

Every `import { Link } from 'react-router-dom'` becomes `import Link from 'next/link'`, and every `<Link to="...">` becomes `<Link href="...">`.

| File | What changes |
|---|---|
| `components/layout/Nav.tsx` | `Link` import, all `to=` → `href=`. Replace `useLocation()` with `usePathname()` from `next/navigation`. |
| `components/layout/Footer.tsx` | `Link` import, 8 instances of `<Link to=` → `<Link href=` |
| `components/home/PathCard.tsx` | `Link` import, `<Link to={links[0].href}>` and `<Link to={link.href}>` → `href=` |
| `components/home/CTASection.tsx` | `Link` import, 2 `<Link to=` → `<Link href=` |
| `pages/Home.tsx` | `Link` import, 3 `<Link to=` → `<Link href=` (in audience section nav) |
| `pages/Events.tsx` | `Link` import, 1 `<Link to="/jobseekers">` → `<Link href="/jobseekers">` |

### Nav.tsx specific changes

```diff
- import { Link, useLocation } from 'react-router-dom';
+ 'use client'
+ import Link from 'next/link';
+ import { usePathname } from 'next/navigation';

- const location = useLocation();
+ const pathname = usePathname();

- }, [location.pathname]);
+ }, [pathname]);
```

The `navLinks` array uses `to:` property — rename to `href:`:
```diff
- { to: '/jobseekers', label: 'Jobseekers' },
+ { href: '/jobseekers', label: 'Jobseekers' },
```

---

## Icon Migration

### Complete icon inventory

Every `data-lucide="icon-name"` reference mapped to its `lucide-react` import name:

| Icon string | lucide-react import | Used in |
|---|---|---|
| `hand-coins` | `HandCoins` | Home (populations array) |
| `graduation-cap` | `GraduationCap` | Home (populations), Partners (partnerTypes) |
| `shield` | `Shield` | Home (populations), Partners (partnerTypes) |
| `home` | `House` | Home (populations) — **lucide renamed `Home` → `House` in v0.3+** |
| `key` | `Key` | Home (populations) |
| `heart` | `Heart` | Home (populations), Partners (whyAgenciesFeatures) |
| `accessibility` | `Accessibility` | Home (populations), Partners (partnerTypes) |
| `zap` | `Zap` | Home (valueProps), Partners (whyAgenciesFeatures) |
| `target` | `Target` | Home (valueProps), Partners (whyAgenciesFeatures) |
| `bar-chart-3` | `ChartBar` | Home (valueProps), Partners (whyAgenciesFeatures) — **lucide renamed `BarChart3` → `ChartBar`** |
| `scale` | `Scale` | Home (valueProps), About (innovationItems) |
| `handshake` | `Handshake` | Home (valueProps) |
| `shield-check` | `ShieldCheck` | Home (valueProps) |
| `map` | `Map` | Home (valueProps), About (glanceItems) |
| `award` | `Award` | Home (valueProps), About (glanceItems), Partners (whyAgenciesFeatures) |
| `landmark` | `Landmark` | Home (valueProps), About (glanceItems) |
| `check` | `Check` | Home (ticket-to-work badge, inline) |
| `arrow-right` | `ArrowRight` | PageHero, SplitSection, About, Jobseekers, Employers, Partners |
| `chevron-down` | `ChevronDown` | PageHero (secondary CTA), FAQAccordion |
| `building-2` | `Building2` | About (glanceItems) |
| `users` | `Users` | About (glanceItems, innovationItems, clientExperienceItems), Partners (partnerTypes) |
| `heart-pulse` | `HeartPulse` | About (innovationItems) |
| `monitor` | `Monitor` | About (innovationItems) |
| `church` | `Church` | About (innovationItems) |
| `heart-handshake` | `HeartHandshake` | About (clientExperienceItems) |
| `building` | `Building` | About (clientExperienceItems), Partners (partnerTypes) |
| `hand-helping` | `HandHelping` | About (clientExperienceItems), Jobseekers (experienceCards) |
| `settings-2` | `Settings2` | About (inline in innovation section) |
| `flask-conical` | `FlaskConical` | About (inline in innovation section) |
| `file-text` | `FileText` | About (inline link), Partners (inline link, performanceFeatures) |
| `user-check` | `UserCheck` | Jobseekers (experienceCards) |
| `message-circle` | `MessageCircle` | Jobseekers (experienceCards) |
| `map-pin` | `MapPin` | Jobseekers (inline), Employers (inline) |
| `phone` | `Phone` | Employers (inline) |
| `briefcase` | `Briefcase` | Employers (roles), Partners (partnerTypes, serviceModelFeatures, whyAgenciesFeatures) |
| `headphones` | `Headphones` | Employers (roles) |
| `shopping-bag` | `ShoppingBag` | Employers (roles) |
| `utensils` | `Utensils` | Employers (roles) |
| `truck` | `Truck` | Employers (roles) |
| `wrench` | `Wrench` | Employers (roles) |
| `user` | `User` | Employers (roles) |
| `check-circle` | `CircleCheck` | Partners (serviceModelFeatures) — **lucide renamed `CheckCircle` → `CircleCheck`** |
| `book-open` | `BookOpen` | Partners (serviceModelFeatures) |
| `trending-up` | `TrendingUp` | Partners (serviceModelFeatures, performanceFeatures) |
| `sliders` | `Sliders` | Partners (whyAgenciesFeatures) |
| `dollar-sign` | `DollarSign` | Partners (performanceFeatures) |

**Already using `lucide-react` (no changes needed):**

| Component | Icons imported |
|---|---|
| `News.tsx` | `ExternalLink` |
| `Events.tsx` | `MapPin`, `Clock`, `ChevronDown`, `ArrowRight` |

### Icon migration patterns

**Pattern A — Static icon (hardcoded name):**
```diff
- <i data-lucide="arrow-right" style={{ width: '18px', height: '18px' }}></i>
+ <ArrowRight size={18} />
```
Used in: `PageHero`, `SplitSection`, `About` (inline), `Jobseekers` (inline), `Employers` (inline), `Partners` (inline)

**Pattern B — Dynamic icon (from prop or data array):**

Components that receive an `icon: string` prop and render `<i data-lucide={icon}>` need a different approach. Create a shared icon lookup map:

**`lib/icons.ts`** (new file):
```ts
import {
  HandCoins, GraduationCap, Shield, House, Key, Heart,
  Accessibility, Zap, Target, ChartBar, Scale, Handshake, ShieldCheck,
  Map, Award, Landmark, Building2, Users, HeartPulse, Monitor, Church,
  HeartHandshake, Building, HandHelping, UserCheck, MessageCircle,
  Briefcase, Headphones, ShoppingBag, Utensils, Truck, Wrench, User,
  CircleCheck, BookOpen, TrendingUp, Sliders, DollarSign,
  type LucideIcon,
} from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  'hand-coins': HandCoins,
  'graduation-cap': GraduationCap,
  'shield': Shield,
  'home': House,
  'key': Key,
  'heart': Heart,
  'accessibility': Accessibility,
  'zap': Zap,
  'target': Target,
  'bar-chart-3': ChartBar,
  'scale': Scale,
  'handshake': Handshake,
  'shield-check': ShieldCheck,
  'map': Map,
  'award': Award,
  'landmark': Landmark,
  'building-2': Building2,
  'users': Users,
  'heart-pulse': HeartPulse,
  'monitor': Monitor,
  'church': Church,
  'heart-handshake': HeartHandshake,
  'building': Building,
  'hand-helping': HandHelping,
  'user-check': UserCheck,
  'message-circle': MessageCircle,
  'briefcase': Briefcase,
  'headphones': Headphones,
  'shopping-bag': ShoppingBag,
  'utensils': Utensils,
  'truck': Truck,
  'wrench': Wrench,
  'user': User,
  'check-circle': CircleCheck,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  'sliders': Sliders,
  'dollar-sign': DollarSign,
}
```

Then in components like `PopulationItem`, `ValueProp`, `RoleItem`, `GlanceGrid`, `ListGrid`, `FeatureGrid`:
```diff
+ import { iconMap } from '@/lib/icons'

- <i data-lucide={icon}></i>
+ {(() => { const Icon = iconMap[icon]; return Icon ? <Icon /> : null })()}
```

Or, cleaner: change these components to accept a `LucideIcon` component type as the prop instead of a string, and update the data arrays to pass the actual component. This avoids the runtime lookup entirely but requires updating the data arrays in each page.

**Recommendation:** Use the icon map (`lib/icons.ts`) approach. It's a single file, easy to maintain, and means the data arrays don't need to change their shape. The `optimizePackageImports` config ensures only the used icons ship.

**Pattern C — FAQ chevron (static, single icon):**
```diff
- <i data-lucide="chevron-down" className="faq-icon"></i>
+ <ChevronDown className="faq-icon" />
```

---

## Font Changes

### Google Fonts loaded via `next/font`

| Font | Weights | Styles | CSS Variable |
|---|---|---|---|
| Instrument Serif | 400 | normal, italic | `--font-display` |
| Inter | 300, 400, 500, 600, 700 | normal | `--font-body` |
| JetBrains Mono | 400, 500, 600, 700 | normal | `--font-mono` |
| Crimson Text | 400, 600, 700 | normal | `--font-crimson` |

### CSS variable fixes in `globals.css`

The current `globals.css` defines `--font-body: 'General Sans', system-ui, ...` but `General Sans` is never loaded — Inter is the actual body font. Same for `Playfair Display` in path cards. Fix these during copy:

```diff
  :root {
    --font-display: 'Instrument Serif', serif;
-   --font-body: 'General Sans', system-ui, -apple-system, sans-serif;
+   --font-body: var(--font-body), system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-dashboard: 'JetBrains Mono', monospace;
  }
```

Wait — `next/font` injects the font via the CSS variable `--font-body` (set on the `<html>` element's class). So the `:root` rule in globals.css would shadow the `next/font` variable. **Fix:** rename the CSS custom properties in globals.css to avoid collision, or remove the `:root` font declarations and let `next/font` + Tailwind handle everything.

**Recommended approach:** Remove the `:root` `--font-*` declarations from `globals.css`. Instead, have the CSS reference Tailwind's `font-display`, `font-body`, `font-mono`, `font-crimson` utilities, which are backed by the `next/font` CSS variables. For the CSS rules that use `var(--font-display)` etc., replace them with the `next/font` variable names:

```css
/* globals.css — these get their values from next/font via <html> class */
:root {
  --font-display: var(--font-display);  /* Set by next/font on <html> */
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
  --font-dashboard: var(--font-mono);   /* Dashboard uses same as mono */
}
```

Actually, the cleanest fix: **name the `next/font` CSS variables differently** (e.g., `--font-instrument`, `--font-inter`, `--font-jbmono`, `--font-crimson`) in `layout.tsx`, then update the `:root` block in `globals.css` to reference those:

```css
:root {
  --font-display: var(--font-instrument), serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-jbmono), monospace;
  --font-dashboard: var(--font-jbmono), monospace;
}
```

And in `layout.tsx`:
```tsx
const instrumentSerif = Instrument_Serif({ ..., variable: '--font-instrument' })
const inter = Inter({ ..., variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ ..., variable: '--font-jbmono' })
const crimsonText = Crimson_Text({ ..., variable: '--font-crimson' })
```

This way all existing `var(--font-display)`, `var(--font-body)`, `var(--font-mono)` references in globals.css and components.css work without changes.

Also fix the hardcoded references:

```diff
  /* globals.css line ~1325 */
  .path-card .h2 {
-   font-family: 'Playfair Display', Georgia, serif;
+   font-family: var(--font-display);
  }

  /* globals.css line ~1370, ~1425 */
  .path-features li,
  .path-card .btn-link {
-   font-family: 'General Sans', -apple-system, sans-serif;
+   font-family: var(--font-body);
  }
```

### Tailwind config `fontFamily`

```ts
fontFamily: {
  display: ['var(--font-instrument)', 'serif'],
  body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['var(--font-jbmono)', 'monospace'],
  dashboard: ['var(--font-jbmono)', 'monospace'],
  crimson: ['var(--font-crimson)', 'serif'],
},
```

---

## Content Loading (News & Events)

### Problem

`utils/content.ts` uses `import.meta.glob` (Vite-specific) to load markdown files from `/content/news/*.md` and `/content/events/*.md`. This doesn't exist in Next.js.

### Solution

Rewrite `utils/content.ts` to use Node.js `fs` + `path` modules. This works because the News and Events pages will call these functions from their **server component** wrappers (which run at build time during `next build`).

**`utils/content.ts`** (rewritten):
```ts
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

const contentDir = path.join(process.cwd(), 'content')

export function getNewsArticles(): NewsArticle[] {
  const dir = path.join(contentDir, 'news')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { attributes } = fm<Record<string, string>>(raw)
    const slug = file.replace('.md', '')
    return {
      title: attributes.title,
      source: attributes.source,
      excerpt: attributes.excerpt,
      url: attributes.url,
      linkText: attributes.linkText,
      slug,
    }
  })
}

export function getEvents(): EventItem[] {
  const dir = path.join(contentDir, 'events')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()

  return files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { attributes, body } = fm<Record<string, unknown>>(raw)
    const slug = file.replace('.md', '')
    return {
      title: attributes.title as string,
      type: attributes.type as string,
      category: attributes.category as string,
      featured: (attributes.featured as boolean) || false,
      date: attributes.date as string,
      month: attributes.month as string,
      day: attributes.day as string,
      year: attributes.year as string,
      time: attributes.time as string,
      location: attributes.location as string,
      description: attributes.description as string,
      content: body.trim(),
      slug,
    }
  })
}

// parseEventContent stays the same — pure string logic, works anywhere
export function parseEventContent(content: string): { intro: string; bullets: string[] } {
  const lines = content.split('\n').filter(line => line.trim())
  let intro = ''
  const bullets: string[] = []
  for (const line of lines) {
    if (line.startsWith('- ')) {
      bullets.push(line.substring(2).trim())
    } else if (!bullets.length) {
      intro += (intro ? ' ' : '') + line.trim()
    }
  }
  return { intro, bullets }
}
```

### Page patterns for News and Events

Since `fs` only works in server components, the page files need to be server components that fetch data and pass it to client components:

**`app/news/page.tsx`** (server component):
```tsx
import { getNewsArticles } from '@/utils/content'
import NewsPage from './NewsClient'

export default function News() {
  const articles = getNewsArticles()
  return <NewsPage articles={articles} />
}
```

**`app/news/NewsClient.tsx`** ("use client"):
Contains the existing News page component logic (IntersectionObserver, refs, rendering) but receives `articles` as a prop instead of calling `getNewsArticles()`.

Same pattern for Events — `app/events/page.tsx` fetches data, `app/events/EventsClient.tsx` renders it.

---

## `"use client"` Directives

### Components that NEED `"use client"`

These use hooks, browser APIs, or event handlers:

| Component | Why |
|---|---|
| `ClientShell.tsx` | `usePathname`, `useEffect`, `useRef`, scroll listener, IntersectionObserver |
| `Nav.tsx` | `useState`, `useEffect`, `usePathname`, `useNavScrollState`, body overflow |
| `Footer.tsx` | Uses `next/link` (Link works in server components, but Footer is rendered inside ClientShell which is already client) |
| `HomeTimeline.tsx` | `useEffect`, `useRef` (x4), scroll/resize listeners, IntersectionObserver |
| `AboutTimeline.tsx` | `useEffect`, `useRef`, IntersectionObserver |
| `FAQAccordion.tsx` | `useState` |
| `CaseStudiesTabs.tsx` | `useState` |
| `CTASection.tsx` | Uses `next/link` (rendered inside client tree) |
| `PathCard.tsx` | Uses `next/link` (rendered inside client tree) |

### Components that DON'T need `"use client"` (but will get it from parent boundary)

These are pure render components with no hooks. They don't need their own `"use client"` directive because they're imported and rendered within a client component tree:

`HomeHero`, `MetricCard`, `SectionHeader`, `GoogleReviewCard`, `TestimonialCard`, `PopulationItem`, `ValueProp`, `PageHero`, `SplitSection`, `ProcessGrid`, `StepsGrid`, `ValueCard`, `RoleItem`, `FeatureGrid`, `GlanceGrid`, `ListGrid`, `EvidenceGrid`, `MatrixGrid`, `ScorecardGrid`, `TrustStrip`

**However:** Since these are imported by page client components, they're already in the client bundle. No directive needed on them specifically — the client boundary propagates from the parent.

### Page files

| Page file | Server or Client? |
|---|---|
| `app/page.tsx` | Can be server — imports HomeClient (client) |
| `app/jobseekers/page.tsx` | Can be server — imports client component |
| `app/employers/page.tsx` | Can be server — imports client component |
| `app/partners/page.tsx` | Can be server — imports client component |
| `app/about/page.tsx` | Can be server — imports client component |
| `app/news/page.tsx` | **Must be server** — calls `fs`-based `getNewsArticles()` |
| `app/events/page.tsx` | **Must be server** — calls `fs`-based `getEvents()` |

For the simple pages (Home, Jobseekers, Employers, Partners, About), the page.tsx can either be a thin server wrapper or just re-export the client component. Since they don't need server-side data, the simplest approach is:

```tsx
// app/jobseekers/page.tsx
import Jobseekers from './JobseekersClient'
export default function Page() { return <Jobseekers /> }
```

---

## Hooks — Changes Required

### `useScrollProgress.ts`

**Performance optimization #4:** Replace `useState` with `useRef` + direct DOM mutation. The hook currently causes a re-render on every scroll pixel. Instead, the scroll progress bar should be driven via ref:

```tsx
// In ClientShell:
const barRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0
    if (barRef.current) barRef.current.style.width = `${progress * 100}%`
  }
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

This means `useScrollProgress.ts` hook is no longer needed — inline the logic in `ClientShell`.

### `useNavScrollState.ts`

**Performance optimization #5:** Wrap `setState` in `startTransition`:
```diff
+ import { startTransition } from 'react'

  if (scrollY === 0) {
-   setState('top')
+   startTransition(() => setState('top'))
  } else if (...) {
-   setState('in-hero')
+   startTransition(() => setState('in-hero'))
  } else {
-   setState('below-hero')
+   startTransition(() => setState('below-hero'))
  }
```

Import path changes:
```diff
- import type { NavState } from '../lib/types'
+ import type { NavState } from '@/lib/types'
```

Scroll listeners already use `{ passive: true }` — no change needed.

### `useCountUp.ts`

No changes needed. Pure browser API usage (requestAnimationFrame), no router dependencies.

### `useIntersectionObserver.ts`

No changes needed. Pure browser API usage.

---

## Home Page — Special Handling

### US Map SVG

**Performance optimization #3:** The `US_MAP_SVG` string in `data/usMapSvg.ts` is ~79K tokens of SVG path data. Dynamically import it:

```tsx
useEffect(() => {
  let cancelled = false

  import('@/data/usMapSvg').then(({ US_MAP_SVG }) => {
    if (cancelled) return
    const container = document.getElementById('us-coverage-map')
    if (!container) return

    container.innerHTML = US_MAP_SVG
    const svg = container.querySelector('svg')
    if (!svg) return

    svg.id = 'us-map'
    svg.style.width = '100%'
    svg.style.height = '100%'

    svg.querySelectorAll('path').forEach(path => {
      const cls = path.getAttribute('class') || ''
      path.classList.add(cls.includes('cls-1') ? 'state-active' : 'state-inactive')
    })

    svg.querySelector('defs')?.remove()
  })

  return () => { cancelled = true }
}, [])
```

This keeps `usMapSvg.ts` out of all other route bundles.

---

## CSS Changes

### Files carried forward

| File | Changes |
|---|---|
| `globals.css` | Fix `:root` font variables (see Font Changes section). Fix hardcoded `General Sans` (lines 1370, 1425) / `Playfair Display` (line 1325). Remove all 4 duplicate keyframes (lines 459, 549, 676, 744). |
| `animations.css` | Copy as-is. |
| `components.css` | Copy as-is. |
| `index.css` | **DROP** — Vite scaffold, orphaned (not imported by any file). |
| `App.css` | **DROP** — Vite scaffold, orphaned (not imported by any file). |

### Duplicate keyframes between globals.css and animations.css

4 keyframe names are defined in both files:

| Keyframe | globals.css | animations.css | Identical? |
|---|---|---|---|
| `fadeInUp` | line 459 | line 6 | Yes — both translateY(24px) |
| `pulse` | line 744 | line 59 | **NO** — globals version animates `box-shadow` (blue ring radiating from dot); animations version animates `opacity` only. But animations.css loads last and already overwrites it — the ring effect is dead code in the current Vite site. |
| `underlineExpand` | line 549 | line 200 | Yes — both scaleX(1) |
| `fadeInSlide` | line 676 | line 206 | Yes — both translateX(20px) |

**Where `pulse` is used:** `.status-pulse` is a 6px blue dot in `HomeHero.tsx` (line 38) inside a `.dashboard-header` div — but that entire div has the `hidden` class (`display: none`). It's deprecated UI that was never removed. `.animate-pulse` is a utility class in animations.css not referenced by any component. Neither `pulse` consumer is visible.

**Resolution:** Remove all 4 duplicate `@keyframes` from `globals.css`. Keep only the `animations.css` versions. Also note: the entire `dashboard-header` block in `HomeHero.tsx` (lines 30–41) is hidden dead code and can be omitted during migration.

---

## Config Files

### `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
```

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-instrument)', 'serif'],
        body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jbmono)', 'monospace'],
        dashboard: ['var(--font-jbmono)', 'monospace'],
        crimson: ['var(--font-crimson)', 'serif'],
      },
      fontSize: {
        // Keep all existing custom sizes
        'display-xl': '7rem',
        'display-lg': '4rem',
        'display-md': '3rem',
        'mono-xl': '3.5rem',
        'mono-lg': '1.75rem',
        'metric-hero': ['5rem', { lineHeight: '1', fontWeight: '400', letterSpacing: '-0.02em' }],
        'metric': '3rem',
        'metric-label': '0.8125rem',
        'metric-tag': '0.625rem',
      },
      colors: {
        'aw-red': { DEFAULT: '#ec140c', dark: '#c7130c' },
        'aw-blue': { DEFAULT: '#323b97', dark: '#252e6e' },
        'accent-cyan': '#00d4ff',
        'accent-violet': '#a855f7',
        'accent-green': '#10b981',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.1)',
      },
      maxWidth: {
        container: '87.5rem',
        reading: '43.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Performance Optimizations (Vercel Best Practices)

Apply these during migration, ordered by impact.

### CRITICAL

1. **`optimizePackageImports` for lucide-react** (`bundle-barrel-imports`)
   - `lucide-react` barrel file loads all 1,583 icon modules on any import. Add to `next.config.ts`:
     ```ts
     experimental: {
       optimizePackageImports: ['lucide-react'],
     }
     ```
   - Next.js will then tree-shake to only the icons actually used.
   - **Note:** Next.js 16 may already include `lucide-react` in its default optimized list. If so, the explicit config is redundant but harmless. Verify after scaffolding by checking if the build already tree-shakes without it.

2. **Passive scroll event listeners** (`client-passive-event-listeners`)
   - All `addEventListener('scroll', ...)` and `addEventListener('touchmove', ...)` calls must use `{ passive: true }`.
   - Applies to: `useScrollProgress` (already has it), `useNavScrollState` (already has it), `HomeTimeline` (already has it). Verified — no changes needed.

### HIGH

3. **Dynamic import `usMapSvg.ts`** (`bundle-conditional`)
   - The US map SVG string is ~79K tokens. Only used on Home page. Dynamic `import()` in `useEffect`.

4. **`useRef` + direct DOM for scroll progress bar** (`rerender-use-ref-transient-values`)
   - Inline the scroll progress logic in `ClientShell` using `useRef`. Drop the `useScrollProgress` hook.

5. **`startTransition` for scroll-driven state updates** (`rerender-transitions`)
   - Wrap `setState` calls in `useNavScrollState` with `startTransition`.

### MAINTAIN (already good patterns)

6. **Hoisted static data arrays** (`rendering-hoist-jsx`)
   - All page data arrays (`googleReviews`, `pathCards`, `populations`, `valueProps`, `testimonials`, etc.) are already defined outside component functions. Maintain this.

7. **Derived route theme** (`rerender-derived-state`)
   - Theme is derived from pathname lookup, not stored as independent state. Maintain in ClientShell.

---

## Execution Checklist

### Phase 1: Scaffold & Config

- [x] Initialize Next.js 16 in `/web` — `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias`
- [x] Clean scaffold files — remove default `page.tsx`, `globals.css`, `layout.tsx`, `favicon.ico` etc.
- [x] Install dependencies — `npm install lucide-react front-matter`
- [x] Write `next.config.ts` per Config section
- [x] Write `tailwind.config.ts` per Config section (font vars, custom sizes, colors, shadows, maxWidth)
- [x] Write `postcss.config.js` per Config section (kept scaffolded postcss.config.mjs with @tailwindcss/postcss for v4)
- [x] Verify `tsconfig.json` has `@/*` path alias and Next.js plugin
- [x] Copy `/site/content/` → `/web/content/` (news + events markdown files)
- [x] Copy `/site/public/images/` → `/web/public/images/` (all images, videos, PDFs)
- [x] Copy `/site/public/vite.svg` → `/web/public/favicon.svg`
- [x] Copy `styles/globals.css` — apply font variable fixes: rename `:root` `--font-*` to reference `--font-instrument`, `--font-inter`, `--font-jbmono`; fix hardcoded `General Sans` (lines 1370, 1425) → `var(--font-body)`; fix `Playfair Display` (line 1325) → `var(--font-display)`; remove all 4 duplicate keyframes (`fadeInUp` line 459, `underlineExpand` line 549, `fadeInSlide` line 676, `pulse` line 744 — its box-shadow effect is already overridden by animations.css at runtime). Also updated `@tailwind` directives to `@import "tailwindcss"` + `@config` for Tailwind v4.
- [x] Copy `styles/animations.css` — as-is
- [x] Copy `styles/components.css` — as-is
- [x] **Do NOT copy** `index.css`, `App.css` (Vite scaffold files)
- [ ] Git commit: `"Phase 1: Scaffold Next.js project with config and static assets"`

### Phase 2: Foundation

- [ ] Create `app/layout.tsx` — `next/font/google` (4 fonts with `--font-instrument`, `--font-inter`, `--font-jbmono`, `--font-crimson` variables), metadata, CSS imports, `<ClientShell>` wrapper
- [ ] Create `lib/types.ts` — copy from `/site/src/lib/types.ts`, no changes needed
- [ ] Create `lib/icons.ts` — new file with `iconMap: Record<string, LucideIcon>` mapping all 42 icon strings to components (see Icon Migration section)
- [ ] Create `hooks/useNavScrollState.ts` — copy from site, add `startTransition` wrapping `setState` calls, update import path to `@/lib/types`
- [ ] Create `hooks/useCountUp.ts` — copy from site, no changes
- [ ] Create `hooks/useIntersectionObserver.ts` — copy from site, no changes
- [ ] Create `utils/content.ts` — rewrite with Node.js `fs` + `path` + `front-matter` (see Content Loading section). Exports: `getNewsArticles()`, `getEvents()`, `parseEventContent()`
- [ ] Copy `data/usMapSvg.ts` — as-is from site
- [ ] Git commit: `"Phase 2: Foundation — layout, types, icons, hooks, content utils"`

### Phase 3: Layout Components

- [ ] Build `components/layout/ClientShell.tsx` — `"use client"`, `usePathname`, theme derivation (`routeThemes` map), scroll progress via `useRef` + direct DOM (no `useScrollProgress` hook), global `IntersectionObserver` for `.section-header`, `.path-card`, `.population-item`, `.value-prop`, `.testimonial-card`, `.metric-card`, `.step-card`, scroll-to-top on route change
- [ ] Migrate `components/layout/Nav.tsx` — `"use client"`, `next/link`, `usePathname` (replaces `useLocation`), rename `navLinks[].to` → `.href`, all `<Link to=` → `<Link href=`
- [ ] Migrate `components/layout/Footer.tsx` — `"use client"`, `next/link`, 8× `<Link to=` → `<Link href=`
- [ ] Git commit: `"Phase 3: Layout components — ClientShell, Nav, Footer"`

### Phase 4: Shared Components (can be parallelized)

Components with icon changes:
- [ ] `shared/PageHero.tsx` — replace 2 inline `data-lucide` (`arrow-right`, `chevron-down`) with `<ArrowRight size={18} />` and `<ChevronDown size={18} />`
- [ ] `shared/SplitSection.tsx` — replace 1 inline `data-lucide` (`arrow-right`) with `<ArrowRight size={16} />`
- [ ] `shared/RoleItem.tsx` — replace `<i data-lucide={icon}>` with `iconMap` lookup
- [ ] `shared/FAQAccordion.tsx` — `"use client"`, replace `<i data-lucide="chevron-down">` with `<ChevronDown className="faq-icon" />`
- [ ] `shared/FeatureGrid.tsx` — replace `<i data-lucide={item.icon}>` with `iconMap` lookup (both `card` and `simple` variants)
- [ ] `shared/GlanceGrid.tsx` — replace `<i data-lucide={item.icon}>` with `iconMap` lookup
- [ ] `shared/ListGrid.tsx` — replace `<i data-lucide={item.icon}>` with `iconMap` lookup

Components with no icon changes (copy + minor path updates):
- [ ] `shared/AboutTimeline.tsx` — `"use client"`, copy as-is (uses `useEffect`, `useRef`, IntersectionObserver)
- [ ] `shared/ProcessGrid.tsx` — copy as-is, no hooks
- [ ] `shared/StepsGrid.tsx` — copy as-is, no hooks
- [ ] `shared/ValueCard.tsx` — copy as-is, no hooks
- [ ] `shared/EvidenceGrid.tsx` — copy as-is, no hooks (uses `dangerouslySetInnerHTML`)
- [ ] `shared/MatrixGrid.tsx` — copy as-is, no hooks
- [ ] `shared/ScorecardGrid.tsx` — copy as-is, no hooks
- [ ] `shared/TrustStrip.tsx` — copy as-is, no hooks
- [ ] `jobseekers/CaseStudiesTabs.tsx` — `"use client"`, copy as-is (uses `useState`)
- [ ] Git commit: `"Phase 4: Shared components — icons, accordions, grids"`

### Phase 5: Home Components & Page

- [ ] `home/HomeHero.tsx` — copy as-is (imports `MetricCard`, no hooks, no icons)
- [ ] `home/MetricCard.tsx` — copy as-is
- [ ] `home/SectionHeader.tsx` — copy as-is
- [ ] `home/GoogleReviewCard.tsx` — copy as-is
- [ ] `home/TestimonialCard.tsx` — copy as-is
- [ ] `home/PopulationItem.tsx` — replace `<i data-lucide={icon}>` with `iconMap` lookup
- [ ] `home/ValueProp.tsx` — replace `<i data-lucide={icon}>` with `iconMap` lookup
- [ ] `home/PathCard.tsx` — `"use client"`, `next/link`, `<Link to=` → `<Link href=`
- [ ] `home/CTASection.tsx` — `"use client"`, `next/link`, 2× `<Link to=` → `<Link href=`
- [ ] `home/HomeTimeline.tsx` — `"use client"`, copy as-is (already uses refs + passive listeners), update import paths only
- [ ] Create `app/page.tsx` (server wrapper) + `app/HomeClient.tsx` (`"use client"`) — move Home page logic here. Replace `import { Link }` → `next/link`, 3× `to=` → `href=`. Replace static `US_MAP_SVG` import with dynamic `import('@/data/usMapSvg')` in `useEffect`. Replace `<i data-lucide="check">` with `<Check />`.
- [ ] Git commit: `"Phase 5: Home page and components"`

### Phase 6: Subpages

- [ ] **Jobseekers** — `app/jobseekers/page.tsx` (server) + `JobseekersClient.tsx` (`"use client"`). Convert `experienceCards` icons (`user-check`, `hand-helping`, `building`, `message-circle`) via `iconMap`. Convert 2 inline icons (`arrow-right`, `map-pin`). No `Link` changes needed.
- [ ] **Employers** — `app/employers/page.tsx` (server) + `EmployersClient.tsx` (`"use client"`). Convert `roles` icons (9 icons: `briefcase`, `headphones`, `shopping-bag`, `utensils`, `shield`, `truck`, `wrench`, `heart`, `user`) via `iconMap`. Convert 3 inline icons (`arrow-right`, `phone`, `map-pin`). No `Link` changes needed.
- [ ] **Partners** — `app/partners/page.tsx` (server) + `PartnersClient.tsx` (`"use client"`). Convert icons in 4 data arrays (`partnerTypes`, `serviceModelFeatures`, `whyAgenciesFeatures`, `performanceFeatures`) via `iconMap`. Convert 3 inline icons (`arrow-right` ×2, `file-text`). No `Link` changes needed.
- [ ] **About** — `app/about/page.tsx` (server) + `AboutClient.tsx` (`"use client"`). Convert icons in 3 data arrays (`glanceItems`, `innovationItems`, `clientExperienceItems`) via `iconMap`. Convert 4 inline icons (`settings-2`, `flask-conical`, `arrow-right`, `file-text`). No `Link` changes needed.
- [ ] **News** — `app/news/page.tsx` (server, calls `getNewsArticles()`, passes `articles` prop) + `app/news/NewsClient.tsx` (`"use client"`, receives `articles` as prop). Already uses `lucide-react` (`ExternalLink`). Add `useEffect`/`useRef`/IntersectionObserver logic.
- [ ] **Events** — `app/events/page.tsx` (server, calls `getEvents()`, passes `events` prop) + `app/events/EventsClient.tsx` (`"use client"`, receives `events` as prop). Already uses `lucide-react` (`MapPin`, `Clock`, `ChevronDown`, `ArrowRight`). Convert 1 `<Link to="/jobseekers">` → `<Link href="/jobseekers">`. Import `parseEventContent` directly (pure function, no `fs`).
- [ ] **404** — Create `app/not-found.tsx` with basic "Page Not Found" message and link to home
- [ ] Git commit: `"Phase 6: All subpages — Jobseekers, Employers, Partners, About, News, Events, 404"`

### Phase 7: Build & Verify

- [ ] Run `next build` — fix any TypeScript or build errors
- [ ] Run `npx serve out/` — verify static export serves correctly
- [ ] Test all 7 routes load without errors: `/`, `/jobseekers`, `/employers`, `/partners`, `/about`, `/news`, `/events`
- [ ] Verify interactive features: nav scroll states, mobile menu open/close, FAQ accordion, case study tabs, scroll animations (`.is-visible`), timeline fill, US map rendering
- [ ] Run `npx next lint` on relevant files, fix any lint errors
- [ ] Final git commit: `"Phase 7: Build verified, all routes working"`

---

## Potential Gotchas

| Issue | Mitigation |
|---|---|
| `next/font` CSS variable names colliding with `globals.css` `:root` variable names | Use distinct variable names in `next/font` (`--font-instrument`, `--font-inter`, etc.) and bridge in `:root` |
| `import.meta.glob` in `utils/content.ts` | Rewrite with `fs.readdirSync` + `fs.readFileSync` — only called from server components |
| `document.body.style.overflow` in Nav.tsx | Works fine in `"use client"` components |
| `document.getElementById` / `querySelector` in Home (US map) | Works fine in `useEffect` inside client components |
| `dangerouslySetInnerHTML` in EvidenceGrid | Works the same in Next.js — no change needed |
| Static export doesn't support `next/image` optimization | Already handled via `images: { unoptimized: true }` — all `<img>` tags remain as-is |
| Icon renames in lucide-react v0.3+ | `home` → `House` (not `Home`), `bar-chart-3` → `ChartBar` (not `BarChart3`), `check-circle` → `CircleCheck` (not `CheckCircle`). All corrected in `lib/icons.ts`. |
| `gray-matter` in package.json | Don't install — it's unused. Only `front-matter` is actually imported. |
| Duplicate keyframe definitions (4 total) | Remove all 4 from `globals.css` (`fadeInUp`, `pulse`, `underlineExpand`, `fadeInSlide`). The `pulse` in globals has a different implementation but is already overridden by animations.css at runtime — removing it changes nothing visually. |
| `content/` directory path resolution | `path.join(process.cwd(), 'content')` resolves to `/web/content/` during build |
| `.nav-logo` hardcodes `'Crimson Text', serif` | This is fine — the `next/font` CSS variable `--font-crimson` is available via Tailwind's `font-crimson` class, but the CSS rule also works since the font is loaded |
