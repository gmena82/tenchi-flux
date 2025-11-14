import { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Tenchi Flux Studios. Start your AI cinema project or explore creative collaborations.',
  path: '/contact',
});

/**
 * Contact Page
 * Contact form and studio information
 */
export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
            Let&rsquo;s create <span className="text-flux">something remarkable</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you&rsquo;re ready to start a project or just curious about what&rsquo;s possible with AI
            cinema, we&rsquo;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Get in touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:hello@tenchiflux.com"
                    className="text-brand hover:underline focus-visible-ring rounded-md"
                  >
                    hello@tenchiflux.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">YouTube</h3>
                  <a
                    href="https://youtube.com/@TenchiFlux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline focus-visible-ring rounded-md"
                  >
                    @TenchiFlux
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-semibold mb-3">What to expect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Response within 1-2 business days</li>
                <li>✓ Free initial consultation call</li>
                <li>✓ Detailed project scoping and timeline</li>
                <li>✓ Transparent pricing and deliverables</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-muted/30 border">
              <h3 className="font-semibold mb-2">About Tenchi Flux Studios</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We&rsquo;re the creative AI division of Growvia Marketing, specializing in AI-powered
                cinema and storytelling. Our team blends cutting-edge AI tools with traditional
                filmmaking craft to create breakthrough content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

