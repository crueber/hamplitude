import { C, Diagram, Ln, Lines, T } from '../kit'

/** The day/night boundary seen from the side at an equinox: a path along it is dusk (or dawn) at both ends. */
export function GreyLineAndLongPath_Terminator() {
  const cx = 190, cy = 150, R = 112
  const ay = cy - 66, by = cy + 62
  return (
    <Diagram w={640} h={300}
      title="The Earth seen from the side with the Sun to the left. The grey line is the thin band along the day-night boundary. A north-south path between two stations on it has dusk or dawn at both ends, so little D-layer absorption at either end while the F layer is still ionized"
      caption="Schematic, at an equinox when the boundary runs north-south. At other seasons it tilts.">
      <defs>
        <clipPath id="gl-disc"><circle cx={cx} cy={cy} r={R} /></clipPath>
      </defs>
      <g clipPath="url(#gl-disc)">
        <rect x={cx - R} y={cy - R} width={R} height={2 * R} fill={C.resist} fillOpacity={0.16} />
        <rect x={cx} y={cy - R} width={R} height={2 * R} fill={C.muted} fillOpacity={0.32} />
        <rect x={cx - 14} y={cy - R} width={28} height={2 * R} fill={C.power} fillOpacity={0.3} />
      </g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.muted} strokeWidth={2} />
      <Ln x1={cx} y1={cy - R - 6} x2={cx} y2={cy + R + 6} color={C.power} width={2} dash="5 4" />
      <T x={cx - 56} y={cy - 24} anchor="middle" bold size={14} color={C.resist}>day</T>
      <T x={cx + 56} y={cy - 24} anchor="middle" bold size={14}>night</T>
      <T x={cx} y={cy - R - 18} anchor="middle" bold size={13} color={C.power}>grey line (dusk)</T>
      {[-70, -35, 0, 35, 70].map((dy) => (
        <Ln key={dy} x1={14} y1={cy + dy} x2={cx - R - 12} y2={cy + dy} color={C.resist} width={2} arrow />
      ))}
      <T x={14} y={cy + 100} size={13} bold color={C.resist}>sunlight</T>
      <path d={`M${cx},${ay} L${cx},${by}`} stroke={C.good} strokeWidth={3.5} strokeLinecap="round" fill="none" />
      {[ay, by].map((y, i) => (
        <g key={i}>
          <circle cx={cx} cy={y} r={7} fill={C.bg} stroke={C.ink} strokeWidth={3} />
          <T x={cx + 16} y={y} size={13} bold>{i ? 'Station B' : 'Station A'}</T>
        </g>
      ))}
      <T x={cx - 10} y={cy + 12} anchor="end" size={13} bold color={C.good}>path</T>
      <rect x={350} y={44} width={276} height={212} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <T x={366} y={66} bold size={14}>Why the band is special</T>
      <Lines x={366} y={94} lh={18} size={13}
        lines={['Near the boundary the D layer, which', 'absorbs HF, has faded (dusk) or not yet', 'built up (dawn): low loss at both ends.']} />
      <Lines x={366} y={160} lh={18} size={13}
        lines={['The F layer is still ionized from the', 'day, so it can still return signals.']} />
      <Lines x={366} y={212} lh={18} size={13} color={C.muted}
        lines={['Lasts roughly an hour at a given spot.']} />
    </Diagram>
  )
}
