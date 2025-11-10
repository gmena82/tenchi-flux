import { describe, it, expect } from 'vitest';
import { cn, formatDate, debounce, generateBlurDataURL } from '@/lib/utils';

/**
 * Unit tests for utility functions
 */

describe('cn (className merge)', () => {
  it('merges class names', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('handles Tailwind conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500');
    // Should only have one text color (the last one)
    expect(result).toBe('text-blue-500');
  });
});

describe('formatDate', () => {
  it('formats date string', () => {
    const result = formatDate('2024-11-01');
    expect(result).toMatch(/November 1, 2024/);
  });

  it('formats Date object', () => {
    const date = new Date('2024-11-01');
    const result = formatDate(date);
    expect(result).toMatch(/November 1, 2024/);
  });
});

describe('debounce', () => {
  it('delays function execution', async () => {
    let counter = 0;
    const increment = () => counter++;
    const debouncedIncrement = debounce(increment, 100);

    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();

    // Should not have executed yet
    expect(counter).toBe(0);

    // Wait for debounce delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Should have executed once
    expect(counter).toBe(1);
  });

  it('passes arguments to debounced function', async () => {
    let value = 0;
    const setValue = (newValue: number) => {
      value = newValue;
    };
    const debouncedSetValue = debounce(setValue, 50);

    debouncedSetValue(42);

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(value).toBe(42);
  });
});

describe('generateBlurDataURL', () => {
  it('generates data URL', () => {
    const result = generateBlurDataURL();
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('accepts custom dimensions', () => {
    const result = generateBlurDataURL(20, 30);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('generates valid base64', () => {
    const result = generateBlurDataURL();
    const base64Part = result.split(',')[1];
    expect(base64Part).toBeTruthy();

    // Should be decodable
    const decoded = Buffer.from(base64Part, 'base64').toString();
    expect(decoded).toContain('svg');
  });
});

