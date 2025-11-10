# Quality & Tooling — Tenchi Flux Studios

## Overview

Tenchi Flux Studios maintains high code quality through automated tooling, comprehensive testing, and continuous integration.

---

## Linting & Formatting

### ESLint

**Configuration**: `eslint.config.mjs`

```bash
# Run linter
pnpm lint

# Auto-fix issues
pnpm lint --fix
```

**Rules**:
- Next.js recommended rules
- TypeScript strict rules
- Prettier integration (no style conflicts)

### Prettier

**Configuration**: `.prettierrc.json`

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

**Settings**:
- Single quotes
- 2-space indentation
- 100-character line width
- Trailing commas (ES5)
- Tailwind class sorting plugin

### Pre-commit Hooks (Optional)

To enforce quality on every commit, add Husky + lint-staged:

```bash
pnpm add -D husky lint-staged

# Initialize Husky
pnpm exec husky install
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,mdx}": ["prettier --write"]
  }
}
```

---

## Type Checking

### TypeScript

```bash
# Type check all files
pnpm typecheck

# Watch mode
pnpm typecheck --watch
```

**Strict Mode Enabled**:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUnusedLocals: true` (warning)

### Type Coverage

```bash
# Install type coverage tool
pnpm add -D type-coverage

# Check coverage
pnpm exec type-coverage --detail
```

**Target**: 95%+ type coverage

---

## Testing

### Unit Tests (Vitest)

**Configuration**: `vitest.config.ts`

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage
pnpm test -- --coverage

# Run specific test file
pnpm test tests/lib/utils.test.ts
```

**Writing Tests**:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component', () => {
  it('should render', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

**Coverage Goals**:
- **Utilities**: 90%+
- **Components**: 70%+
- **API Routes**: 80%+

---

### E2E Tests (Playwright)

**Configuration**: `playwright.config.ts`

```bash
# Run all E2E tests (headless)
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run specific browser
pnpm test:e2e --project=chromium

# Debug mode
pnpm test:e2e --debug

# Generate report
pnpm test:e2e --reporter=html
```

**Test Structure**:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading')).toBeVisible();
  });
});
```

**Test Categories**:
- **Smoke tests**: Critical paths (home load, nav, forms)
- **Regression tests**: Bug fixes
- **Accessibility tests**: ARIA, keyboard nav, focus

---

## Accessibility Testing

### Manual Testing

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Enter/Space to activate buttons/links
   - Escape to close modals

2. **Screen Reader** (NVDA/VoiceOver):
   - Read page with screen reader
   - Check alt text on images
   - Verify form labels

3. **Color Contrast**:
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Target: WCAG AA (4.5:1 for text, 3:1 for UI)

### Automated Testing

```bash
# Install axe-core
pnpm add -D @axe-core/playwright

# Add to Playwright tests
import { injectAxe, checkA11y } from '@axe-core/playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

---

## Performance Testing

### Lighthouse CI

**Local Lighthouse Audit**:

```bash
# Install Lighthouse
pnpm add -D lighthouse

# Run audit
pnpm exec lighthouse http://localhost:3000 --view
```

**Targets**:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Automated Performance Testing

Add to GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://tenchiflux.com
            https://tenchiflux.com/work
          uploadArtifacts: true
```

### Web Vitals

Monitor Core Web Vitals in production:

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Bundle Analysis

### Analyze Bundle Size

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Analyze production build
ANALYZE=true pnpm build
```

**Configuration** (`next.config.ts`):

```typescript
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // ... next config
});
```

**Targets**:
- First load JS: < 100KB
- Page-specific JS: < 50KB per page

---

## Continuous Integration

### GitHub Actions

**Workflow**: `.github/workflows/ci.yml`

**Jobs**:
1. **Lint & Type Check** → Catches syntax errors
2. **Unit Tests** → Tests pure logic
3. **E2E Tests** → Tests user flows
4. **Build** → Verifies production build
5. **Deploy** → Deploys to Vercel (preview or prod)

**Run CI Locally**:

```bash
# Install act (GitHub Actions runner)
brew install act

# Run workflow
act -j lint-and-typecheck
```

### Status Checks

Required checks before merging PRs:
- ✅ Linter passes
- ✅ Type check passes
- ✅ Unit tests pass
- ✅ E2E tests pass
- ✅ Build succeeds

