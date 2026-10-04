import { C, Diagram, Ln, T } from '../kit'

const Stn = ({ x, y, label, color = C.ink }: { x: number; y: number; label: string; color?: string }) => (
  <g>
    <circle cx={x} cy={y} r={20} fill={C.fill} stroke={color} strokeWidth={2.2} />
    <T x={x} y={y} anchor="middle" bold>{label}</T>
  </g>
)
const Rpt = ({ x, y, label, busy = true }: { x: number; y: number; label: string; busy?: boolean }) => (
  <g>
    <rect x={x - 45} y={y - 20} width={90} height={40} rx={8} fill={C.fill} stroke={busy ? C.power : C.muted} strokeWidth={2.2} strokeDasharray={busy ? undefined : '4 4'} />
    <T x={x} y={y} anchor="middle" bold size={13} color={busy ? C.power : C.muted}>{label}</T>
  </g>
)

/** Linked repeaters repeat each other; simplex keeps nearby chat off the repeater. */
export function Linked() {
  return (
    <Diagram w={640} h={330} title="Linked repeaters: a signal received by one repeater is transmitted by all of them. Simplex: nearby stations talk directly and leave the repeater free." caption="Linked: one repeater hears you, all of them transmit. Simplex: within range, leave the repeater alone.">
      <T x={14} y={18} bold size={15} color={C.power}>Linked repeater network</T>
      <Rpt x={100} y={120} label="Repeater 1" />
      <Rpt x={320} y={120} label="Repeater 2" />
      <Rpt x={540} y={120} label="Repeater 3" />
      <Ln x1={147} y1={120} x2={273} y2={120} color={C.power} width={3} dash="6 5" arrow="both" />
      <Ln x1={367} y1={120} x2={493} y2={120} color={C.power} width={3} dash="6 5" arrow="both" />
      <T x={210} y={104} anchor="middle" size={12} color={C.muted}>link</T>
      <T x={430} y={104} anchor="middle" size={12} color={C.muted}>link</T>
      <Stn x={100} y={50} label="A" color={C.resist} />
      <Ln x1={100} y1={72} x2={100} y2={98} color={C.resist} width={2.5} arrow />
      <T x={110} y={88} size={12} bold color={C.resist}>talks</T>
      <Stn x={320} y={190} label="B" color={C.signal} />
      <Ln x1={320} y1={142} x2={320} y2={166} color={C.signal} width={2.5} arrow />
      <Stn x={540} y={190} label="C" color={C.signal} />
      <Ln x1={540} y1={142} x2={540} y2={166} color={C.signal} width={2.5} arrow />
      <T x={430} y={190} anchor="middle" size={13} bold color={C.signal}>B and C hear A</T>
      <T x={14} y={236} bold size={15} color={C.good}>Simplex between nearby stations</T>
      <Stn x={60} y={290} label="D" />
      <Stn x={230} y={290} label="E" />
      <Ln x1={86} y1={290} x2={204} y2={290} color={C.good} width={2.5} arrow="both" />
      <T x={145} y={270} anchor="middle" size={12} bold color={C.good}>direct, one frequency</T>
      <Rpt x={450} y={290} label="Repeater" busy={false} />
      <T x={540} y={290} size={13} color={C.muted}>stays free</T>
    </Diagram>
  )
}
