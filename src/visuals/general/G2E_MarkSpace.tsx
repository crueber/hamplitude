import { C, Diagram, Ln, T } from '../kit'

/** RTTY sends two tones (mark and space) 170 Hz apart. The wrong sideband swaps them. */
export function G2E_MarkSpace() {
  const row = (y: number, left: string, right: string, lc: string, rc: string, head: string, hc: string) => (
    <g>
      <T x={14} y={y - 34} size={14} bold color={hc}>{head}</T>
      <Ln x1={80} y1={y} x2={560} y2={y} color={C.muted} width={1.5} />
      <Ln x1={235} y1={y} x2={235} y2={y - 26} color={lc} width={5} />
      <Ln x1={405} y1={y} x2={405} y2={y - 26} color={rc} width={5} />
      <T x={235} y={y + 18} anchor="middle" size={14} bold color={lc}>{left}</T>
      <T x={405} y={y + 18} anchor="middle" size={14} bold color={rc}>{right}</T>
    </g>
  )
  return (
    <Diagram w={640} h={280} title="RTTY sends two tones, mark and space, 170 hertz apart, the most common shift on HF. If you listen on the wrong sideband the two tones swap places, so the decoder gets reversed bits and prints garbage. Wrong baud rate will also stop decoding" caption="Looks tuned, prints garbage? Check sideband, mark/space and baud rate.">
      {row(80, 'mark', 'space', C.signal, C.resist, 'Right sideband', C.good)}
      <Ln x1={235} y1={44} x2={405} y2={44} color={C.ink} width={2} arrow="both" />
      <T x={320} y={32} anchor="middle" size={14} bold>170 Hz shift</T>
      {row(204, 'space', 'mark', C.resist, C.signal, 'Wrong sideband: tones swap', C.bad)}
      <T x={320} y={250} anchor="middle" size={13} color={C.muted}>Decoder sees reversed bits: nothing readable.</T>
    </Diagram>
  )
}
