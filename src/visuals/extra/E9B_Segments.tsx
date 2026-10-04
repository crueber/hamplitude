import { useState } from 'react'
import { C, Controls, Diagram, Slider, T } from '../kit'

/** Method of Moments: split the wire into segments, each with one uniform current. More segments follow the true current better. */
export function E9B_Segments() {
  const [n, setN] = useState(7)
  const x0 = 60, x1 = 580, cy = 190, amp = 95
  const w = (x1 - x0) / n
  const cur = (t: number) => Math.cos(Math.PI * (t - 0.5)) // current along a half-wave dipole, t = 0..1
  const smooth = Array.from({ length: 101 }, (_, i) => `${i ? 'L' : 'M'}${(x0 + (i / 100) * (x1 - x0)).toFixed(1)},${(cy - 22 - amp * cur(i / 100)).toFixed(1)}`).join('')
  const ok = n >= 10
  const col = ok ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={262} title={`A half-wave dipole divided into ${n} segments. Each segment carries one uniform current, shown as a step. With fewer than 10 segments per half wavelength the steps are coarse and the computed feed point impedance may be wrong.`}
        caption="Method of Moments: wire = a chain of short segments, each with one uniform current.">
        <path d={smooth} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        {Array.from({ length: n }, (_, i) => {
          const h = amp * cur((i + 0.5) / n)
          return (
            <g key={i}>
              <rect x={x0 + i * w} y={cy - 22 - h} width={w} height={h} fill={col} fillOpacity={0.28} stroke={col} strokeWidth={2} />
              <rect x={x0 + i * w} y={cy - 22} width={w} height={20} fill={C.fill} stroke={C.resist} strokeWidth={2} />
            </g>
          )
        })}
        <T x={x0} y={30} size={13} bold color={C.muted}>dashed = true current on the wire</T>
        <T x={x0} y={50} size={13} bold color={col}>steps = the model: one uniform current per segment</T>
        <T x={(x0 + x1) / 2} y={cy + 12} anchor="middle" size={13} color={C.muted}>wire (half wavelength long), {n} segments</T>
        <rect x={100} y={218} width={440} height={32} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
        <T x={320} y={234} anchor="middle" size={14} bold color={col}>{ok ? '10 or more segments: reliable' : 'Under 10 segments: feed point impedance may be wrong'}</T>
      </Diagram>
      <Controls>
        <Slider label="Segments per half wavelength" value={n} min={2} max={20} onChange={setN} format={(v) => `${v}`} color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
