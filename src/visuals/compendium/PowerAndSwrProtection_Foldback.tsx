import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Illustrative foldback shape: full power to 1.5:1, then falling to nothing at 3.5:1 (thresholds vary by radio). */
function allowed(s: number): number {
  if (s <= 1.5) return 1
  if (s >= 3.5) return 0
  return 1 - (s - 1.5) / 2
}

/** SWR protection: as SWR rises the radio cuts its output; the mismatch also reflects part of what remains. */
export function PowerAndSwrProtection_Foldback() {
  const [swr, setSwr] = useState(2.5)
  const rated = 100
  const a = allowed(swr)
  const out = rated * a
  const g = (swr - 1) / (swr + 1)
  const refl = out * g * g
  const x0 = 70, x1 = 610, y0 = 200, y1 = 30
  const sx = (s: number) => x0 + ((s - 1) / 4) * (x1 - x0)
  const sy = (p: number) => y0 - p * (y0 - y1)
  const pts: string[] = []
  for (let i = 0; i <= 80; i++) {
    const s = 1 + (4 * i) / 80
    pts.push(`${i ? 'L' : 'M'}${sx(s).toFixed(1)},${sy(allowed(s)).toFixed(1)}`)
  }
  const col = a > 0.9 ? C.good : a > 0.5 ? C.resist : C.bad
  return (
    <>
      <Diagram w={640} h={270} title={`Foldback: at an SWR of ${swr.toFixed(1)} to 1 this example radio allows ${out.toFixed(0)} watts of its ${rated} watts`}
        caption="Illustrative curve for a 100 W radio. Where protection starts and how steeply it cuts varies by radio.">
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} color={C.muted} width={1.5} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1 - 6} color={C.muted} width={1.5} />
        {[1, 2, 3, 4, 5].map((s) => (
          <g key={s}>
            <Ln x1={sx(s)} y1={y0} x2={sx(s)} y2={y0 + 6} color={C.muted} width={1.5} />
            <T x={sx(s)} y={y0 + 20} anchor="middle" size={12} color={C.muted}>{`${s}:1`}</T>
          </g>
        ))}
        {[0, 0.5, 1].map((p) => (
          <g key={p}>
            <Ln x1={x0 - 6} y1={sy(p)} x2={x0} y2={sy(p)} color={C.muted} width={1.5} />
            <T x={x0 - 10} y={sy(p)} anchor="end" size={12} color={C.muted}>{`${p * rated} W`}</T>
          </g>
        ))}
        <T x={x1} y={y0 + 42} anchor="end" size={13} bold color={C.muted}>SWR seen by the radio</T>
        <T x={x0 + 8} y={y1 - 14} size={13} bold color={C.muted}>Output the radio allows</T>
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={sx(swr)} y1={y0} x2={sx(swr)} y2={sy(a)} color={col} width={2} dash="4 4" />
        <circle cx={sx(swr)} cy={sy(a)} r={8} fill={col} stroke={C.bg} strokeWidth={2} />
      </Diagram>
      <Controls>
        <Slider label="SWR at the radio" value={swr} min={1} max={5} step={0.1} onChange={setSwr} format={(v) => `${v.toFixed(1)}:1`} color="var(--d-signal)" />
        <Readout label="Output allowed" value={out.toFixed(0)} unit=" W" color={col} />
        <Readout label="Reflected at the mismatch" value={refl.toFixed(1)} unit=" W" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
