import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { LICENSES, LICENSE_BLURB, POOLS } from '@/data'
import { useStore } from '@/lib/store'
import { licenseStats, pct } from '@/lib/stats'
import { Ring } from '@/components/Ring'
import { HeroArt } from '@/components/HeroArt'
import { SectionIcon } from '@/compendium/Icons'
import { SECTIONS, articleCount, articleHref, getArticle, getSection, getSub, sectionArticleCount } from '@/compendium/taxonomy'
import '@/styles/home.css'

/* The featured article's diagram is the one shared, interactive visual the site already has for it.
   Lazy so the home bundle stays light; the prerender waits for it, so the static HTML includes the diagram. */
const IonosphereBounce = lazy(() => import('@/visuals/shared/IonosphereBounce').then((m) => ({ default: m.IonosphereBounce })))

const FEATURE_PATH = 'radio/propagation/ionosphere-layers'
const COLLECTION = { section: 'activities', sub: 'repeater-setup' }
const COLLECTION_PICKS = [
  'activities/repeater-setup/repeater-roadmap',
  'activities/repeater-setup/planning-a-repeater',
  'activities/repeater-setup/repeater-frequency-coordination',
  'activities/repeater-setup/fcc-rules-for-repeaters',
  'activities/repeater-setup/repeater-hardware-and-duplexers',
]

/** Topic rows: a section, an accent from the theme's diagram palette, and the articles to show. */
const ROWS: { section: string; accent: string; picks: string[] }[] = [
  { section: 'radio', accent: 'var(--d-signal)', picks: ['radio/waves/decibels', 'radio/propagation/skywave-and-skip', 'radio/modulation/frequency-modulation', 'radio/waves/polarization'] },
  { section: 'electronics', accent: 'var(--d-resist)', picks: ['electronics/basics/ohms-law', 'electronics/ac-theory/resonance-and-q', 'electronics/semiconductors/diodes', 'electronics/test-equipment/oscilloscopes'] },
  { section: 'antennas', accent: 'var(--d-current)', picks: ['antennas/wire/half-wave-dipole', 'antennas/beams/yagi-uda', 'antennas/feedlines/swr-and-reflections', 'antennas/feedlines/baluns-and-ununs'] },
  { section: 'modes', accent: 'var(--d-voltage)', picks: ['modes/digital/ft8-and-ft4', 'modes/cw/morse-alphabet', 'modes/digital/aprs', 'modes/digital-voice/dmr'] },
]

const fmtDate = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

/** Static stand-in while the interactive diagram loads (client-side navigation only). */
function DiagramFallback() {
  return (
    <svg className="hm-ph" viewBox="0 0 640 300" role="img" aria-label="HF signal reflecting off the ionosphere">
      <rect x="20" y="50" width="600" height="56" rx="10" fill="none" stroke="var(--d-muted)" strokeDasharray="5 5" />
      <rect x="20" y="252" width="600" height="34" rx="8" fill="var(--d-fill)" stroke="var(--d-muted)" />
      <polyline points="110,230 320,82 530,230" fill="none" stroke="var(--d-good)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" />
    </svg>
  )
}

