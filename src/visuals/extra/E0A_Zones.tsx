import { C, Diagram, Ln, T } from '../kit'

/** Field falls with distance. Your neighbor is the general public, so the stricter uncontrolled limit applies there. */
export function Zones() {
  const x0 = 60, y0 = 230
  const off = (x: number) => 190 * Math.exp(-(x - x0) / 100)
  const path = Array.from({ length: 56 }, (_, i) => `${i ? 'L' : 'M'}${x0 + i * 10},${(y0 - 8 - off(x0 + i * 10)).toFixed(1)}`).join('')
  const yCtl = 118, yUnc = 168
  return (
    <Diagram w={640} h={282} title="Exposure falls with distance from your antenna. At a neighbor's home you must meet the uncontrolled maximum permissible exposure limits, which are lower than the controlled limits"
      caption="Schematic. MPE = maximum permissible exposure. Where the curve is under the uncontrolled line, you are compliant.">
      <T x={20} y={22} size={13} bold color={C.muted}>exposure level</T>
      <Ln x1={x0} y1={y0} x2={610} y2={y0} color={C.muted} width={2} arrow />
      <Ln x1={x0} y1={y0} x2={x0} y2={36} color={C.muted} width={2} arrow />
      <T x={610} y={y0 + 40} anchor="end" size={13} color={C.muted}>distance from antenna</T>
      <Ln x1={x0} y1={yCtl} x2={600} y2={yCtl} color={C.resist} width={2.5} dash="8 6" />
      <T x={600} y={yCtl - 12} anchor="end" size={13} bold color={C.resist}>controlled limit (aware, trained people)</T>
      <Ln x1={x0} y1={yUnc} x2={600} y2={yUnc} color={C.bad} width={3} />
      <T x={600} y={yUnc + 14} anchor="end" size={13} bold color={C.bad}>uncontrolled limit: stricter (general public)</T>
      <path d={path} fill="none" stroke={C.signal} strokeWidth={4} strokeLinecap="round" />
      <rect x={x0 - 40} y={y0 - 34} width={34} height={34} rx={4} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <Ln x1={x0 - 23} y1={y0 - 34} x2={x0 - 23} y2={y0 - 58} color={C.ink} width={3} />
      <T x={x0 - 23} y={y0 + 20} anchor="middle" size={13} bold>you</T>
      <circle cx={431} cy={y0 - 8 - off(431)} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
      <Ln x1={431} y1={y0 - 8 - off(431)} x2={431} y2={y0} color={C.good} width={2} dash="3 5" />
      <T x={431} y={y0 + 20} anchor="middle" color={C.good} size={13} bold>neighbor's home</T>
      <Ln x1={185} y1={yUnc} x2={185} y2={y0} color={C.bad} width={2} dash="3 5" />
      <T x={178} y={y0 - 36} anchor="end" size={12} bold color={C.bad}>public must be</T>
      <T x={178} y={y0 - 20} anchor="end" size={12} bold color={C.bad}>beyond here</T>
    </Diagram>
  )
}
