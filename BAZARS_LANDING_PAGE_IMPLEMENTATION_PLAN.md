# Bazars.io Landing Page - Detailed Implementation Plan

## Executive Summary

This document provides a comprehensive implementation roadmap for building the bazars.io landing page using Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion. The implementation is broken into phases with clear milestones, component specifications, and technical details.

---

## 1. PROJECT STRUCTURE

### Directory Organization

```
bazars-landing-page/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Main landing page
│   │   ├── globals.css             # Global Tailwind styles
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero section with logo and tagline
│   │   │   ├── WorldMap.tsx        # SVG world map with animations
│   │   │   ├── TrustBar.tsx        # Partnership/trust section
│   │   │   └── Footer.tsx          # Footer with contact info
│   │   │
│   │   ├── ui/                     # shadcn/ui components
│   │   │   └── [shadcn components]
│   │   │
│   │   └── animations/
│   │       ├── PulsingDot.tsx      # Reusable pulsing dot component
│   │       ├── TradeRouteLines.tsx # SVG lines with draw animation
│   │       └── ParticleEffect.tsx  # Particle animation along lines
│   │
│   ├── hooks/
│   │   ├── useScrollFadeIn.ts      # Scroll-triggered fade animation
│   │   ├── useAnimationFrames.ts   # RAF-based animation hook
│   │   └── useWindowSize.ts        # Responsive design helper
│   │
│   ├── types/
│   │   ├── index.ts                # Global type definitions
│   │   └── components.ts           # Component-specific types
│   │
│   ├── constants/
│   │   ├── colors.ts               # Design system colors
│   │   ├── coordinates.ts          # City coordinates for map
│   │   └── copywriting.ts          # All text content
│   │
│   ├── utils/
│   │   ├── classnames.ts           # CN utility wrapper
│   │   ├── animations.ts           # Animation timing functions
│   │   └── geometry.ts             # SVG path calculations
│   │
│   └── styles/
│       └── animations.css          # Global animation definitions
│
├── public/
│   ├── fonts/
│   │   ├── titillium-web-bold.woff2
│   │   └── inter.woff2
│   └── images/
│       └── [optimization ready]
│
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # Project documentation
```

---

## 2. DESIGN SYSTEM

### Color Palette

```typescript
// src/constants/colors.ts
export const COLORS = {
  primary: '#FF5722',        // Orange - primary action/accents
  navy: '#1E0E2E',           // Navy - primary text/background
  cream: '#F5F1E8',          // Cream - light backgrounds
  green: '#00C853',          // Green - accent/positive
  blue: '#5B6EF5',           // Blue - accent/secondary
  gold: '#FFC107',           // Gold - premium/highlight
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
} as const;

export const TEXT_COLORS = {
  primary: COLORS.navy,
  secondary: COLORS.gray[600],
  muted: COLORS.gray[500],
  light: COLORS.cream,
};

export const BACKGROUND_COLORS = {
  default: COLORS.white,
  secondary: COLORS.cream,
  dark: COLORS.navy,
};
```

### Typography System

```typescript
// src/constants/typography.ts
export const TYPOGRAPHY = {
  fonts: {
    heading: '"Titillium Web", sans-serif',  // Headings - Bold 700
    body: '"Inter", sans-serif',              // Body text - Regular 400
  },
  sizes: {
    hero_title: {
      desktop: '64px',      // BAZARS logo
      tablet: '48px',
      mobile: '36px',
      line_height: '1.2',
      font_weight: '700',
    },
    tagline: {
      desktop: '24px',
      tablet: '20px',
      mobile: '18px',
      line_height: '1.3',
      font_weight: '400',
    },
    subtitle: {
      desktop: '16px',
      tablet: '15px',
      mobile: '14px',
      line_height: '1.5',
      font_weight: '400',
    },
    section_title: {
      desktop: '32px',
      tablet: '28px',
      mobile: '24px',
      font_weight: '700',
    },
    body_text: {
      desktop: '16px',
      tablet: '15px',
      mobile: '14px',
      line_height: '1.6',
      font_weight: '400',
    },
  },
} as const;
```

---

## 3. COMPONENT BREAKDOWN

### 3.1 Hero Component

**Location:** `src/components/sections/Hero.tsx`

**Purpose:** Main hero section with logo, tagline, and subtitle

