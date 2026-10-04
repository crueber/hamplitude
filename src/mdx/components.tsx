import type { ReactNode } from 'react'
import { getQuestion } from '@/data'

/**
 * Layout components available in every lesson (.mdx) without importing.
 * Visuals are imported explicitly from '@/visuals/...' in each lesson so they code-split.
 */

/** One idea. `id` is the anchor; `qs` lists the question ids this card equips you to answer. */
export function Concept({ id, title, qs, children }: { id: string; title: string; qs?: string; children: ReactNode }) {
  const ids = qs?.split(/[\s,]+/).filter(Boolean) ?? []
  return (
    <section className="concept" id={id}>
      <h3 className="concept-title">
        <span className="concept-num" aria-hidden />
        {title}
      </h3>
      <div className="concept-body">{children}</div>
      {ids.length > 0 && (
        <footer className="concept-qs" aria-label="Questions this covers">
          <span>Covers</span>
          {ids.map((q) => (
            <span key={q} className="qchip" title={getQuestion(q)?.q}>
              {q}
            </span>
          ))}
        </footer>
      )}
    </section>
  )
}

/** The one thing to remember. Keep to a single line. */
export function Key({ children }: { children: ReactNode }) {
  return (
    <p className="key">
      <span className="key-tag">Remember</span>
      <span>{children}</span>
    </p>
  )
}

export function Callout({ kind = 'tip', title, children }: { kind?: 'tip' | 'warn' | 'note'; title?: string; children: ReactNode }) {
  const label = title ?? { tip: 'Tip', warn: 'Watch out', note: 'Note' }[kind]
  return (
    <aside className={`callout callout-${kind}`}>
      <strong>{label}</strong>
      <div>{children}</div>
    </aside>
  )
}

/** Memory hook, e.g. "ELI the ICE man". */
export function Mnemonic({ children }: { children: ReactNode }) {
  return (
    <p className="mnemonic">
      <span className="mnemonic-tag">Memory hook</span>
      {children}
    </p>
  )
}

/** A formula or worked line, set in mono and centred. */
export function Formula({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="formula">
      {label && <span className="formula-label">{label}</span>}
      <code>{children}</code>
    </div>
  )
}

/** Text + visual side by side on wide screens, stacked on narrow. */
export function Row({ children, cols = '1fr 1fr' }: { children: ReactNode; cols?: string }) {
  return (
    <div className="row" style={{ '--cols': cols } as React.CSSProperties}>
      {children}
    </div>
  )
}

/** A small labelled chip, for terms in running text. */
export function Term({ children }: { children: ReactNode }) {
  return <span className="term">{children}</span>
}

export const mdxComponents = { Concept, Key, Callout, Mnemonic, Formula, Row, Term }
