import { C, Diagram, Ln, T, sinePath } from '../kit'

/** Three tools: reporting networks (what was heard), VOACAP (HF prediction), 304 Å (solar UV proxy). */
export function Tools() {
  const w = 196, gap = 16
  const px = (i: number) => 14 + i * (w + gap)
  const dots: [number, number][] = [[28, 106], [60, 128], [96, 96], [130, 122], [160, 100], [78, 144]]
  return (
    <Diagram w={640} h={290} title="Three propagation tools. Reporting networks collect digital-mode and CW signals that were actually heard. VOACAP models HF propagation. The 304 angstrom parameter measures solar UV emission and tracks the solar flux index"
      caption="What was heard, what is predicted, and a solar indicator.">
      {[0, 1, 2].map((i) => <rect key={i} x={px(i)} y={14} width={w} height={262} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />)}
      <g transform={`translate(${px(0)},0)`}>
        <T x={w / 2} y={38} anchor="middle" size={15} bold color={C.good}>Reporting networks</T>
        <rect x={14} y={72} width={168} height={92} rx={6} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
        {dots.slice(1).map((d, i) => <Ln key={i} x1={dots[0][0] + 14} y1={dots[0][1]} x2={d[0] + 14} y2={d[1]} color={C.good} width={1.5} opacity={0.6} />)}
        {dots.map((d, i) => <circle key={i} cx={d[0] + 14} cy={d[1]} r={5} fill={i === 0 ? C.ink : C.good} />)}
        <T x={w / 2} y={188} anchor="middle" size={14} bold>what was heard</T>
        <T x={w / 2} y={212} anchor="middle" size={13} color={C.muted}>digital-mode</T>
        <T x={w / 2} y={232} anchor="middle" size={13} color={C.muted}>and CW signals</T>
      </g>
      <g transform={`translate(${px(1)},0)`}>
        <T x={w / 2} y={38} anchor="middle" size={15} bold color={C.signal}>VOACAP</T>
        <Ln x1={24} y1={156} x2={176} y2={156} color={C.muted} width={2} />
        <Ln x1={24} y1={156} x2={24} y2={74} color={C.muted} width={2} />
        <path d={sinePath(24, 176, 114, 30, 0.8, -1.2, 60)} fill="none" stroke={C.signal} strokeWidth={4} />
        <T x={w / 2} y={188} anchor="middle" size={14} bold>models HF</T>
        <T x={w / 2} y={212} anchor="middle" size={13} color={C.muted}>propagation:</T>
        <T x={w / 2} y={232} anchor="middle" size={13} color={C.muted}>a prediction</T>
      </g>
      <g transform={`translate(${px(2)},0)`}>
        <T x={w / 2} y={38} anchor="middle" size={15} bold color={C.power}>304 Å</T>
        <circle cx={w / 2} cy={116} r={30} fill={C.resist} fillOpacity={0.35} stroke={C.resist} strokeWidth={3} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <Ln key={i} x1={w / 2 + 38 * Math.cos(a)} y1={116 + 38 * Math.sin(a)} x2={w / 2 + 50 * Math.cos(a)} y2={116 + 50 * Math.sin(a)} color={C.power} width={3} />
        })}
        <T x={w / 2} y={188} anchor="middle" size={14} bold>solar UV emission</T>
        <T x={w / 2} y={212} anchor="middle" size={13} color={C.muted}>tracks the solar</T>
        <T x={w / 2} y={232} anchor="middle" size={13} color={C.muted}>flux index</T>
      </g>
    </Diagram>
  )
}
