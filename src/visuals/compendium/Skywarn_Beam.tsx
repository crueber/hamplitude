import { C, Diagram, Ln, T } from '../kit'

const X0 = 50, Y0 = 170, R = 1568
const gy = (x: number) => Y0 + ((x - X0) ** 2) / (2 * R)
const by = (x: number) => 160 - ((x - X0) / 560) * 14

/** Why spotters matter: a weather radar beam rises above the curving Earth, so the lowest part of a distant storm is below it. Not to scale. */
export function Skywarn_Beam() {
  const pts = (a: number, b: number, f: (x: number) => number) => Array.from({ length: 29 }, (_, i) => { const x = a + ((b - a) * i) / 28; return [x, f(x)] as const })
  const ground = pts(X0, 620, gy)
  const gPath = ground.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const blindPath = `M${X0},${by(X0).toFixed(1)} L620,${by(620).toFixed(1)} ` + pts(620, X0, gy).map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join('') + 'Z'
  return (
    <Diagram w={640} h={300}
      title="A weather radar beam travels in a straight line while the Earth curves away, so far from the radar the beam passes above the lowest part of a storm. A spotter on the ground sees what is happening there"
      caption="Exaggerated and not to scale. Far from the radar, the beam overshoots the layer where the wind, hail and tornadoes actually reach the ground.">
      <path d={`${gPath} L620,300 L${X0},300Z`} fill={C.fill} />
      <path d={gPath} fill="none" stroke={C.muted} strokeWidth={2.5} />
      <path d={blindPath} fill={C.bad} fillOpacity={0.2} />
      <Ln x1={X0} y1={by(X0)} x2={620} y2={by(620)} color={C.signal} width={3} />
      <Ln x1={X0} y1={Y0} x2={X0} y2={Y0 - 36} color={C.ink} width={4} />
      <circle cx={X0} cy={Y0 - 40} r={8} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      <T x={X0 - 10} y={Y0 + 22} size={13} bold>Radar</T>
      <T x={150} y={by(150) - 18} size={13} bold color={C.signal}>radar beam</T>
      <path d={`M432,${gy(432).toFixed(1)} L432,${(by(488) - 52).toFixed(1)} Q432,${(by(488) - 76).toFixed(1)} 462,${(by(488) - 76).toFixed(1)} L515,${(by(488) - 76).toFixed(1)} Q545,${(by(488) - 76).toFixed(1)} 545,${(by(488) - 52).toFixed(1)} L545,${gy(545).toFixed(1)}Z`} fill={C.ink} fillOpacity={0.14} stroke={C.muted} strokeWidth={2} />
      <T x={488} y={by(488) - 58} anchor="middle" size={13} bold>Storm</T>
      <T x={488} y={gy(488) - 26} anchor="middle" size={12} bold color={C.bad}>below the beam</T>
      <circle cx={590} cy={gy(590) - 8} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
      <T x={600} y={gy(600) + 22} anchor="end" size={13} bold color={C.good}>Spotter sees it</T>
    </Diagram>
  )
}
