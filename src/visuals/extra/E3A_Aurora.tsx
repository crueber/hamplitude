import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Top-down polar view. A severe geomagnetic storm pushes the auroral oval south, where beams can reach it. */
export function Aurora() {
  const [storm, setStorm] = useState(true)
  const cx = 170, cy = 158, ro = storm ? 92 : 50
  const stations: [number, number][] = [[cx - 62, 262], [cx + 62, 262]]
  const hit: [number, number][] = storm ? [[cx - 20, cy + ro - 6], [cx + 20, cy + ro - 6]] : [[cx - 8, cy + 48], [cx + 8, cy + 48]]
  return (
    <>
      <Diagram w={640} h={300} title={storm ? 'During a severe geomagnetic storm the auroral oval expands toward the equator, and signals aimed north can scatter off it' : 'In quiet conditions the auroral oval stays near the pole and signals aimed north miss it'}
        caption="Looking down on the north polar region. Beams are aimed north at the aurora.">
        <circle cx={cx} cy={cy} r={124} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={ro} fill="none" stroke={C.good} strokeWidth={14} opacity={0.55} />
        <circle cx={cx} cy={cy} r={3} fill={C.ink} />
        <T x={cx} y={cy} anchor="middle" size={12} color={C.muted} dy={-14}>N pole</T>
        <T x={cx} y={14} anchor="middle" size={13} bold color={C.good}>auroral oval</T>
        {stations.map((s, i) => (
          <g key={i}>
            <Ln x1={s[0]} y1={s[1]} x2={hit[i][0]} y2={hit[i][1]} color={storm ? C.signal : C.bad} width={3} dash="2 6" arrow />
            <circle cx={s[0]} cy={s[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
          </g>
        ))}
        <T x={cx} y={286} anchor="middle" size={13} bold>Stations at mid-latitudes</T>
        <T x={340} y={50} size={16} bold color={storm ? C.good : C.bad}>{storm ? 'Severe geomagnetic storm' : 'Quiet geomagnetic field'}</T>
        <T x={340} y={78} size={14}>{storm ? 'The oval spreads toward the equator.' : 'The oval stays near the pole.'}</T>
        <T x={340} y={100} size={14}>{storm ? 'Beams aimed north reach it.' : 'Beams aimed north miss it.'}</T>
        <T x={340} y={150} size={15} bold color={C.power}>Best mode: CW</T>
        <T x={340} y={174} size={14}>The aurora smears the signal,</T>
        <T x={340} y={194} size={14}>so voice turns raspy and garbled.</T>
        <T x={340} y={218} size={14}>Slow, narrow CW still gets through.</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Conditions" value={storm ? 's' : 'q'} onChange={(v) => setStorm(v === 's')} options={[{ value: 'q', label: 'Quiet' }, { value: 's', label: 'Severe storm' }]} />
      </div>
    </>
  )
}
