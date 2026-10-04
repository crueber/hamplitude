import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const X0 = 40, X1 = 610, BASE = 250, MAXF = 65
const fx = (f: number) => X0 + (f / MAXF) * (X1 - X0)

/** Mixer output: both inputs, their sum and their difference. Overdrive adds spurious products. */
export function MixerProducts() {
  const [f1, setF1] = useState(14)
  const [f2, setF2] = useState(9)
  const [hot, setHot] = useState(false)
  const diff = Math.abs(f1 - f2), sum = f1 + f2
  const rows: { f: number; name: string; val: string; col: string; h: number }[] = [
    { f: f1, name: 'input 1', val: `input 1 = ${fmt(f1)} MHz`, col: C.signal, h: 150 },
    { f: f2, name: 'input 2', val: `input 2 = ${fmt(f2)} MHz`, col: C.resist, h: 122 },
    { f: diff, name: 'difference', val: `difference = ${fmt(diff)} MHz`, col: C.power, h: 94 },
    { f: sum, name: 'sum', val: `sum = ${fmt(sum)} MHz`, col: C.current, h: 66 },
  ]
  const spurs = hot ? [2 * f1, 2 * f2, 2 * f1 - f2, 2 * f2 - f1].filter((f) => f > 0.5 && f < MAXF) : []
  const lx = (f: number, w: number) => Math.min(Math.max(fx(f), X0 + w / 2), X1 - w / 2)
  return (
    <>
      <Diagram w={640} h={340}
        title={`Mixer with inputs at ${f1} and ${f2} megahertz. Outputs: both inputs, the difference ${fmt(diff)} and the sum ${fmt(sum)} megahertz.${hot ? ' Inputs too strong: spurious products also appear.' : ''}`}
        caption="Four principal outputs: the two inputs, their sum and their difference. Too much drive adds spurs.">
        <Ln x1={X0} y1={BASE} x2={X1} y2={BASE} color={C.muted} width={2} />
        {[0, 10, 20, 30, 40, 50, 60].map((f) => (
          <g key={f}>
            <Ln x1={fx(f)} y1={BASE} x2={fx(f)} y2={BASE + 6} color={C.muted} width={1.5} />
            <T x={fx(f)} y={BASE + 20} anchor="middle" size={12} color={C.muted}>{f}</T>
          </g>
        ))}
        <T x={X1} y={BASE + 38} anchor="end" size={12} color={C.muted}>frequency (MHz)</T>
        {spurs.map((f, i) => (
          <Ln key={i} x1={fx(f)} y1={BASE} x2={fx(f)} y2={BASE - 36} color={C.bad} width={3} dash="5 3" />
        ))}
        {rows.map((r) => (
          <g key={r.name}>
            <Ln x1={fx(r.f)} y1={BASE} x2={fx(r.f)} y2={BASE - r.h} color={r.col} width={4.5} />
            <T x={lx(r.f, 80)} y={BASE - r.h - 12} anchor="middle" size={13} bold color={r.col} stroke={C.bg} strokeWidth={5} paintOrder="stroke">{r.name}</T>
          </g>
        ))}
        {rows.map((r, i) => (
          <T key={r.name} x={[14, 170, 326, 500][i]} y={318} size={13} bold mono={false} color={r.col}>{r.val}</T>
        ))}
        {hot && <T x={X0} y={28} size={14} bold color={C.bad}>dashed red = spurious products</T>}
      </Diagram>
      <Controls>
        <Slider label="Signal input" value={f1} min={3} max={30} onChange={setF1} format={(v) => `${v} MHz`} color="var(--d-signal)" />
        <Slider label="Oscillator input" value={f2} min={3} max={30} onChange={setF2} format={(v) => `${v} MHz`} color="var(--d-resist)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Input signal levels</span>
          <Choice label="Input levels" value={hot ? 'hot' : 'ok'} onChange={(v) => setHot(v === 'hot')} options={[{ value: 'ok', label: 'Normal' }, { value: 'hot', label: 'Too high' }]} />
        </div>
      </Controls>
    </>
  )
}
