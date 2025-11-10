# 🏗️ Tenchi Flux Studios — Architecture

## Overview

Tenchi Flux Studios is a production-grade Next.js 15 application built with the App Router, TypeScript, and Tailwind CSS. The architecture prioritizes performance, accessibility, SEO, and developer experience.

---

## Core Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with SSR, SSG, and routing |
| **Language** | TypeScript 5.6 | Type safety and developer experience |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS framework |
| **Components** | shadcn/ui (Radix UI) | Accessible, unstyled component primitives |
| **Content** | MDX + next-mdx-remote | Markdown with React components |
| **Email** | Resend | Transactional email API |
| **Validation** | Zod | Schema validation for forms and APIs |
| **Analytics** | Plausible | Privacy-first, cookieless analytics |
| **Testing** | Playwright + Vitest | E2E and unit testing |
| **CI/CD** | GitHub Actions + Vercel | Automated testing and deployment |
| **Logging** | Pino | Structured logging |

---

## Architecture Principles

### 1. **Performance First**
- Static generation (SSG) for all pages except dynamic content
- Image optimization with `next/image` and blur placeholders
- Font optimization with `next/font` and `display: swap`
- Minimal client-side JavaScript (prefer Server Components)
- Bundle optimization via tree-shaking and code splitting

### 2. **Accessibility (a11y)**
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus-visible styles
- Reduced motion support via CSS

### 3. **SEO & Metadata**
- Next.js Metadata API for all routes
- JSON-LD structured data (Organization, Website, Video)
- Dynamic sitemap and robots.txt
- Open Graph images (generated via `@vercel/og`)
- Canonical URLs and proper heading hierarchy

### 4. **Type Safety**
- End-to-end TypeScript (no `any` types in production code)
- Zod schemas for runtime validation
- Strict mode enabled
- Path aliases for clean imports

### 5. **Developer Experience**
- Hot module replacement (HMR) in dev
- Linting (ESLint) and formatting (Prettier)
- Pre-commit hooks (optional, can add Husky)
- Component-driven development
- Comprehensive test coverage

---

## Data Flow

### 1. **Static Content (MDX Work Entries)**

```
content/work/*.mdx → lib/mdx.ts (parse) → app/work/[slug]/page.tsx (render) → Static HTML
```

**Process:**
1. MDX files stored in `content/work/` with frontmatter metadata
2. `lib/mdx.ts` uses `gray-matter` to parse frontmatter and content
3. Next.js generates static pages at build time via `generateStaticParams()`
4. `next-mdx-remote` renders MDX on server
5. Result: Fully static pages with zero client JS for content

**Benefits:**
- SEO: Pre-rendered HTML
- Performance: No runtime parsing
- DX: Write content in Markdown with embedded React components

---

### 2. **Contact Form Submission**

```
User fills form → Client validation (Zod) → POST /api/contact → Server validation (Zod) → Resend API → Email sent → Response to client
```

**Process:**
1. User fills out `ContactForm` component (client)
2. Client-side validation with Zod schema
3. POST request to `/api/contact/route.ts`
4. Server-side validation (re-validate with Zod)
5. `lib/mailer.ts` calls Resend API
6. Success/error response returned to client
7. Client displays feedback message

**Benefits:**
- Security: Double validation (client + server)
- UX: Instant feedback on errors
- Reliability: Structured logging with Pino

---

### 3. **Analytics Tracking**

```
Page load → Plausible script → Automatic pageview tracking → (Optional) Custom events via lib/analytics.ts
```

**Process:**
1. Plausible script injected in `app/layout.tsx` via `next/script`
2. Automatic pageview tracking (no cookies)
3. Optional custom events via `trackEvent()` function
4. All tracking happens client-side, no server load

**Benefits:**
- Privacy: No cookies, no personal data
- Performance: Lightweight script (< 1KB)
- Compliance: GDPR-friendly

---

### 4. **Image Pipeline**

```
Image source → SmartImage component → next/image → Optimization → Blur placeholder → Delivered to client
```

**Process:**
1. Images stored in `public/` or remote URLs
2. `SmartImage` wrapper component adds blur placeholder
3. Next.js Image component optimizes (WebP/AVIF)
4. Lazy loading + responsive srcset generated
5. Blur data URL shown while loading

**Benefits:**
- Performance: Automatic optimization
- UX: No layout shift (CLS)
- DX: Simple component API

---

## Folder Structure Explained

### `/app` — Next.js App Router

```
app/
├── layout.tsx              # Root layout: fonts, analytics, nav, footer
├── page.tsx                # Home: Hero + 9 sections
├── globals.css             # Tailwind + CSS variables
├── sitemap.ts              # Dynamic sitemap generator
├── robots.ts               # Robots.txt generator
├── opengraph-image.tsx     # Default OG image (dynamic)
├── api/
│   └── contact/route.ts    # Contact form API (POST)
├── work/
│   ├── page.tsx            # Work index (SSG)
│   └── [slug]/page.tsx     # Work detail (SSG, MDX)
└── contact/page.tsx        # Contact page with form
```

