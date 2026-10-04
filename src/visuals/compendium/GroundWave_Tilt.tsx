import { C, Diagram, Ln, T, useTime } from '../kit'

const R = 2400, OX = 70, BASE = 150
const gy = (x: number) => BASE + (x - OX) ** 2 / (2 * R)

const SURFACES = [
  { n: 'Seawater', len: 1, col: C.current, note: 'best conductor: least loss' },
  { n: 'Moist, fertile soil', len: 0.62, col: C.good, note: 'average' },
  { n: 'Dry sand, rock, city', len: 0.34, col: C.resist, note: 'poor conductor: most loss' },
]

export function GroundWave_Tilt() {
  const { t, ref } = useTime(0.25)
  const fronts = [0, 1, 2, 3].map((i) => 130 + ((i + (t % 1)) * 110) % 440)
  const earth = Array.from({ length: 65 }, (_, i) => `${i ? 'L' : 'M'}${i * 10},${gy(i * 10).toFixed(1)}`).join('') + 'L640,226 L0,226 Z'
  return (
    <Diagram w={640} h={352} svgRef={ref}
      title="A ground wave: the lower part of the wave front is slowed by the ground, so the front tilts forward and bends around the curve of the Earth. The poorer the ground conducts, the sooner the signal fades."
      caption="Schematic. The ground drags the wave front along; it also absorbs energy, more over poor ground.">
      <path d={earth} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <Ln x1={70} y1={gy(70)} x2={70} y2={gy(70) - 62} color={C.ink} width={4} />
      <T x={70} y={gy(70) + 20} anchor="middle" size={12.5} bold>vertical antenna</T>
      {fronts.map((x, i) => {
        const age = (x - 130) / 440
        const lean = 6 + 36 * age + (96 * (x - OX)) / R
        const op = Math.max(0.15, 1 - age * 0.8)
        const y0 = gy(x) - 3
        return (
          <g key={i} opacity={op}>
            <path d={`M${x.toFixed(1)},${y0.toFixed(1)} Q${(x + lean * 0.25).toFixed(1)},${(y0 - 40).toFixed(1)} ${(x + lean).toFixed(1)},${(y0 - 96).toFixed(1)}`} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
            <Ln x1={x + lean * 0.3} y1={y0 - 30} x2={x + lean * 0.3 + 1} y2={y0 - 54} color={C.voltage} width={3} arrow />
          </g>
        )
      })}
      <T x={600} y={16} anchor="end" size={13} bold color={C.signal}>wave fronts move right</T>
      <T x={600} y={34} anchor="end" size={13} bold color={C.voltage}>E field stays close to vertical</T>
      <T x={X_LABEL} y={16} size={13} color={C.muted}>bottom of the front is slowed by the ground,</T>
      <T x={X_LABEL} y={34} size={13} color={C.muted}>so the front leans forward and follows the curve</T>

      <T x={20} y={250} size={13} bold color={C.muted}>Relative reach at one frequency, by ground type (schematic)</T>
      {SURFACES.map((s, i) => {
        const y = 280 + i * 28
        return (
          <g key={s.n}>
            <T x={20} y={y} size={13} bold>{s.n}</T>
            <rect x={190} y={y - 9} width={s.len * 280} height={18} rx={4} fill={s.col} fillOpacity={0.3} stroke={s.col} strokeWidth={2} />
            <T x={190 + s.len * 280 + 10} y={y} size={12.5} color={C.muted}>{s.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
const X_LABEL = 20
