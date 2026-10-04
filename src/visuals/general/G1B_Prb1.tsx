import { C, Box, Diagram, Ln, T } from '../kit'

/** PRB-1: local rules may regulate antennas but must accommodate amateur radio with the minimum practical regulation. */
export function G1B_Prb1() {
  return (
    <Diagram w={640} h={170} title="State and local governments may regulate amateur antennas, but must reasonably accommodate amateur communications, and their regulations must be the minimum practical to serve a legitimate purpose" caption="PRB-1: not a ban on local rules, not a blank check for them either.">
      <Box x={6} y={28} w={190} h={80} label="Local regulation" sub="legitimate purpose" color={C.resist} />
      <Box x={444} y={28} w={190} h={80} label="Amateur radio" sub="antenna structure" color={C.signal} />
      <Ln x1={198} y1={52} x2={442} y2={52} color={C.good} width={2.5} arrow />
      <T x={320} y={38} anchor="middle" size={13} bold color={C.good}>must reasonably accommodate</T>
      <Ln x1={198} y1={88} x2={442} y2={88} color={C.good} width={2.5} arrow />
      <T x={320} y={104} anchor="middle" size={13} bold color={C.good}>minimum practical regulation</T>
      <T x={320} y={146} anchor="middle" size={14} bold>Neither "never" nor "anything goes"</T>
    </Diagram>
  )
}
