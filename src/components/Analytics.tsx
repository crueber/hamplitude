import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoConfig from '../../seo.config.json'

declare global {
  interface Window {
    goatcounter?: { count: (o: { path?: string; title?: string; event?: boolean }) => void }
  }
}

/**
 * Anonymous, cookieless page-view counting with GoatCounter (https://www.goatcounter.com), enabled by setting
 * "goatcounterCode" in seo.config.json. The script is injected at build time with automatic counting turned off;
 * this component counts the first page and every client-side navigation, so single-page routing is covered.
 * Disabled (and nothing is loaded) while the code is empty. GoatCounter ignores localhost.
 */
export function Analytics() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!seoConfig.goatcounterCode) return
    let tries = 0
    let timer: ReturnType<typeof setTimeout>
    const send = () => {
      if (window.goatcounter?.count) window.goatcounter.count({ path: pathname, title: document.title })
      else if (tries++ < 20) timer = setTimeout(send, 250) // the async script may still be loading
    }
    send()
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}
