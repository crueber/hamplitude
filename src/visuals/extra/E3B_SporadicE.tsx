import { C, Diagram, Ln, T } from '../kit'

const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const VAL = [0.22, 0.1, 0.1, 0.2, 0.6, 1, 0.9, 0.5, 0.15, 0.08, 0.1, 0.3]

/** Sporadic E: strongest around the summer solstice (smaller peak near winter), and in daytime. */
export function SporadicE() {
  const x0 = 30, bw = 26, base = 190, top = 56
  const th0 = 384, th1 = 604, ty = 150
  const H = (h: number) => th0 + (h / 24) * (th1 - th0)
  return (
    <Diagram w={640} h={260} title="Sporadic E is most likely around the solstices, especially the summer solstice, and between sunrise and sunset"
      caption="Schematic, northern hemisphere. Not real data.">
      <T x={x0} y={22} size={15} bold color={C.signal}>Time of year</T>
      {VAL.map((v, i) => {
        const hot = i === 5
        return (
          <g key={i}>
            <rect x={x0 + i * 25.5} y={base - v * (base - top)} width={bw - 4} height={v * (base - top)} rx={3} fill={C.signal} fillOpacity={hot ? 0.9 : 0.4} />
            <T x={x0 + i * 25.5 + 11} y={base + 16} anchor="middle" size={12} color={C.muted}>{MONTHS[i]}</T>
          </g>
        )
      })}
      <Ln x1={x0 - 4} y1={base} x2={x0 + 12 * 25.5} y2={base} color={C.muted} width={2} />
      <T x={x0 + 5 * 25.5 + 11} y={top - 14} anchor="middle" size={13} bold color={C.signal}>summer solstice</T>
      <T x={x0 + 11 * 25.5 + 11} y={base - 0.3 * (base - top) - 14} anchor="end" size={13} color={C.muted}>smaller peak</T>
      <T x={th0} y={22} size={15} bold color={C.power}>Time of day</T>
      <Ln x1={th0} y1={ty} x2={th1} y2={ty} color={C.muted} width={2} />
      <rect x={H(6)} y={ty - 12} width={H(18) - H(6)} height={24} rx={5} fill={C.resist} fillOpacity={0.3} stroke={C.resist} strokeWidth={2} />
      <T x={(H(6) + H(18)) / 2} y={ty - 36} anchor="middle" size={14} bold color={C.resist}>sunrise to sunset</T>
      {[0, 6, 12, 18, 24].map((h) => <T key={h} x={H(h)} y={ty + 30} anchor="middle" size={12} color={C.muted}>{`${String(h).padStart(2, '0')}:00`}</T>)}
      <T x={(th0 + th1) / 2} y={ty + 60} anchor="middle" size={13} color={C.muted}>times vary with season</T>
    </Diagram>
  )
}
