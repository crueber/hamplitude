import { C, Diagram, Ln, T } from '../kit'

/** Return current has to get back to the base of a vertical: through lossy soil, or along radials. */
export function RadialsAndGroundPlanes_Return() {
  const gy = 190, top = 60
  const panel = (cx: number, radials: boolean) => (
    <g>
      <rect x={cx - 150} y={gy} width={300} height={70} fill={C.fill2} />
      <Ln x1={cx} y1={gy} x2={cx} y2={top} color={C.ink} width={5} />
      <circle cx={cx} cy={gy} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      {[-1, 1].map((s) => (
        <path key={s} d={`M${cx + s * 8},${top + 6} Q${cx + s * 100},${top + 20} ${cx + s * 120},${gy - 2}`} fill="none" stroke={C.signal} strokeWidth={2} strokeDasharray="5 5" markerEnd="url(#hx-arrow)" />
      ))}
      {radials ? (
        <>
          {[-1, 1].map((s) => (
            <g key={s}>
              <Ln x1={cx + s * 140} y1={gy + 3} x2={cx + s * 12} y2={gy + 3} color={C.resist} width={2.5} arrow />
              <Ln x1={cx + s * 140} y1={gy + 15} x2={cx + s * 12} y2={gy + 15} color={C.resist} width={2} arrow dash="1 6" />
            </g>
          ))}
          <T x={cx} y={gy + 52} anchor="middle" size={13} bold color={C.resist}>radials carry the return current</T>
          <T x={cx} y={gy + 90} anchor="middle" size={12} color={C.muted}>little current left in the soil</T>
        </>
      ) : (
        <>
          {[-1, 1].map((s) => [0, 1, 2].map((i) => (
            <path key={`${s}${i}`} d={`M${cx + s * (140 - i * 12)},${gy + 14 + i * 14} Q${cx + s * (60 - i * 10)},${gy + 38 + i * 10} ${cx + s * 8},${gy + 6}`} fill="none" stroke={C.bad} strokeWidth={1.5 + i} markerEnd="url(#hx-arrow)" />
          )))}
          <T x={cx} y={gy + 90} anchor="middle" size={13} bold color={C.bad}>current crowds into lossy soil near the base</T>
        </>
      )}
    </g>
  )
  return (
    <Diagram w={640} h={320}
      title="Two verticals side by side. Left, no radials: return current has to squeeze through resistive soil toward the base, wasting power as heat. Right, with radials: the return current runs back along metal wires and very little flows through the soil"
      caption="Every antenna current needs a path back to the source. For a vertical, that path is the ground system.">
      {panel(160, false)}
      {panel(480, true)}
      <T x={160} y={26} anchor="middle" size={14} bold>Soil only</T>
      <T x={480} y={26} anchor="middle" size={14} bold>With radials</T>
      <T x={320} y={306} anchor="middle" size={12} color={C.muted}>dashed = electric field reaching the ground; solid arrows = return current</T>
    </Diagram>
  )
}
