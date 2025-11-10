# Bazars.io Landing Page - Quick Reference Guide

## Overview

A comprehensive landing page for bazars.io featuring animated world map, hero section, trust bar, and footer. Built with Next.js 14+, Tailwind CSS, Framer Motion, and TypeScript.

---

## Key Metrics at a Glance

| Aspect | Details |
|--------|---------|
| **Tech Stack** | Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui |
| **Total Implementation Time** | 15-22 days (2-3 weeks) |
| **Number of Components** | 7 main + 3 animation sub-components |
| **Lines of Code (Est.)** | 3,000-4,000 LOC |
| **Performance Target** | 100 Lighthouse score, 60fps animations |
| **Accessibility** | WCAG 2.1 AA compliance |

---

## Component Hierarchy

```
App (page.tsx)
├── Hero
│   ├── Logo (BAZARS)
│   ├── Tagline
│   └── Subtitle
├── WorldMap
│   ├── SVG Container
│   ├── TradeRouteLines
│   │   └── Path elements
│   ├── ParticleEffects
│   │   └── Animated circles
│   └── PulsingDots
│       └── City markers (9 total)
├── TrustBar
│   └── Partnership text
└── Footer
    ├── Column 1: Partnerships
    ├── Column 2: Merchants
    ├── Column 3: Carriers
    └── Copyright
```

---

## Color Reference

```
Primary:     #FF5722 (Orange)
Navy:        #1E0E2E (Dark Blue)
Cream:       #F5F1E8 (Light Background)
Accents:     
  - Green:   #00C853
  - Blue:    #5B6EF5
  - Gold:    #FFC107
```

---

## Animation Timings

| Element | Duration | Delay | Repeat |
|---------|----------|-------|--------|
| Hero fade-in | 0.6s | 0s | Once |
| Tagline fade-in | 0.6s | 0.2s | Once |
| Subtitle fade-in | 0.6s | 0.4s | Once |
| Pulsing dots | 2s | 0.2s stagger | Infinite |
| Trade lines draw | 3s | 0.5s stagger | Once |
| Particles move | 4s | 0.8s stagger | Infinite |
| TrustBar fade-in | 0.8s | On scroll | Once |

---

## City Coordinates

| City | X | Y | Region |
|------|---|---|--------|
| Beijing | 780 | 180 | Asia |
| Shanghai | 800 | 200 | Asia |
| Ho Chi Minh | 820 | 280 | Asia |
| Istanbul | 550 | 220 | Europe |
| London | 480 | 170 | Europe |
| Berlin | 520 | 160 | Europe |
| Italy | 530 | 210 | Europe |
| UAE | 620 | 260 | Middle East |
| Saudi Arabia | 600 | 270 | Middle East |

---

## Trade Routes (9 connections)

1. Beijing → Shanghai
2. Shanghai → Ho Chi Minh
3. Beijing → Istanbul
4. Istanbul → London
5. Istanbul → Berlin
6. Berlin → London
7. Istanbul → UAE
8. UAE → Saudi Arabia
9. Ho Chi Minh → UAE

---

## Implementation Roadmap

### Phase 1: Setup (2-3 days)
- Create Next.js 14 project
- Install dependencies
- Set up folder structure
- Configure TypeScript & Tailwind

### Phase 2: Design System (1-2 days)
- Define colors, typography, breakpoints
- Create constants files
- Set up type definitions

### Phase 3: Utilities & Hooks (2-3 days)
- Build custom hooks (scroll, animation, responsive)
- Create utility functions
- Add animation CSS

### Phase 4: Components (3-4 days)
- Build Hero (static first)
- Build WorldMap shell
- Build TrustBar (static)
- Build Footer (static)

### Phase 5: Animations (4-5 days)
- Add Hero animations
- Implement PulsingDot
- Implement TradeRouteLines
- Implement ParticleEffect
- Orchestrate timing

### Phase 6: Polish (2-3 days)
- Performance optimization
- Accessibility improvements
- Cross-browser testing
- Visual refinement

### Phase 7: Deploy (1-2 days)
- Testing suite
- Pre-deployment checks
- Production deployment

---

## Critical File Checklist

```
src/
├── app/
│   ├── layout.tsx              [Priority 1] Root layout
│   ├── page.tsx                [Priority 1] Main page
│   └── globals.css             [Priority 1] Global styles
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            [Priority 1]
│   │   ├── WorldMap.tsx        [Priority 2]
│   │   ├── TrustBar.tsx        [Priority 2]
│   │   └── Footer.tsx          [Priority 2]
│   └── animations/
│       ├── PulsingDot.tsx      [Priority 2]
│       ├── TradeRouteLines.tsx [Priority 3]
│       └── ParticleEffect.tsx  [Priority 3]
├── hooks/
│   ├── useScrollFadeIn.ts      [Priority 2]
│   ├── useAnimationFrames.ts   [Priority 3]
│   └── useWindowSize.ts        [Priority 2]
├── constants/
│   ├── colors.ts               [Priority 1]
│   ├── coordinates.ts          [Priority 1]
│   ├── typography.ts           [Priority 1]
│   └── animations.ts           [Priority 1]
└── types/
    └── index.ts                [Priority 1]

tailwind.config.ts             [Priority 1]
tsconfig.json                  [Priority 1]
```

