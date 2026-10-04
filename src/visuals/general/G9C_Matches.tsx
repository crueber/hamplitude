import { C, Diagram, Ln, T } from '../kit'

/** Hairpin (beta) and gamma matches on a Yagi driven element, seen from above (boom vertical, element horizontal). */
export function G9C_Matches() {
  const hx = 160, gx = 440, ey = 120
  return (
    <Diagram w={640} h={330} title="Hairpin match: a shorted stub across the split driven element. Gamma match: a rod and series capacitor from the coax to a driven element that is bonded to the boom"
      caption="Hairpin: the element is split and insulated from the boom. Gamma: the element is bolted to the boom, so no insulation is needed.">
      <T x={hx} y={18} anchor="middle" size={14} bold>Hairpin (beta) match</T>
      <T x={gx} y={18} anchor="middle" size={14} bold>Gamma match</T>
      {/* hairpin */}
      <Ln x1={hx} y1={40} x2={hx} y2={300} color={C.fill2} width={9} />
      <T x={hx + 10} y={52} size={12} color={C.muted}>boom</T>
      <Ln x1={hx - 130} y1={ey} x2={hx - 10} y2={ey} color={C.voltage} width={6} />
      <Ln x1={hx + 10} y1={ey} x2={hx + 130} y2={ey} color={C.voltage} width={6} />
      <T x={hx} y={ey - 22} anchor="middle" size={12} bold color={C.bad}>gap: halves insulated</T>
      <Ln x1={hx - 10} y1={ey} x2={hx - 10} y2={ey + 70} color={C.power} width={4} />
      <Ln x1={hx + 10} y1={ey} x2={hx + 10} y2={ey + 70} color={C.power} width={4} />
      <Ln x1={hx - 10} y1={ey + 70} x2={hx + 10} y2={ey + 70} color={C.power} width={4} />
      <T x={hx} y={ey + 86} anchor="middle" size={13} bold color={C.power}>shorted stub</T>
      <Ln x1={hx - 40} y1={ey} x2={hx - 40} y2={ey + 50} color={C.ink} width={3} />
      <Ln x1={hx + 40} y1={ey} x2={hx + 40} y2={ey + 50} color={C.ink} width={3} />
      <T x={hx - 46} y={ey + 38} anchor="end" size={13} bold>coax</T>
      <T x={hx} y={ey + 114} anchor="middle" size={13} color={C.muted}>stub matches the feed point</T>
      {/* gamma */}
      <Ln x1={gx} y1={40} x2={gx} y2={300} color={C.fill2} width={9} />
      <T x={gx - 10} y={52} anchor="end" size={12} color={C.muted}>boom</T>
      <Ln x1={gx - 130} y1={ey} x2={gx + 130} y2={ey} color={C.voltage} width={6} />
      <circle cx={gx} cy={ey} r={7} fill={C.ink} />
      <T x={gx} y={ey - 22} anchor="middle" size={12} bold color={C.good}>bonded to boom</T>
      <Ln x1={gx + 22} y1={ey + 44} x2={gx + 70} y2={ey + 44} color={C.resist} width={4} />
      <Ln x1={gx + 70} y1={ey} x2={gx + 70} y2={ey + 44} color={C.resist} width={4} />
      <T x={gx + 80} y={ey + 44} size={13} bold color={C.resist}>gamma rod</T>
      <Ln x1={gx + 22} y1={ey + 44} x2={gx + 22} y2={ey + 70} color={C.ink} width={3} />
      <Ln x1={gx + 12} y1={ey + 70} x2={gx + 32} y2={ey + 70} color={C.power} width={4} />
      <Ln x1={gx + 12} y1={ey + 78} x2={gx + 32} y2={ey + 78} color={C.power} width={4} />
      <T x={gx + 42} y={ey + 76} size={13} bold color={C.power}>series capacitor</T>
      <Ln x1={gx + 22} y1={ey + 78} x2={gx + 22} y2={ey + 110} color={C.ink} width={3} />
      <T x={gx + 32} y={ey + 118} size={13} bold>coax</T>
      <T x={gx} y={ey + 150} anchor="middle" size={13} color={C.muted}>rod and capacitor match the feed point</T>
    </Diagram>
  )
}
