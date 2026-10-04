import { C, Diagram, T } from '../kit'

/** ITU regions: the Americas are Region 2. Schematic, west to east. */
export function G1E_Regions() {
  return (
    <Diagram w={640} h={170} title="Schematic of ITU regions from west to east. Region 2 covers North and South America, and its frequency allocations apply to amateurs there" caption="Schematic only. Band plans differ by region; you follow Region 2.">
      <rect x={6} y={30} width={150} height={90} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <T x={81} y={68} anchor="middle" size={16} bold color={C.muted}>Region 3</T>
      <T x={81} y={92} anchor="middle" size={12} color={C.muted}>Asia-Pacific</T>
      <rect x={168} y={30} width={304} height={90} rx={10} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} />
      <T x={320} y={64} anchor="middle" size={20} bold>Region 2</T>
      <T x={320} y={90} anchor="middle" size={14} bold color={C.signal}>North and South America</T>
      <rect x={484} y={30} width={150} height={90} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <T x={559} y={68} anchor="middle" size={16} bold color={C.muted}>Region 1</T>
      <T x={559} y={92} anchor="middle" size={12} color={C.muted}>Europe, Africa</T>
      <T x={320} y={148} anchor="middle" size={14} bold>You are in Region 2</T>
    </Diagram>
  )
}
