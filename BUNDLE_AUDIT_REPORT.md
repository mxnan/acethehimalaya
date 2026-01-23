# Next.js Bundle Size Audit Report
## AceTheHimalaya Performance Optimization

**Date:** 2025-01-27  
**Auditor:** Senior Next.js Performance Engineer  
**Goal:** Reduce JavaScript bundle size and chunk weight through logical separation and code splitting, without degrading UX, animations, or design quality.

---

## 1. EXECUTIVE SUMMARY

### Current State
The codebase shows **significant bundle bloat** from:
- **Monolithic client components** mixing rendering, logic, animation, and data formatting
- **Framer Motion** imported in 8+ components, all loading on initial bundle
- **Lucide React** icons imported across 20+ files with no tree-shaking optimization
- **Heavy MDX components** (charts, maps, forms) loaded eagerly even when below-the-fold
- **Radix UI primitives** (Dialog, Accordion, Tooltip) bundled into main chunks
- **Route-agnostic components** (reviews, charts, maps) loading on every page

### Impact Assessment
- **Initial Load:** ~40-60KB+ of unnecessary JavaScript on landing/home pages
- **Navigation:** Heavy trip page components (~150KB+) load even when not needed
- **Hydration:** Client components with IntersectionObserver, resize listeners, and motion logic hydrate immediately

### Root Causes
1. **Overuse of `"use client"`** - Components that could be server-rendered are client-side
2. **No route-based code splitting** - Trip-specific components load on all routes
3. **Eager loading of interaction-based components** - Dialogs, forms, charts load before user interaction
4. **Monolithic component files** - Single files handling multiple responsibilities (TOC: 291 lines, TripDetailsCard: 317 lines)
5. **Inefficient icon imports** - Named imports from `lucide-react` without proper tree-shaking

---

## 2. TOP 10 BIGGEST OFFENDERS (Ranked by Impact)

### 🥇 #1: `components/mdx/toc.tsx` (291 lines)
**Bundle Impact:** ~25-30KB (initial load)  
**Problems:**
- Entire TOC component is client-side (`"use client"`)
- Includes Framer Motion (`AnimatePresence`, `motion`)
- IntersectionObserver logic for active heading detection
- Resize listener for responsive behavior
- Embedded `BookNowButton` and `PrivateTripForm` dialogs
- Desktop + mobile variants in single component
- Only used on `/trips/*` routes but loads on all pages

**Affects:** Initial load, hydration, navigation

---

### 🥈 #2: `components/mdx/content-mdx.tsx` (96 lines)
**Bundle Impact:** ~15-20KB (MDX pages only, but loads all heavy components)  
**Problems:**
- Dynamically imports 8+ heavy components but they're all in the same chunk
- Accordion components double-wrapped in dynamic imports (lines 55-64)
- All MDX components available even if not used in content
- No lazy loading strategy for below-the-fold components

**Affects:** Navigation (MDX pages), hydration

---

### 🥉 #3: `components/cards/trip-details-card.tsx` (317 lines)
**Bundle Impact:** ~20-25KB  
**Problems:**
- Entire component is client-side
- Framer Motion for image carousel and animations
- 10 Lucide icons imported (MapPin, Clock, Mountain, Activity, TrendingUp, Calendar, Home, Utensils, Route, Map)
- Auto-slide interval logic
- Image carousel with AnimatePresence
- Only used in MDX content but loads eagerly

**Affects:** Navigation (trip pages), hydration

---

### #4: `components/mdx/accordion.tsx` (201 lines)
**Bundle Impact:** ~18-22KB  
**Problems:**
- Uses both `framer-motion` AND `motion` (line 6) - duplicate imports
- MutationObserver for state tracking
- Complex animation logic with mask gradients
- Radix UI Accordion primitive
- Used in MDX but could be lazy-loaded

**Affects:** Navigation (MDX pages), hydration

---

