'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

/**
 * Contact form validation schema
 */
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  brief: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

/**
 * ContactForm - Contact form with validation and API submission
 * Uses Resend via API route
 */
export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: 'submitting' });
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      brief: formData.get('brief') as string,
    };

    // Validate
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setFormState({ status: 'idle' });
      return;
    }

    // Submit to API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormState({
        status: 'success',
        message: 'Thanks for reaching out! We'll get back to you soon.',
      });

      // Reset form
      e.currentTarget.reset();
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again or email us directly.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="mt-2"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="mt-2"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          required
          className="mt-2"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Brief (optional) */}
      <div>
        <Label htmlFor="brief">Project Brief (optional)</Label>
        <Textarea
          id="brief"
          name="brief"
          placeholder="Share more details: timeline, budget, references, etc."
          className="mt-2"
          rows={4}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="flux"
        size="lg"
        disabled={formState.status === 'submitting'}
        className="w-full"
      >
        {formState.status === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status messages */}
      {formState.message && (
        <div
          className={`p-4 rounded-md text-sm ${
            formState.status === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
          role="alert"
        >
          {formState.message}
        </div>
      )}
    </form>
  );
}

