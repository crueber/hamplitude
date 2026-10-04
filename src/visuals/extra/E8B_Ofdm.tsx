import { C, Diagram, Ln, T } from '../kit'

const sinc = (x: number) => (Math.abs(x) < 1e-9 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x))
const COLS = [C.signal, C.resist, C.power, C.current, C.voltage]

/** OFDM: many subcarriers spaced so each one's peak lands where all the others are zero. */
export function Ofdm() {
  const x0 = 40, x1 = 600, base = 170, H = 120
  const sp = 90 // px between subcarriers (= 1 unit)
  const cx = 320
  const centers = [-2, -1, 0, 1, 2]
  const X = (u: number) => cx + u * sp
  return (
    <Diagram w={640} h={246} title="OFDM spectrum: five subcarriers overlap, but each one's peak falls exactly where every other subcarrier crosses zero, so they do not interfere."
      caption="Overlapping subcarriers, spaced so they stay out of each other's way.">
      <T x={14} y={12} size={13} bold color={C.muted}>Each subcarrier carries a slice of the data</T>
      <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.muted} width={2} />
      {centers.map((c, k) => {
        const pts: string[] = []
        for (let i = 0; i <= 280; i++) {
          const u = -3 + (6 * i) / 280
          const xx = X(u)
          if (xx < x0 || xx > x1) continue
          pts.push(`${pts.length ? 'L' : 'M'}${xx.toFixed(1)},${(base - H * sinc(u - c)).toFixed(1)}`)
        }
        return <path key={c} d={pts.join('')} fill="none" stroke={COLS[k]} strokeWidth={2.5} />
      })}
      {centers.map((c, k) => (
        <g key={c}>
          <Ln x1={X(c)} y1={base - H - 4} x2={X(c)} y2={base + 6} color={COLS[k]} width={1.5} dash="3 4" />
          <T x={X(c)} y={base + 20} anchor="middle" size={12.5} bold color={COLS[k]}>{`#${k + 1}`}</T>
        </g>
      ))}
      <T x={x1} y={base + 44} anchor="end" size={13} bold>At each peak, every other curve is at zero.</T>
      <T x={x0} y={base + 44} size={12.5} color={C.muted}>frequency →</T>
    </Diagram>
  )
}