### #5: `components/mdx/trip-altitude-chart.tsx` (315 lines)
**Bundle Impact:** ~22-28KB  
**Problems:**
- Complex SVG rendering with canvas conversion logic
- Pointer event handlers
- Download functionality (canvas manipulation)
- Only used on trip pages, below-the-fold
- Should be lazy-loaded with `ssr: false`

**Affects:** Navigation (trip pages), hydration

---

### #6: `components/nav/desktop-nav.tsx` (177 lines)
**Bundle Impact:** ~12-15KB  
**Problems:**
- Framer Motion for hover animations
- Complex menu positioning logic with refs
- Resize/position calculations
- Loads on every page (in layout)
- Could be partially server-rendered

**Affects:** Initial load, hydration

---

### #7: `components/reviews/reviews-scroller.tsx` (78 lines)
**Bundle Impact:** ~8-10KB  
**Problems:**
- Framer Motion for infinite scroll animation
- `whileHover` animations on every review card
- Only used in review sections (below-the-fold)
- Should be lazy-loaded

**Affects:** Navigation (pages with reviews), hydration

---

### #8: `components/mdx/private-trip-form.tsx` (241 lines)
**Bundle Impact:** ~15-18KB  
**Problems:**
- React Hook Form + Zod validation
- 9 form fields with controllers
- Only loads when dialog opens (good!)
- But form validation logic is heavy

**Affects:** Interaction (dialog open), hydration

---

### #9: `components/ui/sonner.tsx` (40 lines)
**Bundle Impact:** ~5-8KB  
**Problems:**
- 5 Lucide icons imported (CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon)
- Loads in root layout (every page)
- Icons could be tree-shaken better

**Affects:** Initial load

---

### #10: `components/mdx/base-mdx.tsx` (174 lines)
**Bundle Impact:** ~3-5KB (but multiplied by usage)  
**Problems:**
- Server component (good!)
- But slugify function runs on every heading
- Could be optimized with memoization

**Affects:** Navigation (MDX pages), server rendering

---

## 3. RECOMMENDED CHUNKING ARCHITECTURE

