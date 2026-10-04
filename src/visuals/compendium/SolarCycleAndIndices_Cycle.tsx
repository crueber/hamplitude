import { C, Diagram, Ln, T } from '../kit'

// Illustrative solar-flux curve over two ~11-year cycles: a steeper rise than fall, a noisy daily trace around a smooth trend.
const CYCLE = 11
const AMP = [110, 80] // the two cycles peak at different heights, as real cycles do
const base = 68
const smooth = (yr: number) => {
  const n = Math.min(1, Math.floor(yr / CYCLE))
  const p = (yr - n * CYCLE) / CYCLE
  return base + AMP[n] * Math.pow(Math.sin(Math.PI * Math.pow(p, 0.678)), 2)
}

/** Schematic of the roughly 11-year solar cycle, showing why higher HF bands open near the peak. */
export function SolarCycleAndIndices_Cycle() {
  const x0 = 56, x1 = 470, y0 = 246, y1 = 36
  const X = (yr: number) => x0 + (yr / (2 * CYCLE)) * (x1 - x0)
  const Y = (f: number) => y0 - ((f - 60) / 160) * (y0 - y1)
  const pts = Array.from({ length: 133 }, (_, i) => i / 6)
  const trend = pts.map((t, i) => `${i ? 'L' : 'M'}${X(t).toFixed(1)},${Y(smooth(t)).toFixed(1)}`).join('')
  const daily = pts
    .map((t, i) => {
      const j = 7 * Math.sin(i * 2.7) + 5 * Math.sin(i * 5.3 + 1) * (smooth(t) - base) / 100
      return `${i ? 'L' : 'M'}${X(t).toFixed(1)},${Y(Math.max(66, smooth(t) + j)).toFixed(1)}`
    })
    .join('')
  const zones: [number, string, string, string][] = [
    [150, 'above about 150', '10 m often open', C.good],
    [100, 'about 100 and up', '15 m opens reliably', C.signal],
    [70, 'near the minimum', '20 m by day; 10 m rare', C.muted],
  ]
  return (
    <Diagram w={640} h={300}
      title="Schematic of two solar cycles of about eleven years each. Solar flux rises from about 70 at minimum to a peak that differs from cycle to cycle. Near the peak the higher HF bands such as 10 and 15 metres open often; at minimum 20 metres still works in daylight"
      caption="Illustrative shape, not real data. Daily values (thin line) bounce around the smoothed trend (bold).">
      <Ln x1={x0} y1={y0} x2={x1 + 8} y2={y0} color={C.muted} width={2} arrow />
      <Ln x1={x0} y1={y0} x2={x0} y2={y1 - 12} color={C.muted} width={2} arrow />
      <T x={x0 + 8} y={y1 - 20} size={13} bold color={C.muted}>solar flux (sfu)</T>
      {[0, 11, 22].map((yr) => (
        <g key={yr}>
          <Ln x1={X(yr)} y1={y0} x2={X(yr)} y2={y0 + 5} color={C.muted} width={1.5} />
          <T x={X(yr)} y={y0 + 18} anchor="middle" size={12} color={C.muted}>{yr === 0 ? 'minimum' : yr === 11 ? 'next minimum' : 'minimum'}</T>
        </g>
      ))}
      <T x={(x0 + x1) / 2} y={y0 + 40} anchor="middle" size={12} color={C.muted}>about 11 years from one minimum to the next</T>
      {[150, 100].map((f) => (
        <Ln key={f} x1={x0} y1={Y(f)} x2={x1} y2={Y(f)} color={C.muted} width={1.5} dash="5 5" opacity={0.7} />
      ))}
      <path d={daily} fill="none" stroke={C.signal} strokeWidth={1.5} opacity={0.55} />
      <path d={trend} fill="none" stroke={C.signal} strokeWidth={4} strokeLinecap="round" />
      <T x={X(4.1)} y={Y(smooth(4.1)) - 14} anchor="middle" size={13} bold color={C.signal}>maximum</T>
      <T x={X(15.2)} y={Y(smooth(15.2)) - 14} anchor="middle" size={13} bold color={C.signal}>maximum</T>
      {zones.map(([f, a, b, col]) => (
        <g key={f}>
          <T x={486} y={Y(f) - 16} size={12.5} bold color={col}>{a}</T>
          <T x={486} y={Y(f) + 2} size={12.5} color={col}>{b}</T>
        </g>
      ))}
      {[150, 100, 70].map((f) => (
        <T key={f} x={x0 - 8} y={Y(f)} anchor="end" size={12} color={C.muted}>{f}</T>
      ))}
    </Diagram>
  )
}
