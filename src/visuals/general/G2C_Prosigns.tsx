import { C, Diagram, T } from '../kit'

// Morse run together as one character: the prosign.
const ROWS: [string, string, string, string, boolean][] = [
  ['AR', '.-.-.', 'End of a formal message', C.good, true],
  ['KN', '-.--.', 'Listening only for the station(s) named', C.good, true],
  ['SK', '...-.-', 'End of contact, signing off', C.muted, false],
  ['BK', '-...-.-', 'Break: back to you', C.muted, false],
]

function Morse({ x, y, code, col }: { x: number; y: number; code: string; col: string }) {
  let cx = x
  return (
    <g>
      {[...code].map((ch, i) => {
        const w = ch === '.' ? 8 : 24
        const el = <rect key={i} x={cx} y={y - 4} width={w} height={8} rx={4} fill={col} />
        cx += w + 6
        return el
      })}
    </g>
  )
}

/** CW prosigns, Morse patterns, and the RST 'C' suffix. */
/** `exam` adds the note that highlighted prosigns are the exam answers (right for the lesson, wrong elsewhere). */
export function G2C_Prosigns({ exam = true }: { exam?: boolean } = {}) {
  return (
    <Diagram w={640} h={330} title="CW prosigns are sent as one run-together character. AR ends a formal message. KN means listening only for the station or stations named. SK and BK are other prosigns, for ending a contact and for break. In an RST report, a C added at the end means a chirpy or unstable signal" caption={exam ? "Prosign = letters sent run together. Highlighted ones are the exam answers." : "Prosign = letters sent run together as one character."}>
      {ROWS.map(([name, code, mean, col, hot], i) => {
        const y = 12 + i * 52
        return (
          <g key={name}>
            <rect x={10} y={y} width={620} height={44} rx={10} fill={col} fillOpacity={hot ? 0.16 : 0.07} stroke={col} strokeWidth={hot ? 2.2 : 1.4} />
            <T x={24} y={y + 22} size={20} bold mono color={hot ? C.good : C.muted}>{name}</T>
            <Morse x={90} y={y + 22} code={code} col={hot ? C.ink : C.muted} />
            <T x={250} y={y + 22} size={14} bold={hot} color={hot ? C.ink : C.muted}>{mean}</T>
          </g>
        )
      })}
      <T x={14} y={238} size={14} bold>RST report example</T>
      {[['5', 'readability', C.signal], ['9', 'strength', C.signal], ['9', 'tone', C.signal], ['C', 'chirpy', C.bad]].map(([ch, lab, col], i) => (
        <g key={i}>
          <rect x={14 + i * 150} y={254} width={64} height={52} rx={10} fill={col as string} fillOpacity={0.18} stroke={col as string} strokeWidth={i === 3 ? 3 : 2} />
          <T x={46 + i * 150} y={280} anchor="middle" size={26} bold mono color={col as string}>{ch}</T>
          <T x={86 + i * 150} y={280} size={13.5} color={i === 3 ? C.bad : C.muted} bold={i === 3}>{lab}</T>
        </g>
      ))}
    </Diagram>
  )
}
