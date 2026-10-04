import { C, Box, Diagram, Ln, T } from '../kit'

/** Linking over the internet: IRLP (radio + DTMF) and EchoLink (computer or phone). */
export function NetLink() {
  const link = (x1: number, x2: number, y: number) => <Ln x1={x1} y1={y} x2={x2} y2={y} color={C.muted} width={2.5} arrow="both" />
  const gw = (x: number, y: number) => <Box x={x} y={y} w={140} h={56} label="Gateway" sub="node / repeater" color={C.ink} size={13} />
  const net = (x: number, y: number) => <Box x={x} y={y} w={90} h={56} label="Internet" color={C.signal} fill={C.fill2} size={13} />
  const y1 = 44, y2 = 154
  return (
    <Diagram w={640} h={250} title="Linking over the internet: with IRLP you use a radio and send DTMF tones to a gateway node, which links to a remote repeater; with EchoLink you can use a computer or phone, with no radio, to reach a gateway repeater after registering your call sign" caption="A gateway is a station that connects radio to the internet.">
      <T x={20} y={y1 - 16} size={15} bold color={C.resist}>IRLP: from a radio</T>
      <Box x={20} y={y1} w={130} h={56} label="Your radio" sub="sends DTMF tones" color={C.resist} size={13} />
      {link(152, 204, y1 + 28)}
      {gw(206, y1)}
      {link(348, 392, y1 + 28)}
      {net(394, y1)}
      {link(486, 518, y1 + 28)}
      <Box x={520} y={y1} w={100} h={56} label="Remote" sub="repeater" color={C.ink} size={13} />
      <T x={20} y={y2 - 16} size={15} bold color={C.current}>EchoLink: no radio needed</T>
      <Box x={20} y={y2} w={130} h={56} label="Computer" sub="or phone (VoIP)" color={C.current} size={13} />
      {link(152, 192, y2 + 28)}
      {net(194, y2)}
      {link(286, 332, y2 + 28)}
      {gw(334, y2)}
      <Ln x1={476} y1={y2 + 28} x2={518} y2={y2 + 28} color={C.muted} width={2.5} arrow />
      <Box x={520} y={y2} w={100} h={56} label="Radios" sub="on the air" color={C.ink} size={13} />
    </Diagram>
  )
}
