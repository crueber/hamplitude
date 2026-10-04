import { C, Box, Diagram, Ln, T } from '../kit'

/** A 10 m repeater retransmitting a Technician's 2 m signal: the repeater's control operator needs HF privileges. */
export function G1E_Repeater10m() {
  return (
    <Diagram w={640} h={210} title="A Technician transmits on 2 meters. A 10 meter repeater may retransmit it only if the repeater's control operator holds at least a General class license" caption="The repeater transmits on 10 m, so its control operator needs HF privileges.">
      <Box x={6} y={50} w={150} h={64} label="Technician" sub="transmits on 2 m" color={C.ink} />
      <Ln x1={156} y1={82} x2={238} y2={82} color={C.signal} width={2.5} arrow />
      <Box x={238} y={34} w={164} h={96} label="10 m repeater" sub="retransmits on 10 m" color={C.signal} />
      <Ln x1={402} y1={82} x2={484} y2={82} color={C.signal} width={2.5} arrow />
      <Box x={484} y={50} w={150} h={64} label="Listeners" sub="on 10 m" color={C.ink} />
      <rect x={198} y={148} width={244} height={48} rx={10} fill={C.good} fillOpacity={0.18} stroke={C.good} strokeWidth={2} />
      <T x={320} y={165} anchor="middle" size={14} bold>Repeater control operator:</T>
      <T x={320} y={184} anchor="middle" size={14} bold color={C.good}>General or higher</T>
      <Ln x1={320} y1={148} x2={320} y2={132} color={C.good} width={2.5} arrow />
    </Diagram>
  )
}
