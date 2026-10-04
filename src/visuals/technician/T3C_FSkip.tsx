import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

/** 10 m skip via the F region works best by day, near the sunspot peak. */
export function FSkip() {
  const [spots, setSpots] = useState<'low' | 'high'>('high')
  const [time, setTime] = useState<'day' | 'night'>('day')
  const { t, ref } = useTime(0.3)
  const best = spots === 'high' && time === 'day'
  const col = best ? C.good : C.bad
  const pts: [number, number][] = best ? [[110, 230], [320, 92], [530, 230]] : [[110, 230], [320, 92], [400, 38]]
  const phase = t % 1.2 > 1 ? 1 : t % 1.2
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = phase * (segs[0] + segs[1])
  let dot = pts[2]
  for (let i = 0; i < 2; i++) {
    if (d <= segs[i]) { dot = [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * d) / segs[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * d) / segs[i]]; break }
    d -= segs[i]
  }
  return (
    <>
      <Diagram w={640} h={290} svgRef={ref}
        title={best ? 'By day near the sunspot peak the F region is strongly ionized and bends 10 metre signals back to Earth' : 'At night or at low sunspot activity the F region is weak and 10 metre signals pass through'}
        caption="Schematic. More sunlight and more sunspots make a denser F region.">
        <rect x={20} y={62} width={600} height={46} rx={10} fill={C.power} opacity={best ? 0.3 : 0.08} stroke={C.power} strokeDasharray="5 5" />
        <T x={608} y={78} anchor="end" bold size={14} color={C.power}>F region</T>
        <T x={608} y={96} anchor="end" size={12} color={C.muted}>{best ? 'dense' : 'thin'}</T>
        <circle cx={60} cy={38} r={time === 'day' ? 14 : 11} fill={time === 'day' ? C.resist : C.fill2} stroke={time === 'day' ? C.resist : C.muted} strokeWidth={2} />
        <T x={86} y={38} size={13} color={C.muted}>{time === 'day' ? 'sunlit' : 'dark'}</T>
        <rect x={20} y={250} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={110} y1={250} x2={110} y2={230} color={C.ink} width={3} />
        <Ln x1={530} y1={250} x2={530} y2={230} color={C.ink} width={3} />
        <T x={110} y={265} anchor="middle" size={13} bold>10 m station</T>
        <T x={530} y={265} anchor="middle" size={13} bold>Distant station</T>
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx={dot[0]} cy={dot[1]} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
        <T x={320} y={170} anchor="middle" bold size={15} color={col}>{best ? '10 m skip: best' : '10 m passes through: poor'}</T>
      </Diagram>
      <div style={{ display: 'grid', gap: 8, margin: '-6px 0 14px' }}>
        <Choice label="Sunspot activity" value={spots} onChange={setSpots} options={[{ value: 'low', label: 'Low sunspots' }, { value: 'high', label: 'High sunspots' }]} />
        <Choice label="Time" value={time} onChange={setTime} options={[{ value: 'day', label: 'Dawn to after sunset' }, { value: 'night', label: 'After sunset to dawn' }]} />
      </div>
    </>
  )
}
