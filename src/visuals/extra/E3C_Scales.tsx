import { C, Diagram, Ln, T } from '../kit'

const G = [null, null, null, null, null, 'G1', 'G2', 'G3', 'G4', 'G5']

/** K index 0-9 maps onto the G1-G5 geomagnetic storm scale. Rising A or K means more disturbance. */
export function Scales() {
  const x0 = 40, w = 54
  return (
    <Diagram w={640} h={250} title="The K-index runs from 0 to 9. Higher means a more disturbed geomagnetic field. Storm levels G1 to G5 start at K of 5, and G5, the extreme storm, is K of 9"
      caption="A-index rises the same way as K. Higher means more disturbance.">
      <T x={x0} y={24} size={14} bold color={C.muted}>K-index (planetary Kp)</T>
      {G.map((g, k) => {
        const hot = k >= 5
        const col = !hot ? C.good : k === 9 ? C.bad : C.resist
        return (
          <g key={k}>
            <rect x={x0 + k * (w + 4)} y={42} width={w} height={64} rx={6} fill={col} fillOpacity={0.2 + (hot ? (k - 4) * 0.07 : 0)} stroke={col} strokeWidth={2} />
            <T x={x0 + k * (w + 4) + w / 2} y={74} anchor="middle" size={22} bold color={col}>{k}</T>
            {g && <T x={x0 + k * (w + 4) + w / 2} y={130} anchor="middle" size={16} bold color={col}>{g}</T>}
          </g>
        )
      })}
      <Ln x1={x0} y1={172} x2={x0 + 10 * (w + 4) - 8} y2={172} color={C.muted} width={2.5} arrow />
      <T x={x0} y={196} size={13} color={C.muted}>quiet</T>
      <T x={x0 + 10 * (w + 4) - 8} y={196} anchor="end" size={13} bold color={C.bad}>more disturbed</T>
      <T x={x0} y={226} size={14} bold color={C.resist}>storm levels start at Kp 5 = G1. G5 is the extreme storm.</T>
    </Diagram>
  )
}
