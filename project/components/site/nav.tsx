'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { profile } from '@/data/site'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#lab', label: 'Lab' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main"
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-6',
          scrolled
            ? 'border-border bg-background/80 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span aria-hidden className="size-2.5 rounded-full bg-brand" />
          {profile.firstName.toLowerCase()}
          <span className="font-serif font-normal italic text-muted-foreground">nimkar</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="/resume.pdf"
            download="Bhumika_Nimkar_Resume.pdf"
            aria-label="Download Resume PDF"
            className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-neutral-900/20 bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 shadow-xs transition hover:border-neutral-900/35 hover:bg-neutral-50 active:scale-[0.99]"
          >
            <span>Resume</span>
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition-colors group-hover:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-3 transition-transform duration-150 group-hover:translate-y-0.5"
              >
                <path d="M8 2.5v7" />
                <path d="m5 6.5 3 3 3-3" />
                <path d="M3 12.5h10" />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {"Let's talk"}
          </a>
        </div>
      </nav>
    </header>
  )
}
