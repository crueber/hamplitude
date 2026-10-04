import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, si } from '../kit'

const X0 = 80, X1 = 620, Y0 = 250, Y1 = 40
const GBW = 1e6, A0 = 1e5, FP = GBW / A0 // illustrative: 100 dB DC gain, pole at 10 Hz, unity at 1 MHz
const fx = (f: number) => X0 + (Math.log10(f) / 7) * (X1 - X0)
const gy = (db: number) => Y0 - (db / 120) * (Y0 - Y1)

/** Open-loop gain falls with frequency; gain-bandwidth is where it reaches 1. An ideal op-amp stays flat. */
export function GainBandwidth() {
  const [g, setG] = useState(100)
  const gdb = 20 * Math.log10(g)
  const fcl = GBW / g
  const open: string[] = []
  for (let i = 0; i <= 140; i++) {
    const f = 10 ** ((7 * i) / 140)
    const db = 20 * Math.log10(A0 / Math.sqrt(1 + (f / FP) ** 2))
    if (db < 0) break
    open.push(`${i ? 'L' : 'M'}${fx(f).toFixed(1)},${gy(db).toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={366} title={`Op-amp gain against frequency. Open-loop gain falls steadily and reaches 1 at the gain-bandwidth frequency. A closed-loop gain of ${g} stays flat until it meets that curve at ${si(fcl, 'Hz')}. An ideal op-amp would stay flat at all frequencies.`}
        caption="Illustrative numbers. Real op-amps lose gain as frequency rises; the ideal one does not.">
        <Ln x1={X0} y1={Y0} x2={X1} y2={Y0} color={C.muted} width={2} />
        <Ln x1={X0} y1={Y1} x2={X0} y2={Y0} color={C.muted} width={2} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((e) => (
          <g key={e}>
            <Ln x1={fx(10 ** e)} y1={Y0} x2={fx(10 ** e)} y2={Y0 + 6} color={C.muted} width={1.5} />
            <T x={fx(10 ** e)} y={Y0 + 20} anchor="middle" size={12} color={C.muted}>{si(10 ** e, 'Hz', 1).replace(' ', '').replace('Hz', '')}</T>
          </g>
        ))}
        <T x={X1} y={Y0 + 40} anchor="end" size={12} color={C.muted}>frequency (Hz)</T>
        {[0, 40, 80, 120].map((d) => (
          <g key={d}>
            <Ln x1={X0 - 5} y1={gy(d)} x2={X0} y2={gy(d)} color={C.muted} width={1.5} />
            <T x={X0 - 9} y={gy(d)} anchor="end" size={12} color={C.muted}>{d}</T>
          </g>
        ))}
        <T x={X0 - 9} y={Y1 - 20} anchor="end" size={12} color={C.muted}>gain (dB)</T>
        {/* gain = 1 line */}
        <Ln x1={X0} y1={gy(0)} x2={X1} y2={gy(0)} color={C.muted} width={1} dash="3 5" />
        <path d={open.join('')} fill="none" stroke={C.bad} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={fx(1.3)} y={gy(100) - 14} size={13} bold color={C.bad}>real open-loop gain</T>
        {/* closed loop */}
        <Ln x1={X0} y1={gy(gdb)} x2={fx(fcl)} y2={gy(gdb)} color={C.signal} width={3.5} />
        <Ln x1={fx(fcl)} y1={gy(gdb)} x2={X1} y2={gy(gdb)} color={C.good} width={2.5} dash="7 5" />
        <circle cx={fx(fcl)} cy={gy(gdb)} r={5} fill={C.signal} />
        <T x={fx(fcl) - 10} y={gy(gdb) + 18} anchor="end" size={12} bold color={C.signal}>×{g} gain: flat up to {si(fcl, 'Hz', 2)}</T>
        {/* GBW marker */}
        <circle cx={fx(GBW)} cy={gy(0)} r={6} fill={C.resist} />
        <Ln x1={fx(GBW)} y1={gy(0)} x2={fx(GBW)} y2={gy(0) - 30} color={C.resist} width={2} />
        <T x={fx(GBW)} y={gy(0) - 44} anchor="middle" size={13} bold color={C.resist}>gain-bandwidth</T>
        <T x={fx(GBW)} y={gy(0) - 62} anchor="middle" size={12} color={C.resist}>open-loop gain = 1</T>
        <Ln x1={X0} y1={298} x2={X0 + 30} y2={298} color={C.bad} width={3.5} />
        <T x={X0 + 40} y={298} size={13}>real op-amp, open loop: gain falls as frequency rises</T>
        <Ln x1={X0} y1={320} x2={X0 + 30} y2={320} color={C.signal} width={3.5} />
        <T x={X0 + 40} y={320} size={13}>with feedback: flat until it meets the real curve</T>
        <Ln x1={X0} y1={342} x2={X0 + 30} y2={342} color={C.good} width={2.5} dash="7 5" />
        <T x={X0 + 40} y={342} size={13}>ideal op-amp: gain does not vary with frequency</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Closed-loop gain" value={g} onChange={setG} options={[10, 100, 1000].map((n) => ({ value: n, label: `Gain ×${n}` }))} />
      </div>
    </>
  )
}
