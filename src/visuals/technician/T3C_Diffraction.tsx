import { C, Diagram, Ln, T } from '../kit'

/** Knife-edge diffraction: signal bends over a sharp ridge into the radio shadow. */
export function Diffraction() {
  const g = 200, ax = 330, ay = 86
  return (
    <Diagram w={640} h={250} title="A radio signal bends over the sharp top edge of a ridge and reaches a receiver in the shadow behind it"
      caption="Knife-edge diffraction: a sharp edge bends some of the signal around the obstruction.">
      <polygon points={`200,${g} ${ax},${ay} 460,${g}`} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <Ln x1={20} y1={g} x2={620} y2={g} color={C.muted} width={2.5} />
      <Ln x1={80} y1={g} x2={80} y2={g - 34} color={C.ink} width={4} />
      <T x={80} y={g + 20} anchor="middle" bold size={14}>Transmitter</T>
      <Ln x1={560} y1={g} x2={560} y2={g - 34} color={C.ink} width={4} />
      <T x={560} y={g + 20} anchor="middle" bold size={14}>Receiver</T>
      <Ln x1={90} y1={g - 34} x2={550} y2={g - 34} color={C.bad} width={2} dash="5 6" />
      <T x={140} y={g - 52} anchor="middle" size={13} bold color={C.bad}>direct path blocked</T>
      <Ln x1={80} y1={g - 34} x2={ax - 4} y2={ay - 2} color={C.signal} width={3.5} />
      <path d={`M${ax + 4},${ay - 2} Q${ax + 130},${ay + 10} 556,${g - 34}`} fill="none" stroke={C.signal} strokeWidth={3.5} strokeDasharray="1 7" strokeLinecap="round" />
      <circle cx={ax} cy={ay} r={6} fill={C.power} stroke={C.bg} strokeWidth={2} />
      <T x={ax} y={ay - 20} anchor="middle" bold size={14} color={C.power}>knife edge</T>
      <T x={470} y={92} size={13} color={C.muted}>bends over the edge</T>
    </Diagram>
  )
}
