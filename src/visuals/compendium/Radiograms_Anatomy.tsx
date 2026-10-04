import { C, Diagram, Ln, T } from '../kit'

const TEXT = 'SAFE AT SHELTER POWER OUT WILL CALL WHEN PHONES WORK'.split(' ')

/** An annotated radiogram: preamble fields, address, text with word count, signature. */
export function Radiograms_Anatomy() {
  const PRE: [string, string, number, string][] = [
    ['Number', '14', 70, C.muted],
    ['Precedence', 'W', 96, C.bad],
    ['Station of origin', 'N0XYZ', 138, C.muted],
    ['Check', String(TEXT.length), 66, C.power],
    ['Place of origin', 'RIVERTON', 120, C.muted],
    ['Date', 'OCT 4', 90, C.muted],
  ]
  let x = 12
  let wx = 100
  return (
    <Diagram w={640} h={392} title="An annotated radiogram. The preamble holds the tracking information: message number, precedence, station of origin, check, place of origin and date. Below it are the address, the text and the signature. In this example the text is 10 words, so the check is 10. The example call sign, name and place are invented." caption="Illustrative example. Preamble: for tracking. Check: words in the text only.">
      <rect x={6} y={8} width={628} height={92} rx={12} fill={C.power} fillOpacity={0.08} stroke={C.power} strokeWidth={1.8} />
      <T x={16} y={24} size={13} bold color={C.power}>PREAMBLE: information needed to track the message</T>
      {PRE.map(([label, val, w, col]) => {
        const bx = x
        x += w + 6
        const hot = col !== C.muted
        return (
          <g key={label}>
            <rect x={bx} y={40} width={w} height={52} rx={8} fill={C.fill} stroke={hot ? col : C.ink} strokeWidth={hot ? 2.8 : 1.6} />
            <T x={bx + w / 2} y={55} anchor="middle" size={11.5} color={hot ? col : C.muted} bold={hot}>{label}</T>
            <T x={bx + w / 2} y={76} anchor="middle" bold mono size={13.5}>{val}</T>
          </g>
        )
      })}

      <T x={14} y={124} size={13} bold color={C.resist}>ADDRESS</T>
      <T x={104} y={124} mono size={13.5}>JANE DOE, 12 ELM ST, OAKVILLE</T>
      <Ln x1={12} y1={142} x2={628} y2={142} color={C.muted} width={1.4} dash="4 4" />

      <T x={14} y={166} size={13} bold color={C.signal}>TEXT</T>
      {TEXT.slice(0, 6).map((w, i) => {
        const cw = w.length * 8.6 + 14
        const cx = wx
        wx += cw + 6
        return (
          <g key={w + i}>
            <rect x={cx} y={150} width={cw} height={30} rx={7} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={1.6} />
            <T x={cx + cw / 2} y={165} anchor="middle" mono bold size={13}>{w}</T>
            <T x={cx + cw / 2} y={194} anchor="middle" size={12} bold color={C.power}>{i + 1}</T>
          </g>
        )
      })}
      {(() => {
        wx = 100
        return TEXT.slice(6).map((w, i) => {
          const cw = w.length * 8.6 + 14
          const cx = wx
          wx += cw + 6
          return (
            <g key={w + i}>
              <rect x={cx} y={206} width={cw} height={30} rx={7} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={1.6} />
              <T x={cx + cw / 2} y={221} anchor="middle" mono bold size={13}>{w}</T>
              <T x={cx + cw / 2} y={250} anchor="middle" size={12} bold color={C.power}>{i + 7}</T>
            </g>
          )
        })
      })()}
      <Ln x1={12} y1={266} x2={628} y2={266} color={C.muted} width={1.4} dash="4 4" />
      <T x={14} y={288} size={13} bold color={C.good}>SIGNATURE</T>
      <T x={118} y={288} mono size={13.5}>ANN</T>

      <rect x={6} y={306} width={628} height={78} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.6} />
      <T x={18} y={326} size={13} bold color={C.bad}>Precedence W = welfare</T>
      <T x={18} y={348} size={13} color={C.muted}>Others: R routine, P priority, EMERGENCY (life-and-death urgency).</T>
      <T x={18} y={368} size={13} color={C.muted}>Check = 10: ten words in the text, counted by the numbers above.</T>
    </Diagram>
  )
}
