import { C, Box, Diagram, Ln, T } from '../kit'

/** Why microwave stations put the electronics at the dish instead of running microwave coax. */
export function Microwaves_Transverter() {
  const dish = (x: number, y: number) => (
    <g>
      <path d={`M${x},${y - 30} Q${x - 22},${y} ${x},${y + 30}`} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <Ln x1={x - 5} y1={y} x2={x + 14} y2={y} color={C.muted} width={2} />
      <circle cx={x + 16} cy={y} r={5} fill={C.power} />
      <T x={x} y={y + 46} anchor="middle" size={12} color={C.muted}>dish</T>
    </g>
  )
  return (
    <Diagram w={640} h={282}
      title="Two ways to reach a dish. Top: a radio at the shack on a lower frequency feeds a transverter mounted at the dish through a long cable, and only a short microwave link remains. Bottom: a microwave signal travels the whole long cable and loses most of its power as heat"
      caption="Cable loss rises steeply with frequency, so keep the microwave part of the path as short as you can.">
      <T x={14} y={18} size={13} bold color={C.good}>Better: convert at the dish</T>
      <Box x={14} y={34} w={112} h={56} label="Radio" sub="144 or 432 MHz" size={14} />
      <Ln x1={126} y1={62} x2={286} y2={62} color={C.current} width={3} arrow />
      <T x={206} y={46} anchor="middle" size={12} color={C.muted}>long cable, low frequency</T>
      <T x={206} y={80} anchor="middle" size={12} bold color={C.good}>loss is small</T>
      <Box x={286} y={34} w={124} h={56} label="Transverter" sub="shifts to 10 GHz" color={C.power} size={14} />
      <Ln x1={410} y1={62} x2={494} y2={62} color={C.signal} width={3} arrow />
      <T x={452} y={46} anchor="middle" size={12} color={C.muted}>short</T>
      {dish(528, 62)}

      <Ln x1={14} y1={140} x2={626} y2={140} color={C.fill2} width={2} />

      <T x={14} y={166} size={13} bold color={C.bad}>Worse: microwave signal down a long cable</T>
      <Box x={14} y={182} w={112} h={56} label="Microwave" sub="radio at 10 GHz" color={C.power} size={14} />
      <Ln x1={126} y1={210} x2={494} y2={210} color={C.signal} width={3} arrow />
      <T x={310} y={194} anchor="middle" size={12} color={C.muted}>long cable at microwave frequency</T>
      <T x={310} y={230} anchor="middle" size={12} bold color={C.bad}>most of the power is lost as heat</T>
      {dish(528, 210)}
    </Diagram>
  )
}
