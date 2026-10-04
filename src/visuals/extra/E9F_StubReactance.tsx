import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

type End = 'short' | 'open'
const W = 640, H = 366
const px0 = 70, pw = 500, py0 = 250, ph = 70 // plot origin (x=0 length, y=zero reactance), width, half-height
const YMAX = 3.2

const xr = (l: number, end: End) => (end === 'short' ? Math.tan(2 * Math.PI * l) : -1 / Math.tan(2 * Math.PI * l))

function curve(end: End) {
  let d = ''
  let pen = false
  for (let i = 0; i <= 500; i++) {
    const l = i / 1000
    const x = xr(l, end)
    if (!isFinite(x) || Math.abs(x) > YMAX) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${(px0 + (l / 0.5) * pw).toFixed(1)},${(py0 - (x / YMAX) * ph).toFixed(1)}`
    pen = true
  }
  return d
}

/** What a line of any length looks like from the generator end when the far end is shorted or open. */
export function StubReactance() {
  const [end, setEnd] = useState<End>('short')
  const [l, setL] = useState(0.125)
  const x = xr(l, end)
  const veryHigh = Math.abs(x) > 15
  const veryLow = Math.abs(x) < 0.05
  const kind = veryHigh ? 'very high impedance' : veryLow ? 'very low impedance (a short)' : x > 0 ? 'inductive reactance' : 'capacitive reactance'
  const col = veryHigh ? C.bad : veryLow ? C.good : x > 0 ? C.power : C.signal
  const mx = px0 + (l / 0.5) * pw
  const my = py0 - (Math.max(-YMAX, Math.min(YMAX, x)) / YMAX) * ph
  const lineEnd = 520
  const ticks = [0, 0.125, 0.25, 0.375, 0.5]
  const tlab = ['0', '⅛ λ', '¼ λ', '⅜ λ', '½ λ']
  return (
    <>
      <Diagram w={W} h={H} title={`A ${end === 'short' ? 'shorted' : 'open'}-ended line ${fmt(l, 3)} wavelengths long looks like ${kind} to the generator`}
        caption="Reactance repeats every half wavelength and flips sign (and short to open) every quarter wavelength.">
        <rect x={20} y={36} width={64} height={52} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={52} y={62} anchor="middle" size={13} bold>RF</T>
        <Ln x1={84} y1={50} x2={lineEnd} y2={50} color={C.ink} width={4} />
        <Ln x1={84} y1={74} x2={lineEnd} y2={74} color={C.ink} width={4} />
        {end === 'short' ? (
          <Ln x1={lineEnd} y1={46} x2={lineEnd} y2={78} color={C.bad} width={7} />
        ) : (
          <>
            <Ln x1={lineEnd} y1={42} x2={lineEnd} y2={50} color={C.bad} width={4} />
            <Ln x1={lineEnd} y1={74} x2={lineEnd} y2={82} color={C.bad} width={4} />
          </>
        )}
        <T x={lineEnd + 12} y={62} size={13} bold color={C.bad}>{end === 'short' ? 'shorted' : 'open'}</T>
        <Ln x1={84} y1={104} x2={lineEnd} y2={104} color={C.muted} width={1.5} dash="2 4" />
        <Ln x1={84} y1={104} x2={84 + (l / 0.5) * (lineEnd - 84)} y2={104} color={col} width={5} />
        <T x={84} y={124} size={13} bold color={col}>generator sees: {kind}</T>
        {/* reactance plot */}
        <rect x={px0} y={py0 - ph} width={pw} height={ph} fill={C.power} fillOpacity={0.06} />
        <rect x={px0} y={py0} width={pw} height={ph} fill={C.signal} fillOpacity={0.06} />
        <Ln x1={px0} y1={py0} x2={px0 + pw} y2={py0} color={C.muted} width={1.5} />
        <T x={px0 + pw - 4} y={py0 - ph + 12} anchor="end" size={12} bold color={C.power}>inductive (+jX)</T>
        <T x={px0 + pw - 4} y={py0 + ph - 12} anchor="end" size={12} bold color={C.signal}>capacitive (−jX)</T>
        {ticks.map((t, i) => (
          <g key={t}>
            <Ln x1={px0 + (t / 0.5) * pw} y1={py0 - ph} x2={px0 + (t / 0.5) * pw} y2={py0 + ph} color={C.fill2} width={1} />
            <T x={px0 + (t / 0.5) * pw} y={py0 + ph + 14} anchor="middle" size={12} color={C.muted}>{tlab[i]}</T>
          </g>
        ))}
        <path d={curve(end)} fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        <T x={px0 - 6} y={py0 - ph - 2} anchor="end" size={12} color={C.muted}>high</T>
        <T x={px0 - 6} y={py0 + 2} anchor="end" size={12} color={C.muted}>0</T>
        <T x={px0 - 6} y={py0 + ph + 2} anchor="end" size={12} color={C.muted}>high</T>
        <circle cx={mx} cy={my} r={9} fill={col} stroke={C.bg} strokeWidth={3} />
        <T x={px0 + pw / 2} y={py0 + ph + 34} anchor="middle" size={12} color={C.muted}>line length from the generator</T>
      </Diagram>
      <Controls>
        <Slider label="Line length" value={l} min={0.005} max={0.5} step={0.005} onChange={setL} format={(v) => `${fmt(v, 3)} λ`} color="var(--d-signal)" />
        <Readout label="Generator sees" value={veryHigh ? 'very high' : veryLow ? 'very low' : `${x > 0 ? '+' : '−'}j${fmt(Math.abs(x), 3)} Z₀`} color={veryHigh ? 'var(--d-bad)' : veryLow ? 'var(--d-good)' : 'var(--d-ink)'} />
      </Controls>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Far end" value={end} onChange={setEnd} options={[{ value: 'short', label: 'Shorted end' }, { value: 'open', label: 'Open end' }]} />
        <Choice label="Jump to" value={ticks.find((t) => Math.abs(t - l) < 0.003) ?? -1} onChange={(v) => setL(Math.max(0.005, v))}
          options={ticks.slice(1).map((t, i) => ({ value: t, label: tlab[i + 1] }))} />
      </div>
    </>
  )
}