---

## Development Commands

```bash
# Installation
npm install next@latest react react-dom
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer typescript

# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run lint            # Run linter
npm run type-check      # TypeScript check

# Testing
npm test                # Run tests
npm run test:coverage   # Coverage report

# Performance
npm run analyze         # Bundle analysis
npm run lighthouse      # Lighthouse audit
```

---

## Key Constants Template

```typescript
// colors.ts
export const COLORS = {
  primary: '#FF5722',
  navy: '#1E0E2E',
  cream: '#F5F1E8',
  // ... more colors
};

// coordinates.ts
export const CITY_DATA = [
  { name: 'Beijing', x: 780, y: 180, region: 'Asia' },
  // ... more cities
];

export const TRADE_ROUTES = [
  { from: 'Beijing', to: 'Shanghai' },
  // ... more routes
];

// typography.ts
export const TYPOGRAPHY = {
  fonts: {
    heading: '"Titillium Web", sans-serif',
    body: '"Inter", sans-serif',
  },
  sizes: {
    hero_title: { desktop: '64px', tablet: '48px', mobile: '36px' },
    // ... more sizes
  },
};
```

---

## Responsive Breakpoints

```
Mobile:  < 640px  (text-3xl, 1 column)
Tablet:  640-1024px  (text-4xl-5xl, 2-3 columns)
Desktop: > 1024px  (text-6xl, full layout)
```

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | 95+ | TBD |
| First Contentful Paint (FCP) | < 1.8s | TBD |
| Largest Contentful Paint (LCP) | < 2.5s | TBD |
| Cumulative Layout Shift (CLS) | < 0.1 | TBD |
| Animation Frame Rate | 60fps | TBD |
| Bundle Size | < 200KB | TBD |
| Time to Interactive (TTI) | < 3s | TBD |

---

## Accessibility Checklist

- [ ] Semantic HTML used throughout
- [ ] ARIA labels on interactive elements
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Skip to main content link
- [ ] Alt text on images
- [ ] Animations respect prefers-reduced-motion
- [ ] Form labels properly associated
- [ ] Page structure (h1-h6) logical

---

## Testing Checklist

### Unit Tests
- [ ] Color constants validation
- [ ] Coordinate calculations
- [ ] Hook behavior
- [ ] Animation timing

### Integration Tests
- [ ] Hero + animations load correctly
- [ ] WorldMap renders cities and routes
- [ ] TrustBar scroll animation triggers
- [ ] Footer responsive layout works

### E2E Tests
- [ ] Full page loads without errors
- [ ] All animations trigger
- [ ] Responsive design on 3+ viewports
- [ ] No console errors

### Manual QA
- [ ] Visual alignment matches design
- [ ] Animations are smooth
- [ ] No animation jank
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility

---

## Deployment Checklist

### Pre-Deploy
- [ ] All tests passing
- [ ] TypeScript strict mode clean
- [ ] Console logs removed
- [ ] Environment variables set
- [ ] Build successful
- [ ] Performance acceptable

### Deploy
- [ ] Push to main branch
- [ ] Deploy to Vercel (or chosen host)
- [ ] Configure domain
- [ ] Enable SSL
- [ ] Set up analytics
- [ ] Configure monitoring

### Post-Deploy
- [ ] Verify all sections load
- [ ] Test animations in production
- [ ] Check performance metrics
- [ ] Monitor error tracking
- [ ] Gather user feedback

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Animations jank on mobile | Reduce particle count, use fewer simultaneous animations |
| SVG not scaling | Use viewBox, ensure container width is responsive |
| TypeScript errors | Enable strict mode, use proper types for all props |
| Performance issues | Profile with DevTools, lazy load components, optimize SVG |
| Responsive breakage | Test on multiple viewport sizes, use Tailwind breakpoints |
| Animation timing off | Use React DevTools Profiler, adjust delay values |
| Font loading issues | Use font-face with fallbacks, preload fonts |
| SEO concerns | Add meta tags, structured data, Open Graph tags |

---

## Quick Commands Reference

```bash
# Create component
touch src/components/sections/Hero.tsx

# Create hook
touch src/hooks/useScrollFadeIn.ts

# Run build
npm run build

# Check types
npx tsc --noEmit

# Format code
npm run format

# Deploy
git push origin main

# View performance
npm run analyze
```

---

## Resources & Documentation

| Resource | URL |
|----------|-----|
| Next.js Docs | https://nextjs.org/docs |
| Framer Motion | https://www.framer.com/motion/ |
| Tailwind CSS | https://tailwindcss.com/ |
| shadcn/ui | https://ui.shadcn.com/ |
| TypeScript | https://www.typescriptlang.org/ |
| Web.dev | https://web.dev/ |
| A11y Project | https://www.a11yproject.com/ |

---

## Support & Questions

When implementing, refer to:
1. This quick reference for fast lookups
2. BAZARS_LANDING_PAGE_IMPLEMENTATION_PLAN.md for detailed specs
3. Component JSDoc comments for API reference
4. TypeScript types in `src/types/index.ts`
5. Constants in `src/constants/` directory

---

**Version:** 1.0
**Last Updated:** November 10, 2024
**Status:** Ready for Development
