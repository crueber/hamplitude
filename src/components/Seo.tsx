import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo, seoFor } from '@/lib/seo'

/** Updates the document head on client-side navigation. The first render keeps the prerendered head. */
export function Seo() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current && document.documentElement.hasAttribute('data-prerendered')) { first.current = false; return }
    first.current = false
    applySeo(seoFor(pathname))
  }, [pathname])
  return null
}
