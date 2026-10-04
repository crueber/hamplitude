import { C, Diagram, Ln, T } from '../kit'

/** Linear (60 Hz transformer) vs switchmode (high-frequency operation, small parts): same job, different size of parts. */
export function SwitchmodeSize() {
  const stage = (x: number, y: number, w: number, h: number, label: string, col: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.fill} stroke={col} strokeWidth={2.5} />
      <T x={x + w / 2} y={y + h + 16} anchor="middle" size={12} bold color={C.muted}>{label}</T>
    </g>
  )
  const arrow = (x1: number, x2: number, y: number) => <Ln x1={x1} y1={y} x2={x2} y2={y} color={C.muted} width={2.5} arrow />
  return (
    <Diagram w={640} h={296} title="Two power supplies compared. A linear supply needs a large 60 hertz transformer and large filter parts. A switchmode supply works at high frequency, so its transformer and filter parts are much smaller."
      caption="Higher operating frequency means smaller transformer and filter parts.">
      <T x={14} y={20} bold size={14}>Linear supply (mains frequency)</T>
      {stage(14, 38, 150, 100, 'transformer: large', C.power)}
      {arrow(168, 198, 88)}
      {stage(202, 63, 70, 50, 'rectifier', C.ink)}
      {arrow(276, 306, 88)}
      {stage(310, 43, 110, 90, 'filter: large', C.signal)}
      {arrow(424, 454, 88)}
      {stage(458, 63, 80, 50, 'regulator', C.good)}
      <T x={575} y={88} anchor="middle" size={13} bold color={C.muted}>DC out</T>
      <line x1={14} y1={168} x2={626} y2={168} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
      <T x={14} y={192} bold size={14}>Switchmode supply (high frequency)</T>
      {stage(14, 212, 70, 40, 'rectifier', C.ink)}
      {arrow(88, 112, 232)}
      {stage(116, 212, 90, 40, 'high-freq switch', C.resist)}
      {arrow(210, 234, 232)}
      {stage(238, 217, 44, 30, 'transformer', C.power)}
      {arrow(286, 310, 232)}
      {stage(314, 212, 70, 40, 'rectifier', C.ink)}
      {arrow(388, 412, 232)}
      {stage(416, 217, 50, 30, 'filter', C.signal)}
      <T x={575} y={232} anchor="middle" size={13} bold color={C.muted}>DC out</T>
      <T x={14} y={288} size={13} bold color={C.good}>Small transformer, small filter: lighter and more compact.</T>
    </Diagram>
  )
}