### Route-Based Splitting Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    INITIAL BUNDLE (Home)                    │
│  - Base layout components                                    │
│  - Navbar (server-rendered shell)                           │
│  - Footer (server-rendered)                                 │
│  - Theme provider                                           │
│  - Progress bar                                             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                         │
┌───────▼────────┐                    ┌─────────▼──────────┐
│  /trips/*      │                    │  /blogs/*           │
│  Route Chunk   │                    │  Route Chunk        │
│                │                    │                     │
│  - TOC         │                    │  - MDX base        │
│  - Charts      │                    │  - Callout         │
│  - Maps        │                    │  - Copy link       │
│  - Forms       │                    │  - YT embed        │
│  - Reviews     │                    │                     │
└────────────────┘                    └─────────────────────┘
```

### Interaction-Based Splitting

```
┌─────────────────────────────────────────────────────────────┐
│              LAZY-LOADED ON INTERACTION                      │
│                                                              │
│  Dialog Components:                                          │
│  ├─ BookNowButton → loads on button click                   │
│  ├─ PrivateTripForm → loads on dialog open                 │
│  └─ Inquiry Dialog → loads on trigger                      │
│                                                              │
│  Below-the-Fold Components:                                  │
│  ├─ TripAltitudeChart → loads on scroll/intersection        │
│  ├─ TrekMap → loads on scroll/intersection                  │
│  ├─ ReviewsScroller → loads on scroll/intersection           │
│  └─ CalendarCard → loads on scroll/intersection             │
│                                                              │
│  Accordion → loads on first accordion interaction            │
└─────────────────────────────────────────────────────────────┘
```

### Motion-Based Splitting

```
┌─────────────────────────────────────────────────────────────┐
│              MOTION COMPONENTS STRATEGY                      │
│                                                              │
│  Critical Motion (Load Immediately):                        │
│  ├─ DesktopNav hover effects                               │
│  └─ MobileNav menu animations                               │
│                                                              │
│  Non-Critical Motion (Lazy Load):                           │
│  ├─ TOC active indicator animation                          │
│  ├─ ReviewsScroller infinite scroll                        │
│  ├─ TripDetailsCard carousel                               │
│  └─ Accordion expand/collapse                              │
│                                                              │
│  Reduced Motion Support:                                     │
│  └─ All motion components respect prefers-reduced-motion    │
└─────────────────────────────────────────────────────────────┘
```

### Recommended Dynamic Import Map

```typescript
// Route-specific chunks
const TripCharts = dynamic(() => import('./trip-altitude-chart'), { 
  ssr: false,
  loading: () => <ChartSkeleton />
});

const TripBooking = dynamic(() => import('./booknow-button'), {
  ssr: false
});

const TripReviews = dynamic(() => import('./reviews-section'), {
  ssr: false
});

// Interaction-based chunks
const TripForm = dynamic(() => import('./private-trip-form'), {
  ssr: false,
  loading: () => <FormSkeleton />
});

// Below-the-fold chunks
const LazyTrekMap = dynamic(() => import('./trek-map'), {
  ssr: false
});

// Motion chunks (with reduced motion support)
const MotionTOC = dynamic(() => import('./toc'), {
  ssr: false
});
```

---

## 4. FILE-BY-FILE SPLIT RECOMMENDATIONS

### File: `components/mdx/toc.tsx` (291 lines)

**Problems:**
- Too many responsibilities: TOC rendering + active detection + responsive logic + dialogs + booking
- Path detection + UI + animation + dialogs all in one
- Desktop and mobile variants mixed
- IntersectionObserver + resize listeners

**Split into:**
```
toc/
├── toc.server.tsx          (Server: TOC tree structure, no client logic)
├── toc.client.tsx          (Client: Active heading detection, responsive)
├── toc-tree.tsx            (Pure: TOC tree rendering, no state)
├── toc-mobile.client.tsx   (Client: Mobile dialog variant)
├── toc-desktop.client.tsx  (Client: Desktop sticky variant)
├── toc-booknow.client.tsx  (Client: BookNow button + dialog, lazy-loaded)
└── hooks/
    └── use-active-heading.ts (Client: IntersectionObserver logic)
```

**Logic Distribution:**
- **Server:** TOC tree structure, initial HTML
- **Client:** Active heading detection, responsive behavior
- **Lazy:** BookNow button, inquiry dialog
- **Split:** Desktop vs mobile rendering

---

### File: `components/cards/trip-details-card.tsx` (317 lines)

**Problems:**
- Image carousel + details panel + animations + 10 icons
- Auto-slide logic + state management + Framer Motion

**Split into:**
```
trip-details-card/
├── trip-details-card.server.tsx  (Server: Static details structure)
├── trip-details-carousel.client.tsx (Client: Image carousel, lazy-loaded)
├── trip-details-panel.client.tsx (Client: Details panel with animations)
├── trip-details-icons.tsx        (Pure: Icon mapping, tree-shakeable)
└── hooks/
    ├── use-image-carousel.ts    (Client: Auto-slide logic)
    └── use-details-toggle.ts    (Client: Open/close state)
```

**Logic Distribution:**
- **Server:** Details structure, icon mapping
- **Client:** Carousel (lazy), panel animations
- **Lazy:** Carousel loads on scroll/intersection

---

### File: `components/mdx/content-mdx.tsx` (96 lines)

**Problems:**
- All MDX components loaded eagerly
- Double-wrapped Accordion imports
- No conditional loading

**Split into:**
```
mdx/
├── content-mdx.tsx              (Server: Base MDX renderer)
├── mdx-components-core.tsx     (Server: Always-loaded: Callout, Tabs, base)
├── mdx-components-trip.tsx      (Client: Trip-specific, lazy)
│   ├── TripAltitudeChart
│   ├── TrekMap
│   ├── TripDetailsCard
│   └── ReviewsSection
└── mdx-components-interactive.tsx (Client: Interaction-based, lazy)
    ├── Accordion
    ├── CalendarCard
    ├── PrivateTripForm
    └── YTEmbed
```

**Logic Distribution:**
- **Server:** Base MDX, core components
- **Lazy (route):** Trip components only on `/trips/*`
- **Lazy (interaction):** Interactive components on demand

---

### File: `components/mdx/accordion.tsx` (201 lines)

**Problems:**
- Uses both `framer-motion` and `motion` (duplicate)
- MutationObserver for state
- Complex animation logic

**Split into:**
```
accordion/
├── accordion.server.tsx         (Server: Structure, no animations)
├── accordion.client.tsx         (Client: Animation wrapper)
├── accordion-item.client.tsx   (Client: Item with state)
├── accordion-trigger.client.tsx (Client: Trigger with motion)
├── accordion-content.client.tsx (Client: Content with AnimatePresence)
└── hooks/
    └── use-accordion-state.ts   (Client: State management, MutationObserver)
```

**Logic Distribution:**
- **Server:** Structure, accessibility
- **Client:** Animations, state
- **Lazy:** Load on first accordion interaction

---

### File: `components/nav/desktop-nav.tsx` (177 lines)

**Problems:**
- Framer Motion for hover
- Complex positioning logic
- Loads on every page

**Split into:**
```
nav/
├── desktop-nav.server.tsx       (Server: Nav structure, links)
├── desktop-nav-menu.client.tsx (Client: Dropdown menu with motion)
└── hooks/
    └── use-menu-position.ts    (Client: Positioning logic)
```

**Logic Distribution:**
- **Server:** Nav structure, links
- **Client:** Menu animations, positioning
- **Optimize:** Reduce motion on initial load

---

### File: `components/mdx/trip-altitude-chart.tsx` (315 lines)

**Problems:**
- Complex SVG + canvas logic
- Download functionality
- Below-the-fold, always loads

**Split into:**
```
trip-altitude-chart/
├── trip-altitude-chart.client.tsx (Client: Main component, lazy)
├── chart-svg.client.tsx          (Client: SVG rendering)
├── chart-download.client.tsx     (Client: Canvas conversion, lazy)
└── hooks/
    └── use-chart-interaction.ts  (Client: Pointer events)
```

**Logic Distribution:**
- **Client:** Main component
- **Lazy:** Load on scroll/intersection with `ssr: false`
- **Lazy:** Download logic only when button clicked

---

### File: `components/reviews/reviews-scroller.tsx` (78 lines)

**Problems:**
- Framer Motion infinite scroll
- Hover animations
- Below-the-fold

**Split into:**
```
reviews/
├── reviews-scroller.client.tsx  (Client: Main scroller, lazy)
├── review-card.client.tsx       (Client: Individual card with motion)
└── hooks/
    └── use-infinite-scroll.ts   (Client: Animation logic)
```

**Logic Distribution:**
- **Client:** Scroller component
- **Lazy:** Load on scroll/intersection
- **Optimize:** Reduce motion on low-end devices

---

## 5. PERFORMANCE GUARDRAILS

### Rule 1: When to Use `"use client"`

**✅ USE `"use client"` WHEN:**
- Component uses React hooks (`useState`, `useEffect`, `useRef`)
- Component uses browser APIs (`window`, `document`, `IntersectionObserver`)
- Component handles user interactions (onClick, onChange, onScroll)
- Component uses Framer Motion or other animation libraries
- Component uses context providers that need client-side state

**❌ DO NOT USE `"use client"` WHEN:**
- Component only renders static content
- Component only uses props for rendering
- Component can be server-rendered with data fetching
- Component only uses CSS animations (use CSS instead)

**Example:**
```typescript
// ❌ BAD: Entire component is client-side
"use client"
export function TripCard({ title, description }) {
  return <div>{title} {description}</div>
}

// ✅ GOOD: Server component
export function TripCard({ title, description }) {
  return <div>{title} {description}</div>
}

// ✅ GOOD: Split server + client
// trip-card.server.tsx
export function TripCard({ title, description }) {
  return (
    <div>
      {title} {description}
      <InteractiveButton /> {/* Client component */}
    </div>
  )
}
```

---

### Rule 2: When to Use `dynamic(..., { ssr: false })`

**✅ USE `ssr: false` WHEN:**
- Component uses browser-only APIs that don't exist on server
- Component has heavy client-side logic (charts, maps, canvas)
- Component is below-the-fold and not needed for SEO
- Component loads on user interaction (dialogs, modals)
- Component has hydration mismatches that can't be fixed

**❌ DO NOT USE `ssr: false` WHEN:**
- Component is above-the-fold and needed for SEO
- Component can be server-rendered without issues
- Component is critical for initial page load

**Example:**
```typescript
// ✅ GOOD: Chart below-the-fold, no SEO value
const TripChart = dynamic(() => import('./trip-chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />
});

