# 🎬 Tenchi Flux Studios

[![CI](https://github.com/gmena82/tenchi-flux/actions/workflows/ci.yml/badge.svg)](https://github.com/gmena82/tenchi-flux/actions/workflows/ci.yml)

> **Breakthrough cinema, without the bottlenecks.**  
> Where storytelling, cinema, and artificial intelligence collide.

Tenchi Flux Studios is the creative AI division of Growvia Marketing. We craft AI-powered films, experimental shorts, and cinematic worlds that blur the line between reality and machine.

**🌐 Live Site**: [tenchiflux.com](https://tenchiflux.com)  
**📺 YouTube**: [@TenchiFlux](https://youtube.com/@TenchiFlux)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+ (recommended package manager)

### Installation

```bash
# Clone the repository
git clone git@github.com:gmena82/tenchi-flux.git
cd tenchi-flux

# Install dependencies
pnpm install

# Copy environment variables
cp env.example .env

# Fill in your environment variables in .env
```

### Environment Variables

Create a `.env` file in the root with the following:

```bash
# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@tenchiflux.com
RESEND_TO_EMAIL=team@growvia.com

# Analytics (Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=tenchiflux.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://tenchiflux.com
```

**Get API Keys:**
- **Resend**: Sign up at [resend.com](https://resend.com) for email delivery
- **Plausible**: Optional analytics at [plausible.io](https://plausible.io)

### Development

```bash
# Start dev server (http://localhost:3000)
pnpm dev

# Run type checking
pnpm typecheck

# Run linter
pnpm lint

# Format code
pnpm format

# Run unit tests
pnpm test

# Run E2E tests (requires dev server running)
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

### Build & Deploy

```bash
# Production build
pnpm build

# Start production server locally
pnpm start
```

**Vercel Deployment:**

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Deploy: `vercel --prod`

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 📁 Project Structure

```
tenchi-flux/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts, analytics
│   ├── page.tsx                 # Home page (10 sections)
│   ├── globals.css              # Tailwind + CSS variables
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # Robots.txt
│   ├── opengraph-image.tsx      # Default OG image
│   ├── api/contact/route.ts     # Contact form API
│   ├── work/
│   │   ├── page.tsx             # Work index
│   │   └── [slug]/page.tsx      # Work detail (MDX)
│   └── contact/page.tsx         # Contact page
├── components/
│   ├── nav.tsx                  # Sticky navigation
│   ├── footer.tsx               # Footer with links
│   ├── hero.tsx                 # Hero with FluxGradient
│   ├── value-cards.tsx          # 3-card value props
│   ├── process-steps.tsx        # 3-step process
│   ├── gallery.tsx              # Work gallery grid
│   ├── statement-band.tsx       # Mission statement
│   ├── audience-cards.tsx       # Who we help
│   ├── cta-band.tsx             # CTA section
│   ├── faq.tsx                  # Accordion FAQ
│   ├── contact-form.tsx         # Contact form
│   ├── smart-image.tsx          # Image with blur placeholder
│   ├── flux-gradient.tsx        # Animated gradient
│   └── ui/                      # shadcn/ui components
├── content/work/                # MDX work entries
│   ├── ai-cinema-experiment.mdx
│   └── neon-noir.mdx
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── mdx.ts                   # MDX utilities
│   ├── mailer.ts                # Resend wrapper
│   ├── seo.ts                   # Metadata helpers
│   ├── structured-data.ts       # JSON-LD generators
│   └── analytics.ts             # Plausible setup
├── public/
│   └── placeholders/            # Blur placeholder images
├── tests/
│   ├── smoke.spec.ts            # Playwright E2E
│   └── components/              # Component tests
├── .github/workflows/ci.yml     # CI/CD pipeline
├── docs/                        # Standards documentation
└── ARCHITECTURE.md              # Architecture overview
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: shadcn/ui (Radix UI primitives)
- **Content**: MDX via next-mdx-remote
- **Email**: Resend + React Email
- **Validation**: Zod
- **Analytics**: Plausible (privacy-first)
- **Testing**: Playwright (E2E) + Vitest (unit)
- **CI/CD**: GitHub Actions → Vercel
- **Logging**: Pino

---

## 📝 Adding Content

### Add a New Work Entry

1. Create a new `.mdx` file in `content/work/`:

```mdx
---
title: "Your Project Title"
description: "A short description of the project"
year: "2024"
tags: ["Short Film", "Experimental"]
thumbnail: "/images/your-thumbnail.jpg"
youtubeId: "dQw4w9WgXcQ"  # Optional YouTube video ID
publishedAt: "2024-11-10"
---

## Project Overview

Your content here in Markdown/MDX format...

```

2. Add your thumbnail image to `public/images/`
3. Build or restart dev server to see changes

### Customize Brand Colors

Edit `app/globals.css`:

```css
:root {
  --brand: #8b5cf6;      /* Primary brand color */
  --brand-2: #06b6d4;    /* Secondary accent */
  --radius: 12px;        /* Border radius */
}
```

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage
pnpm test -- --coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests (headless)
pnpm test:e2e

# Run with UI mode
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e tests/smoke.spec.ts
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect GitHub**: Import repo at [vercel.com/new](https://vercel.com/new)
2. **Configure Environment Variables**: Add all env vars from `.env`
3. **Deploy**: Automatic on every push to `main`

**Required Vercel Secrets** (for GitHub Actions):
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Manual Deployment

```bash
# Build
pnpm build

# Start production server
pnpm start
```

---

## 🔐 Security

- All API routes validate input with Zod
- CSP headers configured in `next.config.ts`
- Email rate limiting recommended (add middleware)
- Environment variables never exposed to client

---

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: System architecture and data flow
- **[docs/frontend-standards.md](./docs/frontend-standards.md)**: Frontend coding standards
- **[docs/backend-standards.md](./docs/backend-standards.md)**: Backend API standards
- **[docs/privacy-analytics.md](./docs/privacy-analytics.md)**: Privacy and analytics setup
- **[docs/quality-tooling.md](./docs/quality-tooling.md)**: Testing and quality tools

---

## 🛠️ Git Workflow

```bash
# Initialize git (if not already done)
git init

# Add remote
git remote add origin git@github.com:gmena82/tenchi-flux.git

# Create initial commit
git add .
git commit -m "feat: initial commit - Tenchi Flux Studios website"

# Push to main
git push -u origin main
```

### Branch Strategy

- `main`: Production-ready code (auto-deploys)
- `develop`: Development branch (preview deploys)
- `feature/*`: Feature branches (PR to develop)

---

## 📈 Performance

- **Lighthouse Score Target**: 95+ across all metrics
- **Image Optimization**: Next.js Image component with blur placeholders
- **Font Strategy**: `next/font` with `display: swap`
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Bundle Size**: Optimized imports, tree-shaking enabled

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/config changes

---

## 📞 Contact & Support

- **Email**: hello@tenchiflux.com
- **YouTube**: [@TenchiFlux](https://youtube.com/@TenchiFlux)
- **Website**: [tenchiflux.com](https://tenchiflux.com)

---

## 📄 License

© 2024 Tenchi Flux Studios. A division of Growvia Marketing.  
All rights reserved.

---

## 🎯 Next Steps

### Immediate Iterations

- [ ] Replace placeholder images with real assets
- [ ] Add more work entries (MDX files)
- [ ] Configure real email addresses in `.env`
- [ ] Set up Plausible analytics account
- [ ] Add custom domain to Vercel

### Future Enhancements

- [ ] Add CMS integration (Sanity, Contentful, or Contentlayer)
- [ ] Implement blog section
- [ ] Add video showreel on homepage
- [ ] Build client portal for project tracking
- [ ] Add internationalization (i18n)
- [ ] Implement advanced motion design (Framer Motion)
- [ ] Add WebGL shaders for FluxGradient
- [ ] Create admin dashboard for content management

---

**Built with 💜 by the Tenchi Flux team. Powered by Next.js, Tailwind, and AI.**

