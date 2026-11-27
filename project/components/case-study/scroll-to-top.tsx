'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop({ slug }: { slug: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const jumpToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }

    jumpToTop()
    const raf1 = requestAnimationFrame(jumpToTop)
    const t1 = window.setTimeout(jumpToTop, 60)
    const t2 = window.setTimeout(jumpToTop, 200)

    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [slug, pathname])

  return null
}
