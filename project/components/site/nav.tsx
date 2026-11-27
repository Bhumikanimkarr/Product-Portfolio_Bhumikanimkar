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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/resume.pdf"
            download="Bhumika_Nimkar_Resume.pdf"
            aria-label="Download Resume PDF"
            className="group inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-3"
          >
            <span>Resume</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="size-3.5 transition-transform duration-150 group-hover:translate-y-0.5 sm:size-4"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.75.75v8.638l2.72-2.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06l2.72 2.72V3.75A.75.75 0 0110 3zm-6.25 12.25a.75.75 0 01.75-.75h11a.75.75 0 010 1.5h-11a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
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