**Key Files:**
- `layout.tsx`: Wraps all pages; injects fonts, analytics, global nav/footer
- `page.tsx`: Home page; composes all section components
- `sitemap.ts`: Generates XML sitemap for all routes (static + dynamic)
- `opengraph-image.tsx`: Dynamic OG image via `@vercel/og`

---

### `/components` — React Components

```
components/
├── nav.tsx                 # Sticky nav with scroll shadow
├── footer.tsx              # Footer with sitemap-style links
├── hero.tsx                # Hero with FluxGradient background
├── value-cards.tsx         # 3-card value prop section
├── process-steps.tsx       # 3-step process with images
├── gallery.tsx             # Work grid with hover effects
├── statement-band.tsx      # Mission statement section
├── audience-cards.tsx      # 4 audience cards
├── cta-band.tsx            # Dual CTA section
├── faq.tsx                 # Accordion FAQ (Radix UI)
├── contact-form.tsx        # Contact form with validation
├── smart-image.tsx         # Image wrapper with blur
├── flux-gradient.tsx       # Animated gradient background
└── ui/                     # shadcn/ui primitives
    ├── button.tsx
    ├── input.tsx
    ├── textarea.tsx
    ├── label.tsx
    ├── skeleton.tsx
    └── accordion.tsx
```

**Component Categories:**
- **Layout**: `nav.tsx`, `footer.tsx`
- **Hero**: `hero.tsx`, `flux-gradient.tsx`
- **Home Sections**: `value-cards.tsx`, `process-steps.tsx`, etc.
- **Work**: `gallery.tsx`
- **Contact**: `contact-form.tsx`
- **UI Primitives**: `/ui` folder (from shadcn/ui)

---

### `/lib` — Utility Libraries

```
lib/
├── utils.ts                # Generic utilities (cn, formatDate, etc.)
├── mdx.ts                  # MDX parsing and content fetching
├── mailer.ts               # Resend email wrapper
├── seo.ts                  # Metadata generation helpers
├── structured-data.ts      # JSON-LD schema generators
└── analytics.ts            # Plausible tracking helpers
```

**Key Functions:**
- `cn()`: Tailwind class merge utility
- `getAllWorkPosts()`: Fetch and parse all MDX files
- `sendContactEmail()`: Send email via Resend
- `generatePageMetadata()`: Generate Next.js Metadata object
- `generateOrganizationSchema()`: JSON-LD for Google

---

### `/content` — MDX Content

```
content/work/
├── ai-cinema-experiment.mdx
└── neon-noir.mdx
```

**Structure:**
- Frontmatter (YAML) for metadata: title, description, tags, thumbnail, etc.
- Body (Markdown) for content
- Can embed React components if needed

---

### `/tests` — Testing

```
tests/
├── smoke.spec.ts               # Playwright E2E smoke tests
├── components/
│   └── contact-form.test.tsx   # Component unit tests
└── lib/
    └── utils.test.ts           # Utility function tests
```

**Testing Strategy:**
- **E2E (Playwright)**: Critical user paths (home load, nav, form submission)
- **Unit (Vitest)**: Pure functions, components with logic
- **Coverage Target**: 70%+ for critical paths

---

## Rendering Strategy

| Route | Strategy | Reason |
|-------|----------|--------|
| `/` | SSG | Static home page, no dynamic data |
| `/work` | SSG | Static work index, revalidate on demand |
| `/work/[slug]` | SSG | Static work detail pages (MDX) |
| `/contact` | SSG | Static contact page |
| `/api/contact` | API Route | Server-side form handling |
| `/sitemap.xml` | Dynamic | Generated at request time |
| `/robots.txt` | Dynamic | Generated at request time |

**Why SSG (Static Site Generation)?**
- Fastest possible load times
- Best SEO (fully rendered HTML)
- Lowest server costs
- Can revalidate on-demand via Vercel

---

## SEO Implementation

### 1. **Metadata API**

