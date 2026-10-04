import { Battery, C, Diagram, Dot, Lines, Meter, Resistor, T, Wire } from '../kit'

/** Ammeter in series (in the path), voltmeter in parallel (across the part). */
export function MeterHookup() {
  const cur = C.current, vol = C.voltage
  return (
    <Diagram w={640} h={260} title="A circuit with a battery and a resistor. The ammeter is placed in the wire, in series, so all the current flows through it. The voltmeter is connected across the resistor, in parallel."
      caption="Ammeter: break the circuit and put it in the path. Voltmeter: touch it across the part.">
      <Wire pts={[[110, 105], [110, 70], [215, 70]]} color={cur} />
      <Wire pts={[[285, 70], [540, 70], [540, 90]]} color={cur} />
      <Wire pts={[[110, 175], [110, 220], [540, 220], [540, 190]]} color={cur} />
      <Battery x={110} y={140} rot={90} len={70} />
      <Resistor x={540} y={140} rot={90} len={100} />
      <Meter x={250} y={70} letter="A" len={70} color={cur} />
      <Wire pts={[[420, 70], [420, 129]]} color={vol} />
      <Wire pts={[[420, 161], [420, 220]]} color={vol} />
      <circle cx={420} cy={145} r={16} fill="none" stroke={vol} strokeWidth={2.2} />
      <T x={420} y={146} anchor="middle" bold size={16} color={vol}>V</T>
      <Dot x={420} y={70} color={vol} />
      <Dot x={420} y={220} color={vol} />
      <T x={250} y={32} anchor="middle" bold size={14} color={cur}>Ammeter: in series</T>
      <Lines x={398} y={126} lines={['Voltmeter:', 'in parallel']} anchor="end" bold size={14} color={vol} lh={20} />
      <T x={566} y={140} bold size={13}>Resistor</T>
      <T x={110} y={242} anchor="middle" size={13} color={C.muted}>Battery</T>
    </Diagram>
  )
}
