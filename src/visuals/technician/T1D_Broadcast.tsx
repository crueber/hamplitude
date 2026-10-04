import { C, Antenna, Box, Diagram, Ln, T } from '../kit'

/** Shared yes/no chip for T1D visuals. */
export function Verdict({ x, y, ok, label }: { x: number; y: number; ok: boolean; label: string }) {
  const color = ok ? C.good : C.bad
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={2} />
      <T x={x} y={y + 0.5} anchor="middle" bold size={14} color={color}>{ok ? '✓' : '✗'}</T>
      <T x={x + 20} y={y} bold size={13.5} color={C.ink}>{label}</T>
    </g>
  )
}

/** Broadcasting (aimed at the general public) is banned; some one-way transmissions are fine. */
export function T1D_Broadcast() {
  return (
    <Diagram w={640} h={230} title="Broadcasting, transmissions intended for the general public, is prohibited. One-way transmissions that are not broadcasting are allowed: ham event announcements, Morse code practice, telecommand and telemetry, and auxiliary links" caption="Same one-way signal: the audience decides.">
      <T x={6} y={20} bold size={14} color={C.bad}>Broadcasting: banned</T>
      <Antenna x={50} y={150} color={C.ink} />
      <rect x={30} y={150} width={40} height={30} rx={5} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      {[58, 106, 154].map((y) => (
        <g key={y}>
          <Ln x1={80} y1={134} x2={170} y2={y + 14} color={C.bad} width={2} arrow />
          <Box x={176} y={y} w={120} h={30} label="Anyone" color={C.bad} size={13} />
        </g>
      ))}
      <T x={6} y={206} size={13} bold color={C.bad}>aimed at the general public</T>
      <Ln x1={320} y1={12} x2={320} y2={216} color={C.fill2} width={2} />
      <T x={338} y={20} bold size={14} color={C.good}>One-way, still allowed</T>
      <Verdict x={348} y={58} ok label="Ham event announcements" />
      <Verdict x={348} y={98} ok label="Morse code practice" />
      <Verdict x={348} y={138} ok label="Telecommand and telemetry" />
      <Verdict x={348} y={178} ok label="Auxiliary link: repeater RX → TX" />
    </Diagram>
  )
}
