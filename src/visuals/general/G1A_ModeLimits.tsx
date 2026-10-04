import { C, Diagram, Ln, T } from '../kit'

/** Mode limits within General bands: 30 m has no phone or images; 10 m takes CW everywhere, repeaters sit at the top. */
export function G1A_ModeLimits() {
  const lo = 28.0
  const hi = 29.7
  const X0 = 20
  const X1 = 620
  const sx = (f: number) => X0 + ((f - lo) / (hi - lo)) * (X1 - X0)
  return (
    <Diagram w={640} h={230} title="Mode limits. On 30 meters phone and image transmission are prohibited. On 10 meters CW is allowed across the whole band, and repeaters operate in the portion above 29.5 MHz" caption="10 m strip to scale.">
      <rect x={6} y={8} width={628} height={44} rx={10} fill={C.bad} fillOpacity={0.1} stroke={C.bad} strokeWidth={2} />
      <T x={20} y={30} bold size={17}>30 m</T>
      <T x={90} y={30} size={14} bold color={C.bad}>No phone.  No images.</T>

      <T x={6} y={104} bold size={17}>10 m</T>
      <rect x={X0} y={124} width={X1 - X0} height={30} rx={4} fill={C.signal} fillOpacity={0.18} stroke={C.signal} strokeWidth={2} />
      <T x={X0 + 8} y={139} size={13} bold>CW: the entire band</T>
      <rect x={sx(29.5)} y={124} width={X1 - sx(29.5)} height={30} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2} />
      <Ln x1={sx(29.5)} y1={154} x2={sx(29.5)} y2={170} color={C.power} width={2} />
      <T x={sx(29.5)} y={184} anchor="middle" size={13} bold color={C.power}>repeaters: above 29.5</T>
      <T x={X0} y={170} size={12} mono color={C.muted}>28.0</T>
      <T x={X1} y={170} size={12} mono color={C.muted} anchor="end">29.7</T>
    </Diagram>
  )
}
