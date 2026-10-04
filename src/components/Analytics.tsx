import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import seoConfig from '../../seo.config.json'

const code = seoConfig.goatcounterCode

/**
 * Anonymous, cookieless page-view counting with GoatCounter (https://www.goatcounter.com), enabled by setting
 * "goatcounterCode" in seo.config.json; nothing is sent while it is empty.
 *
 * GoatCounter's own count.js is just a wrapper that requests a 1x1 image from <code>.goatcounter.com/count with the page
 * details in the query string. We make that request ourselves, so no third-party script is loaded (which also gets
 * around DNS/ad blockers that list the script host) and every client-side navigation is counted.
 */
function hit(path: string, first: boolean) {
  const q = new URLSearchParams({
    p: path,
    t: document.title,
    s: `${screen.width},${screen.height},${Math.round(window.devicePixelRatio * 100) / 100}`,
    rnd: Math.random().toString(36).slice(2),
  })
  // referrer only matters for the landing page, and only when it came from another site
  if (first && document.referrer) {
    try { if (new URL(document.referrer).origin !== location.origin) q.set('r', document.referrer) } catch { /* ignore */ }
  }
  if (navigator.webdriver) q.set('b', '1') // automated browsers (tests, crawlers) are flagged as bots, not visitors
  new Image().src = `https://${code}.goatcounter.com/count?${q}`
}

const isLocal = () => /^(localhost|127\.|\[::1\]|.*\.local)$/.test(location.hostname) || location.protocol === 'file:'
const optedOut = () => navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true

export function Analytics() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    const isFirst = first.current
    first.current = false
    if (!code || isLocal() || optedOut()) return
    hit(pathname, isFirst)
  }, [pathname])
  return null
}
