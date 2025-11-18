import { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Tenchi Flux | Start a Project',
  description:
    'Get in touch with Tenchi Flux Studios to discuss your next cinematic AI commercial, brand campaign, or artistic project. Based in Los Angeles.',
};

/**
 * Contact Page - Replicating Promise.ai's simple, direct style
 */
export default function ContactPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-muted/30">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight">
            <span className="text-flux">Get in Touch</span>
          </h1>
          <p className="mt-4 md:mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Tell us about your next project, idea, or partnership opportunity.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold mb-2">General Inquiries</h2>
                <p className="text-lg text-muted-foreground">
                  Email:{' '}
                  <a href="mailto:hello@tenchiflux.com" className="text-flux hover:underline">
                    hello@tenchiflux.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold mb-2">Location</h2>
                <p className="text-lg text-muted-foreground">
                  Los Angeles, California
                  <br />
                  (Serving visionary clients globally)
                </p>
              </div>

              <div className="hidden lg:block">
                <h2 className="text-2xl font-display font-bold mb-2">Social</h2>
                <p className="text-lg text-muted-foreground space-x-3">
                  <a
                    href="https://youtube.com/@TenchiFlux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-flux hover:underline"
                  >
                    YouTube
                  </a>
                  {/* Add other social links here as needed */}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-display font-bold mb-6">
                Start a <span className="text-flux">Conversation</span>
              </h2>
              {/* You will need to ensure your ContactForm component handles the submission logic */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
