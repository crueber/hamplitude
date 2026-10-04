import { C, Box, Diagram, Ln, T } from '../kit'

/** Who selects a frequency coordinator, and what it does. */
export function T1A_Coordinator() {
  return (
    <Diagram w={640} h={160} title="Local amateur operators whose stations may be repeater or auxiliary stations select a volunteer frequency coordinator, who recommends channels for repeater and auxiliary stations" caption="Volunteers, chosen by the amateurs affected. Not the FCC, not the ITU.">
      <Box x={6} y={36} w={150} h={78} label="Local amateurs" sub="who run repeaters" color={C.ink} size={14} />
      <Box x={232} y={36} w={190} h={78} label="Frequency coordinator" sub="volunteer" color={C.signal} size={14} />
      <Box x={464} y={36} w={170} h={78} label="Repeater + auxiliary" sub="get channel pairs" color={C.ink} size={14} />
      <Ln x1={158} y1={75} x2={230} y2={75} color={C.muted} width={2.5} arrow />
      <T x={194} y={58} anchor="middle" size={13} bold color={C.muted}>select</T>
      <Ln x1={424} y1={75} x2={462} y2={75} color={C.muted} width={2.5} arrow />
      <T x={327} y={138} anchor="middle" size={13} bold color={C.signal}>recommends transmit and receive channels</T>
    </Diagram>
  )
}

/** RACES control operator: licence plus enrollment certified by a civil defense organization. */
export function T1A_Races() {
  return (
    <Diagram w={640} h={130} title="To be a RACES control operator you need an FCC amateur license plus certification of current enrollment by a civil defense organization" caption="ARES or ARRL membership is not the requirement.">
      <Box x={6} y={26} w={190} h={64} label="FCC amateur license" color={C.ink} size={14} />
      <T x={218} y={58} anchor="middle" bold size={24} color={C.muted}>+</T>
      <Box x={240} y={26} w={230} h={64} label="Civil defense enrollment" sub="current, certified" color={C.good} size={14} />
      <T x={490} y={58} anchor="middle" bold size={24} color={C.muted}>=</T>
      <Box x={510} y={26} w={124} h={64} label="RACES" sub="control operator" color={C.signal} size={14} />
    </Diagram>
  )
}
