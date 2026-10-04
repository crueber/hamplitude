import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const VREF = 3.3

/** An ADC turns a voltage into a binary code; a DAC turns the code back into a voltage. The gap between them is quantization error. */
export function AdcAndDac_Code() {
  const [bits, setBits] = useState(4)
  const [mv, setMv] = useState(1234)
  const levels = 2 ** bits
  const lsb = (VREF * 1000) / levels // mV
  const code = Math.min(levels - 1, Math.floor(mv / lsb))
  const vOut = code * lsb
  const err = mv - vOut
  const x0 = 40, x1 = 600
  const X = (v: number) => x0 + (v / (VREF * 1000)) * (x1 - x0)
  const bw = Math.min(44, 560 / bits)
  const bx0 = 320 - (bw * bits) / 2
  const bin = code.toString(2).padStart(bits, '0')
  const ticks = levels <= 32 ? Array.from({ length: levels + 1 }, (_, i) => i * lsb) : []
  return (
    <>
      <Diagram w={640} h={300}
        title={`A ${bits}-bit converter with a ${VREF} volt reference splits 0 to ${VREF} volts into ${levels} steps of ${lsb.toFixed(3)} millivolts. An input of ${mv} millivolts gives the code ${bin} (${code}); converting that back gives ${vOut.toFixed(1)} millivolts.`}
        caption="The input is rounded down to the nearest step. The leftover, up to one step (1 LSB), is quantization error.">
        <T x={x0} y={18} size={13} bold color={C.muted}>Analog voltage, 0 to {VREF} V</T>
        <rect x={x0} y={44} width={x1 - x0} height={22} rx={4} fill={C.fill} />
        {ticks.map((t, i) => <Ln key={i} x1={X(t)} y1={44} x2={X(t)} y2={66} color={C.fill2} width={1.5} />)}
        <rect x={x0} y={44} width={X(vOut) - x0} height={22} rx={4} fill={C.good} opacity={0.35} />
        <Ln x1={X(mv)} y1={36} x2={X(mv)} y2={76} color={C.voltage} width={3} />
        <T x={Math.min(X(mv), 520)} y={92} anchor="middle" size={13} bold color={C.voltage}>in: {mv} mV</T>
        <Ln x1={X(vOut)} y1={44} x2={X(vOut)} y2={76} color={C.good} width={3} dash="5 3" />
        <T x={Math.min(X(vOut), 520)} y={112} anchor="middle" size={13} bold color={C.good}>back out: {vOut.toFixed(1)} mV</T>
        <T x={x0} y={146} size={13} bold color={C.muted}>ADC output code ({bits} bits, 1 = high)</T>
        {bin.split('').map((b, i) => {
          const w = 2 ** (bits - 1 - i)
          return (
            <g key={i}>
              <rect x={bx0 + i * bw + 2} y={160} width={bw - 4} height={44} rx={6} fill={b === '1' ? C.signal : C.fill} stroke={b === '1' ? C.signal : C.muted} strokeWidth={1.5} />
              <T x={bx0 + i * bw + bw / 2} y={182} anchor="middle" mono bold size={17} color={b === '1' ? C.bg : C.muted}>{b}</T>
              <T x={bx0 + i * bw + bw / 2} y={218} anchor="middle" size={12} color={C.muted}>{w}</T>
            </g>
          )
        })}
        <T x={320} y={252} anchor="middle" size={14} bold>{`code ${code} of ${levels - 1}   ×   ${lsb.toFixed(3)} mV per step  =  ${vOut.toFixed(1)} mV`}</T>
        <T x={320} y={278} anchor="middle" size={13} color={C.muted}>{`1 LSB = ${VREF} V ÷ ${levels} = ${lsb.toFixed(3)} mV   ·   error = ${err.toFixed(1)} mV`}</T>
      </Diagram>
      <Controls>
        <Choice label="Resolution" value={bits} onChange={setBits} options={[3, 4, 8, 10, 12].map((v) => ({ value: v, label: `${v} bits` }))} />
        <Slider label="Input voltage" value={mv} min={0} max={3300} step={1} onChange={setMv} format={(v) => `${v} mV`} color="var(--d-voltage)" />
        <Readout label="Quantization error" value={err.toFixed(2)} unit=" mV" color="var(--d-power)" />
      </Controls>
    </>
  )
}
