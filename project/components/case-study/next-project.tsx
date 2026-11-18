import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectVisual } from '@/components/site/project-visual'
import { Reveal } from '@/components/site/reveal'

export function NextProject({ next }: { next: Project }) {
  return (
    <section aria-label="Next project" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <Reveal>
        <Link
          href={`/work/${next.slug}`}
          className="group grid gap-6 rounded-[2rem] border bg-card p-4 transition-shadow hover:shadow-xl md:grid-cols-12 md:p-6"
        >
          <div className="flex flex-col justify-between gap-6 md:col-span-5 md:py-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Next project</p>
            <div>
              <h2 className="text-5xl font-semibold tracking-tighter md:text-6xl">{next.title}</h2>
              <p className="mt-2 font-serif text-xl italic text-muted-foreground">{next.tagline}</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-3 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-[1.03]">
              Read case study
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
          <div className="md:col-span-7">
            <ProjectVisual
              visual={next.visual}
              interactive={false}
              className="transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>
        </Link>
      </Reveal>
    </section>
  )
}
