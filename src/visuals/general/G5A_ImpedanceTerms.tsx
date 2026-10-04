import { C, Diagram, Ln, Source, T, Wire } from '../kit'

/** Impedance Z = E ÷ I, in ohms. Admittance is its inverse. */
export function G5A_ImpedanceTerms() {
  return (
    <Diagram w={640} h={250} title="An AC source drives a circuit. Impedance is the voltage across it divided by the current through it, measured in ohms. Admittance is the inverse of impedance."
      caption="Same idea as Ohm's law, but for AC: Z = E ÷ I.">
      <Wire pts={[[40, 60], [40, 90]]} color={C.muted} />
      <Wire pts={[[40, 60], [250, 60], [250, 90]]} color={C.muted} width={2.5} />
      <Wire pts={[[40, 190], [250, 190], [250, 160]]} color={C.muted} width={2.5} />
      <Wire pts={[[40, 160], [40, 190]]} color={C.muted} width={2.5} />
      <rect x={30} y={88} width={20} height={72} fill={C.bg} />
      <Source x={40} y={125} rot={90} len={72} ac color={C.voltage} />
      <rect x={196} y={90} width={108} height={70} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={250} y={125} anchor="middle" bold size={26} color={C.power}>Z</T>
      <T x={145} y={36} anchor="middle" bold size={14} color={C.current}>I, amperes</T>
      <Ln x1={95} y1={60} x2={195} y2={60} color={C.current} width={3} arrow />
      <T x={145} y={218} anchor="middle" bold size={14} color={C.voltage}>E, volts</T>
      <rect x={350} y={20} width={270} height={92} rx={12} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={485} y={42} anchor="middle" bold size={15}>Impedance</T>
      <T x={485} y={74} anchor="middle" bold size={24} color={C.power} mono>Z = E ÷ I</T>
      <T x={485} y={98} anchor="middle" size={13} color={C.muted}>unit: ohm (Ω)</T>
      <Ln x1={485} y1={116} x2={485} y2={138} color={C.muted} width={2.5} arrow />
      <T x={500} y={128} size={12} color={C.muted}>invert</T>
      <rect x={350} y={142} width={270} height={92} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={2.5} />
      <T x={485} y={164} anchor="middle" bold size={15}>Admittance</T>
      <T x={485} y={196} anchor="middle" bold size={24} color={C.ink} mono>Y = 1 ÷ Z</T>
      <T x={485} y={220} anchor="middle" size={13} color={C.muted}>the inverse of impedance</T>
    </Diagram>
  )
}
