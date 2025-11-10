# Bazars.io Landing Page - Architecture & Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Next.js 14+                         │
│                     (App Router Pattern)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────┐
        │        Root Layout (layout.tsx)     │
        │   - AnimatePresence (Framer)       │
        │   - Global styles                  │
        │   - Font imports                   │
        └─────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────┐
        │     Landing Page (page.tsx)         │
        │   - Orchestrates all sections      │
        │   - Manages scroll events          │
        └─────────────────────────────────────┘
                              │
        ┌─────────────┬──────────────┬────────────────┐
        │             │              │                │
        ▼             ▼              ▼                ▼
    ┌────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐
    │  Hero  │  │ WorldMap │  │TrustBar │  │  Footer  │
    └────────┘  └──────────┘  └─────────┘  └──────────┘
        │             │              │                │
        └─────────────┼──────────────┼────────────────┘
                      │
        ┌─────────────┼──────────────────────────┐
        │             │                          │
        ▼             ▼                          ▼
   ┌─────────┐  ┌────────────┐  ┌──────────────┐
   │ Customs │  │  Animation │  │  Constants & │
   │  Hooks  │  │ Components │  │   Types      │
   └─────────┘  └────────────┘  └──────────────┘
        │             │                │
        ├─────────┐   ├─────────┐      ├─────────┐
        │         │   │         │      │         │
   useScrollFadeIn  PulsingDot  colors  CITY_DATA
   useAnimationFrames  TradeRouteLines  TRADE_ROUTES
   useWindowSize  ParticleEffect  typography
                                   coordinates
                                   animations
```

---

## Data Flow Diagram

```
User Visits Landing Page
         │
         ▼
    Browser Request
         │
         ▼
  Next.js Server (SSR/SSG)
         │
    ┌────┴────┐
    │          │
    ▼          ▼
HTML/CSS   JavaScript Bundle
    │          │
    └────┬─────┘
         │
         ▼
  Browser Rendering
    (Critical Path)
         │
    ┌────┴────┬────────┬────────┐
    │          │        │        │
    ▼          ▼        ▼        ▼
Layout   Paint   Hero    FontLoad
         │
    ┌────┴────────────┐
    │                 │
    ▼                 ▼
Animations (Framer Motion)
    │
    ├── Hero Fade-in (0.6s)
    ├── Hero Stagger (0.2s each)
    ├── WorldMap Dots Pulse (infinite)
    ├── Trade Lines Draw (3s staggered)
    ├── Particle Effects (4s)
    └── TrustBar Scroll Trigger (on scroll)
```

---

## Component State Management

```
App (page.tsx)
│
├── State:
│   ├── scrollPosition (from window)
│   ├── windowSize (useWindowSize hook)
│   └── isLoaded (initial render)
│
└── Props Passed Down:
    │
    ├─► Hero
    │   └─ logoText, tagline, subtitle
    │
    ├─► WorldMap
    │   ├─ cities: CITY_DATA
    │   ├─ routes: TRADE_ROUTES
    │   ├─ animationSpeed: 'normal'
    │   └─ showParticles: true
    │
    ├─► TrustBar
    │   ├─ partners: []
    │   ├─ leadingText: ''
    │   └─ animated: true
    │
    └─► Footer
        ├─ contactInfo: ContactSection[]
        ├─ copyrightYear: 2024
        └─ companyName: 'Bazars'
```

---

## Animation Orchestration Timeline

```
Timeline (in milliseconds)
│
0ms   ├─ Hero Container start fade-in
      │
      ├─ World Map ready (SVG render)
      │
      └─ Global animation state: STARTING
      │
200ms ├─ Hero Logo visible
      │
400ms ├─ Hero Tagline visible
      │
600ms ├─ Hero Subtitle visible
      │
      ├─ Pulsing dots BEGIN (infinite cycle)
      │  ├─ Beijing pulse start
      │  ├─ Shanghai pulse start (delay +0.2s)
      │  ├─ Ho Chi Minh pulse start (delay +0.4s)
      │  └─ ... etc for all 9 cities
      │
      └─ Trade route lines queue setup
      │
700ms ├─ Line 1: Beijing → Shanghai START drawing
      │
1200ms├─ Line 2: Shanghai → Ho Chi Minh START drawing
      │
1700ms├─ Line 3: Beijing → Istanbul START drawing
      │
      ├─ Particle effects BEGIN (following line draws)
      │
2200ms├─ Line 4: Istanbul → London START drawing
      │
[continues...]

SCROLL EVENTS:
│
├─ When TrustBar enters viewport (80% visible)
│  └─ TrustBar starts fade-in + slide-up animation
│
└─ When user scrolls past sections
   └─ Custom scroll tracking for future enhancements
```

---

## Component Props Interface Map

```typescript
// Hero.tsx
HeroProps {
  logoText?: string           // default: 'BAZARS'
  tagline?: string           // default: infrastructure tagline
  subtitle?: string          // default: connecting merchants
  animated?: boolean         // default: true
}

