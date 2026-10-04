import { C, Box, Diagram, Ln, T } from '../kit'

const hump = (cx: number) => `M${cx - 52},150 C${cx - 26},150 ${cx - 26},68 ${cx},68 C${cx + 26},68 ${cx + 26},150 ${cx + 52},150 Z`

/** Why you keep your transmit frequency off the exact band edge. */
export function T1B_BandEdge() {
  const e1 = 130, e2 = 450
  return (
    <Diagram w={640} h={250} title="A signal set exactly at the band edge has sidebands that spill outside the band; set a little inside, it stays in the band. Dial calibration error, sideband width and drift are all reasons" caption="Stay a little inside the edge.">
      <defs>
        <clipPath id="t1b-out"><rect x={0} y={40} width={e1} height={120} /></clipPath>
      </defs>
      {/* panel A */}
      <T x={8} y={22} bold size={14} color={C.bad}>Dial on the edge</T>
      <rect x={8} y={40} width={e1 - 8} height={110} fill={C.bad} fillOpacity={0.12} />
      <path d={hump(e1)} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      <path d={hump(e1)} fill={C.bad} fillOpacity={0.55} clipPath="url(#t1b-out)" />
      <Ln x1={e1} y1={40} x2={e1} y2={162} color={C.ink} width={2.5} dash="6 4" />
      <Ln x1={8} y1={150} x2={312} y2={150} color={C.muted} width={1.5} />
      <T x={e1} y={176} anchor="middle" size={13} bold>edge = dial</T>
      <T x={60} y={46} anchor="middle" size={12.5} color={C.bad} bold>outside</T>
      <T x={214} y={46} anchor="middle" size={12.5} color={C.muted} bold>inside band</T>
      {/* panel B */}
      <T x={330} y={22} bold size={14} color={C.good}>Dial inside</T>
      <rect x={330} y={40} width={e2 - 330} height={110} fill={C.bad} fillOpacity={0.12} />
      <path d={hump(e2 + 90)} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      <Ln x1={e2} y1={40} x2={e2} y2={162} color={C.ink} width={2.5} dash="6 4" />
      <Ln x1={330} y1={150} x2={634} y2={150} color={C.muted} width={1.5} />
      <T x={e2} y={176} anchor="middle" size={13} bold>edge</T>
      <T x={e2 + 90} y={176} anchor="middle" size={13} bold>dial</T>
      <T x={380} y={46} anchor="middle" size={12.5} color={C.bad} bold>outside</T>
      <T x={560} y={46} anchor="middle" size={12.5} color={C.muted} bold>inside band</T>
      {/* reasons */}
      <Box x={8} y={196} w={192} h={44} label="Display may be off" sub="calibration error" size={13} color={C.resist} />
      <Box x={224} y={196} w={192} h={44} label="Sidebands have width" sub="signal extends past dial" size={13} color={C.signal} />
      <Box x={440} y={196} w={192} h={44} label="Frequency drifts" sub="radio warms up, wanders" size={13} color={C.power} />
    </Diagram>
  )
}
