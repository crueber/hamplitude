import { Antenna, Box, C, Diagram, Ln, T } from '../kit'

/** Directional wattmeter sits in line with a working transmitter; an antenna analyzer replaces the transmitter. */
export function Analyzer() {
  return (
    <Diagram w={640} h={330} title="Two ways to find SWR. A directional wattmeter sits in the feed line between a running transmitter and the antenna and reads forward and reflected power. An antenna analyzer is connected only to the feed line and antenna, with no transmitter, and makes its own test signal; strong signals from a nearby transmitter can disturb its SWR readings."
      caption="Analyzer: antenna and feed line only. Keep the transmitter off.">
      <T x={20} y={18} bold size={14}>Directional wattmeter</T>
      <Box x={20} y={50} w={120} h={60} label="Transmitter" color={C.signal} />
      <Box x={190} y={50} w={170} h={60} label="Wattmeter" sub="forward + reflected" color={C.power} />
      <Ln x1={140} y1={80} x2={190} y2={80} color={C.ink} width={3.5} />
      <Ln x1={360} y1={80} x2={450} y2={80} color={C.ink} width={3.5} />
      <Ln x1={450} y1={80} x2={450} y2={104} color={C.ink} width={3.5} />
      <Antenna x={450} y={130} />
      <T x={275} y={128} anchor="middle" size={13} bold color={C.power}>forward and reflected power give SWR</T>

      <line x1={20} y1={160} x2={620} y2={160} stroke={C.fill2} strokeWidth={2} />

      <T x={20} y={184} bold size={14}>Antenna analyzer</T>
      <Box x={20} y={216} w={170} h={64} label="Analyzer" sub="makes its own signal" color={C.good} />
      <T x={290} y={238} anchor="middle" size={12} color={C.muted}>feed line</T>
      <Ln x1={190} y1={248} x2={450} y2={248} color={C.ink} width={3.5} />
      <Ln x1={450} y1={248} x2={450} y2={270} color={C.ink} width={3.5} />
      <Antenna x={450} y={296} />
      <T x={20} y={314} size={12} color={C.muted}>no transmitter connected</T>
      <Box x={520} y={196} w={100} h={50} label="Nearby TX" color={C.bad} size={13} dash="5 4" />
      <Ln x1={560} y1={246} x2={470} y2={278} color={C.bad} width={2.5} dash="6 5" arrow />
      <T x={578} y={274} anchor="middle" size={12} bold color={C.bad}>strong signal</T>
      <T x={578} y={292} anchor="middle" size={12} bold color={C.bad}>spoils SWR</T>
    </Diagram>
  )
}
