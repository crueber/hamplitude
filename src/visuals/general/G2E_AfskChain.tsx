import { C, Diagram, Ln, T } from '../kit'

/** Digital-mode setup chain: software makes audio tones, the sound card carries them, the SSB radio sends them. */
export function G2E_AfskChain() {
  const box = (x: number, w: number, a: string, b: string, col: string) => (
    <g>
      <rect x={x} y={34} width={w} height={84} rx={12} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={62} anchor="middle" size={15} bold>{a}</T>
      <T x={x + w / 2} y={86} anchor="middle" size={12.5} color={C.muted}>{b}</T>
    </g>
  )
  return (
    <Diagram w={640} h={224} title="Digital mode setup chain: software on the computer makes audio tones, the sound card or interface carries the audio, and an SSB radio sends it. With AFSK the radio is simply an SSB transmitter, so the sideband setting matters" caption="AFSK: the software makes audio tones, the radio just sends them as SSB.">
      {box(10, 170, 'Software', 'RTTY, FT8, ...', C.signal)}
      {box(235, 170, 'Sound card', 'or interface: audio', C.resist)}
      {box(460, 170, 'SSB radio', 'USB or LSB', C.current)}
      <Ln x1={182} y1={76} x2={233} y2={76} color={C.ink} width={2.5} arrow="both" />
      <Ln x1={407} y1={76} x2={458} y2={76} color={C.ink} width={2.5} arrow="both" />
      <T x={207} y={56} anchor="middle" size={12.5} color={C.muted}>tones</T>
      <T x={432} y={56} anchor="middle" size={12.5} color={C.muted}>audio</T>
      <rect x={10} y={142} width={620} height={64} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.6} />
      <T x={26} y={164} size={14} bold>Sideband matters:</T>
      <T x={26} y={187} size={14}>RTTY: <tspan fontWeight={700}>LSB</tspan>.   JT65, JT9, FT4, FT8: <tspan fontWeight={700}>USB</tspan>.   No special hardware modem needed for FT8.</T>
    </Diagram>
  )
}
