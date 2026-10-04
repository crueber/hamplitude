import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, si } from '../kit'

const AL = 50 // nH per turn squared: an illustrative core, not a specific part

/** Winding a toroid: each pass through the hole is one turn, and inductance grows with the square of the turns. */
export function InductorsAndFerrites_ToroidTurns() {
  const [n, setN] = useState(10)
  const L = AL * n * n * 1e-9 // henries
  const cx = 190, cy = 140, ro = 96, ri = 52
  const span = 300 // degrees of winding; the gap on the left is where the two leads leave
  const start = 120 // degrees (measured clockwise from the positive x axis in SVG)
  const turns = Array.from({ length: n }, (_, i) => {
    const a = ((start + (n === 1 ? span / 2 : (i * span) / (n - 1))) * Math.PI) / 180
    return { x1: cx + (ri - 7) * Math.cos(a), y1: cy + (ri - 7) * Math.sin(a), x2: cx + (ro + 7) * Math.cos(a), y2: cy + (ro + 7) * Math.sin(a) }
  })
  const aS = (start * Math.PI) / 180, aE = ((start + span) * Math.PI) / 180
  const lead = (a: number): [number, number][] => [
    [cx + (ro + 7) * Math.cos(a), cy + (ro + 7) * Math.sin(a)],
    [cx + (ro + 24) * Math.cos(a), cy + (ro + 24) * Math.sin(a)],
  ]
  return (
    <>
      <Diagram w={640} h={290}
        title={`A toroid wound with ${n} turns. With an example core of 50 nanohenries per turn squared, the inductance is ${si(L, 'H')}`}
        caption="Count the wire passing through the hole, not the loops on the outside. Double the turns and the inductance quadruples.">
        <circle cx={cx} cy={cy} r={ro} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={ri} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <T x={cx} y={cy} anchor="middle" size={13} color={C.muted}>hole</T>
        {turns.map((t, i) => (
          <Ln key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} color={C.current} width={3} />
        ))}
        <Ln x1={lead(aS)[0][0]} y1={lead(aS)[0][1]} x2={lead(aS)[1][0]} y2={lead(aS)[1][1]} color={C.current} width={3} />
        <Ln x1={lead(aE)[0][0]} y1={lead(aE)[0][1]} x2={lead(aE)[1][0]} y2={lead(aE)[1][1]} color={C.current} width={3} />
        <T x={cx} y={266} anchor="middle" size={12} color={C.muted}>leads (top view of the ring)</T>

        <T x={380} y={40} size={14} bold>Inductance of a wound core</T>
        <T x={380} y={74} size={22} bold mono color={C.power}>L = AL × N²</T>
        <T x={380} y={108} size={13} color={C.muted}>AL = 50 nH per turn² (example core)</T>
        <T x={380} y={128} size={13} color={C.muted}>N = {n} turns</T>
        <T x={380} y={166} size={13} color={C.muted}>50 × {n}² = {(AL * n * n).toLocaleString('en-US')} nH</T>
        <T x={380} y={202} size={26} bold mono color={C.power}>{si(L, 'H')}</T>
        <T x={380} y={240} size={13} color={C.muted}>{n >= 2 && n <= 15 ? `${2 * n} turns would give ${si(4 * L, 'H')}` : 'AL comes from the core maker’s data'}</T>
      </Diagram>
      <Controls>
        <Slider label="Turns through the hole" value={n} min={1} max={30} onChange={setN} color={C.current} />
        <Readout label="Inductance" value={si(L, 'H')} color={C.power} />
      </Controls>
    </>
  )
}
