import { C, Diagram, Ground, Resistor, T, Wire } from '../kit'

/** A vector network analyzer is calibrated with three known loads: short, open, 50 ohms. */
export function VnaCal() {
  const xs = [110, 320, 530]
  return (
    <Diagram w={640} h={190} title="Calibrating a vector network analyzer uses three known test loads: a short circuit, an open circuit and a 50 ohm load."
      caption="Three known references let the analyzer remove its own cables and connectors from the measurement.">
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 90} y={14} width={180} height={116} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
          <Wire pts={[[x - 74, 72], [x - 30, 72]]} color={C.ink} />
          <circle cx={x - 74} cy={72} r={4.5} fill={C.ink} />
          {i === 0 && <><Wire pts={[[x - 30, 72], [x - 30, 100]]} color={C.bad} width={3} /><Ground x={x - 30} y={100} color={C.bad} /></>}
          {i === 1 && <T x={x + 8} y={72} anchor="start" size={13} color={C.muted}>nothing</T>}
          {i === 2 && <><Resistor x={x + 5} y={72} len={70} color={C.resist} /><Wire pts={[[x + 40, 72], [x + 40, 100]]} /><Ground x={x + 40} y={100} /></>}
          <T x={x} y={152} anchor="middle" bold size={15} color={i === 0 ? C.bad : i === 1 ? C.muted : C.resist}>{['Short', 'Open', '50 Ω load'][i]}</T>
          <T x={x} y={174} anchor="middle" size={12} color={C.muted}>{['zero ohms', 'infinite ohms', 'matched'][i]}</T>
        </g>
      ))}
    </Diagram>
  )
}
