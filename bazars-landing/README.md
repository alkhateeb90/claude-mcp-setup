# Bazars.io Landing Page

A minimal, modern landing page for bazars.io - **The Infrastructure Layer for Cross-Border B2B Trade**.

## 🚀 Live Development

```bash
cd bazars-landing
npm run dev
```

Visit **http://localhost:3000** to view the site.

## 📦 Production Build

```bash
npm run build
npm run start
```

## ✨ Features

### Hero Section
- **BAZARS** logo with gradient text effect (Titillium Web Bold, 64px)
- Tagline: "The Infrastructure Layer for Cross-Border B2B Trade"
- Subtitle with muted styling
- Animated decorative background elements

### Animated World Map
- **9 trade route cities**:
  - Asia: Beijing, Shanghai, Ho Chi Minh
  - Europe: Istanbul, London, Berlin, Italy
  - Middle East: UAE, Saudi Arabia

- **Pulsing city dots**: 2-second animation cycle with scale and opacity effects
- **Trade route lines**: Drawing animation (3s duration, 0.5s stagger between routes)
- **Particle effects**: 3-5 circles per route moving along trade paths
- Fully responsive SVG (scales from mobile to desktop)

### Trust Bar
- Cream background (#F5F1E8)
- Partnership text: "In partnership discussions with: CBBC | DP World | SGS | UK Trade Authorities"
- Fade-in animation on scroll

### Footer
- **3-column layout** (responsive, stacks on mobile):
  - For Manufacturers: suppliers@bazars.io
  - For Governments: partnerships@bazars.io
  - For Investors: investors@bazars.io
- Dark navy background (#1E0E2E)
- Hover effects on contact cards
- Copyright: © 2025 Bazars.io

## 🎨 Design System

### Colors
```css
Primary:      #FF5722 (Orange)
Navy:         #1E0E2E (Dark Navy/Purple)
Cream:        #F5F1E8 (Light Background)
Accent Green: #00C853
Accent Blue:  #5B6EF5
Accent Gold:  #FFC107
```

### Typography
- **Headings/Logo**: Titillium Web (Bold, 700 weight)
- **Body Text**: Inter (Regular, Medium, Semibold)

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Animations**: Framer Motion 12.x
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
bazars-landing/
├── app/
│   ├── globals.css          # Global styles with Tailwind imports
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page composing all sections
├── components/
│   ├── Hero.tsx              # Hero section with logo and tagline
│   ├── WorldMap.tsx          # Animated world map with trade routes
│   ├── TrustBar.tsx          # Partnership trust bar
│   └── Footer.tsx            # 3-column footer with contacts
├── lib/
│   └── utils.ts              # Utility functions (cn helper)
├── tailwind.config.ts        # Custom Tailwind theme
├── postcss.config.mjs        # PostCSS with Tailwind v4
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Animations

| Element | Duration | Delay | Behavior |
|---------|----------|-------|----------|
| Hero fade-in | 0.6s | 0s, 0.2s, 0.4s | Staggered entrance |
| Pulsing dots | 2s | 0.2s stagger | Infinite loop |
| Trade lines | 3s | 0.5s stagger | Draw once |
| Particles | 4s | 0.8s stagger | Infinite loop |
| TrustBar | 0.8s | On scroll | Fade-in once |

## 📱 Responsive Design

- **Mobile**: Vertical stacking, 100% width map, single-column footer
- **Tablet**: Adjusted spacing, 2-column footer
- **Desktop**: Full layout, 3-column footer, max-width 1200px

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 Documentation

Comprehensive planning documentation is available in the parent directory:
- `BAZARS_QUICK_REFERENCE.md` - Quick facts and reference
- `BAZARS_ARCHITECTURE.md` - Technical architecture
- `BAZARS_LANDING_PAGE_IMPLEMENTATION_PLAN.md` - Full implementation guide
- `IMPLEMENTATION_PLAN_README.md` - Documentation overview

## 🚢 Deployment

Ready for deployment to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers
- Any Node.js hosting platform

Simply run `npm run build` and deploy the `.next` output directory.

## 📊 Performance Targets

- Lighthouse Score: 95+
- Animation Frame Rate: 60fps
- Bundle Size: < 200KB (initial)
- Accessibility: WCAG 2.1 AA compliant

---

**Built with ❤️ for bazars.io**
