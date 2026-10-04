import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const F = 25.4 // toy input frequency, Hz (a real counter does the same with MHz)
const GATES = [0.2, 0.5, 1, 2]

/** A frequency counter counts input pulses during a precisely timed gate. Longer gate, finer resolution; the count can still be one off. */
export function CountersAndSignalGenerators_Gate() {
  const [gate, setGate] = useState(1)
  const [open, setOpen] = useState(0) // ms
  const x0 = 30, W = 580, TT = 3.2 // seconds shown
  const X = (t: number) => x0 + (W * t) / TT
  const tg = 0.2 + open / 1000
  const lo = Math.ceil(tg * F), hi = Math.ceil((tg + gate) * F)
  const count = hi - lo
  const pulses: number[] = []
  for (let k = 1; k / F < TT; k++) pulses.push(k / F)
  const reading = count / gate
  const res = 1 / gate
  const err = reading - F
  return (
    <>
      <Diagram w={640} h={260}
        title={`A counter opens its gate for ${gate} seconds and counts ${count} input pulses, so it displays ${reading.toFixed(1)} hertz. The true frequency is ${F} hertz. Resolution is ${res.toFixed(1)} hertz.`}
        caption="Toy example at 25.4 Hz so the pulses can be seen. A real counter does the same with millions of pulses per second.">
        <T x={x0} y={20} size={13} bold color={C.muted}>input pulses (25.4 per second)</T>
        <Ln x1={x0} y1={110} x2={x0 + W} y2={110} color={C.fill2} width={1.5} />
        <rect x={X(tg)} y={34} width={(W * gate) / TT} height={92} rx={6} fill={C.signal} opacity={0.14} stroke={C.signal} strokeWidth={1.5} strokeDasharray="5 4" />
        {pulses.map((t, i) => {
          const inside = i + 1 >= lo && i + 1 < hi
          return <Ln key={i} x1={X(t)} y1={inside ? 56 : 70} x2={X(t)} y2={110} color={inside ? C.signal : C.muted} width={inside ? 3 : 2} />
        })}
        <T x={X(tg) + 6} y={46} size={13} bold color={C.signal}>{`gate open ${gate} s`}</T>
        <Ln x1={X(tg)} y1={142} x2={X(tg + gate)} y2={142} color={C.signal} width={2} arrow="both" />
        <T x={x0} y={176} size={14} bold>{`${count} pulses ÷ ${gate} s = ${reading.toFixed(1)} Hz`}</T>
        <T x={x0} y={200} size={13} color={C.muted}>{`true frequency 25.4 Hz, so this reading is ${Math.abs(err) < 0.05 ? 'exact' : `${err > 0 ? '+' : '−'}${Math.abs(err).toFixed(1)} Hz off`}`}</T>
        <T x={x0} y={226} size={13} color={C.muted}>{`one pulse more or less changes the reading by ${res.toFixed(1)} Hz: that is the resolution`}</T>
      </Diagram>
      <Controls>
        <Choice label="Gate time" value={gate} onChange={setGate} options={GATES.map((g) => ({ value: g, label: `${g} s` }))} />
        <Slider label="When the gate happens to open" value={open} min={0} max={39} onChange={setOpen} format={(v) => `${v} ms`} color="var(--d-signal)" />
        <Readout label="Resolution (1 ÷ gate time)" value={res.toFixed(1)} unit=" Hz" color="var(--d-power)" />
      </Controls>
    </>
  )
}
