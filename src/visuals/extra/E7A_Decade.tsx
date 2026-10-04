import { useState } from 'react'
import { C, Diagram, Ln, T } from '../kit'

/** A decade counter: count 0-9 in binary, one output pulse every 10 inputs. */
export function Decade() {
  const [pulses, setPulses] = useState(0)
  const count = pulses % 10
  const out = Math.floor(pulses / 10)
  const bits = [8, 4, 2, 1]
  return (
    <>
      <Diagram w={640} h={250} title={`Decade counter after ${pulses} input pulses: it shows ${count} as binary ${count.toString(2).padStart(4, '0')} and has produced ${out} output ${out === 1 ? "pulse" : "pulses"}.`}
        caption="Ten pulses in, one pulse out. It counts. A decoder is a different part.">
        <rect x={20} y={40} width={110} height={80} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={75} y={68} anchor="middle" bold size={14}>Pulses in</T>
        <T x={75} y={96} anchor="middle" bold size={22} mono color={C.signal}>{pulses}</T>
        <Ln x1={132} y1={80} x2={188} y2={80} color={C.signal} width={2.5} arrow />
        <rect x={192} y={24} width={250} height={140} rx={12} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
        <T x={317} y={46} anchor="middle" bold size={15} color={C.power}>Decade counter</T>
        {bits.map((b, i) => {
          const on = (count & b) !== 0
          const cx = 232 + i * 56
          return (
            <g key={b}>
              <circle cx={cx} cy={92} r={19} fill={on ? C.good : C.fill2} stroke={C.ink} strokeWidth={2} opacity={on ? 1 : 0.7} />
              <T x={cx} y={92} anchor="middle" bold size={16} mono color={on ? C.bg : C.muted}>{on ? 1 : 0}</T>
              <T x={cx} y={126} anchor="middle" size={12} color={C.muted}>{b}</T>
            </g>
          )
        })}
        <T x={317} y={148} anchor="middle" size={13} color={C.muted}>{`count = ${count}`}</T>
        <Ln x1={444} y1={80} x2={500} y2={80} color={C.power} width={2.5} arrow />
        <rect x={504} y={40} width={116} height={80} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={562} y={68} anchor="middle" bold size={14}>Pulses out</T>
        <T x={562} y={96} anchor="middle" bold size={22} mono color={C.power}>{out}</T>
        <T x={320} y={200} anchor="middle" size={14} bold>{`${pulses} ÷ 10 → ${out} output ${out === 1 ? 'pulse' : 'pulses'}, count left at ${count}`}</T>
        <T x={320} y={226} anchor="middle" size={13} color={C.muted}>Divide-by-10: a 10 kHz input gives a 1 kHz output.</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <div className="ctl-choice"><button type="button" onClick={() => setPulses((p) => p + 1)}>Send 1 pulse</button><button type="button" onClick={() => setPulses((p) => p + 10)}>Send 10 pulses</button><button type="button" onClick={() => setPulses(0)}>Reset</button></div>
      </div>
    </>
  )
}
