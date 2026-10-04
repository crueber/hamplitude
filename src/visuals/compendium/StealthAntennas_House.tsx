import { C, Diagram, Ln, T } from '../kit'

/** Four common low-profile options around a house, each with its main compromise. */
export function StealthAntennas_House() {
  const gy = 250
  return (
    <Diagram w={640} h={340}
      title="A house with four low-visibility antenna options: a wire in the attic, a small loop in a window, a flagpole that hides a vertical, and a thin wire to a tree. Each has a compromise, such as losses from nearby building materials, wiring noise, a poor ground system, or a short, low antenna"
      caption="Each option hides the antenna and gives something up. Illustrative, not an endorsement of any one.">
      <rect x={10} y={gy} width={620} height={30} fill={C.fill2} />
      <path d="M170,150 L170,250 L400,250 L400,150 Z" fill={C.fill} stroke={C.ink} strokeWidth={3} />
      <path d="M150,152 L285,78 L420,152 Z" fill={C.fill} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={196} y={186} width={46} height={40} fill={C.bg} stroke={C.muted} strokeWidth={2} />
      <circle cx={219} cy={206} r={13} fill="none" stroke={C.signal} strokeWidth={3} />
      <Ln x1={206} y1={134} x2={364} y2={134} color={C.signal} width={3} dash="6 5" />
      <Ln x1={84} y1={gy} x2={84} y2={70} color={C.muted} width={6} />
      <circle cx={84} cy={64} r={6} fill={C.muted} />
      <rect x={86} y={76} width={34} height={22} fill={C.bad} fillOpacity={0.35} />
      <Ln x1={560} y1={gy} x2={560} y2={150} color={C.muted} width={9} />
      <circle cx={560} cy={120} r={48} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2} />
      <Ln x1={402} y1={156} x2={540} y2={104} color={C.signal} width={1.5} />

      <T x={84} y={282} anchor="middle" size={13} bold>Flagpole vertical</T>
      <T x={84} y={302} anchor="middle" size={12} color={C.muted}>needs radials</T>
      <T x={232} y={282} anchor="middle" size={13} bold>Window loop</T>
      <T x={232} y={302} anchor="middle" size={12} color={C.muted}>small and narrow</T>
      <T x={330} y={34} anchor="middle" size={13} bold>Attic wire</T>
      <T x={330} y={52} anchor="middle" size={12} color={C.muted}>loss and noise from wiring</T>
      <T x={560} y={282} anchor="middle" size={13} bold>Thin wire to a tree</T>
      <T x={560} y={302} anchor="middle" size={12} color={C.muted}>low, may need a tuner</T>
      <Ln x1={330} y1={64} x2={330} y2={126} color={C.muted} width={1.5} arrow />
    </Diagram>
  )
}
