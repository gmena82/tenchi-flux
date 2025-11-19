'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Nav - Clean, simple glassmorphic navigation
 * Direct links to all main pages.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      const revealValue = Math.min(scrollY / 100, 1);
      document.documentElement.style.setProperty('--header-scroll-reveal', revealValue.toString());
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/storytelling', label: 'Storytelling' },
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Portfolio' },
  ];

  return (
    <>
      {/* Fixed Container */}
      <header
        className="fixed top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 z-50 mx-auto max-w-7xl"
        style={{ maxWidth: 'calc(100% - 40px)' }}
      >
        {/* Glassmorphic Nav */}
        <div className="nav-glass px-4 sm:px-6 py-3 sm:py-4">
          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand */}
            <Link
              href="/"
              className="text-lg sm:text-xl font-display font-bold text-foreground hover:text-brand transition-colors focus-visible-ring rounded-md px-2 py-1"
            >
              Tenchi Flux
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-5 py-2.5 text-base font-grotesk transition-all duration-300 rounded-lg',
                    pathname === link.href
                      ? 'text-brand font-bold bg-red-950/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                      : 'text-white/90 hover:text-white hover:bg-red-900/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.youtube.com/@tenchi-flux-studios/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 py-2.5 text-base font-grotesk text-white/90 hover:text-white transition-all duration-300 rounded-lg hover:bg-red-900/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105"
              >
                YouTube
              </a>
            </nav>

            {/* CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="flux" size="default">
                <Link href="/contact">Start a Project</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible-ring rounded-md"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <Cross1Icon className="w-6 h-6" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="absolute top-24 left-5 right-5 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block p-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-brand bg-accent/50'
                      : 'text-foreground hover:bg-accent/50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.youtube.com/@tenchi-flux-studios/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                YouTube
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button asChild variant="flux" size="default" className="w-full">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Start a Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
