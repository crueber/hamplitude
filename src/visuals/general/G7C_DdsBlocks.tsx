import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

const BW = 106, BG = 20
const bx = (i: number) => 15 + i * (BW + BG)
const GY = 176, GH = 44

/** Direct digital synthesizer: a fixed crystal clock, a counter that steps by the tuning word, a sine table and a DAC. */
export function DdsBlocks() {
  const [word, setWord] = useState(2)
  const g = (i: number) => ({ x0: bx(i) + 8, x1: bx(i) + BW - 8 })
  const mk = (i: number, f: (u: number) => number) => {
    const { x0, x1 } = g(i)
    return Array.from({ length: 81 }, (_, k) => `${(x0 + ((x1 - x0) * k) / 80).toFixed(1)},${(GY + GH / 2 - f(k / 80) * (GH / 2 - 4)).toFixed(1)}`).join(' ')
  }
  const sq = (u: number) => (Math.floor(u * 16) % 2 === 0 ? 1 : -1)
  const saw = (u: number) => 1 - 2 * ((u * word) % 1)
  const sin = (u: number) => Math.sin(TAU * word * u)
  const stairs = (u: number) => Math.sin(TAU * word * (Math.floor(u * 24) / 24))
  const names = [['Crystal', 'clock'], ['Phase', 'accumulator'], ['Sine', 'table'], ['DAC'], ['Low-pass', 'filter']]
  const subs = [['fixed, stable'], ['adds the tuning', 'word each tick'], ['phase becomes', 'a sine value'], ['numbers become', 'a voltage'], ['smooths the', 'steps']]
  const fns = [sq, saw, stairs, stairs, sin]
  const cols = [C.resist, C.power, C.power, C.current, C.signal]
  return (
    <>
      <Diagram w={640} h={270} title="Direct digital synthesizer. A fixed crystal clock drives a phase accumulator that adds a tuning word each tick. A sine table turns the phase into numbers, a DAC makes voltages and a low-pass filter smooths them into a sine wave. A bigger tuning word gives a higher output frequency."
        caption="One crystal, many frequencies: the tuning word sets the output, the crystal sets the accuracy.">
        {names.map((n, i) => (
          <g key={i}>
            <rect x={bx(i)} y={64} width={BW} height={92} rx={10} fill={C.fill} stroke={cols[i]} strokeWidth={2} />
            {n.map((l, k) => <T key={k} x={bx(i) + BW / 2} y={84 + k * 16} anchor="middle" bold size={13}>{l}</T>)}
            {subs[i].map((l, k) => <T key={k} x={bx(i) + BW / 2} y={126 + k * 14} anchor="middle" size={11.5} color={C.muted}>{l}</T>)}
            {i < 4 && <Ln x1={bx(i) + BW + 2} y1={110} x2={bx(i + 1) - 2} y2={110} color={C.ink} width={2} arrow />}
            <rect x={bx(i)} y={GY} width={BW} height={GH} rx={6} fill={C.fill} />
            <polyline points={mk(i, fns[i])} fill="none" stroke={cols[i]} strokeWidth={2.4} strokeLinejoin="round" />
            <Ln x1={bx(i) + BW / 2} y1={158} x2={bx(i) + BW / 2} y2={GY - 4} color={C.fill2} width={2} />
          </g>
        ))}
        <rect x={bx(1)} y={8} width={BW} height={30} rx={8} fill={C.fill} stroke={C.voltage} strokeWidth={2} />
        <T x={bx(1) + BW / 2} y={23} anchor="middle" bold size={13} color={C.voltage}>Tuning word</T>
        <Ln x1={bx(1) + BW / 2} y1={38} x2={bx(1) + BW / 2} y2={62} color={C.voltage} width={2.5} arrow />
        <T x={bx(1) + BW + 12} y={23} size={12} color={C.muted}>you choose it: bigger word, faster ramp, higher output</T>
        <T x={bx(0) + BW / 2} y={GY + GH + 18} anchor="middle" size={12} color={C.resist} bold>never changes</T>
        <T x={bx(4) + BW / 2} y={GY + GH + 18} anchor="middle" size={12} color={C.signal} bold>{word} cycle{word > 1 ? 's' : ''} out</T>
      </Diagram>
      <Controls>
        <Slider label="Tuning word" value={word} min={1} max={6} onChange={setWord} format={(v) => `${v}`} color={C.voltage} />
        <Readout label="Output frequency" value={word} unit="× lowest step" color={C.signal} />
      </Controls>
    </>
  )
}
