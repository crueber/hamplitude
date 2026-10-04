import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

const NCLK = 64 // clock ticks shown
const X0 = 176, X1 = 620, PH = 62

/** Direct digital synthesizer: phase accumulator, sine lookup table, DAC, low-pass filter. */
export function Dds() {
  const [step, setStep] = useState(3)
  const phase = (k: number) => ((k * step) % NCLK) / NCLK // 0..1
  const kx = (k: number) => X0 + (k / (NCLK - 1)) * (X1 - X0)
  const row = (i: number) => 36 + i * 100 // plot centre rows
  const accPath: string[] = [], tabPts: [number, number][] = [], smooth: string[] = []
  for (let k = 0; k < NCLK; k++) {
    const p = phase(k)
    accPath.push(`${k ? 'L' : 'M'}${kx(k).toFixed(1)},${(row(0) + PH - p * PH).toFixed(1)}`)
    tabPts.push([kx(k), row(1) + PH - ((Math.sin(TAU * p) + 1) / 2) * PH])
  }
  for (let i = 0; i <= 400; i++) {
    const t = (i / 400) * (NCLK - 1)
    smooth.push(`${i ? 'L' : 'M'}${(X0 + (t / (NCLK - 1)) * (X1 - X0)).toFixed(1)},${(row(2) + PH - ((Math.sin((TAU * t * step) / NCLK) + 1) / 2) * PH).toFixed(1)}`)
  }
  const hold = tabPts.map(([x, y]) => [x, y + 100] as [number, number])
  const stair = hold.map(([x, y], k) => `${k ? `L${x.toFixed(1)},${hold[k - 1][1].toFixed(1)} ` : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const lab = (i: number, t: string, s: string, col: string) => (
    <g>
      <rect x={14} y={row(i)} width={146} height={PH} rx={10} fill={C.fill} stroke={col} strokeWidth={2.5} />
      <T x={87} y={row(i) + 22} anchor="middle" size={13.5} bold color={col}>{t}</T>
      <T x={87} y={row(i) + 43} anchor="middle" size={12} color={C.muted}>{s}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={366}
        title={`Direct digital synthesizer. A phase accumulator adds ${step} each clock tick and wraps around. A lookup table turns each phase into a sine amplitude. A DAC makes steps and a low-pass filter smooths them. The output makes ${step} cycles in ${NCLK} clock ticks.`}
        caption="Bigger phase step, faster trip around the table, higher output frequency. Real accumulators wrap at a far larger count than 64.">
        {[0, 1, 2].map((i) => <rect key={i} x={X0 - 6} y={row(i) - 4} width={X1 - X0 + 12} height={PH + 8} rx={8} fill={C.fill} />)}
        {lab(0, '1. Phase accumulator', 'adds the step each tick', C.current)}
        {lab(1, '2. Lookup table', 'phase → amplitude', C.resist)}
        {lab(2, '3. DAC + low-pass', 'steps → smooth sine', C.signal)}
        <Ln x1={87} y1={row(0) + PH} x2={87} y2={row(1)} color={C.ink} width={2.5} arrow />
        <Ln x1={87} y1={row(1) + PH} x2={87} y2={row(2)} color={C.ink} width={2.5} arrow />
        <path d={accPath.join('')} fill="none" stroke={C.current} strokeWidth={2.5} strokeLinejoin="round" />
        {tabPts.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={2.6} fill={C.resist} />)}
        <path d={stair} fill="none" stroke={C.signal} strokeWidth={1.6} opacity={0.6} />
        <path d={smooth.join('')} fill="none" stroke={C.signal} strokeWidth={3.2} strokeLinejoin="round" />
        <T x={X0} y={row(2) + PH + 24} size={12} color={C.muted}>faint steps = DAC output. Bold = after the filter.</T>
        <T x={X1} y={row(0) - 12} anchor="end" size={12} color={C.muted}>{NCLK} clock ticks</T>
        <T x={14} y={354} size={14} bold color={C.signal}>Output = {step} cycles per {NCLK} ticks = ({step} ÷ {NCLK}) × clock frequency</T>
      </Diagram>
      <Controls>
        <Slider label="Phase step per clock tick" value={step} min={1} max={16} onChange={setStep} format={(v) => String(v)} color="var(--d-current)" />
      </Controls>
    </>
  )
}
