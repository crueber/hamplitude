import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

/** Top-down globe: the short path and the long path are the two ways round the same great circle. */
export function LongPath() {
  const [long, setLong] = useState(false)
  const cx = 215, cy = 150, R = 104
  const pt = (deg: number, r = R): [number, number] => [cx + r * Math.sin((deg * Math.PI) / 180), cy - r * Math.cos((deg * Math.PI) / 180)]
  const a = 210, b = 320 // two stations, 110° apart the short way
  const arc = (from: number, to: number, r = R + 10) => {
    const p = pt(from, r), q = pt(to, r)
    const large = Math.abs(to - from) > 180 ? 1 : 0
    return `M${p[0]},${p[1]} A${r},${r} 0 ${large} 1 ${q[0]},${q[1]}`
  }
  const A = pt(a), B = pt(b)
  return (
    <>
      <Diagram w={640} h={310} title="Looking down on the globe, a great circle joins two stations two ways: the short path, and the long path the other way round. Together they make a full trip around the world, about 24,900 miles"
        caption="Looking down on the globe. Same great circle, opposite directions.">
        <circle cx={cx} cy={cy} r={R} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <path d={arc(a, b)} fill="none" stroke={long ? C.muted : C.good} strokeWidth={long ? 3 : 6} strokeDasharray={long ? '4 6' : undefined} strokeLinecap="round" />
        <path d={arc(b, a + 360)} fill="none" stroke={long ? C.good : C.muted} strokeWidth={long ? 6 : 3} strokeDasharray={long ? undefined : '4 6'} strokeLinecap="round" />
        <circle cx={A[0]} cy={A[1]} r={8} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <circle cx={B[0]} cy={B[1]} r={8} fill={C.ink} stroke={C.bg} strokeWidth={2} />
        <T x={A[0] - 14} y={A[1] + 24} anchor="end" size={14} bold>You</T>
        <T x={B[0] - 14} y={B[1] - 22} anchor="end" size={14} bold>Distant station</T>
        <T x={cx} y={cy} anchor="middle" size={13} color={C.muted}>Earth from above</T>
        <T x={400} y={70} size={17} bold color={C.good}>{long ? 'Long path' : 'Short path'}</T>
        <T x={400} y={100} size={14}>{long ? 'The other way round the world:' : 'The direct way, the shorter arc:'}</T>
        <T x={400} y={122} size={14}>{long ? 'over 12,450 miles.' : 'under half the way round.'}</T>
        <T x={400} y={170} size={14} bold color={C.power}>Short + long = 24,900 mi</T>
        <T x={400} y={210} size={14}>Most frequent on</T>
        <T x={400} y={234} size={16} bold color={C.signal}>40 m and 20 m</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Path" value={long ? 'l' : 's'} onChange={(v) => setLong(v === 'l')} options={[{ value: 's', label: 'Short path' }, { value: 'l', label: 'Long path' }]} />
      </div>
    </>
  )
}
