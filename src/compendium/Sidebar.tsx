import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SectionIcon } from './Icons'
import { Search } from './Search'
import { hasArticle } from './loader'
import { SECTIONS, articleHref, sectionArticleCount } from './taxonomy'

const KEY = 'hamplitude:cmp-nav'
const load = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] } }

/** Three-level tree: Section > Subsection > Article. Open state persists; the current path is always open. */
export function Sidebar({ current, onNavigate }: { current: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(load()))
  const [section, sub] = current.split('/')

  useEffect(() => {
    if (!section) return
    setOpen((o) => {
      const n = new Set(o)
      n.add(section)
      if (sub) n.add(`${section}/${sub}`)
      return n
    })
  }, [section, sub])

  const toggle = (k: string) => setOpen((o) => {
    const n = new Set(o)
    n.has(k) ? n.delete(k) : n.add(k)
    try { localStorage.setItem(KEY, JSON.stringify([...n])) } catch { /* ignore */ }
    return n
  })

  return (
    <nav className="cmp-nav" aria-label="Compendium contents">
      <Search onNavigate={onNavigate} />
      <ul className="cmp-l1">
        {SECTIONS.map((s) => {
          const sOpen = open.has(s.slug)
          return (
            <li key={s.slug} className={s.slug === section ? 'on' : ''}>
              <div className="cmp-row l1">
                <Link to={`/compendium/${s.slug}`} onClick={onNavigate} className="lbl"><SectionIcon name={s.icon} size={18} /><span>{s.title}</span></Link>
                <button className="tog" aria-expanded={sOpen} aria-label={`${sOpen ? 'Collapse' : 'Expand'} ${s.title}`} onClick={() => toggle(s.slug)}><i /></button>
              </div>
              {sOpen && (
                <ul className="cmp-l2">
                  {s.subs.map((b) => {
                    const k = `${s.slug}/${b.slug}`
                    const bOpen = open.has(k)
                    return (
                      <li key={k}>
                        <div className="cmp-row l2">
                          <Link to={`/compendium/${k}`} onClick={onNavigate} className="lbl">{b.title}</Link>
                          <span className="cnt">{b.articles.length}</span>
                          <button className="tog" aria-expanded={bOpen} aria-label={`${bOpen ? 'Collapse' : 'Expand'} ${b.title}`} onClick={() => toggle(k)}><i /></button>
                        </div>
                        {bOpen && (
                          <ul className="cmp-l3">
                            {b.articles.map((a) => {
                              const p = `${k}/${a.slug}`
                              return (
                                <li key={p}>
                                  <NavLink to={articleHref(p)} onClick={onNavigate} className={({ isActive }) => `art${isActive ? ' active' : ''}${hasArticle(p) ? '' : ' soon'}`}>
                                    {a.title}
                                  </NavLink>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
      <p className="cmp-total">{SECTIONS.reduce((n, s) => n + sectionArticleCount(s), 0)} articles</p>
    </nav>
  )
}
