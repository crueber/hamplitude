import { Suspense, lazy, useEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useRouteParams } from '@/lib/useRouteParams'
import { MDXProvider } from '@mdx-js/react'
import { POOLS, allGroups, getGroup, isLicense } from '@/data'
import { getGroupContent, hasLesson, loadLesson } from '@/content'
import { mdxComponents } from '@/mdx/components'
import { update } from '@/lib/store'
import { examLinks } from '@/compendium/loader'
import { articleHref, getArticle } from '@/compendium/taxonomy'

const lazyCache = new Map<string, ReturnType<typeof lazy>>()
function lessonComponent(id: string) {
  if (!lazyCache.has(id)) lazyCache.set(id, lazy(() => loadLesson(id) as Promise<{ default: React.ComponentType }>))
  return lazyCache.get(id)!
}

const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|-|\/)([a-z])/g, (_, a, b) => a + b.toUpperCase()).replace(/\bAnd\b/g, 'and')

export function LessonPage() {
  const { license, group } = useRouteParams()
  const { hash, pathname } = useLocation()
  const footRef = useRef<HTMLDivElement>(null)
  const info = group ? getGroup(group) : undefined
  const ok = isLicense(license) && info && info.license === license

  const Lesson = useMemo(() => (ok && hasLesson(group!) ? lessonComponent(group!) : null), [ok, group])

  // scroll to a concept anchor (from "Review the concept" links) once the lazy lesson has rendered
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0 }); return }
    let tries = 0
    const t = setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      if (el || ++tries > 30) {
        clearInterval(t)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 80)
    return () => clearInterval(t)
  }, [hash, pathname])

  // mark as read when the end of the lesson is reached
  useEffect(() => {
    if (!ok || !footRef.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) update((s) => (s.lessonsRead[group!] ? s : { ...s, lessonsRead: { ...s.lessonsRead, [group!]: Date.now() } }))
    })
    io.observe(footRef.current)
    return () => io.disconnect()
  }, [ok, group, Lesson])

  if (!ok) return <Navigate to={isLicense(license) ? `/${license}` : '/'} replace />

  const pool = POOLS[license]
  const content = getGroupContent(group!)
  const groups = allGroups(license)
  const idx = groups.findIndex((g) => g.id === group)
  const prev = groups[idx - 1]
  const next = groups[idx + 1]
  const title = content?.title ?? info.group.topics.split(';')[0]
  const deeper = (examLinks[group!] ?? []).map((p) => getArticle(p)).filter((a) => !!a)

  return (
    <div data-license={license}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={`/${license}`}>{pool.name}</Link> › <span>{info.sub.id} · {titleCase(info.sub.title)}</span>
        </nav>
      </div>
      <article className="lesson">
        <header className="lesson-head">
          <span className="gid">{group}</span>
          <h1>{title}</h1>
          {content?.blurb && <p className="blurb">{content.blurb}</p>}
          <div className="lesson-meta">
            <span className="badge">{info.group.questions.length} pool questions</span>
            <span className="badge">1 on the exam</span>
          </div>
          <p className="topics"><strong>Syllabus:</strong> {info.group.topics}</p>
        </header>

        <div className="lesson-body">
          {Lesson ? (
            <MDXProvider components={mdxComponents}>
              <Suspense fallback={<div className="loading">Loading lesson…</div>}><Lesson /></Suspense>
            </MDXProvider>
          ) : (
            <div className="soon-box">
              <h3>Lesson coming soon</h3>
              <p>The visual lesson for this group is still being written. You can already practise its {info.group.questions.length} questions.</p>
            </div>
          )}
        </div>

        {deeper.length > 0 && (
          <section className="deeper" data-license="compendium">
            <h2>Go deeper</h2>
            <p>Compendium articles on the ideas in this lesson, beyond what the exam asks.</p>
            <ul>{deeper.map((a) => <li key={a!.path}><Link to={articleHref(a!.path)}>{a!.title}</Link></li>)}</ul>
          </section>
        )}

        <div className="lesson-foot" ref={footRef}>
          <h2>Check what stuck</h2>
          <p>Practise the {info.group.questions.length} pool questions for this group. Answers are shuffled, and every one comes with a one-line "why".</p>
          <div><Link className="btn btn-primary btn-lg" to={`/${license}/${group}/practice`}>Practise {group} →</Link></div>
        </div>
        <div className="pager">
          {prev ? <Link className="btn btn-ghost" to={`/${license}/${prev.id}`}>← {prev.id}{getGroupContent(prev.id) ? ` · ${getGroupContent(prev.id)!.title}` : ''}</Link> : <span />}
          {next ? <Link className="btn btn-ghost" to={`/${license}/${next.id}`}>{next.id}{getGroupContent(next.id) ? ` · ${getGroupContent(next.id)!.title}` : ''} →</Link> : <span />}
        </div>
      </article>
    </div>
  )
}
