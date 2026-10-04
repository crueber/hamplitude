import { C, Box, Diagram, Ln, T } from '../kit'

/** Beverage: a long wire low over ground, terminated with a resistor. A directional receiving antenna. */
export function G9D_Beverage() {
  const gy = 190
  return (
    <Diagram w={640} h={250} title="A Beverage antenna: a long wire strung low above the ground, connected to a receiver at one end and terminated with a resistor to ground at the other. It is used for directional receiving on MF and low HF"
      caption="Long, low, terminated wire: a quiet directional receiving antenna for MF and the low HF bands.">
      <rect x={10} y={gy} width={620} height={30} fill={C.fill2} />
      <T x={20} y={gy + 15} size={12} color={C.muted}>ground</T>
      {[130, 250, 370].map((x) => <Ln key={x} x1={x} y1={110} x2={x} y2={gy} color={C.muted} width={4} />)}
      <Ln x1={90} y1={110} x2={520} y2={110} color={C.resist} width={4} />
      <T x={330} y={90} anchor="middle" size={13} bold color={C.resist}>long wire, only a few feet up</T>
      <Box x={20} y={60} w={80} h={40} label="Receiver" size={13} color={C.ink} />
      <Ln x1={520} y1={110} x2={520} y2={150} color={C.resist} width={4} />
      <rect x={510} y={150} width={20} height={26} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <Ln x1={520} y1={176} x2={520} y2={gy} color={C.resist} width={4} />
      <T x={540} y={156} size={13} bold color={C.resist}>terminating</T>
      <T x={540} y={174} size={13} bold color={C.resist}>resistor</T>
      <T x={330} y={236} anchor="middle" size={14} bold color={C.good}>Directional receiving, MF and low HF</T>
    </Diagram>
  )
}
