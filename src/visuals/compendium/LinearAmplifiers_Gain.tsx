import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** An amplifier changes power by a ratio. In decibels that is 10 x log10(out / in), and 6 dB is about one S unit. */
export function LinearAmplifiers_Gain() {
  const [pin, setPin] = useState(100)
  const [pout, setPout] = useState(1000)
  const ratio = pout / pin
  const db = 10 * Math.log10(ratio)
  const sUnits = db / 6
  const x0 = 50, x1 = 600
  const lo = 0, hi = Math.log10(2000)
  const sx = (p: number) => x0 + ((Math.log10(p) - lo) / (hi - lo)) * (x1 - x0)
  const y = 110
  const ticks = [1, 10, 100, 1000]
  return (
    <>
      <Diagram w={640} h={200}
        title={`Going from ${pin} watts to ${pout} watts is a ${ratio.toFixed(1)} times increase, ${db.toFixed(1)} decibels, about ${sUnits.toFixed(1)} S units`}
        caption="Power on a logarithmic scale: equal distances are equal ratios (equal decibels).">
        <Ln x1={x0} y1={y} x2={x1} y2={y} color={C.muted} width={2} />
        {ticks.map((p) => (
          <g key={p}>
            <Ln x1={sx(p)} y1={y - 6} x2={sx(p)} y2={y + 6} color={C.muted} width={2} />
            <T x={sx(p)} y={y + 24} anchor="middle" size={12} color={C.muted}>{`${p} W`}</T>
          </g>
        ))}
        <circle cx={sx(pin)} cy={y} r={9} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={sx(pin)} y={y - 30} anchor="middle" size={13} bold color={C.signal}>{`${pin} W`}</T>
        <circle cx={sx(pout)} cy={y} r={9} fill={C.power} stroke={C.bg} strokeWidth={2} />
        <T x={sx(pout)} y={y - 30} anchor="middle" size={13} bold color={C.power}>{`${pout} W`}</T>
        {pout > pin && <Ln x1={sx(pin) + 12} y1={y - 12} x2={sx(pout) - 12} y2={y - 12} color={C.power} width={2.5} arrow />}
        <T x={320} y={172} anchor="middle" size={14} bold color={C.power}>{`${db.toFixed(1)} dB gain = ${sUnits.toFixed(1)} S units at the far end`}</T>
      </Diagram>
      <Controls>
        <Slider label="Power without the amplifier" value={pin} min={5} max={100} step={5} onChange={(v) => { setPin(v); if (pout < v) setPout(v) }} format={(v) => `${v} W`} color="var(--d-signal)" />
        <Slider label="Power with the amplifier" value={pout} min={100} max={1500} step={50} onChange={(v) => setPout(Math.max(v, pin))} format={(v) => `${v} W`} color="var(--d-power)" />
        <Readout label="Power ratio" value={ratio.toFixed(1)} unit=" ×" />
        <Readout label="Gain" value={db.toFixed(1)} unit=" dB" color="var(--d-power)" />
      </Controls>
    </>
  )
}
