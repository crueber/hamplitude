import { Box, C, Diagram, Ln, T } from '../kit'

/** Where the four personal radio services sit on a frequency axis: CB near 27 MHz, MURS in the VHF band, FRS and GMRS sharing UHF. */
export function PersonalRadioServicesCompared_Bands() {
  return (
    <Diagram w={640} h={272}
      title="Where the four personal radio services sit by frequency, not to scale. CB radio is near 27 megahertz, with 40 channels. MURS is in the VHF range around 152 megahertz, with 5 channels. FRS and GMRS share the UHF channels around 462 to 468 megahertz: FRS has 22 channels and GMRS 30, and all 22 FRS channels are also GMRS channels."
      caption="Frequency axis not to scale. FRS and GMRS share their UHF channels; CB and MURS each have a band of their own.">
      <T x={320} y={20} size={14} bold anchor="middle">Four services, three stretches of spectrum</T>

      <Box x={26} y={92} w={168} h={58} label="CB" sub="40 channels" color={C.resist} size={15} />
      <Box x={236} y={92} w={168} h={58} label="MURS" sub="5 channels" color={C.power} size={15} />
      <Box x={446} y={48} w={168} h={58} label="FRS" sub="22 channels" color={C.signal} size={15} />
      <Box x={446} y={116} w={168} h={58} label="GMRS" sub="30 channels" color={C.current} size={15} />
      <T x={610} y={184} size={12.5} anchor="end" color={C.muted}>FRS shares GMRS channels</T>

      <Ln x1={20} y1={212} x2={620} y2={212} color={C.muted} width={2} arrow />
      {[110, 320, 530].map((x) => <Ln key={x} x1={x} y1={206} x2={x} y2={218} color={C.muted} width={2} />)}
      <T x={110} y={234} size={13} bold anchor="middle">about 27 MHz</T>
      <T x={320} y={234} size={13} bold anchor="middle">about 152 MHz</T>
      <T x={530} y={234} size={13} bold anchor="middle">462 to 468 MHz</T>
      <T x={320} y={256} size={12.5} anchor="middle" color={C.muted}>Frequency, higher to the right (not to scale)</T>
    </Diagram>
  )
}
