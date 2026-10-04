import { C, Diagram, Ln, T } from '../kit'

/** Illustrative SWR-versus-frequency shapes for two kinds of dummy load. Real loads vary: check the specification. */
export function DummyLoads_Match() {
  const x0 = 70, x1 = 610, yTop = 30, yBot = 190
  const bands = [
    { f: '1.8', x: 0.0 }, { f: '7', x: 0.25 }, { f: '28', x: 0.5 }, { f: '144', x: 0.8 }, { f: '440', x: 1.0 },
  ]
  const X = (u: number) => x0 + u * (x1 - x0)
  const Y = (s: number) => yBot - ((s - 1) / 1.5) * (yBot - yTop)
  const curve = (g: (u: number) => number) => Array.from({ length: 81 }, (_, i) => `${i ? 'L' : 'M'}${X(i / 80).toFixed(1)},${Y(Math.min(2.5, g(i / 80))).toFixed(1)}`).join('')
  const good = (u: number) => 1.02 + 0.07 * u ** 2
  const hfOnly = (u: number) => 1.04 + 0.04 * u + 1.7 * Math.max(0, u - 0.45) ** 2 * 3.2
  return (
    <Diagram w={640} h={290}
      title="Illustrative SWR against frequency for two dummy loads. A well-made load stays close to 1 to 1 from HF through UHF. A simple HF-only load is fine on the lower bands, but its SWR climbs at VHF and UHF."
      caption="Illustrative shapes, not measurements. A load is only a good 50 Ω on the frequencies it is specified for.">
      {[1, 1.5, 2, 2.5].map((s) => (
        <g key={s}>
          <Ln x1={x0} y1={Y(s)} x2={x1} y2={Y(s)} color={C.fill2} width={1} />
          <T x={x0 - 8} y={Y(s)} anchor="end" size={12} color={C.muted}>{s}:1</T>
        </g>
      ))}
      <path d={curve(good)} fill="none" stroke={C.good} strokeWidth={3} />
      <path d={curve(hfOnly)} fill="none" stroke={C.bad} strokeWidth={3} />
      {bands.map((b) => (
        <g key={b.f}>
          <Ln x1={X(b.x)} y1={yBot} x2={X(b.x)} y2={yBot + 5} color={C.muted} width={1.5} />
          <T x={X(b.x)} y={yBot + 18} anchor="middle" size={12} color={C.muted}>{b.f}</T>
        </g>
      ))}
      <T x={x1} y={yBot + 38} anchor="end" size={12.5} color={C.muted}>frequency (MHz, log scale) →</T>
      <T x={x0 + 10} y={44} size={13} bold color={C.good}>Wideband, well-designed load</T>
      <T x={x0 + 10} y={66} size={13} bold color={C.bad}>Basic load rated for HF only</T>
      <T x={x0 - 56} y={14} size={12} color={C.muted}>SWR</T>
    </Diagram>
  )
}
