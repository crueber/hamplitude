import { C, Diagram, Ln, T } from '../kit'

/** A typical Field Day site, top-down: separate stations, power away from the tents, antennas, logging and a public area. */
export function FieldDay_Site() {
  const st = (x: number, y: number, label: string, sub: string, c: string) => (
    <g key={label}>
      <rect x={x} y={y} width={132} height={64} rx={10} fill={C.fill} stroke={c} strokeWidth={2} />
      <T x={x + 66} y={y + 22} anchor="middle" size={13.5} bold color={c}>{label}</T>
      <T x={x + 66} y={y + 44} anchor="middle" size={12.5} color={C.muted}>{sub}</T>
    </g>
  )
  return (
    <Diagram w={640} h={330}
      title="A typical Field Day site seen from above: several operating stations on different bands and modes, each with its own antenna, spaced apart; a generator and battery well away from the tents; a logging table; and an information area for visitors."
      caption="Illustrative layout. Real sites follow the terrain, the club and the program's current rules.">
      <rect x={6} y={6} width={628} height={318} rx={16} fill={C.good} fillOpacity={0.1} stroke={C.good} strokeWidth={2} strokeDasharray="6 5" />
      {st(24, 28, 'Station 1', 'SSB, 20 m', C.signal)}
      {st(24, 126, 'Station 2', 'CW, 40 m', C.current)}
      {st(24, 224, 'Station 3', 'digital, 15 m', C.power)}
      {/* antennas */}
      {[60, 158, 256].map((y, i) => (
        <g key={i}>
          <Ln x1={170} y1={y} x2={236} y2={y} color={[C.signal, C.current, C.power][i]} width={3} arrow />
          <T x={244} y={y} size={12.5} color={C.muted}>{['wire dipole', 'vertical', 'dipole on a mast'][i]}</T>
        </g>
      ))}
      {/* logging + info */}
      {st(406, 28, 'Logging', 'dupe checking', C.resist)}
      {st(406, 126, 'Information', 'visitors welcome', C.good)}
      {/* power */}
      <rect x={406} y={224} width={132} height={64} rx={10} fill={C.fill} stroke={C.voltage} strokeWidth={2} />
      <T x={472} y={246} anchor="middle" size={13.5} bold color={C.voltage}>Power</T>
      <T x={472} y={268} anchor="middle" size={12.5} color={C.muted}>generator, battery</T>
      <T x={472} y={306} anchor="middle" size={12.5} color={C.muted}>Keep fuel and exhaust away from tents</T>
    </Diagram>
  )
}
