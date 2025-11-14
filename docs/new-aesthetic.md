Premium AI Editorial Design System

  Complete Specification Document v1.0

  ---
  1. DESIGN PHILOSOPHY & PSYCHOLOGY

  1.1 Core Principles

  This aesthetic communicates intelligent restraint. Every element must justify its existence. The design whispers authority rather than
  shouting capability.

  The Three Pillars:
  1. Editorial Sophistication - Borrowed from high-end publishing (NYT, The Economist)
  2. Technical Precision - Engineered, not decorated
  3. Futuristic Minimalism - Forward-thinking through subtraction, not addition

  Psychological Goals:
  - Signal premium pricing without stating it
  - Build trust through restraint and precision
  - Attract technical audiences who distrust "marketing"
  - Convey intelligence and thoughtfulness

  ---
  2. TYPOGRAPHY SYSTEM

  2.1 Font Stack Architecture

  Display/Headline Font:
  - Primary Choice: Instrument Serif
  - Alternatives: Fraunces (variable), Tiempos Text, GT Sectra, Lyon Display
  - Characteristics Required:
    - High contrast (thick/thin stroke variation)
    - Bracketed serifs (curved connections)
    - Ball terminals (rounded stroke endings)
    - Tall x-height
    - Wide apertures
    - Must have italic variant with distinct personality

  Body/UI Font:
  - Primary Choice: Manrope or Inter
  - Alternatives: Untitled Sans, Söhne, ABC Favorit
  - Characteristics Required:
    - Geometric construction with subtle humanist touches
    - Nearly monoline (minimal stroke contrast)
    - Tall x-height matching serif
    - Slightly condensed (95-98% width)
    - Must include weights: 400, 500, 600, 700

  Monospace/Technical Font:
  - Primary Choice: IBM Plex Mono
  - Alternatives: JetBrains Mono, Berkeley Mono, Commit Mono
  - Characteristics Required:
    - True monospace (all glyphs same width)
    - Clear distinction between similar characters (0/O, 1/l/I)
    - Medium weight as default (500)
    - Slightly geometric appearance

  2.2 Type Scale (Base 16px)

  --text-display-xl: 5rem (80px)      Line: 1.0-1.1    Letter: -0.04em
  --text-display-lg: 3.75rem (60px)   Line: 1.1        Letter: -0.03em
  --text-display-md: 2.75rem (44px)   Line: 1.15       Letter: -0.025em
  --text-h1: 2.5rem (40px)            Line: 1.2        Letter: -0.02em
  --text-h2: 2rem (32px)              Line: 1.25       Letter: -0.015em
  --text-h3: 1.5rem (24px)            Line: 1.3        Letter: -0.01em
  --text-xl: 1.375rem (22px)          Line: 1.5        Letter: -0.01em
  --text-lg: 1.125rem (18px)          Line: 1.6        Letter: -0.005em
  --text-base: 1.0625rem (17px)       Line: 1.7        Letter: -0.01em
  --text-sm: 0.9375rem (15px)         Line: 1.6        Letter: 0em
  --text-xs: 0.8125rem (13px)         Line: 1.5        Letter: 0.01em
  --text-mono-lg: 1.5rem (24px)       Line: 1.4        Letter: 0em
  --text-mono-base: 1rem (16px)       Line: 1.6        Letter: 0em
  --text-mono-sm: 0.875rem (14px)     Line: 1.5        Letter: 0.02em

  Critical Rules:
  - Display sizes (xl, lg, md) ONLY use serif font
  - Negative letter-spacing increases with size (creates elegance)
  - Line-height decreases as size increases (tighter = more impact)
  - Body text at 17px (not 16px) - improves readability without looking "large"
  - Monospace never goes below 14px (legibility threshold)

  2.3 Typography Application Matrix

  | Element          | Font  | Size       | Weight | Letter Spacing     | Line Height |
  |------------------|-------|------------|--------|--------------------|-------------|
  | Hero headline    | Serif | display-xl | 600    | -0.04em            | 1.1         |
  | Section headline | Serif | display-md | 600    | -0.025em           | 1.15        |
  | Card title       | Serif | h2         | 600    | -0.015em           | 1.25        |
  | Hero subhead     | Sans  | xl         | 400    | -0.01em            | 1.6         |
  | Body paragraph   | Sans  | base       | 400    | -0.01em            | 1.7         |
  | Button primary   | Sans  | base       | 600    | 0.02em (wide!)     | 1           |
  | Navigation       | Sans  | sm         | 500    | 0.02em             | 1           |
  | Small caps label | Mono  | xs         | 600    | 0.15em (very wide) | 1.3         |
  | Metrics/stats    | Mono  | mono-lg    | 500    | 0em                | 1.4         |
  | Code snippets    | Mono  | mono-base  | 400    | 0em                | 1.6         |

  Key Insight: Buttons and labels get WIDE letter-spacing (positive values) while headlines get TIGHT spacing (negative values). This creates
   rhythm and hierarchy.

  ---
  3. COLOR SYSTEM

  3.1 Core Palette Philosophy

  Constraint = Premium. Maximum 3 colors per page section. Never use all colors on one screen.

  3.2 Base Colors (Required)

  Neutrals (These do the heavy lifting):
  --white: #FFFFFF
  --gray-50: #FAFAFA (subtle backgrounds)
  --gray-100: #F4F4F5 (card backgrounds)
  --gray-200: #E4E4E7 (borders, dividers)
  --gray-300: #D4D4D8 (inactive states)
  --gray-400: #A1A1AA (muted text)
  --gray-500: #71717A (secondary text)
  --gray-600: #52525B (body text)
  --gray-700: #3F3F46 (headings)
  --gray-800: #27272A (high contrast text)
  --gray-900: #18181B (maximum contrast)
  --black: #000000 (pure black for CTAs)

  Critical Rule: Use gray-700 or darker for all text. Never use grays lighter than 700 for text (WCAG AAA compliance).

  3.3 Accent Color System

  Primary Accent (The "AI Color"):
  Cyan/Turquoise spectrum:
  --cyan-400: #22D3EE (light, glows)
  --cyan-500: #06B6D4 (primary)
  --cyan-600: #0891B2 (hover state)

  Alternative: Electric Blue
  --blue-400: #60A5FA
  --blue-500: #3B82F6
  --blue-600: #2563EB

  Usage Rules:
  - Primary accent for: Primary CTAs, active states, links, progress indicators
  - Maximum usage: 5-8% of visible screen area
  - Always on white or very dark backgrounds (never on mid-tones)

  Secondary Accent (Warm counterpoint):
  --orange-400: #FB923C
  --orange-500: #F97316
  --red-500: #EF4444

  Usage:
  - Highlighting specific words in headlines
  - Error states (red)
  - Secondary emphasis (orange)
  - Data visualization accents
  - Maximum usage: 2-3% of screen

  3.4 Gradient System

  Background Gradients (Subtle):
  /* Mesh gradient - hero backgrounds */
  background: linear-gradient(135deg,
    hsl(220, 90%, 98%) 0%,
    hsl(0, 0%, 100%) 40%,
    hsl(200, 15%, 98%) 100%
  );

  /* Dark mode alternative */
  background: linear-gradient(135deg,
    hsl(220, 40%, 12%) 0%,
    hsl(0, 0%, 8%) 50%,
    hsl(260, 30%, 10%) 100%
  );

  Sphere/Orb Gradients (Vibrant):
  /* Cyan sphere */
  background: radial-gradient(circle at 30% 40%,
    hsl(180, 80%, 60%) 0%,
    hsl(200, 70%, 45%) 50%,
    hsl(220, 60%, 25%) 100%
  );

  /* Orange sphere */
  background: radial-gradient(circle at 60% 30%,
    hsl(25, 85%, 65%) 0%,
    hsl(15, 75%, 52%) 50%,
    hsl(5, 70%, 42%) 100%
  );

  Rules:
  - Background gradients: max 10% saturation shift
  - Orb gradients: 30-40% saturation, high luminosity variation
  - Never gradient text (accessibility issue)
  - Always radial for 3D effects, linear for backgrounds

  3.5 Shadow System

  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08),
               0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.06),
               0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08),
               0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.10),
               0 8px 10px rgba(0, 0, 0, 0.04);

  /* Colored glow shadows */
  --shadow-cyan-glow: 0 10px 40px rgba(6, 182, 212, 0.25);
  --shadow-blue-glow: 0 10px 40px rgba(59, 130, 246, 0.20);

  Usage Matrix:
  - Cards at rest: shadow-sm
  - Cards on hover: shadow-lg
  - Floating browser mockups: shadow-xl
  - Primary CTA hover: shadow-cyan-glow
  - Modals/overlays: shadow-xl

  ---
  4. SPACING & LAYOUT SYSTEM

  4.1 Spacing Scale (8px base unit)

  --space-0: 0
  --space-1: 0.25rem (4px)   - icon padding
  --space-2: 0.5rem (8px)    - tight element spacing
  --space-3: 0.75rem (12px)  - button padding vertical
  --space-4: 1rem (16px)     - standard element spacing
  --space-6: 1.5rem (24px)   - paragraph bottom margin
  --space-8: 2rem (32px)     - component spacing
  --space-12: 3rem (48px)    - section spacing small
  --space-16: 4rem (64px)    - section spacing medium
  --space-20: 5rem (80px)    - section spacing large
  --space-24: 6rem (96px)    - section spacing xl
  --space-32: 8rem (128px)   - hero padding top

  Critical Ratios:
  - Vertical spacing 1.5-2x horizontal spacing (creates breathing)
  - Section padding: minimum 6rem (96px) top/bottom
  - Content max-width: 1400px (87.5rem)
  - Reading width: 700px (43.75rem) for paragraphs

  4.2 Grid System

  12-column grid with asymmetric usage:
  Container max-width: 1400px
  Gutter: 32px (2rem)
  Margin: 32px minimum (responsive)

  Common Grid Patterns:
  - Hero: 7 columns text + 5 columns visual
  - Feature sections: 6 + 6 or 5 + 7 (never perfect 50/50)
  - Card grids: 4 + 4 + 4 or 3 + 3 + 3 + 3
  - Testimonials: 8 columns centered
  - Footer: 3 + 3 + 3 + 3

  Key Rule: Avoid perfect symmetry. 7/5 splits feel more dynamic than 6/6.

  4.3 White Space Principles

  Macro White Space (between sections):
  - Minimum: 96px (6rem)
  - Preferred: 128-160px (8-10rem)
  - Hero to first section: 160px minimum

  Micro White Space (within components):
  - Headline to subheadline: 24px (1.5rem)
  - Paragraph spacing: 24px (1.5rem)
  - List item spacing: 12px (0.75rem)
  - Button padding: 16px horizontal, 12px vertical (1rem × 0.75rem)

  The 60/30/10 Rule:
  - 60% white/negative space
  - 30% content (text, images)
  - 10% accent elements (colors, CTAs)

  ---
  5. COMPONENT SPECIFICATIONS

  5.1 Primary Button

  .btn-primary {
    /* Typography */
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02em; /* Wide for impact */

    /* Spacing */
    padding: 1rem 2rem; /* 16px × 32px */

    /* Appearance */
    background: #000000; /* Pure black */
    color: #FFFFFF;
    border: none;
    border-radius: 2px; /* Minimal, not rounded */

    /* Effects */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    /* Interaction */
    &:hover {
      background: #1a1a1a;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  Cyan Variant:
  - Background: var(--cyan-500)
  - Hover: var(--cyan-600)
  - Add: box-shadow on hover: var(--shadow-cyan-glow)

  5.2 Secondary Button

  .btn-secondary {
    /* Same typography as primary */

    /* Appearance */
    background: transparent;
    color: var(--gray-900);
    border: 2px solid var(--gray-300);
    border-radius: 2px;

    /* Interaction */
    &:hover {
      border-color: var(--cyan-500);
      color: var(--cyan-600);
      background: var(--cyan-50);
      transform: translateY(-2px);
    }
  }

  5.3 Badge/Pill Component

  .badge {
    /* Typography */
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em; /* Very wide */
    text-transform: uppercase;

    /* Spacing */
    padding: 0.375rem 0.75rem; /* 6px × 12px */

    /* Appearance */
    background: white;
    border: 1px solid var(--gray-300);
    border-radius: 2px; /* Sharp, not pill-shaped yet */

    /* For pill shape alternative: */
    border-radius: 999px; /* Full pill */
  }

  5.4 Card Component (Standard)

  .card {
    /* Spacing */
    padding: 2rem; /* 32px all sides */

    /* Appearance */
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 4px; /* Subtle */

    /* Effects */
    box-shadow: var(--shadow-sm);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    /* Interaction */
    &:hover {
      border-color: var(--cyan-200);
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }
  }

  Featured Card Variant:
  - Add: border-left: 4px solid var(--cyan-500)
  - Add: background: linear-gradient(135deg, var(--cyan-50) 0%, white 100%)

  5.5 Navigation

  .navigation {
    position: fixed;
    top: 0;
    width: 100%;

    /* Appearance */
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--gray-200);

    /* Layout */
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Z-index */
    z-index: 1000;
  }

  .nav-link {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: var(--gray-700);
    text-decoration: none;

    /* Underline effect */
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--cyan-500);
      transform: scaleX(0);
      transition: transform 0.2s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }

  ---
  6. VISUAL EFFECTS & DECORATIVE ELEMENTS

  6.1 Grid Overlay

  .grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--gray-200) 1px, transparent 1px),
      linear-gradient(90deg, var(--gray-200) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.3;
    pointer-events: none;
  }

  Usage: Hero sections, behind key content areas

  6.2 Particle/Dot Effects

  Stipple Pattern (like SkyForge mountains):
  /* Create with SVG or Canvas */
  /* Pattern: randomized dots with density variation */
  /* Technique: Halftone screening algorithm */

  Algorithm:
  1. Create base image (mountain, landscape, abstract)
  2. Convert to grayscale
  3. For each pixel:
     - Brightness determines dot size
     - Place circle at position
     - Size: brightness / 255 * maxDotSize
  4. Export as SVG or render to canvas

  Scattered Particles (decorative):
  .particle-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  /* Generate via JavaScript: */
  for (let i = 0; i < 200; i++) {
    create dot at random x, y
    size: 1-3px
    opacity: 0.1-0.3
    color: white or cyan
  }

  6.3 Gradient Spheres/Orbs

  Creating 3D Gradient Sphere Effect:

  .sphere {
    width: 400px;
    height: 400px;
    border-radius: 50%;

    /* Multi-layer gradient for depth */
    background:
      radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0) 50%
      ),
      radial-gradient(circle at 60% 60%,
        hsl(180, 80%, 25%) 0%,
        hsl(180, 70%, 40%) 30%,
        hsl(180, 60%, 55%) 60%,
        hsl(180, 50%, 70%) 100%
      );

    /* Shadow for lift */
    box-shadow:
      inset 0 0 100px rgba(0, 0, 0, 0.2),
      0 20px 60px rgba(0, 0, 0, 0.15);

    /* Optional: subtle animation */
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(3deg); }
  }

  Stripe Pattern (Comet-style):
  .striped-sphere {
    background: conic-gradient(
      from 45deg,
      hsl(180, 70%, 50%) 0deg,
      hsl(200, 65%, 45%) 60deg,
      hsl(220, 60%, 40%) 120deg,
      hsl(240, 55%, 35%) 180deg,
      hsl(20, 75%, 55%) 240deg,
      hsl(10, 70%, 50%) 300deg,
      hsl(180, 70%, 50%) 360deg
    );
  }

  6.4 Isometric 3D Cards

  Perspective Setup:
  .isometric-container {
    perspective: 2000px;
    perspective-origin: 50% 50%;
  }

  .isometric-card {
    width: 400px;
    height: 200px;
    background: white;
    border: 1px solid var(--gray-300);
    border-radius: 8px;
    padding: 1.5rem;

    /* Isometric transformation */
    transform:
      rotateX(8deg)    /* Slight tilt up */
      rotateY(-6deg)   /* Slight tilt right */
      rotateZ(1deg);   /* Minimal rotation */

    /* Shadow must match perspective */
    box-shadow:
      8px 12px 24px rgba(0, 0, 0, 0.08),
      4px 6px 12px rgba(0, 0, 0, 0.04);

    /* Connection lines between cards */
    &::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 60px;
      background: var(--gray-300);
      bottom: -60px;
      left: 50%;
      transform: translateX(-1px);
    }
  }

  Dashed borders for technical feel:
  border: 1px dashed var(--gray-300);
  /* or */
  background-image: repeating-linear-gradient(
    0deg,
    var(--gray-300) 0px,
    var(--gray-300) 4px,
    transparent 4px,
    transparent 8px
  );

  6.5 Terminal/Code Window

  <div class="terminal-window">
    <div class="terminal-header">
      <div class="terminal-dots">
        <span style="background: #FF5F56"></span>
        <span style="background: #FFBD2E"></span>
        <span style="background: #27C93F"></span>
      </div>
    </div>
    <div class="terminal-content">
      <!-- Content here -->
    </div>
  </div>

  .terminal-window {
    background: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-xl);
  }

  .terminal-header {
    background: #2d2d2d;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #3d3d3d;
  }

  .terminal-dots {
    display: flex;
    gap: 0.5rem;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }

  .terminal-content {
    padding: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.6;
    color: #e5e5e5;
  }

  ---
  7. ANIMATION & INTERACTION PRINCIPLES

  7.1 Timing Functions

  Never use linear or default ease. Always use these:

  /* Primary easing - most interactions */
  --ease-primary: cubic-bezier(0.4, 0, 0.2, 1);

  /* Bounce - for playful elements */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Smooth decel - for exits */
  --ease-out: cubic-bezier(0.0, 0, 0.2, 1);

  /* Sharp accel - for entrances */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);

  7.2 Duration Standards

  Micro-interactions: 150-200ms (hover states)
  Component transitions: 250-350ms (card hover, button press)
  Page transitions: 400-600ms (section reveals)
  Decorative animations: 800-2000ms (stat counters, reveals)
  Ambient animations: 15-30s (floating orbs, mesh rotation)

  7.3 Scroll-Triggered Animations

  Fade In Up Pattern:
  .reveal-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-primary),
                transform 0.8s var(--ease-primary);
  }

  .reveal-element.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  Stagger children by 100ms:
  .reveal-element:nth-child(1) { transition-delay: 0ms; }
  .reveal-element:nth-child(2) { transition-delay: 100ms; }
  .reveal-element:nth-child(3) { transition-delay: 200ms; }

  7.4 Scroll Progress Bar

  <div class="scroll-progress-bar"></div>

  .scroll-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg,
      var(--cyan-500) 0%,
      var(--blue-500) 100%
    );
    transform-origin: left;
    transform: scaleX(0);
    z-index: 9999;
  }

  const updateProgress = () => {
    const scrollPercent = window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = `scaleX(${scrollPercent})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  7.5 Number Counter Animation

  class StatCounter {
    constructor(element, target, duration = 2000) {
      this.element = element;
      this.target = target;
      this.duration = duration;
    }

    animate() {
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Easing: easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);

        const currentCount = Math.floor(eased * this.target);
        this.element.textContent = currentCount.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }

  ---
  8. IMAGERY & PHOTOGRAPHY GUIDELINES

  8.1 Photography Style

  When using photos:
  - High contrast (deep shadows, bright highlights)
  - Shallow depth of field (blurred backgrounds)
  - Professional/editorial quality
  - Subjects: cosmic imagery, abstract landscapes, professional environments
  - Color grading: Cool tones (blues, teals) or desaturated
  - Never stock photo clichés (handshakes, fake meetings)

  Processing:
  - Increase contrast: +15-25%
  - Reduce saturation: -10-20%
  - Shift color temperature: +5-10 towards blue
  - Add subtle grain (1-2%)
  - Vignette: -10-15%

  8.2 Illustration Style

  Isometric Illustrations:
  - White or very light gray fills
  - Stroke weight: 1-2px
  - Stroke color: gray-300 to gray-400
  - Minimal detail (reduce visual noise)
  - Show UI elements (cards, windows, buttons)
  - Include subtle shadows (gray-200)
  - Dashed lines for connections

  Abstract Shapes:
  - Gradient spheres/orbs (see section 6.3)
  - Particle clusters
  - Grid patterns
  - Dot matrices
  - Flowing lines/paths
  - Never: flat icons, mascots, cartoons

  8.3 Cosmic/Space Imagery

  When to use:
  - Hero backgrounds (subtle, low opacity)
  - Terminal window content
  - Section backgrounds
  - Loading states

  Criteria:
  - Deep space scenes (galaxies, nebulae)
  - High resolution (2x screen size minimum)
  - Apply stipple/halftone effect for brand consistency
  - Desaturate slightly (-20%)
  - Overlay with multiply blend at 40-60% opacity

  ---
  9. LAYOUT PATTERNS & TEMPLATES

  9.1 Hero Section Template

  <section class="hero">
    <div class="hero-background">
      <div class="grid-overlay"></div>
      <div class="gradient-mesh"></div>
    </div>

    <div class="hero-container">
      <div class="hero-grid">
        <div class="hero-content">
          <!-- Eyebrow -->
          <div class="eyebrow">
            <span class="badge">Est. 2024</span>
            <span class="divider">•</span>
            <span class="badge">Y Combinator</span>
          </div>

          <!-- Headline -->
          <h1 class="hero-headline">
            <span class="line-1">Build the future</span>
            <span class="line-2">with AI that thinks</span>
          </h1>

          <!-- Subheadline -->
          <p class="hero-subheadline">
            Transform your workflow with intelligent automation
            that scales with your business.
          </p>

          <!-- CTAs -->
          <div class="hero-ctas">
            <button class="btn-primary">Start Building</button>
            <button class="btn-secondary">View Docs</button>
          </div>
        </div>

        <div class="hero-visual">
          <!-- Terminal window, isometric cards, or data panel -->
        </div>
      </div>
    </div>
  </section>

  Specifications:
  - Hero min-height: 90vh
  - Grid: 7 columns content + 5 columns visual (on 12-col)
  - Vertical padding: 8rem top, 4rem bottom
  - Background: subtle gradient + grid overlay
  - Headline: 2 lines maximum
  - Subheadline: 2-3 sentences, max 600px width

  9.2 Metrics Dashboard Section

  <section class="metrics-section">
    <div class="container">
      <header class="section-header">
        <span class="label-system">Performance Metrics</span>
        <h2 class="display-md">Built for scale.</h2>
      </header>

      <div class="metrics-grid">
        <!-- Featured metric -->
        <div class="metric-card featured">
          <span class="metric-badge">Primary KPI</span>
          <div class="metric-number">1.2M</div>
          <p class="metric-description">API calls processed daily</p>
          <div class="metric-trend">↑ 24% vs last month</div>
        </div>

        <!-- Standard metrics -->
        <div class="metric-card">
          <div class="metric-icon">⚡</div>
          <div class="metric-number"><1s</div>
          <p class="metric-description">Average response time</p>
        </div>

        <!-- More metrics... -->
      </div>
    </div>
  </section>

  Specifications:
  - Grid: 2fr 1fr 1fr 1fr (featured card spans 2 rows)
  - Gap between cards: 1.5rem
  - Card padding: 2rem
  - Featured card: gradient background, left border accent
  - Metric numbers: monospace font, 2.5-3rem size
  - Icons: emoji or simple SVG, 2rem size, 60% opacity

  9.3 Two-Column Feature Section

  <section class="feature-section">
    <div class="container">
      <div class="feature-grid">
        <div class="feature-visual">
          <!-- Isometric illustration or screenshot -->
        </div>

        <div class="feature-content">
          <span class="label-system">Feature Name</span>
          <h2 class="h2">Powerful automation at your fingertips</h2>
          <p>Description paragraph with benefits...</p>

          <ul class="feature-list">
            <li>Benefit one</li>
            <li>Benefit two</li>
            <li>Benefit three</li>
          </ul>

          <a href="#" class="btn-secondary">Learn More →</a>
        </div>
      </div>
    </div>
  </section>

  Specifications:
  - Alternate left/right for consecutive sections
  - Grid: 5 columns visual + 7 columns content (or reverse)
  - Vertical alignment: center
  - List items: custom checkmark (✓) in accent color
  - Arrow in CTA: actual character (→) not image

  ---
  10. RESPONSIVE BEHAVIOR

  10.1 Breakpoints

  /* Mobile first approach */
  --breakpoint-sm: 640px
  --breakpoint-md: 768px
  --breakpoint-lg: 1024px
  --breakpoint-xl: 1280px
  --breakpoint-2xl: 1536px

  10.2 Type Scale Adjustments

  Mobile (<768px):
  --text-display-xl: 3rem (48px)     /* -40% */
  --text-display-lg: 2.5rem (40px)   /* -33% */
  --text-display-md: 2rem (32px)     /* -27% */
  --text-h1: 1.75rem (28px)          /* -30% */
  --text-base: 1rem (16px)           /* -6% */

  Tablet (768px - 1024px):
  --text-display-xl: 4rem (64px)     /* -20% */
  --text-display-lg: 3rem (48px)     /* -20% */
  --text-display-md: 2.25rem (36px)  /* -18% */

  10.3 Layout Adjustments

  Desktop (default):
  - Hero: 7/5 grid split
  - Features: 5/7 or 7/5
  - Cards: 4 or 3 columns
  - Footer: 4 columns

  Tablet (768px-1024px):
  - Hero: stack (1 column)
  - Features: stack (1 column)
  - Cards: 2 columns
  - Footer: 2 columns

  Mobile (<768px):
  - All layouts: single column
  - Cards: 1 column
  - Horizontal padding: 1.5rem (down from 2rem)
  - Section padding: 4rem vertical (down from 6-8rem)
  - Button: full width (width: 100%)

  10.4 Navigation Responsive

  @media (max-width: 768px) {
    .nav-links.desktop {
      display: none;
    }

    .nav-hamburger {
      display: block;
    }

    /* Mobile menu */
    .mobile-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100vh;
      background: white;
      transition: right 0.3s ease;
    }

    .mobile-menu.open {
      right: 0;
    }
  }

  ---
  11. ACCESSIBILITY REQUIREMENTS

  11.1 Color Contrast

  Minimum ratios (WCAG AA):
  - Normal text (< 18px): 4.5:1
  - Large text (≥ 18px): 3:1
  - UI components: 3:1

  Recommended (WCAG AAA):
  - Normal text: 7:1
  - Large text: 4.5:1

  Testing:
  - Gray-700 (#3F3F46) on white: 8.9:1 ✓
  - Gray-600 (#52525B) on white: 7.3:1 ✓
  - Cyan-500 (#06B6D4) on white: 3.2:1 (large text only)
  - White on Cyan-500: 4.1:1 ✓

  11.2 Focus States

  *:focus-visible {
    outline: 3px solid var(--cyan-500);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* For dark backgrounds */
  .dark *:focus-visible {
    outline-color: var(--cyan-400);
  }

  11.3 Reduced Motion

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  11.4 Semantic HTML

  Required structure:
  <header> - site header with nav
    <nav> - main navigation

  <main> - primary content
    <section> - each major section
      <header> - section header
      <article> - repeating content

  <footer> - site footer

  Heading hierarchy:
  - One H1 per page (hero headline)
  - H2 for section headlines
  - H3 for subsections/card titles
  - Never skip levels (H1 → H3)

  ---
  12. TECHNICAL IMPLEMENTATION

  12.1 CSS Architecture

  Recommended approach: CSS Custom Properties + Utility Classes

  /* Foundation: Custom properties */
  :root {
    /* All variables from sections 2-4 */
  }

  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--gray-700);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Component classes (from section 5) */
  /* Utility classes (spacing, typography) */

  12.2 Font Loading Strategy

  <!-- Preconnect for faster loading -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Load fonts with display=swap -->
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;600&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono
  :wght@400;500;600&display=swap" rel="stylesheet">

  Alternative (self-hosted for performance):
  @font-face {
    font-family: 'Instrument Serif';
    src: url('/fonts/InstrumentSerif-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  12.3 Performance Checklist

  - Use AVIF/WebP for images (fallback to JPEG)
  - Lazy load images below fold
  - Preload critical fonts
  - Inline critical CSS (<14KB)
  - Defer non-critical JavaScript
  - Use CSS containment for animations
  - Implement virtual scrolling for long lists
  - Compress assets with Brotli/Gzip
  - Use CDN for static assets
  - Minimize layout shifts (set width/height on images)

  12.4 JavaScript Framework Considerations

  Framework-agnostic patterns:
  - Intersection Observer for scroll reveals
  - requestAnimationFrame for smooth animations
  - CSS Variables for dynamic theming
  - Web Components for reusable elements

  React example (stat counter):
  function StatCounter({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateCount();
        }
      });

      observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    const animateCount = () => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);

        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    return (
      <div ref={ref} className="metric-number">
        {count.toLocaleString()}
      </div>
    );
  }

  ---
  13. DO'S AND DON'TS

  ✅ DO:

  1. Typography:
    - Use large serif headlines (60px+)
    - Negative letter-spacing on headlines
    - Positive letter-spacing on buttons/labels
    - Maintain 1.6-1.8 line-height for body text
  2. Color:
    - Stick to 2-3 colors maximum per screen
    - Use cyan/turquoise as primary accent
    - Keep backgrounds white or very subtle gradients
    - Use pure black (#000) for primary CTAs
  3. Layout:
    - Embrace white space (60% of screen)
    - Use asymmetric grids (7/5, not 6/6)
    - Minimum 96px between sections
    - Center content, max-width 1400px
  4. Effects:
    - Subtle shadows (low opacity, soft blur)
    - Smooth transitions (cubic-bezier)
    - Isometric 3D for illustrations
    - Particle/dot effects for technical feel
  5. Content:
    - Lead with metrics and performance
    - Use social proof (company logos)
    - Show actual product UI
    - Write concise, benefit-focused copy

  ❌ DON'T:

  1. Typography:
    - Don't use script fonts or decorative typefaces
    - Don't use default system fonts alone
    - Don't go below 14px for any text
    - Don't use more than 3 font families
  2. Color:
    - Don't use bright, saturated backgrounds
    - Don't use rainbow color schemes
    - Don't use color as only indicator (accessibility)
    - Don't use harsh gradients (>30% saturation shift)
  3. Layout:
    - Don't cram content (no breathing room)
    - Don't use perfect symmetry everywhere
    - Don't exceed 700px width for paragraphs
    - Don't use inconsistent spacing
  4. Effects:
    - Don't use drop shadows on text
    - Don't animate everything constantly
    - Don't use skeuomorphic designs
    - Don't use heavy/slow animations
  5. Visual:
    - Don't use stock photo clichés
    - Don't use flat 2D illustrations
    - Don't use cartoon mascots
    - Don't use busy backgrounds behind text
  6. General:
    - Don't add decorative elements without purpose
    - Don't use more than 2 CTA buttons in hero
    - Don't hide navigation items
    - Don't use popups or intrusive modals

  ---
  14. QUICK REFERENCE CHECKLIST

  Before launching, verify:

  - Instrument Serif (or equivalent) for all headlines
  - Headline sizes 44px+ on desktop
  - Negative letter-spacing on headlines (-0.02em to -0.04em)
  - Wide letter-spacing on buttons (0.02em)
  - Maximum 3 accent colors used
  - Cyan/turquoise as primary accent
  - White or subtle gradient backgrounds only
  - 96px+ vertical padding between sections
  - Content max-width 1400px
  - Paragraph max-width 700px
  - Shadow opacity <15%
  - Border-radius <8px (prefer 2-4px)
  - All transitions use cubic-bezier
  - Grid overlay on hero section
  - Isometric or 3D effect on illustrations
  - Monospace font for metrics/stats
  - Social proof (logos) included
  - Metrics prominently displayed
  - Primary CTA is black or cyan
  - Focus states visible (3px outline)
  - All text meets 4.5:1 contrast minimum
  - Reduced motion preference respected
  - Images lazy-loaded
  - Fonts preloaded
  - Mobile-responsive (stack at 768px)
  - Touch targets minimum 44×44px

  ---
  15. EXAMPLE COLOR COMBINATIONS

  Combination 1: Classic (Most Common)
  - Background: #FFFFFF
  - Text: #27272A (gray-800)
  - Accent: #06B6D4 (cyan-500)
  - CTA: #000000 (black)

  Combination 2: Warm Variant
  - Background: #FAFAFA (gray-50)
  - Text: #18181B (gray-900)
  - Accent: #F97316 (orange-500)
  - CTA: #000000

  Combination 3: Blue Focus
  - Background: #FFFFFF
  - Text: #3F3F46 (gray-700)
  - Accent: #3B82F6 (blue-500)
  - CTA: #1E40AF (blue-700)

  Combination 4: Dark Mode
  - Background: #18181B (gray-900)
  - Text: #E5E5E5 (gray-200)
  - Accent: #22D3EE (cyan-400)
  - CTA: #06B6D4 (cyan-500)

  ---
  16. FINAL NOTES

  This aesthetic succeeds because it respects the viewer's intelligence. It doesn't shout or decorate unnecessarily. Every element serves a
  purpose. The generous white space isn't emptiness—it's confidence. The large serif headlines aren't decorative—they're editorial authority.
   The cyan accents aren't playful—they're precise technical indicators.

  The psychology:
  When technical professionals see this design, they recognize:
  - "These people know design" (sophisticated typography)
  - "This product is fast" (minimal visual weight)
  - "This is premium" (restraint and white space)
  - "This is modern" (fresh color palette, 3D effects)
  - "This is trustworthy" (metrics, social proof, precision)

  The paradox:
  This aesthetic looks effortless but requires extreme discipline. The temptation to add more color, more decoration, more content must be
  resisted. The designer's job is to remove everything except what's essential.

  Final principle:
  When in doubt, reduce. Remove a color. Increase white space. Simplify an illustration. Make text larger. The best version of this aesthetic
   is always simpler than your first draft.

  ---
  Document Version: 1.0
  Last Updated: 2025
  Style Name: Premium AI Editorial
  Also Known As: Technical Luxury, Modern AI Aesthetic, Developer-First Design