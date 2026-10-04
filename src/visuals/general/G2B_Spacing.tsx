import { C, Diagram, Ln, T } from '../kit'

/** Space signals by roughly their own width: CW 150-500 Hz, SSB 2-3 kHz. */
export function G2B_Spacing() {
  const peak = (x: number, y: number, hw: number, h: number, col: string) => (
    <path d={`M${x - hw},${y} L${x - hw * 0.2},${y - h} L${x + hw * 0.2},${y - h} L${x + hw},${y} Z`} fill={col} fillOpacity={0.28} stroke={col} strokeWidth={2.2} strokeLinejoin="round" />
  )
  const gap = (x1: number, x2: number, y: number, label: string, col: string) => (
    <g>
      <Ln x1={x1} y1={y} x2={x2} y2={y} color={col} width={2.5} arrow="both" />
      <T x={(x1 + x2) / 2} y={y + 20} anchor="middle" size={14} bold color={col}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={300} title="CW signals are narrow, so stations can sit 150 to 500 hertz apart. SSB signals are about 3 kilohertz wide, so stations need 2 to 3 kilohertz between them" caption="Space stations by about the signal's own width. Each row has its own scale.">
      <T x={14} y={20} size={14} bold color={C.resist}>CW: a narrow signal</T>
      <Ln x1={14} y1={96} x2={626} y2={96} color={C.muted} width={1.5} />
      {[160, 320, 480].map((x) => <g key={x}>{peak(x, 96, 7, 56, C.resist)}</g>)}
      {gap(160, 320, 116, '150 to 500 Hz apart', C.resist)}
      <Ln x1={14} y1={156} x2={626} y2={156} color={C.fill2} width={1.5} dash="4 4" />
      <T x={14} y={178} size={14} bold color={C.current}>SSB: a 3 kHz-wide signal</T>
      <Ln x1={14} y1={246} x2={626} y2={246} color={C.muted} width={1.5} />
      {[155, 320, 485].map((x) => <g key={x}>{peak(x, 246, 76, 56, C.current)}</g>)}
      {gap(155, 320, 266, '2 to 3 kHz apart', C.current)}
    </Diagram>
  )
}
