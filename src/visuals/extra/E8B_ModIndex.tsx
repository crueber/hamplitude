import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

/** FM index = deviation / modulating frequency. Deviation ratio = max deviation / highest modulating frequency. */
export function ModIndex({ ratio = false }: { ratio?: boolean }) {
  const [dev, setDev] = useState(ratio ? 5 : 3)
  const [fm, setFm] = useState(ratio ? 3 : 1)
  const idx = dev / fm
  const x0 = 60, x1 = 470, cy = 100, A = 7.5
  const N = 300
  const cycles = fm * 2
  const pts: string[] = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    pts.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(cy - A * dev * Math.sin(TAU * cycles * u)).toFixed(1)}`)
  }
  const dn = ratio ? 'max deviation' : 'deviation'
  const fn = ratio ? 'highest modulating freq' : 'modulating freq'
  return (
    <>
      <Diagram w={640} h={236} title={`Frequency of an FM signal swinging ${dev} kilohertz either side of the carrier at ${fm} kilohertz. ${ratio ? 'Deviation ratio' : 'Modulation index'} is ${fmt(dev, 3)} divided by ${fmt(fm, 3)}, which is ${fmt(idx, 3)}.`}
        caption="Bigger swing or slower modulating tone = bigger index.">
        <T x={14} y={12} size={13} bold color={C.muted}>Carrier frequency over time</T>
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={cy - A * dev} x2={x1} y2={cy - A * dev} color={C.resist} width={1.5} dash="4 4" />
        <Ln x1={x0} y1={cy + A * dev} x2={x1} y2={cy + A * dev} color={C.resist} width={1.5} dash="4 4" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x1 + 10} y={cy} size={12.5} color={C.muted}>carrier</T>
        <T x={x1 + 10} y={cy - A * dev - 1} size={12.5} bold color={C.resist}>+{fmt(dev)} kHz</T>
        <T x={x1 + 10} y={cy + A * dev + 1} size={12.5} bold color={C.resist}>−{fmt(dev)} kHz</T>
        <T x={x0} y={208} size={15} bold>
          <tspan fill={C.resist}>{dn} {fmt(dev)}</tspan>
          <tspan fill={C.muted}> ÷ </tspan>
          <tspan fill={C.signal}>{fn} {fmt(fm)}</tspan>
          <tspan fill={C.ink}> = {fmt(idx, 3)}</tspan>
        </T>
        <T x={x0} y={228} size={12.5} color={C.muted}>{ratio ? 'deviation ratio' : 'modulation index'} (kHz over kHz: no unit)</T>
      </Diagram>
      <Controls>
        <Slider label={ratio ? 'Maximum deviation (either side)' : 'Frequency deviation (either side)'} value={dev} min={0.5} max={10} step={0.5} onChange={setDev} format={(v) => `±${fmt(v)} kHz`} color="var(--d-resist)" />
        <Slider label={ratio ? 'Highest modulating frequency' : 'Modulating frequency'} value={fm} min={0.5} max={4} step={0.5} onChange={setFm} format={(v) => `${fmt(v)} kHz`} color="var(--d-signal)" />
        <Readout label={ratio ? 'Deviation ratio' : 'Modulation index'} value={fmt(idx, 3)} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
