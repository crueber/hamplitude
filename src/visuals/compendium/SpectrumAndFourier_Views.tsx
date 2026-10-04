import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

type Mode = 'sine' | 'square' | 'triangle' | 'saw' | 'am'
interface Comp { f: number; a: number; sign?: number }

const mod1 = (x: number) => x - Math.floor(x)
const MODES: Record<Mode, { label: string; max: number; comps: (c: number) => Comp[]; ideal?: (t: number) => number; note: string; scale: number }> = {
  sine: { label: 'Sine', max: 1, comps: () => [{ f: 1, a: 1 }], note: 'A pure tone is one line in the spectrum.', scale: 52 },
  square: {
    label: 'Square', max: 8,
    comps: (c) => Array.from({ length: c }, (_, i) => { const k = 2 * i + 1; return { f: k, a: 4 / (Math.PI * k) } }),
    ideal: (t) => (mod1(t) < 0.5 ? 1 : -1),
    note: 'Odd harmonics only, each 1/k as strong.', scale: 46,
  },
  triangle: {
    label: 'Triangle', max: 8,
    comps: (c) => Array.from({ length: c }, (_, i) => { const k = 2 * i + 1; return { f: k, a: (8 / (Math.PI * Math.PI)) / (k * k), sign: i % 2 ? -1 : 1 } }),
    ideal: (t) => 1 - 4 * Math.abs(mod1(t + 0.25) - 0.5),
    note: 'Odd harmonics again, but falling as 1/k², so it needs few.', scale: 52,
  },
  saw: {
    label: 'Sawtooth', max: 12,
    comps: (c) => Array.from({ length: c }, (_, i) => { const k = i + 1; return { f: k, a: 2 / (Math.PI * k), sign: i % 2 ? -1 : 1 } }),
    ideal: (t) => 2 * (mod1(t + 0.5) - 0.5),
    note: 'Every harmonic, each 1/k as strong.', scale: 46,
  },
  am: {
    label: 'AM tone', max: 3,
    comps: () => [{ f: 8, a: 1 }, { f: 7, a: 0.5 }, { f: 9, a: 0.5 }],
    note: 'AM: a carrier and two sidebands. The envelope is their beat.', scale: 28,
  },
}

/** One signal, two views: the waveform against time and the same signal as a spectrum of sine waves. */
export function SpectrumAndFourier_Views() {
  const [mode, setMode] = useState<Mode>('square')
  const [count, setCount] = useState(3)
  const M = MODES[mode]
  const n = mode === 'sine' || mode === 'am' ? M.max : Math.min(count, M.max)
  const comps = M.comps(n)
  const x0 = 28, x1 = 612, cy = 96, N = 600, T0 = 2
  const wave: string[] = [], ideal: string[] = []
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * T0
    const y = comps.reduce((s, c) => s + c.a * (c.sign ?? 1) * Math.sin(TAU * c.f * t), 0)
    const x = x0 + (x1 - x0) * (i / N)
    wave.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - M.scale * y).toFixed(1)}`)
    if (M.ideal) ideal.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - M.scale * M.ideal(t)).toFixed(1)}`)
  }
  const base = 296, FH = 62, fx = (f: number) => 44 + f * 35
  return (
    <>
      <Diagram w={640} h={352}
        title={`A ${M.label} signal shown two ways: its waveform against time, and its spectrum made of ${n} sine wave component${n > 1 ? 's' : ''}.`}
        caption="Top: time domain (a scope). Bottom: frequency domain (a spectrum analyzer). Same signal, same information.">
        <rect x={14} y={6} width={612} height={180} rx={10} fill={C.fill} />
        <T x={22} y={20} size={12.5} bold color={C.muted}>Time domain: voltage against time (2 cycles of the base frequency)</T>
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1} dash="3 5" />
        {M.ideal && <path d={ideal.join('')} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />}
        <path d={wave.join('')} fill="none" stroke={C.signal} strokeWidth={2.6} strokeLinejoin="round" />
        <rect x={14} y={194} width={612} height={150} rx={10} fill={C.fill} />
        <T x={22} y={208} size={12.5} bold color={C.muted}>Frequency domain: one line per sine-wave ingredient</T>
        <Ln x1={30} y1={base} x2={614} y2={base} color={C.muted} width={2} />
        {[0, 4, 8, 12, 16].map((f) => (
          <g key={f}>
            <Ln x1={fx(f)} y1={base} x2={fx(f)} y2={base + 5} color={C.muted} width={1.5} />
            <T x={fx(f)} y={base + 17} anchor="middle" size={12} color={C.muted}>{f}</T>
          </g>
        ))}
        <T x={614} y={base + 34} anchor="end" size={12} color={C.muted}>frequency, in multiples of the base frequency</T>
        {comps.map((c) => (
          <rect key={c.f} x={fx(c.f) - 5} y={base - FH * c.a} width={10} height={FH * c.a} rx={2} fill={mode === 'am' && c.f !== 8 ? C.power : C.signal} />
        ))}
        <T x={614} y={222} anchor="end" size={12.5} color={C.ink}>{M.note}</T>
      </Diagram>
      <Controls>
        <Choice label="Waveform" value={mode} onChange={setMode} options={(Object.keys(MODES) as Mode[]).map((m) => ({ value: m, label: MODES[m].label }))} />
        {(mode === 'square' || mode === 'triangle' || mode === 'saw') && (
          <Slider label="Components added" value={n} min={1} max={M.max} step={1} onChange={setCount} format={(v) => `${v}`} color="var(--d-signal)" />
        )}
      </Controls>
    </>
  )
}
