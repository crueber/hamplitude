import { C, Diagram, T, TAU } from '../kit'

/** Same transmitter power: a dipole spreads it out, a high-gain dish packs it into a narrow, intense beam. */
export function HighGain() {
  const lobe = (cx: number, cy: number, narrow: boolean) => Array.from({ length: 121 }, (_, i) => {
    const a = (i / 120) * TAU - Math.PI
    const r = narrow ? 18 + 150 * Math.pow(Math.max(0, Math.cos(a)), 40) : 50
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * 0.9 * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  return (
    <Diagram w={640} h={260} title="At microwave frequencies, high-gain antennas such as dishes focus the power into a narrow beam. Even with modest transmitter power, the exposure inside the beam can be high"
      caption="Microwaves are non-ionizing. The hazard is the intense, focused beam.">
      <T x={160} y={26} anchor="middle" size={15} bold color={C.good}>Dipole: spread out</T>
      <path d={lobe(160, 140, false)} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={3} />
      <T x={160} y={140} anchor="middle" size={13} bold color={C.muted}>low gain</T>
      <T x={470} y={26} anchor="middle" size={15} bold color={C.bad}>Dish: focused beam</T>
      <path d={lobe(330, 140, true)} fill={C.bad} fillOpacity={0.22} stroke={C.bad} strokeWidth={3} />
      <path d="M330,112 Q316,140 330,168" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <T x={470} y={206} anchor="middle" size={14} bold color={C.bad}>high gain: high exposure in the beam</T>
      <T x={320} y={246} anchor="middle" size={13} color={C.muted}>same transmitter power in both</T>
    </Diagram>
  )
}
