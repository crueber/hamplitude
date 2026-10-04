import { C, Diagram, Ln, T } from '../kit'
import { OpAmpSymbol } from '../shared/OpAmpSymbol'

/** What an op-amp is: differential inputs, very high input Z, very low output Z, huge gain. */
export function OpAmpTraits() {
  return (
    <Diagram w={640} h={290} title="An operational amplifier: two inputs with very high impedance, a very low impedance output, very high gain, output equals gain times the difference between the inputs"
      caption="Inputs barely load the source. The output can drive a load.">
      <OpAmpSymbol x={250} y={120} w={150} h={140} />
      <Ln x1={190} y1={85} x2={250} y2={85} width={2.5} />
      <Ln x1={190} y1={155} x2={250} y2={155} width={2.5} />
      <Ln x1={400} y1={120} x2={460} y2={120} width={2.5} />
      <T x={182} y={85} anchor="end" size={13} bold>− input</T>
      <T x={182} y={155} anchor="end" size={13} bold>+ input</T>
      <T x={468} y={120} size={13} bold>output</T>
      <rect x={14} y={28} width={150} height={52} rx={10} fill={C.fill} stroke={C.voltage} strokeWidth={2} />
      <T x={89} y={46} anchor="middle" size={13} bold>input impedance</T>
      <T x={89} y={66} anchor="middle" size={14} bold color={C.voltage}>very high</T>
      <rect x={470} y={28} width={156} height={52} rx={10} fill={C.fill} stroke={C.current} strokeWidth={2} />
      <T x={548} y={46} anchor="middle" size={13} bold>output impedance</T>
      <T x={548} y={66} anchor="middle" size={14} bold color={C.current}>very low</T>
      <T x={325} y={203} anchor="middle" size={13} bold color={C.power}>very high gain</T>
      <rect x={110} y={222} width={420} height={56} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={320} y={240} anchor="middle" size={14} bold mono>Vout = gain × (V+ − V−)</T>
      <T x={320} y={262} anchor="middle" size={13} color={C.muted}>direct-coupled (works down to DC), differential</T>
    </Diagram>
  )
}
