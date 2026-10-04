import { C, Box, Diagram, Ln, T } from '../kit'

/** An off-center-fed dipole cut for 80 m (130 ft): feed at one third, 4:1 current balun, choke and coax. */
export function OffCenterFedDipole_Layout() {
  const x0 = 40, x1 = 600, wy = 80
  const fx = x0 + (x1 - x0) / 3
  return (
    <Diagram w={640} h={290}
      title="An off-center-fed dipole: a wire fed one third of the way along, through a 4:1 balun and a common-mode choke, to coax. Example 130 foot wire for 80 m has legs of about 43 and 87 feet."
      caption="Illustrative example for 3.6 MHz (468 ÷ f ≈ 130 ft). The unequal legs are why the balun and choke matter.">
      <Ln x1={x0} y1={wy} x2={fx - 8} y2={wy} color={C.resist} width={5} />
      <Ln x1={fx + 8} y1={wy} x2={x1} y2={wy} color={C.resist} width={5} />
      <circle cx={fx} cy={wy} r={8} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={x0} y1={wy - 28} x2={fx} y2={wy - 28} color={C.muted} width={1.5} arrow="both" />
      <T x={(x0 + fx) / 2} y={wy - 46} anchor="middle" size={13} bold color={C.muted}>short leg: about ⅓ (43 ft)</T>
      <Ln x1={fx} y1={wy - 28} x2={x1} y2={wy - 28} color={C.muted} width={1.5} arrow="both" />
      <T x={(fx + x1) / 2} y={wy - 46} anchor="middle" size={13} bold color={C.muted}>long leg: about ⅔ (87 ft)</T>
      <Ln x1={fx} y1={wy + 8} x2={fx} y2={wy + 34} color={C.ink} width={3} />
      <Box x={fx - 46} y={wy + 34} w={92} h={40} label="4:1 balun" sub="current balun" color={C.ink} size={14} />
      <T x={fx + 58} y={wy + 46} size={12} color={C.muted}>about 200 Ω in (typical)</T>
      <T x={fx + 58} y={wy + 64} size={12} color={C.muted}>about 50 Ω out</T>
      <Ln x1={fx} y1={wy + 74} x2={fx} y2={wy + 100} color={C.signal} width={4} />
      <Box x={fx - 40} y={wy + 100} w={80} h={30} label="choke" color={C.power} size={13} r={6} />
      <Ln x1={fx} y1={wy + 130} x2={fx} y2={wy + 168} color={C.signal} width={4} />
      <T x={fx + 12} y={wy + 156} size={13} bold color={C.signal}>coax to the radio</T>
      <T x={x1} y={wy + 24} anchor="end" size={12} color={C.muted}>far end: high voltage, keep out of reach</T>
    </Diagram>
  )
}
