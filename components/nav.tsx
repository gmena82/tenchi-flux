'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Nav - Sticky navigation with scroll shadow
 * Matches Mirage studio layout: left brand, right nav + CTA
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Studio' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-display font-bold text-flux focus-visible-ring rounded-md"
        >
          Tenchi Flux
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand focus-visible-ring rounded-md px-2 py-1',
                pathname === link.href
                  ? 'text-brand'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}

          <a
            href="https://youtube.com/@TenchiFlux"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand focus-visible-ring rounded-md px-2 py-1"
          >
            YouTube
          </a>

          <Button asChild variant="flux" size="default">
            <Link href="/contact">Start a project</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-brand focus-visible-ring rounded-md"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

