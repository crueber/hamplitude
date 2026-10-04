import { C, Diagram, Ln, T } from '../kit'

/** Volunteer Monitors localize a stuck carrier by comparing beam headings from different homes. */
export function G2D_Triangulate() {
  const src = { x: 470, y: 120 }
  const vms = [
    { x: 70, y: 70, n: 'VM 1' },
    { x: 130, y: 232, n: 'VM 2' },
    { x: 360, y: 250, n: 'VM 3' },
  ]
  return (
    <Diagram w={640} h={296} title="Three Volunteer Monitors each point a beam at the repeater input from their own homes and note the heading. The headings cross where the transmitter with the continuous carrier is" caption="Different homes, different headings. Where the lines cross is the culprit.">
      {vms.map((v) => {
        const dx = src.x - v.x, dy = src.y - v.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
        return (
          <g key={v.n}>
            <Ln x1={v.x + ux * 42} y1={v.y + uy * 42} x2={src.x - ux * 26} y2={src.y - uy * 26} color={C.signal} width={2.5} dash="7 5" arrow />
            <rect x={v.x - 34} y={v.y - 16} width={68} height={32} rx={8} fill={C.fill} stroke={C.current} strokeWidth={2} />
            <T x={v.x} y={v.y} anchor="middle" size={14} bold color={C.current}>{v.n}</T>
          </g>
        )
      })}
      <circle cx={src.x} cy={src.y} r={22} fill={C.bad} fillOpacity={0.2} stroke={C.bad} strokeWidth={3} />
      <T x={src.x} y={src.y} anchor="middle" size={13} bold color={C.bad}>TX</T>
      <T x={src.x + 34} y={src.y - 34} size={13.5} bold color={C.bad}>stuck carrier</T>
      <T x={src.x + 34} y={src.y - 16} size={13} color={C.muted}>on the repeater input</T>
      <T x={14} y={18} size={13.5} bold color={C.signal}>Dashed = each monitor's beam heading</T>
    </Diagram>
  )
}
