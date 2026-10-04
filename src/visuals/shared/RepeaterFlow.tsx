import { C, Diagram, Ln, T, useTime } from '../kit'

/** A repeater hears on one frequency and retransmits on another, so two stations far apart can talk. */
export function RepeaterFlow() {
  const { t, ref } = useTime(0.7)
  const pulse = (x1: number, y1: number, x2: number, y2: number, color: string, off: number) => {
    const p = (t * 0.5 + off) % 1
    return <circle cx={x1 + (x2 - x1) * p} cy={y1 + (y2 - y1) * p} r={6} fill={color} opacity={Math.sin(p * Math.PI)} />
  }
  return (
    <Diagram w={640} h={310} title="A repeater receives on its input frequency and retransmits on its output frequency" caption="Two stations too far apart for a direct contact can both reach the repeater on its hill." svgRef={ref}>
      <polygon points="200,250 320,110 440,250" fill={C.fill} />
      <g stroke={C.ink} strokeWidth={3} strokeLinecap="round" fill="none">
        <line x1={320} y1={110} x2={320} y2={50} /><polyline points="304,34 320,50 336,34" />
      </g>
      <T x={320} y={20} anchor="middle" bold size={15} color={C.signal}>Repeater</T>
      <g>
        <circle cx={70} cy={215} r={26} fill={C.fill} stroke={C.ink} strokeWidth={2} /><T x={70} y={215} anchor="middle" bold>A</T>
        <circle cx={570} cy={215} r={26} fill={C.fill} stroke={C.ink} strokeWidth={2} /><T x={570} y={215} anchor="middle" bold>B</T>
      </g>
      <Ln x1={98} y1={200} x2={296} y2={74} color={C.resist} width={2.5} arrow />
      <Ln x1={344} y1={74} x2={542} y2={200} color={C.signal} width={2.5} arrow />
      {pulse(98, 200, 296, 74, C.resist, 0)}
      {pulse(344, 74, 542, 200, C.signal, 0.5)}
      <T x={14} y={270} bold size={13} color={C.resist}>A transmits on the</T>
      <T x={14} y={288} bold size={13} color={C.resist}>INPUT frequency</T>
      <T x={626} y={270} bold size={13} color={C.signal} anchor="end">repeater retransmits on the</T>
      <T x={626} y={288} bold size={13} color={C.signal} anchor="end">OUTPUT frequency</T>
    </Diagram>
  )
}
