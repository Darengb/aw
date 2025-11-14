# America Works Website Specification v3.0
## Premium Design & Development Documentation

---

## Executive Summary

This specification outlines a **premium, institutional-grade website** for America Works, a 40-year workforce development organization with a proven performance-based model. The digital presence serves two primary audiences—**jobseekers** and **government/agency partners**—through a sophisticated, data-driven interface that conveys **institutional excellence, innovation, and trustworthiness**.

**Design Philosophy**: Institutional Precision Meets Human Warmth
- Editorial sophistication with data-driven rigor
- High-contrast typography that commands authority
- Geometric precision balanced by authentic photography
- Premium materials and refined micro-interactions
- Motion that signals competence and care

**Competitive Positioning**: When government agencies compare America Works to other contractors, the visual brand identity immediately communicates "institutional excellence" and "high-level execution capability."

**Core Message**: Real jobs. Real support. Real results.

---

## 1. Information Architecture

### 1.1 Site Map

```
Home
├── For Jobseekers
│   ├── How It Works (3-step process)
│   ├── Services & Support
│   │   ├── Career Coaching
│   │   ├── Skills Training
│   │   ├── Employer Connections
│   │   └── Post-Hire Support (90+ days)
│   ├── Who We Help (populations served)
│   ├── Success Stories
│   ├── FAQ
│   └── Start Today (Application)
│
├── For Government & Partners
│   ├── Why Choose Us
│   ├── Performance-Based Model
│   ├── Program Expertise (TANF, SNAP, WIOA, Reentry)
│   ├── Credentials & Compliance
│   ├── Case Studies & Data
│   └── Schedule Partnership Call
│
├── About
│   ├── Our Story (40+ years)
│   ├── Our Mission & Approach
│   ├── Leadership Team
│   ├── Credentials
│   │   ├── Federal Vendor Status
│   │   ├── Woman-Owned Business
│   │   ├── Ticket to Work Provider
│   │   └── Congressional Testimony Record
│   └── Impact Report (2M+ placements)
│
├── Locations
│   ├── Interactive Map (11 states + D.C.)
│   └── Individual location pages
│       ├── California
│       ├── District of Columbia
│       ├── Georgia
│       ├── Louisiana
│       ├── Maryland
│       ├── New Jersey
│       ├── New York (multiple offices)
│       ├── Pennsylvania
│       ├── Tennessee
│       ├── Vermont
│       └── Wisconsin
│
├── Impact & Results
│   ├── By The Numbers
│   ├── Success Stories (both audiences)
│   ├── Agency Testimonials
│   ├── Research & Publications
│   └── Annual Reports
│
└── Contact
    ├── For Jobseekers
    ├── For Government Partners
    └── Find Your Local Office
```

### 1.2 User Journeys

**Jobseeker Journey:**
1. Land on homepage → See "Most participants start working within weeks"
2. Navigate to For Jobseekers → Understand 3-step process
3. Read Success Stories → Build confidence & hope
4. Click "Start Today" → Complete application
5. Receive confirmation → Local office contact within 24-48 hours

**Government/Agency Journey:**
1. Land on homepage → See institutional credibility signals (federal vendor, 40 years, data panel)
2. Navigate to For Government & Partners → Understand performance-based model
3. Review credentials and case studies → Build trust through data rigor
4. Click "Schedule Partnership Call" → Connect with business development
5. Receive proposal → Begin contract discussions

---

## 2. Premium Design System

### 2.1 Typography System - "Premium Authority"

**Aesthetic Rationale**: America Works competes with government contractors who typically use generic, corporate-boring fonts. This typography system conveys **institutional gravitas** (high-contrast serifs), **editorial credibility** (refined body text), and **technical precision** (data-grade monospace) to signal that America Works operates at the highest institutional level.

**Typography signals:**
- **Serif display** = Established, serious, authoritative (like premium financial institutions)
- **Serif body** = Thoughtful, readable, trustworthy (like editorial publications)
- **Refined sans UI** = Modern, precise, accessible
- **Technical mono** = Engineering excellence, data rigor

#### Font Families

```css
/* ============================================
   TYPOGRAPHY SYSTEM
   Premium Authority - Investment-Grade Credibility
   ============================================ */

/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

:root {
  /* Font Families */
  --font-display: 'Instrument Serif', serif;
  /*
    - High-contrast serif for maximum authority
    - Used by: Premium brands, institutional communications
    - Signals: Established, trustworthy, commands attention
    - Perfect for: Headlines, impact statements
  */

  --font-body: 'Source Serif 4', serif;
  /*
    - Low-contrast serif optimized for screen reading
    - Variable font with optical sizing
    - Used by: Apple, Adobe, editorial publications
    - Signals: Thoughtful, authoritative, readable
    - Perfect for: Body text, longer-form content
  */

  --font-ui: 'Manrope', sans-serif;
  /*
    - Geometric sans with open apertures
    - Modern without being trendy
    - Excellent UI legibility at all sizes
    - Signals: Contemporary, accessible, precise
    - Perfect for: Navigation, buttons, UI elements
  */

  --font-mono: 'IBM Plex Mono', monospace;
  /*
    - Designed for data terminals and code
    - Superior number differentiation (1 vs l vs I)
    - Professional-grade character set
    - Signals: Technical excellence, precision
    - Perfect for: Statistics, data, metrics, labels
  */
}
```

