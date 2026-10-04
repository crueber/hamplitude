import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

const PMAX = 1500, TMAX = 10

/** Energy is the area of a power-against-time rectangle: watts times hours gives watt-hours. */
export function PowerAndEnergy_Energy() {
  const [p, setP] = useState(1000)
  const [h, setH] = useState(3)
  const x0 = 80, x1 = 400, y0 = 240, y1 = 30
  const px = (v: number) => x0 + ((x1 - x0) * v) / TMAX
  const py = (v: number) => y0 - ((y0 - y1) * v) / PMAX
  const wh = p * h
  return (
    <>
      <Diagram w={640} h={300}
        title={`Energy as an area: ${p} watts for ${h} hours is ${wh} watt-hours, or ${fmt(wh / 1000)} kilowatt-hours`}
        caption="Power is the height, time is the width, energy is the area. A bigger rectangle means a bigger bill.">
        {[0, 2, 4, 6, 8, 10].map((v) => (
          <g key={v}>
            <Ln x1={px(v)} y1={y0} x2={px(v)} y2={y1} color={C.fill2} width={1} />
            <T x={px(v)} y={y0 + 16} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <Ln x1={x0} y1={py(v)} x2={x1} y2={py(v)} color={C.fill2} width={1} />
            <T x={x0 - 10} y={py(v)} anchor="end" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        <rect x={x0} y={py(p)} width={px(h) - x0} height={y0 - py(p)} fill={C.power} opacity={0.3} stroke={C.power} strokeWidth={2.5} />
        <Ln x1={x0} y1={y0} x2={x1} y2={y0} color={C.muted} width={2} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1} color={C.muted} width={2} />
        <T x={(x0 + x1) / 2} y={y0 + 38} anchor="middle" size={13} bold color={C.muted}>Time (hours)</T>
        <T x={30} y={(y0 + y1) / 2} anchor="middle" size={13} bold color={C.power} transform={`rotate(-90 30 ${(y0 + y1) / 2})`}>Power (watts)</T>

        <T x={440} y={50} size={13} bold color={C.muted}>Energy = power × time</T>
        <T x={440} y={84} size={14} mono>{p} W × {h} h</T>
        <T x={440} y={116} size={16} mono bold color={C.power}>= {wh} Wh</T>
        <T x={440} y={148} size={16} mono bold color={C.power}>= {fmt(wh / 1000)} kWh</T>
        <T x={440} y={186} size={13} color={C.muted}>In joules (1 Wh = 3600 J):</T>
        <T x={440} y={208} size={14} mono>{si(wh * 3600, 'J', 3)}</T>
      </Diagram>
      <Controls>
        <Slider label="Power (P)" value={p} min={50} max={PMAX} step={50} onChange={setP} format={(v) => `${v} W`} color="var(--d-power)" />
        <Slider label="Time (t)" value={h} min={0.5} max={TMAX} step={0.5} onChange={setH} format={(v) => `${v} h`} />
        <Readout label="Energy used" value={fmt(wh / 1000)} unit="kWh" color="var(--d-power)" />
      </Controls>
    </>
  )
}
