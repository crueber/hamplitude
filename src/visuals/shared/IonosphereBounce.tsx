import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

type Pt = [number, number]

/** Position a fraction `f` (0..1) of the way along a polyline. */
function along(pts: Pt[], f: number): Pt {
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = f * segs.reduce((a, b) => a + b, 0)
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) {
      const k = d / segs[i]
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]
    }
    d -= segs[i]
  }
  return pts[pts.length - 1]
}

/** HF is reflected back to Earth by the ionosphere; VHF and UHF mostly pass straight through. */
export function IonosphereBounce({ initial = 'hf' }: { initial?: 'hf' | 'vhf' }) {
  const [mode, setMode] = useState<'hf' | 'vhf'>(initial)
  const { t, ref } = useTime(0.25)
  const hf = mode === 'hf'
  const pts: Pt[] = hf ? [[110, 230], [320, 82], [530, 230]] : [[110, 230], [320, 82], [395, 26]]
  const dot = along(pts, (t % 1.2 > 1 ? 1 : t % 1.2))
  const col = hf ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={300} svgRef={ref}
        title={hf ? 'An HF signal is reflected by the ionosphere and returns to Earth far away' : 'A VHF or UHF signal passes through the ionosphere and escapes to space'}
        caption="Schematic side view. The ionosphere is a high layer of electrically charged air.">
        <rect x={20} y={50} width={600} height={56} rx={10} fill={C.fill2} opacity={0.7} stroke={C.muted} strokeDasharray="5 5" />
        <T x={608} y={64} anchor="end" bold size={14} color={C.muted}>Ionosphere</T>
        <rect x={20} y={252} width={600} height={34} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <T x={330} y={269} anchor="middle" size={13} color={C.muted}>Earth</T>
        <Ln x1={110} y1={252} x2={110} y2={232} color={C.ink} width={3} />
        <T x={110} y={269} anchor="middle" bold size={14}>You</T>
        <Ln x1={530} y1={252} x2={530} y2={232} color={C.ink} width={3} />
        <T x={530} y={269} anchor="middle" bold size={14}>Distant station</T>
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7" />
        <circle cx={dot[0]} cy={dot[1]} r={7} fill={col} stroke={C.bg} strokeWidth={2} />
        {hf ? (
          <T x={320} y={150} anchor="middle" bold size={15} color={C.good}>reflected back: skip</T>
        ) : (
          <>
            <T x={410} y={26} bold size={15} color={C.bad}>passes through, lost to space</T>
            <T x={530} y={206} anchor="middle" size={13} color={C.bad}>nothing arrives</T>
          </>
        )}
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Signal type" value={mode} onChange={setMode}
          options={[{ value: 'hf', label: 'HF (3–30 MHz)' }, { value: 'vhf', label: 'VHF / UHF' }]} />
      </div>
    </>
  )
}
