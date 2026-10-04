import { C, Diagram, Ln, T } from '../kit'

function Node({ x, y, w, label, sub, color = C.ink }: { x: number; y: number; w: number; label: string; sub?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={52} rx={8} fill={C.fill} stroke={color} strokeWidth={2} />
      <T x={x + w / 2} y={y + (sub ? 19 : 26)} anchor="middle" size={13.5} bold>{label}</T>
      {sub && <T x={x + w / 2} y={y + 38} anchor="middle" size={12.5} color={C.muted}>{sub}</T>}
    </g>
  )
}

/** Where the tuner sits decides what the feed line sees: at the radio it fixes the radio's view only. */
export function AntennaTuners_Placement() {
  return (
    <Diagram w={640} h={330}
      title="Two tuner positions with a 200 ohm antenna on 50 ohm coax. With the tuner at the radio, the radio sees 1 to 1 but the coax still carries 4 to 1. With the tuner at the antenna, the whole coax runs at 1 to 1."
      caption="A tuner at the radio hides the mismatch from the radio only. Moved to the antenna, it removes it from the line too. Example values.">
      <T x={20} y={20} size={14} bold>Tuner at the radio</T>
      <Node x={20} y={40} w={96} label="Radio" sub="sees 1:1" color={C.good} />
      <Node x={150} y={40} w={96} label="Tuner" />
      <Ln x1={116} y1={66} x2={150} y2={66} color={C.ink} width={3} />
      <Ln x1={246} y1={66} x2={450} y2={66} color={C.bad} width={7} />
      <T x={348} y={50} anchor="middle" size={12.5} bold color={C.bad}>coax runs at 4:1</T>
      <T x={348} y={88} anchor="middle" size={12.5} color={C.muted}>reflections, extra loss</T>
      <Node x={450} y={40} w={170} label="Antenna" sub="still 200 Ω" color={C.resist} />

      <T x={20} y={170} size={14} bold>Tuner at the antenna</T>
      <Node x={20} y={190} w={96} label="Radio" sub="sees 1:1" color={C.good} />
      <Ln x1={116} y1={216} x2={340} y2={216} color={C.good} width={7} />
      <T x={228} y={200} anchor="middle" size={12.5} bold color={C.good}>coax runs at 1:1</T>
      <Node x={340} y={190} w={96} label="Tuner" />
      <Ln x1={436} y1={216} x2={450} y2={216} color={C.ink} width={3} />
      <Node x={450} y={190} w={170} label="Antenna" sub="still 200 Ω" color={C.resist} />

      <T x={20} y={290} size={12.5} color={C.muted}>Either way the antenna keeps its own impedance, bandwidth and pattern.</T>
      <T x={20} y={312} size={12.5} color={C.muted}>A tuner changes what is seen at its input, not what the antenna is.</T>
    </Diagram>
  )
}
