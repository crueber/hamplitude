import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Ln, Box } from '../kit'

/** Efficiency = RF out / DC in. Whatever does not leave as RF is heat. */
export function Efficiency() {
  const [dc, setDc] = useState(200)
  const [rf, setRf] = useState(120)
  const out = Math.min(rf, dc)
  const heat = dc - out
  const eff = (out / dc) * 100
  const H = 150, top = 60
  const hOut = (H * out) / dc
  return (
    <>
      <Diagram w={640} h={250} title={`Amplifier drawing ${dc} watts DC and delivering ${out} watts RF. Heat is ${heat} watts. Efficiency is ${out} divided by ${dc}, which is ${eff.toFixed(0)} percent.`}
        caption="Efficiency = RF output ÷ DC input. The rest of the DC power turns into heat.">
        <Box x={40} y={top} w={110} h={H} label="DC in" sub={`${dc} W`} color={C.power} />
        <Ln x1={150} y1={top + H / 2} x2={226} y2={top + H / 2} color={C.power} width={3} arrow />
        <Box x={228} y={top + 20} w={120} h={H - 40} label="Amplifier" color={C.ink} />
        {/* output split bar */}
        <rect x={420} y={top} width={60} height={H} rx={8} fill={C.fill} />
        <rect x={420} y={top} width={60} height={H - hOut} rx={8} fill={C.bad} opacity={0.4} />
        <rect x={420} y={top + H - hOut} width={60} height={hOut} rx={8} fill={C.signal} opacity={0.85} />
        <Ln x1={348} y1={top + H / 2} x2={416} y2={top + H / 2} color={C.ink} width={3} arrow />
        <T x={494} y={top + H - hOut / 2} size={14} bold color={C.signal}>RF out {out} W</T>
        <T x={494} y={top + (H - hOut) / 2} size={14} bold color={C.bad}>{heat > 0 ? `heat ${heat} W` : ''}</T>
        <T x={40} y={32} size={14} bold>Efficiency = {out} ÷ {dc} = {eff.toFixed(0)}%</T>
      </Diagram>
      <Controls>
        <Slider label="DC power in" value={dc} min={50} max={400} step={10} onChange={setDc} format={(v) => `${v} W`} color={C.power} />
        <Slider label="RF power out" value={out} min={10} max={dc} step={10} onChange={setRf} format={(v) => `${v} W`} color={C.signal} />
        <Readout label="Efficiency" value={eff.toFixed(0)} unit="%" color={C.good} />
      </Controls>
    </>
  )
}
