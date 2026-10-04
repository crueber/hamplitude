import { C, Diagram, T } from '../kit'

/** Solenoid coil leaks its field into space; a toroid keeps it inside the ring. A ferrite bead on a lead absorbs RF. */
export function ToroidField() {
  return (
    <Diagram w={640} h={262} title="Left: a straight solenoid coil has magnetic field lines that loop out through the surrounding space. Middle: a toroid coil wound on a ring keeps almost all of its field inside the core. Right: a ferrite bead slipped over a wire suppresses VHF and UHF parasitic oscillations."
      caption="Toroid: field stays in the core. Ferrite bead: lossy at VHF/UHF, so it damps parasitics.">
      <T x={110} y={22} anchor="middle" bold size={14}>Solenoid</T>
      {[0, 1, 2].map((k) => <ellipse key={k} cx={110} cy={100} rx={62 + k * 16} ry={28 + k * 16} fill="none" stroke={C.power} strokeWidth={2} strokeDasharray="5 4" opacity={0.75} />)}
      <rect x={50} y={82} width={120} height={36} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={58 + i * 15} y1={78} x2={66 + i * 15} y2={122} stroke={C.current} strokeWidth={3} />)}
      <T x={110} y={206} anchor="middle" size={13} bold color={C.bad}>field leaks out</T>

      <T x={320} y={22} anchor="middle" bold size={14}>Toroid</T>
      <circle cx={320} cy={110} r={54} fill="none" stroke={C.ink} strokeWidth={22} opacity={0.25} />
      <circle cx={320} cy={110} r={54} fill="none" stroke={C.power} strokeWidth={3} strokeDasharray="6 5" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        const [x1, y1, x2, y2] = [320 + 40 * Math.cos(a), 110 + 40 * Math.sin(a), 320 + 70 * Math.cos(a), 110 + 70 * Math.sin(a)]
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.current} strokeWidth={3} strokeLinecap="round" />
      })}
      <T x={320} y={110} anchor="middle" size={12} bold color={C.muted}>core</T>
      <T x={320} y={226} anchor="middle" size={13} bold color={C.good}>field stays in the core</T>

      <T x={530} y={22} anchor="middle" bold size={14}>Ferrite bead</T>
      <line x1={450} y1={110} x2={610} y2={110} stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <rect x={502} y={86} width={56} height={48} rx={10} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      <T x={530} y={110} anchor="middle" size={12} bold>bead</T>
      <T x={530} y={158} anchor="middle" size={13} color={C.muted}>on a transistor lead</T>
      <T x={530} y={226} anchor="middle" size={13} bold color={C.good}>suppresses VHF/UHF parasitics</T>
    </Diagram>
  )
}
