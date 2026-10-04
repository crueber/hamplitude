import { C, Diagram, Lines, T, sinePath, useTime, TAU } from '../kit'

const ROWS = [
  { band: '10 m, 6 m', thing: ['Fog,', 'rain'], amp: 0.92, cycles: 3, col: C.good, verdict: 'little effect' },
  { band: 'UHF, microwave', thing: ['Vegetation'], amp: 0.45, cycles: 9, col: C.resist, verdict: 'absorbed' },
  { band: 'Microwave', thing: ['Rain'], amp: 0.3, cycles: 14, col: C.bad, verdict: 'absorbed' },
]

/** Three waves passing through the same kind of barrier; the shorter the wave, the more it is absorbed. */
export function Absorb() {
  const { t, ref } = useTime(0.5)
  const x0 = 24, xa = 250, xb = 380, x1 = 616
  return (
    <Diagram w={640} h={330} svgRef={ref} title="Fog, rain and vegetation barely affect 10 and 6 metre signals but absorb UHF and microwave signals"
      caption="Schematic: wave height after the barrier shows how much signal survives.">
      {ROWS.map((r, i) => {
        const cy = 66 + i * 94
        const ph = -t * TAU * 0.8
        return (
          <g key={r.band}>
            <T x={x0} y={cy - 48} bold size={14}>{r.band}</T>
            <rect x={xa} y={cy - 36} width={xb - xa} height={72} rx={10} fill={C.fill2} stroke={C.muted} strokeDasharray="5 5" />
            <Lines x={(xa + xb) / 2} y={cy - (r.thing.length - 1) * 8} lines={r.thing} anchor="middle" size={13} color={C.muted} lh={16} />
            <path d={sinePath(x0, xa, cy, 20, r.cycles * 0.45, ph)} fill="none" stroke={C.signal} strokeWidth={3} />
            <path d={sinePath(xb, x1 - 130, cy, 20 * r.amp, r.cycles * 0.35, ph)} fill="none" stroke={r.col} strokeWidth={3} />
            <T x={x1} y={cy} anchor="end" size={13} bold color={r.col}>{r.verdict}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
