import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/**
 * Pointing error against beamwidth, using a Gaussian main lobe: power loss in dB = 3.01 x (2 x error / beamwidth)^2.
 * Good inside the main lobe (a few dB); beyond that the real side-lobe structure decides.
 */
export function Rotators_Pointing() {
  const [bw, setBw] = useState(40)
  const [err, setErr] = useState(10)
  const x = (2 * err) / bw
  const loss = 3.0103 * x * x
  const off = x > 2 // beyond ~12 dB: outside the main lobe, model no longer applies
  const cx = 140, cy = 150, R = 100
  const lobe: string[] = []
  for (let a = -180; a <= 180; a += 1) {
    const P = Math.exp(-Math.LN2 * Math.pow((2 * a) / bw, 2))
    const r = R * Math.sqrt(P)
    const th = (a * Math.PI) / 180
    lobe.push(`${lobe.length ? 'L' : 'M'}${(cx + r * Math.cos(th)).toFixed(1)},${(cy - r * Math.sin(th)).toFixed(1)}`)
  }
  const e = (err * Math.PI) / 180
  const sx = cx + (R + 22) * Math.cos(e), sy = cy - (R + 22) * Math.sin(e)
  const rl = R * Math.sqrt(Math.exp(-Math.LN2 * x * x))
  return (
    <>
      <Diagram w={640} h={300} title={`A beam ${bw} degrees wide pointed ${err} degrees away from the station loses about ${off ? 'more than 12' : fmt(loss, 2)} dB`}
        caption="Narrow beams need accurate aiming; wide beams forgive it. Idealised single-lobe pattern, field-strength scale.">
        {[0.5, 1].map((k) => <circle key={k} cx={cx} cy={cy} r={R * k} fill="none" stroke={C.fill2} strokeWidth={1.5} />)}
        <path d={lobe.join('') + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={cx} y1={cy} x2={cx + R + 14} y2={cy} color={C.ink} width={2.5} arrow />
        <T x={cx + R + 22} y={cy + 14} size={12.5} color={C.muted}>beam</T>
        <Ln x1={cx} y1={cy} x2={sx} y2={sy} color={C.power} width={2.5} dash="6 4" />
        <circle cx={sx} cy={sy} r={7} fill={C.power} />
        <T x={sx} y={sy - 18} size={13} bold color={C.power} anchor="middle">station</T>
        <circle cx={cx + rl * Math.cos(e)} cy={cy - rl * Math.sin(e)} r={5} fill={C.bg} stroke={C.power} strokeWidth={2.5} />

        <T x={372} y={64} size={13} color={C.muted}>beamwidth (half power)</T>
        <T x={372} y={88} size={20} bold color={C.signal}>{bw}°</T>
        <T x={372} y={128} size={13} color={C.muted}>pointing error</T>
        <T x={372} y={152} size={20} bold color={C.power}>{err}°</T>
        <T x={372} y={192} size={13} color={C.muted}>signal lost</T>
        <T x={372} y={216} size={20} bold color={off ? C.bad : loss > 3 ? C.resist : C.good}>{off ? 'more than 12 dB' : `${fmt(loss, 2)} dB`}</T>
        <T x={372} y={246} size={12.5} color={C.muted}>{off ? 'outside the main lobe: side lobes decide' : loss > 3 ? 'past the half-power point' : 'inside the half-power point'}</T>
      </Diagram>
      <Controls>
        <Slider label="Beamwidth" value={bw} min={5} max={90} step={5} onChange={setBw} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Slider label="Pointing error" value={err} min={0} max={40} step={1} onChange={setErr} format={(v) => `${v}°`} color="var(--d-power)" />
        <Readout label="Loss" value={off ? '>12' : fmt(loss, 2)} unit=" dB" color="var(--d-bad)" />
      </Controls>
    </>
  )
}
