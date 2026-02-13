## Ace The Himalaya – Next.js App (v1)

Ace The Himalaya is a content‑driven marketing site for a Himalayan trekking company.  
It showcases treks, blogs, company information, and reviews using static content (MDX) generated via Velite and rendered with the Next.js App Router.

---

## Tech Stack

- **Framework**: Next.js `16.x` (App Router, React Server Components)
- **Language**: TypeScript `5.x`
- **UI**:
  - React `19.x`, React DOM `19.x`
  - Tailwind CSS `4.x`
  - shadcn‑style UI built on Radix primitives
  - Lucide icons, Framer Motion / Motion for animations
- **Content**:
  - [Velite](https://github.com/zce/velite) static content pipeline
  - MDX content for trips, blogs, company pages, extra country/activity pages
- **Forms & Validation**:
  - `react-hook-form`
  - `zod` + `@hookform/resolvers`
- **Misc**:
  - `date-fns` for date formatting
  - `maplibre-gl` for maps
  - `sonner` for toasts

---

## Project Structure (Current v1)

Top‑level layout:

- **`app/`** – Next.js App Router: layouts, pages, and entry points
- **`components/`** – Reusable UI elements and domain‑specific sections
- **`content/`** – Source MDX content (Velite input)
- **`.velite/`** – Velite generated output (`#site/content` etc., not edited manually)
- **`lib/`** – Utilities, content helpers, configuration, and hooks
- **`types/`** – Shared TypeScript types
- **`velite.config.ts`** – Velite content schemas and collections
- **`package.json`** – Scripts and dependencies
- **`README.md`** – Project documentation (this file)

### `app/` (Routes & Layouts)

- **Root layout**
  - `app/layout.tsx` – Global HTML shell, `<body>`, navbar, footer, theme and other providers.
  - `app/providers.tsx` – Client‑side providers (e.g. theme, toasts).
  - `app/globals.css` – Global Tailwind + base styles.
  - `app/sitemap.ts` – Generates sitemap from trips and blogs.

- **Home**
  - `app/page.tsx` – Home page, composed of landing sections (hero, best sellers, countries, categories, trekking regions, FAQs, associations, “trip of the month”, etc.).

- **Trips**
  - `app/trips/layout.tsx` – Trips section layout.
  - `app/trips/page.tsx` – Trips listing page (grouped by country).
  - `app/trips/[country]/page.tsx` – Country/region overview pages (extra content).
  - `app/trips/[country]/[slug]/page.tsx` – Individual trip detail pages (MDX).

- **Company**
  - `app/company/layout.tsx` – Company section layout.
  - `app/company/page.tsx` – Company overview / intro.
  - `app/company/[slug]/page.tsx` – Company sub‑pages (MDX).

- **Blogs**
  - `app/blogs/layout.tsx` – Blog section layout.
  - `app/blogs/page.tsx` – Blog listing with category filtering via `searchParams`.
  - `app/blogs/[...slug]/page.tsx` – Blog detail pages (MDX, nested slug).

- **Demo**
  - `app/demo/page.tsx` – Internal UI demo playground (theme toggle, sample sections, etc.); not user‑facing.

> **Note**: There are **no** `app/api/` routes in v1. All data is currently static via Velite.

---

## Route Map (Current v1)

This table describes the **current** App Router structure and behavior.

| Path | Type | Component Kind | Layout Chain | Data Source | SEO / Metadata |
| ---- | ---- | -------------- | ------------ | ----------- | -------------- |
| `/` | Static | **Server page** | `app/layout.tsx` | Direct imports of landing sections; those sections read from static configs and generated content where needed | `export const metadata` with title/description; OG/Twitter options present (some commented) |
| `/trips` | Static | **Server page** | `app/layout.tsx` → `app/trips/layout.tsx` | `trips` imported from `#site/content` (Velite) | `metadata` defined in trips layout/page |
| `/trips/[country]` | Dynamic (static params) | **Server page** | `app/layout.tsx` → `app/trips/layout.tsx` | `extraPages` imported from `#site/content`; matching by `country` slug | `generateMetadata` using matching extra page; OG/Twitter tags set |
| `/trips/[country]/[slug]` | Dynamic (static params) | **Server page** | `app/layout.tsx` → `app/trips/layout.tsx` | `trips` imported from `#site/content`; MDX content rendered via MDX components | `generateMetadata` builds SEO (title, description, OG image, Twitter) per trip; `export const revalidate` set (e.g. daily) |
| `/company` | Static | **Server page** | `app/layout.tsx` → `app/company/layout.tsx` | Static definition of company tiles + embeds (YouTube, stats, etc.) | `metadata` defined for company overview |
| `/company/[slug]` | Dynamic (static params) | **Server page** | `app/layout.tsx` → `app/company/layout.tsx` | `company` content imported from `#site/content` (MDX) | `generateMetadata` based on company MDX fields |
| `/blogs` | Dynamic (via query) | **Server page** | `app/layout.tsx` → `app/blogs/layout.tsx` | `blogs` imported from `#site/content`; filtered via `searchParams.category` | `metadata` defined for blog listing |
| `/blogs/[...slug]` | Dynamic (static params) | **Server page** | `app/layout.tsx` → `app/blogs/layout.tsx` | `blogs` imported from `#site/content`; MDX rendered per slug array | `generateMetadata` builds full SEO (OG/Twitter) per blog post |
| `/demo` | Static | **Client page** (`"use client"`) | `app/layout.tsx` | Pure UI demo; no external data | No explicit metadata (non‑production route) |

---

## Component System Overview

High‑level breakdown of the main component areas:

- **`components/nav/`**
  - **Purpose**: Global navigation across desktop and mobile.
  - Contents: `navbar`, desktop and mobile navigation menus, search / trek shortcuts, category sidebars (e.g. for blog categories).
  - Integration: Root layout dynamically imports navbar for better performance.

- **`components/footer/`**
  - **Purpose**: Site footer with contact, links, and map.
  - Contents: `footer` shell plus sub‑sections (`footer-1`, `footer-2`, `footer-3`, `footer-bottom`).
  - Maps: A MapLibre map is embedded via `FooterMap` (which uses `components/ui/map`).

- **`components/landing/`**
  - **Purpose**: Home page hero and marketing sections.
  - Examples:
    - `hero-video-section` – Hero hero with video/background + search CTA.
    - `bestsellers-section` – Best‑selling trips (carousel).
    - `country-section` – Tiles for key trekking countries.
    - `category-section` – Tiles for trek categories.
    - `trekregionnepal-section` – Scrollable trekking regions in Nepal.
    - `faq-section` – Long FAQ with collapsible accordions and imagery.
    - `association-section` – Association logos and trust badges.
    - `tripofmonth-section` – Highlighted trip with details.

- **`components/cards/`**
  - **Purpose**: Reusable cards for trips and blogs.
  - `trip-card` – Card UI for a single trip (uses a `Trip`-like shape).
  - `blog-card` – Card UI for a single blog post (uses a `Blog`-like shape).
  - `trip-details-card` – More detailed view used in some sections.

- **`components/mdx/`**
  - **Purpose**: MDX rendering helpers for trips, blogs, and company pages.
  - Includes:
    - `content-mdx` / route‑specific MDX content components.
    - Lazy‑loaded helpers like `trek-map-lazy`, `trip-altitude-chart-lazy`.
    - `toc` (Table of Contents) rendered via dynamic import to avoid blocking main content.
    - Forms, callouts, and other MDX‑only UI elements.

- **`components/reviews/`**
  - **Purpose**: Social proof via reviews and external ratings.
  - `reviews-scroller` – Infinite / marquee‑style review scroller.
  - Source data currently imported from static review arrays (see `types/review` for shape).

- **`components/shared/`**
  - Shared UX helpers such as search bars and “Talk to an Expert” CTAs.

- **`components/ui/`**
  - shadcn‑style primitives built on Radix:
    - Inputs, labels, tabs, tooltips, accordions, separators, etc.
  - Lucide‑based icon components, some animated using Framer Motion / Motion.
  - Map wrapper (`map.tsx`) for MapLibre, with markers and interactions.

---

## Feature Modules & Content Model

- **Trips / Treks**
  - Content source:
    - `content/trips/**` – Trek MDX files organized by country/region.
    - `content/extra/**` – Country or regional overview content.
  - Consumption:
    - Velite processes MDX → `.velite/**` → imported as `#site/content`.
    - Trip listing, trip detail routes, and landing sections pull from these collections.

- **Blogs**
  - Content source: `content/blogs/**` (MDX).
  - Page behavior:
    - Listing page reads all blogs and filters via `searchParams.category`.
    - Detail page resolves `[...slug]` and renders MDX content plus TOC and share options.

- **Company**
  - Content source: `content/company/**` (MDX) and static configuration inside `app/company/page.tsx`.
  - Company sub‑pages use dynamic routing `/company/[slug]`.

- **Reviews**
  - Content source: hard‑coded `Review[]` arrays.
  - Displayed in home / dedicated review sections.

- **Navigation**
  - Built from static definitions (core nav items) + some dynamic lists (e.g. categories, blogs/trips surfaced through nav or search).

---

## Type System Structure (Current v1)

- **`types/review.ts`**
  - Defines the `Review` type used across review sections.
  - Fields include text, author, avatar, rating, and source platform.

- **Velite content types**
  - Defined in `velite.config.ts`, which describes schemas for:
    - Trips
    - Blogs
    - Company pages
    - Extra pages (e.g. country/region intros)
  - Velite generates types in `.velite/**` and re‑exports via `#site/content`.

- **Inline UI types**
  - Cards such as `trip-card` and `blog-card` define their own `Trip`/`Blog` props inline.
  - Some section components define local types (e.g. for tiles/cards).

- **Helpers / utils**
  - `lib/search-index.ts` defines a `SearchItem` type for combined trip+blog search, but currently accepts `any[]` for inputs.
  - `lib/trekking-regions.ts` and `lib/categories.ts` define typed configuration objects (`TrekkingRegionConfig`, `CategoryConfig`, etc.).

> **v1 Note**: The type system is already structured and safe for most UI usage. There are some `any` pockets (e.g. search index, low‑level DOM integrations) that can be hardened in a future v2 refactor.

---

## Data Flow (Textual Overview)

At a high level, the data flow is:

1. **Authoring**
   - Content editors add or update MDX files under:
     - `content/trips/**`
     - `content/blogs/**`
     - `content/company/**`
     - `content/extra/**`

2. **Build (Velite)**
   - Velite (via `pnpm velite` or `velite:dev`) parses MDX files using `velite.config.ts`.
   - It outputs generated types and content modules into `.velite/**`, then provides type‑safe imports via `#site/content`.

3. **Next.js App**
   - App Router pages (e.g. `/trips`, `/blogs`, `/trips/[country]/[slug]`) import from `#site/content`.
   - Pages are **React Server Components** by default and stitch together:
     - Layouts
     - Section components (from `components/**`)
     - MDX content wrappers (from `components/mdx/**`)

4. **Client‑side Interactions**
   - Interactive components (navbar, review scroller, map, hero search, accordions, etc.) are client components.
   - Some are dynamically imported to reduce the initial server and client bundle size.

5. **Delivery**
   - Next.js builds static HTML/JSON where possible (using `generateStaticParams` and content collections) and serves it via the Next runtime.
   - SEO metadata (`metadata` / `generateMetadata`) is derived from MDX frontmatter and static metadata objects.

---

## Code Splitting & Performance (Current v1)

Current optimizations already in use:

- **Dynamic imports**
  - Navbar is dynamically imported in the root layout.
  - Table of Contents (TOC) is dynamically imported in MDX pages.
  - Trek map and altitude chart are loaded via `trek-map-lazy` and `trip-altitude-chart-lazy`.
  - Reviews scroller is lazy‑loaded.
  - Footer map is loaded via a dynamic import.

- **Server vs Client components**
  - Page files and most layouts are **server components**.
  - Only genuinely interactive pieces (nav, hero search, accordions, map, review scroller, demo page) use `"use client"`.

- **Static generation**
  - Trips, blogs, company pages, and extra pages use static generation via Velite content and `generateStaticParams`/`generateMetadata`, enabling fast responses and good SEO.

> **Future v2 focus** (not yet implemented in v1): further fragmentation of large components (e.g. `map.tsx`, `faq-section`) and tighter server/client boundaries for heavy landing sections.

---

## Development & Build

These commands reflect the **current** setup from `package.json`:

- **Local development (recommended)**  
  - **Terminal 1** – Velite content in watch mode:
    - `pnpm velite:dev`
  - **Terminal 2** – Next.js dev server:
    - `pnpm dev`

- **Local development (manual content rebuilds)**  
  - Build content once:
    - `pnpm velite`
  - Start dev server:
    - `pnpm dev`

- **Production build**
  - (Optional) clean previous builds:
    - `pnpm clean`
  - Build latest docs from MDX:
    - `pnpm velite`
  - Build the Next.js app:
    - `pnpm build`
  - Start production server:
    - `pnpm start`

- **Preview (one‑shot)**
  - `pnpm preview` – Runs `build` then `start` for a production‑like preview.

---

## How to Add a New Trek (v1 Workflow)

1. **Add MDX content**
   - Create a new MDX file under `content/trips/<country>/<slug>.mdx` following existing examples:
     - Include frontmatter fields used by `velite.config.ts` (title, slug, country, duration, difficulty, highlights, SEO fields, etc.).
     - Write the body content with headings that work well with the Table of Contents.

2. **(Optional) Extra country page**
   - If the country or region does not yet have an overview page, add an MDX file under `content/extra/<country>.mdx` for `/trips/[country]`.

3. **Regenerate content**
   - Run:
     - `pnpm velite`
     - or keep `pnpm velite:dev` running during development.

4. **Verify in the app**
   - Start dev server: `pnpm dev`.
   - Visit:
     - `/trips` – Confirm trek appears in listing.
     - `/trips/<country>/<slug>` – Confirm detail page renders correctly.
   - Check SEO:
     - Ensure frontmatter fields (title, description, images) are correct so `generateMetadata` outputs proper OG/Twitter tags.

---

## How to Add a New Blog Post (v1 Workflow)

1. **Add MDX content**
   - Create `content/blogs/<category>/<slug>.mdx` (or similar pattern used in the repo).
   - Include frontmatter:
     - `title`, `slug`, `category`, `description`, `publishedAt`, `author`, `image`, `seo` fields as used in `velite.config.ts`.

2. **Regenerate content**
   - Run:
     - `pnpm velite`
     - or keep `pnpm velite:dev` running.

3. **Verify**
   - Start dev server: `pnpm dev`.
   - Visit:
     - `/blogs` – Confirm the post appears in the listing (and is filterable by `?category=<category>`).
     - `/blogs/<slug>` (or nested path matching the file structure) – Confirm the detail page renders.

4. **SEO**
   - Confirm OG/Twitter fields from the frontmatter look correct; they flow into `generateMetadata`.

---

## Deployment

The app is designed for typical Next.js deployment targets (e.g. Vercel or a custom Node environment).

- **CI/CD recommendations**
  - On your integration / staging branch (e.g. `dev`):
    - `pnpm velite`
    - `pnpm build`
    - Run basic smoke tests (lint/typecheck as needed).
  - Deploy artifacts (`.next` output) or rely on platform builds.

- **Example Git workflow (from existing README)**
  - On dev branch:
    - `pnpm velite`
    - `pnpm build`
    - Test locally with `pnpm start`
    - `git add .`
    - `git commit -m "feat: add new content"`
    - `git push origin dev`
  - Promote to main/production:
    - `git checkout main`
    - `git merge dev`
    - `git push origin main` (e.g. Vercel auto‑deploys using your Velite/Next build step)

---

## Environment Variables

- **Current v1 state**
  - The core site (trips, blogs, company pages, reviews) is static and powered by Velite + MDX.
  - No critical runtime environment variables are required for rendering these routes.
  - If any external integrations (e.g. analytics, booking APIs, or secret keys) are present, they should be configured via standard Next.js environment variables (`.env.local`) and accessed using `process.env.*`.

- **Recommended conventions (when needed)**
  - Public variables: `NEXT_PUBLIC_*` (safe to expose to the browser).
  - Server‑only variables: use non‑`NEXT_PUBLIC` names and read them in server components or Route Handlers only.

---

## Future Scaling Plan (Toward v2)

This section outlines **future** improvements and does **not** reflect v1 behavior yet:

- **Architecture & Structure**
  - Move toward a stricter feature‑based structure (e.g. `features/treks`, `features/blog`, `features/reviews`) without changing routes.
  - Extract shared tiles and cards from large landing sections.

- **Type System**
  - Centralize all domain types under `lib/types/` and fully align with Velite generated types.
  - Remove `any` usages in helpers such as `lib/search-index.ts`.

- **Performance & Code Splitting**
  - Further split very large components such as `components/ui/map.tsx` and `components/landing/faq-section.tsx`.
  - Introduce additional dynamic imports and Suspense boundaries for heavy, below‑the‑fold sections on the home page.

- **Tooling & Documentation**
  - Add more in‑code JSDoc comments for complex helpers and dynamic components.
  - Keep this README updated alongside structural changes to stay as the single source of truth.

---

**Version:** v1 – Current production‑ready structure and behavior (before deeper architectural refactors).