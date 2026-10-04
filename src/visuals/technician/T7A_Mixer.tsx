import { Antenna, C, Diagram, Ln, T } from '../kit'

/** A mixer combines two frequencies and outputs their sum and difference. */
export function Mixer() {
  return (
    <Diagram w={640} h={250} title="A mixer combines an incoming 144 MHz signal with a 116 MHz oscillator and outputs the difference, 28 MHz, and the sum, 260 MHz"
      caption="A mixer shifts a signal to a new frequency. An oscillator supplies the shifting frequency.">
      <rect x={14} y={30} width={170} height={56} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={99} y={50} anchor="middle" bold size={14}>Signal in</T>
      <T x={99} y={70} anchor="middle" size={13} color={C.signal} bold mono>144 MHz</T>
      <rect x={14} y={150} width={170} height={56} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={99} y={170} anchor="middle" bold size={14}>Oscillator</T>
      <T x={99} y={190} anchor="middle" size={13} color={C.resist} bold mono>116 MHz</T>
      <circle cx={300} cy={118} r={38} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <path d="M284,102 L316,134 M316,102 L284,134" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
      <T x={300} y={170} anchor="middle" bold size={13}>Mixer</T>
      <Ln x1={184} y1={58} x2={272} y2={104} color={C.signal} width={2.5} arrow />
      <Ln x1={184} y1={178} x2={272} y2={132} color={C.resist} width={2.5} arrow />
      <Ln x1={340} y1={104} x2={440} y2={62} color={C.power} width={2.5} arrow />
      <Ln x1={340} y1={132} x2={440} y2={176} color={C.muted} width={2.5} arrow dash="6 4" />
      <rect x={444} y={30} width={182} height={64} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={535} y={50} anchor="middle" bold size={14}>Difference</T>
      <T x={535} y={74} anchor="middle" size={13} color={C.power} bold mono>144 − 116 = 28 MHz</T>
      <rect x={444} y={144} width={182} height={64} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
      <T x={535} y={164} anchor="middle" bold size={14} color={C.muted}>Sum</T>
      <T x={535} y={188} anchor="middle" size={13} color={C.muted} mono>144 + 116 = 260 MHz</T>
      <T x={535} y={232} anchor="middle" size={13} color={C.muted}>a filter keeps the one you want</T>
    </Diagram>
  )
}

/** A transverter wraps a radio so it can work on another band. */
export function Transverter() {
  return (
    <Diagram w={640} h={170} title="A transverter sits between a radio and the antenna and converts the radio's input and output, for example 28 MHz, to another band, for example 144 MHz"
      caption="Same radio, new band: the transverter converts both what goes out and what comes in.">
      <rect x={14} y={40} width={150} height={74} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={89} y={64} anchor="middle" bold size={14}>Your radio</T>
      <T x={89} y={90} anchor="middle" size={13} color={C.signal} bold mono>28 MHz</T>
      <rect x={250} y={30} width={160} height={94} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={330} y={62} anchor="middle" bold size={15} color={C.power}>Transverter</T>
      <T x={330} y={88} anchor="middle" size={13} color={C.muted}>converts both ways</T>
      <rect x={480} y={40} width={100} height={74} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Antenna x={530} y={100} />
      <T x={530} y={146} anchor="middle" size={13} color={C.signal} bold mono>144 MHz</T>
      <Ln x1={166} y1={77} x2={248} y2={77} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={412} y1={77} x2={478} y2={77} color={C.signal} width={2.5} arrow="both" />
      <T x={89} y={146} anchor="middle" size={12} color={C.muted}>transmits and receives on 28</T>
      <T x={330} y={146} anchor="middle" size={12} color={C.muted}>radio in and out ↔ other band</T>
    </Diagram>
  )
}
