import { C, Diagram, T } from '../kit'

/** 2200 m and 630 m power limits, as EIRP. */
export function E1A_LowBandPower() {
  const x0 = 150, unit = 70
  const bar = (y: number, label: string, sub: string, w: number, text: string) => (
    <g>
      <T x={6} y={y + 12} bold size={15}>{label}</T>
      <T x={6} y={y + 32} size={12.5} color={C.muted}>{sub}</T>
      <rect x={x0} y={y} width={w} height={44} rx={8} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2} />
      <T x={x0 + w + 10} y={y + 22} bold size={20} color={C.power}>{text}</T>
    </g>
  )
  return (
    <Diagram w={640} h={150} title="Maximum power on the 2200 meter band is 1 watt EIRP and on the 630 meter band is 5 watts EIRP, drawn to scale" caption="Bars to scale. EIRP = equivalent isotropic radiated power: as radiated by the antenna, gain included.">
      {bar(16, '2200 m', 'power limit', unit, '1 W EIRP')}
      {bar(84, '630 m', 'power limit', 5 * unit, '5 W EIRP')}
    </Diagram>
  )
}
