import { C, Box, Diagram, Ln, T } from '../kit'

/** Secondary status: amateurs share the segment and must not interfere with the primary users. */
export function T1B_Secondary() {
  return (
    <Diagram w={640} h={150} title="In band segments where amateur radio is secondary, non-amateur stations may be present and amateurs must avoid interfering with them" caption="Secondary means you share, and the other user comes first.">
      <Box x={6} y={34} w={230} h={76} label="Non-amateur stations" sub="primary: may be on the channel" color={C.resist} size={14} />
      <Box x={404} y={34} w={230} h={76} label="Amateur radio" sub="secondary: you" color={C.signal} size={14} />
      <Ln x1={402} y1={72} x2={240} y2={72} color={C.bad} width={3} arrow />
      <T x={321} y={44} anchor="middle" bold size={13} color={C.bad}>must avoid</T>
      <T x={321} y={60} anchor="middle" bold size={13} color={C.bad}>interfering</T>
    </Diagram>
  )
}
