import { useState } from 'react'
import { C, Choice, Diagram, Dot, Ground, Resistor, T, Wire, fmt, si } from '../kit'

const R = 100_000 // two 100 kΩ resistors form a 10 V divider
/** Ohms per volt: full-scale reading x sensitivity = meter input impedance, which loads the circuit. */
export function OhmsPerVolt() {
  const [range, setRange] = useState(10)
  const [spv, setSpv] = useState(20_000)
  const rin = range * spv
  const rp = (R * rin) / (R + rin)
  const vread = 10 * (rp / (R + rp))
  const err = ((5 - vread) / 5) * 100
  return (
    <>
      <Diagram w={640} h={236} title={`A voltmeter rated ${spv / 1000} kilohms per volt on its ${range} volt range has an input impedance of ${si(rin, 'Ω')}. Across a 5 volt divider point it reads ${fmt(vread)} volts.`}
        caption="Input impedance = full-scale reading × ohms-per-volt rating. A low value loads the circuit and the reading sags.">
        <T x={100} y={22} anchor="middle" size={13} bold color={C.voltage}>+10 V</T>
        <Wire pts={[[100, 34], [100, 45]]} />
        <Resistor x={100} y={75} rot={90} label="" color={C.resist} />
        <T x={64} y={75} anchor="end" size={12} mono color={C.muted}>100 kΩ</T>
        <Wire pts={[[100, 105], [100, 135]]} />
        <Dot x={100} y={120} />
        <Resistor x={100} y={165} rot={90} color={C.resist} />
        <T x={64} y={165} anchor="end" size={12} mono color={C.muted}>100 kΩ</T>
        <Wire pts={[[100, 120], [200, 120], [200, 149]]} />
        <circle cx={200} cy={165} r={16} fill="none" stroke={C.voltage} strokeWidth={2.2} />
        <T x={200} y={165} anchor="middle" bold size={16} color={C.voltage}>V</T>
        <Wire pts={[[200, 181], [200, 195], [100, 195]]} />
        <Ground x={150} y={195} />
        <T x={228} y={165} size={12} mono color={C.muted}>Rin</T>
        <T x={100} y={226} size={12} color={C.muted} anchor="middle">true node voltage: 5.00 V</T>
        <rect x={280} y={20} width={344} height={196} rx={12} fill={C.fill} />
        <T x={300} y={44} size={13} color={C.muted}>full scale</T>
        <T x={604} y={44} anchor="end" bold size={16} mono>{range} V</T>
        <T x={300} y={72} size={13} color={C.muted}>× sensitivity</T>
        <T x={604} y={72} anchor="end" bold size={16} mono>{spv / 1000} kΩ/V</T>
        <line x1={300} x2={604} y1={92} y2={92} stroke={C.muted} strokeWidth={1.5} />
        <T x={300} y={116} size={13} color={C.muted}>= input impedance</T>
        <T x={604} y={116} anchor="end" bold size={20} mono color={C.power}>{si(rin, 'Ω', 3)}</T>
        <T x={300} y={158} size={13} color={C.muted}>meter reads (true 5.00 V)</T>
        <T x={604} y={158} anchor="end" bold size={20} mono color={err < 2 ? C.good : C.bad}>{vread.toFixed(2)} V</T>
        <T x={604} y={186} anchor="end" size={13} color={err < 2 ? C.good : C.bad}>{err < 0.05 ? 'barely loads the circuit' : `${fmt(err, 2)}% too low`}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px', display: 'grid', gap: 10 }}>
        <Choice label="Range" value={range} onChange={setRange} options={[10, 50, 100].map((v) => ({ value: v, label: `${v} V range` }))} />
        <Choice label="Sensitivity" value={spv} onChange={setSpv} options={[{ value: 1000, label: '1 kΩ/V' }, { value: 20000, label: '20 kΩ/V' }, { value: 100000, label: '100 kΩ/V' }]} />
      </div>
    </>
  )
}
