import { C, Diagram, Ln, T } from '../kit'
import { Fuse } from '../kit'

const WIRES = [
  { y: 66, name: 'Hot (often black)', col: C.ink, fused: true },
  { y: 116, name: 'Hot (often red)', col: C.voltage, fused: true },
  { y: 166, name: 'Neutral (usually white)', col: C.fill2, fused: false },
  { y: 216, name: 'Ground (green or bare)', col: C.good, fused: false },
]

/** A four-conductor 240 V circuit: only the two hot wires get fuses or breakers. */
export function Wires240() {
  const x0 = 120, x1 = 520
  return (
    <Diagram w={640} h={300} title="Four-conductor 240 volt AC circuit: fuses or circuit breakers go only in the two hot wires. The neutral and the ground wire are never fused."
      caption="Fuse the hots, never neutral or ground. Colours vary: a white wire can be re-marked as a hot.">
      <rect x={20} y={40} width={100} height={200} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={70} y={140} anchor="middle" size={13} bold>Panel</T>
      <rect x={520} y={40} width={100} height={200} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={570} y={134} anchor="middle" size={13} bold>240 V</T>
      <T x={570} y={152} anchor="middle" size={13} bold>equipment</T>
      {WIRES.map((w) => (
        <g key={w.name}>
          {w.col === C.fill2 && <Ln x1={x0} y1={w.y} x2={x1} y2={w.y} color={C.ink} width={9} />}
          <Ln x1={x0} y1={w.y} x2={x1} y2={w.y} color={w.col} width={w.col === C.fill2 ? 5 : 6} />
          <T x={x0 + 8} y={w.y - 20} size={13} bold color={w.col === C.fill2 ? C.ink : w.col}>{w.name}</T>
          {w.fused ? (
            <>
              <rect x={290} y={w.y - 16} width={70} height={32} fill={C.bg} stroke="none" />
              <Fuse x={325} y={w.y} len={70} color={C.bad} />
              <T x={410} y={w.y - 20} size={13} bold color={C.bad}>fuse or breaker</T>
            </>
          ) : (
            <T x={410} y={w.y - 20} size={13} color={C.muted}>no fuse</T>
          )}
        </g>
      ))}
      <T x={320} y={270} anchor="middle" size={14} bold>Only the hot wires are fused</T>
    </Diagram>
  )
}
