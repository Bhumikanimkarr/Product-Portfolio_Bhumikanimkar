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
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }

    resetScroll()
    const frame = requestAnimationFrame(resetScroll)
    return () => cancelAnimationFrame(frame)
  }, [slug, pathname])

  return null
}
