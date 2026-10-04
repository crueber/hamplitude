import { C, Diagram, T } from '../kit'

const ROWS = [
  { b: '160 m', f: '1.8 MHz', w: 1500 },
  { b: '30 m', f: '10.140 MHz', w: 200 },
  { b: '12 m', f: '24.89 MHz', w: 1500 },
  { b: '10 m', f: '28 MHz', w: 1500 },
]
const X0 = 150
const SCALE = 410 / 1500

/** Power limits per band, as bars to scale. */
export function G1C_PowerLimits() {
  return (
    <Diagram w={640} h={230} title="Maximum power: 1500 watts PEP output on 160 meters, 12 meters and the 28 megahertz band; only 200 watts PEP on 30 meters, including 10.140 megahertz" caption="Bars to scale. PEP output from the transmitter.">
      {ROWS.map((r, i) => {
        const y = 14 + i * 52
        const low = r.w < 1000
        const col = low ? C.resist : C.signal
        return (
          <g key={r.b}>
            <T x={4} y={y + 14} bold size={16}>{r.b}</T>
            <T x={4} y={y + 33} size={12} mono color={C.muted}>{r.f}</T>
            <rect x={X0} y={y} width={r.w * SCALE} height={40} rx={6} fill={col} fillOpacity={0.25} stroke={col} strokeWidth={2} />
            <T x={X0 + r.w * SCALE + 10} y={y + 20} bold size={16} color={col}>{r.w} W</T>
          </g>
        )
      })}
    </Diagram>
  )
}
