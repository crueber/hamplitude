import { C, Diagram, Ln, T } from '../kit'

/** Beacon rules: purpose, 100 W PEP, one per band per location, HF only at 28.20 to 28.30 MHz. */
export function G1B_BeaconRules() {
  const lo = 28.0
  const hi = 29.7
  const X0 = 20
  const X1 = 620
  const sx = (f: number) => X0 + ((f - lo) / (hi - lo)) * (X1 - X0)
  const bx = sx(28.2)
  const bw = sx(28.3) - bx
  const chips = [
    { t: 'Purpose', v: 'observe propagation', v2: 'and reception' },
    { t: 'Power', v: '100 W PEP', v2: 'maximum' },
    { t: 'Number', v: 'one per band', v2: 'per location' },
  ]
  return (
    <Diagram w={640} h={230} title="Beacon station rules: purpose is observing propagation and reception, maximum power 100 watts PEP, only one beacon per band from one location, and automatically controlled HF beacons only between 28.20 and 28.30 MHz in the 10 meter band" caption="10 m strip to scale, MHz.">
      {chips.map((c, i) => {
        const x = 6 + i * 212
        return (
          <g key={c.t}>
            <rect x={x} y={8} width={204} height={78} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
            <T x={x + 102} y={26} anchor="middle" size={13} color={C.muted} bold>{c.t}</T>
            <T x={x + 102} y={48} anchor="middle" size={15} bold>{c.v}</T>
            <T x={x + 102} y={68} anchor="middle" size={14}>{c.v2}</T>
          </g>
        )
      })}
      <T x={X0} y={110} size={14} bold>Automatic HF beacons</T>
      <rect x={X0} y={128} width={X1 - X0} height={30} rx={4} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <rect x={bx} y={128} width={bw} height={30} fill={C.power} fillOpacity={0.45} stroke={C.power} strokeWidth={2} />
      <Ln x1={bx + bw / 2} y1={158} x2={bx + bw / 2} y2={176} color={C.power} width={2} />
      <T x={bx + bw / 2} y={192} anchor="middle" size={14} bold color={C.power}>28.20 to 28.30</T>
      <T x={X0} y={176} size={12} mono color={C.muted}>28.0</T>
      <T x={X1} y={176} size={12} mono color={C.muted} anchor="end">29.7</T>
    </Diagram>
  )
}
