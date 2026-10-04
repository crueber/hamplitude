import { C, Diagram, Ln, T } from '../kit'

/** Schematic: Line A runs south of the US-Canada border. 420-430 MHz is off limits north of it. */
export function E1F_LineA() {
  return (
    <Diagram w={640} h={300} title="Schematic map of the contiguous 48 states. Line A runs roughly parallel to and south of the border between the US and Canada. Stations located north of Line A may not transmit in 420 to 430 megahertz." caption="Schematic, not to scale. Line A sits south of the Canadian border; the Mexican border is on the other side.">
      <rect x={6} y={6} width={628} height={46} fill={C.fill} />
      <T x={20} y={29} bold size={14} color={C.muted}>CANADA</T>
      <Ln x1={6} y1={52} x2={634} y2={52} color={C.ink} width={3} />
      <T x={620} y={29} anchor="end" size={13} color={C.muted}>border</T>
      <rect x={6} y={52} width={628} height={64} fill={C.bad} fillOpacity={0.14} />
      <Ln x1={6} y1={116} x2={634} y2={116} color={C.bad} width={3} dash="10 6" />
      <T x={620} y={134} anchor="end" bold size={14} color={C.bad}>Line A</T>
      <T x={20} y={84} bold size={14} color={C.bad}>North of Line A: do NOT transmit 420 – 430 MHz</T>
      <rect x={6} y={116} width={628} height={110} fill={C.good} fillOpacity={0.1} />
      <T x={20} y={172} bold size={14} color={C.good}>South of Line A</T>
      <Ln x1={6} y1={226} x2={634} y2={226} color={C.ink} width={3} />
      <T x={620} y={244} anchor="end" size={13} color={C.muted}>border</T>
      <rect x={6} y={226} width={628} height={68} fill={C.fill} />
      <T x={20} y={262} bold size={14} color={C.muted}>MEXICO</T>
    </Diagram>
  )
}
