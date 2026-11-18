'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { processSteps, tools } from '@/data/site'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './reveal'

export function Process() {
  const [active, setActive] = useState(0)
  const step = processSteps[active]

  return (
    <section aria-label="How I work" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <SectionHeading eyebrow="How I work" title="A process that removes" accent="guesswork." />

      <Reveal className="mt-14 rounded-3xl border bg-card p-4 md:p-6">
        <div role="tablist" aria-label="Process steps" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {processSteps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              id={`step-tab-${i}`}
              aria-selected={active === i}
              aria-controls="step-panel"
              onClick={() => setActive(i)}
              className={cn(
                'relative flex flex-col items-start gap-1 overflow-hidden rounded-2xl p-4 text-left transition-colors',
                active === i ? 'bg-ink text-primary-foreground' : 'bg-secondary hover:bg-border',
              )}
            >
              <span className={cn('font-mono text-xs', active === i ? 'text-brand' : 'text-muted-foreground')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-semibold">{s.title}</span>
              <span className={cn('text-xs', active === i ? 'text-white/60' : 'text-muted-foreground')}>
                {s.timing}
              </span>
            </button>
          ))}
        </div>

        <div
          id="step-panel"
          role="tabpanel"
          aria-labelledby={`step-tab-${active}`}
          key={active}
          className="grid gap-6 px-2 pb-2 pt-8 animate-in fade-in slide-in-from-bottom-2 duration-500 md:grid-cols-12"
        >
          <p className="text-pretty text-xl leading-relaxed md:col-span-7 md:text-2xl">{step.body}</p>
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">You get</p>
            <ul className="mt-3 flex flex-col gap-2">
              {step.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Check className="size-3" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function ToolsMarquee() {
  const loop = [...tools, ...tools]
  return (
    <section aria-label="Daily toolkit" className="py-16">
      <p className="mx-auto mb-8 max-w-6xl px-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:px-8">
        Daily toolkit
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {loop.map((tool, i) => (
            <li
              key={`${tool.name}-${i}`}
              aria-hidden={i >= tools.length}
              className="flex items-center gap-3 rounded-full border bg-card px-6 py-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tool.icon} alt="" width={22} height={22} className="size-5.5" />
              <span className="text-lg font-medium">{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
