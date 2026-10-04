import { C, Diagram, Ln, T } from '../kit'

/** Simplified top-view sketches of a Moxon rectangle and a hex beam. Shapes are illustrative, not construction drawings. */
export function MoxonAndHexBeams_Shapes() {
  // Moxon: beam to the right. Driven element in front, reflector behind, tips bent toward each other.
  const W = 150, top = 70, bot = top + W, xd = 205, xr = 120, tail = 33
  const cy = top + W / 2
  // Hex: six spokes from a hub, wires bent between spoke ends
  const hx = 495, hy = 150, R = 105
  const V = (k: number): [number, number] => [hx + R * Math.cos((k * Math.PI) / 3), hy - R * Math.sin((k * Math.PI) / 3)]
  const pts = (a: [number, number][]) => a.map((p) => p.join(',')).join(' ')
  const refl: [number, number][] = [V(2), [hx - R, hy], V(4)]
  const drv: [number, number][] = [V(1), [hx + 28, hy], V(5)]
  return (
    <Diagram w={640} h={290}
      title="Simplified top-view sketches. Moxon rectangle: two wire elements bent so their tips almost touch, driven element in front. Hex beam: wire elements bent along a hexagon on six spreaders from a hub"
      caption="Simplified sketches. Both bend the elements so a compact antenna keeps a clean, one-directional pattern.">
      <T x={170} y={18} anchor="middle" size={13} bold color={C.muted}>Moxon rectangle</T>
      {/* reflector */}
      <polyline points={pts([[xr + tail, top], [xr, top], [xr, bot], [xr + tail, bot]])} fill="none" stroke={C.bad} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
      {/* driven */}
      <polyline points={pts([[xd - tail, top], [xd, top], [xd, bot], [xd - tail, bot]])} fill="none" stroke={C.voltage} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={xd} cy={cy} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <T x={xd + 12} y={cy} size={12} bold color={C.power}>feed</T>
      <T x={xr - 10} y={cy} anchor="end" size={12} bold color={C.bad}>reflector</T>
      <T x={xd + 12} y={cy - 44} size={12} bold color={C.voltage}>driven</T>
      <Ln x1={xr + 74} y1={top - 14} x2={xr + 74} y2={top - 2} color={C.muted} width={1.5} />
      <T x={xr + 74} y={top - 26} anchor="middle" size={12} color={C.muted}>tip gap is small</T>
      <Ln x1={xr} y1={bot + 22} x2={xd} y2={bot + 22} color={C.muted} width={1.5} arrow="both" />
      <T x={(xr + xd) / 2} y={bot + 40} anchor="middle" size={12} color={C.muted}>shallow, front to back</T>
      <Ln x1={xd + 40} y1={cy + 40} x2={xd + 100} y2={cy + 40} color={C.good} width={3} arrow />
      <T x={xd + 70} y={cy + 58} anchor="middle" size={12} bold color={C.good}>beam</T>

      <T x={495} y={18} anchor="middle" size={13} bold color={C.muted}>Hex beam</T>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const [x, y] = V(k)
        return <Ln key={k} x1={hx} y1={hy} x2={x} y2={y} color={C.muted} width={2} />
      })}
      <polyline points={pts(refl)} fill="none" stroke={C.bad} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={pts(drv)} fill="none" stroke={C.voltage} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={7} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <T x={hx - R - 6} y={hy - 26} anchor="end" size={12} bold color={C.bad}>reflector</T>
      <T x={hx + 78} y={hy - 82} size={12} bold color={C.voltage}>driven</T>
      <T x={hx} y={hy + R + 24} anchor="middle" size={12} color={C.muted}>six spreaders from a central hub</T>
      <Ln x1={hx + 44} y1={hy + 40} x2={hx + 100} y2={hy + 40} color={C.good} width={3} arrow />
      <T x={hx + 98} y={hy + 58} anchor="middle" size={12} bold color={C.good}>beam</T>
    </Diagram>
  )
}
