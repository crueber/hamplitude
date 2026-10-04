import { C, Diagram, Ln, T } from '../kit'

function Num({ x, y, n, col }: { x: number; y: number; n: number; col: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={C.bg} stroke={col} strokeWidth={2.5} />
      <T x={x} y={y} anchor="middle" size={13} bold color={col}>{n}</T>
    </g>
  )
}

const ROWS: [string, string, string, string][] = [
  ['1', 'Burns', 'The tip is typically 300 to 400 °C. Park the iron in its stand, every time.', C.bad],
  ['2', 'Fumes', 'Flux smoke irritates. Keep your face out of it: fan, extractor or open window.', C.power],
  ['3', 'Eyes', 'Solder can spit and clipped leads fly: wear safety glasses.', C.current],
  ['4', 'Lead', 'Tin-lead solder: no food or drink at the bench, and wash your hands after.', C.resist],
]

/** A soldering bench with its four hazards numbered, and one control for each. */
export function SolderingSafety_Bench() {
  return (
    <Diagram w={640} h={338}
      title="A soldering bench with four hazards numbered: the hot iron tip, flux fumes rising from the joint toward a fan, flying solder and clipped leads, and the lead in solder."
      caption="Four hazards, four habits. Lead-free solder is not a reason to relax: its flux fumes and higher temperature are still hazards.">
      {/* bench and board */}
      <rect x={20} y={176} width={600} height={12} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      <rect x={230} y={160} width={170} height={16} rx={2} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Ln x1={300} y1={160} x2={300} y2={130} color={C.ink} width={3} />
      <ellipse cx={300} cy={158} rx={16} ry={6} fill={C.muted} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.5} />
      {/* iron in stand */}
      <path d="M62,176 L74,150 L96,150 L108,176 Z" fill={C.fill} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
      <g transform="translate(24,112) rotate(16)">
        <rect x={0} y={-8} width={84} height={16} rx={7} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
        <rect x={84} y={-5} width={34} height={10} fill={C.muted} fillOpacity={0.6} stroke={C.ink} strokeWidth={2} />
        <polygon points="118,-5 140,-2 140,2 118,5" fill={C.bad} stroke={C.ink} strokeWidth={1.5} />
      </g>
      <Num x={160} y={116} n={1} col={C.bad} />
      {/* fume plume to fan */}
      {[0, 14, 28].map((dx) => (
        <path key={dx} d={`M${288 + dx},128 C${288 + dx - 14},100 ${310 + dx},84 ${296 + dx},62`} fill="none" stroke={C.power} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
      ))}
      <Ln x1={344} y1={80} x2={440} y2={80} color={C.power} width={3} dash="7 6" arrow />
      <rect x={446} y={50} width={66} height={60} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <circle cx={479} cy={80} r={18} fill="none" stroke={C.ink} strokeWidth={2} />
      <path d="M479,80 L479,64 M479,80 L493,88 M479,80 L465,88" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
      <T x={479} y={36} anchor="middle" size={12.5} bold>fan or extractor</T>
      <Num x={330} y={48} n={2} col={C.power} />
      {/* flying clipped lead */}
      <path d="M410,150 Q440,128 470,146" fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="3 5" />
      <Ln x1={466} y1={142} x2={478} y2={152} color={C.ink} width={3} />
      <Num x={426} y={124} n={3} col={C.current} />
      {/* solder reel */}
      <circle cx={570} cy={150} r={24} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <circle cx={570} cy={150} r={9} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <Num x={570} y={110} n={4} col={C.resist} />
      <T x={570} y={198} anchor="middle" size={12.5} bold>solder</T>
      <T x={85} y={198} anchor="middle" size={12.5} bold>iron stand</T>
      {/* legend */}
      {ROWS.map(([n, head, text, col], i) => {
        const y = 232 + i * 26
        return (
          <g key={n}>
            <Num x={34} y={y} n={Number(n)} col={col} />
            <T x={56} y={y} size={14} bold color={col}>{head}</T>
            <T x={116} y={y} size={13}>{text}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
