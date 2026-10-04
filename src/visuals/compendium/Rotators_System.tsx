import { C, Diagram, Ln, T } from '../kit'

/** A rotator system: mast and beam, thrust bearing at the tower top, rotator below it, control cable to the shack controller. */
export function Rotators_System() {
  const cx = 110
  const label = (y: number, x1: number, bold: string, rest?: string, rest2?: string) => (
    <g>
      <Ln x1={x1} y1={y} x2={188} y2={y} color={C.muted} width={1.5} />
      <T x={196} y={y - (rest ? 8 : 0)} size={13.5} bold>{bold}</T>
      {rest && <T x={196} y={y + 9} size={12.5} color={C.muted}>{rest}</T>}
      {rest2 && <T x={196} y={y + 25} size={12.5} color={C.muted}>{rest2}</T>}
    </g>
  )
  const bearing = (50 * Math.PI) / 180
  const dcx = 520, dcy = 158, dr = 56
  return (
    <Diagram w={640} h={336} title="A rotator system: an antenna on a mast, a thrust bearing on the tower top plate carrying the load, a rotator below it that turns the mast, and a control cable to a controller with a compass dial in the shack"
      caption="The thrust bearing carries the weight; the rotator only turns the mast and holds it. The controller shows the bearing.">
      {/* ground and tower */}
      <Ln x1={30} y1={300} x2={180} y2={300} color={C.muted} width={3} />
      <Ln x1={cx - 20} y1={300} x2={cx - 20} y2={192} color={C.ink} width={3} />
      <Ln x1={cx + 20} y1={300} x2={cx + 20} y2={192} color={C.ink} width={3} />
      {[0, 1, 2, 3, 4].map((k) => <Ln key={k} x1={k % 2 ? cx + 20 : cx - 20} y1={192 + k * 21.6} x2={k % 2 ? cx - 20 : cx + 20} y2={192 + (k + 1) * 21.6} color={C.ink} width={1.6} />)}
      {/* top plate, bearing, rotator, mast */}
      <Ln x1={cx - 32} y1={190} x2={cx + 32} y2={190} color={C.ink} width={5} />
      <rect x={cx - 15} y={172} width={30} height={16} rx={3} fill={C.fill2} stroke={C.power} strokeWidth={2.5} />
      <rect x={cx - 15} y={208} width={30} height={44} rx={5} fill={C.fill2} stroke={C.resist} strokeWidth={2.5} />
      <Ln x1={cx} y1={208} x2={cx} y2={64} color={C.ink} width={5} />
      <Ln x1={cx - 28} y1={56} x2={cx + 28} y2={56} color={C.signal} width={3.5} />
      {[-21, -7, 7, 21].map((dx) => <Ln key={dx} x1={cx + dx} y1={47} x2={cx + dx} y2={65} color={C.signal} width={2.5} />)}
      {/* turning arrow */}
      <path d={`M${cx - 36},96 A36,10 0 0 0 ${cx + 36},96`} fill="none" stroke={C.power} strokeWidth={2} markerEnd="url(#hx-arrow)" />
      {label(56, cx + 32, 'Antenna', 'beam, dish or similar')}
      {label(120, cx + 3, 'Mast', 'turns with the antenna')}
      {label(180, cx + 16, 'Thrust bearing', 'carries the weight and wind load')}
      {label(230, cx + 16, 'Rotator', 'motor, gearing and brake', 'turns and holds the mast')}
      {/* cable */}
      <path d={`M${cx},252 L${cx},296 L${dcx},296 L${dcx},276`} fill="none" stroke={C.resist} strokeWidth={3} strokeLinejoin="round" strokeDasharray="7 4" />
      <T x={300} y={316} size={13} bold anchor="middle" color={C.resist}>control cable</T>
      {/* controller */}
      <rect x={420} y={72} width={200} height={204} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <T x={520} y={56} size={14} bold anchor="middle">Controller in the shack</T>
      <circle cx={dcx} cy={dcy} r={dr} fill={C.bg} stroke={C.ink} strokeWidth={2.5} />
      {[['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([l, a]) => {
        const r = ((a as number) * Math.PI) / 180
        return <T key={l as string} x={dcx + (dr + 13) * Math.sin(r)} y={dcy - (dr + 13) * Math.cos(r)} size={13} bold anchor="middle" color={C.muted}>{l}</T>
      })}
      <Ln x1={dcx} y1={dcy} x2={dcx + (dr - 8) * Math.sin(bearing)} y2={dcy - (dr - 8) * Math.cos(bearing)} color={C.power} width={4} arrow />
      <circle cx={dcx} cy={dcy} r={4} fill={C.ink} />
      <T x={520} y={256} size={12.5} anchor="middle" color={C.muted}>shows and sets the bearing</T>
    </Diagram>
  )
}
