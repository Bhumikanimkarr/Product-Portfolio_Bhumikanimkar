import type { Project } from '@/data/projects'
import { ProjectVisual } from '@/components/site/project-visual'
import { Reveal } from '@/components/site/reveal'

export function CaseHero({ project }: { project: Project }) {
  const { caseStudy: cs } = project
  const meta = [
    { label: 'Role', value: cs.meta.role },
    { label: 'Duration', value: cs.meta.duration },
    { label: 'Team', value: cs.meta.team },
    { label: 'Platform', value: cs.meta.platform },
  ]

  return (
    <header className="mx-auto max-w-6xl px-5 pb-12 pt-16 md:px-8 md:pt-24">
      <Reveal className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-brand">
            {project.category}
          </span>
          <span className="rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Case study
          </span>
        </div>
        <h1 className="text-balance text-6xl font-semibold leading-[0.95] tracking-tighter md:text-8xl lg:text-9xl">
          {project.title}
        </h1>
        <div className="grid gap-6 md:grid-cols-12">
          <p className="font-serif text-2xl italic text-muted-foreground md:col-span-4 md:text-3xl">
            {project.tagline}
          </p>
          <p className="text-pretty text-lg leading-relaxed md:col-span-8 md:text-xl">
            {cs.executiveSummary}
          </p>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {m.label}
              </dt>
              <dd className="mt-1 text-sm font-medium">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={200} className="mt-10">
        <div className="rounded-[2rem] border bg-card p-3 shadow-xl md:p-4">
          <ProjectVisual visual={project.visual} priority className="aspect-[16/9] rounded-[1.5rem]" />
        </div>
      </Reveal>
    </header>
  )
}

export function ImpactStrip({ project }: { project: Project }) {
  return (
    <section aria-label="Impact metrics" className="mx-auto max-w-6xl px-5 md:px-8">
      <Reveal>
        <dl className="grid divide-y overflow-hidden rounded-3xl bg-ink text-primary-foreground md:grid-cols-3 md:divide-x md:divide-y-0 [&>*]:border-white/10">
          {project.caseStudy.impact.map((m) => (
            <div key={m.label} className="flex flex-col gap-2 p-8 md:p-10">
              <dd className="text-5xl font-semibold tracking-tighter text-brand md:text-6xl">{m.value}</dd>
              <dt className="text-sm text-primary-foreground/70">{m.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