export function Home() {
  const cards = useStore((s) => s.cards)

  const feature = getArticle(FEATURE_PATH)
  const collSub = getSub(COLLECTION.section, COLLECTION.sub)
  const collPicks = COLLECTION_PICKS.flatMap((p) => { const a = getArticle(p); return a ? [{ path: p, a }] : [] })

  return (
    <div className="wrap hm">
      {/* ───── masthead ───── */}
      <header className="hm-mast">
        <div className="hm-mast-main">
          <h1 className="hm-h1">
            <span className="hm-h1-a">Understand ham radio.</span>{' '}
            <em className="hm-h1-b">Don't memorize it.</em>
          </h1>
          <div className="hm-actions">
            <Link className="hm-btn hm-btn-solid" to="/compendium">Open the compendium <span aria-hidden>→</span></Link>
            <button type="button" className="hm-btn" onClick={() => document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth' })}>Study for an exam</button>
          </div>
          <p className="hm-lead">
            <strong>Everything an operator should understand.</strong> {articleCount} articles that explain ham radio as ideas, not trivia. Each takes one concept, such as why SWR matters or how a signal skips around the world, and shows it in a picture before it says a word.
          </p>
        </div>
        <div className="hm-art"><HeroArt h={600} fill /></div>
      </header>

      <nav className="hm-toc" aria-label="Compendium sections">
        <p className="hm-toc-title">In the compendium</p>
        <ol className="hm-toc-list">
          {SECTIONS.map((s) => (
            <li key={s.slug}>
              <Link to={`/compendium/${s.slug}`}>
                <span className="hm-toc-ico"><SectionIcon name={s.icon} size={18} /></span>
                <span className="hm-toc-name">{s.title}</span>
                <span className="hm-toc-n">{sectionArticleCount(s)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* ───── featured article ───── */}
      {feature && (
        <section className="hm-feature" aria-labelledby="hm-feature-title">
          <div className="hm-feature-copy">
            <p className="hm-label">Featured article</p>
            <h2 className="hm-h2" id="hm-feature-title">
              <Link to={articleHref(FEATURE_PATH)}>{feature.title}</Link>
            </h2>
            <p className="hm-dek">{feature.summary}</p>
            <p className="hm-dek-2">
              The reason HF reaches across oceans and VHF does not. Flip the diagram to see the same signal at two frequencies: one comes back down, the other leaves for good.
            </p>
            <ul className="hm-meta" aria-label="About this article">
              <li>{feature.section.title}</li>
              <li>{feature.sub.title}</li>
              <li>Interactive diagram</li>
            </ul>
            <Link className="hm-more" to={articleHref(FEATURE_PATH)}>Read “{feature.title}” <span aria-hidden>→</span></Link>
          </div>
          <div className="hm-feature-vis">
            <Suspense fallback={<DiagramFallback />}>
              <IonosphereBounce />
            </Suspense>
          </div>
        </section>
      )}

      {/* ───── collection ───── */}
      {collSub && collPicks.length > 0 && (
        <section className="hm-coll" aria-labelledby="hm-coll-title">
          <div className="hm-coll-head">
            <p className="hm-label hm-label-accent">New collection · {collSub.articles.length} articles</p>
            <h2 className="hm-h2" id="hm-coll-title">{collSub.title}</h2>
            <p className="hm-dek">{collSub.blurb}</p>
            <Link className="hm-btn hm-btn-solid" to={`/compendium/${COLLECTION.section}/${COLLECTION.sub}`}>See all {collSub.articles.length} articles <span aria-hidden>→</span></Link>
          </div>
          <ol className="hm-coll-list">
            {collPicks.map(({ path, a }) => (
              <li key={path}>
                <Link to={articleHref(path)}>
                  <strong>{a.title}</strong>
                  <span>{a.summary}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ───── topic rows ───── */}
      <div className="hm-topics">
        <h2 className="hm-sr">Browse by topic</h2>
        {ROWS.map((row) => {
          const s = getSection(row.section)
          if (!s) return null
          const items = row.picks.flatMap((p) => { const a = getArticle(p); return a ? [a] : [] })
          return (
            <section key={row.section} className="hm-row" style={{ ['--hm-accent' as string]: row.accent }} aria-labelledby={`hm-row-${row.section}`}>
              <header className="hm-row-head">
                <span className="hm-row-ico"><SectionIcon name={s.icon} size={22} /></span>
                <div className="hm-row-title">
                  <h3 className="hm-h3" id={`hm-row-${row.section}`}>{s.title}</h3>
                  <p>{s.blurb}</p>
                </div>
                <Link className="hm-row-all" to={`/compendium/${s.slug}`}>All {sectionArticleCount(s)} articles <span aria-hidden>→</span></Link>
              </header>
              <ul className="hm-cards">
                {items.map((a) => (
                  <li key={a.path}>
                    <Link className="hm-card" to={articleHref(a.path)}>
                      <span className="hm-card-kicker">{a.sub.title}</span>
                      <strong>{a.title}</strong>
                      <span className="hm-card-sum">{a.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {/* ───── exam band ───── */}
      <section className="hm-exams" id="exams" aria-labelledby="hm-exams-title">
        <div className="hm-exams-head">
          <p className="hm-label">Exam study guides</p>
          <h2 className="hm-h2" id="hm-exams-title">Studying for an exam?</h2>
          <p className="hm-dek">
            The exam lessons teach the same ideas in the order the official question pools ask them, with practice questions and a full mock exam. Every compendium article points to the lessons that cover it.
          </p>
        </div>
        <div className="hm-lics">
          {LICENSES.map((l) => {
            const p = POOLS[l]
            const st = licenseStats(cards, l)
            const m = pct(st.mastered, st.total)
            const groups = p.subelements.reduce((n, s) => n + s.groups.length, 0)
            return (
              <Link key={l} to={`/${l}`} className="hm-lic" data-license={l}>
                <div className="hm-lic-top">
                  <h3 className="hm-h3">{p.name}</h3>
                  <Ring value={m} size={48} />
                </div>
                <p className="hm-lic-tag">{LICENSE_BLURB[l].tagline}. {LICENSE_BLURB[l].privileges}.</p>
                <p className="hm-lic-facts">{groups} lessons · {p.questions.length} pool questions · {p.exam.toPass} of {p.exam.questions} to pass</p>
                <p className="hm-lic-valid">Pool {fmtDate(p.valid.from)} – {fmtDate(p.valid.to)}</p>
                <span className="hm-lic-cta">{st.seen ? 'Continue' : 'Start learning'} <span aria-hidden>→</span></span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
