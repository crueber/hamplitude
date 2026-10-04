import { C, Diagram, Ln, T } from '../kit'

interface Row { name: string; note: string; lo: number; hi: number; color: string; polar?: boolean }
// Typical, illustrative ranges in farads. Real parts extend beyond these at both ends.
const ROWS: Row[] = [
  { name: 'Ceramic, C0G / NP0', note: 'stable, low loss: RF and tuning', lo: 1e-12, hi: 1e-8, color: C.signal },
  { name: 'Ceramic, X7R and similar', note: 'small and cheap: bypassing', lo: 1e-10, hi: 1e-5, color: C.signal },
  { name: 'Silver mica', note: 'very stable: RF circuits', lo: 1e-12, hi: 1e-8, color: C.power },
  { name: 'Film (polyester, polypropylene)', note: 'stable, general purpose', lo: 1e-9, hi: 1e-5, color: C.current },
  { name: 'Aluminum electrolytic', note: 'bulk storage: power filtering', lo: 1e-6, hi: 1e-1, color: C.voltage, polar: true },
  { name: 'Tantalum', note: 'compact, polarised', lo: 1e-7, hi: 1e-3, color: C.voltage, polar: true },
  { name: 'Air variable', note: 'tuning: adjustable plates', lo: 1e-11, hi: 5e-10, color: C.resist },
]

/** Log-scale chart of the typical capacitance range of each capacitor family. */
export function Capacitors_Ranges() {
  const x0 = 250, x1 = 620, d0 = -12, d1 = -1
  const px = (f: number) => x0 + ((Math.log10(f) - d0) / (d1 - d0)) * (x1 - x0)
  const y0 = 56, rh = 40
  const ticks: [number, string][] = [[1e-12, '1 pF'], [1e-9, '1 nF'], [1e-6, '1 µF'], [1e-3, '1 mF']]
  return (
    <Diagram w={640} h={y0 + ROWS.length * rh + 40}
      title="Typical capacitance ranges on a logarithmic scale: ceramic and mica cover picofarads to nanofarads, film covers nanofarads to microfarads, electrolytic and tantalum cover microfarads and above"
      caption="Typical ranges on a log scale, for illustration. Real parts stretch past both ends of each bar.">
      <T x={20} y={22} size={14} bold>Capacitor family</T>
      <T x={x0} y={22} size={13} color={C.muted}>capacitance (each tick is ×1000)</T>
      {ticks.map(([f, label]) => (
        <g key={label}>
          <Ln x1={px(f)} y1={y0 - 14} x2={px(f)} y2={y0 + ROWS.length * rh - 8} color={C.muted} width={1} dash="3 4" />
          <T x={px(f)} y={y0 + ROWS.length * rh + 8} anchor="middle" size={12} color={C.muted}>{label}</T>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        return (
          <g key={r.name}>
            <T x={20} y={y + 2} size={13} bold>{r.name}</T>
            <T x={20} y={y + 20} size={12} color={C.muted}>{r.note}</T>
            <rect x={px(r.lo)} y={y - 7} width={px(r.hi) - px(r.lo)} height={18} rx={9} fill={r.color} fillOpacity={0.8} />
            {r.polar && <T x={px(r.hi) - 10} y={y + 2} anchor="end" size={12} bold color={C.bg}>+ −</T>}
          </g>
        )
      })}
    </Diagram>
  )
}
