import type { ReactElement } from "react"

import Image from "next/image"

import { ContactForm } from "../_components/ContactForm"
import { CheckIcon } from "../_components/CheckIcon"
import { absoluteUrl, buildMetadata, createFaqJsonLd } from "../_lib/seo"
import { CTA_FEATURES } from "../page"

const STORY_PARAGRAPHS = [
  "For years, we honed our craft in Kentucky, focusing on high-end residential projects and complex installations. We saw an opportunity to bring that commitment to excellence to the vibrant communities of Florida and are thrilled to call Groveland home.",
  "As proud new residents of Lake County, we bring traditional craftsmanship together with Central Florida design sensibilities. Our move allows us to combine meticulous preparation, laser-straight layout, and durable finishes with the region’s unique architectural style.",
]

const DIFFERENCE_POINTS = [
  {
    title: "Meticulous Preparation",
    description:
      "A lasting installation starts beneath the surface. We ensure every substrate is sound, waterproof, and perfectly prepared before tiling begins.",
  },
  {
    title: "Technical Precision",
    description:
      "Laser-straight lines, consistent grout joints, and truly flat surfaces are the hallmarks of our work—no shortcuts, no excuses.",
  },
  {
    title: "Lasting Results",
    description:
      "We protect your investment with high-performance materials and clean execution so your tilework continues to impress for years.",
  },
]

const WHAT_WE_DO = [
  {
    title: "Bathroom Tile Installation",
    description: "From classic layouts to spa-level showers and statement features.",
    icon: "bathroom",
  },
  {
    title: "Kitchen Backsplashes",
    description: "Designed for everyday durability and elevated style.",
    icon: "kitchen",
  },
  {
    title: "Tile Repairs & Rework",
    description: "Crack fixes, grout issues, and water damage remediation.",
    icon: "repair",
  },
  {
    title: "Demolition & Surface Prep",
    description: "Tidy removal and prep that protect your home and set the stage for a flawless install.",
    icon: "prep",
  },
]

const FAQS = [
  {
    question: "Do you have a team that regularly works in Clermont, FL?",
    answer:
      "We're in Clermont weekly and our shop borders Clermont and Groveland. Use the About page form or Contact page to schedule an estimate.",
  },
  {
    question: "What does three generations of experience change for my project?",
    answer:
      "Better prep, tighter layouts, cleaner grout lines, and fewer callbacks—craftsmanship passed down and refined.",
  },
  {
    question: "Do you handle demolition and clean job sites?",
    answer:
      "Yes—tidy demo, dust control, and daily cleanup are part of our process.",
  },
  {
    question: "Do you provide tile‑layout mockups or sample boards (including grout colors and trims) before we commit?",
    answer:
      "Yes—we can create sample boards with your tile, grout, and trim selections so you can visualize the final look before installation begins. This helps ensure you're confident in your choices.",
  },
  {
    question: "What factors most affect timeline (prep requirements, cure times, material lead times)?",
    answer:
      "Prep work (leveling, waterproofing) can add days; thinset and grout need 24-48 hours to cure between steps; and specialty tile or trim may require 1-2 weeks to order. We map out these factors in your estimate.",
  },
  {
    question: "Where is your Groveland shop, and do you provide on‑site estimates in Clermont and Winter Garden?",
    answer:
      "Our shop is at 1195 Greenley Ave in Groveland, FL. We provide free on-site estimates throughout Clermont, Winter Garden, Minneola, and surrounding Lake County communities.",
  },
]

export const metadata = buildMetadata({
  title: "About Aesthetic Tile | Three Generations of Tile Craftsmanship",
  description:
    "Learn how Aesthetic Tile combines three generations of expertise with owner-led service for bathroom, kitchen, and outdoor tile projects across Central Florida.",
  path: "/about",
  image: "/images/AboutUs-NoText.png",
})

export default function AboutPage() {
  return (
    <div className="pb-24">
      <AboutHero />
      <DifferenceSection />
      <AboutStory />
      <WhatWeDoSection />
      <CraftsmanshipShowcase />
      <AboutCta />
      <FaqSection />
    </div>
  )
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/AboutUs-NoText.png"
          alt="Aesthetic Tile team installing a kitchen backsplash tile in Central Florida home"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-6 px-6 py-24 text-center text-white">
        <h1 className="text-4xl font-semibold sm:text-5xl">About Aesthetic Tile</h1>
        <p className="text-lg text-white/80">Family owned. Florida based. Three generations strong.</p>
      </div>
    </section>
  )
}

function AboutStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl space-y-16 px-6">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 backdrop-blur-sm">
            Our Foundation
          </div>
          <h2 className="text-4xl font-semibold text-white sm:text-5xl">
            Our Story: A Legacy of Craftsmanship <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">Moves to Groveland</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
            The foundation of Aesthetic Tile rests on <span className="font-semibold text-purple-400">three generations</span> of specialized knowledge. What began as a dedicated family trade has evolved into a professional tile company trusted by discerning homeowners, interior designers, and custom builders who demand superior quality.
          </p>
        </div>

        <div className="grid gap-10 overflow-hidden rounded-3xl border-2 border-purple-500/20 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-sm md:grid-cols-2 md:items-center md:p-10">
          <div className="space-y-5 text-base leading-7 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">A New Chapter in the Sunshine State</h3>
            </div>
            {STORY_PARAGRAPHS.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "text-slate-200" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/50 ring-2 ring-purple-500/30">
            <Image
              src="/images/Brad.webp"
              alt="Brad from Aesthetic Tile installing bathroom tile in Groveland, FL home"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { number: "3", label: "Generations", sublabel: "of expertise" },
            { number: "100%", label: "Owner-Led", sublabel: "installations" },
            { number: "5★", label: "Rated", sublabel: "on Google" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 text-center backdrop-blur-sm transition-all hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="text-4xl font-bold text-purple-400">{stat.number}</div>
                <div className="mt-2 text-base font-semibold text-white">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DifferenceSection() {
  const iconMap: Record<string, ReactElement> = {
    "Meticulous Preparation": (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    "Technical Precision": (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
      </svg>
    ),
    "Lasting Results": (
      <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  }

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-br from-purple-500 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-bl from-slate-500 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-16 px-6">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 ring-1 ring-purple-500/20">
            Why Choose Us
          </div>
          <h2 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            The Aesthetic Tile <span className="text-purple-600">Difference</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
            We combine generational expertise with disciplined process so every project feels elevated from the first consultation to the final clean up.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {DIFFERENCE_POINTS.map((point, index) => (
            <article
              key={point.title}
              className="group relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-gradient-to-br from-white to-slate-50/50 p-8 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-2 hover:border-purple-100 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Decorative corner accent */}
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-purple-500/10 to-slate-500/5 blur-3xl transition-transform group-hover:scale-150" />
              
              {/* Number badge */}
              <div className="absolute left-6 top-6 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-purple-500/30">
                {index + 1}
              </div>

              <div className="relative pt-14">
                {/* Icon */}
                <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-slate-50 p-3 text-purple-600 ring-1 ring-slate-200 transition-all group-hover:bg-purple-50 group-hover:ring-purple-200">
                  {iconMap[point.title]}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-slate-900">{point.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatWeDoSection() {
  const iconMap: Record<string, ReactElement> = {
    bathroom: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="13" width="20" height="9" rx="2" />
        <path d="M12 13V7M12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4C15 5.65685 13.6569 7 12 7Z" />
        <path d="M6 22V17M18 22V17" />
      </svg>
    ),
    kitchen: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    repair: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    prep: (
      <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M20 7h-9M14 17H5M17 3v18M10 3v18" />
        <circle cx="17" cy="7" r="3" />
        <circle cx="10" cy="17" r="3" />
      </svg>
    ),
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-50 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(20,184,166,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_85%,rgba(148,163,184,0.04),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-5xl space-y-10 px-6">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            Our Services
          </div>
          <h2 className="text-3xl font-semibold text-slate-900">What We Do</h2>
          <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600">
            We deliver custom tile installation with clean execution and lasting results. Every project receives uncompromising attention to detail—because great tile work is never an accident.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {WHAT_WE_DO.map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white p-6 shadow-lg shadow-slate-900/5 transition-all hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-purple-400/10 to-purple-600/10 blur-2xl transition-transform group-hover:scale-150" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110">
                  {iconMap[item.icon]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CraftsmanshipShowcase() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <figure className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10 ring-4 ring-slate-100 transition-all hover:ring-purple-200">
          <Image
            src="/images/tile-installer-2.webp"
            alt="Professional tile installer carefully working on a bathroom tile installation project in Central Florida"
            width={1200}
            height={800}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent transition-opacity group-hover:from-slate-900/70" />
          
          {/* Floating badge */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
            <div className="rounded-2xl border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">Professional Craftsmanship</p>
              <p className="mt-1 text-2xl font-bold text-white">Every Project, Every Time</p>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}

function FaqSection() {
  const faqJsonLd = createFaqJsonLd({
    url: absoluteUrl("/about"),
    name: "Aesthetic Tile About Page FAQs",
    faqs: FAQS,
  })

  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl space-y-10 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {FAQS.map((faq) => (
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

function AboutCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.webp"
          alt="Modern porcelain kitchen backsplash tile installation in Groveland, FL home by Aesthetic Tile"
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

          <ContactForm subject="Aesthetic Tile — About Page Inquiry" showPhone className="backdrop-blur-sm" />
        </div>
      </div>
    </section>
  )
}

