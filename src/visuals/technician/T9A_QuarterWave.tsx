import { C, Diagram, Ln, T, sinePath } from '../kit'

/** At 146 MHz one wavelength is about 2 m; a half-wave dipole is half of that; a quarter-wave whip is about 19 inches. */
export function QuarterWave() {
  const W = 640, H = 300, x0 = 40, x1 = 600
  const L = x1 - x0
  return (
    <Diagram w={W} h={H} title="On 2 meters one wavelength is about 2 meters. A half-wave dipole is half that and a quarter-wave vertical is a quarter, about 19 inches"
      caption="Same band, three lengths drawn to scale. The 19-inch whip is one quarter of the wave.">
      <T x={x0} y={20} bold size={14} color={C.signal}>One wavelength on 2 m (146 MHz): about 2 meters</T>
      <path d={sinePath(x0, x1, 62, 24, 1)} fill="none" stroke={C.signal} strokeWidth={3} />
      <Ln x1={x0} y1={104} x2={x1} y2={104} color={C.signal} width={2} arrow="both" />
      <T x={x0 + L / 2} y={122} anchor="middle" size={13} bold color={C.signal}>1 λ</T>

      <Ln x1={x0} y1={170} x2={x0 + L / 2} y2={170} color={C.resist} width={9} />
      <T x={x0 + L / 2 + 16} y={170} size={14} bold color={C.resist}>½ λ: half-wave dipole</T>

      <Ln x1={x0} y1={230} x2={x0 + L / 4} y2={230} color={C.power} width={9} />
      <T x={x0 + L / 4 + 16} y={222} size={14} bold color={C.power}>¼ λ: vertical whip</T>
      <T x={x0 + L / 4 + 16} y={242} size={13} color={C.muted}>about 19 inches, over a metal surface</T>
    </Diagram>
  )
}
