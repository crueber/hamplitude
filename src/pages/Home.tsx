import { Suspense, lazy, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { WaveBand } from '@/components/WaveBand'
import { Ring } from '@/components/Ring'
import { SectionIcon } from '@/compendium/Icons'
import { EXAMS_DEK, FEATURE_BLURB, LEAD, LEAD_BOLD, TAGLINE, useLandingData } from './home-data'
import '@/styles/home.css'

/* The featured article's diagram is the one shared, interactive visual the site already has for it.
   Lazy so the home bundle stays light; the prerender waits for it, so the static HTML includes the diagram. */
const IonosphereBounce = lazy(() => import('@/visuals/shared/IonosphereBounce').then((m) => ({ default: m.IonosphereBounce })))

/** Static stand-in while the interactive diagram loads. */
function DiagramFallback() {
  return (
    <svg viewBox="0 0 640 300" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="HF signal reflecting off the ionosphere">
      <rect x="20" y="50" width="600" height="56" rx="10" fill="none" stroke="var(--d-muted)" strokeDasharray="5 5" />
      <rect x="20" y="252" width="600" height="34" rx="8" fill="var(--d-fill)" stroke="var(--d-muted)" />
      <polyline points="110,230 320,82 530,230" fill="none" stroke="var(--d-good)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 7" />
    </svg>
  )
}

function FeatureDiagram() {
  return (
    <Suspense fallback={<DiagramFallback />}>
      <IonosphereBounce />
    </Suspense>
  )
}

const TABS = [
  { id: 'explore', label: 'Explore the compendium' },
  { id: 'exams', label: 'Exam study guides' },
] as const
type TabId = (typeof TABS)[number]['id']

export function Home() {
  const { feature, featureHref, collSub, collHref, collPicks, sections, licenses } = useLandingData()
  const [tab, setTab] = useState<TabId>('explore')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const panelsRef = useRef<HTMLDivElement>(null)

  const select = (i: number, focus = false) => {
    setTab(TABS[i].id)
    if (focus) tabRefs.current[i]?.focus()
  }
  const onKey = (e: KeyboardEvent, i: number) => {
    const last = TABS.length - 1
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1
    if (next < 0) return
    e.preventDefault()
    select(next, true)
  }
  const studyForExam = () => {
    setTab('exams')
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('exams')?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }

  return (
    <div className="hm">
      <div className="wrap">
      <header className="hm-hero">
        <h1 className="hm-h1">
          <span className="hm-h1-a">{TAGLINE.a}</span>{' '}
          <em className="hm-h1-b">{TAGLINE.b}</em>
        </h1>
        <p className="hm-lead">
          <strong>{LEAD_BOLD}</strong> {LEAD}
        </p>
        <div className="hm-actions">
          <Link className="hm-btn hm-btn-solid" to="/compendium">Open the compendium <span aria-hidden>→</span></Link>
          <button type="button" className="hm-btn" onClick={studyForExam}>Study for an exam</button>
        </div>
      </header>
      </div>

      {/* window-wide separator, outside the centred column */}
      <div className="hm-band"><WaveBand /></div>

      <div className="wrap">

      <section className="hm-switch" aria-label="Explore Hamplitude">
        <div className="hm-tabbar">
          <div className="hm-tabs" role="tablist" aria-label="Sections">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el }}
                type="button"
                role="tab"
                id={`hm-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`hm-panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className="hm-tab"
                onClick={() => select(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hm-panels" ref={panelsRef}>
          {/* ───── explore ───── */}
          <div role="tabpanel" id="hm-panel-explore" aria-labelledby="hm-tab-explore" className="hm-panel" hidden={tab !== 'explore'}>
            <section className="hm-block" aria-labelledby="hm-index-title">
              <p className="hm-label">Compendium</p>
              <h2 className="hm-h2 hm-sr" id="hm-index-title">Compendium sections</h2>
              <ol className="hm-tiles" aria-label="Compendium sections">
                {sections.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/compendium/${s.slug}`} className="hm-tile">
                      <span className="hm-tile-ico"><SectionIcon name={s.icon} size={22} /></span>
                      <span className="hm-tile-name">{s.title}</span>
                      <span className="hm-tile-n">{s.count} articles</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            {feature && (
              <article className="hm-block hm-feature" aria-labelledby="hm-feature-title">
                <div className="hm-feature-copy">
                  <p className="hm-label">Featured article</p>
                  <h2 className="hm-h2" id="hm-feature-title"><Link to={featureHref}>{feature.title}</Link></h2>
                  <p className="hm-dek">{feature.summary}</p>
                  <p className="hm-dek hm-dek-2">{FEATURE_BLURB}</p>
                  <Link className="hm-more" to={featureHref}>Read “{feature.title}” <span aria-hidden>→</span></Link>
                </div>
                <div className="hm-feature-vis"><FeatureDiagram /></div>
              </article>
            )}

            {collSub && (
              <section className="hm-block" aria-labelledby="hm-coll-title">
                <div className="hm-coll">
                <div className="hm-coll-head">
                  <p className="hm-label hm-label-accent">New collection · {collSub.articles.length} articles</p>
                  <h2 className="hm-h2" id="hm-coll-title">{collSub.title}</h2>
                  <p className="hm-dek">{collSub.blurb}</p>
                  <Link className="hm-btn hm-btn-solid" to={collHref}>See all {collSub.articles.length} articles <span aria-hidden>→</span></Link>
                </div>
                <ol className="hm-coll-list">
                  {collPicks.map((p) => (
                    <li key={p.href}>
                      <Link to={p.href}>
                        <strong>{p.title}</strong>
                        <span>{p.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                </div>
              </section>
            )}
          </div>

          {/* ───── exam study guides ───── */}
          <div role="tabpanel" id="exams" aria-labelledby="hm-tab-exams" className="hm-panel" hidden={tab !== 'exams'}>
            <div className="hm-exams-head">
              <p className="hm-label">Exam study guides</p>
              <h2 className="hm-h2">Studying for an exam?</h2>
              <p className="hm-dek">{EXAMS_DEK}</p>
            </div>
            <div className="hm-lics">
              {licenses.map((l) => (
                <Link key={l.id} to={`/${l.id}`} className="hm-lic" style={{ ['--lic' as string]: `var(--${l.id})` }}>
                  <div className="hm-lic-top">
                    <h3 className="hm-h3">{l.name}</h3>
                    <Ring value={l.mastered} size={48} />
                  </div>
                  <p className="hm-lic-tag">{l.tagline}. {l.privileges}.</p>
                  <p className="hm-lic-facts">{l.lessons} lessons · {l.questions} pool questions · {l.toPass} of {l.examQuestions} to pass</p>
                  <p className="hm-lic-valid">Pool {l.validFrom} – {l.validTo}</p>
                  <span className="hm-lic-cta">{l.started ? 'Continue' : 'Start learning'} <span aria-hidden>→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
