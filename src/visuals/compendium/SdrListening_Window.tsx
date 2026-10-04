import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const SIGS = [
  { f: 144.39, name: 'APRS' },
  { f: 145.2, name: 'repeater' },
  { f: 145.5, name: 'FM voice' },
  { f: 146.52, name: 'simplex calling' },
  { f: 146.94, name: 'repeater' },
  { f: 147.18, name: 'repeater' },
  { f: 147.6, name: 'FM voice' },
]
const LO = 144, HI = 148

/** A software-defined receiver shows a whole window of spectrum at once: its width is set by the sample rate. */
export function SdrListening_Window() {
  const [centre, setCentre] = useState(146.0)
  const [width, setWidth] = useState(2.0)
  const c = Math.min(HI - width / 2, Math.max(LO + width / 2, centre))
  const lo = c - width / 2, hi = c + width / 2
  const inWin = SIGS.filter((s) => s.f >= lo && s.f <= hi)
  const X = (f: number) => 30 + ((f - LO) / (HI - LO)) * 580
  const Z = (f: number) => 30 + ((f - lo) / (hi - lo)) * 580
  const bar = (x: number, y0: number, h: number, col: string) => <rect x={x - 3} y={y0 - h} width={6} height={h} rx={2} fill={col} />
  return (
    <>
      <Diagram w={640} h={330}
        title={`A software radio window ${fmt(width, 3)} MHz wide centred on ${fmt(c, 5)} MHz captures ${inWin.length} of the ${SIGS.length} signals in this slice of the 2 meter band at once`}
        caption="Illustrative 2 meter slice. The window is what the dongle digitises; the software shows it and decodes whichever signal you click.">
        <T x={30} y={16} size={13} bold color={C.muted}>Slice of the band: 144 to 148 MHz</T>
        <rect x={30} y={30} width={580} height={86} rx={8} fill={C.fill} />
        {SIGS.map((s, i) => {
          const inside = s.f >= lo && s.f <= hi
          return <g key={i}>{bar(X(s.f), 106, 20 + ((i * 17) % 40), inside ? C.signal : C.muted)}</g>
        })}
        <rect x={X(lo)} y={28} width={X(hi) - X(lo)} height={90} rx={6} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={2.5} />
        {[144, 145, 146, 147, 148].map((f) => <T key={f} x={X(f)} y={130} anchor="middle" size={12} color={C.muted}>{f}</T>)}
        <Ln x1={X(lo)} y1={118} x2={30} y2={170} color={C.signal} width={1.5} dash="4 4" />
        <Ln x1={X(hi)} y1={118} x2={610} y2={170} color={C.signal} width={1.5} dash="4 4" />
        <T x={30} y={156} size={13} bold color={C.signal}>What the software shows: {fmt(lo, 5)} to {fmt(hi, 5)} MHz</T>
        <rect x={30} y={172} width={580} height={110} rx={8} fill={C.fill} />
        {inWin.map((s, i) => {
          const idx = SIGS.indexOf(s)
          return (
            <g key={i}>
              {bar(Z(s.f), 270, 20 + ((idx * 17) % 30), C.signal)}
              <T x={Math.min(570, Math.max(70, Z(s.f)))} y={188 + (i % 2) * 16} anchor="middle" size={12} color={C.ink}>{s.name}</T>
            </g>
          )
        })}
        {inWin.length === 0 && <T x={320} y={228} anchor="middle" size={14} color={C.muted}>nothing in this window</T>}
        <T x={320} y={304} anchor="middle" size={13} color={C.muted}>{inWin.length} {inWin.length === 1 ? 'signal' : 'signals'} visible at once; wider window, more signals, less detail</T>
      </Diagram>
      <Controls>
        <Slider label="Centre frequency" value={c} min={144} max={148} step={0.05} onChange={setCentre} format={(v) => `${v.toFixed(2)} MHz`} color="var(--d-signal)" />
        <Slider label="Window width (sample rate)" value={width} min={0.25} max={3} step={0.25} onChange={setWidth} format={(v) => `${v} MHz`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
