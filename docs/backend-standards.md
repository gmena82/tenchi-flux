# Backend Standards — Tenchi Flux Studios

## API Route Standards

### File Structure

```
app/api/
├── contact/
│   └── route.ts          # POST /api/contact
├── newsletter/
│   └── route.ts          # POST /api/newsletter
└── webhooks/
    └── resend/route.ts   # POST /api/webhooks/resend
```

### Route Handler Pattern

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// 1. Define schema
const requestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// 2. Export HTTP method handlers
export async function POST(request: NextRequest) {
  try {
    // 3. Parse and validate request body
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    // 4. Business logic
    const data = result.data;
    // ... process data ...

    // 5. Log success
    logger.info({ email: data.email }, 'Request processed successfully');

    // 6. Return response
    return NextResponse.json(
      { success: true, message: 'Processed' },
      { status: 200 }
    );
  } catch (error) {
    // 7. Error handling
    logger.error({ error }, 'Request failed');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export other methods as needed
export async function GET(request: NextRequest) {
  // ...
}
```

---

## Validation Standards

### Always Validate Input

```typescript
import { z } from 'zod';

// ❌ Bad: No validation
export async function POST(request: NextRequest) {
  const body = await request.json();
  await sendEmail(body.email); // Unsafe!
}

// ✅ Good: Schema validation
const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = schema.safeParse(body);
  
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  
  await sendEmail(result.data.email);
}
```

### Common Validation Patterns

```typescript
// Email
z.string().email()

// URL
z.string().url()

// UUID
z.string().uuid()

// Enum
z.enum(['draft', 'published', 'archived'])

// Optional with default
z.string().optional().default('default-value')

// Transform
z.string().transform(val => val.toLowerCase())

// Custom validation
z.string().refine(val => val.startsWith('TF-'), {
  message: 'Must start with TF-',
})
```

---

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  error: string;          // Human-readable message
  details?: unknown;      // Validation errors, stack traces (dev only)
  code?: string;          // Machine-readable error code
}

// Example
return NextResponse.json(
  {
    error: 'Invalid email format',
    details: result.error.errors,
    code: 'VALIDATION_ERROR',
  },
  { status: 400 }
);
```

### HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, POST, PATCH |
| 201 | Created | Successful resource creation |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid auth token |
| 403 | Forbidden | Valid auth, insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Semantic validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

---

## Logging Standards

### Structured Logging with Pino

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: { colorize: true },
        }
      : undefined,
});

// ✅ Good: Structured log with context
logger.info(
  { userId: user.id, action: 'login' },
  'User logged in successfully'
);

// ❌ Bad: Plain string
logger.info('User logged in');
```

### Log Levels

```typescript
// DEBUG: Detailed diagnostic info
logger.debug({ query: sql }, 'Executing database query');

// INFO: General informational messages
logger.info({ orderId: order.id }, 'Order created');

// WARN: Warning messages
logger.warn({ attempt: retries }, 'Retry attempt');

// ERROR: Error messages
logger.error({ error, userId }, 'Failed to process payment');

// FATAL: Application crashes
logger.fatal({ error }, 'Database connection lost');
```

### Sensitive Data

```typescript
// ❌ Bad: Logging sensitive data
logger.info({ password: user.password }, 'User created');

// ✅ Good: Redact sensitive fields
logger.info(
  { userId: user.id, email: user.email },
  'User created'
);
```

---

## Environment Variables

### Naming Convention

```bash
# Public (exposed to client)
NEXT_PUBLIC_SITE_URL=https://tenchiflux.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=tenchiflux.com

# Private (server-only)
RESEND_API_KEY=re_xxx
DATABASE_URL=postgresql://...
JWT_SECRET=xxx
```

### Validation

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export const env = envSchema.parse(process.env);

// Usage in API routes
import { env } from '@/lib/env';
const apiKey = env.RESEND_API_KEY; // Type-safe!
```

---

## Security Standards

### Input Sanitization

```typescript
// Always validate and sanitize user input
const sanitizeHtml = (input: string) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
};
```

### Rate Limiting

```typescript
// Example with Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  // ... continue with request
}
```

### CORS

```typescript
// app/api/public-data/route.ts
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: 'public' });

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');

  return response;
}
```

---

## Email Integration (Resend)

### Best Practices

```typescript
import { Resend } from 'resend';
import pino from 'pino';

const resend = new Resend(process.env.RESEND_API_KEY);
const logger = pino();

export async function sendContactEmail(data: ContactFormData) {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      replyTo: data.email,
      subject: `Contact Form: ${data.name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    if (response.error) {
      logger.error({ error: response.error }, 'Failed to send email');
      throw new Error('Email send failed');
    }

    logger.info({ emailId: response.data?.id }, 'Email sent successfully');
    return response;
  } catch (error) {
    logger.error({ error }, 'Unexpected error sending email');
    throw error;
  }
}
```

---

## Testing API Routes

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/contact/route';

describe('POST /api/contact', () => {
  it('validates email format', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John',
        email: 'invalid-email',
        message: 'Hello',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('email');
  });

  it('sends email on valid input', async () => {
    const mockSend = vi.fn().mockResolvedValue({ data: { id: '123' } });
    vi.mock('resend', () => ({
      Resend: vi.fn(() => ({
        emails: { send: mockSend },
      })),
    }));

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John',
        email: 'john@example.com',
        message: 'Hello, this is a test message',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(mockSend).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="message"]', 'This is a test message');

  await page.click('button[type="submit"]');

  await expect(page.getByText(/thanks for reaching out/i)).toBeVisible();
});
```

---

## Database Integration (Future)

When adding a database, follow these patterns:

### ORM (Drizzle/Prisma)

```typescript
// db/schema.ts (Drizzle example)
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Connection Pooling

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});

export { pool };
```

---

## Monitoring & Observability

### Sentry Integration

```typescript
// instrumentation.ts
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

### Performance Monitoring

```typescript
import { performance } from 'perf_hooks';

export async function POST(request: NextRequest) {
  const start = performance.now();

  // ... process request ...

  const duration = performance.now() - start;
  logger.info({ duration }, 'Request processed');

  return NextResponse.json({ success: true });
}
```

---

## API Documentation

### JSDoc for API Routes

```typescript
/**
 * POST /api/contact
 * 
 * Submit a contact form inquiry
 * 
 * @param {ContactFormData} body - Contact form data
 * @param {string} body.name - Name (min 2 chars)
 * @param {string} body.email - Email address
 * @param {string} body.message - Message (min 10 chars)
 * @param {string} [body.brief] - Optional project brief
 * 
 * @returns {Promise<NextResponse>} Success/error response
 * 
 * @example
 * ```bash
 * curl -X POST https://tenchiflux.com/api/contact \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "message": "I'd like to discuss a project"
 *   }'
 * ```
 */
export async function POST(request: NextRequest) {
  // ...
}
```

---

## Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Documentation](https://zod.dev)
- [Pino Documentation](https://getpino.io)
- [Resend Documentation](https://resend.com/docs)
- [HTTP Status Codes](https://httpstatuses.com)

