import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

/** Sidebar + content. On narrow screens the sidebar becomes a slide-over drawer. */
export function CompendiumLayout({ path, children }: { path: string; children: ReactNode }) {
  const [drawer, setDrawer] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setDrawer(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawer])

  return (
    <div className="cmp" data-license="compendium">
      <button className="cmp-menu-btn" onClick={() => setDrawer(true)} aria-label="Open compendium contents">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 6h16M4 12h16M4 18h10" /></svg>
        Contents
      </button>
      <aside className={`cmp-side${drawer ? ' open' : ''}`}>
        <div className="cmp-drawer-head"><strong>Compendium</strong><button onClick={() => setDrawer(false)} aria-label="Close contents">✕</button></div>
        <Sidebar current={path} onNavigate={() => setDrawer(false)} />
      </aside>
      {drawer && <div className="cmp-scrim" onClick={() => setDrawer(false)} />}
      <div className="cmp-main">{children}</div>
    </div>
  )
}
