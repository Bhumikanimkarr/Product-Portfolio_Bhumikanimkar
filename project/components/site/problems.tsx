'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { problems } from '@/data/site'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { ProjectVisual } from './project-visual'
import { Reveal, SectionHeading } from './reveal'

export function Problems() {
  const [active, setActive] = useState(0)
  const current = problems[active]
  const project = projects.find((p) => p.slug === current.projectSlug)

  return (
    <section aria-labelledby="problems-heading" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <SectionHeading eyebrow="Start here" title="What are you trying to" accent="solve?">
        <p className="max-w-xs text-muted-foreground">
          Hover a goal to see how I would help, with real work to back it up.
        </p>
      </SectionHeading>
      <span id="problems-heading" className="sr-only">
        What are you trying to solve?
      </span>

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ul className="flex flex-col border-t">
            {problems.map((item, i) => (
              <li key={item.title} className="border-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group flex w-full items-start gap-5 py-6 text-left"
                >
                  <span
                    className={cn(
                      'pt-1.5 font-mono text-xs transition-colors',
                      active === i ? 'text-brand' : 'text-muted-foreground',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-1 flex-col gap-2">
                    <span
                      className={cn(
                        'text-2xl font-semibold tracking-tight transition-all duration-300 md:text-3xl',
                        active === i
                          ? 'translate-x-2 text-foreground'
                          : 'text-muted-foreground/70 group-hover:text-foreground',
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        'grid text-sm text-muted-foreground transition-all duration-500',
                        active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <span className="overflow-hidden pl-2">{item.problem}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <div className="flex flex-col gap-5 rounded-3xl border bg-card p-4 md:p-5 lg:sticky lg:top-28">
            {project && (
              <div key={project.slug} className="animate-in fade-in zoom-in-95 duration-500">
                <ProjectVisual visual={project.visual} />
              </div>
            )}
            <div className="flex flex-col gap-4 px-1 pb-1 md:flex-row md:items-end md:justify-between">
              <p key={current.title} className="max-w-md text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                {current.help}
              </p>
              {project && (
                <a
                  href={`#${project.slug}`}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  See it in {project.title}
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
