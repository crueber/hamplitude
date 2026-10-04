import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const RAD = Math.PI / 180

/** NVIS: steep rays return close by, filling the gap that low-angle skip leaves around the transmitter. */
export function Nvis() {
  const [nvis, setNvis] = useState(true)
  const cx = 320, gy = 250, ly = 110, h = gy - 18 - ly
  const angles = nvis ? [85, 72, 60] : [45]
  const rays = angles.flatMap((a) => {
    const half = h / Math.tan(a * RAD)
    return [-1, 1].map((s) => ({ a, s, half, pts: `${cx},${gy - 18} ${cx + s * half},${ly} ${cx + s * 2 * half},${gy - 18}` }))
  })
  return (
    <>
      <Diagram w={640} h={300}
        title={nvis ? 'Near vertical incidence skywave: high-angle rays are returned close to the transmitter, so coverage has no skip zone' : 'Low-angle skywave: the signal lands far away and leaves a skip zone around the transmitter'}
        caption="Schematic. High takeoff angle, short distance, no skip zone.">
        <rect x={20} y={ly - 14} width={600} height={28} rx={8} fill={C.power} fillOpacity={0.18} stroke={C.power} strokeDasharray="5 5" />
        <T x={608} y={ly - 28} anchor="end" size={13} bold color={C.power}>Ionosphere</T>
        <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        {nvis ? (
          <rect x={cx - 160} y={gy} width={320} height={30} rx={8} fill={C.good} fillOpacity={0.28} />
        ) : (
          <>
            <rect x={cx - 70} y={gy} width={140} height={30} rx={8} fill={C.good} fillOpacity={0.28} />
            <rect x={cx - 255} y={gy} width={185} height={30} fill={C.bad} fillOpacity={0.14} />
            <rect x={cx + 70} y={gy} width={185} height={30} fill={C.bad} fillOpacity={0.14} />
            <T x={cx - 162} y={gy + 15} anchor="middle" size={13} bold color={C.bad}>skip zone</T>
            <T x={cx + 162} y={gy + 15} anchor="middle" size={13} bold color={C.bad}>skip zone</T>
          </>
        )}
        {nvis ? <T x={cx} y={gy + 15} anchor="middle" size={13} bold color={C.good}>continuous coverage</T> : <T x={cx} y={gy + 15} anchor="middle" size={12} bold color={C.good}>ground wave</T>}
        {rays.map((r, i) => <polyline key={i} points={r.pts} fill="none" stroke={C.good} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />)}
        {!nvis && [-1, 1].map((s) => <Ln key={s} x1={cx + s * 255} y1={gy} x2={cx + s * 255} y2={gy - 18} color={C.ink} width={3} />)}
        <Ln x1={cx} y1={gy} x2={cx} y2={gy - 18} color={C.ink} width={4} />
        <T x={cx - 12} y={gy - 8} anchor="end" size={13} bold>TX</T>
        <T x={330} y={290} anchor="middle" size={14} bold color={nvis ? C.good : C.bad}>{nvis ? 'High angles come back close: no gap' : 'Low angle lands far away: gap near you'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Takeoff angle" value={nvis ? 'nvis' : 'low'} onChange={(v) => setNvis(v === 'nvis')} options={[{ value: 'low', label: 'Lower angle' }, { value: 'nvis', label: 'High angle (NVIS)' }]} />
      </div>
    </>
  )
}
