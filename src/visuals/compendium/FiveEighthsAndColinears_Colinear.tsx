import { C, Diagram, Ln, T } from '../kit'

/** Current on a one-wavelength vertical: two half-wave sections. Joined directly, they oppose. A phasing coil flips one. */
export function FiveEighthsAndColinears_Colinear() {
  const y0 = 290, ym = 165, y1 = 40, A = 46
  const lobe = (cx: number, from: number, to: number, side: 1 | -1) =>
    Array.from({ length: 41 }, (_, i) => {
      const u = i / 40
      return `${i ? 'L' : 'M'}${(cx + side * A * Math.sin(Math.PI * u)).toFixed(1)},${(from + (to - from) * u).toFixed(1)}`
    }).join('')
  const panel = (cx: number, phased: boolean) => (
    <g>
      <Ln x1={cx} y1={y0} x2={cx} y2={phased ? ym + 20 : y1} color={C.ink} width={4} />
      {phased && <Ln x1={cx} y1={ym - 20} x2={cx} y2={y1} color={C.ink} width={4} />}
      {phased && <path d={`M${cx},${ym + 20} ` + Array.from({ length: 4 }, () => 'a12,5 0 0 0 0,-10').join(' ')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />}
      <path d={lobe(cx, y0, ym, 1)} fill="none" stroke={C.current} strokeWidth={3.5} />
      <path d={lobe(cx, ym, y1, phased ? 1 : -1)} fill="none" stroke={C.current} strokeWidth={3.5} />
      <circle cx={cx} cy={y0} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <T x={cx + 12} y={y0 - 4} size={12} color={C.muted}>feed</T>
    </g>
  )
  return (
    <Diagram w={640} h={330}
      title="Current on a stack of two half-wave sections. Left: joined directly, the upper section's current is opposite to the lower one's, so their radiation cancels at the horizon. Right: a phasing coil between them puts both currents in step, so their radiation adds"
      caption="Blue curves show the size and direction of the current along each half-wave section: curves on opposite sides mean opposite directions.">
      <T x={150} y={20} anchor="middle" size={14} bold>Joined end to end</T>
      <T x={470} y={20} anchor="middle" size={14} bold>With a phasing coil</T>
      {panel(120, false)}
      {panel(440, true)}
      <T x={190} y={100} size={13} bold color={C.bad}>upper current</T>
      <T x={190} y={118} size={13} bold color={C.bad}>reversed</T>
      <T x={190} y={225} size={13} color={C.muted}>lower current</T>
      <T x={138} y={ym - 8} size={12} color={C.muted}>junction</T>
      <T x={512} y={ym - 66} size={13} bold color={C.good}>both in step:</T>
      <T x={512} y={ym - 48} size={13} bold color={C.good}>fields add</T>
      <T x={512} y={ym + 4} size={12} bold color={C.power}>phasing coil</T>
    </Diagram>
  )
}
