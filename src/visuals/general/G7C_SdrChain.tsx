import { Antenna, C, Diagram, Ln, T, Wire } from '../kit'

/** Software-defined radio receive path: I and Q mixers 90 degrees apart, ADC, then software does the radio. */
export function SdrChain() {
  const mixer = (y: number) => (
    <g>
      <circle cx={190} cy={y} r={22} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <path d={`M${190 - 10},${y - 10} L${190 + 10},${y + 10} M${190 + 10},${y - 10} L${190 - 10},${y + 10}`} stroke={C.ink} strokeWidth={3.2} strokeLinecap="round" />
    </g>
  )
  return (
    <Diagram w={640} h={290} title="Software-defined radio receive path. The antenna signal feeds two mixers driven by an oscillator, one at 0 degrees and one at 90 degrees. These give the I and Q signals. An analog to digital converter feeds software, which does filtering, detection and modulation. A digital to analog converter makes the audio."
      caption="Almost all of the radio after the ADC is software: filtering, detection and modulation.">
      <Antenna x={40} y={158} />
      <Wire pts={[[40, 158], [40, 145], [110, 145]]} color={C.ink} width={2.2} />
      <Wire pts={[[110, 70], [110, 220]]} color={C.ink} width={2.2} />
      <Wire pts={[[110, 70], [168, 70]]} color={C.ink} width={2.2} />
      <Wire pts={[[110, 220], [168, 220]]} color={C.ink} width={2.2} />
      <circle cx={110} cy={145} r={3.5} fill={C.ink} />
      {mixer(70)}{mixer(220)}
      <rect x={150} y={122} width={80} height={46} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={190} y={138} anchor="middle" bold size={12}>Oscillator</T>
      <T x={190} y={156} anchor="middle" size={11} color={C.muted}>two phases</T>
      <Ln x1={190} y1={122} x2={190} y2={94} color={C.resist} width={2.5} arrow />
      <Ln x1={190} y1={168} x2={190} y2={196} color={C.resist} width={2.5} arrow />
      <T x={228} y={106} size={12} bold color={C.resist}>0°</T>
      <T x={228} y={184} size={12} bold color={C.resist}>90°</T>
      <Ln x1={214} y1={70} x2={284} y2={70} color={C.current} width={2.5} arrow />
      <Ln x1={214} y1={220} x2={284} y2={220} color={C.voltage} width={2.5} arrow />
      <T x={248} y={54} anchor="middle" size={13} bold color={C.current}>I</T>
      <T x={248} y={238} anchor="middle" size={13} bold color={C.voltage}>Q</T>
      <rect x={288} y={44} width={68} height={202} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={322} y={128} anchor="middle" bold size={14}>ADC</T>
      <T x={322} y={150} anchor="middle" size={11.5} color={C.muted}>analog to</T>
      <T x={322} y={166} anchor="middle" size={11.5} color={C.muted}>digital</T>
      <Ln x1={358} y1={145} x2={392} y2={145} color={C.ink} width={2.5} arrow />
      <rect x={396} y={44} width={140} height={202} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={466} y={68} anchor="middle" bold size={14} color={C.power}>Software (DSP)</T>
      {['Filtering', 'Detection', 'Modulation'].map((s, i) => (
        <g key={s}>
          <rect x={412} y={94 + i * 46} width={108} height={34} rx={7} fill={C.fill2} />
          <T x={466} y={111 + i * 46} anchor="middle" bold size={13}>{s}</T>
        </g>
      ))}
      <Ln x1={538} y1={145} x2={556} y2={145} color={C.ink} width={2.5} arrow />
      <rect x={558} y={110} width={72} height={70} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={594} y={134} anchor="middle" bold size={14}>DAC</T>
      <T x={594} y={156} anchor="middle" size={11.5} color={C.muted}>to audio</T>
    </Diagram>
  )
}
