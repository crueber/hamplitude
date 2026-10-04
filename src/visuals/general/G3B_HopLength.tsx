import { C, Diagram, Ln, T } from '../kit'

/** Same takeoff angle: a higher layer returns the signal farther. Hop lengths in the pool's 1,200 : 2,500 ratio. */
export function HopLength() {
  const gy = 250, tx = 50, k = 0.14 // ground distance px per mile is k*... : E 1200 mi -> 168 px
  const dE = 1200 * k, dF = 2500 * k
  const yE = 172, yF = 62
  // equal takeoff angle: apex height proportional to half hop
  const apexE: [number, number] = [tx + dE / 2, yE]
  const apexF: [number, number] = [tx + dF / 2, yF]
  return (
    <Diagram w={640} h={330} title="One-hop distance: with the same takeoff angle, the E region returns the signal about 1,200 miles away and the higher F2 region about 2,500 miles away"
      caption="Schematic, same takeoff angle: the higher the layer, the longer the hop. Layer heights not to scale.">
      <rect x={20} y={yF - 14} width={600} height={28} rx={8} fill={C.power} fillOpacity={0.14} stroke={C.power} strokeDasharray="5 5" />
      <T x={608} y={yF - 28} anchor="end" size={14} bold color={C.power}>F2 region (highest)</T>
      <rect x={20} y={yE - 12} width={600} height={24} rx={8} fill={C.current} fillOpacity={0.14} stroke={C.current} strokeDasharray="5 5" />
      <T x={608} y={yE + 26} anchor="end" size={14} bold color={C.current}>E region</T>
      <rect x={20} y={gy} width={600} height={28} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <polyline points={`${tx},${gy} ${apexF[0]},${apexF[1]} ${tx + dF},${gy}`} fill="none" stroke={C.power} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${tx},${gy} ${apexE[0]},${apexE[1]} ${tx + dE},${gy}`} fill="none" stroke={C.current} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
      <Ln x1={tx} y1={gy} x2={tx} y2={gy - 18} color={C.ink} width={3} />
      <T x={tx} y={gy + 41} anchor="middle" size={13} bold>You</T>
      {[[dE, C.current], [dF, C.power]].map(([d, c], i) => (
        <g key={i}>
          <Ln x1={tx + (d as number)} y1={gy} x2={tx + (d as number)} y2={gy - 18} color={C.ink} width={3} />
          <circle cx={tx + (d as number)} cy={gy - 22} r={5} fill={c as string} />
        </g>
      ))}
      <Ln x1={tx + 4} y1={gy + 12} x2={tx + dE - 4} y2={gy + 12} color={C.current} width={2} arrow="both" />
      <T x={tx + dE / 2} y={gy + 41} anchor="middle" size={14} bold color={C.current}>about 1,200 mi</T>
      <Ln x1={tx + dE + 18} y1={gy + 12} x2={tx + dF - 4} y2={gy + 12} color={C.power} width={2} arrow="both" />
      <T x={tx + dE + (dF - dE) / 2 + 24} y={gy + 41} anchor="middle" size={14} bold color={C.power}>about 2,500 mi (one F2 hop)</T>
    </Diagram>
  )
}
