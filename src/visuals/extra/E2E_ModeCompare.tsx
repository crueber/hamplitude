import { C, Diagram, T } from '../kit'

const GX0 = 170, GX1 = 470
const LO = Math.log10(20), HI = Math.log10(4000)
const gx = (hz: number) => GX0 + ((Math.log10(hz) - LO) / (HI - LO)) * (GX1 - GX0)

const ROWS = [
  { name: 'FT8', hz: 50, lab: '~50 Hz', col: C.good, tag: 'narrowest' },
  { name: '45-baud RTTY', sub: '170 Hz shift', hz: 250, lab: '~250 Hz', col: C.signal },
  { name: 'MFSK16', hz: 316, lab: '~316 Hz', col: C.current },
  { name: 'PACTOR IV', hz: 2400, lab: '~2.4 kHz', col: C.power, tag: 'fastest' },
]

/** Bandwidth on a log scale: the weak-signal mode is narrowest, the high-speed data mode is widest and fastest. */
export function E2E_ModeCompare() {
  return (
    <Diagram w={640} h={296} title="Occupied bandwidth of four HF digital modes on a log scale. FT8 is narrowest, about 50 hertz. 45 baud RTTY and MFSK16 are a few hundred hertz. PACTOR IV is widest, about 2.4 kilohertz, and has the highest throughput in clear conditions."
      caption="Wider channel, more data per second. FT8 trades speed for a razor-thin signal.">
      <T x={GX0} y={20} size={13} bold color={C.muted}>bandwidth (log scale)</T>
      {[50, 500, 2400].map((f) => (
        <g key={f}>
          <line x1={gx(f)} y1={34} x2={gx(f)} y2={216} stroke={C.fill2} strokeWidth={1} strokeDasharray="3 5" />
          <T x={gx(f)} y={232} anchor="middle" size={12} color={C.muted}>{f >= 1000 ? `${f / 1000} kHz` : `${f} Hz`}</T>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = 44 + i * 42
        return (
          <g key={r.name}>
            <T x={GX0 - 12} y={y + 12} anchor="end" size={14} bold>{r.name}</T>
            {r.sub && <T x={GX0 - 12} y={y + 29} anchor="end" size={11.5} color={C.muted}>{r.sub}</T>}
            <rect x={GX0} y={y} width={gx(r.hz) - GX0} height={26} rx={6} fill={r.col} fillOpacity={0.3} stroke={r.col} strokeWidth={2.5} />
            <T x={gx(r.hz) + 8} y={y + 13} size={13} bold color={r.col}>{r.lab}{r.tag ? ` · ${r.tag}` : ''}</T>
          </g>
        )
      })}
      <T x={20} y={258} size={13} color={C.muted}>Approximate occupied bandwidths.</T>
      <T x={20} y={278} size={13} color={C.muted}>Narrowest: FT8. Highest throughput in clear conditions: PACTOR IV.</T>
    </Diagram>
  )
}
