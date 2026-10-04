import { C, Diagram, Ln, T } from '../kit'

/** Aim your downlink signal at the same strength as the beacon. */
export function UplinkLevel() {
  const base = 230, h = 150, beacon = 0.5
  const bars = [
    { x: 60, v: 0.2, label: 'Too low', sub: 'weak, hard to copy', col: C.muted },
    { x: 250, v: 0.5, label: 'About right', sub: 'same as the beacon', col: C.good },
    { x: 440, v: 0.95, label: 'Too high', sub: 'blocks other users', col: C.bad },
  ]
  return (
    <Diagram w={640} h={300} title="Downlink signal strength compared with the satellite beacon: a signal at the beacon's level is right; much weaker is too low; much stronger hogs the transponder and blocks other users" caption="Check your own downlink against the beacon. Too much uplink power blocks others.">
      {bars.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={base - h * b.v} width={140} height={h * b.v} rx={8} fill={b.col} fillOpacity={0.3} stroke={b.col} strokeWidth={2.5} />
          <T x={b.x + 70} y={base + 24} anchor="middle" size={15} bold color={b.col === C.muted ? C.ink : b.col}>{b.label}</T>
          <T x={b.x + 70} y={base + 46} anchor="middle" size={13} color={C.muted}>{b.sub}</T>
        </g>
      ))}
      <Ln x1={40} y1={base - h * beacon} x2={620} y2={base - h * beacon} color={C.power} width={2.5} dash="7 5" />
      <T x={44} y={base - h * beacon - 14} anchor="start" size={14} bold color={C.power}>beacon level</T>
      <Ln x1={40} y1={base} x2={620} y2={base} color={C.muted} width={2} />
      <T x={40} y={22} size={13} color={C.muted}>your signal heard on the downlink</T>
    </Diagram>
  )
}
