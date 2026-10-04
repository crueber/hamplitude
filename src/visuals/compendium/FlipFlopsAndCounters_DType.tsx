import { useState } from 'react'
import { C, Controls, Diagram, Ln, T } from '../kit'

interface Step { d: 0 | 1; clk: 0 | 1; q: 0 | 1 }
const MAX = 10

/** A D flip-flop: Q copies D only at the clock pulse and holds it in between. Each button press adds a step to the timing trace. */
export function FlipFlopsAndCounters_DType() {
  const [steps, setSteps] = useState<Step[]>([{ d: 0, clk: 0, q: 0 }])
  const cur = steps[steps.length - 1]
  const push = (s: Step) => setSteps((a) => [...a, s].slice(-MAX))
  const setD = (d: 0 | 1) => push({ d, clk: 0, q: cur.q })
  const clock = () => push({ d: cur.d, clk: 1, q: cur.d })
  const reset = () => setSteps([{ d: 0, clk: 0, q: 0 }])
  const lvl = (v: number) => (v ? C.good : C.muted)

  const x0 = 240, W = 380, sw = W / MAX
  const rows: { name: string; key: 'd' | 'clk' | 'q'; y: number; col: string }[] = [
    { name: 'D (data in)', key: 'd', y: 44, col: C.signal },
    { name: 'CLK (clock)', key: 'clk', y: 106, col: C.resist },
    { name: 'Q (output)', key: 'q', y: 168, col: C.good },
  ]
  const trace = (key: 'd' | 'clk' | 'q', y: number) => {
    const pts: string[] = []
    steps.forEach((s, i) => {
      const yy = y + 14 - s[key] * 28
      pts.push(`${x0 + i * sw},${yy}`, `${x0 + (i + 1) * sw},${yy}`)
    })
    return pts.join(' ')
  }
  return (
    <>
      <Diagram w={640} h={238}
        title={`A D flip-flop with D = ${cur.d} and Q = ${cur.q}. Q only takes the value of D at the clock pulse, and holds it until the next one.`}
        caption="D can change freely; Q ignores it until the clock pulses, then copies D and holds it.">
        <rect x={60} y={40} width={90} height={130} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.4} />
        <T x={105} y={72} anchor="middle" bold size={15}>D flip-flop</T>
        <Ln x1={20} y1={105} x2={60} y2={105} color={lvl(cur.d)} width={3} />
        <T x={14} y={90} size={13} bold color={lvl(cur.d)}>D = {cur.d}</T>
        <Ln x1={20} y1={150} x2={60} y2={150} color={lvl(cur.clk)} width={3} />
        <path d="M60,138 L74,150 L60,162" fill="none" stroke={C.ink} strokeWidth={2.2} />
        <T x={14} y={134} size={13} bold color={lvl(cur.clk)}>CLK</T>
        <Ln x1={150} y1={105} x2={190} y2={105} color={lvl(cur.q)} width={3} />
        <T x={152} y={90} size={13} bold color={lvl(cur.q)}>Q = {cur.q}</T>
        <T x={105} y={118} anchor="middle" size={12} color={C.muted}>stores 1 bit</T>
        {rows.map((r) => (
          <g key={r.key}>
            <T x={x0} y={r.y - 28} size={13} bold color={r.col}>{r.name}</T>
            <Ln x1={x0} y1={r.y + 14} x2={x0 + W} y2={r.y + 14} color={C.fill2} width={1} dash="3 4" />
            <polyline points={trace(r.key, r.y)} fill="none" stroke={r.col} strokeWidth={3} strokeLinejoin="round" />
          </g>
        ))}
        {steps.map((s, i) => s.clk ? (
          <rect key={i} x={x0 + i * sw} y={18} width={sw} height={176} fill={C.resist} opacity={0.12} />
        ) : null)}
        <T x={x0 + W / 2} y={216} anchor="middle" size={12.5} color={C.muted}>time → (shaded step = clock pulse: Q copies D)</T>
      </Diagram>
      <Controls>
        <div className="ctl-choice">
          <button type="button" onClick={() => setD(0)}>Set D = 0</button>
          <button type="button" onClick={() => setD(1)}>Set D = 1</button>
          <button type="button" onClick={clock}>Clock pulse</button>
          <button type="button" onClick={reset}>Reset</button>
        </div>
      </Controls>
    </>
  )
}
