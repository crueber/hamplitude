import { C, Diagram, Ln, T } from '../kit'

/** Meteor scatter and EME: two odd reflectors, each with its own WSJT-X mode. */
export function E2D_WeakPaths() {
  const stn = (x: number, y: number, label: string) => (
    <g>
      <Ln x1={x} y1={y} x2={x} y2={y - 22} color={C.ink} width={3} />
      <Ln x1={x - 8} y1={y - 28} x2={x} y2={y - 22} color={C.ink} width={3} />
      <Ln x1={x + 8} y1={y - 28} x2={x} y2={y - 22} color={C.ink} width={3} />
      <T x={x} y={y + 14} anchor="middle" size={12.5} bold>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={300} title="Two reflector paths. Meteor scatter: two stations bounce signals off a brief ionized meteor trail, using the mode MSK144. Earth-Moon-Earth, or EME: two stations bounce signals off the Moon, using the mode Q65."
      caption="Pick the mode for the reflector: MSK144 for meteors, Q65 for the Moon.">
      <rect x={10} y={10} width={308} height={280} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <rect x={322} y={10} width={308} height={280} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={164} y={30} anchor="middle" size={15} bold color={C.resist}>Meteor scatter</T>
      <path d="M126,56 L204,92" stroke={C.resist} strokeWidth={4} strokeLinecap="round" />
      <path d="M204,92 L210,95" stroke={C.resist} strokeWidth={9} strokeLinecap="round" opacity={0.5} />
      <T x={232} y={74} size={12.5} color={C.muted}>ionized trail</T>
      <Ln x1={62} y1={186} x2={160} y2={80} color={C.signal} width={2.5} arrow dash="6 5" />
      <Ln x1={172} y1={82} x2={262} y2={186} color={C.signal} width={2.5} arrow dash="6 5" />
      <path d="M20,220 Q164,196 308,220" fill="none" stroke={C.muted} strokeWidth={2} />
      {stn(62, 214, 'A')}
      {stn(262, 214, 'B')}
      <rect x={52} y={246} width={224} height={34} rx={8} fill={C.resist} fillOpacity={0.15} stroke={C.resist} strokeWidth={2} />
      <T x={164} y={263} anchor="middle" size={16} bold mono color={C.resist}>MSK144</T>
      <T x={476} y={30} anchor="middle" size={15} bold color={C.power}>Moonbounce (EME)</T>
      <circle cx={476} cy={86} r={32} fill={C.fill2} stroke={C.muted} strokeWidth={2.5} />
      <circle cx={466} cy={78} r={6} fill={C.fill} /><circle cx={488} cy={96} r={8} fill={C.fill} /><circle cx={484} cy={72} r={4} fill={C.fill} />
      <Ln x1={394} y1={186} x2={456} y2={122} color={C.signal} width={2.5} arrow dash="6 5" />
      <Ln x1={496} y1={122} x2={560} y2={186} color={C.signal} width={2.5} arrow dash="6 5" />
      <path d="M332,220 Q476,196 620,220" fill="none" stroke={C.muted} strokeWidth={2} />
      {stn(394, 214, 'A')}
      {stn(574, 214, 'B')}
      <rect x={364} y={246} width={224} height={34} rx={8} fill={C.power} fillOpacity={0.15} stroke={C.power} strokeWidth={2} />
      <T x={476} y={263} anchor="middle" size={16} bold mono color={C.power}>Q65</T>
    </Diagram>
  )
}