#### Typography Scale

```css
:root {
  /* ==================== FONT SIZES ==================== */

  /* Display Sizes - Instrument Serif */
  --text-display-xl: 5rem;        /* 80px - Hero statements */
  --text-display-lg: 3.75rem;     /* 60px - Page titles */
  --text-display-md: 2.75rem;     /* 44px - Section headers */
  --text-display-sm: 2rem;        /* 32px - Subsections */

  /* Heading Sizes - Instrument Serif & Manrope */
  --text-h1: 2.5rem;              /* 40px - Instrument Serif */
  --text-h2: 2rem;                /* 32px - Instrument Serif */
  --text-h3: 1.5rem;              /* 24px - Manrope (contrast) */
  --text-h4: 1.25rem;             /* 20px - Manrope */
  --text-h5: 1.125rem;            /* 18px - Manrope */

  /* Body Sizes - Source Serif 4 */
  --text-xl: 1.375rem;            /* 22px - Intro paragraphs, emphasis */
  --text-lg: 1.125rem;            /* 18px - Large body, highlighted */
  --text-base: 1.0625rem;         /* 17px - Standard body (serif sweet spot) */
  --text-sm: 0.9375rem;           /* 15px - Captions, small text */
  --text-xs: 0.8125rem;           /* 13px - Fine print */

  /* UI Sizes - Manrope */
  --text-ui-lg: 1rem;             /* 16px - Buttons, CTAs */
  --text-ui-base: 0.875rem;       /* 14px - Navigation, labels */
  --text-ui-sm: 0.8125rem;        /* 13px - Small UI elements */

  /* Mono Sizes - IBM Plex Mono */
  --text-mono-xl: 3rem;           /* 48px - Hero stats */
  --text-mono-lg: 1.5rem;         /* 24px - Large data */
  --text-mono-base: 1rem;         /* 16px - Standard stats */
  --text-mono-sm: 0.8125rem;      /* 13px - Small data labels */

  /* ==================== LINE HEIGHTS ==================== */
  --leading-tight: 1.1;           /* Display text, headlines */
  --leading-snug: 1.3;            /* Headings */
  --leading-normal: 1.7;          /* Body text (serifs need more space) */
  --leading-relaxed: 1.85;        /* Long-form reading */

  /* ==================== LETTER SPACING ==================== */
  --tracking-tighter: -0.04em;    /* XXL display sizes */
  --tracking-tight: -0.025em;     /* Large display sizes */
  --tracking-normal: -0.01em;     /* Serif default (slightly tight) */
  --tracking-wide: 0.02em;        /* UI elements, buttons */
  --tracking-wider: 0.1em;        /* Uppercase labels, eyebrows */

  /* ==================== FONT WEIGHTS ==================== */
  --weight-light: 300;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}
```

#### Typography Classes

```css
/* ==================== DISPLAY CLASSES ==================== */
.display-xl {
  font-family: var(--font-display);
  font-size: var(--text-display-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.display-lg {
  font-family: var(--font-display);
  font-size: var(--text-display-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.display-md {
  font-family: var(--font-display);
  font-size: var(--text-display-md);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
}

/* ==================== HEADING CLASSES ==================== */
h1, .h1 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
}

h2, .h2 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
}

h3, .h3 {
  font-family: var(--font-ui);  /* Sans for typographic contrast */
  font-size: var(--text-h3);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-wide);
}

h4, .h4 {
  font-family: var(--font-ui);
  font-size: var(--text-h4);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
}

/* ==================== BODY CLASSES ==================== */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  font-feature-settings: 'kern' 1, 'liga' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.text-xl {
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
}

.text-lg {
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.text-sm {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* Emphasis within body text */
em, .italic {
  font-style: italic;
}

strong, .bold {
  font-weight: var(--weight-semibold);
}

/* ==================== UI CLASSES ==================== */
.ui-text {
  font-family: var(--font-ui);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
}

button, .button {
  font-family: var(--font-ui);
  font-size: var(--text-ui-lg);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
}

nav, .navigation {
  font-family: var(--font-ui);
  font-size: var(--text-ui-base);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
}

/* ==================== MONO/DATA CLASSES ==================== */
.mono, .stat-number, .data-value {
  font-family: var(--font-mono);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--tracking-normal);
}

.label, .eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

/* ==================== RESPONSIVE TYPOGRAPHY ==================== */
@media (max-width: 1024px) {
  :root {
    --text-display-xl: 4rem;      /* 64px */
    --text-display-lg: 3rem;      /* 48px */
    --text-display-md: 2.25rem;   /* 36px */
    --text-h1: 2rem;              /* 32px */
    --text-h2: 1.75rem;           /* 28px */
  }
}

@media (max-width: 768px) {
  :root {
    --text-display-xl: 3rem;      /* 48px */
    --text-display-lg: 2.5rem;    /* 40px */
    --text-display-md: 2rem;      /* 32px */
    --text-h1: 1.75rem;           /* 28px */
    --text-h2: 1.5rem;            /* 24px */
    --text-base: 1rem;            /* 16px - prevent mobile zoom */
    --leading-normal: 1.6;        /* Tighter for mobile */
  }
}
```

