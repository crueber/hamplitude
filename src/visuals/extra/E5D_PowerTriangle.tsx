import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const PRE: Record<string, [number, number, number]> = { a: [100, 100, 1], b: [0, 100, 1], c: [100, 0, 1] }

/** Real, reactive and apparent power for a series R + jX circuit carrying current I. */
export function E5D_PowerTriangle() {
  const [r, setR] = useState(100)
  const [x, setX] = useState(100)
  const [i, setI] = useState(1)
  const p = i * i * r, q = i * i * x, s = Math.hypot(p, q)
  const th = Math.atan2(x, r)
  const key = Object.entries(PRE).find(([, v]) => v[0] === r && v[1] === x && v[2] === i)?.[0] ?? 'x'
  const k = Math.min(250 / Math.max(p, 1e-9), 105 / Math.max(Math.abs(q), 1e-9))
  const ox = 30, oy = 150
  const tx = ox + p * k, ty = oy - q * k
  // power waveform p(t) = sin(wt + th) * sin(wt): average = cos(th) / 2
  const WX = 340, WW = 280, WY = 140, WA = 70
  const pts: string[] = [], pos: string[] = [], neg: string[] = []
  const N = 240
  for (let n = 0; n <= N; n++) {
    const a = (2 * TAU * n) / N
    const v = Math.sin(a + th) * Math.sin(a)
    const px = WX + (WW * n) / N, py = WY - v * WA
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`)
    pos.push(`${px.toFixed(1)},${(WY - Math.max(v, 0) * WA).toFixed(1)}`)
    neg.push(`${px.toFixed(1)},${(WY - Math.min(v, 0) * WA).toFixed(1)}`)
  }
  const avg = Math.cos(th) / 2
  return (
    <>
      <Diagram w={640} h={350} title={`Series circuit with R ${r} ohms, X ${x} ohms and ${i} amperes: real power ${fmt(p)} watts, reactive power ${fmt(q)} VAR, apparent power ${fmt(s)} volt-amperes`}
        caption="Real power is the part that does work. Reactive power just swings in and out of the fields.">
        <Ln x1={ox} y1={oy} x2={tx} y2={oy} color={C.power} width={5} />
        <Ln x1={tx} y1={oy} x2={tx} y2={ty} color={C.signal} width={5} dash="7 5" />
        {s > 0 && <Ln x1={ox} y1={oy} x2={tx} y2={ty} color={C.ink} width={3.5} />}
        <T x={ox} y={26} size={13} bold>Power triangle</T>
        <T x={WX} y={26} size={13} bold>Power over time (volts × amperes)</T>
        <Ln x1={WX} y1={WY} x2={WX + WW} y2={WY} color={C.muted} width={1.5} />
        <polygon points={pos.join(' ')} fill={C.power} opacity={0.3} />
        <polygon points={neg.join(' ')} fill={C.signal} opacity={0.35} />
        <polyline points={pts.join(' ')} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={WX} y1={WY - avg * WA} x2={WX + WW} y2={WY - avg * WA} color={C.ink} width={2} dash="6 5" />
        <Ln x1={WX} y1={WY + 50} x2={WX + 34} y2={WY + 50} color={C.ink} width={2} dash="6 5" />
        <T x={WX + 44} y={WY + 50} size={12.5} bold>average = real power</T>
        <rect x={WX} y={WY + 70} width={16} height={12} fill={C.power} opacity={0.5} />
        <T x={WX + 24} y={WY + 76} size={12.5}>power to the circuit</T>
        <rect x={WX + 170} y={WY + 70} width={16} height={12} fill={C.signal} opacity={0.55} />
        <T x={WX + 194} y={WY + 76} size={12.5}>power returned</T>
        <T x={ox} y={262} size={14} bold color={C.power}>Real power P = I² × R = {fmt(p)} W</T>
        <T x={ox} y={286} size={14} bold color={C.signal}>Reactive power = I² × X = {fmt(q)} VAR</T>
        <T x={ox} y={310} size={14} bold>Apparent power = I² × |Z| = {fmt(s, 4)} VA</T>
        <T x={WX} y={WY + 112} size={13} bold>V and I are {fmt(Math.abs((th * 180) / Math.PI), 3)}° apart</T>
      </Diagram>
      <Controls>
        <Choice label="Examples" value={key} onChange={(k2) => { const v = PRE[k2]; if (v) { setR(v[0]); setX(v[1]); setI(v[2]) } }}
          options={[{ value: 'a', label: 'R 100 + XL 100, 1 A' }, { value: 'b', label: 'Pure reactance' }, { value: 'c', label: 'Pure resistance' }, ...(key === 'x' ? [{ value: 'x', label: 'custom' }] : [])]} />
        <Slider label="Resistance (R)" value={r} min={0} max={200} step={5} onChange={setR} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="Reactance (X)" value={x} min={-200} max={200} step={5} onChange={setX} format={(v) => `${v} Ω`} color="var(--d-signal)" />
        <Slider label="Current (I)" value={i} min={0.5} max={3} step={0.5} onChange={setI} format={(v) => `${v} A`} color="var(--d-current)" />
        <Readout label="Real power consumed" value={fmt(p)} unit=" W" color="var(--d-power)" />
      </Controls>
    </>
  )
}
