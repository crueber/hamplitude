import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Lines, Slider, T } from '../kit'

// dB below peak at each angle (symmetric left/right), shaped like Figure E9-1
const KEY: [number, number][] = [[0, 0], [15, -1], [25, -3], [40, -6.5], [50, -9.5], [58, -14], [64, -23], [72, -18], [82, -14.5], [90, -14], [100, -15], [112, -20], [116, -23], [126, -19.5], [140, -18.5], [155, -18], [180, -18]]
const RING: [number, number][] = [[0, 1], [-3, 0.827], [-6, 0.704], [-12, 0.49], [-24, 0.258], [-40, 0.1]]

function dbAt(deg: number) {
  const a = Math.abs(((deg + 180) % 360) - 180)
  for (let i = 1; i < KEY.length; i++) {
    if (a <= KEY[i][0]) {
      const [a0, d0] = KEY[i - 1], [a1, d1] = KEY[i]
      const t = (1 - Math.cos(((a - a0) / (a1 - a0)) * Math.PI)) / 2
      return d0 + (d1 - d0) * t
    }
  }
  return -18
}
function radius(db: number) {
  for (let i = 1; i < RING.length; i++) {
    if (db >= RING[i][0]) {
      const [d0, r0] = RING[i - 1], [d1, r1] = RING[i]
      return r1 + ((db - d1) / (d0 - d1)) * (r0 - r1)
    }
  }
  return RING[RING.length - 1][1]
}

type Mode = 'plain' | 'bw' | 'fb' | 'fs'

