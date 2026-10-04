import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const VP = 15.6 // peak after the rectifier diodes: 12 V RMS secondary = 17.0 V peak, minus about 1.4 V for two diodes
const F = 60

/** Rectified AC and the reservoir capacitor: the capacitor refills at each peak and sags between them. */
export function PowerSupplies_Ripple() {
  const [uf, setUf] = useState(4700)
  const [amps, setAmps] = useState(1)
  const [mode, setMode] = useState<'full' | 'half'>('full')
  const C_F = uf * 1e-6
  const steps = 1800, T_END = 3 / F
  const dt = T_END / steps
  const raw: number[] = [], out: number[] = []
  let vc = 0
  for (let k = 0; k <= steps; k++) {
    const t = k * dt
    const s = Math.sin(TAU * F * t)
    const v = VP * (mode === 'full' ? Math.abs(s) : Math.max(0, s))
    vc = Math.max(0, vc - (amps * dt) / C_F)
    if (v > vc) vc = v
    raw.push(v)
    out.push(vc)
  }
  const last = out.slice(Math.floor((steps * 2) / 3))
  const ripple = Math.max(...last) - Math.min(...last)
  const fr = mode === 'full' ? 2 * F : F

  const x0 = 56, x1 = 600, y0 = 226, y1 = 52
  const gx = (k: number) => x0 + ((x1 - x0) * k) / steps
  const gy = (v: number) => y0 - (v / 18) * (y0 - y1)
  const line = (a: number[]) => a.map((v, k) => `${gx(k).toFixed(1)},${gy(v).toFixed(1)}`).join(' ')
  return (
    <>
      <Diagram w={640} h={292}
        title={`Rectified ${mode === 'full' ? 'full-wave' : 'half-wave'} voltage with a ${uf} microfarad reservoir capacitor supplying ${amps} amps. The output sags between peaks by about ${fmt(ripple, 3)} volts peak to peak, at ${fr} hertz.`}
        caption="Illustrative: 12 V RMS secondary, ideal diodes. The capacitor recharges at each peak, then supplies the load alone until the next.">
        <T x={x0} y={24} size={14} bold color={C.voltage}>Output voltage</T>
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1 - 14} color={C.muted} width={1.5} />
        {[0, 5, 10, 15].map((v) => <T key={v} x={x0 - 6} y={gy(v)} anchor="end" size={12} color={C.muted}>{`${v}`}</T>)}
        <T x={x1} y={y0 + 18} anchor="end" size={12} color={C.muted}>time: 3 mains cycles (50 ms)</T>
        <polyline points={line(raw)} fill="none" stroke={C.muted} strokeWidth={1.8} strokeDasharray="5 4" strokeLinejoin="round" />
        <polyline points={line(out)} fill="none" stroke={C.voltage} strokeWidth={3.2} strokeLinejoin="round" />
        <T x={x0 + 14} y={y0 + 18} size={12} color={C.muted}>dashed: rectifier output with no capacitor</T>
        <T x={320} y={272} anchor="middle" size={15} bold>{`Ripple ≈ ${fmt(ripple, 3)} V peak to peak, at ${fr} Hz`}</T>
      </Diagram>
      <Controls>
        <Choice label="Rectifier" value={mode} options={[{ value: 'full', label: 'Full-wave (bridge)' }, { value: 'half', label: 'Half-wave' }]} onChange={setMode} />
        <Slider label="Filter capacitor" value={uf} min={470} max={10000} step={470} onChange={setUf} format={(v) => `${v} µF`} color={C.signal} />
        <Slider label="Load current" value={amps} min={0.5} max={5} step={0.5} onChange={setAmps} format={(v) => `${v} A`} color={C.current} />
        <Readout label="Ripple (peak to peak)" value={fmt(ripple, 3)} unit="V" color={C.voltage} />
      </Controls>
    </>
  )
}
