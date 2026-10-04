import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

// Illustrative loss in dB per 100 ft at 100 MHz (typical, approximate); scaled with the square root of frequency.
const CABLES = [
  { id: 'rg58', label: 'RG-58 type', a100: 5 },
  { id: 'rg8x', label: 'RG-8X type', a100: 3.7 },
  { id: 'rg213', label: 'RG-213 type', a100: 2 },
  { id: 'low', label: 'low-loss foam', a100: 1.2 },
]
const BANDS = [
  { f: 1.8, label: '160 m' },
  { f: 7.1, label: '40 m' },
  { f: 14.2, label: '20 m' },
  { f: 29, label: '10 m' },
  { f: 146, label: '2 m' },
  { f: 446, label: '70 cm' },
]
const PIN = 100

/** Matched-line loss for four typical cable classes: cable, band and length in, delivered power out. */
export function FeedLineLoss_Calculator() {
  const [cable, setCable] = useState('rg8x')
  const [f, setF] = useState(14.2)
  const [len, setLen] = useState(100)
  const a = CABLES.find((c) => c.id === cable)!.a100
  const rate = a * Math.sqrt(f / 100)
  const loss = (rate * len) / 100
  const frac = Math.pow(10, -loss / 10)
  const out = PIN * frac
  const bx = 40, bw = 560
  const good = frac >= 0.8
  const mid = frac >= 0.5
  return (
    <>
      <Diagram w={640} h={204}
        title={`${PIN} watts into ${len} feet of ${CABLES.find((c) => c.id === cable)!.label} cable at ${f} megahertz: about ${fmt(loss, 2)} decibels of loss, so about ${fmt(out, 3)} watts reach the antenna and the rest becomes heat in the cable`}
        caption="Typical, approximate figures for a matched line. Check the datasheet for the cable you buy.">
        <T x={bx} y={24} size={14} bold>Transmitter: {PIN} W</T>
        <rect x={bx} y={44} width={bw} height={44} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <rect x={bx} y={44} width={Math.max(bw * frac, 2)} height={44} rx={8} fill={good ? C.good : mid ? C.resist : C.bad} opacity={0.85} />
        <T x={bx} y={108} size={14} bold color={good ? C.good : mid ? C.resist : C.bad}>{fmt(out, 3)} W reaches the antenna</T>
        {frac < 0.97 && (
          <T x={bx + bw} y={108} anchor="end" size={14} bold color={C.bad}>{fmt(PIN - out, 3)} W heats the cable</T>
        )}
        <Ln x1={bx} y1={128} x2={bx + bw} y2={128} color={C.muted} width={1.5} dash="3 4" />
        <T x={bx} y={152} size={14} color={C.muted} mono>{fmt(rate, 3)} dB per 100 ft  ×  {len} ft  =  {fmt(loss, 2)} dB</T>
        <T x={bx} y={178} size={14} color={C.muted} mono>power left = 10^(−{fmt(loss, 2)} ÷ 10) = {fmt(frac * 100, 3)} %</T>
      </Diagram>
      <Controls>
        <Slider label="Cable length" value={len} min={10} max={200} step={5} onChange={setLen} format={(v) => `${v} ft`} color="var(--d-resist)" />
        <Readout label="Loss" value={fmt(loss, 2)} unit=" dB" color={good ? 'var(--d-good)' : 'var(--d-bad)'} />
        <Readout label="Power delivered" value={fmt(out, 3)} unit=" W" color="var(--d-power)" />
      </Controls>
      <div style={{ margin: '-6px 0 8px' }}>
        <Choice label="Cable" value={cable} onChange={setCable} options={CABLES.map((c) => ({ value: c.id, label: c.label }))} />
      </div>
      <div style={{ margin: '0 0 14px' }}>
        <Choice label="Band" value={f} onChange={setF} options={BANDS.map((b) => ({ value: b.f, label: b.label }))} />
      </div>
    </>
  )
}
