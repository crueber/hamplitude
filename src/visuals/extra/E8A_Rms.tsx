import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T, TAU, fmt } from '../kit'

type Shape = 'sine' | 'square' | 'triangle'
const fn: Record<Shape, (u: number) => number> = {
  sine: (u) => Math.sin(TAU * u),
  square: (u) => (u % 1 < 0.5 ? 1 : -1),
  triangle: (u) => { const v = u % 1; return v < 0.25 ? 4 * v : v < 0.75 ? 2 - 4 * v : 4 * v - 4 },
}
// rms for 1 V peak; mean of |v|
const RMS: Record<Shape, number> = { sine: Math.SQRT1_2, square: 1, triangle: 1 / Math.sqrt(3) }
const AVG: Record<Shape, number> = { sine: 2 / Math.PI, square: 1, triangle: 0.5 }

/** RMS of a 1 V peak wave for three shapes, and what a sine-assuming meter would read. */
export function Rms() {
  const [s, setS] = useState<Shape>('sine')
  const x0 = 40, x1 = 600, cy = 100, A = 70
  const pts: string[] = []
  const N = 400
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * 2 + (s === 'square' ? 0 : 0)
    pts.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * (i / N)).toFixed(1)},${(cy - A * fn[s](u)).toFixed(1)}`)
  }
  const rms = RMS[s], cheap = 1.1107 * AVG[s]
  const ry = A * rms
  return (
    <>
      <Diagram w={640} h={214} title={`A ${s} wave with 1 volt peak. Its RMS value is ${fmt(rms, 3)} volts. A meter that assumes a sine wave would read ${fmt(cheap, 3)} volts.`}
        caption="RMS = the DC voltage that would heat a resistor equally.">
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.fill2} width={1.5} />
        <Ln x1={x0} y1={cy - A} x2={x1} y2={cy - A} color={C.muted} width={1.5} dash="3 5" />
        <Ln x1={x0} y1={cy + A} x2={x1} y2={cy + A} color={C.muted} width={1.5} dash="3 5" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <Ln x1={x0} y1={cy - ry} x2={x1} y2={cy - ry} color={C.power} width={2.5} />
        <Ln x1={x0} y1={cy + ry} x2={x1} y2={cy + ry} color={C.power} width={2.5} />
        <Ln x1={x0} y1={196} x2={x0 + 28} y2={196} color={C.muted} width={1.5} dash="3 5" />
        <T x={x0 + 36} y={196} size={12.5} color={C.muted}>peak = 1 V</T>
        <Ln x1={x0 + 170} y1={196} x2={x0 + 198} y2={196} color={C.power} width={2.5} />
        <T x={x0 + 206} y={196} size={12.5} bold color={C.power}>RMS = {fmt(rms, 3)} V</T>
      </Diagram>
      <Controls>
        <Choice label="Waveform" value={s} onChange={setS} options={[{ value: 'sine', label: 'Sine' }, { value: 'square', label: 'Square' }, { value: 'triangle', label: 'Triangle' }]} />
        <Readout label="True-RMS meter reads" value={fmt(rms, 3)} unit=" V" color="var(--d-power)" />
        <Readout label="Sine-assuming meter reads" value={fmt(cheap, 3)} unit=" V" color={Math.abs(cheap - rms) < 0.002 ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
