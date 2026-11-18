import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

export function CaseNav({
  index,
  total,
  title,
  next,
  position = 'top',
}: {
  index: number
  total: number
  title: string
  next: Project
  position?: 'top' | 'bottom'
}) {
  const isTop = position === 'top'
  return (
    <nav
      aria-label={isTop ? 'Case study' : 'Case study footer'}
      className={cn(
        'z-50 flex justify-center px-4',
        isTop ? 'sticky top-0 pt-4' : 'pb-8',
      )}
    >
      <div className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border bg-background/80 px-2 py-2 shadow-sm backdrop-blur-md">
        <Link
          href="/#work"
          className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Back to Work
        </Link>
        <p className="hidden truncate font-mono text-xs uppercase tracking-widest text-muted-foreground sm:block">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {title}
        </p>
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <span>
            <span className="hidden sm:inline">Next: </span>
            {next.title}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </nav>
  )
}
