import { C, Diagram, Ln, T, useTime } from '../kit'

const LANES = [
  { y: 76, name: 'Solar flare: UV + X-ray (light)', time: '8 minutes', fast: true, col: C.resist, eff: ['Daytime side only:', 'low HF absorbed most'] },
  { y: 176, name: 'Coronal mass ejection: particles', time: '15 hours to days', fast: false, col: C.power, eff: ['Geomagnetic storm:', 'high-latitude HF poor'] },
  { y: 276, name: 'Coronal hole: charged particles', time: 'slow particles', fast: false, col: C.power, eff: ['Long-distance HF', 'is disturbed'] },
]

/** Flares arrive at light speed; particle clouds take hours to days. */
export function Arrival() {
  const { t, ref } = useTime(0.5)
  const x0 = 56, x1 = 404
  return (
    <Diagram w={640} h={320} svgRef={ref} title="A solar flare's ultraviolet and X-rays reach Earth in about 8 minutes. A coronal mass ejection takes 15 hours to several days. Coronal hole particles disturb HF."
      caption="Light travels fast. Particles are slow, so storms arrive late.">
      {LANES.map((l, i) => {
        const p = l.fast ? Math.min(1, (t % 1.6) / 0.5) : (t % 3.2) / 3.2
        return (
          <g key={l.name}>
            <T x={14} y={l.y - 34} size={14} bold>{l.name}</T>
            <circle cx={30} cy={l.y} r={14} fill={C.resist} fillOpacity={0.4} stroke={C.resist} strokeWidth={2} />
            <Ln x1={x0} y1={l.y} x2={x1} y2={l.y} color={l.col} width={3} dash={l.fast ? undefined : '3 8'} arrow />
            <circle cx={x0 + p * (x1 - x0 - 14)} cy={l.y} r={l.fast ? 5 : 8} fill={l.col} stroke={C.bg} strokeWidth={2} />
            <rect x={x0 + 90} y={l.y + 12} width={l.time.length * 8 + 22} height={22} rx={11} fill={C.fill2} stroke={C.muted} />
            <T x={x0 + 101} y={l.y + 23} size={13} bold>{l.time}</T>
            <circle cx={426} cy={l.y} r={14} fill={C.current} fillOpacity={0.35} stroke={C.current} strokeWidth={2} />
            <T x={452} y={l.y - 9} size={13} bold>{l.eff[0]}</T>
            <T x={452} y={l.y + 10} size={13} color={C.muted}>{l.eff[1]}</T>
            {i < 2 && <Ln x1={14} y1={l.y + 50} x2={626} y2={l.y + 50} color={C.fill2} width={1.5} />}
          </g>
        )
      })}
    </Diagram>
  )
}
