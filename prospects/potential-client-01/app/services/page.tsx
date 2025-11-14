import Image from "next/image"
import Link from "next/link"

import { ContactForm } from "../_components/ContactForm"
import { CheckIcon } from "../_components/CheckIcon"
import { absoluteUrl, buildMetadata, createFaqJsonLd, createServiceJsonLd } from "../_lib/seo"
import { CTA_FEATURES, SERVICE_CARDS } from "../page"

const SERVICE_SECTIONS = SERVICE_CARDS.map((service) => {
  const details: Record<string, string> = {
    "/kitchen-backsplashes":
      "A new backsplash can transform your kitchen. We install durable, easy-to-clean surfaces that protect your walls and elevate your home's design.",
    "/bathroom-shower":
      "From spa-like showers to elegant bathroom floors, we create tile installations that combine beauty and functionality for years of enjoyment.",
    "/floor-tile-installation":
      "Meticulous floor tile installation for any room in your home. Expect a level, durable surface that stands up to daily life while enhancing value.",
    "/fireplaces":
      "Turn your fireplace into a statement piece with custom tilework. We handle contemporary, traditional, and statement surrounds with ease.",
    "/outside-projects":
      "Extend your living space outdoors with durable tile for patios, lanais, pool decks, and outdoor kitchens. Built to withstand Florida's climate.",
    "/special-projects":
      "From custom mosaics to outdoor patios, we bring creativity and precision to unique tile applications tailored to your vision.",
  }

  const href = (service as typeof service & { href?: string }).href
  const descriptionFromMap = href ? details[href] : undefined

  return {
    ...service,
    href,
    description: descriptionFromMap ?? "Premium tile craftsmanship for your next project.",
  }
})

const SERVICES_FAQS = [
  {
    question: "Can I book you specifically for a Clermont home?",
    answer: "Yes—Clermont is a key service area; we'll confirm access, parking, and HOA rules if relevant.",
  },
  {
    question: "What services do you provide beyond installation?",
    answer: "Backsplashes, showers, floors, fireplaces, specialty work—plus surface prep and selective repairs.",
  },
  {
    question: "Which waterproofing systems do you specify for showers (e.g., Schluter®, Wedi®), and when do you recommend each?",
    answer: "We use Schluter® for most residential showers, Wedi® for complex niches or steam rooms, and other approved membranes based on substrate and budget. We'll recommend the best system during your estimate.",
  },
  {
    question: "Do you offer material guidance or source tile?",
    answer: "We can spec materials and coordinate with your preferred suppliers or designers.",
  },
  {
    question: "What's your current lead time for Clermont jobs, and how does scheduling work after the estimate?",
    answer: "Lead times vary by season and project scope, typically 2-4 weeks. After your estimate is approved, we lock in materials and schedule your start date with clear milestones.",
  },
  {
    question: "What Florida licensing and insurance coverage do you carry for tile installs (license class, liability, and workers' comp)?",
    answer: "We carry full general liability insurance and workers' compensation coverage. All work is performed by licensed, insured professionals to protect your home and our team.",
  },
]

export const metadata = buildMetadata({
  title: "Tile Installation Services in Central Florida | Aesthetic Tile",
  description:
    "Explore professional tile services for kitchens, bathrooms, floors, fireplaces, outdoor spaces, and specialty projects across Groveland, Clermont, and Central Florida.",
  path: "/services",
  image: "/images/img/hero-backsplash.png",
})

export default function ServicesPage() {
  const serviceJsonLd = createServiceJsonLd({
    url: absoluteUrl("/services"),
    name: "Central Florida Tile Installation Services",
    description:
      "Professional tile installation for kitchens, bathrooms, floors, fireplaces, outdoor spaces, and specialty projects throughout Central Florida.",
    serviceType: "Tile Installation",
    areaServed: ["Groveland, FL", "Clermont, FL", "Minneola, FL", "Winter Garden, FL", "Orlando, FL"],
  })

  return (
    <>
      <div className="space-y-16 pb-24">
        <ServicesHero />
        <IntroSection />
        <StandardsAndMaterialsSection />
        <ServicesDetailSection />
        <ServicesCta />
        <FaqSection />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
    </>
  )
}

function ServicesHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/img/hero-backsplash.png"
          alt="Professional tile installation services including kitchen backsplash, bathroom shower, and floor tile in Clermont and Groveland, FL"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center gap-6 px-6 py-24 text-center text-white">
        <h1 className="text-4xl font-semibold sm:text-5xl">Expert Tile Installation Services in Central Florida</h1>
        <p className="text-lg text-white/80">
          Comprehensive tile installation for Groveland, Clermont, Minneola, Winter Garden, and the greater Orlando area. We pair meticulous preparation with precise execution for lasting results.
        </p>
        <p className="text-lg text-white/70">
          Our team understands Florida’s climate demands—from robust waterproofing against humidity to selecting durable flooring options built for everyday living.
        </p>
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-6 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-purple-600">Custom Tile Installation Services</h2>
        <p className="text-lg font-medium text-slate-900">Serving Groveland, Clermont, & Central Florida</p>
      </div>
      <p className="text-base leading-7 text-slate-600">
        Aesthetic Tile is your trusted partner for high-quality tile installation. As third-generation craftsmen, we transform homes with beautiful, durable tile work—from backsplashes and spa-ready showers to showpiece fireplaces and specialty projects. Every job receives meticulous prep, clean job sites, and flawless finishes built to last.
      </p>
    </section>
  )
}

function StandardsAndMaterialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-lg shadow-slate-900/5">
          <h2 className="text-3xl font-semibold text-slate-900">Our Installation Standards</h2>
          <p className="text-base leading-7 text-slate-600">
            We build for longevity by following industry best practices, including applicable TCNA guidelines. We use high-quality mortars, membranes, and grouts, and prioritize critical steps like substrate preparation and waterproofing (Schluter®, Wedi®, and similar systems when specified) to deliver a durable, beautiful finish.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-lg shadow-slate-900/5">
          <h2 className="text-3xl font-semibold text-slate-900">Materials We Work With</h2>
          <p className="text-base leading-7 text-slate-600">
            Ceramic, porcelain, natural stone, glass, and large-format tile—we help you choose the right material for each space, balancing aesthetics, performance, and long-term maintenance.
          </p>
        </div>
      </div>
    </section>
  )
}

function ServicesDetailSection() {
  return (
    <section className="space-y-12">
      {SERVICE_SECTIONS.map((service, index) => (
        <div
          key={service.href ?? service.label}
          className={`bg-white ${index % 2 === 1 ? "bg-slate-50" : ""}`}
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center">
            {index % 2 === 1 ? <ServiceImage service={service} /> : <ServiceContent service={service} />}
            {index % 2 === 1 ? <ServiceContent service={service} /> : <ServiceImage service={service} />}
          </div>
        </div>
      ))}
    </section>
  )
}

function ServiceContent({ service }: { service: (typeof SERVICE_SECTIONS)[number] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-slate-900">{service.label}</h3>
      <p className="text-base leading-7 text-slate-600">{service.description}</p>
      <Link
        href={service.href ?? "/contact"}
        className="inline-flex items-center gap-2 rounded-full border border-purple-500 px-5 py-2 text-sm font-semibold text-purple-600 transition hover:bg-purple-50"
      >
        {service.cta}
        <svg className="size-4" viewBox="0 0 20 20" aria-hidden>
          <path
            fill="currentColor"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          />
        </svg>
      </Link>
    </div>
  )
}

function ServiceImage({ service }: { service: (typeof SERVICE_SECTIONS)[number] }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
      <Image src={service.image} alt={`${service.label} tile installation in Clermont and Groveland, FL`} fill className="object-cover" />
    </div>
  )
}

function ServicesCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.webp"
          alt="Porcelain kitchen backsplash tile installation service in Clermont and Groveland, FL"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl font-semibold">Ready to Transform Your Space?</h2>
            <p className="text-base leading-7 text-white/80">
              Get a free estimate for your tile installation project. Professional craftsmanship, competitive pricing, and exceptional service guaranteed.
            </p>
            <div className="space-y-3">
              {CTA_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm font-semibold text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <ContactForm subject="Aesthetic Tile — Services Page Inquiry" className="backdrop-blur-sm" />
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const faqJsonLd = createFaqJsonLd({
    url: absoluteUrl("/services"),
    name: "Aesthetic Tile Services FAQs",
    faqs: SERVICES_FAQS,
  })

  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES_FAQS.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-white bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </>
  )
}

