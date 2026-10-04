import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

const X0 = 24, X1 = 616, CY = 92, A = 56
const alias = (f: number, fs: number) => Math.abs(f - Math.round(f / fs) * fs)

/** Sampling a tone for 1 ms. Above half the sample rate, the samples describe a lower-frequency tone: an alias. */
export function Alias() {
  const [f, setF] = useState(7)
  const [fs, setFs] = useState(10)
  const nyq = fs / 2
  const fa = alias(f, fs)
  const ok = f <= nyq
  const tx = (t: number) => X0 + t * (X1 - X0)
  const wave = (freq: number) => {
    const a: string[] = []
    for (let i = 0; i <= 480; i++) { const t = i / 480; a.push(`${i ? 'L' : 'M'}${tx(t).toFixed(1)},${(CY - A * Math.cos(TAU * freq * t)).toFixed(1)}`) }
    return a.join('')
  }
  const dots = Array.from({ length: fs + 1 }, (_, k) => k / fs)
  const AX0 = 40, AX1 = 600, AY = 236, MAXF = 20
  const ax = (v: number) => AX0 + (v / MAXF) * (AX1 - AX0)
  const col = ok ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={330}
        title={ok ? `A ${f} kilohertz tone sampled at ${fs} thousand samples per second is below the Nyquist limit of ${nyq} kilohertz, so it is reproduced correctly.` : `A ${f} kilohertz tone sampled at ${fs} thousand samples per second is above the Nyquist limit of ${nyq} kilohertz. The samples look like a ${fa} kilohertz tone: an alias.`}
        caption="Dots are the samples. To reproduce a signal you need at least twice its highest frequency.">
        <rect x={14} y={20} width={612} height={150} rx={10} fill={C.fill} />
        <Ln x1={X0} y1={CY} x2={X1} y2={CY} color={C.muted} width={1} dash="3 5" />
        <path d={wave(f)} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        {!ok && <path d={wave(fa)} fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="7 5" strokeLinejoin="round" />}
        {dots.map((t, k) => (
          <circle key={k} cx={tx(t)} cy={CY - A * Math.cos(TAU * f * t)} r={4.5} fill={C.resist} stroke={C.bg} strokeWidth={1.5} />
        ))}
        <T x={22} y={180} size={12} color={C.muted}>1 millisecond of signal</T>
        <T x={618} y={180} anchor="end" size={13} bold color={ok ? C.signal : C.bad}>
          {ok ? `tone ${f} kHz: reproduced` : `tone ${f} kHz looks like ${fa} kHz (dashed)`}
        </T>
        {/* frequency axis */}
        <rect x={ax(0)} y={AY - 12} width={ax(nyq) - ax(0)} height={24} fill={C.good} fillOpacity={0.25} />
        <rect x={ax(nyq)} y={AY - 12} width={ax(MAXF) - ax(nyq)} height={24} fill={C.bad} fillOpacity={0.18} />
        <Ln x1={AX0} y1={AY} x2={AX1} y2={AY} color={C.muted} width={2} />
        {[0, 5, 10, 15, 20].map((v) => (
          <g key={v}>
            <Ln x1={ax(v)} y1={AY + 12} x2={ax(v)} y2={AY + 18} color={C.muted} width={1.5} />
            <T x={ax(v)} y={AY + 32} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        <T x={AX1} y={AY + 50} anchor="end" size={12} color={C.muted}>signal frequency (kHz)</T>
        <Ln x1={ax(nyq)} y1={AY - 26} x2={ax(nyq)} y2={AY + 12} color={C.resist} width={3} />
        <T x={ax(nyq)} y={AY - 38} anchor="middle" size={13} bold color={C.resist}>half the sample rate = {nyq} kHz</T>
        <circle cx={ax(f)} cy={AY} r={8} fill={col} stroke={C.bg} strokeWidth={2.5} />
        <T x={AX0} y={AY - 26} size={12} bold color={C.good}>safe</T>
        <T x={AX1} y={AY - 26} anchor="end" size={12} bold color={C.bad}>aliases</T>
        <T x={320} y={308} anchor="middle" size={14} bold color={C.ink}>Sample rate must be at least 2 × the highest frequency: {fs} kS/s covers up to {nyq} kHz</T>
      </Diagram>
      <Controls>
        <Slider label="Signal frequency" value={f} min={1} max={19} onChange={setF} format={(v) => `${v} kHz`} color="var(--d-signal)" />
        <Slider label="Sample rate" value={fs} min={6} max={20} onChange={setFs} format={(v) => `${v} kS/s`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
