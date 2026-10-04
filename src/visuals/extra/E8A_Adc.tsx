import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

/** ADC resolution: n bits = 2^n levels. The DAC output is stair-steps; a low-pass filter smooths them. */
export function Adc() {
  const [bits, setBits] = useState(3)
  const [lpf, setLpf] = useState<'off' | 'on'>('off')
  const levels = 2 ** bits
  const x0 = 50, x1 = 610, cy = 130, A = 100
  const S = 24 // samples across the window (2 cycles)
  const W = x1 - x0
  const q = (v: number) => {
    const idx = Math.min(levels - 1, Math.floor(((v + 1) / 2) * levels))
    return ((idx + 0.5) / levels) * 2 - 1
  }
  const input = (u: number) => Math.sin(TAU * 2 * u)
  const held = (u: number) => q(input((Math.floor(u * S) + 0.5) / S))
  const hi = 560
  const stair: string[] = [], smooth: string[] = [], inp: string[] = []
  const w = 1.5 / S
  for (let i = 0; i <= hi; i++) {
    const u = i / hi
    const x = (x0 + W * u).toFixed(1)
    stair.push(`${i ? 'L' : 'M'}${x},${(cy - A * held(Math.min(u, 0.99999))).toFixed(1)}`)
    inp.push(`${i ? 'L' : 'M'}${x},${(cy - A * input(u)).toFixed(1)}`)
    let a = 0, c = 0
    for (let j = -6; j <= 6; j++) { const uu = Math.min(1, Math.max(0, u + (j / 6) * w / 2)); a += held(Math.min(uu, 0.99999)); c++ }
    smooth.push(`${i ? 'L' : 'M'}${x},${(cy - A * (a / c)).toFixed(1)}`)
  }
  const grid = levels <= 32 ? Array.from({ length: levels + 1 }, (_, i) => cy + A - (i / levels) * 2 * A) : []
  return (
    <>
      <Diagram w={640} h={266} title={`A sine wave sampled by a ${bits}-bit converter: ${levels} possible levels. The output is stair-steps; a low-pass filter smooths the steps.`}
        caption="Bits set the number of levels (2 to the power of the bits). The filter removes the sampling steps, not the level error.">
        {grid.map((y, i) => <Ln key={i} x1={x0} y1={y} x2={x1} y2={y} color={C.fill2} width={1} />)}
        <path d={inp.join('')} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" />
        <path d={(lpf === 'on' ? smooth : stair).join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x0} y={14} size={12.5} color={C.muted}>dashed = original signal</T>
        <T x={x1} y={14} anchor="end" size={12.5} bold color={C.signal}>{lpf === 'on' ? 'after low-pass filter' : 'converter output'}</T>
        <T x={x0} y={250} size={12.5} color={C.muted}>{levels <= 32 ? `${levels} levels` : `${levels} levels (too fine to draw)`}</T>
      </Diagram>
      <Controls>
        <Slider label="Converter resolution" value={bits} min={1} max={8} onChange={setBits} format={(v) => `${v} bits`} color="var(--d-signal)" />
        <Choice label="Output low-pass filter" value={lpf} onChange={setLpf} options={[{ value: 'off', label: 'Filter off' }, { value: 'on', label: 'Filter on' }]} />
        <Readout label="Levels" value={`2^${bits} = ${levels}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
