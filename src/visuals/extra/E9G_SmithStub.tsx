import { useMemo, useState } from 'react'
import { C, Choice, Controls, Diagram, Lines, Readout, Slider, T, fmt } from '../kit'
import { SmithGrid, cabs, gammaOf, neg, rotate, swrOf, zOf, halo, type Cx, type Geo } from './E9G_SmithBase'

const geo: Geo = { cx: 236, cy: 212, R: 165 }
const LOADS: Record<string, { label: string; r: number; x: number }> = {
  r100: { label: '100 Ω', r: 2, x: 0 },
  r25: { label: '25 Ω', r: 0.5, x: 0 },
  z: { label: '25 + j50 Ω', r: 0.5, x: 1 },
}

/** Admittance seen by a parallel stub d wavelengths from the load, plotted on the Smith chart read as g + jb. */
export function yAt(r: number, x: number, d: number) {
  return zOf(neg(rotate(gammaOf(r, x), d)))
}

/** Positions (in wavelengths, 0 to 0.5) where g = 1. */
export function stubPositions(r: number, x: number): number[] {
  const out: number[] = []
  let prev = yAt(r, x, 0).r - 1
  const n = 2000
  for (let i = 1; i <= n; i++) {
    const d = (0.5 * i) / n
    const cur = yAt(r, x, d).r - 1
    if (prev === 0 || prev * cur < 0) {
      let lo = (0.5 * (i - 1)) / n, hi = d
      for (let k = 0; k < 40; k++) {
        const mid = (lo + hi) / 2
        if ((yAt(r, x, lo).r - 1) * (yAt(r, x, mid).r - 1) <= 0) hi = mid
        else lo = mid
      }
      out.push((lo + hi) / 2)
    }
    prev = cur
  }
  return out
}

/** Length (wavelengths) of a shorted stub whose susceptance is -b. */
export const stubLength = (b: number) => Math.atan2(1, b) / (2 * Math.PI)

const sgn = (v: number) => (v >= 0 ? '+' : '−')

export function SmithStub() {
  const [key, setKey] = useState('r100')
  const [d, setD] = useState(0.1)
  const [stub, setStub] = useState(false)
  const L = LOADS[key]
  const sols = useMemo(() => stubPositions(L.r, L.x), [L.r, L.x])
  const y = yAt(L.r, L.x, d)
  const P: Cx = neg(rotate(gammaOf(L.r, L.x), d))
  const px = (g: Cx) => ({ x: geo.cx + geo.R * g.re, y: geo.cy - geo.R * g.im })
  const p = px(P)
  const final = gammaOf(y.r, 0)
  const pf = px(final)
  const l = stubLength(y.x)
  const swrAfter = swrOf(final)
  const swrBefore = swrOf(P)
  const arc = Array.from({ length: 41 }, (_, i) => {
    const q = px(gammaOf(y.r, y.x * (1 - i / 40)))
    return `${i ? 'L' : 'M'}${q.x.toFixed(1)},${q.y.toFixed(1)}`
  }).join('')
  const near = sols.findIndex((s) => Math.abs(s - d) < 0.003)
  const matched = stub && near >= 0
  const gC = geo.R / 2
  void gC
  return (
    <>
      <Diagram w={640} h={430}
        title={`Smith chart read as admittance. A parallel stub placed ${fmt(d, 3)} wavelengths from a ${L.label} load sees g = ${fmt(y.r, 3)}, b = ${fmt(y.x, 3)}. ${matched ? 'With the stub added the line is matched.' : ''}`}
        caption="Position decides g. The stub's length only cancels b. Both must be right: g = 1 at the stub, then the stub supplies the opposite b.">
        <SmithGrid geo={geo} admittance>
          <circle cx={geo.cx + geo.R / 2} cy={geo.cy} r={geo.R / 2} fill="none" stroke={C.good} strokeWidth={3} />
          <circle cx={geo.cx} cy={geo.cy} r={geo.R * Math.min(cabs(P), 0.999)} fill="none" stroke={C.power} strokeWidth={2.2} strokeDasharray="6 5" />
        </SmithGrid>
        {stub && <path d={arc} fill="none" stroke={C.signal} strokeWidth={4.5} strokeLinecap="round" strokeDasharray="1 8" />}
        {stub && <circle cx={pf.x} cy={pf.y} r={7} fill={C.bg} stroke={C.signal} strokeWidth={3} />}
        <circle cx={geo.cx} cy={geo.cy} r={3.5} fill={C.good} />
        <T x={geo.cx - 6} y={geo.cy + 26} anchor="middle" size={12} bold color={C.good} {...halo}>match</T>
        <circle cx={p.x} cy={p.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
        <Lines x={448} y={40} lines={['green circle:', 'g = 1. The', 'stub can only', 'slide the point', 'along it.']} lh={16} size={12} bold color={C.good} />
        <Lines x={448} y={140} lines={['violet circle:', 'the SWR, fixed', 'by the load']} lh={16} size={12} bold color={C.power} />
        <Lines x={448} y={206} lines={['dots, teal:', 'what a stub', 'adds (−b) to', 'reach the center']} lh={16} size={12} bold color={C.signal} />
        <T x={448} y={290} size={12} color={C.muted}>circles are g, arcs are b</T>
      </Diagram>
      <Controls>
        <Slider label="Stub position (from the load)" value={d} min={0} max={0.5} step={0.002} onChange={setD} format={(v) => `${fmt(v, 3)} λ`} color="var(--d-signal)" />
        <Readout label="Line admittance there" value={`${fmt(y.r, 2)} ${sgn(y.x)} j${fmt(Math.abs(y.x), 2)}`} color="var(--d-ink)" />
        <Readout label={stub ? 'SWR with stub' : 'SWR now'} value={`${fmt(stub ? swrAfter : swrBefore, 3)} : 1`} color={stub && swrAfter < 1.02 ? 'var(--d-good)' : 'var(--d-power)'} />
        {stub && <Readout label="Shorted stub length for that b" value={`${fmt(l, 3)} λ`} color="var(--d-signal)" />}
      </Controls>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Load" value={key} onChange={(v) => { setKey(v); setStub(false) }} options={Object.entries(LOADS).map(([k, v]) => ({ value: k, label: v.label }))} />
        <Choice label="Position" value={near >= 0 ? near + 1 : 0} onChange={(v) => v > 0 && setD(sols[v - 1])}
          options={sols.map((_, i) => ({ value: i + 1, label: `Match position ${i + 1}` }))} />
        <Choice label="Stub" value={stub ? 'on' : 'off'} onChange={(v) => setStub(v === 'on')} options={[{ value: 'off', label: 'No stub' }, { value: 'on', label: 'Add stub' }]} />
      </div>
    </>
  )
}
