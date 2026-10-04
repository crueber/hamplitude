import { C, Diagram, Ln, T } from '../kit'

const mins = (m: number, x0: number, x1: number, max: number) => x0 + (m / max) * (x1 - x0)

/** Two contacts on a timeline: IDs at least every 10 min and at the end. */
export function IdTimeline() {
  const W = 640, H = 270, x0 = 70, x1 = 610, MAX = 36
  const row = (y: number, ids: number[], end: number, ok: boolean, label: string) => {
    const pts = [0, ...ids, end].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b)
    return (
      <g>
        <T x={x0} y={y - 40} bold size={15} color={ok ? C.good : C.bad}>{label}</T>
        <Ln x1={x0} y1={y} x2={mins(end, x0, x1, MAX)} y2={y} color={C.fill2} width={10} />
        {pts.slice(0, -1).map((p, i) => {
          const q = pts[i + 1]
          const gap = q - p
          const bad = gap > 10
          return (
            <g key={p}>
              <Ln x1={mins(p, x0, x1, MAX) + 4} y1={y + 22} x2={mins(q, x0, x1, MAX) - 4} y2={y + 22} color={bad ? C.bad : C.good} width={2.5} arrow="both" />
              <T x={(mins(p, x0, x1, MAX) + mins(q, x0, x1, MAX)) / 2} y={y + 40} anchor="middle" size={13} bold color={bad ? C.bad : C.good}>{gap} min{bad ? ' — too long' : ''}</T>
            </g>
          )
        })}
        {pts.map((p) => (
          <g key={p}>
            <circle cx={mins(p, x0, x1, MAX)} cy={y} r={9} fill={p === 0 ? C.bg : p === end ? C.power : C.signal} stroke={p === 0 ? C.muted : C.bg} strokeWidth={p === 0 ? 2.5 : 3} />
          </g>
        ))}
      </g>
    )
  }
  return (
    <Diagram w={W} h={H} title="Station identification timeline: identify at least every 10 minutes during a contact and once at the end" caption={<>○ contact starts &nbsp; ● call sign sent &nbsp; <span style={{ color: 'var(--d-power)' }}>●</span> final call sign at the end of the contact</>}>
      {row(70, [9, 19, 28], 36, true, 'OK: never more than 10 min between call signs')}
      {row(180, [16], 30, false, 'Not OK')}
    </Diagram>
  )
}
