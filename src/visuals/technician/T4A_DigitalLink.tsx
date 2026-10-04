import { Box, C, Diagram, Ln, T } from '../kit'

/** Computer-radio interface for digital modes like FT8: audio each way, plus keying. */
export function DigitalLink() {
  const lanes = [
    { y: 82, t1: 'Receive audio', t2: 'radio speaker out → computer line in', c: C.signal, dir: -1 },
    { y: 152, t1: 'Transmit audio', t2: 'computer line out → radio audio in', c: C.signal, dir: 1 },
    { y: 222, t1: 'Transmitter keying', t2: 'computer → radio push-to-talk', c: C.power, dir: 1 },
  ]
  return (
    <Diagram w={640} h={290} title="Digital mode link: receive audio from the radio to the computer, transmit audio from the computer to the radio, and a keying signal from the computer to the radio"
      caption="The computer's sound card does the modem's job. FT8 software runs on the computer.">
      <Box x={20} y={30} w={130} h={230} label="Transceiver" color={C.signal} />
      <Box x={490} y={30} w={130} h={230} label="Computer" sub="FT8 software" color={C.ink} />
      {lanes.map((l) => (
        <g key={l.t1}>
          {l.dir === -1
            ? <Ln x1={152} y1={l.y} x2={488} y2={l.y} color={l.c} width={3} arrow />
            : <Ln x1={488} y1={l.y} x2={152} y2={l.y} color={l.c} width={3} arrow />}
          <T x={320} y={l.y - 22} anchor="middle" bold size={14} color={l.c}>{l.t1}</T>
          <T x={320} y={l.y + 20} anchor="middle" size={12.5} color={C.muted}>{l.t2}</T>
        </g>
      ))}
    </Diagram>
  )
}
