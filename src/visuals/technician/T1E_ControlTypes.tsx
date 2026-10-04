import { C, Box, Diagram, Ln, T } from '../kit'

const Person = ({ x, y, color = C.signal }: { x: number; y: number; color?: string }) => (
  <g stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round">
    <circle cx={x} cy={y - 8} r={9} fill={C.fill} />
    <path d={`M${x - 15} ${y + 22} a15 15 0 0 1 30 0`} />
  </g>
)

/** Local, remote and automatic control: where is the control operator? */
export function ControlTypes() {
  const cols = [
    { x: 10, name: 'Local', color: C.signal },
    { x: 220, name: 'Remote', color: C.resist },
    { x: 430, name: 'Automatic', color: C.power },
  ]
  return (
    <Diagram w={640} h={300} title="Local control has the operator at the station. Remote control reaches the station from another place, for example over the internet. Automatic control, such as a repeater, has no operator at a control point." caption="The control point is wherever the control operator function is performed.">
      {cols.map((c) => (
        <T key={c.name} x={c.x + 100} y={20} anchor="middle" bold size={16} color={c.color}>{c.name}</T>
      ))}
      {/* local */}
      <rect x={10} y={42} width={200} height={90} rx={10} fill="none" stroke={C.signal} strokeWidth={2} strokeDasharray="5 4" />
      <Person x={110} y={78} />
      <T x={110} y={120} anchor="middle" size={12} bold color={C.signal}>control point</T>
      <Ln x1={110} y1={134} x2={110} y2={170} color={C.signal} width={3} />
      <Box x={30} y={170} w={160} h={44} label="Station" color={C.ink} />
      <T x={110} y={240} anchor="middle" size={13}>operator at the station</T>
      {/* remote */}
      <rect x={220} y={42} width={200} height={90} rx={10} fill="none" stroke={C.resist} strokeWidth={2} strokeDasharray="5 4" />
      <Person x={320} y={78} color={C.resist} />
      <T x={320} y={120} anchor="middle" size={12} bold color={C.resist}>control point</T>
      <Ln x1={320} y1={134} x2={320} y2={170} color={C.resist} width={3} dash="6 5" />
      <T x={332} y={152} size={12} bold color={C.resist}>internet / link</T>
      <Box x={240} y={170} w={160} h={44} label="Station" color={C.ink} />
      <T x={320} y={240} anchor="middle" size={13}>operator elsewhere</T>
      <T x={320} y={260} anchor="middle" size={12} color={C.muted}>e.g. operating over the internet</T>
      {/* automatic */}
      <rect x={430} y={42} width={200} height={90} rx={10} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="2 6" />
      <T x={530} y={87} anchor="middle" size={13} color={C.muted}>no operator present</T>
      <Box x={450} y={170} w={160} h={44} label="Repeater" color={C.power} />
      <T x={530} y={240} anchor="middle" size={13}>runs by itself</T>
      <T x={530} y={260} anchor="middle" size={12} color={C.muted}>e.g. repeater operation</T>
    </Diagram>
  )
}
