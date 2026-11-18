import { ArrowUpRight, Plus } from 'lucide-react'
import { contact, faqs, profile } from '@/data/site'
import { Reveal, SectionHeading } from './reveal'

export function Faq() {
  return (
    <section aria-label="Quick answers" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Quick answers" title="For recruiters and" accent="hiring managers." />
        </div>
        <Reveal delay={100} className="lg:col-span-7">
          <div className="flex flex-col border-t">
            {faqs.map((f, i) => (
              <details key={f.q} className="group border-b" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-brand-foreground">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="max-w-xl pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="mx-auto max-w-6xl px-5 pb-10 pt-24 md:px-8">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-primary-foreground md:p-16">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-96 rounded-full bg-brand/30 blur-3xl"
        />
        <div className="relative flex flex-col gap-10">
          <span className="flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/70">
            <span className="size-2 rounded-full bg-emerald-400" />
            Open to new opportunities
          </span>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Have a product that needs to feel{' '}
            <span className="font-serif font-normal italic text-brand">effortless?</span>
          </h2>
          <p className="max-w-lg text-lg text-white/70">
            Full-time Product & UX roles in AI, healthcare and enterprise SaaS.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="group flex w-fit items-center gap-3 text-2xl font-medium underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-brand md:text-4xl"
          >
            {contact.email}
            <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:size-8" />
          </a>
          <ul className="flex flex-wrap gap-3">
            {contact.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <footer className="flex flex-col justify-between gap-2 px-2 pt-8 text-sm text-muted-foreground md:flex-row">
        <p>© 2026 {profile.name}</p>
        <p>{"Let's build what's next."}</p>
      </footer>
    </section>
  )
}
