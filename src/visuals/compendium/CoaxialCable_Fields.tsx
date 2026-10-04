import { C, Diagram, Ln, T, TAU } from '../kit'

/** Coax cross-section (fields trapped between centre and shield) plus side view (equal and opposite currents). */
export function CoaxialCable_Fields() {
  const cx = 120, cy = 112
  const halo = { stroke: C.bg, strokeWidth: 5, style: { paintOrder: 'stroke' as const } }
  const spokes = Array.from({ length: 16 }, (_, i) => (i / 16) * TAU)
  const layers: { y: number; label: string; sub: string; px: number; py: number }[] = [
    { y: 34, label: 'Jacket', sub: 'protects against weather and wear', px: cx + 94 * Math.cos(-0.9), py: cy + 94 * Math.sin(-0.9) },
    { y: 78, label: 'Shield (braid or foil)', sub: 'the return conductor; keeps the field inside', px: cx + 82 * Math.cos(-0.35), py: cy + 82 * Math.sin(-0.35) },
    { y: 122, label: 'Dielectric', sub: 'the insulator; sets Z0 and speed', px: cx + 60 * Math.cos(0.3), py: cy + 60 * Math.sin(0.3) },
    { y: 166, label: 'Centre conductor', sub: 'carries the signal out', px: cx + 12 * Math.cos(0.9), py: cy + 12 * Math.sin(0.9) },
  ]
  return (
    <Diagram w={640} h={412}
      title="Coax cross-section and side view. The electric and magnetic fields sit in the insulator between the centre conductor and the inside of the shield. The current on the centre conductor and on the inside of the shield are equal and opposite, so nothing is left outside."
      caption="A working coax keeps its fields inside. Current on the inside of the shield is a mirror image of the centre conductor's.">
      <circle cx={cx} cy={cy} r={100} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={86} fill="none" stroke={C.muted} strokeWidth={9} strokeDasharray="3 2" />
      <circle cx={cx} cy={cy} r={80} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
      {spokes.map((a, i) => (
        <Ln key={i} x1={cx + 22 * Math.cos(a)} y1={cy + 22 * Math.sin(a)} x2={cx + 76 * Math.cos(a)} y2={cy + 76 * Math.sin(a)} color={C.voltage} width={1.4} />
      ))}
      {[40, 62].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.current} strokeWidth={1.6} strokeDasharray="5 4" />
      ))}
      <circle cx={cx} cy={cy} r={14} fill={C.resist} stroke={C.ink} strokeWidth={2} />
      {layers.map((l) => (
        <g key={l.label}>
          <Ln x1={l.px} y1={l.py} x2={262} y2={l.y} color={C.muted} width={1.2} />
          <circle cx={l.px} cy={l.py} r={3} fill={C.ink} />
          <T x={270} y={l.y - 7} size={14} bold>{l.label}</T>
          <T x={270} y={l.y + 11} size={12.5} color={C.muted}>{l.sub}</T>
        </g>
      ))}
      <T x={470} y={212} size={12.5} bold color={C.voltage}>electric field</T>
      <Ln x1={460} y1={212} x2={448} y2={212} color={C.voltage} width={2} />
      <T x={470} y={232} size={12.5} bold color={C.current}>magnetic field</T>
      <Ln x1={460} y1={232} x2={448} y2={232} color={C.current} width={2} dash="5 4" />

      {/* side view */}
      <T x={20} y={246} size={13} bold color={C.muted}>Side view, cut open</T>
      <rect x={30} y={262} width={580} height={120} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <rect x={30} y={280} width={580} height={84} fill={C.fill} stroke={C.muted} strokeWidth={1.5} strokeDasharray="6 3" />
      <Ln x1={30} y1={322} x2={610} y2={322} color={C.resist} width={6} />
      <Ln x1={70} y1={322} x2={300} y2={322} color={C.current} width={2.5} arrow />
      <Ln x1={300} y1={292} x2={70} y2={292} color={C.current} width={2.5} arrow />
      <Ln x1={300} y1={352} x2={70} y2={352} color={C.current} width={2.5} arrow />
      <T x={320} y={292} size={12.5} color={C.muted} {...halo}>inside of the shield: same current, back</T>
      <T x={320} y={322} size={12.5} bold color={C.current} {...halo}>centre conductor: current this way</T>
      <T x={320} y={352} size={12.5} color={C.muted} {...halo}>inside of the shield: same current, back</T>
      <T x={20} y={398} size={12.5} color={C.muted}>Outside the shield the two fields cancel: nothing leaks out or in.</T>
    </Diagram>
  )
}
