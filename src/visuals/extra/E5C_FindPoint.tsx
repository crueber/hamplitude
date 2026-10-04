import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU, fmt } from '../kit'

// The eight points of exam Figure E5-1 (R, X)
const PTS: [number, number, number][] = [
  [1, 300, -400], [2, 400, 300], [3, 300, 400], [4, 400, -300], [5, -400, -300], [6, 400, 0], [7, -300, -400], [8, 300, 30],
]
type Part = 'c' | 'l'
const PRE: Record<string, { part: Part; f: number; v: number; r: number }> = {
  a: { part: 'c', f: 14, v: 38, r: 400 },
  b: { part: 'l', f: 3.505, v: 18, r: 300 },
  c: { part: 'c', f: 21.2, v: 19, r: 300 },
}

/** Turn "R + part at frequency f" into a point on an R-X plane like Figure E5-1. */
export function E5C_FindPoint() {
  const [part, setPart] = useState<Part>('c')
  const [f, setF] = useState(14)
  const [v, setV] = useState(38)
  const [r, setR] = useState(400)
  const key = Object.entries(PRE).find(([, p]) => p.part === part && p.f === f && p.v === v && p.r === r)?.[0] ?? 'x'
  const hz = f * 1e6
  const x = part === 'c' ? -1 / (TAU * hz * v * 1e-12) : TAU * hz * v * 1e-6
  const S = 0.3, ox = 200, oy = 205
  const px = (a: number) => ox + a * S
  const py = (a: number) => oy - a * S
  const cl = (a: number) => Math.max(-600, Math.min(600, a))
  const off = Math.abs(x) > 600 || r > 600
  let best = PTS[0], bd = Infinity
  for (const p of PTS) { const d = Math.hypot(p[1] - r, p[2] - x); if (d < bd) { bd = d; best = p } }
  const near = bd < 80
  const ticks = [-600, -400, -200, 200, 400, 600]
  return (
    <>
      <Diagram w={640} h={410} title={`A ${r} ohm resistor in series with a ${part === 'c' ? v + ' picofarad capacitor' : v + ' microhenry inductor'} at ${f} megahertz has reactance ${fmt(x)} ohms.`}
        caption="Filled dots are the eight points of Figure E5-1. The ring is your circuit.">
        {[-600, -400, -200, 0, 200, 400, 600].map((a) => (
          <g key={a}>
            <Ln x1={px(a)} y1={py(600)} x2={px(a)} y2={py(-600)} color={C.fill2} width={a === 0 ? 2.5 : 1} />
            <Ln x1={px(-600)} y1={py(a)} x2={px(600)} y2={py(a)} color={C.fill2} width={a === 0 ? 2.5 : 1} />
          </g>
        ))}
        {ticks.map((a) => <T key={'x' + a} x={px(a)} y={oy + 12} anchor="middle" size={12} color={C.muted}>{a}</T>)}
        {ticks.map((a) => <T key={'y' + a} x={ox - 5} y={py(a)} anchor="end" size={12} color={C.muted}>{a}</T>)}
        <T x={px(600)} y={py(600) - 10} anchor="end" size={12} bold color={C.resist}>across: R    up: X</T>
        {PTS.map(([n, a, b]) => (
          <g key={n}>
            <circle cx={px(a)} cy={py(b)} r={4} fill={C.muted} />
            <T x={px(a) + (n === 3 || n === 1 ? -11 : 13)} y={py(b) + (n === 8 || n === 6 ? -11 : 0)} anchor={n === 3 || n === 1 ? 'end' : 'start'} size={12} bold color={C.ink}>{n}</T>
          </g>
        ))}
        <circle cx={px(cl(r))} cy={py(cl(x))} r={9} fill="none" stroke={part === 'c' ? C.power : C.signal} strokeWidth={3} />
        <T x={400} y={34} size={13} color={C.muted}>Step 1: reactance of the part</T>
        <T x={400} y={58} size={12} mono>{part === 'c' ? `XC = 1 ÷ (2π × ${f} MHz × ${v} pF)` : `XL = 2π × ${f} MHz × ${v} µH`}</T>
        <T x={400} y={84} size={16} bold mono color={part === 'c' ? C.power : C.signal}>{part === 'c' ? 'XC' : 'XL'} = {fmt(Math.abs(x), 4)} Ω</T>
        <T x={400} y={130} size={13} color={C.muted}>Step 2: write R and X</T>
        <T x={400} y={158} size={16} bold mono>Z = {r} {x < 0 ? '−' : '+'} j{fmt(Math.abs(x), 3)} Ω</T>
        <T x={400} y={204} size={13} color={C.muted}>Step 3: find the nearest point</T>
        <T x={400} y={232} size={16} bold>{off ? 'off the grid' : near ? `Point ${best[0]}` : 'between points'}</T>
        {near && !off && <T x={400} y={256} size={13} color={C.muted}>({best[1]}, {best[2] > 0 ? '+' : ''}{best[2]})</T>}
      </Diagram>
      <Controls>
        <Choice label="Exam examples" value={key} onChange={(k) => { const p = PRE[k]; if (p) { setPart(p.part); setF(p.f); setV(p.v); setR(p.r) } }}
          options={[{ value: 'a', label: '400 Ω + 38 pF, 14 MHz' }, { value: 'b', label: '300 Ω + 18 µH, 3.505 MHz' }, { value: 'c', label: '300 Ω + 19 pF, 21.2 MHz' }, ...(key === 'x' ? [{ value: 'x', label: 'custom' }] : [])]} />
        <Choice label="Part" value={part} onChange={(p) => { setPart(p); setV(p === 'c' ? 38 : 18) }} options={[{ value: 'c', label: 'Capacitor' }, { value: 'l', label: 'Inductor' }]} />
        <Slider label="Frequency" value={f} min={1} max={30} step={0.005} onChange={setF} format={(a) => `${fmt(a, 5)} MHz`} />
        <Slider label={part === 'c' ? 'Capacitance' : 'Inductance'} value={v} min={1} max={part === 'c' ? 100 : 50} onChange={setV} format={(a) => (part === 'c' ? `${a} pF` : `${a} µH`)} color={part === 'c' ? 'var(--d-power)' : 'var(--d-signal)'} />
        <Slider label="Resistance (R)" value={r} min={0} max={600} step={10} onChange={setR} format={(a) => `${a} Ω`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
