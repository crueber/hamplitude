import { Antenna, C, Box, Diagram, Ln, T } from '../kit'

/** Noise cancelling: a second antenna that hears mostly the noise, adjusted in phase and gain, then added to cancel the noise in the main antenna. */
export function NoiseCancelling_Layout() {
  const my = 70, ny = 190
  return (
    <Diagram w={640} h={290}
      title="Noise cancelling: a local noise source reaches both the main antenna and a second noise antenna. The noise antenna's signal is adjusted in phase and gain and added to the main antenna's, cancelling the noise while the distant wanted signal, which only the main antenna hears well, remains"
      caption="Adjust phase and gain until the noise cancels. The wanted signal is weak in the noise antenna, so most of it survives.">
      <Box x={16} y={110} w={116} h={56} label="Noise source" sub="house, power line" color={C.bad} size={13} />
      <Ln x1={132} y1={128} x2={196} y2={my + 6} color={C.bad} width={2.5} dash="5 4" arrow />
      <Ln x1={132} y1={150} x2={196} y2={ny - 12} color={C.bad} width={2.5} dash="5 4" arrow />
      <Antenna x={210} y={my + 26} color={C.ink} />
      <Antenna x={210} y={ny + 26} color={C.resist} />
      <T x={230} y={my + 12} size={12} bold color={C.ink}>main antenna</T>
      <T x={230} y={ny + 8} size={12} bold color={C.resist}>noise antenna</T>
      <Ln x1={310} y1={14} x2={226} y2={my - 14} color={C.good} width={3} arrow />
      <T x={330} y={20} size={12} bold color={C.good}>wanted signal, far away</T>
      <Ln x1={210} y1={my + 32} x2={210} y2={my + 40} color={C.ink} width={3} />
      <Ln x1={210} y1={my + 40} x2={480} y2={my + 40} color={C.ink} width={3} />
      <Ln x1={210} y1={ny + 32} x2={210} y2={ny + 40} color={C.resist} width={3} />
      <Ln x1={210} y1={ny + 40} x2={290} y2={ny + 40} color={C.resist} width={3} />
      <Box x={290} y={ny + 14} w={130} h={52} label="Phase and gain" sub="adjust for a null" color={C.resist} size={13} />
      <Ln x1={420} y1={ny + 40} x2={480} y2={ny + 40} color={C.resist} width={3} />
      <Ln x1={480} y1={ny + 40} x2={480} y2={my + 40 + 18} color={C.resist} width={3} />
      <circle cx={480} cy={my + 40} r={18} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <T x={480} y={my + 40} anchor="middle" size={20} bold>+</T>
      <Ln x1={498} y1={my + 40} x2={528} y2={my + 40} color={C.ink} width={3} arrow />
      <Box x={528} y={my + 14} w={92} h={52} label="Receiver" size={13} />
      <T x={574} y={my + 90} anchor="middle" size={12} color={C.muted}>less noise,</T>
      <T x={574} y={my + 106} anchor="middle" size={12} color={C.muted}>signal intact</T>
    </Diagram>
  )
}
