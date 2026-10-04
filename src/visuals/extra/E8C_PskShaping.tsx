import { C, Diagram, T, TAU } from '../kit'

type Kind = 'peak' | 'zero' | 'shaped'
/** PSK phase reversal three ways: at a wave peak (sudden jump), at a zero crossing, and PSK31-style with a smooth sinusoidal envelope. */
export function PskShaping() {
  const x0 = 40, x1 = 600, cyc = 14
  const rows: { y: number; kind: Kind; name: string; sub: string; col: string }[] = [
    { y: 92, kind: 'peak', name: 'Phase flips at a peak', sub: 'sudden jump: wide, splattery', col: C.bad },
    { y: 206, kind: 'zero', name: 'Phase flips at a zero crossing', sub: 'no jump in the wave: narrower', col: C.resist },
    { y: 320, kind: 'shaped', name: 'PSK31: smooth sinusoidal pulse', sub: 'amplitude eases to zero at the flip: narrowest', col: C.good },
  ]
  const path = (kind: Kind, cy: number) => {
    const N = 700
    const pts: string[] = []
    for (let i = 0; i <= N; i++) {
      const u = i / N
      const flip = u >= 0.5 ? -1 : 1
      const ph = TAU * cyc * u + (kind === 'peak' ? Math.PI / 2 : 0) // flip lands on a peak, or on a zero crossing
      let env = 1
      if (kind === 'shaped') { const d = Math.abs(u - 0.5); const w = 0.14; if (d < w) env = 0.5 * (1 - Math.cos((Math.PI * d) / w)) }
      pts.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(cy - 30 * env * flip * Math.sin(ph)).toFixed(1)}`)
    }
    return pts.join('')
  }
  return (
    <Diagram w={640} h={372} title="A PSK phase reversal drawn three ways. Reversing at a wave peak makes a sudden jump and a wide signal. Reversing at a zero crossing avoids the jump and keeps the signal narrower. PSK31 also shapes the amplitude as a smooth sinusoidal pulse to keep bandwidth minimal."
      caption="Smooth changes make narrow signals. Abrupt changes make wide ones.">
      {rows.map((r) => (
        <g key={r.kind}>
          <T x={x0} y={r.y - 64} size={14} bold color={r.col}>{r.name}</T>
          <T x={x0 + 0} y={r.y - 46} size={12.5} color={C.muted}>{r.sub}</T>
          <line x1={x0} y1={r.y} x2={x1} y2={r.y} stroke={C.fill2} strokeWidth={1} />
          <path d={path(r.kind, r.y)} fill="none" stroke={r.col} strokeWidth={2} strokeLinejoin="round" />
        </g>
      ))}
    </Diagram>
  )
}
