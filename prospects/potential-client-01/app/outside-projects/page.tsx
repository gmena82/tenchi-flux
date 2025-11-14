import type { ReactElement } from "react"

import Image from "next/image"

import { CheckIcon } from "../_components/CheckIcon"
import { ContactForm } from "../_components/ContactForm"
import { absoluteUrl, buildMetadata, createFaqJsonLd, createServiceJsonLd } from "../_lib/seo"
import { CTA_FEATURES } from "../page"

export const metadata = buildMetadata({
  title: "Outdoor Tile Projects | Patios, Lanais & Pool Decks | Aesthetic Tile",
  description:
    "Explore outdoor tile services from Aesthetic Tile. We build patios, lanais, pool decks, and outdoor kitchens across Groveland, Clermont, Minneola, and Central Florida.",
  path: "/outside-projects",
  image: "/images/services/outside-projects.webp",
})

const OUTDOOR_FAQS = [
  {
    question: "Do you install porcelain tile patios in Clermont and Groveland?",
    answer:
      "Yes—porcelain tile is a popular choice for Clermont, Groveland, and Minneola patios because it resists fading, moisture, and Florida heat swings.",
  },
  {
    question: "How do you prep outdoor slabs so tile lasts through Florida storms?",
    answer:
      "We check for slope, drainage, and existing coatings, then use crack-isolation membranes, movement joints, and high-performance thinsets rated for exteriors.",
  },
  {
    question: "Can you tile covered lanais or screened porches without removing furniture?",
    answer:
      "We coordinate staging so your lanai or porch stays usable—moving sections at a time and keeping dust contained while the tile cures.",
  },
  {
    question: "Do you offer slip-resistant options for pool surrounds?",
    answer:
      "Absolutely. We specify textured porcelain and sealers designed for wet areas so pool decks stay comfortable and safe year-round.",
  },
  {
    question: "Will outdoor tile crack when temperatures shift?",
    answer:
      "We include expansion joints, install anti-fracture membranes, and follow TCNA EJ171 guidelines so tile handles thermal swings without cracking.",
  },
  {
    question: "Can you refresh old concrete patios with tile?",
    answer:
      "Yes—we clean, scarify if needed, repair cracks, and then install tile that gives dated concrete new life without a full demo.",
  },
]

const SHOWCASE_FEATURES = [
  {
    title: "Screened Lanais",
    detail: "Humidity-ready installation with slope corrections and discreet drains at thresholds.",
    icon: "lanai",
  },
  {
    title: "Covered Patios",
    detail: "Porcelain tiles that mirror indoor finishes so your living room flows outdoors.",
    icon: "patio",
  },
  {
    title: "Pool Decks",
    detail: "Slip-resistant tile with expansion joints to handle sun, splash zones, and cleaning routines.",
    icon: "pool",
  },
  {
    title: "Outdoor Kitchens",
    detail: "Heat-rated tiles around grills and cooktops with sealed grout for easy cleanup after BBQs.",
    icon: "kitchen",
  },
]

const CHECKPOINTS = [
  "Porcelain, stone-look, and patterned pavers rated for exterior use",
  "Sheltered staging to protect landscaping and outdoor kitchens",
  "Owner-installed oversight on every pour, membrane, and grout joint",
  "Movement joints and crack-isolation membranes for Florida weather",
]

export default function OutsideProjectsPage() {
  const serviceJsonLd = createServiceJsonLd({
    url: absoluteUrl("/outside-projects"),
    name: "Outdoor Tile Projects",
    description:
      "Outdoor tile installation for patios, lanais, pool decks, and outdoor kitchens designed for Florida weather.",
    serviceType: "Outdoor Tile Installation",
    areaServed: ["Groveland, FL", "Clermont, FL", "Minneola, FL", "Winter Garden, FL", "Orlando, FL"],
  })

  return (
    <>
      <div className="space-y-12 pb-24">
        <HeroSection />
        <IntroSection />
        <OutdoorHighlightsSection />
        <SeoSection />
        <CallToActionSection />
        <FaqSection />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/services/outside-projects.webp"
          alt="Porcelain outdoor patio tile installation with brick exterior in Central Florida home by Aesthetic Tile"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col justify-center gap-6 px-6 py-24 text-center text-white">
        <h1 className="text-4xl font-semibold sm:text-5xl">Outdoor Tile Installation in Clermont & Groveland, FL</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/90">
          Aesthetic Tile installs outdoor tile for patios, lanais, pool decks, and outdoor kitchens across Clermont, Groveland, and Lake County. Florida's sun, rain, and humidity demand tile that can handle thermal expansion, proper drainage, and slip resistance. We use porcelain rated for exteriors, install anti-fracture membranes, plan movement joints, and coordinate slope to prevent standing water. Whether you're extending your indoor aesthetic outdoors or refreshing an existing concrete slab, our owner-led crew delivers installations designed to perform beautifully through years of Central Florida weather.
        </p>
      </div>
    </section>
  )
}

function IntroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
        <div className="relative h-80 overflow-hidden rounded-2xl">
          <Image
            src="/images/services/outside-projects.webp"
            alt="Large-format porcelain tile installation on an outdoor patio in Clermont and Groveland, FL"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
          />
        </div>
        <div className="space-y-5 text-base leading-7 text-slate-600">
          <h2 className="text-3xl font-semibold text-slate-900">Transform Your Outdoor Spaces into a Sanctuary</h2>
          <p>
            Outdoor tile brings the comfort of your interior rooms to lanais, covered patios, and porches. We install durable surfaces that resist fading, moisture, and everyday wear so you can relax outside year-round.
          </p>
          <p>
            Owner-installed oversight means the same professionals who walk your project in Groveland or Clermont will set every tile. We follow TCNA exterior guidelines, continuing education, and manufacturer-led waterproofing workshops to match the right membranes, mortars, and sealants to your space and budget.
          </p>
          <p>
            Our team delivers precise cuts around columns, outdoor kitchens, and screen enclosures, ensuring expansion joints stay hidden while protecting the installation from Central Florida heat and afternoon thunderstorms.
          </p>
        </div>
      </div>
    </section>
  )
}

function OutdoorHighlightsSection() {
  const iconMap: Record<string, ReactElement> = {
    lanai: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    patio: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 21h18M4 18h16M6 18v-4M10 18v-4M14 18v-4M18 18v-4M4 14h16M12 3L4 14M12 3l8 11" />
      </svg>
    ),
    pool: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M2 15c1.67-2.08 3.34-3.12 5-3.12s3.33 1.04 5 3.12c1.67-2.08 3.34-3.12 5-3.12s3.33 1.04 5 3.12M2 19c1.67-2.08 3.34-3.12 5-3.12s3.33 1.04 5 3.12c1.67-2.08 3.34-3.12 5-3.12s3.33 1.04 5 3.12M12 8a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
    kitchen: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 3h18v18H3zM8 12l3-3 3 3M14 12h3M7 12h3M3 8h18M3 16h18" />
      </svg>
    ),
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-50 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(20,184,166,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgba(148,163,184,0.04),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            Outdoor Expertise
          </div>
          <h3 className="mt-6 text-3xl font-semibold text-slate-900">What We Build Outside</h3>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Outdoor tile projects demand careful planning for slope, drainage, and movement. We translate decades of interior craftsmanship to Florida exteriors, pairing durable porcelain and stone-look tile with proper expansion strategy.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {SHOWCASE_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white p-6 shadow-lg shadow-slate-900/5 transition-all hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br from-purple-400/10 to-purple-600/10 blur-2xl transition-transform group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 text-white shadow-lg shadow-purple-500/30">
                      {iconMap[item.icon]}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border-2 border-purple-100 bg-gradient-to-br from-white via-purple-50/30 to-white p-8 shadow-xl shadow-purple-500/5">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              Installation Checklist
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">Florida-Ready Standards</h3>
            <p className="text-sm leading-6 text-slate-600">
              Every exterior project in Clermont, Minneola, and Groveland receives the same disciplined prep we use indoors—plus the details that let tile breathe outdoors.
            </p>
            <ul className="space-y-4">
              {CHECKPOINTS.map((checkpoint, index) => (
                <li key={checkpoint} className="flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-purple-500/30">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-slate-700">{checkpoint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SeoSection() {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      {/* Subtle decorative elements */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-32 translate-y-32 rounded-full bg-gradient-to-br from-slate-500/5 to-transparent blur-3xl" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border-2 border-slate-100 bg-gradient-to-br from-white via-slate-50/30 to-white p-10 shadow-xl shadow-slate-900/5 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 ring-1 ring-purple-500/20">
              Service Area
            </div>
          </div>
          
          <h3 className="mb-6 text-center text-3xl font-semibold text-slate-900 sm:text-4xl">
            Outdoor Tile Pros Serving Lake & West Orange Counties
          </h3>
          
          <p className="mx-auto max-w-3xl text-center text-base leading-8 text-slate-600">
            Aesthetic Tile installs patios, porches, pool decks, and outdoor kitchens throughout Groveland, Clermont, Winter Garden, Minneola, and the wider Lake County area. We coordinate with builders, screen companies, and designers so your outside projects stay on schedule and on budget. Whether you need porcelain tile that matches your interior floors or a textured surface for a breezy lanai, our owner-led crew delivers the waterproofing, drainage, and detailing Central Florida homes demand.
          </p>

          {/* Location highlights */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {["Groveland", "Clermont", "Winter Garden", "Minneola", "Lake County"].map((location) => (
              <div
                key={location}
                className="rounded-full border border-purple-200 bg-purple-50/50 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm transition-all hover:border-purple-300 hover:bg-purple-100/50 hover:shadow-md"
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CallToActionSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.webp"
          alt="Contact Aesthetic Tile for outdoor patio and lanai tile installation projects in Clermont and Groveland, FL"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl font-semibold">Ready to Refresh Your Outdoor Space?</h2>
            <p className="text-base leading-7 text-white/80">
              Schedule an estimate for your patio, lanai, or pool surround. We bring samples, discuss waterproofing strategies, and outline a step-by-step plan tailored to your property.
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

          <ContactForm subject="Aesthetic Tile — Outside Projects Inquiry" className="backdrop-blur-sm" />
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const faqJsonLd = createFaqJsonLd({
    url: absoluteUrl("/outside-projects"),
    name: "Aesthetic Tile Outdoor Projects FAQs",
    faqs: OUTDOOR_FAQS,
  })

  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {OUTDOOR_FAQS.map((faq) => (
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
