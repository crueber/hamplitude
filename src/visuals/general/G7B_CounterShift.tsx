import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const STREAM = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0]

/** One clock drives both: a 3-bit counter (8 states, wraps) and a 4-bit shift register (data moves one place per tick). */
export function CounterShift() {
  const [n, setN] = useState(5)
  const cnt = n % 8
  const bits = [(cnt >> 2) & 1, (cnt >> 1) & 1, cnt & 1]
  const reg = [0, 1, 2, 3].map((i) => (n - 1 - i >= 0 ? STREAM[n - 1 - i] : 0))
  return (
    <>
      <Diagram w={640} h={340} title={`After ${n} clock pulses the 3-bit counter reads ${bits.join('')} (${cnt}) and the 4-bit shift register holds ${reg.join('')}. The counter has 2 to the power 3, or 8, states. The shift register moves each bit one place per clock.`}
        caption="Same clock, different jobs: the counter counts pulses; the shift register passes data along.">
        <T x={20} y={18} bold size={14}>3-bit counter: 3 bits → 2×2×2 = 8 states</T>
        {bits.map((b, i) => (
          <g key={i}>
            <rect x={20 + i * 70} y={34} width={58} height={50} rx={8} fill={b ? C.good : C.fill} stroke={b ? C.good : C.muted} strokeWidth={2} />
            <T x={49 + i * 70} y={59} anchor="middle" bold size={22} color={b ? C.bg : C.muted}>{b}</T>
          </g>
        ))}
        <T x={49} y={100} anchor="middle" size={12} color={C.muted}>4s</T>
        <T x={119} y={100} anchor="middle" size={12} color={C.muted}>2s</T>
        <T x={189} y={100} anchor="middle" size={12} color={C.muted}>1s</T>
        <T x={250} y={59} bold size={18}>= {cnt}</T>
        {Array.from({ length: 8 }, (_, s) => (
          <g key={s}>
            <rect x={330 + (s % 4) * 74} y={34 + Math.floor(s / 4) * 38} width={66} height={30} rx={6} fill={s === cnt ? C.signal : C.fill} opacity={s === cnt ? 0.9 : 1} />
            <T x={363 + (s % 4) * 74} y={49 + Math.floor(s / 4) * 38} anchor="middle" mono bold size={13} color={s === cnt ? C.bg : C.muted}>{`${(s >> 2) & 1}${(s >> 1) & 1}${s & 1}`}</T>
          </g>
        ))}
        <T x={330} y={118} size={12} color={C.muted}>all 8 states, then it wraps back to 000</T>

        <line x1={20} y1={146} x2={620} y2={146} stroke={C.fill2} strokeWidth={2} />
        <T x={20} y={168} bold size={14}>4-bit shift register: each clock moves every bit one place</T>
        <T x={20} y={196} size={12} color={C.muted}>data waiting</T>
        {STREAM.map((b, i) => (
          <g key={i} opacity={i < n ? 0.25 : 1}>
            <rect x={20 + i * 37} y={208} width={30} height={26} rx={5} fill={i === n ? C.signal : C.fill} />
            <T x={35 + i * 37} y={221} anchor="middle" mono bold size={14} color={i === n ? C.bg : C.ink}>{b}</T>
          </g>
        ))}
        {reg.map((b, i) => (
          <g key={i}>
            <rect x={170 + i * 90} y={262} width={64} height={52} rx={8} fill={b ? C.current : C.fill} stroke={C.ink} strokeWidth={2} />
            <T x={202 + i * 90} y={288} anchor="middle" bold size={22} color={b ? C.bg : C.muted}>{b}</T>
            {i < 3 && <Ln x1={236 + i * 90} y1={288} x2={258 + i * 90} y2={288} color={C.muted} width={2.5} arrow />}
          </g>
        ))}
        <T x={150} y={288} anchor="end" size={13} color={C.muted}>in →</T>
        <T x={540} y={288} size={13} color={C.muted}>→ out</T>
      </Diagram>
      <Controls>
        <Slider label="Clock pulses so far" value={n} min={0} max={16} onChange={setN} color={C.signal} />
        <Readout label="Counter reads" value={cnt} color={C.good} />
      </Controls>
    </>
  )
}
