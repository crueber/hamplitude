import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, useTime } from '../kit'

/** A wave entering a medium: speed = c ÷ n, wavelength shrinks, frequency stays the same. */
export function Index() {
  const [n, setN] = useState(1.5)
  const { t, ref } = useTime(0.6)
  const x0 = 30, x1 = 610, xb = 300, cy = 120, A = 46
  const lam = 90
  const pts: string[] = []
  let phi = 0
  for (let x = x0; x <= x1; x += 2) {
    phi += (TAU / (x < xb ? lam : lam / n)) * 2
    pts.push(`${x === x0 ? 'M' : 'L'}${x},${(cy - A * Math.sin(phi - t * TAU)).toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={240} svgRef={ref}
        title="A wave passes from air into a medium with index of refraction n. Its speed and wavelength both drop by a factor of n, while its frequency stays the same"
        caption="Same frequency on both sides. The medium sets how fast the wave travels.">
        <rect x={xb} y={40} width={x1 - xb + 10} height={134} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={1.5} strokeDasharray="5 5" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <T x={x0} y={24} size={14} bold>Air or vacuum</T>
        <T x={xb + 12} y={24} size={14} bold color={C.power}>{`Medium, n = ${n.toFixed(1)}`}</T>
        <T x={x0} y={196} size={13} color={C.muted}>speed c</T>
        <T x={x0} y={216} size={13} color={C.muted}>long wavelength</T>
        <T x={xb + 12} y={196} size={13} bold color={C.power}>{`speed c ÷ ${n.toFixed(1)}`}</T>
        <T x={xb + 12} y={216} size={13} color={C.muted}>shorter wavelength</T>
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1} dash="3 5" />
      </Diagram>
      <Controls>
        <Slider label="Index of refraction, n" value={n} min={1} max={2.5} step={0.1} onChange={setN} format={(v) => v.toFixed(1)} color="var(--d-power)" />
        <Readout label="Speed" value={(100 / n).toFixed(0)} unit="% of c" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
