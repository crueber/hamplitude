/**
 * Per-URL SEO metadata, shared by the build-time prerenderer (which writes it into each page's <head>)
 * and the browser (which keeps it current during client-side navigation).
 */
import { LICENSES, POOLS, allGroups, getGroup, isLicense } from '@/data'
import { getGroupContent } from '@/content'
import { FLAT, SECTIONS, getArticle, getSection, getSub } from '@/compendium/taxonomy'
import seoConfig from '../../seo.config.json'

export const SITE_NAME = 'Hamplitude'
export const SITE_URL: string = __SITE_URL__
export const OG_IMAGE = `${SITE_URL}/og.png`

export interface Seo {
  title: string
  description: string
  /** path without base, e.g. "/technician/T5D" */
  path: string
  /** set for pages that should not be indexed */
  robots?: string
  type: 'website' | 'article'
  jsonLd: object[]
}

/** Canonical URL. GitHub Pages serves folders with a trailing slash, so canonical URLs have one too. */
export const canonicalUrl = (path: string) => SITE_URL + (path === '/' ? '/' : path.replace(/\/+$/, '') + '/')

/** Cut at a word boundary, for meta descriptions (search engines show roughly 155-160 characters). */
export function clip(s: string, n = 158): string {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= n) return t
  const cut = t.slice(0, n - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—\s]+$/, '') + '…'
}

const NOINDEX = 'noindex, follow'

function breadcrumb(items: [string, string][]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: canonicalUrl(path) })),
  }
}

