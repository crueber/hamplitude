import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, fmt } from '../kit'

/** More turns, or a bigger loop, means more output voltage: proportional to turns × area. */
export function LoopTurns() {
  const [n, setN] = useState(2)
  const [area, setArea] = useState(1)
  const side = Math.sqrt(area)
  const out = n * area
  const S = 40 + side * 34
  const cx = 150, cy = 140
  const bar = (v: number) => Math.min(250, (v / 24) * 250)
  return (
    <>
      <Diagram w={640} h={250} title={`Loop with ${n} turns and ${fmt(area, 3)} times the reference area: output ${fmt(out, 3)} times a single reference turn`}
        caption="Output voltage grows with the number of turns and with the area enclosed.">
        <T x={cx} y={20} anchor="middle" size={13} bold color={C.muted}>Loop, face on</T>
        {Array.from({ length: n }, (_, i) => {
          const o = i * 5
          return <rect key={i} x={cx - S / 2 + o} y={cy - S / 2 + o} width={S} height={S} rx={3} fill="none" stroke={C.resist} strokeWidth={3} />
        })}
        <T x={cx} y={cy + S / 2 + n * 5 + 18} anchor="middle" size={13} bold color={C.resist}>{n} {n === 1 ? 'turn' : 'turns'}</T>
        <T x={360} y={50} size={14} bold color={C.muted}>Output voltage (relative)</T>
        <rect x={360} y={70} width={bar(out)} height={30} rx={6} fill={C.signal} />
        <T x={360 + bar(out) + 10} y={85} size={15} bold mono color={C.signal}>{fmt(out, 3)}×</T>
        <T x={360} y={140} size={14} bold mono color={C.ink}>output ∝ turns × area</T>
        <T x={360} y={166} size={14} bold mono color={C.muted}>{n} × {fmt(area, 3)} = {fmt(out, 3)}</T>
        <T x={360} y={206} size={13} color={C.muted}>reference: 1 turn at 1× area = 1×</T>
      </Diagram>
      <Controls>
        <Slider label="Number of turns" value={n} min={1} max={6} step={1} onChange={setN} format={(v) => `${v}`} color="var(--d-resist)" />
        <Slider label="Loop area" value={area} min={0.25} max={4} step={0.05} onChange={setArea} format={(v) => `${fmt(v, 3)}× reference`} color="var(--d-resist)" />
        <Readout label="Output voltage" value={fmt(out, 3)} unit="×" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
