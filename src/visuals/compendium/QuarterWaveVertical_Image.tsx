import { C, Diagram, Ln, T } from '../kit'

// Elevation pattern of a half-wave dipole (and so of a quarter-wave monopole over perfect ground):
// relative field at elevation angle e above the horizon is cos(pi/2 * sin e) / cos e.
const field = (e: number) => (Math.abs(Math.cos(e)) < 1e-6 ? 0 : Math.cos((Math.PI / 2) * Math.sin(e)) / Math.cos(e))

/** A monopole over ground behaves like half of a dipole: the ground supplies the mirror-image other half. */
export function QuarterWaveVertical_Image() {
  const ex = 120, gy = 170, top = 50, bot = 290
  const cx = 480, py = 250, S = 130
  const N = 60
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const e = (i / N) * (Math.PI / 2)
    const r = field(e)
    return [S * r * Math.cos(e), S * r * Math.sin(e)] as const
  })
  const right = pts.map(([x, y]) => `${(cx + x).toFixed(1)},${(py - y).toFixed(1)}`)
  const left = pts.map(([x, y]) => `${(cx - x).toFixed(1)},${(py - y).toFixed(1)}`).reverse()
  const lobe = 'M' + [...left, ...right].join('L') + 'Z'
  return (
    <Diagram w={640} h={330}
      title="Left: a quarter-wave vertical over ground. The ground acts as a mirror, so the antenna behaves as if its image continued below the surface, forming a half-wave dipole. Right: the resulting side-view pattern, strongest toward the horizon and empty straight up"
      caption="The ground supplies the missing half. Pattern shown over ideal (perfectly conducting) ground; real soil is lossier and lifts the peak a little.">
      <T x={20} y={20} size={13} bold color={C.muted}>The ground is a mirror</T>
      <Ln x1={20} y1={gy} x2={236} y2={gy} color={C.muted} width={6} />
      <T x={26} y={gy + 18} size={12} color={C.muted}>ground</T>
      <Ln x1={ex} y1={gy} x2={ex} y2={top} color={C.ink} width={5} />
      <Ln x1={ex} y1={gy} x2={ex} y2={bot} color={C.muted} width={5} dash="7 6" />
      <circle cx={ex} cy={gy} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <T x={ex + 14} y={gy - 16} size={12} bold color={C.power}>feed point</T>
      <T x={ex + 14} y={top + 40} size={13} bold>real ¼ λ element</T>
      <T x={ex + 14} y={bot - 44} size={13} bold color={C.muted}>image (not there)</T>
      <Ln x1={ex - 16} y1={gy - 24} x2={ex - 16} y2={gy - 74} color={C.current} width={3} arrow />
      <Ln x1={ex - 16} y1={gy + 74} x2={ex - 16} y2={gy + 24} color={C.current} width={3} arrow dash="6 5" />
      <T x={ex - 24} y={gy - 50} anchor="end" size={12} color={C.current}>current</T>
      <Ln x1={252} y1={top} x2={252} y2={bot} color={C.signal} width={2} arrow="both" />
      <T x={262} y={gy - 40} size={13} bold color={C.signal}>real + image</T>
      <T x={262} y={gy - 20} size={13} bold color={C.signal}>= ½ λ dipole</T>

      <T x={340} y={20} size={13} bold color={C.muted}>Side view of the pattern</T>
      <rect x={340} y={py} width={290} height={50} fill={C.fill2} />
      <path d={lobe} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} />
      <Ln x1={cx} y1={py} x2={cx} y2={py - 70} color={C.ink} width={4} />
      <T x={cx - 76} y={py + 25} anchor="middle" size={12} color={C.muted}>horizon</T>
      <Ln x1={cx + 20} y1={py - 8} x2={cx + S - 10} y2={py - 8} color={C.good} width={2.5} arrow />
      <T x={cx + 12} y={py - 100} size={13} bold color={C.good}>best toward</T>
      <T x={cx + 12} y={py - 82} size={13} bold color={C.good}>the horizon</T>
      <T x={cx - 8} y={py - 160} anchor="end" size={12} color={C.muted}>little straight up</T>
    </Diagram>
  )
}
