import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Feed line loss is quoted in dB per 100 feet. Total loss = rate x length / 100. */
export function G9A_LossDb() {
  const [rate, setRate] = useState(1.5)
  const [len, setLen] = useState(150)
  const total = (rate * len) / 100
  const out = 100 * Math.pow(10, -total / 10)
  const W = 640, H = 220, x0 = 30
  const bw = (v: number) => (v / 100) * 400
  return (
    <>
      <Diagram w={W} h={H} title={`A cable losing ${fmt(rate, 2)} dB per 100 feet over ${len} feet loses ${fmt(total, 3)} dB in total, so 100 watts in becomes ${fmt(out, 3)} watts out`}
        caption="Loss is quoted in dB per 100 ft, then scaled by the real length. Every 3 dB halves the power.">
        <Ln x1={x0 + 60} y1={50} x2={x0 + 60 + (len / 300) * 420} y2={50} color={C.ink} width={6} />
        <T x={x0} y={50} size={13} bold>in</T>
        {Array.from({ length: Math.floor(len / 100) }, (_, i) => (
          <g key={i}>
            <Ln x1={x0 + 60 + ((i + 1) * 100 / 300) * 420} y1={38} x2={x0 + 60 + ((i + 1) * 100 / 300) * 420} y2={62} color={C.muted} width={2} />
            <T x={x0 + 60 + ((i + 1) * 100 / 300) * 420} y={78} anchor="middle" size={12} color={C.muted}>{(i + 1) * 100} ft</T>
          </g>
        ))}
        <T x={x0 + 60 + (len / 300) * 420 + 12} y={50} size={13} bold>out</T>
        <T x={x0} y={112} size={13} color={C.muted}>Power in</T>
        <rect x={x0 + 90} y={102} width={bw(100)} height={20} rx={4} fill={C.signal} />
        <T x={x0 + 90 + bw(100) + 10} y={112} size={13} bold color={C.signal}>100 W</T>
        <T x={x0} y={146} size={13} color={C.muted}>Power out</T>
        <rect x={x0 + 90} y={136} width={bw(out)} height={20} rx={4} fill={C.good} />
        <T x={x0 + 90 + bw(out) + 10} y={146} size={13} bold color={C.good}>{fmt(out, 3)} W</T>
        <T x={320} y={190} anchor="middle" size={16} bold color={C.power}>{fmt(rate, 2)} dB/100 ft × {len} ft ÷ 100 = {fmt(total, 3)} dB</T>
      </Diagram>
      <Controls>
        <Slider label="Cable loss rating" value={rate} min={0.5} max={6} step={0.1} onChange={setRate} format={(v) => `${fmt(v, 2)} dB per 100 ft`} color="var(--d-resist)" />
        <Slider label="Cable length" value={len} min={25} max={300} step={5} onChange={setLen} format={(v) => `${v} ft`} color="var(--d-signal)" />
        <Readout label="Total loss" value={fmt(total, 3)} unit=" dB" color="var(--d-power)" />
      </Controls>
    </>
  )
}
