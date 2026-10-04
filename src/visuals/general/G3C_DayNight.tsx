import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

type Pt = [number, number]
function along(pts: Pt[], f: number): Pt {
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = f * segs.reduce((a, b) => a + b, 0)
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) { const k = d / segs[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k] }
    d -= segs[i]
  }
  return pts[pts.length - 1]
}

/** By day the D region absorbs low HF bands; at night it fades and the F region returns them. */
export function DayNight() {
  const [night, setNight] = useState(false)
  const { t, ref } = useTime(0.3)
  const ph = t % 1.3 > 1 ? 1 : t % 1.3
  const gy = 250
  const low: Pt[] = night ? [[90, gy - 18], [210, 84], [330, gy - 18]] : [[90, gy - 18], [150, 186]]
  const hi: Pt[] = [[90, gy - 18], [330, 84], [570, gy - 18]]
  return (
    <>
      <Diagram w={640} h={310} svgRef={ref}
        title={night ? 'At night the D region disappears, so 40, 60, 80 and 160 metre signals reach the F region and are returned to Earth' : 'By day the D region absorbs 40, 60, 80 and 160 metre signals before they reach the F region, while 20 metres and higher pass through it'}
        caption="Schematic. The D region fades after sunset.">
        <rect x={20} y={70} width={600} height={30} rx={8} fill={C.power} fillOpacity={0.2} stroke={C.power} strokeDasharray="5 5" />
        <T x={608} y={85} anchor="end" size={14} bold color={C.power}>{night ? 'F region' : 'F1 and F2'}</T>
        <rect x={20} y={128} width={600} height={22} rx={8} fill={C.current} fillOpacity={night ? 0.06 : 0.16} stroke={C.current} strokeDasharray="5 5" strokeOpacity={night ? 0.5 : 1} />
        <T x={608} y={139} anchor="end" size={13} bold color={C.current}>E region{night ? ' (weak)' : ''}</T>
        <rect x={20} y={166} width={600} height={34} rx={8} fill={C.resist} fillOpacity={night ? 0.03 : 0.3} stroke={C.resist} strokeDasharray={night ? '2 7' : '5 5'} strokeOpacity={night ? 0.5 : 1} />
        <T x={night ? 450 : 330} y={183} anchor="middle" size={14} bold color={night ? C.muted : C.resist}>{night ? 'D region: gone' : 'D region: absorbs'}</T>
        <circle cx={60} cy={34} r={night ? 11 : 15} fill={night ? C.fill2 : C.resist} fillOpacity={night ? 1 : 0.5} stroke={night ? C.muted : C.resist} strokeWidth={2} />
        <T x={90} y={34} size={14} bold color={C.muted}>{night ? 'night' : 'daylight'}</T>
        <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={90} y1={gy} x2={90} y2={gy - 18} color={C.ink} width={3} />
        <polyline points={low.map((p) => p.join(',')).join(' ')} fill="none" stroke={night ? C.good : C.bad} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={along(low, ph)[0]} cy={along(low, ph)[1]} r={7} fill={night ? C.good : C.bad} stroke={C.bg} strokeWidth={2} />
        {!night && <T x={150} y={204} anchor="middle" size={20} bold color={C.bad} stroke={C.bg} strokeWidth={4} paintOrder="stroke">X</T>}
        {night ? <Ln x1={330} y1={gy} x2={330} y2={gy - 18} color={C.ink} width={3} /> : (
          <>
            <polyline points={hi.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.good} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={along(hi, ph)[0]} cy={along(hi, ph)[1]} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
            <Ln x1={570} y1={gy} x2={570} y2={gy - 18} color={C.ink} width={3} />
          </>
        )}
        <T x={90} y={gy + 15} anchor="middle" size={13} bold>TX</T>
        <T x={128} y={228} size={13} bold color={night ? C.good : C.bad}>{night ? '40 to 160 m: returned' : '40 to 160 m: absorbed'}</T>
        {!night && <T x={470} y={228} size={13} bold color={C.good}>20 m and up</T>}
        <T x={330} y={298} anchor="middle" size={14} bold color={night ? C.good : C.bad}>{night ? 'Low bands reach the F region and come back' : 'Low bands absorbed in the D region by day'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Time" value={night ? 'night' : 'day'} onChange={(v) => setNight(v === 'night')} options={[{ value: 'day', label: 'Daytime' }, { value: 'night', label: 'Night' }]} />
      </div>
    </>
  )
}
