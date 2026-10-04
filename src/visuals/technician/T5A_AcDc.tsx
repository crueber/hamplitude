import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, sinePath, TAU, useTime } from '../kit'

/** DC is steady in one direction. AC swings both ways; frequency is cycles per second. */
export function AcDc() {
  const [f, setF] = useState(2)
  const { t, ref } = useTime(0.5)
  const x0 = 80, x1 = 600
  const dcZero = 96, dcLevel = 56
  const acZero = 238, amp = 52
  const ph = t % 1
  const px = x0 + ph * (x1 - x0)
  const axis = (zero: number, top: number, bot: number) => (
    <g>
      <Ln x1={x0} y1={top} x2={x0} y2={bot} color={C.fill2} width={2} />
      <Ln x1={x0} y1={zero} x2={x1} y2={zero} color={C.muted} width={1.5} dash="4 5" />
      <T x={x0 - 12} y={zero - 40} anchor="end" size={14} color={C.muted}>+</T>
      <T x={x0 - 12} y={zero} anchor="end" size={13} color={C.muted}>0</T>
      <T x={x0 - 12} y={zero + 40} anchor="end" size={14} color={C.muted}>−</T>
    </g>
  )
  const cycleW = (x1 - x0) / f
  return (
    <>
      <Diagram w={640} h={350} svgRef={ref}
        title={`Direct current stays steady in one direction. Alternating current swings positive and negative, here ${f} complete cycles each second, a frequency of ${f} hertz.`}
        caption="Current over one second. The dot traces each wave.">
        <T x={x0} y={20} bold size={16}>DC: flows one way only</T>
        {axis(dcZero, 36, 150)}
        <Ln x1={x0} y1={dcLevel} x2={x1} y2={dcLevel} color={C.current} width={4} />
        <circle cx={px} cy={dcLevel} r={7} fill={C.current} stroke={C.bg} strokeWidth={2.5} />

        <T x={x0} y={170} bold size={16}>AC: reverses direction</T>
        {axis(acZero, 188, 300)}
        <path d={sinePath(x0, x1, acZero, amp, f)} fill="none" stroke={C.current} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={px} cy={acZero - amp * Math.sin(TAU * f * ph)} r={7} fill={C.current} stroke={C.bg} strokeWidth={2.5} />
        {/* one cycle bracket */}
        <Ln x1={x0} y1={310} x2={x0 + cycleW} y2={310} color={C.signal} width={2.5} arrow="both" />
        <T x={x0 + cycleW / 2} y={327} anchor="middle" size={13} bold color={C.signal}>1 cycle</T>
        <T x={x1} y={327} anchor="end" size={13} color={C.muted}>1 second</T>
      </Diagram>
      <Controls>
        <Slider label="Cycles in one second" value={f} min={1} max={6} onChange={setF} format={(v) => `${v}`} color="var(--d-signal)" />
        <Readout label="Frequency" value={f} unit="Hz" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
