import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

/** AM envelope and what overmodulation does: flat-topped peaks and extra sidebands (splatter). */
export function G8A_Envelope() {
  const [g, setG] = useState(0.7)
  const L = 2 // the most the transmitter can deliver (twice the carrier)
  const A = (u: number) => Math.min(L, Math.max(0, 1 + g * Math.sin(TAU * u)))
  // spectrum of the envelope over one voice cycle
  const N = 256, K = 7
  const carrier = Array.from({ length: N }, (_, i) => A(i / N)).reduce((a, b) => a + b, 0) / N
  const side: number[] = []
  for (let k = 1; k <= K; k++) {
    let a = 0, b = 0
    for (let i = 0; i < N; i++) { const v = A(i / N); a += v * Math.cos(TAU * k * i / N); b += v * Math.sin(TAU * k * i / N) }
    side.push(Math.hypot(a, b) / N) // sideband amplitude = half of the 2/N-normalised harmonic
  }
  const over = g > 1.0001
  const col = over ? C.bad : C.good
  const x0 = 50, x1 = 590, cy = 112, sc = 40, cycles = 38, M = 760
  const car: string[] = [], up: string[] = [], dn: string[] = []
  for (let i = 0; i <= M; i++) {
    const u = i / M
    const a = A(2 * u)
    const x = x0 + (x1 - x0) * u
    car.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - sc * a * Math.sin(TAU * cycles * u)).toFixed(1)}`)
    up.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - sc * a).toFixed(1)}`)
    dn.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy + sc * a).toFixed(1)}`)
  }
  const sb = 354, sx = 320, sp = 38, U = 90
  return (
    <>
      <Diagram w={640} h={400} title={`AM signal with the modulation envelope dashed. Drive level ${g.toFixed(2)}: ${over ? 'overmodulated, the envelope is flat-topped and extra sidebands appear outside the normal bandwidth' : 'clean, the envelope follows the voice and the bandwidth stays narrow'}`}
        caption="The envelope is the outline of the peaks. Past full drive it flattens and the signal spreads sideways.">
        <T x={x0} y={14} size={13} bold color={C.muted}>AM signal and its envelope (dashed)</T>
        <Ln x1={x0} y1={cy - sc * L} x2={x1} y2={cy - sc * L} color={C.muted} width={1.2} dash="3 5" />
        <Ln x1={x0} y1={cy + sc * L} x2={x1} y2={cy + sc * L} color={C.muted} width={1.2} dash="3 5" />
        <T x={x1} y={cy - sc * L - 11} anchor="end" size={12} color={C.muted}>transmitter's limit</T>
        <path d={car.join('')} fill="none" stroke={C.signal} strokeWidth={1.4} />
        <path d={up.join('')} fill="none" stroke={col} strokeWidth={2.5} strokeDasharray="6 4" />
        <path d={dn.join('')} fill="none" stroke={col} strokeWidth={2.5} strokeDasharray="6 4" />
        <T x={x0} y={216} size={13} bold color={C.muted}>What it does to the spectrum</T>
        <Ln x1={30} y1={sb} x2={610} y2={sb} color={C.muted} width={2} />
        <rect x={sx - sp - 10} y={sb - U - 30} width={2 * sp + 20} height={U + 30} rx={6} fill={C.good} fillOpacity={0.1} stroke={C.good} strokeWidth={1.5} strokeDasharray="4 4" />
        <T x={sx} y={sb + 20} anchor="middle" size={12} color={C.good} bold>normal bandwidth</T>
        <Ln x1={sx} y1={sb} x2={sx} y2={sb - carrier * U} color={C.signal} width={5} />
        {side.map((v, i) => {
          const k = i + 1
          const h = v * U
          if (v < 0.012) return null
          const bad = k > 1
          const cc = bad ? C.bad : C.signal
          return (
            <g key={k}>
              <Ln x1={sx - k * sp} y1={sb} x2={sx - k * sp} y2={sb - h} color={cc} width={5} />
              <Ln x1={sx + k * sp} y1={sb} x2={sx + k * sp} y2={sb - h} color={cc} width={5} />
            </g>
          )
        })}
        <T x={sx} y={sb - carrier * U - 10} anchor="middle" size={12} color={C.muted}>carrier</T>
        {over && <T x={600} y={sb - 60} anchor="end" size={13} bold color={C.bad}>extra sidebands: splatter</T>}
      </Diagram>
      <Controls>
        <Slider label="Speech drive" value={g} min={0.3} max={1.6} step={0.05} onChange={setG}
          format={(v) => (v < 1 ? 'below full' : v <= 1.0001 ? 'full' : 'too much')} color="var(--d-signal)" />
        <Readout label="Bandwidth" value={over ? 'Excessive' : 'Normal'} color={over ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
