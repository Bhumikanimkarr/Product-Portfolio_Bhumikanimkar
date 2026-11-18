import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/site'

function SplitWord({
  word,
  start,
  special,
}: {
  word: string
  start: number
  special: { index: number; node: React.ReactNode }
}) {
  return (
    <span aria-hidden className="flex items-center overflow-hidden pb-[0.04em] leading-[0.86]">
      {word.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="letter-rise"
          style={{ animationDelay: `${start + i * 55}ms` }}
        >
          {i === special.index ? special.node : char}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center gap-10 px-5 pb-16 pt-32 md:px-8"
    >
      <h1 className="sr-only">
        {profile.name}, {profile.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Hi, I&apos;m {profile.name}
        </span>
        <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-brand">
          {profile.availability}
        </span>
      </div>

      <div className="flex flex-col gap-1 text-[clamp(3.5rem,14.5vw,12.5rem)] font-bold tracking-[-0.06em]">
        <SplitWord
          word="PRODUCT"
          start={100}
          special={{
            index: 2,
            node: (
              <span className="relative mx-[0.02em] inline-flex h-[0.66em] w-[0.66em] items-center justify-center rounded-full border-[0.13em] border-brand">
                <span className="size-[0.16em] rounded-full bg-ink" />
              </span>
            ),
          }}
        />
        <div className="flex items-end justify-between gap-6">
          <SplitWord
            word="DESIGNER"
            start={450}
            special={{
              index: 3,
              node: (
                <span className="inline-block h-[0.72em] w-[0.12em] translate-y-[0.03em] animate-blink bg-brand" />
              ),
            }}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="flex items-baseline gap-3 md:col-span-3">
          <span className="text-6xl font-semibold tracking-tight">{profile.yearsExperience}</span>
          <span className="text-sm leading-tight text-muted-foreground">
            years of
            <br />
            design practice
          </span>
        </div>
        <p className="text-pretty text-xl leading-relaxed md:col-span-6 md:text-2xl">
          {profile.intro}
        </p>
        <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
          <a
            href="#work"
            className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            See the work
            <ArrowDownRight className="size-4 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            {"Let's talk"}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
