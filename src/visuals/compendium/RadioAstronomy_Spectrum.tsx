import { C, Diagram, Ln, T } from '../kit'

const F0 = 10, F1 = 10000 // MHz, log axis
const x0 = 190, x1 = 616
const X = (f: number) => x0 + ((x1 - x0) * Math.log10(f / F0)) / Math.log10(F1 / F0)

const ROWS: { label: string; sub: string; lo: number; hi: number; color: string }[] = [
  { label: 'Jupiter storms', sub: 'about 15 to 30 MHz', lo: 15, hi: 30, color: C.power },
  { label: 'Meteor echoes', sub: 'echoes of distant stations', lo: 30, hi: 150, color: C.resist },
  { label: 'Sun noise and bursts', sub: 'across the whole range', lo: 20, hi: 10000, color: C.voltage },
  { label: 'Galactic background', sub: 'fades with frequency', lo: 10, hi: 1000, color: C.signal },
  { label: 'Hydrogen line', sub: '1420.4 MHz (21 cm)', lo: 1405, hi: 1436, color: C.good },
  { label: 'Solar flux index', sub: '2800 MHz (10.7 cm)', lo: 2700, hi: 2900, color: C.current },
]

/** Where amateur radio astronomers listen, on a log frequency axis. */
export function RadioAstronomy_Spectrum() {
  const rowY = (i: number) => 50 + i * 44
  const axisY = rowY(ROWS.length - 1) + 40
  return (
    <Diagram w={640} h={axisY + 56}
      title="Frequency ranges where amateurs observe the sky: Jupiter storms near 20 MHz, meteor echoes in the VHF range, solar noise across the spectrum, galactic background strongest at low frequencies, the hydrogen line at 1420 MHz and the solar flux index at 2800 MHz"
      caption="Frequency on a log scale. Ranges are approximate, and many observations are receive-only.">
      <T x={14} y={20} size={13} bold>What you can listen to, and where</T>
      {[10, 100, 1000, 10000].map((f) => (
        <g key={f}>
          <Ln x1={X(f)} y1={36} x2={X(f)} y2={axisY} color={C.fill2} width={1} />
          <T x={X(f)} y={axisY + 16} anchor="middle" size={12} color={C.muted}>{f >= 1000 ? `${f / 1000} GHz` : `${f} MHz`}</T>
        </g>
      ))}
      <Ln x1={x0} y1={axisY} x2={x1} y2={axisY} color={C.muted} width={2} />
      {[
        [50, '6 m'], [144, '2 m'], [432, '70 cm'], [1296, '23 cm'],
      ].map(([f, n]) => (
        <g key={String(n)}>
          <Ln x1={X(Number(f))} y1={axisY} x2={X(Number(f))} y2={axisY + 6} color={C.muted} width={2} />
          <T x={X(Number(f))} y={axisY + 34} anchor="middle" size={12} color={C.muted}>{n}</T>
        </g>
      ))}
      {ROWS.map((r, i) => (
        <g key={r.label}>
          <T x={14} y={rowY(i) - 6} size={13} bold>{r.label}</T>
          <T x={14} y={rowY(i) + 11} size={12} color={C.muted}>{r.sub}</T>
          <rect x={X(r.lo)} y={rowY(i) - 8} width={Math.max(8, X(r.hi) - X(r.lo))} height={18} rx={9} fill={r.color} fillOpacity={0.75} stroke={r.color} strokeWidth={1.5} />
        </g>
      ))}
    </Diagram>
  )
}
