import { Link } from 'react-router-dom'
import { LICENSES, LICENSE_BLURB, POOLS } from '@/data'
import { useStore } from '@/lib/store'
import { licenseStats, pct } from '@/lib/stats'
import { Ring } from '@/components/Ring'
import { HeroArt } from '@/components/HeroArt'

const fmtDate = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export function Home() {
  const cards = useStore((s) => s.cards)
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">US amateur radio · exam prep</div>
            <h1>Understand ham radio. <em>Don't memorize it.</em></h1>
            <p className="lead">
              Short, visual explanations of the ideas behind every question in the official FCC pools — so whatever the exam asks, you can reason your way to the answer.
            </p>
            <div className="actions">
              <a className="btn btn-primary btn-lg" style={{ ['--lic' as string]: 'var(--technician)' }} href="#/technician">Start with Technician</a>
              <button className="btn btn-lg" onClick={() => document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' })}>Pick a license</button>
            </div>
          </div>
          <div className="hero-art"><HeroArt /></div>
        </div>
      </section>

      <div className="wrap">
        <Link to="/compendium" className="cmp-promo" data-license="compendium">
          <div>
            <div className="eyebrow">Compendium</div>
            <h3>Beyond the exam: everything an operator should understand</h3>
            <p>Concept articles on antennas, radios, Morse and digital modes, propagation, electronics and operating, with the same visual style. No questions, just the ideas.</p>
          </div>
          <span className="btn btn-primary">Open the compendium →</span>
        </Link>
      </div>

      <div className="wrap">
        <h2 className="section-title" id="classes">Study for your license</h2>
        <div className="lic-grid">
          {LICENSES.map((l) => {
            const p = POOLS[l]
            const st = licenseStats(cards, l)
            const m = pct(st.mastered, st.total)
            const groups = p.subelements.reduce((n, s) => n + s.groups.length, 0)
            return (
              <Link key={l} to={`/${l}`} className="lic-card" data-license={l}>
                <h3>{p.name} <Ring value={m} size={52} /></h3>
                <p className="tagline">{LICENSE_BLURB[l].tagline}. {LICENSE_BLURB[l].privileges}.</p>
                <div className="facts">
                  <div className="fact"><b>{groups}</b><span>lessons</span></div>
                  <div className="fact"><b>{p.questions.length}</b><span>pool questions</span></div>
                  <div className="fact"><b>{p.exam.questions}</b><span>on the exam</span></div>
                  <div className="fact"><b>{p.exam.toPass}</b><span>to pass (74%)</span></div>
                </div>
                <div className="valid">{p.name} pool {fmtDate(p.valid.from)} – {fmtDate(p.valid.to)}</div>
                <div className="cta">{st.seen ? 'Continue' : 'Start learning'} <span>→</span></div>
              </Link>
            )
          })}
        </div>

        <h2 className="section-title">How it works</h2>
        <div className="steps">
          <div className="step"><h3>Learn the idea</h3><p>One lesson per topic group, in plain words with a picture for every concept. No walls of text.</p></div>
          <div className="step"><h3>Test it</h3><p>Practise the real pool questions, with answers shuffled so you can't lean on letter position — and a one-line "why" after every answer.</p></div>
          <div className="step"><h3>Lock it in</h3><p>Missed questions come back on a spaced schedule. Then take a full practice exam shaped exactly like the real one.</p></div>
        </div>
      </div>
    </>
  )
}
