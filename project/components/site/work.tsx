'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projectFilters, projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { ProjectVisual } from './project-visual'
import { Reveal, SectionHeading } from './reveal'

export function Work() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All')
  const visible = projects.filter((p) => filter === 'All' || p.filters.includes(filter))

  return (
    <section id="work" aria-label="Selected work" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <SectionHeading eyebrow="Selected work" title="Real problems," accent="shipped products." />

      <Reveal className="mt-10">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                filter === f
                  ? 'border-ink bg-ink text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:border-ink hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="mt-10 flex flex-col gap-6">
        {visible.map((project) => {
          const index = projects.indexOf(project)
          const flip = index % 2 === 1
          return (
            <li
              key={project.slug}
              id={project.slug}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Reveal as="article" className="group relative grid cursor-pointer gap-6 rounded-3xl border bg-card p-4 transition-shadow focus-within:ring-2 focus-within:ring-ring hover:shadow-xl md:p-6 lg:grid-cols-12 lg:gap-10">
                <div className={cn('lg:col-span-7', flip && 'lg:order-2')}>
                  <ProjectVisual
                    visual={project.visual}
                    interactive={false}
                    className="transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                </div>
                <div className="flex flex-col gap-5 lg:col-span-5 lg:py-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, '0')} / {project.category}
                  </p>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      <Link
                        href={`/work/${project.slug}`}
                        className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-1 font-serif text-xl italic text-muted-foreground">
                      {project.tagline}
                    </p>
                  </div>
                  <p className="text-pretty leading-relaxed">{project.summary}</p>
                  <dl className="flex flex-col gap-3 text-sm">
                    <div className="rounded-xl bg-secondary p-3">
                      <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        The problem
                      </dt>
                      <dd className="mt-1 leading-relaxed">{project.problem}</dd>
                    </div>
                    <div className="rounded-xl border border-brand/25 bg-brand/5 p-3">
                      <dt className="font-mono text-[11px] uppercase tracking-widest text-brand">
                        What I solved
                      </dt>
                      <dd className="mt-1 leading-relaxed">{project.solution}</dd>
                    </div>
                  </dl>
                  <dl className="mt-auto grid grid-cols-3 gap-3 border-t pt-5">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="text-xl font-semibold tracking-tight md:text-2xl">{m.value}</dd>
                        <dd className="text-xs text-muted-foreground">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-[1.03]"
                  >
                    Read case study
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
