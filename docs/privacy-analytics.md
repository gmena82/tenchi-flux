# Privacy & Analytics — Tenchi Flux Studios

## Privacy-First Approach

Tenchi Flux Studios is committed to privacy-first analytics. We use **Plausible Analytics**, a lightweight, open-source, cookieless analytics solution that respects user privacy.

---

## Why Plausible?

### ✅ Privacy Benefits

1. **No cookies**: Compliant with GDPR, CCPA, PECR without consent banners
2. **No personal data**: No IP addresses, user agents, or device IDs stored
3. **No cross-site tracking**: Data stays on your site, not shared with third parties
4. **GDPR/CCPA compliant**: No need for cookie banners or consent forms
5. **Open source**: Transparent codebase, auditable by anyone

### 📊 Analytics Features

- Pageview tracking (automatic)
- Custom event tracking
- Real-time dashboard
- Traffic sources (referrers, UTM campaigns)
- Top pages and entry/exit pages
- Device, browser, OS stats
- Geographic data (country-level only)

### 🎯 Comparison to Google Analytics

| Feature | Plausible | Google Analytics 4 |
|---------|-----------|-------------------|
| **Cookies** | ❌ None | ✅ Uses cookies |
| **Script Size** | < 1KB | ~45KB |
| **Data Ownership** | You own it | Google owns it |
| **Privacy Compliance** | Built-in | Requires consent |
| **Page Load Impact** | Minimal | Noticeable |
| **Learning Curve** | Low | High |

---

## Implementation

### 1. Setup (Already Configured)

The Plausible script is injected in `app/layout.tsx`:

```tsx
import Script from 'next/script';
import { analyticsConfig } from '@/lib/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {analyticsConfig.enabled && (
          <Script
            defer
            data-domain={analyticsConfig.domain}
            src={analyticsConfig.src}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Environment Variables

```bash
# .env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=tenchiflux.com
```

### 3. Configuration

The analytics config is in `lib/analytics.ts`:

```typescript
export const analyticsConfig = {
  domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'tenchiflux.com',
  enabled: process.env.NODE_ENV === 'production',
  src: 'https://plausible.io/js/script.js',
};
```

**Note**: Analytics only runs in production (not dev mode).

---

## Custom Event Tracking

### Track Button Clicks

```tsx
'use client';
import { trackEvent } from '@/lib/analytics';

export function CTAButton() {
  function handleClick() {
    trackEvent('CTA Click', {
      location: 'hero',
      label: 'Start a project',
    });
  }

  return (
    <button onClick={handleClick}>
      Start a project
    </button>
  );
}
```

### Track Form Submissions

```tsx
'use client';
import { trackEvent } from '@/lib/analytics';

export function ContactForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Submit form logic...
    
    trackEvent('Form Submission', {
      form: 'contact',
      success: 'true',
    });
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Track Video Plays

```tsx
'use client';
import { trackEvent } from '@/lib/analytics';

export function VideoPlayer({ videoId }) {
  function handlePlay() {
    trackEvent('Video Play', {
      videoId,
      source: 'youtube',
    });
  }

  return (
    <iframe
      src={`https://youtube.com/embed/${videoId}`}
      onPlay={handlePlay}
    />
  );
}
```

---

## Dashboard Access

### Setting Up Plausible

1. **Sign up**: Go to [plausible.io](https://plausible.io) or self-host
2. **Add site**: Enter `tenchiflux.com`
3. **Get script**: Use `https://plausible.io/js/script.js`
4. **Verify**: Check dashboard for incoming pageviews

### Dashboard Features

- **Real-time visitors**: See current active users
- **Top pages**: Most visited pages
- **Traffic sources**: Where visitors come from (Google, Twitter, direct, etc.)
- **Goals**: Track conversions (form submissions, clicks, etc.)
- **UTM campaigns**: Track marketing campaign performance

---

## Goals & Conversions

### Setting Up Goals in Plausible

1. Go to your Plausible dashboard
2. Navigate to **Settings** → **Goals**
3. Add custom event goals:
   - `Form Submission`
   - `CTA Click`
   - `Video Play`
   - `Newsletter Signup`

### Tracking Conversions

```tsx
// Example: Newsletter signup
trackEvent('Newsletter Signup', {
  source: 'footer',
  success: 'true',
});
```

Then view conversion rates in your Plausible dashboard.

---

## Privacy Policy

### Minimal Data Collection

We collect **only** the following:

1. **Page URL**: The page you visited
2. **HTTP Referrer**: Where you came from (if any)
3. **Browser**: Browser name (Chrome, Firefox, etc.)
4. **Operating System**: OS name (Windows, macOS, etc.)
5. **Device type**: Desktop, mobile, or tablet
6. **Country**: Derived from IP address (IP not stored)

**We do NOT collect**:
- IP addresses
- User IDs or cookies
- Personal information
- Cross-site data

### Sample Privacy Policy Language

> **Analytics**
> 
> We use Plausible Analytics, a privacy-friendly analytics service that does not use cookies and does not collect personal data. All metrics are aggregated and anonymized. For more information, see [Plausible's data policy](https://plausible.io/data-policy).

---

## GDPR Compliance

### No Consent Required

Because Plausible:
- Does not use cookies
- Does not collect personal data
- Does not track users across sites

**You do NOT need**:
- Cookie consent banners
- Privacy consent checkboxes (for analytics)
- GDPR consent forms

### Data Ownership

All analytics data is owned by you, not Plausible. You can:
- Export data anytime
- Delete data anytime
- Self-host Plausible (open source)

---

## Alternative: Google Analytics 4

If you prefer Google Analytics 4 (not recommended for privacy), here's how to set it up:

### 1. Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (e.g., `G-XXXXXXXXXX`)

### 2. Add Script

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Add Cookie Banner

**Important**: GA4 requires cookie consent in EU/GDPR regions. You'll need to add a cookie consent banner (e.g., using [CookieYes](https://www.cookieyes.com) or [OneTrust](https://www.onetrust.com)).

---

## Best Practices

### 1. Respect User Privacy

- Never collect personal data without consent
- Use privacy-first tools like Plausible
- Be transparent in your privacy policy
- Allow users to opt-out (Plausible respects DNT header)

### 2. Track What Matters

Focus on **actionable metrics**:
- Conversion rates (form submissions, CTA clicks)
- Top-performing content (work entries, blog posts)
- Traffic sources (what drives visitors?)
- User journey (entry → exit pages)

Avoid **vanity metrics**:
- Session duration (unreliable)
- Bounce rate (misleading)
- Pageviews without context

### 3. Regular Review

- Check dashboard weekly
- Identify trends (growing traffic sources, popular content)
- Optimize based on data (double down on what works)

---

## Resources

- [Plausible Documentation](https://plausible.io/docs)
- [Plausible vs Google Analytics](https://plausible.io/vs-google-analytics)
- [GDPR Compliance Guide](https://gdpr.eu)
- [Privacy Policy Generator](https://www.privacypolicygenerator.info)

---

## Support

For questions about analytics or privacy:
- **Email**: hello@tenchiflux.com
- **Plausible Support**: [plausible.io/contact](https://plausible.io/contact)

