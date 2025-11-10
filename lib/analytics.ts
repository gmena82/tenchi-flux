/**
 * Analytics configuration for Plausible
 * Privacy-first analytics without cookies
 */

export const analyticsConfig = {
  domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'tenchiflux.com',
  enabled: process.env.NODE_ENV === 'production',
  src: 'https://plausible.io/js/script.js',
};

/**
 * Track custom event (Plausible)
 * @param eventName - Event name
 * @param props - Event properties
 */
export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (!analyticsConfig.enabled || typeof window === 'undefined') return;

  try {
    // @ts-ignore - plausible is added via script tag
    if (window.plausible) {
      // @ts-ignore
      window.plausible(eventName, { props });
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track page view (Plausible auto-tracks, but useful for SPA navigation)
 * @param url - Page URL
 */
export function trackPageView(url: string) {
  if (!analyticsConfig.enabled || typeof window === 'undefined') return;

  try {
    // @ts-ignore
    if (window.plausible) {
      // @ts-ignore
      window.plausible('pageview', { u: url });
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

