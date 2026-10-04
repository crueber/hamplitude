import { useMemo, useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

// Schematic azimuth pattern, same total power for every count, so extra directors visibly squeeze the beam.
const N = 240
function build(dirs: number) {
  const n = 2 + 2.6 * dirs
  const raw = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * TAU
    return 0.1 + Math.pow(Math.max(0, Math.cos(a)), n)
  })
  const rms = Math.sqrt(raw.reduce((s, r) => s + r * r, 0) / N)
  return raw.map((r) => r / rms)
}

/** Yagi: reflector longer, driven ~1/2 wave, directors shorter. Add directors: gain up, beam narrower. */
export function G9C_YagiRoles() {
  const [dirs, setDirs] = useState(2)
  const r = useMemo(() => build(dirs), [dirs])
  const cx = 470, cy = 160, R0 = 34
  const d = r.map((v, i) => {
    const a = (i / N) * TAU
    return `${i ? 'L' : 'M'}${(cx + R0 * v * Math.cos(a)).toFixed(1)},${(cy - R0 * v * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const sp = 52, x0 = 50
  const els: { n: string; h: number; c: string }[] = [{ n: 'Reflector', h: 78, c: C.bad }, { n: 'Driven', h: 68, c: C.voltage }]
  for (let i = 0; i < dirs; i++) els.push({ n: dirs > 1 ? `D${i + 1}` : 'Director', h: 60 - i * 4, c: C.signal })
  const boomEnd = x0 + (els.length - 1) * sp
  return (
    <>
      <Diagram w={640} h={300} title={`Yagi with a reflector, a driven element and ${dirs} directors. The reflector is longest, the directors shortest. The pattern has a main lobe forward and a much weaker back lobe`}
        caption="Reflector longest, driven element about ½ λ, directors shortest. The beam points toward the directors.">
        <Ln x1={x0 - 14} y1={cy} x2={boomEnd + 14} y2={cy} color={C.muted} width={5} />
        {els.map((e, i) => (
          <g key={i}>
            <Ln x1={x0 + i * sp} y1={cy - e.h} x2={x0 + i * sp} y2={cy + e.h} color={e.c} width={6} />
            <T x={x0 + i * sp} y={cy + e.h + 18} anchor="middle" size={12} bold color={e.c}>{e.n}</T>
          </g>
        ))}
        <T x={x0 - 30} y={18} size={13} bold color={C.muted}>Seen from above</T>
        <Ln x1={boomEnd - 30} y1={50} x2={boomEnd + 40} y2={50} color={C.good} width={3} arrow />
        <T x={boomEnd + 50} y={50} size={13} bold color={C.good}>beam</T>

        <circle cx={cx} cy={cy} r={R0} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        <path d={d} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <T x={cx} y={20} anchor="middle" size={13} bold color={C.muted}>Pattern from above</T>
        <T x={cx + 20} y={cy - 48} size={13} bold color={C.good}>main lobe</T>
        <T x={cx - 6} y={cy + 52} anchor="end" size={13} bold color={C.bad}>back lobe</T>
        <T x={cx - 20} y={284} anchor="middle" size={13} bold color={C.power}>front-to-back ratio = main lobe ÷ back lobe</T>
      </Diagram>
      <Controls>
        <Slider label="Directors (longer boom)" value={dirs} min={1} max={5} step={1} onChange={setDirs} format={(v) => `${v}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
