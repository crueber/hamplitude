import { useState } from 'react'
import { C, Choice, Controls, Diagram, Readout, T, si } from '../kit'

/** Colour-code decoder for 4- and 5-band resistors. Band colours are physical paint colours, so named CSS colours are used. */
interface Col { name: string; paint: string; digit?: number; mult?: number; tol?: number }
const COLS: Col[] = [
  { name: 'black', paint: 'black', digit: 0, mult: 1 },
  { name: 'brown', paint: 'saddlebrown', digit: 1, mult: 10, tol: 1 },
  { name: 'red', paint: 'red', digit: 2, mult: 100, tol: 2 },
  { name: 'orange', paint: 'orange', digit: 3, mult: 1e3 },
  { name: 'yellow', paint: 'gold', digit: 4, mult: 1e4 },
  { name: 'green', paint: 'green', digit: 5, mult: 1e5, tol: 0.5 },
  { name: 'blue', paint: 'royalblue', digit: 6, mult: 1e6, tol: 0.25 },
  { name: 'violet', paint: 'darkviolet', digit: 7, mult: 1e7, tol: 0.1 },
  { name: 'grey', paint: 'gray', digit: 8, mult: 1e8, tol: 0.05 },
  { name: 'white', paint: 'white', digit: 9, mult: 1e9 },
  { name: 'gold', paint: 'darkgoldenrod', mult: 0.1, tol: 5 },
  { name: 'silver', paint: 'silver', mult: 0.01, tol: 10 },
]
const byName = (n: string) => COLS.find((c) => c.name === n)!
const DIGITS = COLS.filter((c) => c.digit !== undefined)
const MULTS = COLS.filter((c) => c.mult !== undefined)
const TOLS = COLS.filter((c) => c.tol !== undefined)

function Swatches({ label, options, value, onChange }: { label: string; options: Col[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', margin: '4px 0', gridColumn: '1 / -1' }}>
      <span style={{ minWidth: 92, fontSize: 13, fontWeight: 600 }}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map((o) => (
          <button key={o.name} type="button" role="radio" aria-checked={o.name === value} aria-label={o.name} title={o.name}
            onClick={() => onChange(o.name)}
            style={{
              width: 28, height: 28, borderRadius: 14, background: o.paint, cursor: 'pointer', padding: 0,
              border: `2px solid ${o.name === value ? 'var(--d-ink)' : 'var(--d-muted)'}`,
              outline: o.name === value ? '2px solid var(--d-signal)' : 'none', outlineOffset: 2,
            }} />
        ))}
      </div>
    </div>
  )
}

export function Resistors_ColorCode() {
  const [bands, setBands] = useState<5 | 4>(4)
  const [d1, setD1] = useState('yellow')
  const [d2, setD2] = useState('violet')
  const [d3, setD3] = useState('black')
  const [mul, setMul] = useState('red')
  const [tol, setTol] = useState('gold')

  const digits = bands === 4 ? [d1, d2] : [d1, d2, d3]
  const base = digits.reduce((n, d) => n * 10 + byName(d).digit!, 0)
  const ohms = base * byName(mul).mult!
  const t = byName(tol).tol!
  const lo = ohms * (1 - t / 100), hi = ohms * (1 + t / 100)

  const seq = bands === 4 ? [d1, d2, mul, tol] : [d1, d2, d3, mul, tol]
  const roles = bands === 4 ? ['digit', 'digit', 'multiplier', 'tolerance'] : ['digit', 'digit', 'digit', 'multiplier', 'tolerance']
  const bx0 = 130, bodyW = 380, bw = 22
  const slot = bands === 4 ? [0.09, 0.23, 0.5, 0.88] : [0.085, 0.215, 0.345, 0.58, 0.9]

  return (
    <>
      <Diagram w={640} h={196}
        title={`Resistor colour code: bands ${seq.join(', ')} read as ${si(ohms, 'Ω')} with ${t} percent tolerance`}
        caption="Start from the end with the bands bunched together. The widely spaced band at the far end is the tolerance.">
        <line x1={60} y1={80} x2={bx0} y2={80} stroke={C.muted} strokeWidth={5} strokeLinecap="round" />
        <line x1={bx0 + bodyW} y1={80} x2={580} y2={80} stroke={C.muted} strokeWidth={5} strokeLinecap="round" />
        <rect x={bx0} y={46} width={bodyW} height={68} rx={14} fill="wheat" stroke={C.ink} strokeWidth={2} />
        {seq.map((n, i) => {
          const x = bx0 + bodyW * slot[i] - bw / 2
          return (
            <g key={i}>
              <rect x={x} y={47} width={bw} height={66} fill={byName(n).paint} stroke={C.ink} strokeWidth={1} />
              <T x={x + bw / 2} y={134} anchor="middle" size={12} color={C.muted}>{roles[i]}</T>
              <T x={x + bw / 2} y={152} anchor="middle" size={12} bold>{n}</T>
            </g>
          )
        })}
        <T x={320} y={26} anchor="middle" size={20} bold color={C.resist}>{si(ohms, 'Ω')} ± {t}%</T>
        <T x={320} y={180} anchor="middle" size={12} color={C.muted}>actual value lies between {si(lo, 'Ω')} and {si(hi, 'Ω')}</T>
      </Diagram>
      <Controls>
        <Choice label="Number of bands" value={bands} onChange={setBands}
          options={[{ value: 4, label: '4 bands' }, { value: 5, label: '5 bands (precision)' }]} />
        <Swatches label="1st digit" options={DIGITS} value={d1} onChange={setD1} />
        <Swatches label="2nd digit" options={DIGITS} value={d2} onChange={setD2} />
        {bands === 5 && <Swatches label="3rd digit" options={DIGITS} value={d3} onChange={setD3} />}
        <Swatches label="Multiplier" options={MULTS} value={mul} onChange={setMul} />
        <Swatches label="Tolerance" options={TOLS} value={tol} onChange={setTol} />
        <Readout label="Resistance" value={si(ohms, 'Ω')} color={C.resist} />
      </Controls>
    </>
  )
}
