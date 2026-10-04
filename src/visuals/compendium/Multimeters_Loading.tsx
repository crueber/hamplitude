import { useState } from 'react'
import { C, Choice, Controls, Diagram, Resistor, Source, T, Wire } from '../kit'

const VTRUE = 5
const RS = [10e3, 100e3, 1e6, 10e6]
const METERS = [
  { id: 'dmm', label: 'Digital, 10 MΩ', r: 10e6 },
  { id: 'scope', label: 'Scope input, 1 MΩ', r: 1e6 },
  { id: 'vom', label: 'Analog, 200 kΩ', r: 200e3 },
] as const
const fmtR = (r: number) => (r >= 1e6 ? `${r / 1e6} MΩ` : `${r / 1e3} kΩ`)

/** A voltmeter is a resistor too: it forms a divider with the source's own resistance and reads low when the source is high-impedance. */
export function Multimeters_Loading() {
  const [rs, setRs] = useState(1e6)
  const [m, setM] = useState<(typeof METERS)[number]['id']>('dmm')
  const meter = METERS.find((x) => x.id === m)!
  const reading = (VTRUE * meter.r) / (rs + meter.r)
  const err = ((VTRUE - reading) / VTRUE) * 100
  const col = err < 2 ? C.good : err < 10 ? C.resist : C.bad
  return (
    <>
      <Diagram w={640} h={250}
        title={`A ${VTRUE} volt source with ${fmtR(rs)} of internal resistance, measured by a meter with ${fmtR(meter.r)} input resistance. The meter reads ${reading.toFixed(2)} volts, ${err.toFixed(1)} percent low.`}
        caption="Source resistance and meter resistance divide the voltage between them. The meter reads only its share.">
        <Wire pts={[[90, 115], [90, 70], [165, 70]]} />
        <Resistor x={200} y={70} len={70} />
        <T x={200} y={36} anchor="middle" size={13} bold color={C.resist}>source resistance</T>
        <T x={200} y={104} anchor="middle" size={13} mono color={C.muted}>{fmtR(rs)}</T>
        <Wire pts={[[235, 70], [350, 70], [350, 123]]} />
        <Wire pts={[[90, 165], [90, 205], [350, 205], [350, 157]]} />
        <Source x={90} y={140} rot={90} len={50} />
        <T x={60} y={140} anchor="end" size={13} bold color={C.voltage}>{VTRUE.toFixed(2)} V</T>
        <T x={60} y={158} anchor="end" size={12} color={C.muted}>true</T>
        <circle cx={350} cy={140} r={17} fill={C.bg} stroke={C.voltage} strokeWidth={2.2} />
        <T x={350} y={141} anchor="middle" bold size={17} color={C.voltage}>V</T>
        <T x={376} y={128} size={12.5} color={C.muted}>meter input</T>
        <T x={376} y={146} size={12.5} color={C.muted}>resistance</T>
        <T x={376} y={166} size={13} mono bold color={C.ink}>{fmtR(meter.r)}</T>
        <rect x={470} y={60} width={150} height={120} rx={12} fill={C.fill} stroke={col} strokeWidth={2.5} />
        <T x={545} y={82} anchor="middle" size={12.5} color={C.muted}>meter reads</T>
        <T x={545} y={116} anchor="middle" size={30} bold mono color={col}>{reading.toFixed(2)}</T>
        <T x={545} y={148} anchor="middle" size={13} bold color={col}>{err < 0.05 ? 'no error' : `${err.toFixed(1)}% low`}</T>
        <T x={320} y={236} anchor="middle" size={13} color={C.muted}>reading = true voltage × meter ÷ (source + meter)</T>
      </Diagram>
      <Controls>
        <Choice label="Source resistance" value={rs} onChange={setRs} options={RS.map((r) => ({ value: r, label: fmtR(r) }))} />
        <Choice label="Meter input resistance" value={m} onChange={setM} options={METERS.map((x) => ({ value: x.id, label: x.label }))} />
      </Controls>
    </>
  )
}