/** How to read a free-space azimuth polar plot: 3 dB beamwidth, front-to-back and front-to-side, built to match the numbers in Figure E9-1. */
export function E9B_ReadPolar() {
  const [mode, setMode] = useState<Mode>('bw')
  const [probe, setProbe] = useState(40)
  const cx = 200, cy = 158, R = 128
  const P = (deg: number, db: number, extra = 0) => {
    const a = (deg * Math.PI) / 180, r = R * radius(db) + extra
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const
  }
  const d = Array.from({ length: 361 }, (_, i) => {
    const [x, y] = P(i, dbAt(i))
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join('') + 'Z'
  const rings = [0, -3, -6, -12, -24]
  const [px, py] = P(probe, dbAt(probe))
  const hi = (m: Mode) => mode === m
  const side = [
    { m: 'bw' as Mode, t: '3 dB beamwidth', s: ['Angle between the points where the', 'main lobe crosses the −3 ring:', '25° + 25° = 50°.'] },
    { m: 'fb' as Mode, t: 'Front-to-back', s: ['Peak (0 dB) minus the level at 180°:', '0 − (−18) = 18 dB.'] },
    { m: 'fs' as Mode, t: 'Front-to-side', s: ['Peak (0 dB) minus the level at 90°:', '0 − (−14) = 14 dB.'] },
  ]
  const cur = side.find((s) => s.m === mode)
  return (
    <>
      <Diagram w={640} h={330} title="A polar plot like Figure E9-1: rings are dB below the peak. The 3 dB beamwidth is 50 degrees, the front-to-back ratio 18 dB and the front-to-side ratio 14 dB."
        caption="Rings are dB below the peak. Read the ring the line crosses, then subtract.">
        {rings.map((db) => <circle key={db} cx={cx} cy={cy} r={R * radius(db)} fill="none" stroke={C.fill2} strokeWidth={db === 0 ? 2.5 : 1.5} />)}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
          const r = (a * Math.PI) / 180
          return <Ln key={a} x1={cx} y1={cy} x2={cx + R * Math.cos(r)} y2={cy - R * Math.sin(r)} color={C.fill2} width={1} />
        })}
        {[0, 30, 60, 90, 120, 150, 180, -150, -120, -90, -60, -30].map((a) => {
          const r = (a * Math.PI) / 180
          return <T key={a} x={cx + (R + 15) * Math.cos(r)} y={cy - (R + 15) * Math.sin(r)} anchor="middle" size={11} color={C.muted}>{a}°</T>
        })}
        <path d={d} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={cx} cy={cy} r={3} fill={C.ink} />
        {rings.slice(1).map((db) => <T key={db} x={cx + 3} y={cy - R * radius(db) - 7} size={11} bold color={C.muted} stroke={C.bg} strokeWidth={3} paintOrder="stroke">{db}</T>)}

        {hi('bw') && [25, -25].map((a) => { const [x, y] = P(a, -3); return <g key={a}><Ln x1={cx} y1={cy} x2={x} y2={y} color={C.resist} width={3} /><circle cx={x} cy={y} r={5} fill={C.resist} /></g> })}
        {hi('bw') && <T x={cx + R * 0.36} y={cy} anchor="middle" size={14} bold color={C.resist}>50°</T>}
        {hi('fb') && <>
          {(() => { const [x0, y0] = P(0, 0), [x1, y1] = P(180, -18); return <><circle cx={x0} cy={y0} r={6} fill={C.good} /><circle cx={x1} cy={y1} r={6} fill={C.bad} /><T x={x0 - 8} y={y0 + 18} anchor="end" size={12} bold color={C.good}>front 0 dB</T><T x={x1 - 6} y={y1 + 20} size={12} bold color={C.bad}>back −18 dB</T></> })()}
        </>}
        {hi('fs') && (() => { const [x0, y0] = P(0, 0), [x1, y1] = P(90, -14); return <><circle cx={x0} cy={y0} r={6} fill={C.good} /><circle cx={x1} cy={y1} r={6} fill={C.bad} /><T x={x0 - 8} y={y0 + 18} anchor="end" size={12} bold color={C.good}>front 0 dB</T><T x={x1 + 10} y={y1 - 4} size={12} bold color={C.bad}>side −14 dB</T></> })()}
        {mode === 'plain' && <>
          <Ln x1={cx} y1={cy} x2={px} y2={py} color={C.power} width={2.5} />
          <circle cx={px} cy={py} r={6} fill={C.power} />
        </>}

        <T x={380} y={34} size={13} bold color={C.muted}>Reading the plot</T>
        <T x={380} y={62} size={13} color={C.ink}>0 dB ring = peak of the main lobe.</T>
        <T x={380} y={84} size={13} color={C.ink}>Inner rings: weaker by that many dB.</T>
        <T x={380} y={106} size={13} color={C.ink}>Angle: 0° at right, counter-clockwise.</T>
        <rect x={376} y={130} width={254} height={96} rx={10} fill={C.fill} stroke={cur ? C.resist : C.muted} strokeWidth={2} />
        {cur ? <>
          <T x={388} y={150} size={14} bold color={C.resist}>{cur.t}</T>
          <Lines x={388} y={172} lh={17} size={12.5} lines={cur.s} />
        </> : <>
          <T x={388} y={150} size={14} bold color={C.power}>At {probe}°: {dbAt(probe).toFixed(1)} dB</T>
          <Lines x={388} y={172} lh={17} size={12.5} lines={['Drag the slider to probe any angle.', 'Bumps between notches are side lobes.']} />
        </>}
        <T x={380} y={262} size={12} color={C.muted}>Weak spots between lobes are nulls.</T>
        <T x={380} y={284} size={12} color={C.muted}>Schematic redraw approximating Figure E9-1.</T>
      </Diagram>
      <Controls>
        <Choice label="What to read" value={mode} onChange={setMode} options={[{ value: 'bw', label: '3 dB beamwidth' }, { value: 'fb', label: 'Front-to-back' }, { value: 'fs', label: 'Front-to-side' }, { value: 'plain', label: 'Probe angle' }]} />
        {mode === 'plain' && <Slider label="Angle" value={probe} min={0} max={180} step={1} onChange={setProbe} format={(v) => `${v}°`} color="var(--d-power)" />}
      </Controls>
    </>
  )
}
