import { C, Diagram, T } from '../kit'

const ROWS = [
  { w: '100 W', db: 0, s: '0' },
  { w: '25 W', db: 6.02, s: '1' },
  { w: '5 W', db: 13.01, s: 'about 2' },
  { w: '1 W', db: 20, s: 'about 3' },
]

/** How much weaker a QRP signal is than 100 W, in dB and S-units (6 dB each). */
export function QrpRadios_Decibels() {
  const x0 = 100, scale = 17, y0 = 56, rh = 44
  return (
    <Diagram w={640} h={y0 + ROWS.length * rh + 16} title="Reducing power from 100 watts to 25, 5 and 1 watts weakens the received signal by 6, 13 and 20 decibels, which is about 1, 2 and 3 S-units on a calibrated S-meter"
      caption="Cutting power to 5 W costs about 13 dB at the far end: roughly two S-units, and CW or digital can win it back.">
      <T x={14} y={16} bold size={13} color={C.muted}>Transmit power</T>
      <T x={x0} y={36} size={13} color={C.muted}>weaker at the other station →</T>
      <T x={626} y={36} size={13} color={C.muted} anchor="end">S-units lost</T>
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        const w = r.db * scale
        return (
          <g key={r.w}>
            <T x={14} y={y + 12} bold size={15}>{r.w}</T>
            {w > 0 ? <rect x={x0} y={y} width={w} height={24} rx={4} fill={C.resist} /> : <rect x={x0} y={y} width={3} height={24} fill={C.good} />}
            <T x={x0 + w + 10} y={y + 12} size={13} bold>{r.db === 0 ? 'reference' : `−${Math.round(r.db)} dB`}</T>
            <T x={626} y={y + 12} size={14} bold anchor="end">{r.s}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