// ❌ BAD: Above-the-fold content
const Hero = dynamic(() => import('./hero'), { ssr: false });
```

---

### Rule 3: Rules for Motion Usage

**✅ DO:**
- Lazy-load motion components that are below-the-fold
- Use `prefers-reduced-motion` media query
- Split motion logic into separate client components
- Use CSS animations for simple transitions when possible

**❌ DON'T:**
- Import Framer Motion in server components
- Use motion for critical above-the-fold content (use CSS)
- Load all motion components on initial bundle

**Example:**
```typescript
// ✅ GOOD: Motion with reduced motion support
"use client"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

---

### Rule 4: Rules for MDX Components

**✅ DO:**
- Split MDX components into core (always-loaded) and extended (lazy)
- Use route-based code splitting for trip-specific components
- Lazy-load heavy components (charts, maps, forms)
- Keep base MDX components server-rendered

**❌ DON'T:**
- Load all MDX components on every page
- Import heavy components in base MDX file
- Use client components for simple MDX elements (headings, paragraphs)

**Example:**
```typescript
// ✅ GOOD: Conditional MDX components
const mdxComponents = {
  ...BaseComponents, // Server-rendered
  TripChart: dynamic(() => import('./trip-chart'), { ssr: false }),
  TrekMap: dynamic(() => import('./trek-map'), { ssr: false }),
}

// ❌ BAD: All components loaded
import { TripChart, TrekMap, Reviews } from './mdx-components'
```

