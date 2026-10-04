import { Capacitor, C, Diagram, Ln, T, Wire } from '../kit'

/** A gamma match: coax shield bonded to the element centre, centre conductor through a series capacitor to a rod that taps the element. */
export function StubsAndMatchingSections_Gamma() {
  const ey = 90, ry = 142, cx = 320, sx = 520
  return (
    <Diagram w={640} h={318}
      title="A gamma match on a Yagi driven element. The coax shield is bonded to the centre of the element, which is mounted on the boom. The coax centre conductor runs through a series capacitor to a gamma rod parallel to the element. A sliding shorting strap connects the rod to the element away from the centre, where the impedance is higher."
      caption="The element's centre is a voltage null, so it can sit on the metal boom. Tapping off-centre raises the impedance toward 50 Ω; the capacitor cancels the rod's inductance.">
      <Ln x1={40} y1={ey} x2={600} y2={ey} color={C.ink} width={6} />
      <T x={40} y={ey - 38} size={13} bold>driven element (half wave)</T>
      {/* coax */}
      <rect x={cx - 16} y={ry} width={32} height={116} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      <Ln x1={cx} y1={ry + 116} x2={cx} y2={ry} color={C.resist} width={3} />
      <T x={cx - 24} y={ry + 70} anchor="end" size={13} bold>coax</T>
      <T x={cx - 24} y={ry + 90} anchor="end" size={12.5} color={C.muted}>from the radio</T>
      {/* shield bonding */}
      <Wire pts={[[cx - 16, ry], [cx - 16, ey]]} color={C.ink} width={3} />
      <circle cx={cx - 16} cy={ey} r={5.5} fill={C.ink} />
      <T x={cx - 28} y={(ey + ry) / 2} anchor="end" size={12.5} color={C.muted}>shield bonded to element centre</T>
      {/* centre conductor, capacitor, gamma rod */}
      <Wire pts={[[cx, ry], [cx + 36, ry]]} color={C.resist} width={3} />
      <rect x={cx + 42} y={ry - 20} width={16} height={40} fill={C.bg} />
      <Capacitor x={cx + 50} y={ry} len={36} color={C.signal} />
      <Ln x1={cx + 68} y1={ry} x2={sx + 40} y2={ry} color={C.resist} width={6} />
      <Ln x1={sx} y1={ry} x2={sx} y2={ey} color={C.power} width={6} />
      <circle cx={sx} cy={ry} r={5} fill={C.power} />
      <circle cx={sx} cy={ey} r={5} fill={C.power} />
      <T x={cx + 90} y={ry + 34} anchor="middle" size={12.5} bold color={C.signal}>series capacitor</T>
      <T x={sx - 10} y={ry + 34} anchor="middle" size={12.5} bold color={C.resist}>gamma rod</T>
      <T x={sx} y={ey - 38} anchor="middle" size={12.5} bold color={C.power}>shorting strap</T>
      <T x={sx} y={ey - 20} anchor="middle" size={12.5} color={C.muted}>slides to tune</T>
      <T x={20} y={282} size={12.5} color={C.muted}>Slide the strap to set the resistance; adjust the capacitor to cancel the leftover reactance.</T>
      <T x={20} y={304} size={12.5} color={C.muted}>Schematic of the idea: real gamma matches vary in layout and rod size.</T>
    </Diagram>
  )
}
