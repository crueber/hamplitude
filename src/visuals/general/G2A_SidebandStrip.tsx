import { C, Diagram, Ln, T } from '../kit'

const LSB = ['160 m', '75/80 m', '40 m']
const USB = ['20 m', '17 m', '15 m', '12 m', '10 m', 'VHF / UHF']

/** Which sideband is the habit on which band. Pure convention, not law. */
export function G2A_SidebandStrip() {
  const chip = (x: number, w: number, label: string, col: string) => (
    <g key={label}>
      <rect x={x} y={88} width={w} height={44} rx={9} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={110} anchor="middle" size={14} bold>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={236} title="Voice sideband habit by band: lower sideband on 160, 75 and 40 meters; upper sideband on 20, 17, 15, 12 and 10 meters and on VHF and UHF. It is an accepted practice, not a rule" caption="Low bands LSB, 14 MHz and up USB. Habit, not law.">
      <T x={14} y={20} size={13} color={C.muted}>lower frequency</T>
      <T x={626} y={20} size={13} color={C.muted} anchor="end">higher frequency</T>
      <Ln x1={14} y1={40} x2={626} y2={40} color={C.muted} width={2} arrow />
      <rect x={14} y={52} width={194} height={26} rx={6} fill={C.resist} fillOpacity={0.18} />
      <T x={111} y={65} anchor="middle" size={14} bold color={C.resist}>LSB on the low bands</T>
      <rect x={216} y={52} width={410} height={26} rx={6} fill={C.current} fillOpacity={0.18} />
      <T x={421} y={65} anchor="middle" size={14} bold color={C.current}>USB at 14 MHz and up</T>
      {LSB.map((l, i) => chip(14 + i * 66, 62, l, C.resist))}
      {USB.map((l, i) => chip(216 + i * 63 + (i === 5 ? 0 : 0), i === 5 ? 94 : 58, l, C.current))}
      <Ln x1={212} y1={52} x2={212} y2={150} color={C.ink} width={2} dash="4 4" />
      <T x={212} y={166} anchor="middle" size={13} color={C.muted}>switch point (between 40 m and 20 m)</T>
      <rect x={96} y={186} width={448} height={34} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <T x={320} y={203} anchor="middle" size={14}>Why LSB on 160, 75, 40? <tspan fontWeight={700}>Accepted amateur practice.</tspan></T>
    </Diagram>
  )
}
