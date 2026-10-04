import { C, Diagram, Ln, T } from '../kit'

const A = (n: number) => 1 / Math.sqrt(1 + n ** 6) // 3rd-order low-pass, f in units of cutoff

/** Same frequency response drawn with a linear and a logarithmic vertical axis. */
export function E5C_LogAxis() {
  const PT = 60, PH = 170, PB = PT + PH, PW = 240
  const panel = (x0: number, log: boolean) => {
    const yv = (a: number) => (log ? PB - ((Math.log10(Math.max(a, 1e-3)) + 3) / 3) * PH : PB - a * PH)
    const xv = (n: number) => x0 + (n / 10) * PW
    const pts: string[] = []
    for (let i = 0; i <= 200; i++) { const n = (10 * i) / 200; pts.push(`${xv(n).toFixed(1)},${yv(A(n)).toFixed(1)}`) }
    const ticks = log ? [1, 0.1, 0.01, 0.001] : [1, 0.5, 0]
    return (
      <g>
        <Ln x1={x0} y1={PT} x2={x0} y2={PB} color={C.muted} />
        <Ln x1={x0} y1={PB} x2={x0 + PW} y2={PB} color={C.muted} />
        {ticks.map((a) => (
          <g key={a}>
            <Ln x1={x0} y1={yv(a)} x2={x0 + PW} y2={yv(a)} color={C.fill2} width={1} />
            <T x={x0 - 6} y={yv(a)} anchor="end" size={12} color={C.muted}>{a}</T>
          </g>
        ))}
        <polyline points={pts.join(' ')} fill="none" stroke={C.signal} strokeWidth={3} strokeLinecap="round" />
        <T x={x0 + PW / 2} y={PB + 18} anchor="middle" size={12} color={C.muted}>frequency →</T>
        <T x={x0 - 30} y={30} size={14} bold>{log ? 'Logarithmic Y axis' : 'Linear Y axis'}</T>
        <T x={x0 - 30} y={48} size={12} color={C.muted}>{log ? 'each step is ×10: all detail visible' : 'passband fine, the rest sits on the floor'}</T>
      </g>
    )
  }
  return (
    <Diagram w={640} h={290} title="The same low-pass response drawn twice. With a linear vertical axis the stopband is squashed against zero. With a logarithmic vertical axis, the full range from 1 down to 0.001 stays readable."
      caption="Same response, two scales. The log axis keeps tiny values readable.">
      {panel(60, false)}
      {panel(370, true)}
    </Diagram>
  )
}
