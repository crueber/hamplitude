import { C, Diagram, T } from '../kit'

// Typical pairs: [band label, example output MHz, offset MHz, quarter wavelength in inches (75 / f_MHz metres)]
const ROWS: { band: string; out: number; off: number; offText: string }[] = [
  { band: '2 m', out: 146.94, off: 0.6, offText: '600 kHz' },
  { band: '70 cm', out: 447, off: 5, offText: '5 MHz' },
  { band: '33 cm', out: 927.5, off: 25, offText: '25 MHz' },
  { band: '23 cm', out: 1285, off: 12, offText: '12 MHz' },
]

/** Same job, smaller parts: quarter-wave antenna length falls with frequency, while the repeater offset grows as a share of the frequency. */
export function UhfRepeaters_Scale() {
  const rowH = 46, y0 = 56
  const qIn = (f: number) => (75 / f) * 39.37
  const antX = 84, antPerIn = 9 // px per inch
  const offX = 392, offPerPct = 44 // px per percent
  return (
    <Diagram w={640} h={252}
      title="Higher repeater bands, smaller parts. Left: the length of a quarter-wave antenna, about 20 inches on 2 meters, 6.6 on 70 centimeters, 3.2 on 33 centimeters and 2.3 on 23 centimeters. Right: the repeater offset as a percentage of the frequency, 0.4 percent on 2 meters, 1.1 on 70 centimeters, 2.7 on 33 centimeters and 0.9 on 23 centimeters, so the filters that separate transmit from receive can be less sharp at UHF."
      caption="Illustrative pairs: 146.94 MHz, 447 MHz, 927.5 MHz and 1285 MHz outputs. Free-space quarter wave; a real whip is cut a little shorter.">
      <T x={antX} y={26} size={13.5} bold color={C.signal}>Quarter-wave antenna</T>
      <T x={antX} y={44} size={12} color={C.muted}>length in inches</T>
      <T x={offX} y={26} size={13.5} bold color={C.power}>Offset as a share of frequency</T>
      <T x={offX} y={44} size={12} color={C.muted}>bigger share, easier to filter</T>
      {ROWS.map((r, i) => {
        const y = y0 + i * rowH
        const q = qIn(r.out)
        const pct = (100 * r.off) / r.out
        const aw = q * antPerIn
        const ow = pct * offPerPct
        return (
          <g key={r.band}>
            <T x={14} y={y + 19} size={14} bold>{r.band}</T>
            <rect x={antX} y={y + 6} width={aw} height={26} rx={4} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
            <T x={antX + aw + 8} y={y + 19} size={13} bold mono color={C.signal}>{q.toFixed(1)} in</T>
            <rect x={offX} y={y + 6} width={ow} height={26} rx={4} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2} />
            <T x={offX + ow + 8} y={y + 19} size={13} bold mono color={C.power}>{pct.toFixed(1)}% <tspan fontWeight={400} fill={C.muted} fontSize={12}>({r.offText})</tspan></T>
          </g>
        )
      })}
    </Diagram>
  )
}
