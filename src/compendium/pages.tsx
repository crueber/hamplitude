import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { SectionIcon } from './Icons'
import { CompendiumLayout } from './Layout'
import { Search } from './Search'
import { compendiumComponents } from './mdx'
import { hasArticle, loadArticle } from './loader'
import {
  FEATURED, SECTIONS, articleCount, articleHref, getArticle, getSection, getSub, neighbours, sectionArticleCount, type ArticleDef,
} from './taxonomy'

/** One route handles /compendium, /compendium/:section, /:section/:sub and /:section/:sub/:article. */
export function CompendiumRoute() {
  const splat = useParams()['*'] ?? ''
  const parts = splat.split('/').filter(Boolean)
  const path = parts.join('/')
  useEffect(() => { window.scrollTo({ top: 0 }) }, [path])

  let body
  if (parts.length === 0) body = <Home />
  else if (parts.length === 1) body = getSection(parts[0]) ? <SectionPage slug={parts[0]} /> : <Navigate to="/compendium" replace />
  else if (parts.length === 2) body = getSub(parts[0], parts[1]) ? <SubPage section={parts[0]} sub={parts[1]} /> : <Navigate to="/compendium" replace />
  else body = getArticle(path) ? <ArticlePage key={path} path={path} /> : <Navigate to="/compendium" replace />

  return <CompendiumLayout path={path}>{body}</CompendiumLayout>
}

function Card({ path, a }: { path: string; a: ArticleDef }) {
  return (
    <Link to={articleHref(path)} className={`cmp-card${hasArticle(path) ? '' : ' soon'}`}>
      <strong>{a.title}</strong>
      <span>{a.summary}</span>
    </Link>
  )
}

function Home() {
  return (
    <div className="cmp-page">
      <header className="cmp-hero">
        <div className="eyebrow">Compendium</div>
        <h1>Everything an amateur radio operator should understand</h1>
        <p className="lead">
          {articleCount} short concept articles on antennas, radios, modes, electronics, propagation and operating. Not exam prep: the understanding behind the hobby. Use the contents on the left, or search.
        </p>
        <Search big />
      </header>

      <h2 className="cmp-h2">Start here</h2>
      <div className="cmp-grid">
        {FEATURED.map((p) => { const a = getArticle(p); return a ? <Card key={p} path={p} a={a} /> : null })}
      </div>

      <h2 className="cmp-h2">Browse by topic</h2>
      <div className="cmp-sections">
        {SECTIONS.map((s) => (
          <Link key={s.slug} to={`/compendium/${s.slug}`} className="cmp-sec-card">
            <span className="ico"><SectionIcon name={s.icon} size={22} /></span>
            <strong>{s.title}</strong>
            <p>{s.blurb}</p>
            <small>{s.subs.map((b) => b.title).slice(0, 4).join(' · ')}{s.subs.length > 4 ? ' · …' : ''}</small>
            <em>{sectionArticleCount(s)} articles</em>
          </Link>
        ))}
      </div>
      <p className="cmp-cross">Studying for an exam? The <Link to="/">exam lessons</Link> teach the same ideas in the order the question pools ask them.</p>
    </div>
  )
}

function SectionPage({ slug }: { slug: string }) {
  const s = getSection(slug)!
  return (
    <div className="cmp-page">
      <nav className="crumbs"><Link to="/compendium">Compendium</Link> › <span>{s.title}</span></nav>
      <header className="cmp-head">
        <span className="ico"><SectionIcon name={s.icon} size={26} /></span>
        <div><h1>{s.title}</h1><p className="lead">{s.blurb}</p></div>
      </header>
      {s.subs.map((b) => (
        <section key={b.slug}>
          <h2 className="cmp-h2"><Link to={`/compendium/${s.slug}/${b.slug}`}>{b.title}</Link></h2>
          <p className="cmp-sub-blurb">{b.blurb}</p>
          <div className="cmp-grid">{b.articles.map((a) => <Card key={a.slug} path={`${s.slug}/${b.slug}/${a.slug}`} a={a} />)}</div>
        </section>
      ))}
    </div>
  )
}

