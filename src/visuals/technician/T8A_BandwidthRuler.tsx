import { C, Diagram, Ln, T } from '../kit'

const X0 = 40, PX = 112 // px per decade; 100 Hz at X0
const len = (hz: number) => (Math.log10(hz / 100)) * PX

/** Bandwidths as bar lengths on a log scale (each tick is x10). */
export function BandwidthRuler() {
  const W = 640, H = 305
  const rows: { y: number; name: string; val: string; hz: number; hz2?: number; color: string }[] = [
    { y: 30, name: 'CW', val: '≈ 150 Hz', hz: 150, color: C.signal },
    { y: 90, name: 'SSB voice', val: '≈ 3 kHz', hz: 3000, color: C.current },
    { y: 150, name: 'FM voice (repeater)', val: '10 – 15 kHz', hz: 10000, hz2: 15000, color: C.resist },
    { y: 210, name: 'Fast-scan TV', val: '≈ 6 MHz', hz: 6e6, color: C.power },
  ]
  const ticks = [['100 Hz', 100], ['1 kHz', 1e3], ['10 kHz', 1e4], ['100 kHz', 1e5], ['1 MHz', 1e6], ['10 MHz', 1e7]] as const
  return (
    <Diagram w={W} h={H} title="Bandwidth to scale on a log axis: CW about 150 hertz, SSB about 3 kilohertz, FM voice 10 to 15 kilohertz, fast-scan TV about 6 megahertz" caption="Longer bar = wider signal. Log scale: every tick is ten times the last, so TV is far wider than it looks.">
      {ticks.map(([l, hz]) => (
        <g key={l}>
          <Ln x1={X0 + len(hz)} y1={14} x2={X0 + len(hz)} y2={262} color={C.fill2} width={1.5} />
          <T x={X0 + len(hz)} y={282} anchor="middle" size={12} color={C.muted}>{l}</T>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.name}>
          <T x={X0} y={r.y} size={14.5} bold>{r.name}</T>
          <T x={W - 20} y={r.y} size={14.5} bold anchor="end" color={r.color}>{r.val}</T>
          <rect x={X0} y={r.y + 14} width={len(r.hz)} height={22} rx={6} fill={r.color} />
          {r.hz2 && <rect x={X0 + len(r.hz)} y={r.y + 14} width={len(r.hz2) - len(r.hz)} height={22} rx={6} fill={r.color} opacity={0.45} />}
        </g>
      ))}
      <Ln x1={X0} y1={262} x2={X0 + len(1e7)} y2={262} color={C.muted} width={2} />
    </Diagram>
  )
}
