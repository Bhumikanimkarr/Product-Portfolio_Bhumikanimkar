import type { ReactNode } from 'react'
import { ArrowRight, Quote } from 'lucide-react'
import type { CaseStudy } from '@/data/projects'
import { Reveal } from '@/components/site/reveal'
import { SolutionTabs } from './solution-tabs'

function CaseSection({
  id,
  number,
  label,
  title,
  intro,
  children,
}: {
  id: string
  number: string
  label: string
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              {number} — {label}
            </p>
            <h2 id={`${id}-title`} className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
              {title}
            </h2>
            {intro && <p className="text-pretty leading-relaxed text-muted-foreground">{intro}</p>}
          </div>
        </Reveal>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}

export function ProblemSection({ problem }: { problem: CaseStudy['problem'] }) {
  return (
    <CaseSection id="problem" number="01" label="The problem" title="What was broken" intro={problem.intro}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {problem.points.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 80} className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
            <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </Reveal>
        ))}
      </ul>
    </CaseSection>
  )
}

export function ResearchSection({ research }: { research: CaseStudy['research'] }) {
  return (
    <CaseSection id="research" number="02" label="Research & insights" title="What I learned" intro={research.intro}>
      <Reveal>
        <ul aria-label="Research methods" className="flex flex-wrap gap-2">
          {research.methods.map((m) => (
            <li key={m} className="rounded-full border bg-card px-3 py-1.5 text-sm">
              {m}
            </li>
          ))}
        </ul>
      </Reveal>
      <ul className="mt-8 flex flex-col gap-4">
        {research.insights.map((ins, i) => (
          <Reveal
            as="li"
            key={ins.title}
            delay={i * 80}
            className="grid gap-3 rounded-2xl border bg-card p-6 md:grid-cols-12 md:gap-6"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:col-span-3">
              Insight {String(i + 1).padStart(2, '0')}
              <span className="mt-1 block text-brand">{ins.source}</span>
            </p>
            <div className="md:col-span-9">
              <h3 className="text-lg font-semibold tracking-tight">{ins.title}</h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">{ins.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      {research.quote && (
        <Reveal className="mt-8">
          <figure className="rounded-2xl bg-brand p-8 text-brand-foreground md:p-10">
            <Quote className="size-6 opacity-70" aria-hidden />
            <blockquote className="mt-4 text-balance font-serif text-2xl italic leading-snug md:text-3xl">
              {research.quote.text}
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-widest opacity-80">
              {research.quote.source}
            </figcaption>
          </figure>
        </Reveal>
      )}
    </CaseSection>
  )
}

export function ProcessSection({ process }: { process: CaseStudy['process'] }) {
  return (
    <CaseSection
      id="process"
      number="03"
      label="Design process & IA"
      title="How it fits together"
      intro={process.intro}
    >
      <Reveal>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Core workflow</h3>
        <ol className="mt-4 flex flex-col gap-2 md:flex-row md:items-stretch">
          {process.flow.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center gap-2 md:flex-1 md:flex-row">
              <div className="flex h-full w-full flex-col gap-1 rounded-2xl border bg-card p-4">
                <span className="flex size-7 items-center justify-center rounded-full bg-ink font-mono text-xs text-primary-foreground">
                  {i + 1}
                </span>
                <p className="mt-2 text-sm font-semibold leading-tight">{step.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
              {i < process.flow.length - 1 && (
                <ArrowRight className="size-4 shrink-0 rotate-90 text-brand md:rotate-0" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Information architecture</h3>
        <div className="mt-4 rounded-2xl border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {process.architecture.map((node) => (
              <div key={node.group} className="flex flex-col">
                <p className="rounded-xl bg-ink px-3 py-2 text-center text-sm font-medium text-primary-foreground">
                  {node.group}
                </p>
                <ul className="ml-4 mt-2 flex flex-col gap-1.5 border-l-2 border-dashed border-brand/40 pl-4">
                  {node.items.map((item) => (
                    <li key={item} className="relative rounded-lg bg-secondary px-3 py-1.5 text-xs">
                      <span aria-hidden className="absolute -left-4 top-1/2 h-px w-4 bg-brand/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Key UX decisions</h3>
        <ul className="mt-4 flex flex-col divide-y rounded-2xl border bg-card">
          {process.decisions.map((d) => (
            <li key={d.title} className="flex gap-4 p-5">
              <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
              <div>
                <p className="font-semibold tracking-tight">{d.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseSection>
  )
}

export function SolutionSection({ solution }: { solution: CaseStudy['solution'] }) {
  return (
    <section
      id="solution"
      aria-labelledby="solution-title"
      className="bg-ink py-20 text-primary-foreground md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">04 — Solution walkthrough</p>
          <h2 id="solution-title" className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            The final <span className="font-serif font-normal italic text-brand">experience.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <SolutionTabs features={solution} />
        </Reveal>
      </div>
    </section>
  )
}

export function TakeawaysSection({ takeaways }: { takeaways: CaseStudy['takeaways'] }) {
  return (
    <CaseSection id="takeaways" number="05" label="Takeaways & impact" title="What changed">
      <ul className="grid gap-4 sm:grid-cols-3">
        {takeaways.impact.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 80} className="flex flex-col gap-2 rounded-2xl border border-brand/25 bg-brand/5 p-6">
            <h3 className="font-semibold tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-10">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Key learnings</h3>
        <ul className="mt-4 flex flex-col gap-6">
          {takeaways.learnings.map((l, i) => (
            <li key={l.title} className="grid gap-2 border-t pt-6 md:grid-cols-12">
              <span className="font-serif text-3xl italic text-brand md:col-span-2">{`0${i + 1}`}</span>
              <div className="md:col-span-10">
                <p className="text-xl font-semibold tracking-tight">{l.title}</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">{l.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseSection>
  )
}
