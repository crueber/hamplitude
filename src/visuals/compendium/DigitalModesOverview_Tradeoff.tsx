import { C, Diagram, Ln, T } from '../kit'

interface Pill { label: string; fx: number; fy: number; w: number; col: string }

const X0 = 90, X1 = 620, Y0 = 30, Y1 = 280
const PILLS: Pill[] = [
  { label: 'WSPR', fx: 0.05, fy: 0.97, w: 64, col: C.power },
  { label: 'FT8 / FT4', fx: 0.22, fy: 0.82, w: 96, col: C.signal },
  { label: 'JS8Call', fx: 0.15, fy: 0.66, w: 80, col: C.signal },
  { label: 'Olivia / MFSK', fx: 0.31, fy: 0.52, w: 122, col: C.current },
  { label: 'PSK31', fx: 0.4, fy: 0.37, w: 70, col: C.good },
  { label: 'RTTY', fx: 0.5, fy: 0.2, w: 64, col: C.resist },
  { label: 'Packet (VHF)', fx: 0.8, fy: 0.12, w: 112, col: C.voltage },
  { label: 'VARA / PACTOR', fx: 0.86, fy: 0.5, w: 130, col: C.power },
]

/** Illustrative map of digital modes: speed against weak-signal toughness. */
export function DigitalModesOverview_Tradeoff() {
  return (
    <Diagram w={640} h={344}
      title="Illustrative map of digital modes. Horizontal axis: how fast they move data, slow to fast. Vertical axis: how well they work in weak signals. Slow modes such as WSPR, FT8, JS8Call and Olivia sit high on the left. Faster modes such as VHF packet and the ARQ modes VARA and PACTOR sit to the right. RTTY and PSK31 sit in the middle."
      caption="Illustrative placement, not measurements. The pattern is real: speed is traded for weak-signal toughness.">
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <Ln x1={X0} y1={Y1 + 14} x2={X1} y2={Y1 + 14} color={C.muted} width={2} arrow />
      <T x={(X0 + X1) / 2} y={Y1 + 34} anchor="middle" size={13} bold color={C.muted}>faster data</T>
      <T x={X0} y={Y1 + 34} size={12.5} color={C.muted}>slow</T>
      <Ln x1={X0 - 14} y1={Y1} x2={X0 - 14} y2={Y0} color={C.muted} width={2} arrow />
      <T x={X0 - 22} y={Y0 + 20} anchor="end" size={12.5} color={C.muted}>works in</T>
      <T x={X0 - 22} y={Y0 + 38} anchor="end" size={12.5} color={C.muted}>weaker</T>
      <T x={X0 - 22} y={Y0 + 56} anchor="end" size={12.5} color={C.muted}>signals</T>
      {PILLS.map((p) => {
        const cx = X0 + p.fx * (X1 - X0)
        const cy = Y1 - p.fy * (Y1 - Y0)
        const x = Math.min(Math.max(cx - p.w / 2, X0 + 6), X1 - 6 - p.w)
        return (
          <g key={p.label}>
            <rect x={x} y={cy - 13} width={p.w} height={26} rx={13} fill={p.col} fillOpacity={0.22} stroke={p.col} strokeWidth={2.2} />
            <T x={x + p.w / 2} y={cy} anchor="middle" size={13} bold>{p.label}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
