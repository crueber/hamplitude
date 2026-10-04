import { useState } from 'react'
import { C, Controls, Diagram, Dot, Readout, Resistor, Slider, Source, T, Wire, fmt, si } from '../kit'

const E = 10, RS = 100_000

/** A voltmeter in parallel with a circuit forms a divider: a low meter resistance pulls the reading down. */
export function Loading() {
  const [p, setP] = useState(7) // log10 of meter input resistance
  const rin = 10 ** p
  const reading = (E * rin) / (RS + rin)
  const err = ((E - reading) / E) * 100
  const good = err < 2
  const col = good ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={250} title={`A 10 volt source with 100 kilohm of source resistance, measured by a voltmeter with ${si(rin, 'Ω')} input resistance. The meter reads ${fmt(reading, 3)} volts, ${fmt(err, 2)} percent too low.`}
        caption="The meter's own resistance sits in parallel with the circuit. The higher it is, the less it disturbs what it measures.">
        <Wire pts={[[100, 100], [100, 60], [170, 60]]} color={C.voltage} />
        <Wire pts={[[230, 60], [340, 60]]} color={C.voltage} />
        <Wire pts={[[100, 180], [100, 220], [340, 220]]} color={C.ink} />
        <Source x={100} y={140} rot={90} len={80} />
        <Resistor x={200} y={60} len={60} />
        <T x={200} y={30} anchor="middle" size={13} bold>Circuit's own: 100 kΩ</T>
        <Wire pts={[[340, 60], [340, 100]]} color={C.voltage} />
        <Wire pts={[[340, 180], [340, 220]]} color={C.ink} />
        <circle cx={340} cy={140} r={36} fill={C.fill} stroke={C.current} strokeWidth={2.5} />
        <T x={340} y={128} anchor="middle" bold size={18} color={C.current}>V</T>
        <T x={340} y={152} anchor="middle" size={12} mono color={C.muted}>{si(rin, 'Ω', 2)}</T>
        <Dot x={340} y={60} color={C.voltage} />
        <T x={80} y={140} anchor="end" size={13} bold color={C.voltage}>10 V</T>
        <rect x={430} y={80} width={190} height={110} rx={14} fill={C.fill} />
        <T x={525} y={102} anchor="middle" size={13} color={C.muted}>meter reads</T>
        <T x={525} y={136} anchor="middle" bold size={30} color={col}>{fmt(reading, 3)} V</T>
        <T x={525} y={170} anchor="middle" size={13} color={col} bold>{fmt(err, 2)}% too low</T>
      </Diagram>
      <Controls>
        <Slider label="Meter input resistance" value={p} min={4} max={7.3} step={0.05} onChange={setP} format={() => si(rin, 'Ω', 2)} color="var(--d-current)" />
        <Readout label="Loading" value={good ? 'Barely disturbs' : 'Pulls it down'} color={good ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
