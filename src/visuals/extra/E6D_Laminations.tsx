import { C, Diagram, T } from '../kit'

const loop = (cx: number, cy: number, rx: number, ry: number) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={C.bad} strokeWidth={2.5} />
    <polygon points={`${cx - 5},${cy - ry - 6} ${cx - 5},${cy - ry + 6} ${cx + 6},${cy - ry}`} fill={C.bad} />
  </g>
)

/** Eddy currents circulate inside a solid core; thin insulated layers break the loops into small ones. */
export function Laminations() {
  return (
    <Diagram w={640} h={250} title="Left: a solid core lets big eddy-current loops circulate, wasting power as heat. Right: a core made of thin insulated layers confines eddy currents to small loops, so far less power is lost."
      caption="Changing flux drives circulating currents in the core. Thin layers keep them small.">
      <T x={160} y={24} anchor="middle" bold size={14}>Solid core</T>
      <rect x={70} y={44} width={180} height={140} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      {loop(160, 114, 62, 46)}
      <T x={160} y={206} anchor="middle" size={13} color={C.bad} bold>big loops: lots of heat</T>
      <T x={480} y={24} anchor="middle" bold size={14}>Thin layers (laminations)</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={390 + i * 36} y={44} width={30} height={140} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
          {loop(405 + i * 36, 114, 9, 38)}
        </g>
      ))}
      <T x={480} y={206} anchor="middle" size={13} color={C.good} bold>small loops: little heat</T>
      <T x={480} y={226} anchor="middle" size={12} color={C.muted}>insulation between the layers</T>
      <T x={160} y={226} anchor="middle" size={12} color={C.muted}>changing flux through the core</T>
    </Diagram>
  )
}
