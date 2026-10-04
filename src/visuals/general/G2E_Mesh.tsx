import { C, Diagram, Ln, T } from '../kit'

/** AREDN: a mesh of nodes, each linking to several others, for high-speed data in an emergency or at an event. */
export function G2E_Mesh() {
  const N: [number, number][] = [[90, 70], [250, 50], [420, 80], [560, 60], [170, 180], [340, 190], [500, 200]]
  const L: [number, number][] = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 5], [5, 6]]
  return (
    <Diagram w={640} h={290} title="An AREDN mesh network: many nodes link to several neighbours, so data can take more than one route. Its purpose is high-speed data services during an emergency or community event" caption="AREDN mesh: nodes link to many neighbours, so data has more than one route.">
      {L.map(([i, j]) => <Ln key={`${i}-${j}`} x1={N[i][0]} y1={N[i][1]} x2={N[j][0]} y2={N[j][1]} color={C.signal} width={2.5} />)}
      {N.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill={C.fill} stroke={C.signal} strokeWidth={3} />
          <circle cx={x} cy={y} r={5} fill={C.signal} />
        </g>
      ))}
      <rect x={14} y={236} width={612} height={40} rx={10} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={320} y={256} anchor="middle" size={14.5} bold color={C.good}>Purpose: high-speed data during an emergency or community event</T>
      <T x={14} y={18} size={13} color={C.muted}>Not an FM repeater, not propagation reporting, not DX spotting.</T>
    </Diagram>
  )
}
