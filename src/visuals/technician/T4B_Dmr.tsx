import { Box, C, Diagram, Ln, T } from '../kit'

/** DMR: a code plug loaded into the radio holds repeaters and talkgroups; pick a group by its ID. D-STAR needs your call sign. */
export function Dmr() {
  return (
    <Diagram w={640} h={290} title="A code plug is configuration data loaded into a DMR radio from a computer. It holds repeaters and talkgroups; you pick a talkgroup by its ID code. A D-STAR radio needs your call sign programmed."
      caption="Digital radios must be configured before they work on the network.">
      <Box x={20} y={30} w={150} h={90} label="Computer" sub="programming software" color={C.ink} />
      <Ln x1={172} y1={75} x2={258} y2={75} color={C.signal} width={3} arrow />
      <T x={215} y={56} anchor="middle" size={13} bold color={C.signal}>load</T>
      <Box x={260} y={22} w={360} h={160} label="" color={C.signal} />
      <T x={440} y={44} anchor="middle" bold size={15} color={C.signal}>DMR radio: code plug</T>
      <Box x={285} y={62} w={150} h={50} label="Repeaters" sub="channels to use" size={14} />
      <Box x={445} y={62} w={150} h={50} label="Talkgroups" sub="ID codes" size={14} />
      <T x={440} y={146} anchor="middle" size={13.5} color={C.muted}>Select a group by entering its</T>
      <T x={440} y={166} anchor="middle" size={13.5} bold color={C.power}>talkgroup ID code</T>
      <Box x={20} y={206} w={600} h={66} label="D-STAR radio: program your call sign before transmitting" color={C.power} size={15} />
    </Diagram>
  )
}
