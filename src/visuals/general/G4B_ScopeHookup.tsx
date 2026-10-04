import { Box, C, Diagram, Ln, T } from '../kit'

/** The scope has a vertical and a horizontal channel amplifier. The RF sample goes to the vertical input. */
export function ScopeHookup() {
  return (
    <Diagram w={640} h={250} title="An oscilloscope contains a vertical channel amplifier and a horizontal channel amplifier. An attenuated sample of the transmitter's RF output is connected to the vertical input; the horizontal channel is the time sweep."
      caption="Vertical input: attenuated RF output. Horizontal: time sweep.">
      <Box x={14} y={80} w={120} h={70} label="Transmitter" color={C.signal} />
      <Box x={174} y={80} w={120} h={70} label="Attenuator" sub="samples the RF" color={C.power} />
      <Ln x1={134} y1={115} x2={174} y2={115} color={C.ink} width={3.5} arrow />
      <rect x={340} y={20} width={286} height={210} rx={14} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={483} y={42} anchor="middle" bold size={15}>Oscilloscope</T>
      <Box x={360} y={66} w={246} h={56} label="Vertical channel amplifier" sub="up-down: signal strength" color={C.signal} size={13} />
      <Box x={360} y={150} w={246} h={56} label="Horizontal channel amplifier" sub="left-right: time sweep" color={C.muted} size={13} />
      <Ln x1={294} y1={115} x2={322} y2={115} color={C.ink} width={3.5} />
      <Ln x1={322} y1={115} x2={322} y2={94} color={C.ink} width={3.5} />
      <Ln x1={322} y1={94} x2={358} y2={94} color={C.ink} width={3.5} arrow />
    </Diagram>
  )
}