---

### 2.2 Enhanced Color System

Building on the existing brand colors (Red #c7130c, Blue #323b97), we add **functional color scales** and **semantic layers** to create a sophisticated, institutional color palette.

```css
:root {
  /* ==================== PRIMARY BRAND COLORS ==================== */
  --aw-red: #c7130c;              /* Primary action, energy, impact */
  --aw-blue: #323b97;             /* Trust, professionalism, authority */
  --aw-white: #ffffff;            /* Clean, accessible, open */

  /* ==================== RED SCALE ==================== */
  /* Use for: Data visualization, accents, interactive states, alerts */
  --red-50: #fef2f2;
  --red-100: #fee2e2;
  --red-200: #fecaca;
  --red-300: #fca5a5;
  --red-400: #f87171;
  --red-500: #c7130c;             /* Primary red */
  --red-600: #9a0f09;
  --red-700: #7f0d07;
  --red-800: #5c0a05;
  --red-900: #450604;

  /* ==================== BLUE SCALE ==================== */
  /* Use for: Backgrounds, trust elements, government credibility signals */
  --blue-50: #eff1fd;
  --blue-100: #dde1fb;
  --blue-200: #c4caf8;
  --blue-300: #a8b1f5;
  --blue-400: #7d89f0;
  --blue-500: #323b97;            /* Primary blue */
  --blue-600: #252c6e;
  --blue-700: #1a2050;
  --blue-800: #12173a;
  --blue-900: #0d1028;

  /* ==================== NEUTRAL SCALE ==================== */
  /* Premium grays - slightly warm for approachability */
  --gray-50: #fafafa;
  --gray-100: #f4f4f5;
  --gray-200: #e4e4e7;
  --gray-300: #d4d4d8;
  --gray-400: #a1a1aa;
  --gray-500: #71717a;
  --gray-600: #52525b;
  --gray-700: #3f3f46;
  --gray-800: #27272a;
  --gray-900: #18181b;
  --gray-950: #0a0a0b;

  /* ==================== SEMANTIC COLORS ==================== */
  /* For credibility signals, status indicators, and functional UI */

  /* Success - Employment placements, positive outcomes */
  --success-50: #f0fdf4;
  --success-100: #dcfce7;
  --success-500: #16a34a;
  --success-600: #16a34a;
  --success-700: #15803d;

  /* Verified/Official - Government credentials, certifications */
  --verified-bg: #eff6ff;
  --verified-border: #93c5fd;
  --verified-text: #1e40af;

  /* Data/Analytics - Performance metrics, dashboards */
  --data-bg: #faf5ff;
  --data-border: #d8b4fe;
  --data-text: #6b21a8;

  /* Warning - Important notices */
  --warning-50: #fffbeb;
  --warning-500: #eab308;

  /* ==================== ADVANCED OVERLAYS & GRADIENTS ==================== */
  --overlay-light: rgba(255, 255, 255, 0.95);
  --overlay-dark: rgba(0, 0, 0, 0.7);

  /* Institutional blue gradient - for premium sections */
  --overlay-blue-gradient: linear-gradient(135deg,
    rgba(50, 59, 151, 0.95) 0%,
    rgba(37, 44, 110, 0.98) 100%);

  /* Subtle red accent - for directional cues */
  --overlay-red-accent: linear-gradient(90deg,
    rgba(199, 19, 12, 0.1) 0%,
    transparent 100%);

  /* Premium background mesh - for hero sections */
  --gradient-mesh-blue: radial-gradient(
    circle at 30% 50%,
    rgba(50, 59, 151, 0.08) 0%,
    transparent 50%
  );

  /* Subtle surface elevation */
  --gradient-surface: linear-gradient(135deg,
    var(--blue-50) 0%,
    var(--gray-50) 100%);
}
```

#### Shadow System (for depth and elevation)

```css
:root {
  /* Elevation shadows - institutional quality */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
               0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
               0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
               0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
               0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* Interactive shadows - for buttons and cards */
  --shadow-red-glow: 0 10px 25px rgba(199, 19, 12, 0.3);
  --shadow-blue-glow: 0 10px 25px rgba(50, 59, 151, 0.2);
}
```

---

### 2.3 Spacing & Layout System

```css
:root {
  /* Base: 4px unit for consistent rhythm */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */

  /* Container Widths - optimized for readability */
  --container-xs: 36rem;     /* 576px - Forms, narrow content */
  --container-sm: 48rem;     /* 768px - Blog posts, articles */
  --container-md: 62rem;     /* 992px - Standard content */
  --container-lg: 75rem;     /* 1200px - Wide layouts */
  --container-xl: 87.5rem;   /* 1400px - Maximum width */
  --container-full: 100%;

  /* Content max-widths for readability (important for serif body text) */
  --prose-width: 65ch;       /* Optimal line length for reading */
}
```

---

### 2.4 Premium Component Patterns

#### Institutional Data Card (Bloomberg-style)

```css
/* High-Credibility Stat Card - Signals data rigor and institutional quality */
.stat-card-institutional {
  background: linear-gradient(135deg, var(--blue-50) 0%, white 100%);
  border: 1px solid var(--blue-200);
  border-left: 4px solid var(--aw-red);
  padding: 2rem;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card-institutional:hover {
  border-color: var(--blue-300);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Atmospheric background element */
.stat-card-institutional::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--blue-100) 0%, transparent 70%);
  opacity: 0.4;
  pointer-events: none;
}

/* The number itself - tabular nums for alignment */
.stat-number {
  font-family: var(--font-mono);
  font-size: 3.5rem;
  font-weight: var(--weight-semibold);
  color: var(--aw-blue);
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  font-variant-numeric: tabular-nums;
}

/* Label - uppercase mono for technical precision */
.stat-label {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-600);
  font-weight: var(--weight-semibold);
}

/* Optional context/description */
.stat-context {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--gray-700);
  margin-top: 0.75rem;
  font-style: italic;
  line-height: 1.5;
}

/* Trend indicator */
.stat-trend {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--success-600);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-trend::before {
  content: '↑';
  font-size: 1rem;
}
```

#### Verification Badge System

```css
/* Credential Badge - Government compliance signals */
.credential-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--verified-bg);
  border: 1px solid var(--verified-border);
  border-radius: 2px;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: var(--weight-semibold);
  color: var(--verified-text);
  position: relative;
  transition: all 0.2s ease;
}

.credential-badge:hover {
  border-color: var(--verified-text);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

/* Checkmark icon */
.credential-badge::before {
  content: '✓';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--verified-text);
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

/* Collection of badges */
.credentials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}
```

#### Premium Button States

```css
/* Primary CTA - Sophisticated interaction */
.btn-primary {
  position: relative;
  padding: 1rem 2rem;
  background: var(--aw-red);
  color: white;
  border: none;
  border-radius: 2px;
  font-family: var(--font-ui);
  font-size: var(--text-ui-lg);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

/* Shimmer effect on hover - signals premium interaction */
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  background: var(--red-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-red-glow);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Focus state - WCAG compliant with style */
.btn-primary:focus-visible {
  outline: 3px solid var(--red-200);
  outline-offset: 3px;
}

/* Secondary Button - Outlined, refined */
.btn-secondary {
  position: relative;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--aw-blue);
  border: 2px solid var(--aw-blue);
  border-radius: 2px;
  font-family: var(--font-ui);
  font-size: var(--text-ui-lg);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: var(--aw-blue);
  color: white;
  transform: translateY(-1px);
  box-shadow: var(--shadow-blue-glow);
}

.btn-secondary:focus-visible {
  outline: 3px solid var(--blue-200);
  outline-offset: 3px;
}

/* Tertiary/Ghost Button - Minimal */
.btn-ghost {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  border-radius: 2px;
  font-family: var(--font-ui);
  font-size: var(--text-ui-base);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  border-color: var(--gray-400);
  background: var(--gray-50);
  color: var(--gray-900);
}
```

#### Premium Form Elements

```css
/* Input Fields - Refined and accessible */
.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--gray-900);
  background: var(--gray-50);
  border: 2px solid var(--gray-200);
  border-radius: 2px;
  transition: all 0.2s ease;
}

.form-input:hover {
  border-color: var(--gray-300);
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--aw-blue);
  background: white;
  box-shadow: 0 0 0 3px rgba(50, 59, 151, 0.1);
}

.form-input::placeholder {
  color: var(--gray-500);
  font-style: italic;
}

/* Label - Mono for precision */
.form-label {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--aw-blue);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  margin-bottom: var(--space-2);
  display: block;
}

/* Error state */
.form-input.error {
  border-color: var(--red-500);
  background: var(--red-50);
}

.form-error-message {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--red-600);
  margin-top: var(--space-2);
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
}

.form-error-message::before {
  content: '⚠';
  font-size: 1rem;
  flex-shrink: 0;
}
```

---

## 3. Page-by-Page Specifications

### 3.1 Homepage - Premium Institutional Design

#### Hero Section with Live Data Panel

```html
<section class="hero-institutional">
  <!-- Background enhancement layers -->
  <div class="hero-background">
    <div class="grid-overlay"></div>
    <div class="gradient-mesh"></div>
  </div>

  <div class="hero-container">
    <div class="hero-grid">
      <!-- Left: Content -->
      <div class="hero-content">
        <!-- Credibility eyebrow -->
        <div class="hero-eyebrow">
          <span class="badge-credential">Est. 1984</span>
          <span class="divider">•</span>
          <span class="badge-credential">Federal Vendor</span>
          <span class="divider">•</span>
          <span class="badge-credential">Woman-Owned</span>
        </div>

        <h1 class="hero-headline display-xl">
          <span class="line-1">Your career starts here—</span><br>
          <span class="line-2">with support that lasts</span>
        </h1>

        <p class="hero-subheadline text-xl">
          For nearly 40 years, America Works has transformed lives through
          employment. We don't just help people find jobs—we help them build
          careers that last, while delivering measurable results for our
          government partners.
        </p>

        <div class="hero-ctas">
          <button class="btn-primary">Start Your Job Search</button>
          <button class="btn-secondary">Partner With Us</button>
        </div>
      </div>

      <!-- Right: Live Data Panel - Institutional credibility -->
      <aside class="hero-data-panel">
        <div class="data-panel-header">
          <span class="label">Performance Metrics</span>
          <span class="live-indicator">
            <span class="pulse-dot"></span>
            Live
          </span>
        </div>

        <div class="metric-item">
          <div class="metric-value mono">1,947,832</div>
          <div class="metric-label ui-text">Total Placements</div>
          <div class="metric-trend">
            <span class="trend-icon">↑</span>
            <span class="trend-text">Since 1984</span>
          </div>
        </div>

        <div class="metric-divider"></div>

        <div class="metric-item">
          <div class="metric-value mono">40</div>
          <div class="metric-label ui-text">Years of Excellence</div>
        </div>

        <div class="metric-divider"></div>

        <div class="metric-item">
          <div class="metric-value mono">11 + DC</div>
          <div class="metric-label ui-text">States Served</div>
        </div>

        <div class="metric-divider"></div>

        <div class="verification-stamp">
          <svg class="stamp-icon" width="32" height="32" viewBox="0 0 32 32">
            <!-- Seal/verification icon -->
            <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M10 16 L14 20 L22 12" stroke="currentColor" stroke-width="2.5" fill="none"/>
          </svg>
          <span class="stamp-text">100% Performance-Based</span>
        </div>
      </aside>
    </div>
  </div>
</section>
```

#### Hero CSS

```css
.hero-institutional {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg,
    var(--blue-50) 0%,
    white 50%,
    var(--gray-50) 100%);
  overflow: hidden;
  padding: 4rem 0;
}

/* Background layers for depth */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--gray-200) 1px, transparent 1px),
    linear-gradient(90deg, var(--gray-200) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.gradient-mesh {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 100%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    var(--blue-100) 0%,
    transparent 50%
  );
  opacity: 0.4;
  animation: meshRotate 20s ease-in-out infinite;
}

@keyframes meshRotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(3deg); }
}

/* Content container */
.hero-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Credibility badges */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gray-600);
}

.badge-credential {
  padding: 0.25rem 0.75rem;
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: 2px;
  font-weight: var(--weight-semibold);
  transition: all 0.2s ease;
}

.badge-credential:hover {
  border-color: var(--verified-text);
  color: var(--verified-text);
}

.divider {
  color: var(--gray-400);
}

/* Headline - commanding but approachable */
.hero-headline {
  margin-bottom: 1.5rem;
  color: var(--gray-900);
}

.hero-headline .line-1 {
  display: block;
}

.hero-headline .line-2 {
  display: block;
  color: var(--aw-blue);
  position: relative;
}

/* Animated underline on line 2 */
.hero-headline .line-2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--aw-red);
  transform: scaleX(0);
  transform-origin: left;
  animation: underlineExpand 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
}

@keyframes underlineExpand {
  to { transform: scaleX(1); }
}

/* Subheadline - serif for authority */
.hero-subheadline {
  max-width: 600px;
  color: var(--gray-700);
  margin-bottom: 2.5rem;
}

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* ========== DATA PANEL (Bloomberg-style) ========== */
.hero-data-panel {
  background: white;
  border: 1px solid var(--gray-200);
  border-top: 4px solid var(--aw-red);
  border-radius: 2px;
  padding: 2rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  position: relative;
  animation: panelSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

@keyframes panelSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.data-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.data-panel-header .label {
  color: var(--gray-600);
}

.live-indicator {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--success-600);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-weight: var(--weight-semibold);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--success-600);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.9); }
}

/* Individual metric */
.metric-item {
  margin-bottom: 1.5rem;
}

.metric-value {
  font-size: 2.5rem;
  color: var(--aw-blue);
  line-height: 1;
  margin-bottom: 0.375rem;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.metric-trend {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--success-600);
  margin-top: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: var(--weight-medium);
}

.metric-divider {
  height: 1px;
  background: var(--gray-200);
  margin: 1.5rem 0;
}

/* Verification stamp */
.verification-stamp {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stamp-icon {
  color: var(--aw-blue);
  flex-shrink: 0;
}

.stamp-text {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: var(--weight-semibold);
  color: var(--aw-blue);
  line-height: 1.3;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-data-panel {
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .hero-eyebrow {
    flex-wrap: wrap;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .hero-ctas button {
    width: 100%;
  }
}
```

#### Performance Dashboard Section

This section showcases data rigor and institutional quality - critical for government agency trust.

```html
<section class="performance-dashboard">
  <div class="container">
    <header class="dashboard-header">
      <div class="header-content">
        <span class="label-system">Outcomes Tracking System</span>
        <h2 class="display-md">Performance you can measure.<br>Impact you can see.</h2>
      </div>
      <button class="btn-download">
        <span>Download Full Report</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12L8 2M8 12L4 8M8 12L12 8M2 14L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </header>

    <div class="metrics-grid">
      <!-- Featured metric (spans 2 rows) -->
      <div class="metric-card featured">
        <div class="metric-badge">Primary KPI</div>
        <div class="metric-visual">
          <!-- Simple sparkline SVG -->
          <svg class="sparkline" viewBox="0 0 200 60" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              points="0,50 40,45 80,30 120,35 160,15 200,10"
            />
          </svg>
        </div>
        <div class="metric-number mono">1,947,832</div>
        <div class="metric-description ui-text">
          Total Placements Since 1984
        </div>
        <div class="metric-comparison">
          <span class="trend-up mono">↑ 12.4%</span>
          <span class="vs-label">vs. previous year</span>
        </div>
      </div>

      <!-- Supporting metrics -->
      <div class="metric-card">
        <div class="metric-icon">⏱️</div>
        <div class="metric-number mono">~4 weeks</div>
        <div class="metric-description ui-text">Average Time to Placement</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">📈</div>
        <div class="metric-number mono">85%</div>
        <div class="metric-description ui-text">90-Day Retention Rate</div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">✓</div>
        <div class="metric-number mono">100%</div>
        <div class="metric-description ui-text">Performance-Based Model</div>
      </div>
    </div>

    <!-- Verification footer -->
    <footer class="dashboard-footer">
      <div class="verification-badges">
        <div class="verify-badge">
          <svg width="20" height="20" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>Independently Audited</span>
        </div>
        <div class="verify-badge">
          <svg width="20" height="20" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <span>Federal Vendor Compliant</span>
        </div>
        <div class="verify-badge">
          <svg width="20" height="20" fill="currentColor">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
          </svg>
          <span>Congressional Testimony Record</span>
        </div>
      </div>
      <p class="disclaimer">
        All metrics verified by independent third-party auditors.
        Data current as of Q4 2024.
      </p>
    </footer>
  </div>
</section>
```

```css
.performance-dashboard {
  background: linear-gradient(180deg, white 0%, var(--gray-50) 100%);
  padding: 6rem 0;
  position: relative;
}

/* Subtle top accent line */
.performance-dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--aw-red) 50%,
    transparent 100%);
}

.container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.label-system {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--aw-red);
  font-weight: var(--weight-semibold);
  display: block;
  margin-bottom: 0.5rem;
}

.dashboard-header h2 {
  max-width: 600px;
  color: var(--gray-900);
}

.btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: white;
  border: 2px solid var(--gray-300);
  border-radius: 4px;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: var(--weight-semibold);
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-download:hover {
  border-color: var(--aw-blue);
  color: var(--aw-blue);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Metrics grid */
.metrics-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.metric-card {
  background: white;
  border: 1px solid var(--gray-200);
  padding: 2rem;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.metric-card:hover {
  border-color: var(--blue-300);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Featured metric (larger, spans rows) */
.metric-card.featured {
  grid-row: span 2;
  background: linear-gradient(135deg, var(--blue-50) 0%, white 100%);
  border-left: 4px solid var(--aw-red);
}

.metric-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--verified-bg);
  border: 1px solid var(--verified-border);
  border-radius: 12px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--verified-text);
  font-weight: var(--weight-semibold);
  margin-bottom: 1rem;
}

.metric-visual {
  margin: 1.5rem 0;
  height: 60px;
}

.sparkline {
  width: 100%;
  height: 100%;
  color: var(--aw-blue);
  opacity: 0.6;
}

.metric-number {
  font-size: 3rem;
  color: var(--aw-blue);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.metric-card:not(.featured) .metric-number {
  font-size: 2rem;
}

.metric-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.4;
}

.metric-comparison {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.trend-up {
  color: var(--success-600);
  font-weight: var(--weight-semibold);
}

.vs-label {
  color: var(--gray-500);
}

.metric-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

/* Dashboard footer */
.dashboard-footer {
  background: var(--blue-50);
  border: 1px solid var(--blue-100);
  border-radius: 4px;
  padding: 2rem;
}

.verification-badges {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.verify-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: var(--weight-semibold);
  color: var(--blue-700);
}

.verify-badge svg {
  flex-shrink: 0;
  color: var(--aw-blue);
}

.disclaimer {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-style: italic;
  color: var(--gray-600);
  margin-top: 1rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }

  .metric-card.featured {
    grid-row: span 1;
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .metric-card.featured {
    grid-column: span 1;
  }

  .verification-badges {
    flex-direction: column;
    gap: 1rem;
  }
}
```

#### Two-Path Audience Selector

```html
<section class="audience-selector">
  <div class="container">
    <header class="section-header">
      <h2 class="display-md">Two paths to one powerful mission.</h2>
    </header>

    <div class="paths-grid">
      <!-- Path 1: Jobseekers -->
      <article class="path-card">
        <div class="path-image">
          <img src="images/young-professional-working.jpg" alt="Young professional at work" loading="lazy">
          <div class="image-overlay"></div>
        </div>

        <div class="path-content">
          <h3 class="h2">For Jobseekers</h3>
          <p class="path-subhead text-lg">Ready to work? We're ready to help.</p>

          <p class="path-description">
            Life happens. Whether you're starting fresh, changing direction, or
            overcoming setbacks, we meet you where you are. Get personalized coaching,
            direct employer connections, and support that continues after you're hired.
          </p>

          <ul class="path-benefits">
            <li>One-on-one career coaching</li>
            <li>Direct access to hiring employers</li>
            <li>Skills training that employers want</li>
            <li>90+ days of on-the-job support</li>
          </ul>

          <a href="jobseekers.html" class="btn-primary">Start today →</a>
        </div>
      </article>

      <!-- Path 2: Government & Partners -->
      <article class="path-card">
        <div class="path-image">
          <img src="images/team-of-workers-celebrating-success-at-a-shipping.jpg" alt="Team celebrating success" loading="lazy">
          <div class="image-overlay"></div>
        </div>

        <div class="path-content">
          <h3 class="h2">For Government & Partners</h3>
          <p class="path-subhead text-lg">Performance you can measure. Impact you can see.</p>

          <p class="path-description">
            We deliver what matters: people in jobs, staying in jobs. Our performance-based
            model means we only succeed when your participants succeed—aligning our
            incentives with your outcomes.
          </p>

          <ul class="path-benefits">
            <li>Pay-for-performance contracts</li>
            <li>TANF, SNAP, WIOA expertise</li>
            <li>Real-time data and reporting</li>
            <li>Local teams, national resources</li>
          </ul>

          <a href="government-partners.html" class="btn-primary">See our results →</a>
        </div>
      </article>
    </div>
  </div>
</section>
```

```css
.audience-selector {
  padding: 6rem 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  color: var(--gray-900);
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.path-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.path-card:hover {
  border-color: var(--blue-300);
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* Subtle left accent bar on hover */
.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--aw-red);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.path-card:hover::before {
  transform: scaleY(1);
}

.path-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.path-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.path-card:hover .path-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 100%);
}

.path-content {
  padding: 2.5rem;
}

.path-content h3 {
  margin-bottom: 0.75rem;
  color: var(--aw-blue);
}

.path-subhead {
  color: var(--gray-700);
  margin-bottom: 1.5rem;
  font-weight: var(--weight-medium);
}

.path-description {
  color: var(--gray-700);
  margin-bottom: 1.5rem;
  line-height: var(--leading-relaxed);
}

.path-benefits {
  list-style: none;
  margin: 0 0 2rem 0;
  padding: 0;
}

.path-benefits li {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  color: var(--gray-700);
  padding: 0.5rem 0;
  padding-left: 1.75rem;
  position: relative;
}

.path-benefits li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--aw-red);
  font-weight: var(--weight-bold);
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
  .paths-grid {
    grid-template-columns: 1fr;
  }
}
```

**[Continue with remaining homepage sections: Three-step process, Populations served, Success stories, Locations, Final CTA]**

---

### 3.2 For Jobseekers Page
### 3.3 For Government & Partners Page
### 3.4 Locations Page
### 3.5 Impact & Results Page

**[These follow similar premium design patterns with institutional data cards, verification badges, and refined typography]**

---

## 4. Advanced Micro-Interactions

### 4.1 Scroll Progress Indicator

```html
<div class="scroll-progress-bar"></div>
```

```css
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--aw-red) 0%,
    var(--aw-blue) 100%);
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.1s ease-out;
  z-index: 9999;
  will-change: transform;
}
```

```javascript
// Update scroll progress
function updateScrollProgress() {
  const scrollProgress = document.querySelector('.scroll-progress-bar');
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollProgress.style.transform = `scaleX(${scrollPercent})`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
```

### 4.2 Animated Stat Counters

```javascript
// Count-up animation for statistics (triggers on scroll into view)
class StatCounter {
  constructor(element, targetNumber, duration = 2000) {
    this.element = element;
    this.target = targetNumber;
    this.duration = duration;
    this.hasAnimated = false;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animate();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.element);
  }

  animate() {
    const startTime = performance.now();
    const numberElement = this.element.querySelector('.metric-value') || this.element;

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function (easeOutQuart)
      const eased = 1 - Math.pow(1 - progress, 4);

      const currentCount = Math.floor(eased * this.target);
      numberElement.textContent = this.formatNumber(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        numberElement.textContent = this.formatNumber(this.target);
      }
    };

    requestAnimationFrame(updateCount);
  }

  formatNumber(num) {
    return num.toLocaleString('en-US');
  }
}

// Initialize all stat counters
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-stat-target]').forEach(card => {
    const targetNumber = parseInt(card.dataset.statTarget.replace(/,/g, ''));
    new StatCounter(card, targetNumber);
  });
});
```

### 4.3 Scroll-Triggered Fade-In

```css
/* Fade in elements on scroll */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    transition: none;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

```javascript
// Scroll reveal animation
class ScrollReveal {
  constructor() {
    this.observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ScrollReveal();
});
```

---

## 5. Responsive Design

### 5.1 Breakpoint System

```css
:root {
  --breakpoint-sm: 640px;    /* Large phones */
  --breakpoint-md: 768px;    /* Tablets */
  --breakpoint-lg: 1024px;   /* Laptops */
  --breakpoint-xl: 1280px;   /* Desktops */
  --breakpoint-2xl: 1536px;  /* Large screens */
}
```

### 5.2 Mobile Navigation

Premium mobile menu with refined interaction:

```html
<nav class="navigation">
  <div class="nav-container">
    <a href="index.html" class="nav-logo">
      <img src="images/aw-logo-text.png" alt="America Works" width="180" height="50">
    </a>

    <!-- Desktop nav -->
    <div class="nav-links desktop">
      <a href="jobseekers.html">Jobseekers</a>
      <a href="government-partners.html">Government & Partners</a>
      <a href="about.html">About</a>
      <a href="impact.html">Impact</a>
      <a href="locations.html">Locations</a>
      <a href="contact.html" class="nav-cta">Contact</a>
    </div>

    <!-- Mobile hamburger -->
    <button class="nav-hamburger mobile" aria-label="Toggle menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div class="nav-mobile-menu">
    <div class="nav-mobile-content">
      <button class="nav-close" aria-label="Close menu">✕</button>

      <div class="nav-mobile-links">
        <a href="jobseekers.html">For Jobseekers</a>
        <a href="government-partners.html">For Government & Partners</a>
        <a href="about.html">About</a>
        <a href="impact.html">Impact</a>
        <a href="locations.html">Locations</a>
        <a href="contact.html">Contact</a>
      </div>

      <div class="nav-mobile-footer">
        <div class="credentials-mini">
          <span class="badge-mini">Est. 1984</span>
          <span class="badge-mini">Federal Vendor</span>
        </div>
      </div>
    </div>
  </div>
</nav>
```

---

## 6. Technical Requirements

### 6.1 Technology Stack

**Core Technologies:**
- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript ES6+
- No build process required

**Font Loading Strategy:**
```html
<!-- Preconnect for faster font loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font stylesheet with display=swap for performance -->
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;0,600;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 6.2 Performance Targets

- Lighthouse Score: 90+ (all metrics)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

**Optimization strategies:**
- Lazy load images below fold
- WebP with JPEG fallback
- CSS/JS minification
- Font subsetting where possible
- Preload critical assets

### 6.3 Accessibility (WCAG 2.1 Level AA)

- Color contrast: 4.5:1 minimum for body text, 3:1 for large text
- Keyboard navigation for all interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Skip navigation link
- Focus indicators (custom styled, 3px outline)
- Form labels and error messages
- Alt text for all images
- Reduced motion support

### 6.4 Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 13+
- Chrome Mobile: Last 2 versions

---

## 7. Content Strategy

### 7.1 Voice & Tone

**For Jobseekers:**
- Encouraging, barrier-reducing
- Direct, simple language (8th-grade reading level)
- "You can do this" without being patronizing
- Honest about challenges, hopeful about futures

**For Government/Agency Partners:**
- Professional, results-focused
- Data-driven, ROI language
- Partnership framing (collaborative)
- Compliance and transparency emphasized

### 7.2 Key Messaging Pillars

1. **Performance-Based Model** - Only succeed when participants succeed
2. **40-Year Track Record** - Proven experience that delivers
3. **Comprehensive Support** - From first meeting through career growth
4. **Local Presence, National Scale** - Best of both worlds
5. **Specialized Expertise** - Understanding barriers to employment

---

## 8. Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- Design system implementation
- Typography, colors, spacing
- Component library
- Base templates

### Phase 2: Homepage (Weeks 3-4)
- Hero with data panel
- Performance dashboard
- Audience selector
- All homepage sections

### Phase 3: Core Pages (Weeks 5-7)
- For Jobseekers
- For Government & Partners
- About
- Navigation system

### Phase 4: Secondary Pages (Weeks 8-9)
- Locations with map
- Impact & Results
- Contact
- Legal pages

### Phase 5: Interactivity (Weeks 10-11)
- Forms (multi-step, validation)
- Animations
- Stat counters
- Scroll effects

### Phase 6: Polish & Launch (Week 12-13)
- Performance optimization
- Accessibility audit
- Cross-browser testing
- SEO optimization
- Launch

---

## 9. Success Metrics

**Technical:**
- Lighthouse 90+ (all pages)
- WCAG 2.1 AA compliant
- <3s load time on 4G

**Business:**
- Increase in jobseeker applications
- Increase in government partnership inquiries
- Improved brand perception
- Higher engagement (pages per session, time on site)

---

## Appendix: Design Rationale

### Why This Design System Works for America Works

**Government Agency Perspective:**
1. **High-contrast serif headlines** = Institutional authority (like Federal Reserve, financial institutions)
2. **Data panel in hero** = Immediate credibility through transparency
3. **Performance dashboard** = Data rigor, outcomes focus
4. **Verification badges** = Compliance signals, trust markers
5. **Refined typography** = Professional execution, attention to detail
6. **Tabular number fonts** = Engineering precision

**Jobseeker Perspective:**
1. **Serif body text** = More readable for longer content (proven research)
2. **Not intimidating** = Warm, open character of chosen serifs
3. **Clear hierarchy** = Easy to scan and find information
4. **Approachable photography** = Real people, real stories
5. **Simple CTAs** = Clear next steps, no confusion

**Competitive Advantage:**
Most government contractors use generic sans-serifs (Arial, Roboto) with corporate-bland aesthetics. America Works will stand out with **premium institutional design** that signals "we compete at the highest level."

---

**Document Version**: 3.0
**Last Updated**: November 2024
**Technology Stack**: Vanilla HTML5, CSS3, JavaScript ES6+
**Design System**: Premium Authority - Institutional Excellence
**Typography**: Instrument Serif, Source Serif 4, Manrope, IBM Plex Mono

---

**Ready for development**: This specification provides complete, production-ready guidance for building a premium, credible, institutional-grade website that positions America Works as a leader in workforce development.
