import { Box, C, Diagram, T } from '../kit'

const LOW = ['151.820', '151.880', '151.940']
const HIGH = ['154.570', '154.600']
const PX_PER_KHZ = 6 // bar widths are drawn to one scale across both groups

/** The five MURS channels in two groups, each with its occupied-bandwidth limit drawn as a bar to a common scale. */
export function WhatIsMurs_Channels() {
  const bar = (cx: number, y: number, khz: number, color: string) => (
    <g>
      <rect x={cx - (khz * PX_PER_KHZ) / 2} y={y} width={khz * PX_PER_KHZ} height={14} rx={4} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={2} />
      <T x={cx} y={y + 30} size={12.5} anchor="middle" color={C.muted}>{khz} kHz</T>
    </g>
  )
  return (
    <Diagram w={640} h={236}
      title="The five MURS channels, by center frequency in megahertz. The first group is 151.820, 151.880 and 151.940, each with an occupied bandwidth of at most 11.25 kilohertz. The second group is 154.570 and 154.600, each with an occupied bandwidth of at most 20.0 kilohertz. The bars under each channel are drawn to one scale, so the second group is nearly twice as wide."
      caption="Center frequencies in MHz. The bars show each channel's occupied-bandwidth limit (the most it may occupy), drawn to one scale (47 CFR 95.2763 and 95.2773).">
      <T x={16} y={22} size={14} bold>151 MHz group</T>
      <T x={364} y={22} size={14} bold>154 MHz group</T>
      {LOW.map((f, i) => (
        <g key={f}>
          <Box x={16 + i * 108} y={40} w={100} h={50} label={f} sub="MHz" color={C.signal} size={14} />
          {bar(66 + i * 108, 112, 11.25, C.signal)}
        </g>
      ))}
      {HIGH.map((f, i) => (
        <g key={f}>
          <Box x={364 + i * 136} y={40} w={128} h={50} label={f} sub="MHz" color={C.resist} size={14} />
          {bar(428 + i * 136, 112, 20, C.resist)}
        </g>
      ))}
      <T x={320} y={196} size={13} anchor="middle" color={C.muted}>Five shared channels. No channel belongs to anyone.</T>
    </Diagram>
  )
}
