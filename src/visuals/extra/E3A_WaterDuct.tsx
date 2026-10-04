import { C, Diagram, Ln, T, useTime } from '../kit'

type Pt = [number, number]

/** Microwave/VHF ducts form over large bodies of water and carry signals 100-300 miles. */
export function WaterDuct() {
  const { t, ref } = useTime(0.35)
  const pts: Pt[] = [[90, 188], [160, 120], [230, 188], [300, 120], [370, 188], [440, 120], [510, 188]]
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  let d = (t % 1.2 > 1 ? 1 : t % 1.2) * segs.reduce((a, b) => a + b, 0)
  let dot = pts[pts.length - 1]
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) { dot = [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * d) / segs[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * d) / segs[i]]; break }
    d -= segs[i]
  }
  const wave = Array.from({ length: 31 }, (_, i) => `${i ? 'L' : 'M'}${20 + i * 20},${(196 + 3 * Math.sin(i * 1.3)).toFixed(1)}`).join('')
  return (
    <Diagram w={640} h={270} svgRef={ref}
      title="Tropospheric ducts for microwave signals often form over large bodies of water. A typical duct carries signals 100 to 300 miles"
      caption="Schematic side view. The duct is a thin layer of air that traps the signal.">
      <g transform="translate(0,-60)">
      <rect x={20} y={100} width={600} height={78} fill={C.resist} opacity={0.18} />
      <Ln x1={20} y1={100} x2={620} y2={100} color={C.muted} width={1.5} dash="5 5" />
      <T x={30} y={116} size={13} bold color={C.resist}>duct layer</T>
      <rect x={20} y={196} width={600} height={50} fill={C.current} opacity={0.2} />
      <path d={wave} fill="none" stroke={C.current} strokeWidth={3} />
      <T x={300} y={226} anchor="middle" size={14} bold color={C.current}>Large body of water</T>
      <Ln x1={90} y1={196} x2={90} y2={178} color={C.ink} width={3} />
      <Ln x1={510} y1={196} x2={510} y2={178} color={C.ink} width={3} />
      <T x={90} y={222} anchor="middle" size={13} bold>You</T>
      <T x={510} y={222} anchor="middle" size={13} bold>Far shore</T>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.good} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={dot[0]} cy={dot[1]} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
      <Ln x1={90} y1={286} x2={510} y2={286} color={C.power} width={2.5} arrow="both" />
      <T x={300} y={268} anchor="middle" size={15} bold color={C.power}>typical range: 100 – 300 miles</T>
      <T x={300} y={310} anchor="middle" size={13} color={C.muted}>not thousands of miles, and not just 10 – 50</T>
      </g>
    </Diagram>
  )
}
