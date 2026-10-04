import { C, Diagram, Ln, T } from '../kit'

/** Fall protection: 100% tie-off (a lanyard always on the tower), attached to the tower legs above head level. */
export function Climb() {
  const top = 36, gy = 280, lx = 140, rx = 230
  const half = (y: number) => 0 + ((y - top) / (gy - top)) * 14
  const rungs = [60, 100, 140, 180, 220, 260]
  return (
    <Diagram w={640} h={310} title="Tower climbing fall protection: keep at least one lanyard attached to the tower at all times (100 percent tie-off), clip lanyards to the tower legs, and attach a shock-absorbing lanyard above head level"
      caption="Clip to the legs, above your head, and never be unclipped.">
      <g transform="translate(60,0)">
      <Ln x1={lx - half(top)} y1={top} x2={lx - half(gy)} y2={gy} color={C.ink} width={6} />
      <Ln x1={rx + half(top)} y1={top} x2={rx + half(gy)} y2={gy} color={C.ink} width={6} />
      {rungs.map((y) => <Ln key={y} x1={lx - half(y)} y1={y} x2={rx + half(y)} y2={y} color={C.muted} width={3} />)}
      <Ln x1={80} y1={gy} x2={290} y2={gy} color={C.muted} width={4} />
      {/* climber */}
      <circle cx={185} cy={170} r={9} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
      <Ln x1={185} y1={179} x2={185} y2={214} color={C.ink} width={5} />
      <Ln x1={185} y1={188} x2={168} y2={202} color={C.ink} width={4} />
      <Ln x1={185} y1={188} x2={204} y2={174} color={C.ink} width={4} />
      <Ln x1={185} y1={214} x2={178} y2={244} color={C.ink} width={4} />
      <Ln x1={185} y1={214} x2={192} y2={244} color={C.ink} width={4} />
      <rect x={177} y={196} width={16} height={8} rx={2} fill={C.resist} />
      <path d="M185,198 C140,190 120,150 138,114" fill="none" stroke={C.good} strokeWidth={4} strokeLinecap="round" />
      <circle cx={138} cy={112} r={7} fill={C.good} stroke={C.bg} strokeWidth={2} />
      <T x={118} y={96} anchor="end" size={13} bold color={C.good}>lanyard on the leg,</T>
      <T x={118} y={114} anchor="end" size={13} bold color={C.good}>above your head</T>
      <T x={185} y={300} anchor="middle" size={13} color={C.muted}>tower</T>
      </g>
      {/* rules */}
      <T x={380} y={34} size={16} bold color={C.good}>Do</T>
      <T x={380} y={60} size={14}>Attach lanyards to the tower legs</T>
      <T x={380} y={84} size={14}>Shock-absorbing lanyard</T>
      <T x={380} y={104} size={14}>above your head</T>
      <T x={380} y={128} size={14}>100% tie-off: one lanyard always on</T>
      <T x={380} y={148} size={14}>the tower</T>
      <T x={380} y={184} size={16} bold color={C.bad}>Never clip to</T>
      <T x={380} y={208} size={14} color={C.muted}>rungs</T>
      <T x={380} y={230} size={14} color={C.muted}>an antenna mast</T>
      <T x={380} y={252} size={14} color={C.muted}>guy brackets</T>
      <T x={380} y={274} size={14} color={C.muted}>your own belt or waist level</T>
    </Diagram>
  )
}
