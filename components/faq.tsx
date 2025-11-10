'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * FAQ - Frequently Asked Questions
 * Accordion component with 5 Tenchi-specific questions
 */
export function FAQ() {
  const faqs = [
    {
      question: 'Who owns the rights to the final content?',
      answer:
        'You do. All rights to final deliverables transfer to you upon project completion. We retain the right to showcase work in our portfolio (unless otherwise agreed in writing).',
    },
    {
      question: 'What AI tools and workflows do you use?',
      answer:
        'We use a combination of leading AI video generation tools (Runway, Pika, Kling), image generators (Midjourney, DALL·E, Stable Diffusion), and custom pipelines. Our workflows blend AI outputs with traditional editing, color grading, and sound design in industry-standard software.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "Timeline depends on scope. A 30-second experimental short can take 1-2 weeks. A 3-minute cinematic piece with custom world-building and iterative revisions typically takes 4-6 weeks. We'll provide a detailed timeline during scoping.",
    },
    {
      question: 'Do you collaborate with clients during production?',
      answer:
        "Absolutely. We involve you at key milestones: script/concept review, style frames, rough cuts, and final delivery. You'll have structured feedback opportunities at each stage to ensure the final piece matches your vision.",
    },
    {
      question: "What's the ballpark pricing for a project?",
      answer:
        'Short-form experimental pieces (15-30 seconds) start around $2,500. Fully produced cinematic shorts (1-3 minutes) range from $8,000-$25,000+ depending on complexity, custom assets, and revisions. Contact us for a detailed quote based on your specific needs.',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Frequently Asked <span className="text-flux">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with Tenchi Flux Studios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

