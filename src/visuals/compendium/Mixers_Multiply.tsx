import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const RF = 10

/** A mixer multiplies two sine waves; the product contains only the sum and the difference of their frequencies. */
export function Mixers_Multiply() {
  const [lo, setLo] = useState(6)
  const x0 = 40, x1 = 600
  const N = 400
  const path = (f: (t: number) => number, cy: number, amp: number) =>
    Array.from({ length: N + 1 }, (_, k) => {
      const t = k / N
      return `${(x0 + (x1 - x0) * t).toFixed(1)},${(cy - amp * f(t)).toFixed(1)}`
    }).join(' ')
  const a = (t: number) => Math.sin(TAU * RF * t)
  const b = (t: number) => Math.sin(TAU * lo * t)
  const diff = Math.abs(RF - lo), sum = RF + lo

  const ay = 340
  const sx = (f: number) => x0 + (f / 30) * (x1 - x0)
  const stem = (f: number, h: number, color: string, w = 4) => <Ln x1={sx(f)} y1={ay} x2={sx(f)} y2={ay - h} color={color} width={w} />

  return (
    <>
      <Diagram w={640} h={412}
        title={`A mixer multiplies a ${RF} megahertz signal by a ${lo} megahertz local oscillator. The product contains a difference frequency of ${diff} megahertz and a sum frequency of ${sum} megahertz, and neither input frequency.`}
        caption="Time lanes show 1 µs. Multiplying two sine waves gives their sum and difference frequencies, not the originals.">
        <T x={x0} y={20} size={13} bold color={C.signal}>{`Signal in: ${RF} MHz`}</T>
        <polyline points={path(a, 54, 18)} fill="none" stroke={C.signal} strokeWidth={2.2} strokeLinejoin="round" />
        <T x={x0} y={92} size={13} bold color={C.power}>{`Local oscillator: ${lo} MHz`}</T>
        <polyline points={path(b, 126, 18)} fill="none" stroke={C.power} strokeWidth={2.2} strokeLinejoin="round" />
        <T x={x0} y={164} size={13} bold>Product (what a mixer outputs)</T>
        <Ln x1={x0} y1={210} x2={x1} y2={210} color={C.fill2} width={1.5} />
        <polyline points={path((t) => a(t) * b(t), 210, 30)} fill="none" stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />

        <Ln x1={x0} y1={ay} x2={x1} y2={ay} color={C.muted} width={1.5} />
        {[0, 10, 20, 30].map((f) => <g key={f}><line x1={sx(f)} y1={ay} x2={sx(f)} y2={ay + 5} stroke={C.muted} strokeWidth={1.5} /><T x={sx(f)} y={ay + 16} anchor="middle" size={12} color={C.muted}>{`${f}`}</T></g>)}
        <T x={x1} y={ay + 34} anchor="end" size={12} color={C.muted}>frequency (MHz)</T>
        <T x={x0} y={254} size={13} bold>Spectrum: inputs thin, product thick</T>
        {stem(RF, 34, C.signal, 3)}
        {stem(lo, 34, C.power, 3)}
        {stem(diff, 52, C.ink)}
        {stem(sum, 52, C.ink)}
        <T x={diff < 3 ? sx(diff) - 4 : sx(diff)} y={ay - 52 - 12} anchor={diff < 3 ? 'start' : 'middle'} size={12} bold>{`difference ${diff}`}</T>
        <T x={sx(sum)} y={ay - 52 - 12} anchor="middle" size={12} bold>{`sum ${sum}`}</T>
        <T x={sx(RF) + 5} y={ay - 40} size={12} bold color={C.signal}>RF</T>
        <T x={sx(lo) - 5} y={ay - 40} anchor="end" size={12} bold color={C.power}>LO</T>
      </Diagram>
      <Controls>
        <Slider label="Local oscillator frequency" value={lo} min={3} max={17} onChange={setLo} format={(v) => `${v} MHz`} color={C.power} />
        <Readout label="Difference" value={fmt(diff, 3)} unit="MHz" color={C.ink} />
        <Readout label="Sum" value={fmt(sum, 3)} unit="MHz" color={C.ink} />
      </Controls>
    </>
  )
}
