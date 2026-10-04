import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const COLS = 16, ROWS = 12, CS = 14

/** A tiny sunrise picture: brightness 0 (black) to 1 (white). */
function bright(r: number, c: number): number {
  let b = 0.6 - r * 0.02 // sky
  if (r >= 9) b = 0.32 // ground
  if (Math.hypot(c - 11.5, r - 3.5) < 2.2) b = 1 // sun
  const peak = 3.5, left = 1, right = 8
  if (c >= left && c <= right && r >= 5 && r < 9) {
    const half = (r - 4) * 1.1
    if (Math.abs(c - peak - 1) <= half) b = 0.14 // mountain
  }
  return Math.max(0, Math.min(1, b))
}
const tone = (b: number) => 1500 + 800 * b // black 1500 Hz ... white 2300 Hz

const PX0 = 322, PX1 = 618, PT = 46, PB = 216
const fy = (f: number) => PB - ((f - 1100) / 1300) * (PB - PT)

/** One picture line at a time: each pixel becomes a tone, preceded by a sync pulse. */
export function SlowScanTv_Scan() {
  const [row, setRow] = useState(5)
  const r = row - 1
  const vals = Array.from({ length: COLS }, (_, c) => bright(r, c))
  const syncW = 22, stepW = (PX1 - PX0 - syncW) / COLS
  let d = `M ${PX0},${fy(1200)} L ${PX0 + syncW},${fy(1200)}`
  vals.forEach((b, i) => {
    const x0 = PX0 + syncW + i * stepW
    d += ` L ${x0},${fy(tone(b))} L ${x0 + stepW},${fy(tone(b))}`
  })
  const maxTone = Math.round(Math.max(...vals.map(tone)))
  return (
    <>
      <Diagram w={640} h={262} title={`Row ${row} of a small test picture turned into audio: a 1200 hertz sync tone, then one tone per pixel from 1500 hertz for black to 2300 hertz for white`}
        caption="Each pixel in the chosen row becomes one steady tone. The receiver reverses the mapping and paints the row.">
        <T x={20} y={20} size={13} bold color={C.muted}>Picture (brighter = more filled)</T>
        {Array.from({ length: ROWS }, (_, rr) =>
          Array.from({ length: COLS }, (_, c) => (
            <rect key={`${rr}-${c}`} x={20 + c * CS} y={40 + rr * CS} width={CS} height={CS} fill={C.signal} fillOpacity={bright(rr, c)} />
          )),
        )}
        <rect x={20} y={40} width={COLS * CS} height={ROWS * CS} fill="none" stroke={C.muted} strokeWidth={1.5} />
        <rect x={18} y={38 + r * CS} width={COLS * CS + 4} height={CS + 4} fill="none" stroke={C.resist} strokeWidth={3} rx={2} />
        <Ln x1={20 + COLS * CS + 4} y1={40 + r * CS + CS / 2} x2={PX0 - 38} y2={PT + 40} color={C.resist} width={2} dash="5 4" />
        <T x={PX0} y={20} size={13} bold color={C.muted}>Audio tone for that row (frequency over time)</T>
        <Ln x1={PX0 - 6} y1={PB} x2={PX1} y2={PB} color={C.muted} width={2} />
        <Ln x1={PX0 - 6} y1={PT - 8} x2={PX0 - 6} y2={PB} color={C.muted} width={2} />
        {([[2300, 'white'], [1500, 'black'], [1200, 'sync']] as [number, string][]).map(([f, n]) => (
          <g key={n}>
            <Ln x1={PX0 - 6} y1={fy(f)} x2={PX1} y2={fy(f)} color={C.fill2} width={1} dash="3 5" />
            <T x={PX0 - 12} y={fy(f)} anchor="end" size={12} bold color={C.muted}>{`${f}`}</T>
            <T x={PX1} y={fy(f) - 9} anchor="end" size={12} color={C.muted}>{n}</T>
          </g>
        ))}
        <path d={d} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={PX0} y={PB + 18} size={12.5} bold color={C.bad}>sync</T>
        <T x={PX1} y={PB + 18} size={12.5} anchor="end" color={C.muted}>16 pixels →  (Hz)</T>
        <T x={20} y={PB + 18} size={12.5} color={C.muted}>16 × 12 pixels, schematic</T>
      </Diagram>
      <Controls>
        <Slider label="Picture row" value={row} min={1} max={ROWS} onChange={setRow} format={(v) => `row ${v}`} color="var(--d-resist)" />
        <Readout label="Highest tone in this row" value={maxTone} unit="Hz" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
