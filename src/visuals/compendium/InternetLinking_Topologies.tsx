import { C, Box, Diagram, Ln, T } from '../kit'

/** Two common shapes of internet linking: a direct link between two nodes, or many nodes joined at a hub. */
export function InternetLinking_Topologies() {
  const sats = [[420, 100], [580, 100], [600, 170], [580, 240], [420, 240], [380, 170]] as const
  return (
    <Diagram w={640} h={300}
      title="Two shapes of internet linking: a point-to-point link between two nodes, and a hub or conference where many nodes join one shared conversation"
      caption="A node can be a repeater, a simplex radio on a gateway, or in some systems just software on a computer or phone.">
      <T x={14} y={22} size={15} bold color={C.current}>Link two nodes</T>
      <Box x={14} y={128} w={84} h={56} label="Node A" sub="radio side" color={C.current} size={14} />
      <Box x={126} y={128} w={80} h={56} label="Internet" color={C.signal} fill={C.fill2} size={13} />
      <Box x={234} y={128} w={84} h={56} label="Node B" sub="radio side" color={C.resist} size={14} />
      <Ln x1={100} y1={156} x2={124} y2={156} color={C.muted} width={2.5} arrow="both" />
      <Ln x1={208} y1={156} x2={232} y2={156} color={C.muted} width={2.5} arrow="both" />
      <T x={166} y={212} anchor="middle" size={13} color={C.muted}>one conversation at a time,</T>
      <T x={166} y={230} anchor="middle" size={13} color={C.muted}>between the two ends</T>

      <Ln x1={330} y1={30} x2={330} y2={286} color={C.fill2} width={2} />
      <T x={350} y={22} size={15} bold color={C.power}>Join a hub</T>
      {sats.map(([x, y], i) => (
        <g key={i}>
          <Ln x1={x} y1={y} x2={500} y2={170} color={C.muted} width={2} />
          <circle cx={x} cy={y} r={20} fill={C.fill} stroke={C.ink} strokeWidth={2} />
          <T x={x} y={y} anchor="middle" size={13} bold>{'N' + (i + 1)}</T>
        </g>
      ))}
      <Box x={460} y={142} w={80} h={56} label="Hub" sub="conference" color={C.power} fill={C.fill2} size={14} />
      <T x={500} y={286} anchor="middle" size={13} color={C.muted}>everyone on the hub hears everyone</T>
    </Diagram>
  )
}
