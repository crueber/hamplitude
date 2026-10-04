import { C, Diagram, Ln, T } from '../kit'

/** Station layout: arrester on a grounded panel where the feed line enters; all ground rods bonded together. */
export function LightningEntry() {
  const gy = 210
  const rod = (x: number) => <Ln x1={x} y1={gy} x2={x} y2={gy + 56} color={C.good} width={7} />
  return (
    <Diagram w={640} h={340} title="Lightning protection: the feed line passes through an arrester mounted on a grounded panel where it enters the building, and all external ground rods are bonded together with heavy wire or strap"
      caption="Divert the surge to ground before it enters the house, and tie every ground together so none rises above the rest.">
      <rect x={20} y={gy} width={600} height={70} fill={C.fill} />
      <Ln x1={20} y1={gy} x2={620} y2={gy} color={C.muted} width={3} />
      {/* tower */}
      <Ln x1={60} y1={50} x2={60} y2={gy} color={C.ink} width={6} />
      <Ln x1={34} y1={50} x2={86} y2={50} color={C.resist} width={5} />
      <T x={60} y={32} anchor="middle" size={13} bold>Antenna</T>
      {/* feed line */}
      <path d={`M60,56 L60,${gy - 22} L330,${gy - 22}`} fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" />
      <T x={190} y={gy - 36} anchor="middle" size={13} bold color={C.signal}>feed line</T>
      {/* house */}
      <rect x={330} y={80} width={290} height={gy - 80} fill="none" stroke={C.ink} strokeWidth={3} />
      <path d="M318,80 L475,34 L632,80" fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={520} y={146} width={70} height={36} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <T x={555} y={164} anchor="middle" size={13} bold>Radio</T>
      <path d={`M356,${gy - 22} L356,164 L520,164`} fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" />
      <T x={445} y={150} anchor="middle" size={12} color={C.muted}>inside</T>
      {/* arrester panel on wall */}
      <rect x={326} y={gy - 54} width={60} height={44} rx={6} fill={C.fill} stroke={C.power} strokeWidth={3} />
      <T x={356} y={gy - 32} anchor="middle" size={13} bold color={C.power}>arrester</T>
      <T x={350} y={100} size={13} bold color={C.power}>arrester on a grounded panel</T>
      <T x={350} y={118} size={13} color={C.power}>where the feed line enters</T>
      <Ln x1={356} y1={128} x2={356} y2={gy - 56} color={C.power} width={2} />
      {/* ground rods + bond */}
      {rod(60)}{rod(356)}{rod(570)}
      <Ln x1={356} y1={gy - 10} x2={356} y2={gy} color={C.good} width={5} />
      <Ln x1={60} y1={gy + 40} x2={570} y2={gy + 40} color={C.good} width={6} />
      <T x={206} y={gy + 58} anchor="middle" size={13} bold color={C.good}>heavy wire or strap bonds all rods together</T>
      <T x={60} y={gy + 96} anchor="middle" size={12} color={C.muted}>tower rod</T>
      <T x={570} y={gy + 96} anchor="middle" size={12} color={C.muted}>power rod</T>
    </Diagram>
  )
}