// WorldMap.tsx
WorldMapProps {
  width?: number            // default: calculated from container
  height?: number           // default: 600px or responsive
  showParticles?: boolean   // default: true
  animationSpeed?: 'slow' | 'normal' | 'fast'  // default: 'normal'
}

// PulsingDot.tsx
PulsingDotProps {
  x: number                 // SVG x coordinate
  y: number                 // SVG y coordinate
  radius?: number           // default: 6px
  color?: string           // default: #FF5722
  pulseScale?: number      // default: 1.2
  duration?: number        // default: 2 (seconds)
  delay?: number           // default: 0 (seconds)
  animated?: boolean       // default: true
}

// TradeRouteLines.tsx
TradeRouteLinesProps {
  routes: TradeRoute[]      // array of route objects
  cities: CityData[]        // array of city objects
  color?: string           // default: #5B6EF5
  strokeWidth?: number     // default: 2
  duration?: number        // default: 3 (seconds)
  staggerDelay?: number    // default: 0.5 (seconds)
}

// ParticleEffect.tsx
ParticleEffectProps {
  pathD: string            // SVG path data string
  particleCount?: number   // default: 4
  color?: string          // default: #FFC107
  duration?: number       // default: 4 (seconds)
  size?: number          // default: 2.5
  delay?: number         // default: 0 (seconds)
}

// TrustBar.tsx
TrustBarProps {
  partners?: string[]     // default: []
  leadingText?: string   // default: partnership text
  animated?: boolean     // default: true
}

// Footer.tsx
FooterProps {
  contactInfo?: ContactSection[]  // array of contact sections
  copyrightYear?: number          // default: current year
  companyName?: string            // default: 'Bazars'
}

// useScrollFadeIn.ts
UseScrollFadeInOptions {
  threshold?: number | number[]   // default: 0.8
  triggerOnce?: boolean          // default: true
  direction?: 'up' | 'down' | 'left' | 'right'  // default: 'up'
  distance?: number              // default: 20
  duration?: number              // default: 0.8
}

// useWindowSize.ts
WindowSize {
  width: number | undefined
  height: number | undefined
}
```

---

## Animation Implementation Strategy

### Framer Motion Variants Pattern

```typescript
// Container variant (staggering children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Item variant (individual animation)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Usage:
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

### SVG Path Animation Pattern

```typescript
// 1. Calculate path length
const pathLength = pathRef.current?.getTotalLength() || 0;

// 2. Set initial stroke-dasharray
strokeDasharray: pathLength

// 3. Animate stroke-dashoffset
animate={{
  strokeDashoffset: [pathLength, 0],
}}
transition={{
  duration: 3,
  ease: 'easeInOut',
}}
```

### Scroll-Triggered Animation Pattern

```typescript
// Using Intersection Observer
const { ref, controls } = useScrollFadeIn({
  threshold: 0.8,
  triggerOnce: true,
  direction: 'up',
});

// Usage:
<motion.section ref={ref} animate={controls} variants={sectionVariants}>
  Content here
</motion.section>
```

---

## File Dependencies Map

```
page.tsx
├── imports: Hero, WorldMap, TrustBar, Footer
└── imports: CITY_DATA, TRADE_ROUTES

Hero.tsx
├── imports: Framer Motion
└── imports: COLORS, TYPOGRAPHY

WorldMap.tsx
├── imports: PulsingDot, TradeRouteLines, ParticleEffect
├── imports: CITY_DATA, TRADE_ROUTES, COLORS
├── imports: useWindowSize
└── imports: getCityCoordinates (utility)

PulsingDot.tsx
├── imports: Framer Motion
└── imports: COLORS

TradeRouteLines.tsx
├── imports: Framer Motion
├── imports: COLORS
└── imports: calculateBezierPath (utility)

ParticleEffect.tsx
├── imports: Framer Motion
├── imports: COLORS
└── imports: parsePathForParticles (utility)

TrustBar.tsx
├── imports: Framer Motion
├── imports: useScrollFadeIn
└── imports: COLORS, TYPOGRAPHY

Footer.tsx
├── imports: COLORS, TYPOGRAPHY
└── imports: ContactSection (type)

useScrollFadeIn.ts
└── imports: Framer Motion, Intersection Observer

useWindowSize.ts
└── imports: only React hooks

constants/colors.ts
└── (no imports - standalone)

constants/coordinates.ts
└── (no imports - standalone)

constants/typography.ts
└── (no imports - standalone)

types/index.ts
└── (no imports - standalone)
```

---

## TypeScript Configuration

```
tsconfig.json
│
├── compilerOptions:
│   ├── target: ES2020
│   ├── lib: [ES2020, DOM, DOM.Iterable]
│   ├── jsx: react-jsx
│   ├── strict: true
│   ├── moduleResolution: bundler
│   ├── baseUrl: .
│   └── paths:
│       └── @/*: ./src/*
│
└── include:
    ├── src/**/*.ts
    ├── src/**/*.tsx
    └── next-env.d.ts
```

---

## Responsive Design Hierarchy

