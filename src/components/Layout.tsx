import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { LICENSES, POOLS } from '@/data'
import { cycleTheme, useApplyTheme } from '@/lib/theme'
import { streakDays } from '@/lib/srs'
import { useStore } from '@/lib/store'
import { LogoMark } from './Logo'

export function Layout() {
  useApplyTheme()
  const theme = useStore((s) => s.settings.theme)
  const activity = useStore((s) => s.activity)
  const streak = streakDays(activity)
  const { pathname } = useLocation()
  const focus = /\/(practice|exam|review)$/.test(pathname)

  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <Link to="/" className="logo" aria-label="Hamplitude home">
            <LogoMark /> <span>Ham<b>plitude</b></span>
          </Link>
          <nav className="nav" aria-label="Licence classes">
            {LICENSES.map((l) => (
              <NavLink key={l} to={`/${l}`} data-license={l} className={({ isActive }) => (isActive || pathname.startsWith(`/${l}/`) ? 'active' : '')}>
                <i className="dot" />{POOLS[l].name}
              </NavLink>
            ))}
            {streak > 1 && <span className="streak" title="Days in a row you've practised">🔥 {streak}</span>}
            <button className="icon-btn" onClick={cycleTheme} aria-label={`Theme: ${theme}. Click to change.`} title={`Theme: ${theme}`}>
              <ThemeIcon theme={theme} />
            </button>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      {!focus && <Footer />}
      <ScrollRestoration />
    </>
  )
}

function ThemeIcon({ theme }: { theme: 'system' | 'light' | 'dark' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const
  if (theme === 'dark') return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  if (theme === 'light')
    return (
      <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    )
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 3v18" fill="currentColor" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" /></svg>
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p>
          Every question comes unaltered from the official, public-domain question pools published by the NCVEC Question Pool Committee.
          Explanations and visuals are original. Hamplitude is independent: not affiliated with the FCC, the NCVEC, or any VEC.
          Always check <a href="https://www.ncvec.org" target="_blank" rel="noreferrer">ncvec.org</a> for the pool in effect on your exam date.
        </p>
        <p><Link to="/settings">Settings &amp; progress</Link> · Progress is saved only in this browser.</p>
      </div>
    </footer>
  )
}
