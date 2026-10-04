import { C, Diagram, Ln, T, TAU } from '../kit'

let seed = 7
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }

const N = 120
// Input swings +-0.3 step around the middle of one quantizer step: smaller than one step.
const IN = Array.from({ length: N }, (_, i) => 0.5 + 0.3 * Math.sin(TAU * 2 * (i / N)))
const PLAIN = IN.map((v) => Math.floor(v))
const NOISE = IN.map(() => rnd() - 0.5)
const DITH = IN.map((v, i) => Math.floor(v + NOISE[i] + 0.5))
const AVG = DITH.map((_, i) => {
  let a = 0, c = 0
  for (let j = -9; j <= 9; j++) { const k = i + j; if (k >= 0 && k < N) { a += DITH[k]; c++ } }
  return a / c
})

/** Dither: noise added before quantizing lets a signal smaller than one step survive. */
export function Dither() {
  const x0 = 170, x1 = 620, W = x1 - x0
  const rows = [
    { y: 14, name: 'Input', sub: ['smaller than', 'one step'], col: C.muted },
    { y: 114, name: 'No dither', sub: ['stuck on one', 'level: lost'], col: C.bad },
    { y: 214, name: 'With dither', sub: ['flips in step', 'with the signal'], col: C.good },
  ]
  const H = 56
  const X = (i: number) => x0 + (W * i) / (N - 1)
  const Y = (r: number, v: number) => rows[r].y + 12 + H - v * H
  const line = (r: number, arr: number[]) =>
    arr.map((v, i) => (i ? `H${X(i).toFixed(1)}V${Y(r, v).toFixed(1)}` : `M${X(i).toFixed(1)},${Y(r, v).toFixed(1)}`)).join('')
  return (
    <Diagram w={640} h={310} title="Dither: a signal smaller than one converter step is lost without dither. With a little noise added, the output flips between steps and the average follows the signal."
      caption="Noise added on purpose: the average of the flipping output follows the tiny signal.">
      {rows.map((r, i) => (
        <g key={r.name}>
          <T x={14} y={r.y + 30} size={14} bold color={r.col}>{r.name}</T>
          {r.sub.map((l, j) => <T key={j} x={14} y={r.y + 52 + j * 17} size={12.5} color={C.muted}>{l}</T>)}
          <Ln x1={x0} y1={Y(i, 0)} x2={x1} y2={Y(i, 0)} color={C.fill2} width={1} />
          <Ln x1={x0} y1={Y(i, 1)} x2={x1} y2={Y(i, 1)} color={C.fill2} width={1} />
        </g>
      ))}
      <path d={IN.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(0, v).toFixed(1)}`).join('')} fill="none" stroke={C.muted} strokeWidth={2.5} />
      <path d={line(1, PLAIN)} fill="none" stroke={C.bad} strokeWidth={2.5} />
      <path d={line(2, DITH)} fill="none" stroke={C.good} strokeWidth={1.5} opacity={0.7} />
      <path d={AVG.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(2, v).toFixed(1)}`).join('')} fill="none" stroke={C.good} strokeWidth={3} />
    </Diagram>
  )
}
