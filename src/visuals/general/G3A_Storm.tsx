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

/** A geomagnetic storm degrades HF over high latitudes; the aurora it makes can reflect VHF. */
export function Storm() {
  const [storm, setStorm] = useState(true)
  const [band, setBand] = useState<'hf' | 'vhf'>('hf')
  const { t, ref } = useTime(0.3)
  const hf = band === 'hf'
  const pts: Pt[] = hf ? [[90, 232], [320, 98], [550, 232]] : [[260, 232], [320, 112], [380, 232]]
  const ok = hf ? !storm : storm
  const col = ok ? C.good : C.bad
  const ph = t % 1.2 > 1 ? 1 : t % 1.2
  const full = ok || hf ? pts : [pts[0], pts[1], [pts[1][0] + 30, 30] as Pt]
  const dot = along(full, hf && storm ? Math.min(ph, 0.62) : ph)
  const msg = hf ? (storm ? 'HF over high latitudes: degraded' : 'HF over high latitudes: arrives normally')
    : storm ? 'Aurora reflects VHF: contact made' : 'VHF passes through: no contact'
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref}
        title={`${storm ? 'Geomagnetic storm' : 'Quiet field'}, ${hf ? 'HF' : 'VHF'}: ${msg}`}
        caption="Schematic side view. High latitudes are where the field lines and aurora are.">
        <rect x={20} y={72} width={600} height={46} rx={10} fill={C.fill2} opacity={0.7} stroke={C.muted} strokeDasharray="5 5" />
        <T x={608} y={90} anchor="end" size={13} bold color={C.muted}>Ionosphere</T>
        <rect x={230} y={30} width={180} height={196} rx={14} fill={storm ? C.bad : C.fill} fillOpacity={storm ? 0.1 : 0.5} stroke={C.muted} strokeDasharray="4 5" />
        <T x={320} y={44} anchor="middle" size={13} bold color={C.muted}>high latitudes</T>
        {storm && [270, 282, 294, 306, 318, 330, 342, 354, 366].map((x, i) => <Ln key={x} x1={x} y1={80} x2={x} y2={104 + (i % 3) * 8 + (i === 4 ? 6 : 0)} color={C.good} width={7} opacity={0.55} />)}
        {storm && <T x={320} y={150} anchor="middle" size={13} bold color={C.good}>aurora</T>}
        <rect x={20} y={232} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        {(hf ? [90, 550] : [260, 380]).map((x) => <Ln key={x} x1={x} y1={232} x2={x} y2={214} color={C.ink} width={3} />)}
        <polyline points={full.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3} strokeDasharray={ok ? '2 7' : '2 11'} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={dot[0]} cy={dot[1]} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
        {hf && storm && <T x={262} y={135} anchor="middle" size={26} bold color={C.bad} stroke={C.bg} strokeWidth={4} paintOrder="stroke">X</T>}
        <T x={320} y={282} anchor="middle" size={14} bold color={col}>{msg}</T>
      </Diagram>
      <div style={{ display: 'grid', gap: 8, margin: '-6px 0 14px' }}>
        <Choice label="Earth's field" value={storm ? 'storm' : 'quiet'} onChange={(v) => setStorm(v === 'storm')} options={[{ value: 'quiet', label: 'Quiet' }, { value: 'storm', label: 'Geomagnetic storm' }]} />
        <Choice label="Signal" value={band} onChange={setBand} options={[{ value: 'hf', label: 'HF path via high latitudes' }, { value: 'vhf', label: 'VHF' }]} />
      </div>
    </>
  )
}
