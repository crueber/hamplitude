import { C, Diagram, Ln, T } from '../kit'

/** Ground reflections add to (or cancel) the direct signal ("ground gain") and shift the feed point impedance with height. */
export function E9A_GroundGain() {
  const gy = 190, ax = 70, ay = 100, rx = 290
  // reflection point on the ground between antenna and receiver
  const mx = ax + (rx - ax) * ((gy - ay) / ((gy - ay) + (gy - 80)))
  // schematic feed-point resistance vs height
  const px0 = 380, px1 = 620, py0 = 190, py1 = 50
  const pts = Array.from({ length: 121 }, (_, i) => {
    const h = i / 120 // 0..1 wavelength
    const r = 1 - Math.cos(4 * Math.PI * h) / (1 + 6 * h)
    const x = px0 + h * (px1 - px0)
    const y = py0 - (r / 2) * (py0 - py1)
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
  }).join('')
  return (
    <Diagram w={640} h={262} title="Left: a direct ray and a ray reflected off the ground arrive at the receiver and add, which is called ground gain. Right: a schematic graph showing the antenna's feed point impedance rising and falling as antenna height changes."
      caption="Ground is part of the antenna: its reflection adds signal, and its distance changes the feed point impedance.">
      <rect x={20} y={gy} width={290} height={34} fill={C.fill2} />
      <Ln x1={20} y1={gy} x2={310} y2={gy} color={C.muted} width={3} />
      <T x={30} y={gy + 18} size={12} color={C.muted}>ground</T>
      <Ln x1={ax - 22} y1={ay} x2={ax + 22} y2={ay} color={C.resist} width={5} />
      <Ln x1={ax} y1={ay} x2={ax} y2={gy} color={C.muted} width={2} dash="3 4" />
      <T x={ax - 8} y={(ay + gy) / 2} anchor="end" size={12} color={C.muted}>height</T>
      <circle cx={rx} cy={80} r={7} fill={C.ink} />
      <T x={rx} y={62} anchor="middle" size={12} color={C.muted}>receiver</T>
      <Ln x1={ax + 22} y1={ay - 3} x2={rx - 10} y2={80 + 2} color={C.signal} width={2.5} arrow />
      <T x={170} y={74} anchor="middle" size={12} bold color={C.signal}>direct</T>
      <Ln x1={ax + 10} y1={ay + 6} x2={mx} y2={gy} color={C.voltage} width={2.5} />
      <Ln x1={mx} y1={gy} x2={rx - 8} y2={80 + 8} color={C.voltage} width={2.5} arrow />
      <T x={mx + 34} y={gy - 28} size={12} bold color={C.voltage}>reflected</T>
      <T x={165} y={246} anchor="middle" size={13} bold color={C.good}>direct + reflected = ground gain</T>

      <T x={500} y={26} anchor="middle" size={13} bold color={C.muted}>Feed point impedance vs height</T>
      <Ln x1={px0} y1={py0} x2={px1} y2={py0} color={C.muted} width={2} />
      <Ln x1={px0} y1={py0} x2={px0} y2={py1} color={C.muted} width={2} />
      <Ln x1={px0} y1={py0 - (py0 - py1) / 2} x2={px1} y2={py0 - (py0 - py1) / 2} color={C.muted} width={1.5} dash="4 4" />
      <T x={px1} y={62} anchor="end" size={12} color={C.muted}>dashed = free-space value</T>
      <path d={pts} fill="none" stroke={C.resist} strokeWidth={3} />
      <T x={px0 + 120} y={py0 + 24} anchor="middle" size={12} color={C.muted}>antenna height →</T>
      <T x={500} y={246} anchor="middle" size={12} color={C.muted}>schematic: swings, then settles</T>
    </Diagram>
  )
}
