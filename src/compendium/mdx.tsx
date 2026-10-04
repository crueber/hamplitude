import { Children, isValidElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getGroup } from '@/data'
import { getGroupContent } from '@/content'
import { mdxComponents } from '@/mdx/components'
import { articleHref, resolveArticle } from './taxonomy'

/**
 * Components available in every compendium article without importing (on top of the lesson components
 * Key, Callout, Mnemonic, Formula, Row, Term, Concept).
 */

/** At-a-glance facts. <Facts items={[['Impedance', '≈ 73 Ω'], ['Length', '468 / f(MHz) ft']]} /> */
export function Facts({ items, title = 'Key facts' }: { items: [string, ReactNode][]; title?: string }) {
  return (
    <aside className="cmp-facts" aria-label={title}>
      <h4>{title}</h4>
      <dl>
        {items.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </aside>
  )
}

/** Inline link to another article by slug (or section/sub/slug). Text defaults to the article's title. */
export function Ref({ to, children }: { to: string; children?: ReactNode }) {
  const a = resolveArticle(to)
  if (!a) return <span className="ref-broken" title={`Unknown article: ${to}`}>{children ?? to}</span>
  return <Link className="ref" to={articleHref(a.path)}>{children ?? a.title}</Link>
}

/** End-of-article links. <Related to="inverted-v baluns-and-ununs" /> */
export function Related({ to }: { to: string }) {
  const items = to.split(/[\s,]+/).filter(Boolean).map((r) => resolveArticle(r)).filter((a) => !!a)
  if (!items.length) return null
  return (
    <section className="related" aria-label="Related articles">
      <h2>Related</h2>
      <ul>
        {items.map((a) => (
          <li key={a!.path}>
            <Link to={articleHref(a!.path)}><strong>{a!.title}</strong><span>{a!.summary}</span></Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Where this concept shows up in the exam lessons. <ExamLink groups="T9A G9B" /> */
export function ExamLink({ groups }: { groups: string }) {
  const items = groups.split(/[\s,]+/).filter(Boolean).map((g) => ({ g, info: getGroup(g) })).filter((x) => x.info)
  if (!items.length) return null
  return (
    <aside className="examlink">
      <strong>On the exam</strong>
      <span>This idea is tested in</span>
      {items.map(({ g, info }) => (
        <Link key={g} to={`/${info!.license}/${g}`} data-license={info!.license} className="exam-chip">
          <i className="dot" />{g}{getGroupContent(g)?.title ? ` · ${getGroupContent(g)!.title}` : ''}
        </Link>
      ))}
    </aside>
  )
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const textOf = (n: ReactNode): string =>
  Children.toArray(n).map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : isValidElement(c) ? textOf((c.props as { children?: ReactNode }).children) : '')).join('')

export const H2 = ({ children }: { children?: ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>
export const H3 = ({ children }: { children?: ReactNode }) => <h3 id={slugify(textOf(children))}>{children}</h3>

export const compendiumComponents = { ...mdxComponents, Facts, Ref, Related, ExamLink, h2: H2, h3: H3 }
