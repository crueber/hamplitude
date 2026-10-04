import { C, Diagram, Ln, T } from '../kit'

/** Flat-top dipole with two supports vs inverted V with one central support. */
export function G9D_InvertedV() {
  return (
    <Diagram w={640} h={250} title="A flat dipole needs a support at each end; an inverted V is a dipole with one central support and ends sloping down"
      caption="Same half-wave dipole, one tall support: the ends droop, so it is an inverted V.">
      <T x={160} y={20} anchor="middle" size={13} bold color={C.muted}>Flat dipole: two supports</T>
      <Ln x1={30} y1={50} x2={30} y2={215} color={C.muted} width={6} />
      <Ln x1={290} y1={50} x2={290} y2={215} color={C.muted} width={6} />
      <Ln x1={30} y1={55} x2={290} y2={55} color={C.voltage} width={5} />
      <circle cx={160} cy={55} r={6} fill={C.ink} />
      <T x={160} y={80} anchor="middle" size={13} bold>feed point</T>
      <T x={480} y={16} anchor="middle" size={13} bold color={C.muted}>Inverted V: one central support</T>
      <Ln x1={480} y1={66} x2={480} y2={215} color={C.muted} width={6} />
      <Ln x1={480} y1={66} x2={360} y2={160} color={C.voltage} width={5} />
      <Ln x1={480} y1={66} x2={600} y2={160} color={C.voltage} width={5} />
      <circle cx={480} cy={66} r={6} fill={C.ink} />
      <T x={494} y={52} size={13} bold>feed point</T>
      <T x={480} y={236} anchor="middle" size={14} bold color={C.good}>Inverted V</T>
      <Ln x1={10} y1={215} x2={630} y2={215} color={C.fill2} width={3} />
    </Diagram>
  )
}