**Props:**
```typescript
interface HeroProps {
  logoText?: string;
  tagline?: string;
  subtitle?: string;
  animated?: boolean;
}
```

**Implementation Details:**
- Centered layout with Flexbox
- Logo: "BAZARS" in Titillium Web Bold, 64px (responsive scaling)
- Tagline: 24px, navy color
- Subtitle: 16px, muted gray color
- Staggered entrance animation (0.3s delay between elements)
- Responsive padding: 80px desktop, 60px tablet, 40px mobile

**Key Features:**
- Fade-in animation on mount
- Staggered text appearance
- Mobile-optimized sizing and spacing
- Accessibility: semantic HTML with proper heading levels

**Styling Strategy:**
```typescript
// Hero container: 100vh on desktop, min-h-screen on mobile
// Logo: animated from opacity 0 to 1, duration: 0.6s
// Tagline: animated from opacity 0 to 1, duration: 0.6s, delay: 0.2s
// Subtitle: animated from opacity 0 to 1, duration: 0.6s, delay: 0.4s
```

---

### 3.2 WorldMap Component

**Location:** `src/components/sections/WorldMap.tsx`

**Purpose:** SVG-based interactive world map with animated cities and trade routes

**Props:**
```typescript
interface WorldMapProps {
  width?: number;
  height?: number;
  showParticles?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}
```

**City Coordinates:**
```typescript
// src/constants/coordinates.ts
export const CITY_DATA = [
  { name: 'Beijing', x: 780, y: 180, region: 'Asia' },
  { name: 'Shanghai', x: 800, y: 200, region: 'Asia' },
  { name: 'Ho Chi Minh', x: 820, y: 280, region: 'Asia' },
  { name: 'Istanbul', x: 550, y: 220, region: 'Europe' },
  { name: 'London', x: 480, y: 170, region: 'Europe' },
  { name: 'Berlin', x: 520, y: 160, region: 'Europe' },
  { name: 'Italy', x: 530, y: 210, region: 'Europe' },
  { name: 'UAE', x: 620, y: 260, region: 'Middle East' },
  { name: 'Saudi Arabia', x: 600, y: 270, region: 'Middle East' },
] as const;

// Trade routes: connecting pairs of cities
export const TRADE_ROUTES = [
  { from: 'Beijing', to: 'Shanghai' },
  { from: 'Shanghai', to: 'Ho Chi Minh' },
  { from: 'Beijing', to: 'Istanbul' },
  { from: 'Istanbul', to: 'London' },
  { from: 'Istanbul', to: 'Berlin' },
  { from: 'Berlin', to: 'London' },
  { from: 'Istanbul', to: 'UAE' },
  { from: 'UAE', to: 'Saudi Arabia' },
  { from: 'Ho Chi Minh', to: 'UAE' },
] as const;
```

**Animation Specifications:**

