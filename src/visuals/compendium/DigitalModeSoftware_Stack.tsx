import { C, Diagram, Ln, T } from '../kit'

const ROWS = [
  { t: 'Operating program', d: 'what you see: decoded text, waterfall, logging', col: C.good },
  { t: 'Modem software', d: 'turns text into audio tones, and tones back to text', col: C.signal },
  { t: 'Computer audio', d: 'sound card: audio out to the radio, audio in from it', col: C.current },
  { t: 'Radio link', d: 'audio cable or USB, plus a way to key the transmitter', col: C.power },
  { t: 'SSB radio', d: 'sends the tones like a voice signal', col: C.resist },
]

/** The software and hardware layers between a keyboard and an antenna for a sound-card digital mode. */
export function DigitalModeSoftware_Stack() {
  const rh = 64
  return (
    <Diagram w={640} h={ROWS.length * rh + 2}
      title="Layers of a sound-card digital-mode station from top to bottom: the operating program, modem software, computer sound card audio, the radio link with audio and keying, and the SSB radio. A computer clock sits beside the stack and a CAT control path runs between the program and the radio."
      caption="Most modes share this chain. Only the modem and the program change from mode to mode.">
      {ROWS.map((r, i) => {
        const y = 10 + i * rh
        return (
          <g key={r.t}>
            <rect x={14} y={y} width={440} height={44} rx={10} fill={r.col} fillOpacity={0.14} stroke={r.col} strokeWidth={2.2} />
            <T x={28} y={y + 15} size={14.5} bold>{r.t}</T>
            <T x={28} y={y + 33} size={12.5} color={C.muted}>{r.d}</T>
            {i < ROWS.length - 1 && <Ln x1={234} y1={y + 45} x2={234} y2={y + rh - 1} color={C.muted} width={3} />}
          </g>
        )
      })}
      <rect x={476} y={10} width={150} height={96} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={551} y={32} anchor="middle" size={13.5} bold color={C.resist}>Accurate clock</T>
      <T x={551} y={56} anchor="middle" size={12.5} color={C.muted}>timed modes like FT8</T>
      <T x={551} y={74} anchor="middle" size={12.5} color={C.muted}>need it to about a</T>
      <T x={551} y={92} anchor="middle" size={12.5} color={C.muted}>second</T>
      <rect x={476} y={126} width={150} height={96} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={551} y={148} anchor="middle" size={13.5} bold color={C.power}>CAT control</T>
      <T x={551} y={172} anchor="middle" size={12.5} color={C.muted}>sets frequency,</T>
      <T x={551} y={190} anchor="middle" size={12.5} color={C.muted}>mode and PTT from</T>
      <T x={551} y={208} anchor="middle" size={12.5} color={C.muted}>the program</T>
      <rect x={476} y={242} width={150} height={26} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <T x={551} y={255} anchor="middle" size={12.5} color={C.muted}>optional, separate</T>
    </Diagram>
  )
}
