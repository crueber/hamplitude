import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

type Pt = [number, number]

/** Low bands such as 160 m: by day the D layer absorbs them; a path entirely in darkness works. */
export function DarkPath() {
  const [dark, setDark] = useState(true)
  const { t, ref } = useTime(0.3)
  const pts: Pt[] = [[110, 224], [320, 76], [530, 224]]
  const f = t % 1.2 > 1 ? 1 : t % 1.2
  const l1 = Math.hypot(210, 148)
  let d = f * 2 * l1
  const dot: Pt = d <= l1 ? [110 + (210 * d) / l1, 224 - (148 * d) / l1] : (d -= l1, [320 + (210 * d) / l1, 76 + (148 * d) / l1])
  const col = dark ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref}
        title={dark ? 'At night the D layer is gone, so a 160 meter signal reaches the F layer and returns to a distant station' : 'By day the D layer absorbs low-band signals such as 160 meters, so they never make the trip'}
        caption="Schematic side view. 160 m favors paths in darkness.">
        <rect x={20} y={40} width={600} height={36} rx={8} fill={C.fill2} opacity={0.7} stroke={C.muted} strokeDasharray="5 5" />
        <T x={608} y={58} anchor="end" size={13} bold color={C.muted}>F layer</T>
        <rect x={20} y={150} width={600} height={30} rx={6} fill={dark ? 'none' : C.bad} fillOpacity={0.2} stroke={dark ? C.muted : C.bad} strokeWidth={1.5} strokeDasharray={dark ? '4 6' : undefined} />
        <T x={608} y={165} anchor="end" size={13} bold color={dark ? C.muted : C.bad}>{dark ? 'D layer: gone' : 'D layer: absorbs'}</T>
        <T x={30} y={20} size={15} bold color={dark ? C.signal : C.resist}>{dark ? 'Path entirely in darkness' : 'Path in sunlight'}</T>
        <rect x={20} y={240} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={110} y1={240} x2={110} y2={222} color={C.ink} width={3} />
        <Ln x1={530} y1={240} x2={530} y2={222} color={C.ink} width={3} />
        <T x={110} y={256} anchor="middle" size={13} bold>You</T>
        <T x={530} y={256} anchor="middle" size={13} bold>Distant station</T>
        <polyline points={dark ? pts.map((p) => p.join(',')).join(' ') : '110,224 194,165'} fill="none" stroke={col} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" opacity={dark ? 1 : 0.9} />
        {!dark && <T x={226} y={118} size={14} bold color={C.bad}>absorbed: nothing arrives</T>}
        {dark && <circle cx={dot[0]} cy={dot[1]} r={7} fill={col} stroke={C.bg} strokeWidth={2} />}
        {!dark && <circle cx={110 + 84 * Math.min(f / 0.5, 1)} cy={224 - 59 * Math.min(f / 0.5, 1)} r={7} fill={C.bad} stroke={C.bg} strokeWidth={2} />}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Path" value={dark ? 'd' : 's'} onChange={(v) => setDark(v === 'd')} options={[{ value: 's', label: 'Sunlit path' }, { value: 'd', label: 'Dark path' }]} />
      </div>
    </>
  )
}
