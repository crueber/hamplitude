import { C, Diagram, Ln, T } from '../kit'

const X0 = 40, DEC = 140 // x of 0.1 mA, pixels per decade
const px = (mA: number) => X0 + (Math.log10(mA) + 1) * DEC

const ZONES = [
  { a: 0.1, b: 1, col: C.good, op: 0.3, l1: 'Little or nothing', l2: 'felt' },
  { a: 1, b: 10, col: C.resist, op: 0.3, l1: 'Tingle, then', l2: 'painful' },
  { a: 10, b: 100, col: C.resist, op: 0.6, l1: 'Muscles clamp:', l2: 'may not let go' },
  { a: 100, b: 1000, col: C.bad, op: 0.5, l1: 'Heart rhythm upset:', l2: 'can kill' },
]

/** Illustrative effect of 60 Hz AC through the body, on a log scale of current. */
export function ElectricalSafety_Current() {
  const by = 92, bh = 46
  return (
    <Diagram w={640} h={266}
      title="Effects of 60 hertz alternating current through the body on a logarithmic scale from 0.1 milliamp to 1 amp: barely felt around 1 milliamp, painful by 10, muscles clamp so you may not let go from about 10 to 100, and heart rhythm disruption that can kill, with danger rising from a few tens of milliamps upward. A typical GFCI trips at about 5 milliamps."
      caption="Typical, illustrative bands for 60 Hz current. Real thresholds vary with the person, the path and the time, and serious harm is possible below the 100 mA band.">
      <T x={X0} y={16} size={14} bold>Current through the body, not voltage, is what injures</T>
      {/* GFCI marker */}
      <Ln x1={px(5)} y1={52} x2={px(5)} y2={by - 2} color={C.current} width={3} arrow />
      <T x={px(5)} y={40} anchor="middle" size={13} bold color={C.current}>typical GFCI trips at about 5 mA</T>
      {ZONES.map((z) => (
        <g key={z.a}>
          <rect x={px(z.a)} y={by} width={px(z.b) - px(z.a)} height={bh} fill={z.col} fillOpacity={z.op} stroke={C.ink} strokeWidth={1.5} />
          <T x={(px(z.a) + px(z.b)) / 2} y={by + bh + 18} anchor="middle" size={13} bold>{z.l1}</T>
          <T x={(px(z.a) + px(z.b)) / 2} y={by + bh + 36} anchor="middle" size={13} bold>{z.l2}</T>
        </g>
      ))}
      {[[0.1, '0.1 mA'], [1, '1 mA'], [10, '10 mA'], [100, '100 mA'], [1000, '1 A']].map(([v, l]) => (
        <T key={String(v)} x={px(v as number)} y={by - 12} anchor="middle" size={12.5} color={C.ink} bold>{l}</T>
      ))}
      <T x={X0} y={by + bh + 66} size={13} color={C.muted}>A hand-to-hand or hand-to-foot path crosses the chest and is the most dangerous.</T>
      <T x={X0} y={by + bh + 84} size={13} color={C.muted}>Wet skin has much lower resistance, so the same voltage drives far more current.</T>
    </Diagram>
  )
}