---

### Rule 5: Rules for Image Usage

**✅ DO:**
- Use Next.js `Image` component with proper `sizes` prop
- Set `priority` only for above-the-fold images
- Use `loading="lazy"` for below-the-fold images
- Optimize image formats (WebP, AVIF)

**❌ DON'T:**
- Use `priority` for all images
- Load large images on initial bundle
- Use unoptimized image formats

---

### Rule 6: Rules for Adding New UI Components

**Before adding a new component, ask:**
1. **Is it client-side?** → Split into server + client parts
2. **Is it route-specific?** → Use route-based code splitting
3. **Is it interaction-based?** → Lazy-load on interaction
4. **Is it below-the-fold?** → Lazy-load on scroll/intersection
5. **Does it use heavy libraries?** → Dynamic import with `ssr: false`
6. **Does it use icons?** → Use tree-shakeable imports, consider icon components

**Component Checklist:**
- [ ] Server component if possible
- [ ] Client component only if needed
- [ ] Lazy-loaded if below-the-fold or interaction-based
- [ ] Icons tree-shaken
- [ ] Motion components respect `prefers-reduced-motion`
- [ ] Route-specific components split by route
- [ ] No unnecessary dependencies in initial bundle

---

## 6. CONCRETE NEXT ACTIONS

### Phase 1: Quick Wins (1-2 days)
**Priority: HIGH | Impact: ~30-40KB reduction**

