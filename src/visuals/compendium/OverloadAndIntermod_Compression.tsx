import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

const N = 240
/** Average small-signal gain of a tanh amplifier while a sine of amplitude A swings it back and forth: mean of sech^2. */
function meanGain(A: number): number {
  let s = 0
  for (let i = 0; i < N; i++) {
    const c = Math.cosh(A * Math.sin((2 * Math.PI * i) / N))
    s += 1 / (c * c)
  }
  return s / N
}

/** A strong signal swings an amplifier into its curved region: the output flattens, and a weak wanted signal gets less gain. */
export function OverloadAndIntermod_Compression() {
  const [A, setA] = useState(2)
  const g = meanGain(A)
  const db = 20 * Math.log10(g)
  // transfer curve panel
  const cx = 150, cy = 150, sx = 32, sy = 70
  const curve = Array.from({ length: 81 }, (_, i) => {
    const x = -4 + (i * 8) / 80
    return `${i ? 'L' : 'M'}${(cx + x * sx).toFixed(1)},${(cy - Math.tanh(x) * sy).toFixed(1)}`
  }).join('')
  const lo = Array.from({ length: 41 }, (_, i) => {
    const x = -A + (i * 2 * A) / 40
    return `${i ? 'L' : 'M'}${(cx + x * sx).toFixed(1)},${(cy - Math.tanh(x) * sy).toFixed(1)}`
  }).join('')
  // output waveform panel (normalised so the peak is the same height)
  const wx0 = 360, wx1 = 620, wy = 92, wa = 48
  const peak = Math.tanh(A)
  const out = Array.from({ length: 121 }, (_, i) => {
    const th = (i * 2 * Math.PI * 2) / 120
    return `${i ? 'L' : 'M'}${(wx0 + ((wx1 - wx0) * i) / 120).toFixed(1)},${(wy - (Math.tanh(A * Math.sin(th)) / peak) * wa).toFixed(1)}`
  }).join('')
  const ideal = Array.from({ length: 121 }, (_, i) => {
    const th = (i * 2 * Math.PI * 2) / 120
    return `${i ? 'L' : 'M'}${(wx0 + ((wx1 - wx0) * i) / 120).toFixed(1)},${(wy - Math.sin(th) * wa).toFixed(1)}`
  }).join('')
  const barW = Math.max(4, 260 * g)
  return (
    <>
      <Diagram w={640} h={262} title={`An idealised amplifier whose output flattens at the extremes. A strong signal of relative size ${A.toFixed(1)} swings it into the flat region, which squares off the strong signal and cuts the gain seen by a weak wanted signal to ${g.toFixed(2)} of normal, or ${db.toFixed(1)} decibels.`}
        caption="Idealised amplifier, illustrative numbers. The flattened peaks are new frequencies (harmonics and mixing products) and the lost gain is desensitisation.">
        <T x={20} y={20} size={13} bold color={C.muted}>Amplifier: output against input</T>
        <line x1={cx - 128} y1={cy} x2={cx + 128} y2={cy} stroke={C.muted} strokeWidth={1.5} />
        <line x1={cx} y1={cy - 84} x2={cx} y2={cy + 84} stroke={C.muted} strokeWidth={1.5} />
        <path d={curve} fill="none" stroke={C.fill2} strokeWidth={3} strokeLinecap="round" />
        <path d={lo} fill="none" stroke={C.bad} strokeWidth={4.5} strokeLinecap="round" />
        <T x={cx + 128} y={cy + 14} anchor="end" size={12} color={C.muted}>input</T>
        <T x={cx + 8} y={cy - 80} size={12} color={C.muted}>output</T>
        <T x={cx - 128} y={cy + 100} size={12} color={C.bad} bold>red = range the strong signal swings through</T>

        <T x={wx0} y={20} size={13} bold color={C.muted}>Strong signal, as the amplifier outputs it</T>
        <path d={ideal} fill="none" stroke={C.muted} strokeWidth={1.8} strokeDasharray="5 4" />
        <path d={out} fill="none" stroke={C.bad} strokeWidth={3} strokeLinejoin="round" />
        <T x={wx0} y={wy + 66} size={12} color={C.muted}>dashed: a clean sine for comparison</T>

        <T x={wx0} y={186} size={13} bold color={C.muted}>Gain left for a weak wanted signal</T>
        <rect x={wx0} y={198} width={260} height={18} rx={9} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <rect x={wx0} y={198} width={barW} height={18} rx={9} fill={g > 0.8 ? C.good : g > 0.4 ? C.resist : C.bad} />
        <T x={wx0} y={238} size={13} bold mono>{db.toFixed(1)} dB</T>
        <T x={wx0 + 260} y={238} anchor="end" size={12} color={C.muted}>{db > -0.5 ? 'normal' : 'desensitised'}</T>
      </Diagram>
      <Controls>
        <Slider label="Strong signal level" value={A} min={0.2} max={4} step={0.1} onChange={setA} format={(v) => `${v.toFixed(1)} × the linear range`} color="var(--d-bad)" />
        <Readout label="Wanted signal gain" value={db.toFixed(1)} unit=" dB" color={db > -1 ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
