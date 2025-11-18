'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Nav - Premium glassmorphic navigation with Radix NavigationMenu
 * Emulates Mirage studio's nav: fixed, centered, glass effect, rotating gradient border, dropdown menus
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      // Update CSS variable for scroll-based gradient reveal
      const revealValue = Math.min(scrollY / 100, 1);
      document.documentElement.style.setProperty('--header-scroll-reveal', revealValue.toString());
    };

    handleScroll(); // Initialize on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Fixed Container - Mirage style: top: 20px, centered with margin */}
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

            {/* Desktop Nav - Radix NavigationMenu */}
            <NavigationMenu.Root className="hidden lg:block">
              <NavigationMenu.List className="flex items-center gap-2">
                {/* Services Dropdown */}
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible-ring">
                    Services
                    <ChevronDownIcon
                      className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto data-[motion=from-start]:animate-[nav-enter-from-left_200ms] data-[motion=from-end]:animate-[nav-enter-from-right_200ms] data-[motion=to-start]:animate-[nav-enter-from-left_200ms_reverse] data-[motion=to-end]:animate-[nav-enter-from-right_200ms_reverse]">
                    <div className="mt-4 w-[600px]">
                      <div className="rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          {/* AI Cinema */}
                          <Link
                            href="/contact"
                            className="group relative rounded-xl p-4 hover:bg-accent/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">🎬</div>
                              <div>
                                <div className="font-semibold text-foreground group-hover:text-brand transition-colors">
                                  AI Cinema
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Experimental narrative shorts with cutting-edge AI tools
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* Commercial */}
                          <Link
                            href="/contact"
                            className="group relative rounded-xl p-4 hover:bg-accent/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">📺</div>
                              <div>
                                <div className="font-semibold text-foreground group-hover:text-brand transition-colors">
                                  Commercial
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Explainers, product demos, brand stories
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* World-Building */}
                          <Link
                            href="/contact"
                            className="group relative rounded-xl p-4 hover:bg-accent/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">🌍</div>
                              <div>
                                <div className="font-semibold text-foreground group-hover:text-brand transition-colors">
                                  World-Building
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Custom environments, characters, consistent lore
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* Labs */}
                          <Link
                            href="/contact"
                            className="group relative rounded-xl p-4 hover:bg-accent/50 transition-all duration-200 border-2 border-brand/20"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">🔬</div>
                              <div>
                                <div className="font-semibold text-brand group-hover:text-brand-2 transition-colors">
                                  Flux Labs
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Push boundaries with experimental AI workflows
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>

                {/* Work */}
                <NavigationMenu.Item>
                  <Link
                    href="/work"
                    className={cn(
                      'block px-4 py-2 text-sm font-medium transition-colors rounded-lg focus-visible-ring',
                      pathname === '/work'
                        ? 'text-brand'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Work
                  </Link>
                </NavigationMenu.Item>

                {/* YouTube */}
                <NavigationMenu.Item>
                  <a
                    href="https://www.youtube.com/@tenchi-flux-studios/shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg focus-visible-ring"
                  >
                    YouTube
                  </a>
                </NavigationMenu.Item>

                {/* Viewport for dropdown positioning */}
                <NavigationMenu.Viewport className="absolute top-full left-0 mt-2 origin-top-center animate-[nav-scale-in_200ms] overflow-hidden rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out" />
              </NavigationMenu.List>
            </NavigationMenu.Root>

            {/* CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="outline" size="default">
                <Link href="/contact">Get Started</Link>
              </Button>
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
            {/* Services Section */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Services
              </div>
              <div className="space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="text-2xl">🎬</div>
                  <div className="text-sm font-medium">AI Cinema</div>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="text-2xl">📺</div>
                  <div className="text-sm font-medium">Commercial</div>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="text-2xl">🌍</div>
                  <div className="text-sm font-medium">World-Building</div>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors border-2 border-brand/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="text-2xl">🔬</div>
                  <div className="text-sm font-medium text-brand">Flux Labs</div>
                </Link>
              </div>
            </div>

            {/* Nav Links */}
            <div className="mb-6 space-y-2">
              <Link
                href="/work"
                className={cn(
                  'block p-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/work'
                    ? 'text-brand bg-accent/50'
                    : 'text-foreground hover:bg-accent/50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
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

            {/* CTA Buttons (Mobile) */}
            <div className="space-y-3 pt-4 border-t border-border">
              <Button asChild variant="outline" size="default" className="w-full">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
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
