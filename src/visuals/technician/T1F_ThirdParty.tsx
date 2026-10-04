import { C, Box, Diagram, Ln, T } from '../kit'

/** Third-party communication: a licensed control operator relays for someone who isn't licensed. */
export function ThirdParty() {
  return (
    <Diagram w={640} h={250} title="Third-party communication: an unlicensed person talks through a licensed operator's station to another station" caption="You stay in control. The other end can be foreign only if that country has a third-party agreement with the US.">
      <Box x={14} y={90} w={150} h={70} label="Unlicensed friend" sub="speaks, no license" color={C.resist} fill="transparent" dash="5 4" />
      <Box x={245} y={70} w={150} h={110} label="Your station" sub="you = control operator" color={C.signal} />
      <Box x={476} y={50} w={150} h={64} label="US ham" sub="any amateur" color={C.ink} />
      <Box x={476} y={142} w={150} h={64} label="Foreign ham" sub="needs agreement" color={C.power} />
      <Ln x1={164} y1={125} x2={245} y2={125} color={C.resist} width={2.5} arrow />
      <Ln x1={395} y1={105} x2={476} y2={84} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={395} y1={145} x2={476} y2={172} color={C.power} width={2.5} arrow="both" />
      <T x={320} y={32} anchor="middle" bold size={14} color={C.signal}>message "on behalf of" another person</T>
      <T x={320} y={218} anchor="middle" size={13} color={C.muted}>third-party communication</T>
    </Diagram>
  )
}
