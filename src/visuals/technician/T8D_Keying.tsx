import { C, Diagram, Ln, T, TAU } from '../kit'

const BITS = [1, 0, 1, 1, 0, 0, 1, 0]

/** CW switches the carrier on and off. PSK keeps it on and flips its phase. */
export function Keying() {
  const x0 = 150, bw = 59, cyc = 3
  const rows = [
    { y: 150, name: 'CW', sub: 'on / off', col: C.resist },
    { y: 250, name: 'PSK', sub: 'phase flips', col: C.signal },
  ]
  const wave = (kind: 'cw' | 'psk') => {
    const pts: string[] = []
    const n = BITS.length * 60
    for (let i = 0; i <= n; i++) {
      const u = i / 60, b = Math.min(BITS.length - 1, Math.floor(u))
      const sgn = kind === 'psk' && !BITS[b] ? -1 : 1
      const on = kind === 'cw' ? BITS[b] : 1
      pts.push(`${i ? 'L' : 'M'}${(x0 + u * bw).toFixed(1)},${(-on * sgn * 24 * Math.sin(TAU * cyc * (u % 1) + 0)).toFixed(1)}`)
    }
    return pts.join('')
  }
  return (
    <Diagram w={640} h={296} title="The same bits sent two ways. CW turns the carrier on for a one and off for a zero. PSK keeps the carrier on and flips its phase by 180 degrees for a zero" caption="CW: Morse by switching the carrier. PSK: data by flipping the wave's phase.">
      <T x={14} y={42} size={15} bold>Data</T>
      {BITS.map((b, i) => (
        <g key={i}>
          <rect x={x0 + i * bw + 3} y={26} width={bw - 6} height={32} rx={6} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
          <T x={x0 + i * bw + bw / 2} y={42} anchor="middle" size={17} bold mono>{b}</T>
          <Ln x1={x0 + i * bw} y1={64} x2={x0 + i * bw} y2={290} color={C.fill2} width={1.5} />
        </g>
      ))}
      <Ln x1={x0 + 8 * bw} y1={64} x2={x0 + 8 * bw} y2={290} color={C.fill2} width={1.5} />
      {rows.map((r) => (
        <g key={r.name}>
          <T x={14} y={r.y - 9} size={15} bold color={r.col}>{r.name}</T>
          <T x={14} y={r.y + 11} size={12.5} color={C.muted}>{r.sub}</T>
          <Ln x1={x0} y1={r.y} x2={x0 + 8 * bw} y2={r.y} color={C.fill2} width={1} dash="3 5" />
          <path d={wave(r.name === 'CW' ? 'cw' : 'psk')} transform={`translate(0,${r.y})`} fill="none" stroke={r.col} strokeWidth={2.5} strokeLinejoin="round" />
        </g>
      ))}
    </Diagram>
  )
}
