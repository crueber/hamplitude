import { useState } from 'react'
import { C, Controls, Diagram, Slider, T, TAU, fmt } from '../kit'

const sup = (n: number) => String(n).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('')

/** Quantisation: n bits give 2^n levels. Step = full range ÷ levels. */
export function Bits() {
  const [bits, setBits] = useState(10)
  const levels = 2 ** bits
  const step = 1 / levels // volts, for a 1 V range
  const X0 = 30, X1 = 400, Y0 = 40, Y1 = 250
  const N = 120
  const q = (v: number) => Math.min(levels - 1, Math.floor(v * levels)) / levels + step / 2
  const stair: string[] = [], smooth: string[] = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const v = 0.5 + 0.48 * Math.sin(TAU * t)
    const x = X0 + t * (X1 - X0)
    smooth.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(Y1 - v * (Y1 - Y0)).toFixed(1)}`)
    stair.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(Y1 - q(v) * (Y1 - Y0)).toFixed(1)}`)
  }
  const ok = step <= 0.001
  return (
    <>
      <Diagram w={640} h={300}
        title={`An analog-to-digital converter with ${bits} bits has ${levels} levels. Over a 1 volt range each step is ${fmt(step * 1000)} millivolts. ${ok ? 'That resolves 1 millivolt.' : 'That is too coarse to resolve 1 millivolt.'}`}
        caption="More bits, finer steps, weaker signals can be detected. The reference voltage sets the full-scale range.">
        <rect x={X0 - 10} y={Y0 - 14} width={X1 - X0 + 20} height={Y1 - Y0 + 28} rx={10} fill={C.fill} />
        <path d={smooth.join('')} fill="none" stroke={C.signal} strokeWidth={2} strokeDasharray="5 4" />
        <path d={stair.join('')} fill="none" stroke={C.resist} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={X0} y={Y0 - 28} size={12} color={C.muted}>1 V range (full scale)</T>
        <T x={X1 + 20} y={Y0} size={12} color={C.muted}>1 V</T>
        <T x={X1 + 20} y={Y1} size={12} color={C.muted}>0 V</T>
        <rect x={452} y={34} width={174} height={216} rx={12} fill={C.fill} />
        <T x={539} y={56} anchor="middle" size={13} color={C.muted}>bits</T>
        <T x={539} y={82} anchor="middle" size={26} bold color={C.resist}>{bits}</T>
        <T x={539} y={116} anchor="middle" size={13} color={C.muted}>levels = 2{sup(bits)}</T>
        <T x={539} y={138} anchor="middle" size={20} bold>{levels.toLocaleString('en-US')}</T>
        <T x={539} y={174} anchor="middle" size={13} color={C.muted}>step = 1 V ÷ {levels.toLocaleString('en-US')}</T>
        <T x={539} y={196} anchor="middle" size={20} bold color={C.power}>{fmt(step * 1000)} mV</T>
        <T x={539} y={232} anchor="middle" size={14} bold color={ok ? C.good : C.bad}>{ok ? 'resolves 1 mV' : 'too coarse for 1 mV'}</T>
        <T x={320} y={284} anchor="middle" size={13} color={C.muted}>dashed = the real signal, solid = what the converter can say</T>
      </Diagram>
      <Controls>
        <Slider label="Sample width" value={bits} min={2} max={12} onChange={setBits} format={(v) => `${v} bits`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
