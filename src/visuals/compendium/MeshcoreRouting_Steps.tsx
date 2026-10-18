import { C, Diagram, Ln, T } from '../kit'

const XS = [250, 330, 410, 490, 570] // sender, three repeaters, destination
const ROWS = [58, 152, 246]

function Chain({ y, color, dir }: { y: number; color: string; dir: 'right' | 'left' }) {
  const segs = [0, 1, 2, 3]
  return (
    <>
      {segs.map((i) => {
        const a = XS[i] + 20, b = XS[i + 1] - 20
        return dir === 'right'
          ? <Ln key={i} x1={a} y1={y} x2={b} y2={y} color={color} width={2.5} arrow />
          : <Ln key={i} x1={b} y1={y} x2={a} y2={y} color={color} width={2.5} arrow />
      })}
    </>
  )
}

function Nodes({ y }: { y: number }) {
  return (
    <>
      {XS.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={y} r={18} fill={C.bg} stroke={i === 0 || i === 4 ? C.current : C.signal} strokeWidth={2.5} />
          <T x={x} y={y} anchor="middle" size={11.5} bold>{i === 0 ? 'You' : i === 4 ? 'End' : `R${i}`}</T>
        </g>
      ))}
    </>
  )
}

/** Flood to discover a path, learn it from the delivery report, then send along it. */
export function MeshcoreRouting_Steps() {
  const [y1, y2, y3] = ROWS
  return (
    <Diagram w={640} h={330}
      title="Three steps. Step one: the first message to a destination floods every repeater in range, including a repeater off to the side. Step two: the destination sends back a delivery report that lists the repeaters the message passed through. Step three: later messages carry that path, so only the repeaters on the path pass them on and the repeater off to the side stays quiet."
      caption="Repeater R1, R2 and R3 are on the learned path. The extra repeater below them is in range but not on the path.">
      {/* 1: flood */}
      <T x={16} y={y1 - 8} size={14} bold>1. First message</T>
      <T x={16} y={y1 + 12} size={12.5} color={C.muted}>floods every repeater</T>
      <Ln x1={XS[1]} y1={y1 + 14} x2={370} y2={y1 + 32} color={C.resist} width={2} />
      <Ln x1={370} y1={y1 + 32} x2={XS[2]} y2={y1 + 14} color={C.resist} width={2} />
      <circle cx={370} cy={y1 + 34} r={10} fill={C.bg} stroke={C.resist} strokeWidth={2} />
      <Chain y={y1} color={C.resist} dir="right" />
      <Nodes y={y1} />

      {/* 2: delivery report */}
      <T x={16} y={y2 - 8} size={14} bold>2. Delivery report</T>
      <T x={16} y={y2 + 12} size={12.5} color={C.muted}>lists the path</T>
      <circle cx={370} cy={y2 + 34} r={10} fill={C.bg} stroke={C.muted} strokeWidth={2} strokeDasharray="3 3" />
      <Chain y={y2} color={C.good} dir="left" />
      <Nodes y={y2} />

      {/* 3: pathed */}
      <T x={16} y={y3 - 8} size={14} bold>3. Later messages</T>
      <T x={16} y={y3 + 12} size={12.5} color={C.muted}>carry the path</T>
      <circle cx={370} cy={y3 + 34} r={10} fill={C.bg} stroke={C.muted} strokeWidth={2} strokeDasharray="3 3" />
      <T x={390} y={y3 + 34} size={12.5} color={C.muted}>not on the path: stays quiet</T>
      <Chain y={y3} color={C.signal} dir="right" />
      <Nodes y={y3} />
    </Diagram>
  )
}
