import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

/** Schematic: tuning a Yagi trades forward gain against front-to-back ratio and SWR bandwidth. Shapes are illustrative, not measured. */
export function YagiUda_Tradeoff() {
  const [t, setT] = useState(0.5) // 0 = tuned for front-to-back, 1 = tuned for gain
  const n = 1.6 + 1.6 * t // main-lobe sharpness
  const back = 0.05 + 0.27 * t // relative rear lobe
  const N = 240
  const raw = Array.from({ length: N }, (_, i) => back + (1 - back) * Math.pow(Math.max(0, Math.cos((i / N) * TAU)), n))
  const cx = 160, cy = 150, R = 104
  const d = raw.map((v, i) => {
    const a = (i / N) * TAU
    return `${i ? 'L' : 'M'}${(cx + R * v * Math.cos(a)).toFixed(1)},${(cy - R * v * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const bars = [
    { label: 'Forward gain', v: 0.55 + 0.4 * t, color: C.good },
    { label: 'Front-to-back ratio', v: 0.95 - 0.7 * t, color: C.bad },
    { label: 'SWR bandwidth', v: 0.9 - 0.55 * t, color: C.power },
  ]
  const bx = 330, bw = 280
  return (
    <>
      <Diagram w={640} h={300}
        title="Schematic Yagi trade-off. Tuning for more forward gain makes the main lobe narrower but the rear lobe larger and the SWR bandwidth narrower; tuning for front-to-back does the opposite"
        caption="Schematic only: real values depend on the design. The shape of the trade-off is what matters.">
        <T x={20} y={18} size={13} bold color={C.muted}>Pattern from above</T>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={R / 2} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <path d={d} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} color={C.ink} width={5} />
        <T x={cx + R + 12} y={cy} size={13} bold color={C.good}>front</T>
        <T x={cx - R - 12} y={cy} anchor="end" size={13} bold color={C.bad}>back</T>
        <T x={cx} y={284} anchor="middle" size={12} color={C.muted}>rear lobe grows as tuning moves toward gain</T>
        {bars.map((b, i) => {
          const y = 62 + i * 70
          return (
            <g key={b.label}>
              <T x={bx} y={y} size={14} bold color={b.color}>{b.label}</T>
              <rect x={bx} y={y + 14} width={bw} height={18} rx={9} fill={C.fill} />
              <rect x={bx} y={y + 14} width={bw * b.v} height={18} rx={9} fill={b.color} fillOpacity={0.85} />
            </g>
          )
        })}
        <T x={bx} y={36} size={12} color={C.muted}>relative bars, not dB</T>
      </Diagram>
      <Controls>
        <Slider label="Tuned for" value={t} min={0} max={1} step={0.05} onChange={setT}
          format={(v) => (v < 0.2 ? 'front-to-back' : v > 0.8 ? 'maximum gain' : 'compromise')} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
