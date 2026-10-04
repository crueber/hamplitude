import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

/** Fourier synthesis: a square wave is a sine plus its odd harmonics (amplitude 1/k). */
export function Fourier() {
  const [n, setN] = useState(3)
  const x0 = 70, x1 = 610, cy = 84, A = 52
  const ks = Array.from({ length: n }, (_, i) => 2 * i + 1)
  const sq: string[] = [], sum: string[] = []
  const N = 300
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const x = x0 + (x1 - x0) * u
    const s = Math.sin(TAU * (u + 1e-6)) >= 0 ? 1 : -1
    let y = 0
    for (const k of ks) y += (4 / Math.PI) * Math.sin(TAU * k * u) / k
    sq.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - A * s).toFixed(1)}`)
    sum.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - A * y).toFixed(1)}`)
  }
  const by = 296, bh = 70, bx = 90, step = 68
  return (
    <>
      <Diagram w={640} h={336} title={`A square wave built from its first ${n} odd harmonics. Top: amplitude against time. Bottom: the same signal as amplitude against frequency, with bars at f, 3f, 5f and so on, each one k-th as tall as the fundamental.`}
        caption="Time domain (top) and frequency domain (bottom) are two views of the same signal.">
        <T x={14} y={14} size={13} bold color={C.muted}>Time domain: amplitude at different times</T>
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.fill2} width={1.5} />
        <path d={sq.join('')} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" />
        <path d={sum.join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={14} y={166} size={13} bold color={C.muted}>Frequency domain: amplitude at each frequency</T>
        <Ln x1={70} y1={by} x2={x1} y2={by} color={C.muted} width={2} />
        {Array.from({ length: 8 }, (_, i) => {
          const k = 2 * i + 1
          const on = k <= 2 * n - 1
          const h = bh / k
          return (
            <g key={k}>
              <rect x={bx + i * step - 14} y={by - h} width={28} height={h} rx={3} fill={on ? C.signal : C.fill2} opacity={on ? 1 : 0.6} />
              <T x={bx + i * step} y={by + 16} anchor="middle" size={13} bold={on} color={on ? C.ink : C.muted}>{k === 1 ? 'f' : `${k}f`}</T>
              {on && <T x={bx + i * step} y={by - h - 11} anchor="middle" size={12} mono color={C.muted}>{k === 1 ? '1' : `1/${k}`}</T>}
            </g>
          )
        })}
        <T x={x1} y={200} anchor="end" size={12.5} color={C.muted}>no 2f, 4f, 6f: only odd harmonics</T>
      </Diagram>
      <Controls>
        <Slider label="Odd harmonics added" value={n} min={1} max={8} onChange={setN} format={(v) => (v === 1 ? 'fundamental only' : `up to ${2 * v - 1}f`)} color="var(--d-signal)" />
        <Readout label="Shape" value={n === 1 ? 'Sine' : n < 4 ? 'Rounded square' : 'Nearly square'} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
