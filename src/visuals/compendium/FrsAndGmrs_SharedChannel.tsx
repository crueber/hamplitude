import { Box, C, Diagram, Ln, T } from '../kit'

/** One shared channel: an FRS hand-held and a GMRS mobile radio hear each other on channel 20. */
export function FrsAndGmrs_SharedChannel() {
  return (
    <Diagram w={640} h={250}
      title="One shared channel. An FRS hand-held, which needs no individual license, and a GMRS mobile radio, which needs a GMRS license, are both set to channel 20, 462.6750 megahertz. Each hears the other, because every FRS channel is also a GMRS channel."
      caption="Channel 20 is on the 15 to 22 group. Illustrative: the power figures are the ceilings for each service on that channel group.">
      <Box x={20} y={64} w={170} h={92} label="FRS hand-held" sub="no individual license" color={C.signal} size={15} />
      <Box x={450} y={64} w={170} h={92} label="GMRS mobile" sub="needs a license" color={C.resist} size={15} />

      <rect x={236} y={90} width={168} height={40} rx={20} fill={C.bg} stroke={C.muted} strokeWidth={2} />
      <T x={320} y={104} size={14} bold anchor="middle">Channel 20</T>
      <T x={320} y={121} size={12} anchor="middle" color={C.muted}>462.6750 MHz</T>

      <Ln x1={194} y1={110} x2={232} y2={110} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={408} y1={110} x2={446} y2={110} color={C.resist} width={2.5} arrow="both" />

      <T x={105} y={184} size={13} anchor="middle" color={C.muted}>up to 2 W ERP</T>
      <T x={105} y={204} size={13} anchor="middle" color={C.muted}>fixed antenna</T>
      <T x={535} y={184} size={13} anchor="middle" color={C.muted}>up to 50 W output</T>
      <T x={535} y={204} size={13} anchor="middle" color={C.muted}>external antenna allowed</T>

      <T x={320} y={40} size={14} bold anchor="middle">Same channel, same conversation</T>
    </Diagram>
  )
}
