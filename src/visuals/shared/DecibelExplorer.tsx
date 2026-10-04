import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, clamp, fmt } from '../kit'

const MIN = -12, MAX = 20
const MARKS: [number, string][] = [[-10, '÷10'], [-6, '÷4'], [-3, '÷2'], [0, '×1'], [3, '×2'], [6, '×4'], [10, '×10'], [20, '×100']]
const sgn = (n: number) => (n > 0 ? '+' : n < 0 ? '−' : '') + Math.abs(n)

/** dB is a ratio on a log scale: +3 dB doubles power, +10 dB is ×10, negative dB is a loss. */
export function DecibelExplorer() {
  const [db, setDb] = useState(3)
  const [pin, setPin] = useState(5)
  const ratio = 10 ** (db / 10)
  const pout = pin * ratio
  const lx0 = 50, lx1 = 600
  const X = (d: number) => lx0 + ((d - MIN) / (MAX - MIN)) * (lx1 - lx0)
  const mx = X(clamp(db, MIN, MAX))
  const gain = db >= 0
  const col = db === 0 ? C.muted : gain ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={262}
        title={`Decibel scale. A change of ${sgn(db)} dB multiplies power by ${fmt(ratio)}: ${pin} watts becomes ${fmt(pout)} watts.`}
        caption="Every +3 dB roughly doubles power. Every +10 dB multiplies it by 10.">
        {MARKS.map(([d, r]) => (
          <g key={d}>
            <T x={X(d)} y={28} anchor="middle" size={13} bold color={C.ink}>{r}</T>
            <Ln x1={X(d)} y1={58} x2={X(d)} y2={74} color={C.muted} width={2} />
            <T x={X(d)} y={90} anchor="middle" size={12} mono color={C.muted}>{sgn(d)}</T>
          </g>
        ))}
        <Ln x1={lx0} y1={66} x2={lx1} y2={66} color={C.fill2} width={5} />
        <Ln x1={X(0)} y1={66} x2={mx} y2={66} color={col} width={5} />
        <circle cx={mx} cy={66} r={9} fill={col} stroke={C.bg} strokeWidth={3} />

        <g transform="translate(0,6)">
          <rect x={12} y={112} width={616} height={132} rx={14} fill={C.fill} />
          <T x={110} y={140} anchor="middle" size={13} color={C.muted}>power in</T>
          <T x={110} y={172} anchor="middle" bold size={30} color={C.power}>{pin} W</T>
          <Ln x1={190} y1={172} x2={450} y2={172} color={col} width={4} arrow />
          <T x={320} y={140} anchor="middle" bold size={20} color={col}>{sgn(db)} dB</T>
          <T x={320} y={204} anchor="middle" size={14} color={C.ink}>power × {fmt(ratio)}</T>
          <T x={530} y={140} anchor="middle" size={13} color={C.muted}>power out</T>
          <T x={530} y={172} anchor="middle" bold size={30} color={C.power}>{fmt(pout)} W</T>
          <T x={320} y={230} anchor="middle" size={12} color={C.muted}>dB depends on the ratio only, never on how many watts</T>
        </g>
      </Diagram>
      <Controls>
        <Slider label="Gain or loss" value={db} min={MIN} max={MAX} onChange={setDb} format={(v) => `${sgn(v)} dB`} color="var(--d-power)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Power in</span>
          <Choice label="Power in" value={pin} onChange={setPin} options={[1, 5, 12, 20].map((v) => ({ value: v, label: `${v} W` }))} />
        </div>
      </Controls>
    </>
  )
}
