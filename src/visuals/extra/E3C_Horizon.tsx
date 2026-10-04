import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const K = Math.sqrt(4 / 3) // radio horizon: refraction acts like a 4/3-radius Earth

/** Radio horizon is about 15% beyond the geometric horizon. d(mi) = 1.22*sqrt(h ft); radio: 1.41*sqrt(h). */
export function Horizon() {
  const [h, setH] = useState(100)
  const geo = 1.22 * Math.sqrt(h)
  const rad = geo * K
  const x0 = 70, R = 1400, y0 = 96
  const hp = (h / 1000) * 62 + 8
  const g = (s: number) => y0 + (s * s) / (2 * R)
  const st = Math.sqrt(2 * R * hp), sr = st * K
  const earth = `M0,${g(-x0)} ` + Array.from({ length: 65 }, (_, i) => `L${i * 10},${g(i * 10 - x0).toFixed(1)}`).join('') + ' L640,400 L0,400 Z'
  const top: [number, number] = [x0, y0 - hp]
  const T1: [number, number] = [x0 + st, g(st)]
  const T2: [number, number] = [x0 + sr, g(sr)]
  const Q: [number, number] = [x0 + sr * 0.55, y0 - hp + (g(sr) - (y0 - hp)) * 0.55 - 12]
  const bx = 150, bw = 460, max = 1.41 * Math.sqrt(1000)
  return (
    <>
      <Diagram w={640} h={330} title={`With the antenna ${h} feet up, the geometric horizon is about ${geo.toFixed(0)} miles and the radio horizon about ${rad.toFixed(0)} miles, roughly 15 percent farther`}
        caption="Top: exaggerated side view. Bottom: distances in miles from d = 1.22 × √height (geometric) and 1.41 × √height (radio).">
        <clipPath id="hzclip"><rect x={0} y={0} width={640} height={206} /></clipPath>
        <path d={earth} fill={C.fill} stroke={C.muted} strokeWidth={2} clipPath="url(#hzclip)" />
        <Ln x1={x0} y1={y0} x2={x0} y2={top[1]} color={C.ink} width={4} />
        <Ln x1={top[0]} y1={top[1]} x2={T1[0]} y2={T1[1]} color={C.ink} width={2.5} dash="6 6" />
        <path d={`M${top[0]},${top[1]} Q${Q[0]},${Q[1]} ${T2[0]},${T2[1]}`} fill="none" stroke={C.signal} strokeWidth={3.5} />
        <circle cx={T1[0]} cy={T1[1]} r={6} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <circle cx={T2[0]} cy={T2[1]} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={x0 + 10} y={top[1] - 14} size={13} bold>antenna</T>
        <T x={T1[0] - 8} y={T1[1] + 22} anchor="end" size={13} bold>geometric horizon</T>
        <T x={T2[0] + 14} y={T2[1] - 20} size={13} bold color={C.signal}>radio horizon</T>
        {[{ n: 'Geometric (visual)', v: geo, c: C.ink, y: 236 }, { n: 'Radio', v: rad, c: C.signal, y: 280 }].map((b) => (
          <g key={b.n}>
            <T x={20} y={b.y} size={13} bold color={b.c}>{b.n}</T>
            <rect x={bx} y={b.y - 11} width={(b.v / max) * bw} height={22} rx={4} fill={b.c} fillOpacity={0.25} stroke={b.c} strokeWidth={2} />
            <T x={bx + (b.v / max) * bw + 8} y={b.y} size={13} bold color={b.c}>{`${b.v.toFixed(1)} mi`}</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Slider label="Antenna height" value={h} min={10} max={1000} step={10} onChange={setH} format={(v) => `${v} ft`} color="var(--d-signal)" />
        <Readout label="Radio ÷ geometric" value={(rad / geo).toFixed(2)} unit="× (about 15% farther)" color="var(--d-power)" />
      </Controls>
    </>
  )
}
