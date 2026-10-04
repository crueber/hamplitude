import { C, Diagram, Ln, T } from '../kit'

/** A safe mobile installation, top-down: battery fuse, firewall grommet, radio and mic within reach, antenna and coax. */
export function MobileOperation_Install() {
  return (
    <Diagram w={640} h={340}
      title="A mobile radio installation seen from above. A heavy fused power cable runs from the battery in the engine bay through the firewall to the radio; a fuse sits close to the battery on the positive lead. The radio is mounted firmly where it does not block airbags or controls. The coax runs to a roof or trunk mount antenna on the metal body, away from the people inside."
      caption="Illustrative. Follow the radio's manual and keep cables clear of airbags.">
      {/* car body */}
      <rect x={60} y={20} width={300} height={300} rx={50} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <Ln x1={70} y1={118} x2={350} y2={118} color={C.muted} width={2} dash="5 4" />
      <T x={120} y={106} anchor="middle" size={12.5} color={C.muted}>firewall</T>
      {/* engine bay */}
      <T x={290} y={44} anchor="middle" size={12.5} color={C.muted}>engine bay</T>
      <rect x={96} y={58} width={60} height={34} rx={6} fill={C.voltage} fillOpacity={0.2} stroke={C.voltage} strokeWidth={2} />
      <T x={126} y={75} anchor="middle" size={12.5} bold color={C.voltage}>battery</T>
      <rect x={174} y={66} width={22} height={18} rx={3} fill={C.resist} fillOpacity={0.4} stroke={C.resist} strokeWidth={2} />
      {/* power cable */}
      <path d="M156,75 L174,75 M196,75 L220,75 L220,160 L148,160 L148,170" fill="none" stroke={C.voltage} strokeWidth={3} />
      <circle cx={220} cy={118} r={7} fill={C.bg} stroke={C.voltage} strokeWidth={2} />
            <T x={185} y={50} anchor="middle" size={12} bold color={C.resist}>fuse</T>
      {/* cabin */}
      <rect x={116} y={170} width={64} height={36} rx={6} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2.2} />
      <T x={148} y={188} anchor="middle" size={13} bold color={C.signal}>Radio</T>
      <rect x={196} y={170} width={30} height={18} rx={4} fill={C.fill2} stroke={C.muted} strokeWidth={1.8} />
      <T x={238} y={178} size={12} color={C.muted}>mic</T>
      <circle cx={282} cy={190} r={22} fill="none" stroke={C.bad} strokeWidth={2} strokeDasharray="4 3" />
      <T x={282} y={190} anchor="middle" size={12} bold color={C.bad}>airbag</T>
      <T x={282} y={224} anchor="middle" size={12} color={C.muted}>keep clear</T>
      {/* antenna */}
      <circle cx={210} cy={286} r={7} fill={C.signal} />
      <path d="M210,286 L210,250 L148,250 L148,206" fill="none" stroke={C.signal} strokeWidth={2} />
      <T x={218} y={286} size={12} color={C.muted}>roof or trunk mount</T>
      {/* callouts */}
      <T x={380} y={48} size={13} bold color={C.voltage}>Power</T>
      <T x={380} y={68} size={12.5}>Straight to the battery, heavy wire,</T>
      <T x={380} y={86} size={12.5}>with a fuse close to the battery.</T>
      <T x={380} y={134} size={13} bold color={C.signal}>Radio and mic</T>
      <T x={380} y={154} size={12.5}>Mounted securely, not in a crash</T>
      <T x={380} y={172} size={12.5}>path. Mic within easy reach.</T>
      <T x={380} y={218} size={13} bold color={C.signal}>Antenna</T>
      <T x={380} y={238} size={12.5}>On the metal roof or trunk, as far</T>
      <T x={380} y={256} size={12.5}>from the people inside as practical.</T>
      <T x={380} y={296} size={13} bold color={C.bad}>Driving comes first</T>
      <T x={380} y={316} size={12.5}>Operate only when it is safe and legal.</T>
    </Diagram>
  )
}
