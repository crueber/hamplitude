import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Chained flip-flops: each one toggles on the falling edge of the one before, halving the frequency. */
export function Divider() {
  const [n, setN] = useState(4)
  const x0 = 120, W = 500, T0 = 16.5, rowH = 44, y0 = 40
  const X = (t: number) => x0 + (W * t) / T0
  const level = (k: number, t: number) => (k === 0 ? (t % 1) < 0.5 ? 1 : 0 : Math.floor((t + 0.5) / 2 ** (k - 1)) % 2)
  const trace = (k: number, y: number) => {
    // collect edges
    const pts: string[] = []
    const step = 0.25 // edges fall on multiples of 0.5, so sample at 0.25 and snap
    let prev = -1
    for (let t = 0; t <= T0 + 1e-6; t += step) {
      const tt = Math.min(t, T0)
      const v = level(k, Math.min(tt + 0.001, T0 - 0.001))
      const yy = y + 12 - v * 24
      if (prev === -1) pts.push(`${X(tt)},${yy}`)
      else if (v !== prev) pts.push(`${X(tt - 0.001)},${y + 12 - prev * 24}`, `${X(tt)},${yy}`)
      prev = v
    }
    pts.push(`${X(T0)},${y + 12 - prev * 24}`)
    return pts.join(' ')
  }
  const h = y0 + (n + 1) * rowH + 56
  return (
    <>
      <Diagram w={640} h={h} title={`${n} flip-flops in a chain divide the clock frequency by ${2 ** n}. The last output makes one cycle for every ${2 ** n} clock cycles.`}
        caption={`Each flip-flop halves the frequency. ${n} flip-flops = ÷${2 ** n}.`}>
        {Array.from({ length: n + 1 }, (_, k) => {
          const y = y0 + k * rowH
          const last = k === n
          const col = k === 0 ? C.muted : last ? C.good : C.signal
          return (
            <g key={k}>
              <T x={14} y={y + 12} size={14} bold color={col}>{k === 0 ? 'Clock in' : `FF${k} out`}</T>
              <Ln x1={x0} y1={y + 12} x2={x0 + W} y2={y + 12} color={C.fill2} width={1} dash="3 4" />
              <polyline points={trace(k, y)} fill="none" stroke={col} strokeWidth={last ? 3.5 : 2.5} strokeLinejoin="round" />
            </g>
          )
        })}
        {Array.from({ length: 17 }, (_, i) => <Ln key={i} x1={X(i)} y1={y0 - 8} x2={X(i)} y2={y0 + (n + 1) * rowH - 10} color={C.fill2} width={1} />)}
        <T x={320} y={y0 + (n + 1) * rowH + 10} anchor="middle" size={13} color={C.muted}>time (one clock cycle between grid lines)</T>
        <T x={320} y={h - 18} anchor="middle" size={15} bold color={C.good}>{`${2 ** n} clock cycles in → 1 output cycle:  ÷ ${2 ** n}   (2${n === 1 ? '' : superscript(n)} = ${2 ** n})`}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Number of flip-flops" value={n} onChange={setN} options={[1, 2, 3, 4].map((v) => ({ value: v, label: `${v} flip-flop${v > 1 ? 's' : ''}` }))} />
      </div>
    </>
  )
}
const superscript = (n: number) => ['', '', '²', '³', '⁴'][n]
