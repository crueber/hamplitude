import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

type Pt = [number, number]
const DUCT: Pt[] = [[80, 214], [155, 128], [230, 214], [305, 128], [380, 214], [455, 128], [530, 214]]
const NORMAL: Pt[] = [[80, 214], [600, 40]]

/** A temperature inversion traps VHF/UHF in a duct so it travels far beyond the horizon. */
export function Duct() {
  const [inv, setInv] = useState(true)
  const { t, ref } = useTime(0.35)
  const pts = inv ? DUCT : NORMAL
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = (t % 1.2 > 1 ? 1 : t % 1.2) * segs.reduce((a, b) => a + b, 0)
  let dot = pts[pts.length - 1]
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) { dot = [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * d) / segs[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * d) / segs[i]]; break }
    d -= segs[i]
  }
  const col = inv ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={290} svgRef={ref}
        title={inv ? 'A layer of warm air over cooler air traps the signal, which follows the ground a long way' : 'In ordinary air the signal heads up and away and misses the distant station'}
        caption="Schematic side view of the lower atmosphere (the troposphere).">
        {inv && (
          <>
            <rect x={20} y={20} width={600} height={104} fill={C.resist} opacity={0.2} />
            <rect x={20} y={124} width={600} height={100} fill={C.current} opacity={0.16} />
            <Ln x1={20} y1={124} x2={620} y2={124} color={C.muted} width={1.5} dash="5 5" />
            <T x={30} y={44} bold size={14} color={C.resist}>Warm air above: temperature inversion</T>
            <T x={30} y={146} bold size={14} color={C.current}>Cooler air</T>
          </>
        )}
        {!inv && <T x={30} y={44} bold size={14} color={C.muted}>Ordinary air: cooler higher up</T>}
        <rect x={20} y={224} width={600} height={30} rx={6} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={80} y1={224} x2={80} y2={206} color={C.ink} width={3} />
        <Ln x1={530} y1={224} x2={530} y2={206} color={C.ink} width={3} />
        <T x={80} y={240} anchor="middle" size={13} bold>You</T>
        <T x={530} y={240} anchor="middle" size={13} bold>Distant station</T>
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={dot[0]} cy={dot[1]} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
        <T x={320} y={274} anchor="middle" size={14} bold color={col}>{inv ? 'ducted: reaches far beyond the horizon' : 'no duct: signal escapes upward'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Atmosphere" value={inv ? 'inv' : 'norm'} onChange={(v) => setInv(v === 'inv')}
          options={[{ value: 'norm', label: 'Ordinary air' }, { value: 'inv', label: 'Temperature inversion' }]} />
      </div>
    </>
  )
}
