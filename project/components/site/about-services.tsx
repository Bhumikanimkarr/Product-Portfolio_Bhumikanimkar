import { profile, services } from '@/data/site'
import { Reveal, SectionHeading } from './reveal'

export function About() {
  return (
    <section id="about" aria-label="About" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-10 rounded-3xl bg-ink p-8 text-primary-foreground md:p-14 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-4 lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">About</p>
          <p className="text-pretty text-2xl leading-snug md:text-4xl">
            {profile.bio.split('Conversational AI')[0]}
            <span className="font-serif italic text-brand">
              Conversational AI, B2B Enterprise Systems and Agentic AI.
            </span>{' '}
            {profile.bio.split('Agentic AI.')[1]}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">
            {profile.location}
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-5">
          <dl className="grid h-full grid-cols-1 content-end gap-px overflow-hidden rounded-2xl bg-white/10">
            {profile.stats.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 bg-ink p-5">
                <dt className="text-sm text-white/60">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section aria-label="Services" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <SectionHeading eyebrow="What I do" title="From first sketch to" accent="shipped, measured product." />
      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 70}
            className={i === 0 ? 'lg:row-span-2' : undefined}
          >
            <div className="group flex h-full flex-col gap-4 rounded-3xl border bg-card p-6 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-primary-foreground">
              <span className="font-mono text-xs text-muted-foreground group-hover:text-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="leading-relaxed text-muted-foreground group-hover:text-white/70">{s.body}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border px-3 py-1 text-xs group-hover:border-white/20"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
