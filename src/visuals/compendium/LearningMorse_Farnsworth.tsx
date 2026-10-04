import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

// PARIS: P .--. | A .- | R .-. | I .. | S ...
const WORD = ['.--.', '.-', '.-.', '..', '...']
// one PARIS = 31 units inside the letters + 19 units of gaps (4 letter gaps x 3, 1 word gap x 7) = 50

interface Seg { on: boolean; u: number; gap?: 'in' | 'letter' | 'word' }

function build(): Seg[] {
  const s: Seg[] = []
  WORD.forEach((ch, li) => {
    if (li) s.push({ on: false, u: 3, gap: 'letter' })
    ;[...ch].forEach((el, ei) => {
      if (ei) s.push({ on: false, u: 1, gap: 'in' })
      s.push({ on: true, u: el === '.' ? 1 : 3 })
    })
  })
  s.push({ on: false, u: 7, gap: 'word' })
  return s
}

/** The same word PARIS at the same average speed: standard timing versus fast characters with stretched gaps. */
export function LearningMorse_Farnsworth() {
  const [c, setC] = useState(20)
  const [s, setS] = useState(10)
  const eff = Math.min(s, c)
  const k = (60 * c / eff - 37.2) / 22.8 // stretch factor applied to letter and word gaps
  const segs = build()
  const X0 = 20, W = 600
  const total = 60 / eff // seconds for one PARIS at effective speed
  const pxs = W / total // px per second

  const strip = (y: number, unit: number, stretch: number, color: string, label: string, sub: string) => {
    let x = X0
    const bars = segs.map((g, i) => {
      const d = g.u * unit * (g.gap === 'letter' || g.gap === 'word' ? stretch : 1)
      const w = d * pxs
      const el = g.on ? <rect key={i} x={x} y={y + 18} width={Math.max(w - 0.6, 0.8)} height={22} rx={Math.min(3, w / 2)} fill={color} /> : null
      x += w
      return el
    })
    return (
      <g>
        <T x={X0} y={y} size={13.5} bold color={color}>{label}</T>
        <T x={X0 + W} y={y} size={12.5} anchor="end" color={C.muted}>{sub}</T>
        <rect x={X0} y={y + 14} width={W} height={30} rx={4} fill={C.fill} />
        {bars}
      </g>
    )
  }

  const fU = 1.2 / c, sU = 1.2 / eff
  return (
    <>
      <Diagram w={640} h={212} title={`The word PARIS sent at ${eff} words per minute. Standard timing makes every element slow. Farnsworth timing sends each character at ${c} words per minute and stretches the gaps ${k.toFixed(1)} times, so the word takes the same total time`}
        caption="Both strips last exactly the same time. Farnsworth packs the letters fast and spends the saved time in the gaps.">
        {strip(24, sU, 1, C.muted, `Standard: everything at ${eff} WPM`, `1 dit = ${Math.round(sU * 1000)} ms`)}
        {strip(100, fU, k, C.signal, `Farnsworth: characters at ${c} WPM, effective ${eff} WPM`, `1 dit = ${Math.round(fU * 1000)} ms`)}
        <T x={X0} y={170} size={12.5} color={C.muted}>0 s</T>
        <T x={X0 + W} y={170} size={12.5} anchor="end" color={C.muted}>{total.toFixed(1)} s (one PARIS)</T>
        <T x={X0} y={194} size={13} color={C.ink}>Gaps between letters and words are stretched about <tspan fontWeight={700}>{k.toFixed(1)}×</tspan>.</T>
      </Diagram>
      <Controls>
        <Slider label="Character speed" value={c} min={15} max={30} onChange={(v) => { setC(v); if (s > v) setS(v) }} format={(v) => `${v} WPM`} color="var(--d-signal)" />
        <Slider label="Effective speed" value={eff} min={5} max={c} onChange={setS} format={(v) => `${v} WPM`} color="var(--d-power)" />
        <Readout label="Gap stretch" value={k.toFixed(1)} unit="×" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
