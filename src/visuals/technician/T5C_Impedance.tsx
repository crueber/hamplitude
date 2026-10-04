import { C, Diagram, Ln, T } from '../kit'

/** Impedance is the total opposition to AC: resistance and reactance combined. All in ohms. */
export function Impedance() {
  const box = (x: number, y: number, w: number, h: number, color: string, title: string, sub: string[], sym: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={C.fill} stroke={color} strokeWidth={2.5} />
      <T x={x + w / 2} y={y + 22} anchor="middle" bold size={16}>{title}</T>
      <T x={x + w / 2} y={y + 54} anchor="middle" bold size={30} color={color}>{sym}</T>
      {sub.map((s, i) => <T key={i} x={x + w / 2} y={y + 80 + i * 17} anchor="middle" size={13} color={C.muted}>{s}</T>)}
    </g>
  )
  return (
    <Diagram w={640} h={226} title="Impedance combines resistance and reactance. It is the total opposition to alternating current and is measured in ohms."
      caption="All three are measured in ohms (Ω).">
      {box(10, 20, 180, 130, C.resist, 'Resistance', ['opposes any current', 'DC and AC'], 'R')}
      <T x={213} y={85} anchor="middle" bold size={28} color={C.muted}>&amp;</T>
      {box(236, 20, 190, 130, C.signal, 'Reactance', ['opposition to AC from', 'capacitors and inductors'], 'X')}
      <Ln x1={434} y1={85} x2={468} y2={85} color={C.muted} width={3} arrow />
      {box(476, 20, 154, 130, C.power, 'Impedance', ['total opposition', 'to AC'], 'Z')}
      <T x={320} y={190} anchor="middle" size={14}>Impedance = resistance and reactance combined</T>
      <T x={320} y={212} anchor="middle" size={13} color={C.muted}>The two are combined, not simply added.</T>
    </Diagram>
  )
}
