import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const LOADS = [10, 25, 50, 100, 200, 500]
const pOf = (z: number) => Math.log(z / 10) / Math.log(50)

/** SWR = bigger impedance / smaller impedance. 50 Ω line, resistive load. */
export function G9A_SwrLoad() {
  const [p, setP] = useState(pOf(200))
  let z = Math.round(10 * Math.pow(50, p))
  if (Math.abs(z - 50) <= 2) z = 50
  const big = Math.max(z, 50), small = Math.min(z, 50)
  const swr = big / small
  const g = Math.abs(z - 50) / (z + 50)
  const refl = g * g * 100
  const preset = LOADS.find((v) => v === z) ?? -1
  // bar chart on log scale: line Z0 vs load
  const W = 640, H = 210, x0 = 70, x1 = 590, y = 120
  const X = (v: number) => x0 + (Math.log(v / 5) / Math.log(1000 / 5)) * (x1 - x0)
  return (
    <>
      <Diagram w={W} h={H} title={`A 50 ohm line on a ${z} ohm resistive load: ${fmt(big, 3)} divided by ${fmt(small, 3)} gives an SWR of ${fmt(swr, 3)} to 1, with ${fmt(refl, 3)} percent of the power reflected`}
        caption="SWR = larger ÷ smaller. Always at least 1:1, never 1:4.">
        <Ln x1={x0} y1={y} x2={x1} y2={y} color={C.muted} width={2} />
        {[10, 50, 100, 200, 500].map((v) => (
          <g key={v}>
            <Ln x1={X(v)} y1={y - 5} x2={X(v)} y2={y + 5} color={C.muted} width={2} />
            <T x={X(v)} y={y + 22} anchor="middle" size={12} color={C.muted}>{v} Ω</T>
          </g>
        ))}
        <Ln x1={X(small)} y1={y} x2={X(big)} y2={y} color={swr < 1.05 ? C.good : C.bad} width={6} />
        <circle cx={X(50)} cy={y} r={9} fill={C.signal} stroke={C.bg} strokeWidth={2.5} />
        <circle cx={X(z)} cy={y} r={9} fill={C.resist} stroke={C.bg} strokeWidth={2.5} />
        <T x={X(50)} y={y - 30} anchor="middle" size={13} bold color={C.signal}>line 50 Ω</T>
        {z !== 50 && <T x={X(z)} y={y - 30} anchor="middle" size={13} bold color={C.resist}>load {z} Ω</T>}
        <T x={320} y={36} anchor="middle" size={18} bold color={C.power}>{fmt(big, 3)} ÷ {fmt(small, 3)} = {fmt(swr, 3)} : 1</T>
        <T x={320} y={172} anchor="middle" size={13} color={C.muted}>the farther apart the two impedances, the longer the red bar and the more power bounces back</T>
      </Diagram>
      <Controls>
        <Slider label="Load resistance" value={p} min={0} max={1} step={0.002} onChange={setP} format={() => `${z} Ω`} color="var(--d-resist)" />
        <Readout label="SWR" value={`${fmt(swr, 3)} : 1`} color={swr < 1.05 ? 'var(--d-good)' : 'var(--d-bad)'} />
        <Readout label="Power reflected" value={fmt(refl, 3)} unit="%" color="var(--d-bad)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Presets" value={preset} onChange={(v) => setP(pOf(v))} options={LOADS.map((v) => ({ value: v, label: `${v} Ω` }))} />
      </div>
    </>
  )
}
