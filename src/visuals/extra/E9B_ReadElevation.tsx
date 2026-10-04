import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Lines, T } from '../kit'

export const E9B_H = 1.916 // antenna height in wavelengths that puts the lowest lobe at 7.5°
const RING: [number, number][] = [[0, 1], [-10, 0.617], [-20, 0.383], [-30, 0.215], [-40, 0.105], [-60, 0.02]]
export function elevField(deg: number, h: number) {
  const t = (deg * Math.PI) / 180
  if (deg <= 90) return Math.abs(Math.sin(2 * Math.PI * h * Math.sin(t))) * Math.pow(Math.max(0, Math.cos(t)), 1.3)
  const f = Math.PI - t
  return Math.sin(f > 0 ? Math.PI / 2 - f : Math.PI / 2) * (0.04 + 0.02 * Math.abs(Math.sin(2 * Math.PI * h * Math.sin(f))))
}
const radius = (db: number) => {
  for (let i = 1; i < RING.length; i++) if (db >= RING[i][0]) { const [d0, r0] = RING[i - 1], [d1, r1] = RING[i]; return r1 + ((db - d1) / (d0 - d1)) * (r0 - r1) }
  return 0.02
}

type Mode = 'type' | 'peak' | 'fb'

/** Reading an elevation plot like Figure E9-2: 0° is the horizon, 90° straight up, only the upper half exists. */
export function E9B_ReadElevation() {
  const [mode, setMode] = useState<Mode>('peak')
  const cx = 205, cy = 258, R = 165
  const P = (deg: number, db: number) => { const a = (deg * Math.PI) / 180, r = R * radius(db); return [cx + r * Math.cos(a), cy - r * Math.sin(a)] as const }
  const peak = Math.max(...Array.from({ length: 1801 }, (_, i) => elevField(i / 10, E9B_H)))
  const dbOf = (deg: number) => 20 * Math.log10(Math.max(elevField(deg, E9B_H), 1e-4) / peak)
  const d = Array.from({ length: 721 }, (_, i) => { const a = i / 4, [x, y] = P(a, dbOf(a)); return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}` }).join('')
  const rings = [0, -10, -20, -30, -40]
  const [kx, ky] = P(7.5, 0)
  const [bx, by] = P(180, dbOf(180))
  const tx = 412
  const text = {
    type: { t: 'Elevation or azimuth?', l: ['Half circle, angles 0° to', '180°, ground below:', 'an elevation plot.'] },
    peak: { t: 'Peak response angle', l: ['Find the longest lobe, read', 'its angle: the lowest', 'lobe peaks at 7.5°.'] },
    fb: { t: 'Front-to-back ratio', l: ['Front: 0 dB at the peak.', 'Back: about −28 dB at 180°.', '0 − (−28) = 28 dB.'] },
  }[mode]
  return (
    <>
      <Diagram w={640} h={300} title="An elevation pattern over real ground like Figure E9-2: several lobes above the horizon. The lowest lobe peaks at 7.5 degrees elevation, and the front-to-back ratio is 28 dB."
        caption="Elevation plot: 0° is the horizon, 90° is straight up. The ground blocks the lower half.">
        {rings.map((db) => <path key={db} d={`M${cx + R * radius(db)},${cy} A${R * radius(db)},${R * radius(db)} 0 0 0 ${cx - R * radius(db)},${cy}`} fill="none" stroke={C.fill2} strokeWidth={db === 0 ? 2.5 : 1.5} />)}
        {[0, 30, 60, 90, 120, 150, 180].map((a) => { const r = (a * Math.PI) / 180; return <Ln key={a} x1={cx} y1={cy} x2={cx + R * Math.cos(r)} y2={cy - R * Math.sin(r)} color={C.fill2} width={1} /> })}
        {[0, 30, 60, 90, 120, 150, 180].map((a) => { const r = (a * Math.PI) / 180; return <T key={a} x={cx + (R + 16) * Math.cos(r)} y={cy - (R + 14) * Math.sin(r) - (a % 180 === 0 ? 12 : 0)} anchor="middle" size={11} color={C.muted}>{a}°</T> })}
        {rings.filter((db) => db > -40).map((db) => <T key={db} x={cx + R * radius(db)} y={cy + 14} anchor="middle" size={11} bold color={C.muted}>{db === 0 ? '0 dB' : db}</T>)}
        <Ln x1={cx - R - 4} y1={cy} x2={cx + R + 4} y2={cy} color={C.resist} width={4} />
        <T x={cx} y={cy + 36} anchor="middle" size={12} bold color={C.resist}>ground</T>
        <path d={d} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        {mode === 'peak' && <><Ln x1={cx} y1={cy} x2={kx} y2={ky} color={C.power} width={2.5} /><circle cx={kx} cy={ky} r={5} fill={C.power} /><T x={kx - 8} y={ky - 16} anchor="end" size={13} bold color={C.power} stroke={C.bg} strokeWidth={4} paintOrder="stroke">7.5°</T></>}
        {mode === 'fb' && <><circle cx={kx} cy={ky} r={5} fill={C.good} /><T x={kx + 6} y={ky - 24} anchor="end" size={12} bold color={C.good} stroke={C.bg} strokeWidth={4} paintOrder="stroke">front 0 dB</T><circle cx={bx} cy={by} r={5} fill={C.bad} /><T x={bx - 6} y={by - 20} anchor="end" size={12} bold color={C.bad} stroke={C.bg} strokeWidth={4} paintOrder="stroke">back −28</T></>}
        <rect x={tx - 6} y={60} width={216} height={110} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
        <T x={tx + 6} y={82} size={14} bold color={C.resist}>{text.t}</T>
        <Lines x={tx + 6} y={108} lh={19} size={13} lines={text.l} />
        <T x={tx} y={206} size={12} color={C.muted}>Dips between lobes are nulls.</T>
        <T x={tx} y={228} size={12} color={C.muted}>Schematic redraw approximating</T>
        <T x={tx} y={244} size={12} color={C.muted}>Figure E9-2.</T>
      </Diagram>
      <Controls>
        <Choice label="What to read" value={mode} onChange={setMode} options={[{ value: 'type', label: 'Type of plot' }, { value: 'peak', label: 'Peak angle' }, { value: 'fb', label: 'Front-to-back' }]} />
      </Controls>
    </>
  )
}
