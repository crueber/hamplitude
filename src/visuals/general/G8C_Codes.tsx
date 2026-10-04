import { C, Diagram, Ln, T } from '../kit'

/** Character codes and FSK tones: Baudot frame, Varicode lengths, mark/space. */
export function G8C_Codes() {
  const bit = (x: number, y: number, w: number, label: string, col: string, fill = true) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={34} rx={6} fill={col} fillOpacity={fill ? 0.25 : 0.08} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={y + 17} anchor="middle" size={13} bold color={col}>{label}</T>
    </g>
  )
  const y1 = 40
  const y2 = 150
  const y3 = 254
  const bw = 54
  return (
    <Diagram w={640} h={330} title="Character codes: Baudot is a 5-bit code with a start bit and a stop bit around each character. PSK31 Varicode gives common lower-case letters short codes and upper-case letters longer ones. FSK sends two tones called mark and space"
      caption="Baudot: fixed 5 bits plus framing. Varicode: short codes for common characters, so capitals are slower.">
      <T x={20} y={18} size={14} bold color={C.muted}>Baudot (RTTY): 5 data bits, framed</T>
      {bit(20, y1, bw, 'start', C.resist, false)}
      {[1, 2, 3, 4, 5].map((n) => bit(20 + n * (bw + 4), y1, bw, `bit ${n}`, C.signal))}
      {bit(20 + 6 * (bw + 4), y1, bw, 'stop', C.resist, false)}
      <T x={20 + 7 * (bw + 4) + 6} y={y1 + 17} size={13} color={C.muted}>one character</T>
      <T x={20} y={y2 - 24} size={14} bold color={C.muted}>PSK31 Varicode: common characters are short</T>
      <T x={20} y={y2 + 10} size={14} bold>e</T>
      <rect x={60} y={y2} width={64} height={20} rx={5} fill={C.current} fillOpacity={0.3} stroke={C.current} strokeWidth={2} />
      <T x={134} y={y2 + 10} size={13} color={C.muted}>lower case: short</T>
      <T x={20} y={y2 + 40} size={14} bold>E</T>
      <rect x={60} y={y2 + 30} width={170} height={20} rx={5} fill={C.bad} fillOpacity={0.25} stroke={C.bad} strokeWidth={2} />
      <T x={240} y={y2 + 40} size={13} color={C.muted}>upper case: longer, so it takes longer to send</T>
      <T x={20} y={y3 - 24} size={14} bold color={C.muted}>FSK: two tones</T>
      <Ln x1={80} y1={y3 + 4} x2={260} y2={y3 + 4} color={C.fill2} width={1.5} />
      <Ln x1={80} y1={y3 + 44} x2={260} y2={y3 + 44} color={C.fill2} width={1.5} />
      <path d={`M80,${y3 + 4} L120,${y3 + 4} L120,${y3 + 44} L170,${y3 + 44} L170,${y3 + 4} L200,${y3 + 4} L200,${y3 + 44} L260,${y3 + 44}`} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={20} y={y3 + 4} size={14} bold color={C.signal}>mark</T>
      <T x={20} y={y3 + 44} size={14} bold color={C.resist}>space</T>
      <T x={280} y={y3 + 24} size={13} color={C.muted}>the two frequencies are named mark and space</T>
    </Diagram>
  )
}
