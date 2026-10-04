import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const hash = (a: number, b: number) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s) }

/** Waterfall: frequency across, time down, brightness = strength. Overdriving a signal adds vertical lines either side. */
export function G8C_Waterfall() {
  const [drive, setDrive] = useState(0.8)
  const COLS = 60, ROWS = 26, cw = 8, rh = 8.4
  const X0 = 70, Y0 = 34
  const over = Math.max(0, drive - 1)
  const lines = over > 0.02
  const cells: React.ReactNode[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let v = 0.05 + 0.1 * hash(r, c)
      const d = Math.abs(c - 29.5)
      if (d < 1.6) v += 0.55 + 0.25 * hash(r, c + 99)
      if (lines && (Math.abs(d - 5) < 0.6 || Math.abs(d - 9) < 0.6)) v += (0.18 + 0.22 * hash(r, c + 7)) * Math.min(1, over * 2.2) * (Math.abs(d - 5) < 0.6 ? 1 : 0.65)
      if (r % 9 > 3 && Math.abs(c - 12) < 1.2) v += 0.55 // another, clean signal
      v = Math.min(1, v)
      cells.push(<rect key={`${r}-${c}`} x={X0 + c * cw} y={Y0 + r * rh} width={cw + 0.4} height={rh + 0.4} fill={C.signal} fillOpacity={v * 0.95} />)
    }
  }
  const W = COLS * cw, H = ROWS * rh
  return (
    <>
      <Diagram w={640} h={308} title={`Waterfall display: frequency is horizontal, time is vertical, signal strength is brightness. ${lines ? 'Vertical lines on either side of the center signal show it is overmodulated.' : 'The center signal is clean, with no extra lines beside it.'}`}
        caption="Frequency across, time down, strength as brightness. Faint vertical lines beside a signal mean overmodulation.">
        <rect x={X0 - 2} y={Y0 - 2} width={W + 4} height={H + 4} rx={4} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        {cells}
        <T x={X0} y={12} size={13} bold color={C.muted}>time ↓</T>
        <Ln x1={X0} y1={Y0 + H + 14} x2={X0 + W} y2={Y0 + H + 14} color={C.ink} width={2} arrow />
        <T x={X0 + W / 2} y={Y0 + H + 32} anchor="middle" size={13} bold>frequency →</T>
        <T x={X0 + W} y={12} anchor="end" size={13} bold color={C.signal}>brightness = strength</T>
        <Ln x1={44} y1={Y0} x2={44} y2={Y0 + H} color={C.ink} width={2} arrow />
      </Diagram>
      <Controls>
        <Slider label="Drive level" value={drive} min={0.5} max={1.6} step={0.05} onChange={setDrive} format={(v) => (v <= 1 ? 'normal' : 'too high')} color="var(--d-signal)" />
        <Readout label="Beside the signal" value={lines ? 'Vertical lines' : 'Clean'} color={lines ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
