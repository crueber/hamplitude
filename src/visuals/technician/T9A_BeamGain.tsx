import { useMemo, useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T, TAU } from '../kit'

type K = 'iso' | 'dipole' | 'yagi'

// Schematic azimuth patterns (field magnitude), scaled so every antenna radiates the same total power:
// gain is power squeezed into one direction, not power added.
const field: Record<K, (a: number) => number> = {
  iso: () => 1,
  dipole: (a) => (Math.abs(Math.cos(a)) < 1e-3 ? 0 : Math.abs(Math.cos((Math.PI / 2) * Math.sin(a)) / Math.cos(a))),
  yagi: (a) => 0.1 + Math.pow(Math.max(0, Math.cos(a)), 4) + (Math.abs(a - Math.PI) < 0.5 ? 0.05 : 0),
}
const N = 240
function build(k: K) {
  const raw = Array.from({ length: N }, (_, i) => field[k]((i / N) * TAU))
  const mean = Math.sqrt(raw.reduce((s, r) => s + r * r, 0) / N)
  return raw.map((r) => r / mean)
}

export function BeamGain() {
  const [k, setK] = useState<K>('yagi')
  const r = useMemo(() => build(k), [k])
  const cx = 150, cy = 150, R0 = 50
  const d = r.map((v, i) => {
    const a = (i / N) * TAU
    return `${i ? 'L' : 'M'}${(cx + R0 * v * Math.cos(a)).toFixed(1)},${(cy - R0 * v * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const ex = 455
  const elems = k === 'yagi'
    ? [{ x: ex - 90, h: 52, n: 'Reflector', c: C.bad }, { x: ex - 30, h: 46, n: 'Driven', c: C.voltage }, { x: ex + 30, h: 40, n: 'Director', c: C.signal }, { x: ex + 90, h: 36, n: 'Director', c: C.signal }]
    : k === 'dipole' ? [{ x: ex, h: 56, n: 'Half-wave dipole', c: C.voltage }] : []
  const desc = { iso: 'Reference only: equal in every direction', dipole: 'Strongest broadside, weak off the ends', yagi: 'Concentrated toward the directors' }[k]
  return (
    <>
      <Diagram w={640} h={300} title={`Pattern of a ${k === 'iso' ? 'isotropic radiator' : k === 'dipole' ? 'dipole' : 'Yagi beam'} compared with an isotropic reference circle`}
        caption="Dashed circle = isotropic reference. Same power in each case: gain is signal moved into one direction, not power added.">
        <circle cx={cx} cy={cy} r={R0} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 5" />
        <path d={d} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={cx} cy={cy} r={4} fill={C.ink} />
        {k !== 'iso' && <Ln x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} color={C.voltage} width={3} />}
        <T x={cx} y={20} anchor="middle" size={13} color={C.muted}>Seen from above</T>
        <T x={cx} y={286} anchor="middle" size={12} color={C.muted}>dashed = isotropic reference</T>
        {k === 'iso' && <circle cx={ex} cy={cy} r={9} fill={C.voltage} />}
        {k === 'iso' && <T x={ex} y={cy + 30} anchor="middle" size={14} bold color={C.voltage}>Isotropic (theory only)</T>}
        {elems.length > 0 && <Ln x1={elems[0].x} y1={cy} x2={elems[elems.length - 1].x} y2={cy} color={C.muted} width={4} />}
        {elems.map((e, i) => (
          <g key={i}>
            <Ln x1={e.x} y1={cy - e.h} x2={e.x} y2={cy + e.h} color={e.c} width={6} />
            <T x={e.x} y={cy + e.h + 20} anchor="middle" size={12} bold color={e.c}>{e.n}</T>
          </g>
        ))}
        {k === 'yagi' && <Ln x1={ex - 70} y1={cy - 90} x2={ex + 100} y2={cy - 90} color={C.good} width={3} arrow />}
        {k === 'yagi' && <T x={ex + 15} y={cy - 108} anchor="middle" size={13} bold color={C.good}>beam points this way</T>}
        <T x={ex} y={262} anchor="middle" size={14} color={C.ink}>{desc}</T>
      </Diagram>
      <Controls>
        <Choice label="Antenna" value={k} onChange={setK} options={[{ value: 'iso', label: 'Isotropic' }, { value: 'dipole', label: 'Dipole' }, { value: 'yagi', label: 'Yagi beam' }]} />
      </Controls>
    </>
  )
}
