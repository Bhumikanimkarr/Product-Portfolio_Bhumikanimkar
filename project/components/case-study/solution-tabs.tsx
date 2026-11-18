'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import type { CaseStudy } from '@/data/projects'
import { ProjectVisual } from '@/components/site/project-visual'
import { cn } from '@/lib/utils'

export function SolutionTabs({ features }: { features: CaseStudy['solution'] }) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const feature = features[active]

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
    const next = (active + dir + features.length) % features.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div
        role="tablist"
        aria-label="Solution features"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible"
      >
        {features.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={`tab-${f.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${f.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors lg:py-4',
              i === active
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-white/15 text-primary-foreground/70 hover:border-white/40 hover:text-primary-foreground',
            )}
          >
            <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-medium">{f.title}</span>
          </button>
        ))}
      </div>

      <div
        key={feature.id}
        id={`panel-${feature.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${feature.id}`}
        className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 lg:col-span-8"
      >
        {feature.visual && (
          <div className="rounded-[1.75rem] bg-white/5 p-2 ring-1 ring-white/10">
            <ProjectVisual visual={feature.visual} className="rounded-[1.4rem] border-white/10" />
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <p className="text-pretty text-lg leading-relaxed text-primary-foreground/90">{feature.summary}</p>
          <ul className="flex flex-col gap-2">
            {feature.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/75">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
