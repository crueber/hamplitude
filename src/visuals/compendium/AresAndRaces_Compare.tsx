import { C, Diagram, Ln, T } from '../kit'

const ROWS: { k: string; a: string[]; r: string[] }[] = [
  { k: 'What it is', a: ['A volunteer group of', 'registered amateurs'], r: ['An FCC amateur service for', 'civil-defense communication'] },
  { k: 'Organised by', a: ['Amateur radio organisations,', 'run locally'], r: ['Government emergency', 'management agencies'] },
  { k: 'To take part', a: ['Register your skills and', 'equipment with the group'], r: ['Be enrolled and certified', 'by the agency'] },
  { k: 'Typical use', a: ['Local emergencies, helping', 'served agencies'], r: ['Government emergency', 'communication, drills'] },
]

/** ARES and RACES side by side, with the rule they share. */
export function AresAndRaces_Compare() {
  const y0 = 56, rh = 58
  return (
    <Diagram w={640} h={342}
      title="ARES compared with RACES: ARES is a volunteer group of registered amateurs organised by amateur radio organisations; RACES is a government-run FCC amateur service for civil defense and requires certification by the agency. Part 97 always applies to both"
      caption="Different organisers, same radio service. Many amateurs belong to both. Details differ by place, so ask your local group.">
      <T x={190} y={20} anchor="middle" size={15} bold color={C.signal}>ARES</T>
      <T x={470} y={20} anchor="middle" size={15} bold color={C.power}>RACES</T>
      <T x={190} y={38} anchor="middle" size={12} color={C.muted}>Amateur Radio Emergency Service</T>
      <T x={470} y={38} anchor="middle" size={12} color={C.muted}>Radio Amateur Civil Emergency Service</T>
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        return (
          <g key={r.k}>
            <rect x={6} y={y} width={92} height={rh - 8} rx={8} fill={C.fill2} />
            <T x={52} y={y + (rh - 8) / 2} anchor="middle" size={12} bold>{r.k}</T>
            <rect x={106} y={y} width={252} height={rh - 8} rx={8} fill={C.fill} stroke={C.signal} strokeWidth={1.5} />
            <T x={232} y={y + 16} anchor="middle" size={13}>{r.a[0]}</T>
            <T x={232} y={y + 34} anchor="middle" size={13}>{r.a[1]}</T>
            <rect x={366} y={y} width={268} height={rh - 8} rx={8} fill={C.fill} stroke={C.power} strokeWidth={1.5} />
            <T x={500} y={y + 16} anchor="middle" size={13}>{r.r[0]}</T>
            <T x={500} y={y + 34} anchor="middle" size={13}>{r.r[1]}</T>
          </g>
        )
      })}
      <Ln x1={6} y1={y0 + 4 * rh + 2} x2={634} y2={y0 + 4 * rh + 2} color={C.fill2} width={2} />
      <rect x={6} y={y0 + 4 * rh + 12} width={628} height={34} rx={10} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={320} y={y0 + 4 * rh + 29} anchor="middle" size={13.5} bold color={C.good}>Both: you need a license, and the FCC rules always apply</T>
    </Diagram>
  )
}
