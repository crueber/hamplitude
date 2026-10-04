import { C, Diagram, Ln, T } from '../kit'

/** CAT: the control path between computer software and the radio, separate from the audio path. */
export function CatControl_Link() {
  return (
    <Diagram w={640} h={330}
      title="Several programs share one rig-control program, which owns the single serial or USB control link to the radio. Audio travels on a separate path."
      caption="CAT carries commands and readings, not sound. Digital-mode audio uses its own cable or USB sound device.">
      {/* apps */}
      {['Logging', 'Digital modes', 'Band map'].map((n, i) => (
        <g key={n}>
          <rect x={20} y={36 + i * 52} width={120} height={40} rx={9} fill={C.fill} stroke={C.muted} strokeWidth={2} />
          <T x={80} y={56 + i * 52} anchor="middle" size={13} bold>{n}</T>
          <Ln x1={142} y1={56 + i * 52} x2={190} y2={110 + (i - 1) * 14} color={C.muted} width={2} arrow="both" />
        </g>
      ))}
      <T x={20} y={20} size={13} bold color={C.muted}>Software on the computer</T>
      {/* hub */}
      <rect x={192} y={72} width={130} height={76} rx={10} fill={C.fill} stroke={C.power} strokeWidth={3} />
      <T x={257} y={102} anchor="middle" size={14} bold>Rig control</T>
      <T x={257} y={122} anchor="middle" size={12} color={C.muted}>owns the port</T>
      {/* cable */}
      <Ln x1={324} y1={110} x2={470} y2={110} color={C.power} width={4} arrow="both" />
      <T x={397} y={90} anchor="middle" size={13} bold color={C.power}>CAT link</T>
      <T x={397} y={132} anchor="middle" size={12} color={C.muted}>serial or USB</T>
      {/* radio */}
      <rect x={472} y={56} width={148} height={108} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={3} />
      <T x={546} y={92} anchor="middle" size={15} bold>Radio</T>
      <T x={546} y={116} anchor="middle" size={12} color={C.muted}>frequency, mode,</T>
      <T x={546} y={134} anchor="middle" size={12} color={C.muted}>power, PTT, meters</T>
      {/* messages */}
      <rect x={20} y={192} width={600} height={64} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <T x={34} y={210} size={13} bold color={C.power}>Computer asks or commands</T>
      <T x={34} y={236} size={13} mono>Set 14.074 MHz · Read mode · PTT on</T>
      <T x={380} y={210} size={13} bold color={C.signal}>Radio reports</T>
      <T x={380} y={236} size={13} mono>14.074 MHz · USB · S-meter</T>
      {/* audio lane */}
      <Ln x1={80} y1={298} x2={546} y2={298} color={C.current} width={3} arrow="both" dash="7 5" />
      <T x={313} y={280} anchor="middle" size={13} bold color={C.current}>Audio: a separate cable or USB sound device</T>
      <T x={313} y={318} anchor="middle" size={12} color={C.muted}>If CAT stops working, audio still flows, and the other way round.</T>
    </Diagram>
  )
}
