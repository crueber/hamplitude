import { C, Diagram, Ln, T } from '../kit'

/** A J-pole: half-wave radiator on top of a quarter-wave shorted stub. The coax taps the stub where it is 50 ohms. */
export function JPoleAndSlimJim_Anatomy() {
  const lx = 190, sx = 250, bot = 300, top = 36, mid = 213, tap = 262
  return (
    <Diagram w={640} h={330}
      title="Anatomy of a J-pole. A half-wave radiator sits on top of a quarter-wave stub that is shorted at the bottom. Impedance rises from nearly zero at the short to very high at the top of the stub, so the coax taps on partway up where it is about 50 ohms. Illustrative 2 meter lengths: radiator about 3.2 feet, stub about 1.6 feet"
      caption="A shorted quarter-wave stub transforms impedance along its length. The tap point is trimmed for lowest SWR.">
      <Ln x1={lx} y1={bot} x2={lx} y2={top} color={C.ink} width={6} />
      <Ln x1={sx} y1={bot} x2={sx} y2={mid} color={C.ink} width={6} />
      <Ln x1={lx} y1={bot} x2={sx} y2={bot} color={C.ink} width={6} />
      <circle cx={lx} cy={tap} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <circle cx={sx} cy={tap} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={sx + 6} y1={tap} x2={320} y2={tap} color={C.power} width={4} />
      <T x={330} y={tap} size={13} bold color={C.power}>coax tap: about 50 Ω</T>

      <Ln x1={lx - 24} y1={top} x2={lx - 24} y2={mid} color={C.signal} width={2} arrow="both" />
      <T x={lx - 34} y={(top + mid) / 2} anchor="end" size={14} bold color={C.signal}>½ λ radiator</T>
      <Ln x1={lx - 24} y1={mid} x2={lx - 24} y2={bot} color={C.good} width={2} arrow="both" />
      <T x={lx - 34} y={(mid + bot) / 2 - 8} anchor="end" size={14} bold color={C.good}>¼ λ stub</T>
      <T x={lx - 34} y={(mid + bot) / 2 + 10} anchor="end" size={12} color={C.muted}>(matching section)</T>

      <Ln x1={sx + 10} y1={mid} x2={320} y2={mid} color={C.muted} width={1.5} dash="4 4" />
      <T x={330} y={mid - 10} size={13} bold color={C.voltage}>top of the stub: very high Z</T>
      <T x={330} y={mid + 10} size={12} color={C.muted}>voltage peak, almost no current</T>
      <Ln x1={sx + 10} y1={bot} x2={320} y2={bot} color={C.muted} width={1.5} dash="4 4" />
      <T x={330} y={bot - 10} size={13} bold color={C.current}>shorted bottom: near 0 Ω</T>
      <T x={330} y={bot + 10} size={12} color={C.muted}>current peak, almost no voltage</T>
      <T x={lx} y={top - 12} anchor="middle" size={12} color={C.muted}>open end</T>
    </Diagram>
  )
}