```
Desktop (1024px+)
├── Hero: 64px title, full 100vh height
├── WorldMap: Full resolution, 4-5 particles per line
├── TrustBar: Horizontal layout, full-width text
└── Footer: 3-column layout, horizontal

Tablet (768px - 1023px)
├── Hero: 48px title, 90vh height
├── WorldMap: 80% width, 3 particles per line
├── TrustBar: Horizontal layout, adjusted padding
└── Footer: 2-3 column layout, stacked on demand

Mobile (320px - 767px)
├── Hero: 36px title, auto height
├── WorldMap: 95% width, 2 particles per line, simplified
├── TrustBar: Single column, centered
└── Footer: 1 column, full width, vertical stack
```

---

## Performance Optimization Layers

```
Layer 1: Code Splitting
├── Hero (lazy loaded)
├── WorldMap (lazy loaded)
├── TrustBar (lazy loaded)
└── Footer (critical)

Layer 2: Asset Optimization
├── SVG optimization (SVGO)
├── Font subsetting (only used characters)
├── Image optimization (WebP with fallback)
└── CSS purging (unused styles removed)

Layer 3: Runtime Optimization
├── Memoization (React.memo for static components)
├── useCallback for event handlers
├── useMemo for expensive calculations
└── Lazy animations (disable on prefers-reduced-motion)

Layer 4: Caching Strategy
├── Static export (if possible)
├── ISR (Incremental Static Regeneration)
├── Browser cache headers
└── CDN caching
```

---

## Testing Strategy Map

```
Unit Tests
├── colors.ts
│   └── Test color contrast ratios
├── coordinates.ts
│   └── Test coordinate calculations
├── hooks/
│   ├── useScrollFadeIn
│   │   └── Test observer triggers
│   ├── useAnimationFrames
│   │   └── Test RAF loop
│   └── useWindowSize
│       └── Test window resize
└── utils/
    ├── getBezierPath
    ├── getTotalLength
    └── calculateParticlePositions

Integration Tests
├── Hero + animations
├── WorldMap + all sub-components
├── TrustBar scroll trigger
├── Footer responsive behavior
└── Page load sequence

E2E Tests
├── Full page load
├── Scroll through all sections
├── Verify animations trigger
└── Check responsive on multiple viewports

Visual Regression
├── Compare rendered output to baseline
├── Test on different browsers
└── Test on different devices
```

---

## Deployment Pipeline

```
Git Push
│
├─ GitHub Actions (CI/CD)
│  │
│  ├─ Run tests
│  ├─ TypeScript check
│  ├─ Lint check
│  ├─ Build check
│  └─ Performance check
│
├─ Pull Request Review
│  │
│  ├─ Code review
│  ├─ Visual review
│  └─ Performance review
│
├─ Merge to Main
│  │
│  ├─ Build optimized bundle
│  ├─ Run full test suite
│  └─ Generate source maps
│
└─ Deploy to Production
   │
   ├─ Build Docker image (optional)
   ├─ Deploy to Vercel/hosting
   ├─ Run smoke tests
   ├─ Monitor performance
   └─ Gather metrics
```

---

## Browser Support Matrix

```
Modern Browsers (Support 100%)
├── Chrome/Edge 90+
├── Firefox 88+
├── Safari 14+
└── Mobile browsers (iOS 14+, Android 10+)

CSS Features Used
├── CSS Grid & Flexbox
├── CSS Variables
├── CSS Animations (@keyframes)
├── CSS Transforms (GPU accelerated)
└── SVG filters (optional)

JavaScript Features
├── ES2020+ (modules, destructuring, arrow functions)
├── async/await
├── Intersection Observer API
├── requestAnimationFrame
└── CSS Houdini (optional)

Fallbacks Provided
├── No-JS CSS fallbacks
├── Graceful degradation for animations
├── Responsive images fallbacks
└── Font loading fallbacks
```

---

## Security Considerations

```
Content Security Policy (CSP)
├── script-src: 'self' (Next.js bundles)
├── style-src: 'self' 'unsafe-inline' (Tailwind)
├── font-src: 'self' fonts.googleapis.com
└── img-src: 'self' data: (SVGs)

Input Validation
├── No user input on landing page
└── Future: Email form validation

Dependencies Security
├── Regular npm audit
├── Automated dependency updates
└── Security patches prioritized

Performance Security
├── No performance impact from ads
├── No third-party trackers (optional)
├── Rate limiting for API calls (if any)
└── DDoS protection via CDN
```

---

## Monitoring & Analytics

```
Performance Metrics (Web Vitals)
├── LCP (Largest Contentful Paint)
│   └── Target: < 2.5s
├── FID (First Input Delay)
│   └── Target: < 100ms
├── CLS (Cumulative Layout Shift)
│   └── Target: < 0.1
└── FCP (First Contentful Paint)
    └── Target: < 1.8s

User Interaction Metrics
├── Page view count
├── Bounce rate
├── Average session duration
├── Scroll depth
└── Click tracking (future)

Error Tracking
├── JavaScript errors
├── Network errors
├── Console warnings
└── Failed animations

Business Metrics
├── Conversion tracking (CTAs)
├── Form submissions
├── Email signups
└── Lead generation
```

---

**Document Version:** 1.0
**Last Updated:** November 10, 2024
**Architecture Status:** Production Ready
