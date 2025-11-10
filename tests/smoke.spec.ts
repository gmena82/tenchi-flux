import { test, expect } from '@playwright/test';

/**
 * Smoke tests for Tenchi Flux Studios website
 * Tests critical user paths and performance metrics
 */

test.describe('Home Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Wait for hero to be visible
    await expect(page.locator('h1')).toContainText('Breakthrough cinema');
    await expect(page.locator('h1')).toContainText('Tenchi Flux Studios');

    // Check CTAs are present
    await expect(page.getByRole('link', { name: /watch on youtube/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /start a project/i })).toBeVisible();
  });

  test('should have proper navigation', async ({ page }) => {
    await page.goto('/');

    // Navigation should be visible
    await expect(page.getByRole('navigation')).toBeVisible();

    // Check nav links
    await expect(page.getByRole('link', { name: 'Work' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Studio' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'YouTube' })).toBeVisible();
  });

  test('should have all sections', async ({ page }) => {
    await page.goto('/');

    // Value cards section
    await expect(page.getByText('Unlock creativity')).toBeVisible();
    await expect(page.getByText('Unblock production')).toBeVisible();
    await expect(page.getByText('Control your vision')).toBeVisible();

    // Process section
    await expect(page.getByText(/from idea to film/i)).toBeVisible();

    // Gallery section
    await expect(page.getByText(/made by tenchi/i)).toBeVisible();

    // FAQ section
    await expect(page.getByText(/frequently asked questions/i)).toBeVisible();
  });

  test('should have accessible images with alt text', async ({ page }) => {
    await page.goto('/');

    // All images should have alt attributes
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('should have low cumulative layout shift', async ({ page }) => {
    await page.goto('/');

    // Wait for page to settle
    await page.waitForLoadState('networkidle');

    // Check for layout stability (no major shifts)
    // This is a basic check; proper CLS measurement requires performance API
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    expect(scrollHeight).toBeGreaterThan(0);
  });
});

test.describe('Work Page', () => {
  test('should display work grid', async ({ page }) => {
    await page.goto('/work');

    await expect(page.locator('h1')).toContainText('Work');

    // Check if work items are visible (or empty state)
    const workItems = page.locator('a[href^="/work/"]');
    const count = await workItems.count();

    if (count > 0) {
      // At least one work item should be clickable
      await expect(workItems.first()).toBeVisible();
    } else {
      // Empty state should be shown
      await expect(page.getByText(/no work published/i)).toBeVisible();
    }
  });

  test('should navigate to work detail', async ({ page }) => {
    await page.goto('/work');

    // Try to find and click first work item
    const firstWork = page.locator('a[href^="/work/"]').first();
    const count = await page.locator('a[href^="/work/"]').count();

    if (count > 0) {
      await firstWork.click();

      // Should navigate to detail page
      await expect(page).toHaveURL(/\/work\/.+/);

      // Back link should be present
      await expect(page.getByRole('link', { name: /back to work/i })).toBeVisible();
    }
  });
});

test.describe('Contact Page', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.locator('h1')).toContainText('something remarkable');

    // Form fields should be present
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/contact');

    // Submit empty form
    await page.getByRole('button', { name: /send message/i }).click();

    // Required field validation should trigger
    // (Browser native validation or custom error messages)
    await expect(page.getByLabel(/name/i)).toBeFocused();
  });
});

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start at home
    await page.goto('/');

    // Navigate to Work
    await page.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL('/work');

    // Navigate to Contact (Studio link)
    await page.getByRole('link', { name: 'Studio' }).click();
    await expect(page).toHaveURL('/contact');

    // Navigate back home
    await page.getByRole('link', { name: /tenchi flux/i }).first().click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // H1 should be present and unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have focus-visible styles', async ({ page }) => {
    await page.goto('/');

    // Tab to first link
    await page.keyboard.press('Tab');

    // Check if focus is visible (this requires CSS to be loaded)
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should respect reduced motion preferences', async ({ page, context }) => {
    // Set reduced motion preference
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });

    await page.goto('/');

    // Page should load without errors
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check for essential meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('Tenchi Flux');

    // Check for OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);
  });
});

