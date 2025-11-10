# Frontend Standards — Tenchi Flux Studios

## Component Architecture

### Server vs. Client Components

**Default to Server Components** unless you need:
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `localStorage`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Third-party libraries that depend on browser APIs

```tsx
// ✅ Server Component (default)
export function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Client Component (when needed)
'use client';
export function SearchBar() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### Component Structure

```tsx
'use client'; // Only if needed

import { useState } from 'react'; // Imports first
import { cn } from '@/lib/utils'; // Then utilities
import { Button } from '@/components/ui/button'; // Then components

/**
 * ComponentName - Brief description
 * Longer description of what this component does
 */
interface ComponentNameProps {
  /** Prop description */
  title: string;
  /** Optional prop */
  subtitle?: string;
  /** Callback prop */
  onSubmit?: () => void;
}

export function ComponentName({ title, subtitle, onSubmit }: ComponentNameProps) {
  const [state, setState] = useState(false);

  function handleClick() {
    // Handler logic
    onSubmit?.();
  }

  return (
    <div className="container">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <Button onClick={handleClick}>Submit</Button>
    </div>
  );
}
```

---

## TypeScript Standards

### No Implicit Any

```tsx
// ❌ Bad
function fetchData(id) {
  return fetch(`/api/${id}`);
}

// ✅ Good
function fetchData(id: string): Promise<Response> {
  return fetch(`/api/${id}`);
}
```

### Use Type Inference

```tsx
// ❌ Bad (redundant type annotation)
const [count, setCount] = useState<number>(0);

// ✅ Good (inferred)
const [count, setCount] = useState(0);

// ✅ Good (explicit when needed)
const [user, setUser] = useState<User | null>(null);
```

### Avoid Type Assertions

```tsx
// ❌ Bad
const element = document.querySelector('.btn') as HTMLButtonElement;

// ✅ Good
const element = document.querySelector<HTMLButtonElement>('.btn');
if (element) {
  element.click();
}
```

---

## Styling Standards

### Tailwind Best Practices

1. **Use semantic class order**: Layout → Spacing → Sizing → Typography → Visual → Interactive

```tsx
// ✅ Good order
<div className="flex items-center gap-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
```

2. **Extract repeated patterns**:

```tsx
// ❌ Bad (repeated classes)
<button className="px-4 py-2 bg-brand text-white rounded-lg">Button 1</button>
<button className="px-4 py-2 bg-brand text-white rounded-lg">Button 2</button>

// ✅ Good (use cn utility)
const buttonClass = 'px-4 py-2 bg-brand text-white rounded-lg';
<button className={buttonClass}>Button 1</button>
<button className={buttonClass}>Button 2</button>

// ✅ Better (create component)
<Button variant="flux">Button 1</Button>
<Button variant="flux">Button 2</Button>
```

3. **Use CSS variables for theme colors**:

```css
/* globals.css */
:root {
  --brand: #8b5cf6;
  --brand-2: #06b6d4;
}

.dark {
  --brand: #a78bfa;
}
```

```tsx
// Use in Tailwind
<div className="bg-brand text-white" />
```

### Responsive Design

- **Mobile-first**: Base styles for mobile, then `sm:`, `md:`, `lg:`, `xl:`
- **Common breakpoints**:
  - `sm`: 640px (tablets)
  - `md`: 768px (small laptops)
  - `lg`: 1024px (desktops)
  - `xl`: 1280px (large screens)

```tsx
// ✅ Mobile-first
<div className="text-base sm:text-lg lg:text-xl">
  Responsive text
</div>
```

---

## Accessibility Standards

### Semantic HTML

```tsx
// ❌ Bad
<div onClick={handleClick}>Click me</div>

// ✅ Good
<button onClick={handleClick}>Click me</button>
```

### ARIA Labels

```tsx
// Images
<img src="/logo.png" alt="Tenchi Flux Studios logo" />

// Icon buttons
<button aria-label="Close menu">
  <XIcon />
</button>

// Form fields
<label htmlFor="email">Email</label>
<input id="email" type="email" name="email" />
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Use `focus-visible` for focus styles (not `:focus`)

```tsx
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
  Click me
</button>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Standards

### Image Optimization

Always use `SmartImage` or `next/image`:

```tsx
import { SmartImage } from '@/components/smart-image';

<SmartImage
  src="/images/hero.jpg"
  alt="Description"
  width={1200}
  height={630}
  priority // For above-the-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Font Loading

Use `next/font` for Google Fonts:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  variable: '--font-inter',
});
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false, // Disable SSR if needed
});
```

---

## State Management

### Local State (useState)

For component-level state:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Server State (React Query / SWR)

For data fetching (not implemented yet, but recommended):

```tsx
import useSWR from 'swr';

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;
  
  return <UserProfile data={data} />;
}
```

### URL State (searchParams)

For shareable state:

```tsx
'use client';
import { useSearchParams } from 'next/navigation';

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  return <Results query={query} />;
}
```

---

## Error Handling

### Client-Side Errors

```tsx
'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Form Validation

Use Zod for schema validation:

```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
});

const result = schema.safeParse(formData);
if (!result.success) {
  // Handle errors
  console.log(result.error.errors);
}
```

---

## Testing Standards

### Component Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### E2E Tests

```tsx
import { test, expect } from '@playwright/test';

test('should navigate to contact page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL('/contact');
});
```

---

## Code Organization

### File Naming

- Components: `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- Utils: `kebab-case.ts` (e.g., `format-date.ts`)
- Hooks: `use-hook-name.ts` (e.g., `use-media-query.ts`)
- Types: `types.ts` or inline with component

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Local utilities
4. Local components
5. Types (if separate file)
6. Styles (if CSS modules)

```tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';
```

---

## Documentation

### Component Docstrings

```tsx
/**
 * Button - Primary call-to-action button
 * 
 * @example
 * ```tsx
 * <Button variant="flux" size="lg">
 *   Start a project
 * </Button>
 * ```
 */
export function Button({ variant, size, children }: ButtonProps) {
  // ...
}
```

### Inline Comments

```tsx
// ✅ Good: Explain WHY, not WHAT
// Use setTimeout to avoid blocking the UI thread
setTimeout(() => processHeavyData(), 0);

// ❌ Bad: States the obvious
// Set count to 0
setCount(0);
```

---

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add contact form validation
fix: resolve mobile menu overflow issue
docs: update README with deployment steps
style: format code with Prettier
refactor: extract button variants to CVA
test: add E2E tests for navigation
chore: upgrade Next.js to 15.0.3
```

### Branch Naming

```bash
feature/contact-form
fix/mobile-nav-overflow
refactor/button-component
docs/update-readme
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [Web.dev Performance](https://web.dev/performance)

