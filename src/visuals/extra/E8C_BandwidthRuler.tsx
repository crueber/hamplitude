import { C, Diagram, Ln, T } from '../kit'

const X0 = 40, PX = 130 // px per decade; 10 Hz at X0
const len = (hz: number) => Math.log10(hz / 10) * PX

/** Bandwidths from the pool on a log scale, with the working for each. */
export function BandwidthRulerE() {
  const rows: { y: number; name: string; val: string; work: string; hz: number; color: string }[] = [
    { y: 20, name: 'CW at 13 WPM', val: '52 Hz', work: 'about 4 × WPM = 13 × 4 = 52 Hz', hz: 52, color: C.resist },
    { y: 96, name: 'FT8', val: '50 Hz', work: 'a fixed 50 Hz', hz: 50, color: C.signal },
    { y: 172, name: 'SSB voice', val: '≈ 3 kHz', work: 'from Technician', hz: 3000, color: C.current },
    { y: 248, name: '9600-baud, 4.8 kHz shift FM', val: '15.36 kHz', work: 'baud + 1.2 × shift = 9.6 + 1.2 × 4.8 = 15.36 kHz', hz: 15360, color: C.power },
  ]
  const ticks = [['10 Hz', 10], ['100 Hz', 100], ['1 kHz', 1e3], ['10 kHz', 1e4], ['100 kHz', 1e5]] as const
  return (
    <Diagram w={640} h={358} title="Bandwidths on a log scale: 13 words per minute CW is 52 hertz, FT8 is 50 hertz, SSB voice about 3 kilohertz, and a 9600 baud 4.8 kilohertz shift FM data signal is 15.36 kilohertz."
      caption="Log scale: each tick is ten times the last. Data modes can be as narrow as CW.">
      {ticks.map(([l, hz]) => (
        <g key={l}>
          <Ln x1={X0 + len(hz)} y1={10} x2={X0 + len(hz)} y2={322} color={C.fill2} width={1.5} />
          <T x={X0 + len(hz)} y={340} anchor="middle" size={12} color={C.muted}>{l}</T>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.name}>
          <T x={X0} y={r.y} size={14.5} bold>{r.name}</T>
          <T x={X0 + 580} y={r.y} size={14.5} bold anchor="end" color={r.color}>{r.val}</T>
          <rect x={X0} y={r.y + 14} width={len(r.hz)} height={22} rx={6} fill={r.color} />
          <T x={X0} y={r.y + 52} size={12.5} color={C.muted}>{r.work}</T>
        </g>
      ))}
      <Ln x1={X0} y1={322} x2={X0 + 4 * PX} y2={322} color={C.muted} width={2} />
    </Diagram>
  )
}
