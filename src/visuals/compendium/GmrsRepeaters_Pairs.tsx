import { C, Diagram, Ln, T } from '../kit'

const CH = [15, 16, 17, 18, 19, 20, 21, 22]
const OUT = ['.550', '.575', '.600', '.625', '.650', '.675', '.700', '.725']
const IN = ['.550', '.575', '.600', '.625', '.650', '.675', '.700', '.725']
const xs = CH.map((_, i) => 70 + i * 70)

/** The eight GMRS repeater pairs: you transmit on the 467 MHz input and listen on the 462 MHz output, 5 MHz lower. */
export function GmrsRepeaters_Pairs() {
  return (
    <Diagram w={640} h={292}
      title="The eight GMRS repeater pairs, channels 15 to 22. The top row is the repeater input, 467.550 to 467.725 megahertz, where your radio transmits. The bottom row is the repeater output, 462.550 to 462.725 megahertz, where your radio listens. Each pair is 5 megahertz apart."
      caption="Digits after the decimal point, in MHz. Consumer radios commonly label these pairs 15R to 22R; that label is a convention, not part of the rule.">
      <T x={20} y={14} size={13} bold color={C.resist}>Input, 467.xxx MHz: your radio transmits</T>
      {xs.map((x, i) => (
        <g key={`in${i}`}>
          <T x={x} y={44} size={12} mono color={C.muted} anchor="middle">{IN[i]}</T>
          <circle cx={x} cy={74} r={16} fill={C.resist} fillOpacity={0.3} stroke={C.resist} strokeWidth={2} />
          <T x={x} y={74} size={13} bold anchor="middle">{CH[i]}</T>
        </g>
      ))}
      {xs.map((x, i) => <Ln key={`ln${i}`} x1={x} y1={94} x2={x} y2={174} color={C.muted} width={1.5} dash="4 5" arrow />)}
      <rect x={210} y={122} width={220} height={26} rx={13} fill={C.bg} stroke={C.muted} strokeWidth={1.5} />
      <T x={320} y={135} size={12.5} bold anchor="middle">repeater retransmits 5 MHz lower</T>
      {xs.map((x, i) => (
        <g key={`out${i}`}>
          <circle cx={x} cy={194} r={16} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
          <T x={x} y={194} size={13} bold anchor="middle">{CH[i]}</T>
          <T x={x} y={226} size={12} mono color={C.muted} anchor="middle">{OUT[i]}</T>
        </g>
      ))}
      <T x={20} y={262} size={13} bold color={C.signal}>Output, 462.xxx MHz: your radio listens</T>
    </Diagram>
  )
}
