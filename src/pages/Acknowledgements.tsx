import { Link } from 'react-router-dom'
import contributors from '@/data/contributors.json'

/** Add people to src/data/contributors.json; this page renders whatever is in it. */
interface Contributor {
  name: string
  callsign?: string
  /** profile or project link */
  url?: string
  /** one line on what they contributed */
  contribution?: string
}

const REPO = 'https://github.com/crueber/hamplitude'
const people = contributors as Contributor[]

export function Acknowledgements() {
  return (
    <div className="wrap ack">
      <header className="ack-head">
        <div className="eyebrow">Acknowledgements</div>
        <h1>Built on other people's generosity</h1>
        <p className="lead">Hamplitude exists because of the people below. Thank you.</p>
      </header>

      <section className="ack-inspire" aria-labelledby="ack-inspire">
        <h2 id="ack-inspire" className="ack-h2">Where it started</h2>
        <div className="ack-family">
          <div className="ack-call">
            <span className="ack-sign">KG0KJ</span>
            <span className="ack-rel">My dad</span>
          </div>
          <div className="ack-call">
            <span className="ack-sign">WA0EWJ</span>
            <span className="ack-rel">My grandfather, my dad's dad</span>
          </div>
        </div>
        <p className="ack-note">
          Two generations of amateur radio operators, and the reason I became one. They are my inspiration for getting on the air,
          and every hour that went into Hamplitude is a thank-you to them.
        </p>
      </section>

      <section aria-labelledby="ack-mentions">
        <h2 id="ack-mentions" className="ack-h2">Honorable mentions</h2>
        <div className="ack-grid">
          <article className="ack-card">
            <h3>KI6NAZ <small>Ham Radio Crash Course</small></h3>
            <p>
              KI6NAZ's amazing work on Ham Radio Crash Course was part of my own inspiration, and has shown a great many people how
              much fun this hobby can be.
            </p>
            <a href="https://www.hrcc.stream/" target="_blank" rel="noreferrer">Visit Ham Radio Crash Course →</a>
          </article>
          <article className="ack-card">
            <h3>Signal Stuff <small>HamStudy.org</small></h3>
            <p>
              Signal Stuff's HamStudy.org has helped a great many people study for their license and get on the air. Hamplitude is
              one more way in, and it stands on the path they helped make.
            </p>
            <a href="https://hamstudy.org/" target="_blank" rel="noreferrer">Visit HamStudy.org →</a>
          </article>
        </div>
      </section>

      <section aria-labelledby="ack-contrib">
        <h2 id="ack-contrib" className="ack-h2">Open-source contributors</h2>
        <p className="ack-sub">
          Hamplitude is open source. Fix a mistake, sharpen an explanation, or add a diagram and you'll be listed here.{' '}
          <a href={REPO} target="_blank" rel="noreferrer">Contribute on GitHub</a> ·{' '}
          <a href={`${REPO}/issues`} target="_blank" rel="noreferrer">Report a problem</a>
        </p>
        {people.length === 0 ? (
          <div className="ack-empty">
            <strong>No contributors yet.</strong>
            <span>This list is waiting for its first name. It could be yours.</span>
          </div>
        ) : (
          <ul className="ack-people">
            {people.map((c) => (
              <li key={`${c.name}-${c.callsign ?? ''}`}>
                <span className="ack-pname">
                  {c.url ? <a href={c.url} target="_blank" rel="noreferrer">{c.name}</a> : c.name}
                  {c.callsign && <code>{c.callsign}</code>}
                </span>
                {c.contribution && <span className="ack-pdo">{c.contribution}</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="ack-pools">
        <h2 id="ack-pools" className="ack-h2">The question pools</h2>
        <p className="ack-sub">
          Every exam question on this site comes from the NCVEC Question Pool Committee's public-domain pools. Thank you to the
          committee, and to the volunteer examiners who keep the pools current and run the exams.
        </p>
      </section>

      <p className="ack-sign-off">Thank you, and 73. <span>Chris, N0ZSY</span></p>
      <p className="ack-back"><Link to="/">← Back to Hamplitude</Link></p>
    </div>
  )
}
