import { C, Diagram, T } from '../kit'

// The 40 CB channels in frequency order, 26.965 to 27.405 MHz. Channels 23, 24 and 25 are out of numeric order.
const ORDER = [...Array.from({ length: 22 }, (_, i) => i + 1), 24, 25, 23, ...Array.from({ length: 15 }, (_, i) => i + 26)]
const CELL = 28, STEP = 31, X0 = 16

const tone = (n: number) => (n === 9 ? C.bad : n >= 23 && n <= 25 ? C.resist : C.signal)

/** All 40 CB channels as boxes in order of frequency, with channel 9 and the 23-24-25 quirk picked out. */
export function WhatIsCbRadio_Channels() {
  return (
    <Diagram w={640} h={236}
      title="The 40 CB channels drawn in order of frequency, from 26.965 to 27.405 megahertz, in two rows of twenty. Channel 9, at 27.065, is reserved for emergency communications and traveler assistance. Channels 23, 24 and 25 break the numbering: in frequency order they run 24, 25, then 23, because 23 is 27.255, 24 is 27.235 and 25 is 27.245."
      caption="Channel numbers in order of frequency. The numbers jump around at 23, 24 and 25; every other channel is in step.">
      <T x={X0} y={18} size={13} bold>Lowest frequency: 26.965 MHz, channel 1</T>
      {ORDER.slice(0, 20).map((n, i) => (
        <g key={n}>
          <rect x={X0 + i * STEP} y={32} width={CELL} height={30} rx={5} fill={tone(n)} fillOpacity={0.25} stroke={tone(n)} strokeWidth={2} />
          <T x={X0 + i * STEP + CELL / 2} y={47} size={12.5} bold anchor="middle">{n}</T>
        </g>
      ))}
      <T x={X0} y={86} size={13} bold>Continuing upward, to 27.405 MHz, channel 40</T>
      {ORDER.slice(20).map((n, i) => (
        <g key={n}>
          <rect x={X0 + i * STEP} y={100} width={CELL} height={30} rx={5} fill={tone(n)} fillOpacity={0.25} stroke={tone(n)} strokeWidth={2} />
          <T x={X0 + i * STEP + CELL / 2} y={115} size={12.5} bold anchor="middle">{n}</T>
        </g>
      ))}

      <rect x={X0} y={158} width={14} height={14} rx={3} fill={C.bad} fillOpacity={0.25} stroke={C.bad} strokeWidth={2} />
      <T x={X0 + 22} y={165} size={13}>Channel 9: emergencies and traveler assistance only</T>
      <rect x={X0} y={186} width={14} height={14} rx={3} fill={C.resist} fillOpacity={0.25} stroke={C.resist} strokeWidth={2} />
      <T x={X0 + 22} y={193} size={13}>Channels 24, 25, 23: the out-of-order stretch</T>
      <rect x={X0} y={214} width={14} height={14} rx={3} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
      <T x={X0 + 22} y={221} size={13}>All other channels</T>
    </Diagram>
  )
}