1. **Pulsing Dots:**
   - Duration: 2 seconds per cycle
   - Scale: 1 → 1.2 → 1
   - Easing: ease-in-out
   - Infinite loop
   - Stagger: 0.2s offset between cities
   - Color: Primary orange (#FF5722)

2. **Trade Route Lines:**
   - Duration: 3 seconds
   - Animation: stroke-dasharray to create "drawing" effect
   - Stagger: 0.5s between each line
   - Color: Blue (#5B6EF5) with 0.7 opacity
   - Stroke width: responsive (2px desktop, 1.5px mobile)

3. **Particle Effects:**
   - 3-5 particles per line
   - Each particle: 2-3px circle
   - Color: Gold (#FFC107) with fading opacity
   - Movement: follows the trade route line
   - Duration: 4 seconds per animation cycle
   - Delay before start: staggered with line animations

**Sub-components:**
- `PulsingDot.tsx`: Individual city dot with pulsing animation
- `TradeRouteLines.tsx`: SVG path with draw animation
- `ParticleEffect.tsx`: Particle system moving along lines

---

### 3.3 PulsingDot Component

**Location:** `src/components/animations/PulsingDot.tsx`

**Purpose:** Reusable animated dot component for city markers

**Props:**
```typescript
interface PulsingDotProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  pulseScale?: number;
  duration?: number;
  delay?: number;
  animated?: boolean;
}
```

**Implementation:**
```typescript
// Uses Framer Motion for smooth animations
// Motion values for: cx, cy (position), r (radius)
// Animate scale from 1 to 1.2 and back
// Initial opacity: 1, Hover opacity: 0.8
// Shadow effect for visual depth
```

**Variants:**
```typescript
const dotVariants = {
  default: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.3,
    opacity: 1,
    transition: { duration: 0.2 },
  },
};
```

---

### 3.4 TradeRouteLines Component

**Location:** `src/components/animations/TradeRouteLines.tsx`

**Purpose:** SVG lines connecting cities with draw animation

**Props:**
```typescript
interface TradeRouteLinesProps {
  routes: Route[];
  cities: CityData[];
  color?: string;
  strokeWidth?: number;
  duration?: number;
  staggerDelay?: number;
}
```

**SVG Implementation:**
```typescript
// Use <path> elements with stroke-dasharray
// Calculate dash array based on path length
// Animate dashoffset from full length to 0
// Use Framer Motion for coordinate-based animation

// Path calculation:
// - Get start (city A) and end (city B) coordinates
// - Create cubic Bezier curves for smooth routes
// - Avoid overlapping lines with slight curves
```

**Animation Sequence:**
```typescript
// 1. Calculate total path length using getTotalLength()
// 2. Set stroke-dasharray = pathLength
// 3. Animate stroke-dashoffset from pathLength to 0
// 4. Duration: 3 seconds
// 5. Easing: easeInOut
// 6. Stagger each line by 0.5s
```

---

### 3.5 ParticleEffect Component

**Location:** `src/components/animations/ParticleEffect.tsx`

**Purpose:** Animated particles moving along trade route lines

**Props:**
```typescript
interface ParticleEffectProps {
  pathD: string;              // SVG path data
  particleCount?: number;     // 3-5 particles
  color?: string;
  duration?: number;          // 4s per cycle
  size?: number;              // 2-3px
  delay?: number;
}
```

**Implementation Strategy:**
```typescript
// Use Framer Motion's layoutId for smooth animations
// Create SVG <circle> elements
// Animate along path using offset-path CSS property
// Alternative: use motion.div with custom transform
// Particles: staggered start times, varying speeds

// Calculation:
// - Parse SVG path data
// - Distribute particles evenly along path
// - Use getTotalLength() for accurate positioning
// - Calculate x,y coordinates at each 0-100% offset

// Animation properties:
// - offsetDistance: '0%' to '100%'
// - opacity: fade in at start, fade out at end
// - duration: 4 seconds
// - repeat: Infinity
// - ease: linear
```

---

### 3.6 TrustBar Component

**Location:** `src/components/sections/TrustBar.tsx`

**Purpose:** Trust/partnership section with scroll-triggered fade-in animation

**Props:**
```typescript
interface TrustBarProps {
  partners?: string[];
  leadingText?: string;
  animated?: boolean;
}
```

**Design Specifications:**
- Background: Cream (#F5F1E8)
- Height: 100px (desktop), 80px (tablet/mobile)
- Padding: 24px vertical, 40px horizontal
- Text alignment: center
- Font: Inter, 16px, navy color

**Animation Details:**
```typescript
// Scroll-triggered fade-in
// Trigger: element 80% visible in viewport
// Animation:
//   - Fade: opacity 0 → 1 (duration: 0.8s)
//   - Slide: translateY 20px → 0 (duration: 0.8s)
//   - Easing: ease-out
// Use Intersection Observer or Framer Motion scroll animations
```

**Responsive Behavior:**
- Desktop: Horizontal layout, full width partnership text
- Tablet: Same as desktop, reduced padding
- Mobile: Stacked layout if needed, adjusted font size

---

### 3.7 Footer Component

**Location:** `src/components/sections/Footer.tsx`

**Purpose:** Footer with 3-column layout and contact information

**Props:**
```typescript
interface FooterProps {
  contactInfo?: ContactSection[];
  copyrightYear?: number;
  companyName?: string;
}

interface ContactSection {
  title: string;
  email: string;
  description?: string;
  icon?: React.ReactNode;
}
```

**Layout Structure:**
```
┌─────────────────────────────────┐
│    Column 1    Column 2   Col 3 │
│  Partnership   Merchants  Carriers│
│  partnerships@ merchants@  carriers@
│  bazars.io     bazars.io   bazars.io│
│  [description] [desc]      [desc]   │
└─────────────────────────────────┘
│ © 2024 Bazars. All rights reserved │
└─────────────────────────────────┘
```

**Responsive Design:**
```
Desktop: 3 equal columns (1/3 width each)
Tablet:  2 columns → stacked
Mobile:  1 column (full width)
```

**Styling:**
- Background: navy (#1E0E2E) or white with gray border
- Text color: white on navy, navy on white
- Column gap: 40px (desktop), 24px (tablet), 0 (mobile)
- Email links: primary orange color on hover
- Footer height: 300px (desktop), 400px (tablet), 600px (mobile)

---

## 4. CUSTOM HOOKS

### 4.1 useScrollFadeIn Hook

**Location:** `src/hooks/useScrollFadeIn.ts`

**Purpose:** Scroll-triggered fade and slide animation using Intersection Observer

```typescript
interface UseScrollFadeInOptions {
  threshold?: number | number[];  // 0.8 (80% visible)
  triggerOnce?: boolean;          // true - animate only once
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;              // 20px default
  duration?: number;              // 0.8s default
}

function useScrollFadeIn(options?: UseScrollFadeInOptions) {
  const ref = useRef(null);
  const controls = useAnimation();
  
  // Return: { ref, controls }
  // Usage:
  // const { ref, controls } = useScrollFadeIn();
  // <motion.div ref={ref} animate={controls}>
}
```

**Implementation Details:**
- Uses Intersection Observer API for performance
- Triggers animation when 80% of element visible
- Can trigger once or on every visibility change
- Configurable delay, duration, easing
- Clean up on unmount

---

### 4.2 useAnimationFrames Hook

**Location:** `src/hooks/useAnimationFrames.ts`

**Purpose:** RAF-based animation loop for performance-critical animations

```typescript
interface AnimationFrameConfig {
  onFrame?: (deltaTime: number) => void;
  enabled?: boolean;
}

function useAnimationFrames(config: AnimationFrameConfig) {
  // Uses requestAnimationFrame for smooth 60fps animation
  // Provides deltaTime for frame-based calculations
  // Automatically cleans up on unmount
}
```

**Use Cases:**
- Particle animations
- Complex path animations
- Physics-based movements

---

### 4.3 useWindowSize Hook

**Location:** `src/hooks/useWindowSize.ts`

**Purpose:** Track window dimensions for responsive design

```typescript
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  // Returns current window dimensions
  // Updates on resize
  // Safely handles SSR (returns undefined initially)
}
```

---

## 5. ANIMATION IMPLEMENTATION STRATEGY

### 5.1 Framer Motion Setup

**In `src/app/layout.tsx`:**
```typescript
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
```

### 5.2 Global Animation CSS

**Location:** `src/styles/animations.css`

```css
/* SVG animations for browsers without JS */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drawLine {
  from {
    stroke-dashoffset: var(--path-length);
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* Particle animation - moving along path */
@keyframes moveAlongPath {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}
```

### 5.3 Animation Timing & Orchestration

**Sequence on Page Load:**
```
Timeline:
0ms    → Hero fade-in starts (0.6s)
200ms  → Tagline fade-in starts (0.6s)
400ms  → Subtitle fade-in starts (0.6s)
600ms  → WorldMap mounts (dots + lines start)
600ms  → Lines start drawing (staggered 0.5s each)
800ms  → Particles start moving
1200ms → TrustBar fades in (on scroll)
```

**WorldMap Animation Sequence:**
```
0ms    → City dots start pulsing (infinite)
500ms  → Line 1 starts drawing
1000ms → Line 2 starts drawing
1500ms → Line 3 starts drawing
...    → All particles start their cycles
```

---

## 6. RESPONSIVE DESIGN APPROACH

### 6.1 Breakpoints

```typescript
// src/constants/breakpoints.ts
export const BREAKPOINTS = {
  xs: 320,    // Mobile
  sm: 640,    // Small devices
  md: 768,    // Tablet
  lg: 1024,   // Laptop
  xl: 1280,   // Desktop
  '2xl': 1536, // Large desktop
} as const;
```

### 6.2 Responsive Component Strategy

**Using Tailwind CSS:**
```typescript
// Example: Hero component
<div className="
  flex flex-col items-center justify-center
  min-h-screen              // min-h-screen fallback
  md:min-h-screen           // Tablet
  px-4 sm:px-8 md:px-12     // Responsive padding
  py-8 sm:py-12 md:py-20    // Responsive padding
">
  <h1 className="
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    font-bold
    font-heading
    text-navy
  ">
    BAZARS
  </h1>
  <p className="
    text-base sm:text-lg md:text-xl lg:text-2xl
    mt-4 sm:mt-6 md:mt-8
    text-navy
    max-w-2xl
  ">
    The Infrastructure Layer for Cross-Border B2B Trade
  </p>
</div>
```

### 6.3 WorldMap Responsiveness

**Mobile Strategy:**
- Reduce SVG viewBox width/height scaling
- Simplify animation complexity: fewer particles, slower animations
- Adjust dot size and line width for clarity

**Implementation:**
```typescript
const isMobile = window.innerWidth < 768;
const mapWidth = isMobile ? 300 : 900;
const mapHeight = isMobile ? 400 : 600;
const dotRadius = isMobile ? 4 : 6;
const strokeWidth = isMobile ? 1.5 : 2;
const particleCount = isMobile ? 2 : 4;
```

### 6.4 Responsive Typography

```typescript
// Example responsive text sizing
<h1 className="
  text-3xl      // mobile: 30px
  sm:text-4xl   // 36px
  md:text-5xl   // 48px
  lg:text-6xl   // 64px
  leading-tight
">
  BAZARS
</h1>
```

---

## 7. TYPESCRIPT TYPE DEFINITIONS

**Location:** `src/types/index.ts`

```typescript
// Core types
export type Region = 'Asia' | 'Europe' | 'Middle East';

export interface CityData {
  name: string;
  x: number;
  y: number;
  region: Region;
}

export interface TradeRoute {
  from: string;
  to: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

export interface ContactSection {
  title: string;
  email: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ParticleProps {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

export interface ScrollFadeInOptions {
  threshold?: number | number[];
  triggerOnce?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}
```

---

## 8. IMPLEMENTATION PHASES

### Phase 1: Project Setup (2-3 days)

**Tasks:**
1. Initialize Next.js 14 project with App Router
   ```bash
   npx create-next-app@latest bazars-landing --typescript --tailwind --app
   ```

2. Install dependencies:
   ```bash
   npm install framer-motion shadcn-ui
   npm install -D tailwindcss postcss autoprefixer
   ```

3. Set up project structure (create all directories)

4. Configure TypeScript (`tsconfig.json`)
   - Strict mode enabled
   - Path aliases: `@/*` → `src/*`

5. Configure Tailwind (`tailwind.config.ts`)
   - Add custom colors from design system
   - Add font families (Titillium Web, Inter)
   - Configure breakpoints

6. Set up font imports
   - Import Titillium Web Bold from Google Fonts or download
   - Import Inter from Google Fonts

7. Create root layout and globals CSS

**Deliverables:**
- Initialized project with all dependencies
- Configured TypeScript and Tailwind
- Fonts properly configured
- Folder structure in place
- Basic layout component

---

### Phase 2: Design System & Constants (1-2 days)

**Tasks:**
1. Create color constants (`src/constants/colors.ts`)

2. Create typography constants (`src/constants/typography.ts`)

3. Create coordinates for cities (`src/constants/coordinates.ts`)

4. Create trade routes data (`src/constants/coordinates.ts`)

5. Create copywriting constants (`src/constants/copywriting.ts`)
   - Hero taglines
   - Footer contact info
   - TrustBar text

6. Create breakpoints constants (`src/constants/breakpoints.ts`)

7. Create animation timing constants (`src/constants/animations.ts`)

8. Set up type definitions (`src/types/index.ts`)

**Deliverables:**
- All constants files created and validated
- Type definitions complete
- Easy to modify design system values

---

### Phase 3: Utility Functions & Custom Hooks (2-3 days)

**Tasks:**
1. Create utility functions:
   - `classnames()` wrapper
   - SVG path calculation functions
   - Animation easing functions
   - Geometry utilities (distance, midpoint)

2. Implement custom hooks:
   - `useScrollFadeIn` with Intersection Observer
   - `useAnimationFrames` for RAF
   - `useWindowSize` for responsive tracking

3. Test all hooks independently

4. Create animation CSS (`src/styles/animations.css`)

**Deliverables:**
- Reusable utility functions
- Fully tested custom hooks
- Global animation definitions

---

### Phase 4: Basic Component Structure (3-4 days)

**Tasks:**
1. Create Hero component (`src/components/sections/Hero.tsx`)
   - Static layout first (no animations)
   - Responsive design
   - Proper TypeScript types

2. Create WorldMap component shell (`src/components/sections/WorldMap.tsx`)
   - SVG structure set up
   - City dots rendered (no animation)
   - Trade routes rendered (no animation)

3. Create TrustBar component (`src/components/sections/TrustBar.tsx`)
   - Static layout
   - Responsive design

4. Create Footer component (`src/components/sections/Footer.tsx`)
   - 3-column layout
   - Responsive to 1-column on mobile
   - Contact info properly formatted

5. Create page layout (`src/app/page.tsx`)
   - Assemble all sections
   - Verify layout

**Deliverables:**
- All main sections rendered
- Responsive layouts verified
- TypeScript strict mode passing
- Visual hierarchy correct

---

### Phase 5: Animations Implementation (4-5 days)

**Tasks:**
1. Implement Hero animations
   - Fade-in on mount
   - Staggered text appearance
   - Test on multiple screen sizes

2. Implement PulsingDot component (`src/components/animations/PulsingDot.tsx`)
   - Framer Motion variants
   - Scale/opacity pulsing (2s cycle)
   - Hover states

3. Implement TradeRouteLines component
   - SVG path drawing animation (3s)
   - Stroke-dasharray technique
   - Stagger animation (0.5s between lines)

4. Implement ParticleEffect component
   - Particle system along paths
   - Offset-path animation
   - Fade in/out behavior

5. Integrate animations into WorldMap
   - Combine dots, lines, particles
   - Test timing and orchestration
   - Verify performance

6. Implement TrustBar scroll animation
   - Intersection Observer trigger
   - Fade + slide animation
   - Test on different viewport heights

**Deliverables:**
- All animations working smoothly
- Performance verified (60fps)
- Animations respect prefers-reduced-motion
- Cross-browser tested

---

### Phase 6: Polish & Optimization (2-3 days)

**Tasks:**
1. Performance optimization
   - Lazy load components below fold
   - Optimize SVG rendering
   - Use `will-change` sparingly
   - Profile animation performance

2. Accessibility improvements
   - Add semantic HTML
   - ARIA labels for icons
   - Keyboard navigation
   - Color contrast verification

3. Cross-browser testing
   - Chrome, Firefox, Safari
   - Mobile browsers
   - Test on different viewport sizes

4. Animation refinement
   - Adjust timing curves
   - Fine-tune stagger delays
   - Test on slow devices

5. SEO optimization
   - Meta tags
   - Open Graph tags
   - Structured data

6. Visual QA
   - Compare to design
   - Check spacing and alignment
   - Verify responsive behavior

**Deliverables:**
- Performance metrics improved
- 100% Lighthouse score target
- Accessibility audit passed
- Cross-browser compatible
- Production-ready code

---

### Phase 7: Testing & Deployment (1-2 days)

**Tasks:**
1. Unit tests for utilities and hooks
   - Test coordinate calculations
   - Test hook behavior
   - Test animation timing

2. Component tests
   - Responsive behavior
   - Animation presence
   - User interactions

3. End-to-end tests (optional)
   - Full page load
   - Scroll animations trigger
   - Mobile responsiveness

4. Pre-deployment checks
   - Remove console logs
   - Check environment variables
   - Verify build size

5. Deploy to production
   - Set up hosting (Vercel recommended)
   - Configure domain
   - Enable analytics

**Deliverables:**
- Test suite created
- Deployment ready
- Live website

---

## 9. DETAILED COMPONENT SPECIFICATIONS

### 9.1 Hero Component - Detailed Code Structure

**Pseudo Code:**
```typescript
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY } from '@/constants';

interface HeroProps {
  logoText?: string;
  tagline?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function Hero({ 
  logoText = 'BAZARS',
  tagline = 'The Infrastructure Layer for Cross-Border B2B Trade',
  subtitle = 'Connecting merchants worldwide' 
}: HeroProps) {
  return (
    <motion.section
      className="flex items-center justify-center min-h-screen px-4 md:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center max-w-4xl">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-4 md:mb-6"
          style={{ fontFamily: TYPOGRAPHY.fonts.heading }}
          variants={itemVariants}
        >
          {logoText}
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-navy mb-3 md:mb-4"
          variants={itemVariants}
        >
          {tagline}
        </motion.p>
        
        <motion.p
          className="text-sm sm:text-base text-gray-500"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.section>
  );
}
```

---

### 9.2 WorldMap Component - SVG Structure

**Key Implementation Points:**
```typescript
// src/components/sections/WorldMap.tsx

// 1. SVG ViewBox calculation
// Use viewBox="0 0 1000 600" for consistent scaling
// Scale based on container width

// 2. City rendering
// Create <g> group for each city containing:
// - <circle> for pulsing dot
// - <text> for city label (optional)

// 3. Trade routes
// Create <path> for each trade route
// Use cubic Bezier curves to avoid overlaps

// 4. Particle container
// Create <g> for particles
// Contains multiple <circle> elements

// SVG structure:
<svg viewBox="0 0 1000 600" className="w-full h-auto">
  {/* Background or map image */}
  
  {/* Trade route lines layer */}
  <g id="trade-routes">
    {/* path elements for each route */}
  </g>
  
  {/* Particle effects layer */}
  <g id="particles">
    {/* motion.circle elements */}
  </g>
  
  {/* Cities layer */}
  <g id="cities">
    {/* PulsingDot components for each city */}
  </g>
</svg>
```

---

### 9.3 Particle Animation - Mathematical Approach

**Path Animation Calculation:**
```typescript
// Convert SVG path to animatable points
function parsePathForParticles(pathData: string): Point[] {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  
  const length = path.getTotalLength();
  const points = [];
  
  // Sample points along path
  for (let i = 0; i <= length; i += length / 50) {
    const point = path.getPointAtLength(i);
    points.push({ x: point.x, y: point.y });
  }
  
  return points;
}

// Animate particle along path
// Use offset-distance CSS property or motion values
// For browser compatibility: use motion.div with custom transforms

// Particle timeline (per particle):
// 0%   → Start position, opacity 0
// 10%  → opacity 1
// 50%  → Middle of path
// 90%  → opacity 1
// 100% → End position, opacity 0
```

---

## 10. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All components built and tested
- [ ] TypeScript compilation successful (no errors)
- [ ] Tailwind CSS builds correctly
- [ ] All animations working at 60fps
- [ ] Responsive design verified on multiple devices
- [ ] Accessibility audit passed
- [ ] Performance optimized (Lighthouse score > 90)
- [ ] SEO tags configured
- [ ] Environment variables configured
- [ ] Build size acceptable

### Deployment
- [ ] Deploy to Vercel (or chosen platform)
- [ ] Configure custom domain
- [ ] Set up SSL/HTTPS
- [ ] Configure analytics
- [ ] Test production build
- [ ] Monitor error tracking

### Post-Deployment
- [ ] Verify all sections load correctly
- [ ] Test animations on production
- [ ] Verify responsiveness
- [ ] Check Core Web Vitals
- [ ] Monitor user experience metrics

---

## 11. PERFORMANCE CONSIDERATIONS

### 11.1 SVG Optimization
```typescript
// Use viewBox instead of fixed dimensions
// Minimize path data (round coordinates)
// Use stroke instead of fill where possible
// Lazy load SVG components if below fold

// Example optimized path:
// Before: M 123.456 456.789 L 234.567 567.890
// After:  M 123 457 L 235 568
```

### 11.2 Animation Performance
```typescript
// Use transform and opacity for animations (GPU accelerated)
// Avoid animating width/height
// Use will-change: transform; sparingly
// Profile with DevTools Performance tab

// Example performant animation:
const variants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

// Avoid:
// height, width, left, right, top, bottom, padding, margin
```

### 11.3 Bundle Size Management
```typescript
// Tree-shake unused shadcn components
// Code-split below-fold sections
// Optimize images (use WebP with fallbacks)
// Monitor bundle size with next/bundle-analyzer

// Expected sizes:
// - Main bundle: < 100KB
// - CSS: < 30KB
// - Fonts: < 100KB
```

---

## 12. TESTING STRATEGY

### 12.1 Component Testing
```typescript
// Example test with React Testing Library
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

test('Hero renders with correct text', () => {
  render(<Hero />);
  expect(screen.getByText('BAZARS')).toBeInTheDocument();
});

test('Hero is accessible', () => {
  render(<Hero />);
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent('BAZARS');
});
```

### 12.2 Animation Testing
```typescript
// Test animation presence (not actual animation)
import { render } from '@testing-library/react';
import { PulsingDot } from '@/components/animations/PulsingDot';

test('PulsingDot renders with motion.circle', () => {
  const { container } = render(<PulsingDot x={100} y={100} />);
  const circle = container.querySelector('circle');
  expect(circle).toBeInTheDocument();
});
```

### 12.3 Responsive Design Testing
```typescript
// Test breakpoints with different viewport sizes
import { render } from '@testing-library/react';

test('Hero adjusts font size on mobile', () => {
  global.innerWidth = 320;
  const { container } = render(<Hero />);
  const heading = container.querySelector('h1');
  
  // Check computed style
  const style = window.getComputedStyle(heading);
  expect(style.fontSize).toBe('30px'); // 0.75rem → 12px
});
```

---

## 13. MAINTENANCE & FUTURE ENHANCEMENTS

### 13.1 Maintenance Tasks
```typescript
// Monthly:
// - Update Next.js and dependencies
// - Monitor performance metrics
// - Check accessibility compliance
// - Review and update copywriting

// Quarterly:
// - Update design system if needed
// - Optimize animations based on user feedback
// - Improve SEO rankings
// - Test on new devices/browsers
```

### 13.2 Potential Future Features
- Add interactive elements (clickable cities for info)
- Add statistics/metrics section
- Implement comparison tables
- Add customer testimonials carousel
- Implement contact form
- Add blog section
- Implement dark mode
- Add multi-language support

---

## 14. REFERENCES & RESOURCES

### Documentation
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools & Libraries
- SVG Optimization: [SVGO](https://github.com/svg/svgo)
- Performance Testing: [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- Accessibility: [WAVE](https://wave.webaim.org/)
- Design Preview: [Figma](https://figma.com/)

### Learning Resources
- [Animation Principles](https://www.framer.com/motion/animation/)
- [Web Performance](https://web.dev/performance/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Accessibility Basics](https://www.a11yproject.com/)

---

## 15. QUICK START SCRIPT

```bash
#!/bin/bash
# Initialize project with all configurations

# 1. Create Next.js app
npx create-next-app@latest bazars-landing \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --no-git

cd bazars-landing

# 2. Install dependencies
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer @types/node

# 3. Create directory structure
mkdir -p src/components/sections
mkdir -p src/components/animations
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/constants
mkdir -p src/utils
mkdir -p src/styles

# 4. Create initial files
touch src/constants/colors.ts
touch src/constants/coordinates.ts
touch src/constants/typography.ts
touch src/constants/animations.ts
touch src/constants/breakpoints.ts
touch src/types/index.ts
touch src/hooks/useScrollFadeIn.ts
touch src/hooks/useAnimationFrames.ts
touch src/hooks/useWindowSize.ts

# 5. Initialize git
git init
git add .
git commit -m "Initial Next.js setup for Bazars landing page"

echo "Project initialized! Start development with: npm run dev"
```

---

## 16. ESTIMATED TIMELINE & EFFORT

| Phase | Duration | Effort | Status |
|-------|----------|--------|--------|
| 1. Setup | 2-3 days | Low | Not started |
| 2. Design System | 1-2 days | Low | Not started |
| 3. Utilities & Hooks | 2-3 days | Medium | Not started |
| 4. Component Structure | 3-4 days | Medium | Not started |
| 5. Animations | 4-5 days | High | Not started |
| 6. Polish & Optimization | 2-3 days | Medium | Not started |
| 7. Testing & Deploy | 1-2 days | Low | Not started |
| **Total** | **15-22 days** | **2-3 weeks** | **Ready to start** |

---

## 17. SUCCESS METRICS

Define success for the landing page:

```typescript
// Performance Metrics
- Lighthouse Score: > 90 (All categories)
- Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

// User Experience Metrics
- Time to interactive: < 3s
- Animation frame rate: 60fps (no jank)
- Mobile responsiveness: 100% coverage
- Accessibility score: 100

// Business Metrics
- Page load time: < 2 seconds
- Bounce rate tracking enabled
- Conversion tracking implemented
- User engagement analytics enabled
```

---

**Document Version:** 1.0
**Last Updated:** November 10, 2024
**Status:** Ready for Implementation