---

## Code Quality Metrics

### Complexity Analysis

```bash
# Install complexity tool
pnpm add -D eslint-plugin-complexity

# Check cyclomatic complexity
pnpm lint
```

**Target**: Cyclomatic complexity < 10 per function

### Code Coverage

```bash
# Generate coverage report
pnpm test -- --coverage

# View HTML report
open coverage/index.html
```

**Coverage Badges**:

Add to README:

```markdown
[![Coverage](https://img.shields.io/codecov/c/github/gmena82/tenchi-flux)](https://codecov.io/gh/gmena82/tenchi-flux)
```

---

## Security Scanning

### Dependency Auditing

```bash
# Audit npm packages
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

### Automated Scanning (Dependabot)

Enable Dependabot in GitHub:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Secret Scanning

Install `gitleaks` to prevent committing secrets:

```bash
brew install gitleaks

# Scan repo
gitleaks detect --source . --verbose
```

---

## Documentation Standards

### JSDoc for Functions

```typescript
/**
 * Send contact form email via Resend
 * 
 * @param data - Contact form data
 * @param data.name - User's name
 * @param data.email - User's email
 * @param data.message - Message content
 * @returns Promise resolving to email send result
 * @throws {Error} If email send fails
 * 
 * @example
 * ```typescript
 * await sendContactEmail({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'Hello!'
 * });
 * ```
 */
export async function sendContactEmail(data: ContactFormData) {
  // ...
}
```

### Component Documentation

```tsx
/**
 * Button - Primary UI button component
 * 
 * Supports multiple variants (default, flux, outline) and sizes (sm, default, lg).
 * Built on Radix UI Slot for composition.
 * 
 * @example
 * ```tsx
 * <Button variant="flux" size="lg">
 *   Click me
 * </Button>
 * ```
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```

---

## Monitoring & Observability

### Error Tracking (Sentry)

```bash
# Install Sentry
pnpm add @sentry/nextjs

# Initialize
pnpm exec sentry-wizard
```

**Configuration** (`instrumentation.ts`):

```typescript
import * as Sentry from '@sentry/nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
  }
}
```

### Logging

Structured logging with Pino (already configured in `lib/mailer.ts`):

```typescript
import pino from 'pino';

const logger = pino({ level: 'info' });

logger.info({ userId: 123 }, 'User logged in');
logger.error({ error }, 'Payment failed');
```

---

## Development Workflow

### Daily Checklist

- [ ] Pull latest changes: `git pull origin main`
- [ ] Install dependencies: `pnpm install`
- [ ] Run dev server: `pnpm dev`
- [ ] Check linter: `pnpm lint`
- [ ] Run tests: `pnpm test`

### Before Committing

- [ ] Format code: `pnpm format`
- [ ] Lint code: `pnpm lint --fix`
- [ ] Type check: `pnpm typecheck`
- [ ] Run tests: `pnpm test`
- [ ] Write commit message (Conventional Commits)

### Before Pushing

- [ ] Pull latest: `git pull origin develop`
- [ ] Resolve conflicts (if any)
- [ ] Run full test suite: `pnpm test && pnpm test:e2e`
- [ ] Push: `git push origin feature/my-feature`

---

## Recommended Tools

### VS Code Extensions

- **ESLint**: dbaeumer.vscode-eslint
- **Prettier**: esbenp.prettier-vscode
- **Tailwind IntelliSense**: bradlc.vscode-tailwindcss
- **TypeScript Error Translator**: mattpocock.ts-error-translator
- **Playwright Test for VSCode**: ms-playwright.playwright

### Browser Extensions

- **React Developer Tools**: Debug React components
- **axe DevTools**: Accessibility testing
- **Lighthouse**: Performance audits
- **Wappalyzer**: Detect technologies

### CLI Tools

- **Vercel CLI**: Deploy and manage projects
- **pnpm**: Fast package manager
- **act**: Run GitHub Actions locally
- **gitleaks**: Scan for secrets

---

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [ESLint Rules](https://eslint.org/docs/rules)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Lighthouse Scoring](https://web.dev/performance-scoring)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

## Support

For questions about tooling or quality standards:
- **Email**: hello@tenchiflux.com
- **GitHub Issues**: [tenchi-flux/issues](https://github.com/gmena82/tenchi-flux/issues)

