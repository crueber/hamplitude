import { C, Diagram, Ln, T } from '../kit'

/** Tower grounding: a separate 8-ft rod at each leg, bonded to the leg and to each other, with short, direct, gently bent wires. */
export function TowerGround() {
  const gy = 220, lx = 110, rx = 250
  return (
    <Diagram w={640} h={340} title="Tower grounding: a separate eight-foot ground rod at each tower leg, bonded to the tower and to each other with short, direct wires and no sharp bends. Local electrical codes set the requirements"
      caption="Short and direct. No sharp bends, no drip loops. Local electrical codes set the rules.">
      <rect x={20} y={gy} width={350} height={104} fill={C.fill} />
      <Ln x1={20} y1={gy} x2={370} y2={gy} color={C.muted} width={3} />
      {/* tower */}
      <Ln x1={lx} y1={gy} x2={lx + 38} y2={40} color={C.ink} width={6} />
      <Ln x1={rx} y1={gy} x2={rx - 38} y2={40} color={C.ink} width={6} />
      {[70, 110, 150, 190].map((y) => {
        const t = (gy - y) / (gy - 40)
        return <Ln key={y} x1={lx + 38 * t} y1={y} x2={rx - 38 * t} y2={y} color={C.muted} width={3} />
      })}
      <Ln x1={lx - 40} y1={40} x2={rx + 40} y2={40} color={C.resist} width={5} />
      <T x={(lx + rx) / 2} y={22} anchor="middle" size={13} bold>tower</T>
      {/* rods + bond */}
      {[lx, rx].map((x) => (
        <g key={x}>
          <Ln x1={x} y1={gy} x2={x} y2={gy + 88} color={C.good} width={8} />
          <circle cx={x} cy={gy} r={5} fill={C.good} />
        </g>
      ))}
      <Ln x1={lx} y1={gy + 50} x2={rx} y2={gy + 50} color={C.good} width={5} />
      <T x={lx - 12} y={gy + 70} anchor="end" size={13} bold color={C.good}>8-ft rod</T>
      <T x={lx - 12} y={gy + 88} anchor="end" size={13} bold color={C.good}>per leg</T>
      <T x={(lx + rx) / 2} y={gy + 70} anchor="middle" size={13} bold color={C.good}>bonded together</T>
      {/* wire routing */}
      <T x={400} y={22} size={15} bold>Ground wire routing</T>
      {/* good */}
      <Ln x1={420} y1={60} x2={420} y2={120} color={C.good} width={5} />
      <T x={446} y={80} size={14} bold color={C.good}>Short and direct</T>
      <T x={446} y={100} size={13} color={C.muted}>straight to the rod</T>
      {/* bad: right angle */}
      <path d="M420,150 L420,170 L450,170 L450,190 L420,190 L420,210" fill="none" stroke={C.bad} strokeWidth={5} strokeLinejoin="miter" />
      <T x={470} y={170} size={14} bold color={C.bad}>Right-angle bends</T>
      <T x={470} y={190} size={13} color={C.muted}>avoid sharp bends</T>
      {/* bad: drip loop */}
      <path d="M420,248 L420,262 C400,262 400,286 420,286 L420,300" fill="none" stroke={C.bad} strokeWidth={5} />
      <T x={446} y={268} size={14} bold color={C.bad}>Drip loop</T>
      <T x={446} y={288} size={13} color={C.muted}>not for ground wires</T>
    </Diagram>
  )
}
