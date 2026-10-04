import { C, Diagram, T } from '../kit'

/** Transmissions the pool says are allowed vs not allowed. */
export function G1B_OneWay() {
  const yes = ['One-way Morse code learning', 'transmissions', 'Occasional retransmission of US', 'government weather and', 'propagation forecasts']
  const no = ['Unidentified tests, even under 10 seconds', 'Automatic retransmission by any station', 'Encrypted messages', 'Regular equipment-for-sale transmissions']
  return (
    <Diagram w={640} h={220} title="Allowed: one-way Morse code learning transmissions and occasional retransmission of US government weather and propagation forecasts. Not allowed: unidentified tests, automatic retransmission by any station, encrypted messages, regular sales offers" caption="One-way and relayed transmissions.">
      <rect x={6} y={6} width={310} height={208} rx={10} fill={C.good} fillOpacity={0.12} stroke={C.good} strokeWidth={2} />
      <T x={22} y={28} bold size={16} color={C.good}>Allowed</T>
      {yes.map((s, i) => <T key={s} x={22} y={62 + i * 22 + (i > 1 ? 14 : 0)} size={13}>{s}</T>)}
      <rect x={324} y={6} width={310} height={208} rx={10} fill={C.bad} fillOpacity={0.12} stroke={C.bad} strokeWidth={2} />
      <T x={340} y={28} bold size={16} color={C.bad}>Not allowed</T>
      {no.map((s, i) => <T key={s} x={340} y={62 + i * 34} size={13}>{s}</T>)}
    </Diagram>
  )
}
