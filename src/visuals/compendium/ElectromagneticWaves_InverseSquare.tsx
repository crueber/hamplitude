import { C, Diagram, Ln, T } from '../kit'

const SX = 50, CY = 82
const DIST = [
  { x: 210, n: 1, label: 'distance 1', note: 'full strength' },
  { x: 370, n: 2, label: 'distance 2', note: '¼ each' },
  { x: 530, n: 3, label: 'distance 3', note: '1/9 each' },
]
const CELL = 22

/** The same energy spreads over an area that grows with the square of the distance. */
export function ElectromagneticWaves_InverseSquare() {
  return (
    <Diagram w={640} h={296}
      title="Inverse-square law: the same radiated power spreads over 1, 4 and 9 patches of area at one, two and three times the distance, so the power per patch falls to a quarter and a ninth"
      caption="Double the distance, quarter the power density (a loss of 6 dB). In open space, this spreading is the only loss.">
      <polygon points={`${SX},${CY} ${DIST[2].x},${CY - 54} ${DIST[2].x},${CY + 54}`} fill={C.signal} fillOpacity={0.14} />
      <Ln x1={SX} y1={CY} x2={DIST[2].x} y2={CY - 54} color={C.signal} width={2} dash="5 5" />
      <Ln x1={SX} y1={CY} x2={DIST[2].x} y2={CY + 54} color={C.signal} width={2} dash="5 5" />
      <circle cx={SX} cy={CY} r={7} fill={C.power} stroke={C.bg} strokeWidth={2} />
      <T x={SX} y={CY - 22} anchor="middle" size={13} bold color={C.power}>antenna</T>
      {DIST.map((d) => {
        const half = 18 * d.n
        return (
          <g key={d.n}>
            <Ln x1={d.x} y1={CY - half} x2={d.x} y2={CY + half} color={C.signal} width={4} />
            <T x={d.x} y={150} anchor="middle" size={13} color={C.muted}>{d.label}</T>
            {Array.from({ length: d.n * d.n }, (_, i) => {
              const gx = d.x - (d.n * CELL) / 2 + (i % d.n) * CELL
              const gy = 172 + Math.floor(i / d.n) * CELL
              return <rect key={i} x={gx} y={gy} width={CELL - 2} height={CELL - 2} rx={3} fill={C.signal} fillOpacity={0.9 / (d.n * d.n) + 0.12} stroke={C.signal} strokeWidth={1.5} />
            })}
            <T x={d.x} y={262} anchor="middle" size={13} bold color={C.ink}>{`${d.n * d.n} ${d.n === 1 ? 'patch' : 'patches'}`}</T>
            <T x={d.x} y={280} anchor="middle" size={13} color={C.muted}>{d.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