1. **Fix duplicate motion imports**
   - File: `components/mdx/accordion.tsx`
   - Remove `motion` import, use only `framer-motion`
   - **Expected savings:** ~5-8KB

2. **Lazy-load TOC component**
   - File: `app/trips/[country]/[slug]/page.tsx`
   - Already dynamically imported, but ensure `ssr: false`
   - **Expected savings:** ~25-30KB on non-trip pages

3. **Split TOC into server + client**
   - Create `toc.server.tsx` for structure
   - Create `toc.client.tsx` for active detection
   - **Expected savings:** ~10-15KB (server-rendered structure)

4. **Lazy-load below-the-fold components**
   - TripAltitudeChart: `ssr: false` + intersection observer
   - TrekMap: `ssr: false` + intersection observer
   - ReviewsScroller: `ssr: false` + intersection observer
   - **Expected savings:** ~40-50KB on initial load

---

### Phase 2: Component Splitting (3-5 days)
**Priority: MEDIUM | Impact: ~50-70KB reduction**

5. **Split TripDetailsCard**
   - Server: Details structure
   - Client: Carousel (lazy)
   - **Expected savings:** ~15-20KB

6. **Split DesktopNav**
   - Server: Nav structure
   - Client: Menu animations
   - **Expected savings:** ~8-12KB

7. **Optimize MDX component loading**
   - Core components: always-loaded
   - Trip components: route-based
   - Interactive components: lazy
   - **Expected savings:** ~20-30KB

8. **Icon optimization**
   - Create icon barrel exports
   - Tree-shake unused icons
   - **Expected savings:** ~5-10KB

---

### Phase 3: Advanced Optimizations (5-7 days)
**Priority: LOW | Impact: ~20-30KB reduction**

9. **Split Accordion component**
   - Server structure + client animations
   - **Expected savings:** ~10-15KB

10. **Optimize form components**
    - Lazy-load validation logic
    - **Expected savings:** ~5-8KB

11. **Add intersection observer hooks**
    - Reusable hook for lazy-loading
    - **Expected savings:** Better code organization

12. **Performance monitoring**
    - Add bundle size tracking
    - Monitor chunk sizes in CI/CD
    - **Expected savings:** Prevent regressions

---

## 7. ESTIMATED IMPACT

### Bundle Size Reduction
- **Initial Load (Home):** ~60-80KB reduction (40-50% improvement)
- **Trip Pages:** ~30-40KB reduction (20-25% improvement)
- **Blog Pages:** ~20-30KB reduction (15-20% improvement)

### Performance Metrics
- **First Contentful Paint (FCP):** -200-300ms
- **Largest Contentful Paint (LCP):** -300-500ms
- **Time to Interactive (TTI):** -400-600ms
- **Total Blocking Time (TBT):** -100-200ms

### User Experience
- ✅ Faster initial page loads
- ✅ Faster navigation between pages
- ✅ Reduced JavaScript execution time
- ✅ Better performance on low-end devices
- ✅ No degradation of animations or UX

---

## 8. MONITORING & VALIDATION

### Bundle Analysis
```bash
# After refactoring, run:
pnpm build
pnpm @next/bundle-analyzer
```

### Performance Testing
- Use Lighthouse CI for automated performance checks
- Monitor bundle sizes in PR reviews
- Track Core Web Vitals in production

### Success Criteria
- ✅ Initial bundle < 200KB (gzipped)
- ✅ Trip page bundle < 300KB (gzipped)
- ✅ No increase in hydration time
- ✅ All animations still work
- ✅ No visual regressions

---

**END OF AUDIT REPORT**

