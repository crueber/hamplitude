import { C, Diagram, Ln, T } from '../kit'

const FIELDS: [string, string, number, boolean?][] = [
  ['Number', '12', 70],
  ['Precedence', 'ROUTINE', 100],
  ['Station of origin', 'K1ABC', 130],
  ['Check', '8', 70, true],
  ['Place of origin', 'SPRINGFIELD', 130],
  ['Date', 'OCT 4', 90],
]
const TEXT = ['ARRIVING', 'TUESDAY', 'NOON', 'PLEASE', 'MEET', 'ME', 'AT', 'AIRPORT']

/** A formal radiogram: preamble, address, text, signature. */
export function Radiogram() {
  let x = 10
  let wx = 100
  return (
    <Diagram w={640} h={330} title="A radiogram has a preamble with the information needed to track the message, an address, the text and a signature. The check is the number of words in the text." caption="The check counts words in the text only. Here, 8 words means check 8.">
      <T x={10} y={16} size={13} bold color={C.power}>PREAMBLE: information needed to track the message</T>
      {FIELDS.map(([label, val, w, hi]) => {
        const bx = x
        x += w + 6
        return (
          <g key={label}>
            <rect x={bx} y={32} width={w} height={58} rx={8} fill={C.fill} stroke={hi ? C.power : C.ink} strokeWidth={hi ? 3 : 1.8} />
            <T x={bx + w / 2} y={48} anchor="middle" size={11.5} color={hi ? C.power : C.muted} bold={hi}>{label}</T>
            <T x={bx + w / 2} y={70} anchor="middle" bold mono size={13} color={hi ? C.power : C.ink}>{val}</T>
          </g>
        )
      })}
      <Ln x1={10} y1={110} x2={630} y2={110} color={C.muted} width={1.5} dash="4 4" />
      <T x={10} y={134} size={13} bold color={C.resist}>ADDRESS</T>
      <T x={100} y={134} mono size={14}>JOHN SMITH, 12 MAIN ST, ANYTOWN</T>
      <Ln x1={10} y1={156} x2={630} y2={156} color={C.muted} width={1.5} dash="4 4" />
      <T x={10} y={184} size={13} bold color={C.signal}>TEXT</T>
      {TEXT.map((w, i) => {
        const cw = w.length * 8.6 + 14
        const cx = wx
        wx += cw + 6
        return (
          <g key={w + i}>
            <rect x={cx} y={168} width={cw} height={32} rx={7} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={1.6} />
            <T x={cx + cw / 2} y={184} anchor="middle" mono bold size={13}>{w}</T>
            <T x={cx + cw / 2} y={216} anchor="middle" size={12} bold color={C.power}>{i + 1}</T>
          </g>
        )
      })}
      <Ln x1={10} y1={240} x2={630} y2={240} color={C.muted} width={1.5} dash="4 4" />
      <T x={10} y={264} size={13} bold color={C.good}>SIGNATURE</T>
      <T x={110} y={264} mono size={14}>ANN</T>
      <T x={320} y={304} anchor="middle" size={13} color={C.muted}>"Check" is not a tick box and not a list of relays.</T>
    </Diagram>
  )
}
