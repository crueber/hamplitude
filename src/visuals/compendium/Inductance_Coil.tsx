import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

/** Single-layer air-core coil. Wheeler's formula: L (uH) = r^2 N^2 / (9r + 10l), r and l in inches. */
export function Inductance_Coil() {
  const [n, setN] = useState(10)
  const [dia, setDia] = useState(1) // inches
  const [len, setLen] = useState(1.5) // inches
  const r = dia / 2
  const L = (r * r * n * n) / (9 * r + 10 * len) // µH
  const PXI = 90 // px per inch
  const cx = 205, cy = 150
  const ry = Math.round(dia * 44)
  const lpx = len * PXI
  const x0 = cx - lpx / 2
  const rx = Math.min(10, Math.max(4, (lpx / n) * 0.8))
  const turns = Array.from({ length: n }, (_, i) => x0 + ((i + 0.5) * lpx) / n)
  const frx = lpx / 2 + 62, fry = ry + 48
  return (
    <>
      <Diagram w={640} h={310}
        title={`Air-core coil of ${n} turns, ${fmt(dia)} inch diameter and ${fmt(len)} inch long has an inductance of ${si(L * 1e-6, 'H')}`}
        caption="More turns, a fatter coil or a shorter coil all raise the inductance. Turns count hardest: L grows with N².">
        <ellipse cx={cx} cy={cy} rx={frx} ry={fry} fill="none" stroke={C.current} strokeWidth={2.5} strokeDasharray="6 5" opacity={0.85} />
        <Ln x1={cx + 14} y1={cy - fry} x2={cx - 14} y2={cy - fry} color={C.current} width={3} arrow />
        <Ln x1={cx + 14} y1={cy + fry} x2={cx - 14} y2={cy + fry} color={C.current} width={3} arrow />
        {turns.map((x) => <ellipse key={x} cx={x} cy={cy} rx={rx} ry={ry} fill="none" stroke={C.ink} strokeWidth={2.5} />)}
        <Ln x1={x0 + 4} y1={cy} x2={x0 + lpx - 4} y2={cy} color={C.current} width={3} arrow />
        <Ln x1={x0 - 6} y1={cy + fry + 14} x2={x0 + lpx + 6} y2={cy + fry + 14} color={C.resist} width={2} arrow="both" />
        <T x={cx} y={cy + fry + 32} anchor="middle" size={13} bold color={C.resist}>length l</T>
        <T x={cx} y={cy - fry - 14} anchor="middle" size={13} bold color={C.current}>magnetic field</T>
        <T x={420} y={52} size={13} color={C.muted}>L (µH) = r² N² ÷ (9r + 10l)</T>
        <T x={420} y={76} size={12} color={C.muted}>r, l in inches (Wheeler's formula)</T>
        <T x={420} y={112} size={13} mono>N = {n} turns</T>
        <T x={420} y={136} size={13} mono>r = {fmt(r)} in</T>
        <T x={420} y={160} size={13} mono>l = {fmt(len)} in</T>
        <T x={420} y={206} size={13} color={C.muted}>inductance</T>
        <T x={420} y={236} size={26} bold color={C.current}>{si(L * 1e-6, 'H', 3)}</T>
      </Diagram>
      <Controls>
        <Slider label="Turns (N)" value={n} min={2} max={30} onChange={setN} format={(v) => `${v}`} color="var(--d-current)" />
        <Slider label="Coil diameter" value={dia} min={0.5} max={1.5} step={0.25} onChange={setDia} format={(v) => `${fmt(v)} in`} color="var(--d-power)" />
        <Slider label="Coil length (l)" value={len} min={0.75} max={3} step={0.25} onChange={setLen} format={(v) => `${fmt(v)} in`} color="var(--d-resist)" />
        <Readout label="Inductance" value={si(L * 1e-6, 'H', 3)} color="var(--d-current)" />
      </Controls>
    </>
  )
}
