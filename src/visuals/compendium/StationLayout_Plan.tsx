import { C, Diagram, Ground, Ln, T } from '../kit'

/** A top-down plan of a safe, tidy shack: separated AC and RF runs, an entry panel at the wall, short radio-to-accessory runs. */
export function StationLayout_Plan() {
  return (
    <Diagram w={640} h={360}
      title="Top-down plan of a shack: operating desk along one wall, the radio at the centre with accessories close by, an RF entry panel with arrestors and a ground rod outside the wall, and AC power kept apart from RF cables."
      caption="Schematic. Short runs where it matters, AC and RF kept apart, and a grounded entry where the feed lines come in.">
      <rect x={110} y={16} width={510} height={328} rx={6} fill="none" stroke={C.muted} strokeWidth={3} />
      <T x={120} y={36} size={12} color={C.muted} bold>Shack</T>
      {/* desk */}
      <rect x={160} y={52} width={440} height={86} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={172} y={150} size={12} color={C.muted}>Desk</T>
      <rect x={340} y={64} width={80} height={44} rx={8} fill={C.fill2} stroke={C.signal} strokeWidth={2.5} />
      <T x={380} y={86} anchor="middle" size={13} bold>Radio</T>
      <rect x={440} y={64} width={64} height={44} rx={8} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <T x={472} y={80} anchor="middle" size={12} bold>Tuner</T>
      <T x={472} y={96} anchor="middle" size={12} color={C.muted}>meter</T>
      <rect x={524} y={64} width={64} height={44} rx={8} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <T x={556} y={86} anchor="middle" size={12} bold>Screen</T>
      <rect x={176} y={64} width={72} height={44} rx={8} fill={C.fill2} stroke={C.resist} strokeWidth={2.5} />
      <T x={212} y={80} anchor="middle" size={12} bold>Amp</T>
      <T x={212} y={96} anchor="middle" size={12} color={C.muted}>ventilated</T>
      <rect x={262} y={64} width={64} height={44} rx={8} fill={C.fill2} stroke={C.voltage} strokeWidth={2.5} />
      <T x={294} y={80} anchor="middle" size={12} bold>Power</T>
      <T x={294} y={96} anchor="middle" size={12} color={C.muted}>supply</T>
      {/* chair */}
      <rect x={350} y={178} width={60} height={50} rx={22} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <T x={380} y={203} anchor="middle" size={12} color={C.muted}>You</T>
      {/* entry panel */}
      <rect x={96} y={90} width={26} height={72} rx={4} fill={C.fill2} stroke={C.good} strokeWidth={3} />
      <T x={20} y={104} size={12} bold color={C.good}>Entry panel</T>
      <T x={20} y={122} size={12} color={C.muted}>arrestors on</T>
      <T x={20} y={140} size={12} color={C.muted}>a ground bus</T>
      <Ground x={60} y={190} />
      <Ln x1={60} y1={170} x2={60} y2={176} color={C.ink} width={2.5} />
      <Ln x1={109} y1={162} x2={109} y2={176} color={C.ink} width={2.5} />
      <Ln x1={60} y1={176} x2={109} y2={176} color={C.ink} width={2.5} />
      <T x={20} y={228} size={12} color={C.muted}>to ground rod</T>
      <T x={20} y={244} size={12} color={C.muted}>and outside</T>
      <T x={20} y={260} size={12} color={C.muted}>bonded</T>
      <T x={20} y={276} size={12} color={C.muted}>system</T>
      {/* RF feed line */}
      <path d="M122,126 L150,126 L150,118 L342,118 L342,108" fill="none" stroke={C.signal} strokeWidth={3} />
      <T x={240} y={170} anchor="middle" size={12} bold color={C.signal}>RF feed lines</T>
      <path d="M240,160 L240,124" stroke={C.signal} strokeWidth={0} fill="none" />
      {/* AC route */}
      <rect x={560} y={296} width={46} height={30} rx={6} fill={C.fill2} stroke={C.voltage} strokeWidth={2.5} />
      <T x={583} y={311} anchor="middle" size={12} bold>AC</T>
      <path d="M583,296 L583,152 L296,152 L296,108" fill="none" stroke={C.voltage} strokeWidth={3} strokeDasharray="8 5" />
      <T x={500} y={170} anchor="middle" size={12} bold color={C.voltage}>AC power, on the far side</T>
      <T x={500} y={186} anchor="middle" size={12} color={C.muted}>one protected circuit</T>
      <T x={150} y={296} size={12} bold>Keep AC and RF runs apart;</T>
      <T x={150} y={314} size={12} bold>if they must cross, cross at 90°.</T>
      <T x={150} y={334} size={12} color={C.muted}>Label cables. Leave room behind the desk.</T>
    </Diagram>
  )
}
