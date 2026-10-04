import { C, Diagram, Ln, T, useTime } from '../kit'

const F0 = 1.8, F1 = 450
const X = (f: number) => 40 + (Math.log(f / F0) / Math.log(F1 / F0)) * 560

/** A meteor leaves a brief ionized trail in the E region that scatters VHF signals. */
export function Meteor() {
  const { t, ref } = useTime(0.5)
  const f = (t % 1.4) / 1.4
  const A: [number, number] = [110, 196], M: [number, number] = [320, 78], B: [number, number] = [530, 196]
  const flash = t === 0 || (f > 0.35 && f < 0.85)
  return (
    <Diagram w={640} h={330} svgRef={ref}
      title="A meteor burns up in the E region and leaves a brief, narrow ionized trail. VHF signals scatter off the trail between two distant stations. Meteor scatter works best from 28 to 148 megahertz"
      caption="Schematic. The trail fades in moments, so contacts come in short bursts.">
      <rect x={20} y={44} width={600} height={54} rx={10} fill={C.fill2} opacity={0.7} stroke={C.muted} strokeDasharray="5 5" />
      <T x={608} y={58} anchor="end" size={13} bold color={C.muted}>E region</T>
      <Ln x1={235} y1={32} x2={305} y2={72} color={C.resist} width={5} opacity={0.5} />
      <Ln x1={300} y1={69} x2={335} y2={89} color={C.resist} width={6} opacity={flash ? 1 : 0.35} />
      <circle cx={338} cy={91} r={5} fill={C.resist} />
      <T x={236} y={20} size={13} bold color={C.resist}>meteor</T>
      <T x={352} y={62} size={13} bold color={C.resist}>ionized trail</T>
      <rect x={20} y={216} width={600} height={26} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={110} y1={216} x2={110} y2={198} color={C.ink} width={3} />
      <Ln x1={530} y1={216} x2={530} y2={198} color={C.ink} width={3} />
      <T x={110} y={230} anchor="middle" size={13} bold>You</T>
      <T x={530} y={230} anchor="middle" size={13} bold>Distant station</T>
      <polyline points={`${A} ${M} ${B}`} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" opacity={flash ? 1 : 0.3} />
      <Ln x1={X(F0)} y1={290} x2={X(F1)} y2={290} color={C.muted} width={2} />
      <rect x={X(28)} y={283} width={X(148) - X(28)} height={14} rx={4} fill={C.good} fillOpacity={0.22} stroke={C.good} strokeWidth={2} />
      <T x={(X(28) + X(148)) / 2} y={268} anchor="middle" size={14} bold color={C.good}>best: 28 – 148 MHz</T>
      {[[1.8, '1.8'], [14, '14'], [220, '220']].map(([f, n]) => (
        <T key={String(n)} x={X(f as number)} y={316} anchor="middle" size={12} color={C.muted}>{`${n}`}</T>
      ))}
      <T x={X(450)} y={316} anchor="end" size={12} color={C.muted}>450 MHz</T>
    </Diagram>
  )
}