const publisher = { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` }
const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|-|\/)([a-z])/g, (_, a, b) => a + b.toUpperCase()).replace(/\bAnd\b/g, 'and')

export const articleTotal = FLAT.length

export function seoFor(rawPath: string): Seo {
  const path = '/' + rawPath.split(/[?#]/)[0].split('/').filter(Boolean).join('/')
  const parts = path.split('/').filter(Boolean)
  const none = (title: string): Seo => ({ title: `${title} | ${SITE_NAME}`, description: 'Hamplitude: visual, concept-first ham radio exam prep and a free ham radio compendium.', path, robots: NOINDEX, type: 'website', jsonLd: [] })

  // home
  if (parts.length === 0) {
    return {
      title: `${SITE_NAME}: ham radio exam prep and a free ham radio compendium`,
      description: clip(`Visual, concept-first ham radio exam prep for the Technician, General and Extra classes, plus a free compendium of ${articleTotal} articles on antennas, radios, modes and electronics.`),
      path, type: 'website',
      jsonLd: [{
        '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'en',
        description: 'Understand amateur radio instead of memorizing it: concept-first lessons built from the official FCC question pools, and a free compendium of concept articles.',
        publisher,
      }],
    }
  }

  // compendium
  if (parts[0] === 'compendium') {
    const [, sec, sub, art] = parts
    if (!sec) {
      return {
        title: `Ham radio compendium: antennas, radios, modes, electronics | ${SITE_NAME}`,
        description: clip(`${articleTotal} short, visual articles on everything an amateur radio operator should understand: antennas, transceivers, Morse and digital modes, propagation, electronics, safety.`),
        path, type: 'website',
        jsonLd: [breadcrumb([['Home', '/'], ['Compendium', '/compendium']])],
      }
    }
    const s = getSection(sec)
    if (!s) return none('Not found')
    if (!sub) {
      return {
        title: `${s.title}: ham radio compendium | ${SITE_NAME}`,
        description: clip(`${s.blurb} ${s.subs.length} topics, ${s.subs.reduce((n, b) => n + b.articles.length, 0)} articles.`),
        path, type: 'website',
        jsonLd: [breadcrumb([['Home', '/'], ['Compendium', '/compendium'], [s.title, `/compendium/${s.slug}`]])],
      }
    }
    const b = getSub(sec, sub)
    if (!b) return none('Not found')
    if (!art) {
      return {
        title: `${b.title} (${s.title}) | ${SITE_NAME} compendium`,
        description: clip(`${b.blurb} ${b.articles.length} articles: ${b.articles.slice(0, 4).map((a) => a.title).join(', ')}${b.articles.length > 4 ? ' and more' : ''}.`),
        path, type: 'website',
        jsonLd: [breadcrumb([['Home', '/'], ['Compendium', '/compendium'], [s.title, `/compendium/${s.slug}`], [b.title, `/compendium/${s.slug}/${b.slug}`]])],
      }
    }
    const a = getArticle(`${sec}/${sub}/${art}`)
    if (!a) return none('Not found')
    return {
      title: `${a.title} | Ham radio compendium`,
      description: clip(a.summary),
      path, type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.summary, inLanguage: 'en',
          isAccessibleForFree: true, mainEntityOfPage: canonicalUrl(path), url: canonicalUrl(path), image: OG_IMAGE,
          articleSection: s.title, about: b.title, author: publisher, publisher,
        },
        breadcrumb([['Home', '/'], ['Compendium', '/compendium'], [s.title, `/compendium/${s.slug}`], [b.title, `/compendium/${s.slug}/${b.slug}`], [a.title, path]]),
      ],
    }
  }

  // exam material
  const [lic, group, extra] = parts
  if (['settings'].includes(lic) || (lic === 'browse' && parts.length === 2)) return none(lic === 'browse' ? 'Question bank' : 'Settings')
  if (!isLicense(lic)) return none('Not found')
  const pool = POOLS[lic]
  if (!group) {
    const n = allGroups(lic).length
    return {
      title: `${pool.name} class study guide: ${n} visual lessons | ${SITE_NAME}`,
      description: clip(`Study for the ${pool.name} class amateur radio exam (${pool.valid.from.slice(0, 4)}-${pool.valid.to.slice(0, 4)} question pool). ${n} visual lessons covering all ${pool.questions.length} official questions, with practice and a full practice exam.`),
      path, type: 'website',
      jsonLd: [{
        '@context': 'https://schema.org', '@type': 'Course', name: `${pool.name} class amateur radio exam preparation`, inLanguage: 'en',
        description: `Concept-first visual lessons for the ${pool.name} class FCC amateur radio exam, built from the official question pool.`,
        provider: publisher, isAccessibleForFree: true, educationalLevel: `${pool.name} class`,
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT10H' },
      }, breadcrumb([['Home', '/'], [`${pool.name} class`, `/${lic}`]])],
    }
  }
  if (group === 'review' || group === 'exam') return none(`${pool.name} ${group === 'exam' ? 'practice exam' : 'review'}`)
  const info = getGroup(group)
  if (!info || info.license !== lic) return none('Not found')
  if (extra) return none(`${group} practice`)
  const c = getGroupContent(group)
  const title = c?.title ?? info.group.topics.split(';')[0]
  const blurb = c?.blurb ?? info.group.topics
  const n = info.group.questions.length
  return {
    title: `${title} (${pool.name} ${group}) | ${SITE_NAME}`,
    description: clip(`${blurb} Covers ${n} ${pool.name} class exam questions (${group}).`),
    path, type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org', '@type': 'LearningResource', name: title, description: blurb, inLanguage: 'en',
        learningResourceType: 'lesson', educationalLevel: `${pool.name} class amateur radio license`, teaches: info.group.topics,
        isAccessibleForFree: true, url: canonicalUrl(path), image: OG_IMAGE, publisher,
        isPartOf: { '@type': 'Course', name: `${pool.name} class amateur radio exam preparation`, url: canonicalUrl(`/${lic}`) },
      },
      breadcrumb([['Home', '/'], [`${pool.name} class`, `/${lic}`], [`${info.sub.id} ${titleCase(info.sub.title)}`, `/${lic}`], [title, path]]),
    ],
  }
}

/** Every URL that should be indexed (prerendered and listed in the sitemap), in a sensible order. */
export function allPages(): string[] {
  const out = ['/']
  for (const l of LICENSES) { out.push(`/${l}`); for (const g of allGroups(l)) out.push(`/${l}/${g.id}`) }
  out.push('/compendium')
  for (const s of SECTIONS) { out.push(`/compendium/${s.slug}`); for (const b of s.subs) out.push(`/compendium/${s.slug}/${b.slug}`) }
  for (const a of FLAT) out.push(`/compendium/${a.path}`)
  return out
}

// ───────────── head tags ─────────────

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const tag = (name: string, content: string, attr = 'name') => `<meta ${attr}="${name}" content="${esc(content)}" data-seo>`

/** The SEO <head> tags as an HTML string (used by the prerenderer). */
export function headHtml(s: Seo): string {
  const url = canonicalUrl(s.path)
  const out = [
    `<title data-seo>${esc(s.title)}</title>`,
    tag('description', s.description),
    `<link rel="canonical" href="${url}" data-seo>`,
    s.robots ? tag('robots', s.robots) : tag('robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    tag('og:type', s.type, 'property'), tag('og:site_name', SITE_NAME, 'property'), tag('og:locale', 'en_US', 'property'),
    tag('og:title', s.title, 'property'), tag('og:description', s.description, 'property'), tag('og:url', url, 'property'),
    tag('og:image', OG_IMAGE, 'property'), tag('og:image:width', '1200', 'property'), tag('og:image:height', '630', 'property'),
    tag('og:image:alt', 'Hamplitude: understand ham radio, do not memorize it', 'property'),
    tag('twitter:card', 'summary_large_image'), tag('twitter:title', s.title), tag('twitter:description', s.description), tag('twitter:image', OG_IMAGE),
  ]
  if (seoConfig.googleSiteVerification) out.push(tag('google-site-verification', seoConfig.googleSiteVerification))
  if (seoConfig.bingSiteVerification) out.push(tag('msvalidate.01', seoConfig.bingSiteVerification))
  for (const ld of s.jsonLd) out.push(`<script type="application/ld+json" data-seo>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`)
  return out.join('\n    ')
}

/** Keeps <head> in step with the URL during client-side navigation. */
export function applySeo(s: Seo) {
  const head = document.head
  head.querySelectorAll('[data-seo]').forEach((n) => n.remove())
  head.querySelectorAll('title, meta[name="description"], link[rel="canonical"]').forEach((n) => n.remove())
  const tmp = document.createElement('div')
  tmp.innerHTML = headHtml(s)
  tmp.querySelectorAll('script').forEach((old) => {
    const el = document.createElement('script')
    el.type = old.type; el.textContent = old.textContent; el.setAttribute('data-seo', '')
    old.replaceWith(el)
  })
  head.append(...tmp.children)
}
