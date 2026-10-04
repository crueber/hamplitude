import { C, Diagram, Lines, Ln, T } from '../kit'

const LAYERS = [
  { n: 'F2', note: ['highest:', 'longest hop'], y: 52, h: 26, col: C.power, op: 0.26 },
  { n: 'F1', note: null, y: 96, h: 22, col: C.power, op: 0.14 },
  { n: 'E', note: null, y: 140, h: 22, col: C.current, op: 0.16 },
  { n: 'D', note: ['lowest:', 'closest to Earth'], y: 184, h: 22, col: C.resist, op: 0.2 },
]

/** The layer stack, lowest to highest. A higher layer returns the signal farther away. */
export function Layers() {
  const gy = 250, tx = 70
  return (
    <Diagram w={640} h={310} title="Ionospheric regions from the surface up: D is the closest to Earth, then E, F1 and F2, the highest. A hop off the higher F2 region lands farther away than a hop off a lower region"
      caption="Schematic, not to scale. Higher layer, longer skip.">
      {LAYERS.map((l) => (
        <g key={l.n}>
          <rect x={20} y={l.y} width={440} height={l.h} rx={8} fill={l.col} fillOpacity={l.op} stroke={l.col} strokeDasharray="5 5" />
          <T x={32} y={l.y + l.h / 2} size={15} bold color={l.col}>{l.n}</T>
          {l.note && <Lines x={472} y={l.y + l.h / 2 - 9} lines={l.note} size={13} bold color={l.col} lh={18} />}
        </g>
      ))}
      <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <T x={330} y={gy + 15} anchor="middle" size={13} color={C.muted}>Earth</T>
      <Ln x1={tx} y1={gy} x2={tx} y2={gy - 18} color={C.ink} width={3} />
      <polyline points={`${tx},${gy - 18} ${tx + 75},${LAYERS[2].y + 11} ${tx + 150},${gy - 18}`} fill="none" stroke={C.current} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${tx},${gy - 18} ${tx + 170},${LAYERS[0].y + 13} ${tx + 340},${gy - 18}`} fill="none" stroke={C.power} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
      <T x={tx + 150} y={gy - 6} anchor="middle" size={13} bold color={C.current}>E hop</T>
      <T x={tx + 340} y={gy - 6} anchor="middle" size={13} bold color={C.power}>F2 hop</T>
    </Diagram>
  )
}
