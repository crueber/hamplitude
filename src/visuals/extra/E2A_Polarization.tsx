import { C, Diagram, Ln, T, useTime } from '../kit'

const GX0 = 70, GX1 = 610, GY0 = 40, GY1 = 200

/** A spinning satellite (or Faraday rotation) swings polarization. A linear antenna fades with it; a circular antenna does not. */
export function E2A_Polarization() {
  const { t, ref } = useTime(1)
  const ph = (t * 0.25) % 1 // fraction of a half turn
  const X = (a: number) => GX0 + a * (GX1 - GX0)
  const lin = Array.from({ length: 91 }, (_, i) => { const a = i / 90; return `${i ? 'L' : 'M'}${X(a).toFixed(1)},${(GY1 - (GY1 - GY0) * Math.cos(Math.PI * a) ** 2).toFixed(1)}` }).join('')
  const my = (a: number) => GY1 - (GY1 - GY0) * Math.cos(Math.PI * a) ** 2
  const circY = GY1 - (GY1 - GY0) * 0.5
  return (
    <Diagram w={640} h={290} svgRef={ref} title="Received signal strength versus how far the signal's polarization has rotated. A linearly polarized antenna swings between full strength and nothing. A circularly polarized antenna stays steady at half power."
      caption="Spin or Faraday rotation twists the wave. Circular polarization ignores the twist.">
      <Ln x1={GX0} y1={GY1} x2={GX1} y2={GY1} color={C.muted} width={1.5} />
      <Ln x1={GX0} y1={GY0 - 6} x2={GX0} y2={GY1} color={C.muted} width={1.5} />
      <T x={GX0 - 8} y={GY0} anchor="end" size={12} color={C.muted}>strong</T>
      <T x={GX0 - 8} y={GY1} anchor="end" size={12} color={C.muted}>none</T>
      <path d={lin} fill="none" stroke={C.bad} strokeWidth={3.5} />
      <Ln x1={GX0} y1={circY} x2={GX1} y2={circY} color={C.good} width={3.5} />
      <T x={X(0.5)} y={GY0 - 14} anchor="middle" size={14} bold color={C.bad}>Linear antenna: fades in and out</T>
      <T x={X(0.5)} y={circY - 14} anchor="middle" size={14} bold color={C.good}>Circular: steady</T>
      <Ln x1={X(ph)} y1={GY0 - 4} x2={X(ph)} y2={GY1} color={C.muted} width={1.2} dash="4 4" />
      <circle cx={X(ph)} cy={my(ph)} r={7} fill={C.bad} stroke={C.bg} strokeWidth={2.5} />
      <circle cx={X(ph)} cy={circY} r={7} fill={C.good} stroke={C.bg} strokeWidth={2.5} />
      <T x={X(0)} y={GY1 + 18} anchor="middle" size={12} color={C.muted}>aligned</T>
      <T x={X(0.5)} y={GY1 + 18} anchor="middle" size={12} color={C.muted}>wave turned 90°</T>
      <T x={X(1)} y={GY1 + 18} anchor="middle" size={12} color={C.muted}>aligned</T>
      <T x={320} y={GY1 + 52} anchor="middle" size={13.5}>Twist comes from a <tspan fontWeight={700}>spinning satellite</tspan> (spin modulation) or the ionosphere (<tspan fontWeight={700}>Faraday rotation</tspan>).</T>
      <T x={320} y={GY1 + 74} anchor="middle" size={13} color={C.muted}>The circular antenna gives up 3 dB (half the power) to a linear wave, but always the same 3 dB.</T>
    </Diagram>
  )
}
