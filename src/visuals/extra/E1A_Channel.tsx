import { C, Diagram, Ln, T } from '../kit'

/** 60 m is channelized: a CW signal must sit at the centre of the channel. */
export function E1A_Channel() {
  const x0 = 120, x1 = 520, cx = 320
  const mark = (x: number, label: string, ok: boolean) => (
    <g>
      <Ln x1={x} y1={50} x2={x} y2={98} color={ok ? C.good : C.bad} width={ok ? 4 : 3} />
      <T x={x} y={116} anchor="middle" bold size={14} color={ok ? C.good : C.bad}>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={150} title="A 60 meter channel. A CW signal must be transmitted at the center frequency of the channel, not at the bottom or top." caption="Channelized 60 m: CW goes on the channel's centre frequency.">
      <T x={cx} y={14} anchor="middle" bold size={15}>One 60 m channel</T>
      <rect x={x0} y={34} width={x1 - x0} height={100} rx={10} fill={C.signal} fillOpacity={0.12} stroke={C.signal} strokeWidth={2} />
      {mark(x0 + 36, 'lowest', false)}
      {mark(cx, 'centre: CW here', true)}
      {mark(x1 - 36, 'highest', false)}
    </Diagram>
  )
}