Every page exports a `Metadata` object:

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Tenchi Flux Studios',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
};
```

### 2. **Structured Data (JSON-LD)**

Injected via `<script>` tags:
- **Organization**: Company info for Google Knowledge Graph
- **WebSite**: Site-level metadata with search action
- **VideoObject**: For work entries with video content
- **BreadcrumbList**: Breadcrumb navigation for SEO

### 3. **Sitemap & Robots**

- `app/sitemap.ts`: Generates XML sitemap with all routes
- `app/robots.ts`: Configures crawler access

### 4. **Open Graph Images**

- `app/opengraph-image.tsx`: Default OG image (auto-generated)
- Per-page OG images via metadata

---

## Performance Optimization

### Image Optimization
- `next/image` auto-optimizes (WebP, AVIF, responsive)
- Blur placeholders prevent layout shift
- Lazy loading below the fold

### Font Strategy
- `next/font/google` for Inter + Space Grotesk
- `display: swap` to prevent FOIT (Flash of Invisible Text)
- Self-hosted fonts via Vercel Edge Network

### Bundle Size
- Server Components by default (zero client JS)
- Client Components only where needed (`'use client'`)
- Tree-shaking enabled
- Dynamic imports for heavy components

### Caching
- Static pages cached indefinitely (ISR optional)
- API responses cached via Vercel Edge Cache
- Font files cached for 1 year

---

## Security

### API Routes
- Input validation with Zod schemas
- Rate limiting recommended (not implemented yet)
- CORS headers configured
- No sensitive data in client-side code

### Headers
- CSP headers via `next.config.ts`
- HSTS, X-Frame-Options, etc. via Vercel

### Environment Variables
- Never exposed to client (unless prefixed with `NEXT_PUBLIC_`)
- Stored in Vercel project settings

---

## CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/ci.yml`):

1. **Lint & Type Check**
   - Run ESLint
   - Run TypeScript compiler
   - Check Prettier formatting

2. **Unit Tests**
   - Run Vitest tests
   - Generate coverage report

3. **E2E Tests**
   - Install Playwright browsers
   - Run Playwright tests
   - Upload test artifacts

4. **Build**
   - Run `next build`
   - Upload build artifacts

5. **Deploy**
   - **PR**: Deploy preview to Vercel
   - **Main**: Deploy production to Vercel

---

## Observability

### Logging
- Pino structured logger
- JSON logs in production
- Pretty logs in development
- Log levels: debug, info, warn, error

### Analytics
- Plausible for pageviews and custom events
- No cookies, privacy-first
- Real-time dashboard

### Error Tracking
- Optional: Sentry integration (not implemented)
- Add `instrumentation.ts` for setup

---

## Extensibility

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Export `Metadata`
3. Implement page component
4. Add to sitemap (automatic)
5. Add nav link if needed

### Adding a New API Route

1. Create `app/api/new-route/route.ts`
2. Export `POST`, `GET`, etc. handler
3. Validate input with Zod
4. Add tests

### Adding a New Component

1. Create `components/new-component.tsx`
2. Add types and docstrings
3. Export from component file
4. Write tests (if stateful)

---

## Design System

### Brand Colors
- **Primary**: `#8b5cf6` (Violet)
- **Secondary**: `#06b6d4` (Cyan)
- **Gradient**: `linear-gradient(135deg, #8b5cf6, #06b6d4)`

### Typography
- **Body**: Inter (Google Fonts)
- **Display**: Space Grotesk (Google Fonts)
- **Scale**: Tailwind default scale

### Spacing
- **Section Padding**: `py-16 sm:py-20 lg:py-24`
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Border Radius**: `12px` (customizable via CSS variable)

### Components
- Radix UI primitives (Accordion, Dialog, etc.)
- Styled with Tailwind
- Variants via `cva` (class-variance-authority)

---

## Deployment Checklist

### Before First Deploy

- [ ] Set all environment variables in Vercel
- [ ] Configure custom domain
- [ ] Set up Resend email domain
- [ ] Create Plausible site
- [ ] Add GitHub secrets for CI/CD
- [ ] Test contact form end-to-end
- [ ] Run Lighthouse audit
- [ ] Check mobile responsiveness

### Post-Deploy

- [ ] Submit sitemap to Google Search Console
- [ ] Verify OG images render correctly
- [ ] Test analytics tracking
- [ ] Monitor error logs (Vercel dashboard)
- [ ] Set up uptime monitoring (optional)

---

## Future Architecture Considerations

### 1. **CMS Integration**
- Migrate MDX to headless CMS (Sanity, Contentful)
- Keep git-based workflow as backup

### 2. **Internationalization (i18n)**
- Add `next-intl` or `next-i18next`
- Translate content via CMS or JSON files

### 3. **Advanced Motion**
- Integrate Framer Motion for micro-interactions
- Add page transitions

### 4. **WebGL/Shaders**
- Upgrade `FluxGradient` with WebGL shaders
- Use Three.js or PixiJS

### 5. **Admin Dashboard**
- Build admin UI for content management
- Use Next.js API routes + DB (Postgres, MongoDB)

### 6. **Multi-tenant**
- Support multiple studio brands on one codebase
- Dynamic theming via subdomain/path

---

## Questions & Support

For architecture questions or contributions, contact:
- **Email**: hello@tenchiflux.com
- **GitHub Issues**: [tenchi-flux/issues](https://github.com/gmena82/tenchi-flux/issues)

---

**Last Updated**: November 2024  
**Maintained by**: Tenchi Flux Studios / Growvia Marketing