function SubPage({ section, sub }: { section: string; sub: string }) {
  const s = getSection(section)!
  const b = getSub(section, sub)!
  return (
    <div className="cmp-page">
      <nav className="crumbs"><Link to="/compendium">Compendium</Link> › <Link to={`/compendium/${s.slug}`}>{s.title}</Link> › <span>{b.title}</span></nav>
      <header className="cmp-head">
        <span className="ico"><SectionIcon name={s.icon} size={26} /></span>
        <div><h1>{b.title}</h1><p className="lead">{b.blurb}</p></div>
      </header>
      <div className="cmp-grid">{b.articles.map((a) => <Card key={a.slug} path={`${s.slug}/${b.slug}/${a.slug}`} a={a} />)}</div>
    </div>
  )
}

const lazyCache = new Map<string, ReturnType<typeof lazy>>()
const articleComponent = (p: string) => {
  if (!lazyCache.has(p)) lazyCache.set(p, lazy(() => loadArticle(p) as Promise<{ default: React.ComponentType }>))
  return lazyCache.get(p)!
}

function ArticlePage({ path }: { path: string }) {
  const a = getArticle(path)!
  const Body = useMemo(() => (hasArticle(path) ? articleComponent(path) : null), [path])
  const { prev, next } = neighbours(path)

  return (
    <div className="cmp-page with-toc">
      <article className="article">
        <nav className="crumbs">
          <Link to="/compendium">Compendium</Link> › <Link to={`/compendium/${a.section.slug}`}>{a.section.title}</Link> › <Link to={`/compendium/${a.section.slug}/${a.sub.slug}`}>{a.sub.title}</Link>
        </nav>
        <header className="article-head">
          <h1>{a.title}</h1>
          <p className="lead">{a.summary}</p>
        </header>
        <div className="article-body" id="article-body">
          {Body ? (
            <MDXProvider components={compendiumComponents}>
              <Suspense fallback={<div className="loading">Loading…</div>}><Body /></Suspense>
            </MDXProvider>
          ) : (
            <div className="soon-box"><h3>Article coming soon</h3><p>This one is still being written.</p></div>
          )}
        </div>
        <div className="pager">
          {prev ? <Link className="btn btn-ghost" to={articleHref(prev.path)}>← {prev.title}</Link> : <span />}
          {next ? <Link className="btn btn-ghost" to={articleHref(next.path)}>{next.title} →</Link> : <span />}
        </div>
      </article>
      <Toc key={path} />
    </div>
  )
}

/** "On this page": built from the rendered h2s, highlights the one being read. */
function Toc() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([])
  const [active, setActive] = useState('')
  useEffect(() => {
    let tries = 0
    const t = setInterval(() => {
      const hs = [...document.querySelectorAll<HTMLElement>('#article-body h2')].filter((h) => h.id && !h.closest('.related'))
      if (hs.length || ++tries > 25) {
        clearInterval(t)
        setItems(hs.map((h) => ({ id: h.id, text: h.textContent ?? '' })))
        const io = new IntersectionObserver((es) => { const v = es.find((e) => e.isIntersecting); if (v) setActive(v.target.id) }, { rootMargin: '-70px 0px -70% 0px' })
        hs.forEach((h) => io.observe(h))
      }
    }, 120)
    return () => clearInterval(t)
  }, [])
  if (items.length < 2) return <aside className="toc" />
  return (
    <aside className="toc" aria-label="On this page">
      <strong>On this page</strong>
      <ul>
        {items.map((i) => (
          <li key={i.id}><button className={active === i.id ? 'on' : ''} onClick={() => document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{i.text}</button></li>
        ))}
      </ul>
    </aside>
  )
}
