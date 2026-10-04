import { C, Diagram, Ln, T, TAU } from '../kit'

const base = (a: number) => 0.18 + Math.pow(Math.max(0, Math.cos(a)), 3) * 0.82 // one clean beam
const shape = (a: number, k: number) => Math.max(0.05, base(a) * (1 + k * Math.cos(5 * a)) + k * 0.35 * (1 + Math.cos(3 * a + 1)) / 2)

/** Far field: the shape of the pattern no longer changes with distance, only its strength. */
export function E9B_FarField() {
  const panels = [
    { x: 75, k: 0.55, s: 1, label: 'Near field', sub: 'shape keeps changing', far: false },
    { x: 235, k: 0.22, s: 0.9, label: 'Closer to far', sub: 'still changing', far: false },
    { x: 410, k: 0, s: 0.7, label: 'Far field', sub: 'shape is fixed', far: true },
    { x: 565, k: 0, s: 0.4, label: 'Farther out', sub: 'same shape, weaker', far: true },
  ]
  const cy = 122, R = 70
  return (
    <Diagram w={640} h={250} title="Four pattern snapshots at increasing distance from an antenna. Close in, the shape changes from one distance to the next. In the far field the shape no longer changes; it only gets weaker with distance."
      caption="Far field = the region where the shape of the radiation pattern no longer varies with distance.">
      {panels.map((p) => {
        const d = Array.from({ length: 181 }, (_, i) => {
          const a = (i / 180) * TAU, r = R * p.s * shape(a, p.k)
          return `${i ? 'L' : 'M'}${(p.x + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`
        }).join('') + 'Z'
        return (
          <g key={p.x}>
            <path d={d} fill={p.far ? C.signal : C.resist} fillOpacity={0.2} stroke={p.far ? C.signal : C.resist} strokeWidth={3} strokeLinejoin="round" />
            <T x={p.x} y={198} anchor="middle" size={13} bold color={p.far ? C.signal : C.resist}>{p.label}</T>
            <T x={p.x} y={217} anchor="middle" size={12} color={C.muted}>{p.sub}</T>
          </g>
        )
      })}
      <Ln x1={20} y1={34} x2={620} y2={34} color={C.muted} width={2} arrow />
      <T x={20} y={18} size={12} color={C.muted}>antenna</T>
      <T x={620} y={18} anchor="end" size={12} color={C.muted}>distance from the antenna</T>
      <Ln x1={325} y1={44} x2={325} y2={186} color={C.good} width={2} dash="5 4" />
      <T x={331} y={52} size={12} bold color={C.good}>far field begins</T>
    </Diagram>
  )
}
