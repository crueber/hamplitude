import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Wire, Battery, Resistor, Dot } from '../kit'

const E = 12

/** A real battery is an ideal source in series with an internal resistance. Load current makes the terminal voltage sag. */
export function BatteryResistance() {
  const [amps, setAmps] = useState(30)
  const cols = [
    { ox: 0, name: 'Low internal resistance', r: 0.01, good: true },
    { ox: 320, name: 'High internal resistance', r: 0.1, good: false },
  ]
  return (
    <>
      <Diagram w={640} h={290} title="Two 12 volt batteries, each drawn as an ideal source in series with its internal resistance. At the same load current the low-resistance battery keeps its terminal voltage near 12 volts, the high-resistance one sags much lower."
        caption="Terminal voltage = 12 V minus (current × internal resistance). Low resistance means little sag.">
        {cols.map(({ ox, name, r, good }) => {
          const v = Math.max(0, E - amps * r)
          const barH = (v / E) * 170
          const col = good ? C.good : C.bad
          return (
            <g key={ox}>
              <T x={ox + 160} y={20} anchor="middle" bold size={15}>{name}</T>
              <rect x={ox + 24} y={44} width={110} height={196} rx={10} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" />
              <T x={ox + 79} y={256} anchor="middle" size={12} color={C.muted}>inside the battery</T>
              <Wire pts={[[ox + 79, 86], [ox + 79, 62], [ox + 134, 62]]} color={C.muted} width={2.5} />
              <Wire pts={[[ox + 79, 114], [ox + 79, 140]]} color={C.muted} width={2.5} />
              <Wire pts={[[ox + 79, 192], [ox + 79, 222], [ox + 134, 222]]} color={C.muted} width={2.5} />
              <Battery x={ox + 79} y={100} rot={90} len={28} color={C.voltage} />
              <Resistor x={ox + 79} y={166} rot={90} len={52} color={C.resist} />
              <T x={ox + 44} y={100} anchor="middle" size={13} bold color={C.voltage}>12 V</T>
              <T x={ox + 44} y={166} anchor="middle" size={13} bold color={C.resist}>{r} Ω</T>
              <Dot x={ox + 134} y={62} /><Dot x={ox + 134} y={222} />
              <T x={ox + 144} y={62} size={13} bold color={C.voltage}>+</T>
              <T x={ox + 144} y={222} size={13} bold>−</T>
              <rect x={ox + 206} y={50} width={44} height={170} rx={6} fill={C.fill} />
              <rect x={ox + 206} y={220 - barH} width={44} height={barH} rx={6} fill={col} opacity={0.85} />
              <T x={ox + 228} y={36} anchor="middle" size={12} color={C.muted}>terminal volts</T>
              <T x={ox + 262} y={220 - barH / 2} bold size={15} color={col}>{v.toFixed(1)} V</T>
              <T x={ox + 228} y={240} anchor="middle" size={12} color={C.muted}>lost inside: {(amps * amps * r).toFixed(0)} W heat</T>
            </g>
          )
        })}
        <line x1={320} y1={40} x2={320} y2={250} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
      </Diagram>
      <Controls>
        <Slider label="Load current" value={amps} min={0} max={60} onChange={setAmps} format={(v) => `${v} A`} color={C.current} />
        <Readout label="Same load, same current" value={amps} unit="A" color={C.current} />
      </Controls>
    </>
  )
}
