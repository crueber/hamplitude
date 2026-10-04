import { C, Diagram, T } from '../kit'

/** Technician power limits as bars. */
export function T1B_Power() {
  const x0 = 190, full = 350
  const bar = (y: number, label: string, sub: string, w: number, text: string) => (
    <g>
      <T x={6} y={y + 14} bold size={14}>{label}</T>
      <T x={6} y={y + 34} size={12.5} color={C.muted}>{sub}</T>
      <rect x={x0} y={y} width={w} height={44} rx={8} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2} />
      <T x={x0 + w + 8} y={y + 22} bold size={20} color={C.power}>{text}</T>
    </g>
  )
  return (
    <Diagram w={640} h={170} title="Technician maximum power: 200 watts peak envelope power on HF segments, 1500 watts above 30 megahertz" caption="PEP (peak envelope power) = the power at the peaks of your signal. Bars to scale.">
      {bar(20, 'Technician HF', '80, 40, 15, 10 m segments', (200 / 1500) * full, '200 W')}
      {bar(94, 'Above 30 MHz', '6 m, 2 m, 70 cm …', full, '1500 W')}
    </Diagram>
  )
}
