import { C, Box, Diagram, Ln, T } from '../kit'

/** Two ways to make FSK on HF: shift the transmitter's own frequency, or shift an audio tone fed to an SSB transmitter. */
export function E2E_FskTypes() {
  const arrow = (x1: number, x2: number, y: number) => <Ln x1={x1} y1={y} x2={x2} y2={y} color={C.muted} width={2.5} arrow />
  const rf = (x: number, y: number) => (
    <g>
      <Ln x1={x} y1={y + 34} x2={x + 90} y2={y + 34} color={C.fill2} width={2} />
      <Ln x1={x + 22} y1={y + 34} x2={x + 22} y2={y + 4} color={C.signal} width={4} />
      <Ln x1={x + 68} y1={y + 34} x2={x + 68} y2={y + 4} color={C.signal} width={4} />
      <T x={x + 22} y={y + 48} anchor="middle" size={11.5} color={C.muted}>mark</T>
      <T x={x + 68} y={y + 48} anchor="middle" size={11.5} color={C.muted}>space</T>
    </g>
  )
  return (
    <Diagram w={640} h={290} title="Two ways to produce FSK on HF. Direct FSK shifts the transmitter's own oscillator, the VFO, between two frequencies. Audio FSK has a computer or modem produce two audio tones that go into the microphone input of an SSB transmitter. Both end as a carrier at two frequencies."
      caption="FSK = the signal jumps between set frequencies (two, for RTTY). Direct FSK moves the VFO itself.">
      <T x={20} y={22} size={15} bold color={C.signal}>Direct FSK</T>
      <Box x={20} y={36} w={150} h={60} label="Data" sub="keyer or computer" color={C.muted} size={13} />
      {arrow(172, 214, 66)}
      <Box x={216} y={36} w={200} h={60} label="Transmitter VFO" sub="itself is shifted" color={C.signal} size={13} />
      {arrow(418, 470, 66)}
      {rf(486, 28)}
      <T x={20} y={140} size={15} bold color={C.power}>Audio FSK</T>
      <Box x={20} y={154} w={150} h={60} label="Computer" sub="sound card tones" color={C.muted} size={13} />
      {arrow(172, 214, 184)}
      <Box x={216} y={154} w={200} h={60} label="SSB transmitter" sub="tones into audio input" color={C.power} size={13} />
      {arrow(418, 470, 184)}
      {rf(486, 146)}
      <T x={320} y={256} anchor="middle" size={13.5}>Below 30 MHz, data uses <tspan fontWeight={700}>FSK</tspan>. Direct FSK modulates the VFO.</T>
    </Diagram>
  )
}
