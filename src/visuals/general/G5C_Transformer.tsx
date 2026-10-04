import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, Transformer, fmt } from '../kit'

type Side = 'p' | 's'

/** Output voltage = input voltage × (turns on output side ÷ turns on input side). Works from either winding. */
export function G5C_Transformer() {
  const [np, setNp] = useState(500)
  const [ns, setNs] = useState(1500)
  const [side, setSide] = useState<Side>('p')
  const vin = 120
  const nIn = side === 'p' ? np : ns
  const nOut = side === 'p' ? ns : np
  const vout = (vin * nOut) / nIn
  const kind = nOut > nIn ? 'steps up' : nOut < nIn ? 'steps down' : 'passes'
  const box = (x: number, name: string, turns: number, isIn: boolean, v: number) => (
    <g>
      <rect x={x} y={34} width={170} height={126} rx={14} fill={C.fill} stroke={isIn ? C.muted : C.voltage} strokeWidth={isIn ? 2 : 3} />
      <T x={x + 85} y={56} anchor="middle" bold size={15}>{name}</T>
      <T x={x + 85} y={78} anchor="middle" size={13} color={C.muted}>{turns} turns</T>
      <T x={x + 85} y={110} anchor="middle" bold size={28} color={C.voltage}>{fmt(v)} V</T>
      <T x={x + 85} y={142} anchor="middle" size={13} color={isIn ? C.muted : C.voltage} bold>{isIn ? 'applied (input)' : 'appears (output)'}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={226}
        title={`A transformer with ${np} primary turns and ${ns} secondary turns. ${vin} volts applied to the ${side === 'p' ? 'primary' : 'secondary'} gives ${fmt(vout)} volts on the ${side === 'p' ? 'secondary' : 'primary'}, so it ${kind} the voltage.`}
        caption="Voltage follows turns: more turns on the output side, more output volts.">
        {box(14, 'Primary', np, side === 'p', side === 'p' ? vin : vout)}
        {box(456, 'Secondary', ns, side === 's', side === 's' ? vin : vout)}
        <g transform="translate(320,98) scale(1.8)"><Transformer x={0} y={0} /></g>
        <Ln x1={184} y1={98} x2={284} y2={98} color={C.muted} width={2.5} />
        <Ln x1={356} y1={98} x2={456} y2={98} color={C.muted} width={2.5} />
        <T x={320} y={176} anchor="middle" size={14} mono>
          {fmt(vin)} V × {nOut} ÷ {nIn} = {fmt(vout)} V
        </T>
        <T x={320} y={204} anchor="middle" size={13} color={C.muted}>Vout = Vin × (turns out ÷ turns in)</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>120 V AC applied to the</span>
          <Choice label="Applied side" value={side} onChange={setSide} options={[{ value: 'p', label: 'Primary' }, { value: 's', label: 'Secondary' }]} />
        </div>
        <Slider label="Primary turns" value={np} min={100} max={2000} step={100} onChange={setNp} format={(v) => `${v}`} color="var(--d-signal)" />
        <Slider label="Secondary turns" value={ns} min={100} max={2000} step={100} onChange={setNs} format={(v) => `${v}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
