import { C, Diagram, Ln, T } from '../kit'

/** Nobody owns a frequency: listen, ask, then call; if interference appears, talk it out. */
export function G2B_AskFirst() {
  const step = (x: number, n: string, head: string, l1: string, l2: string, col: string) => (
    <g>
      <rect x={x} y={34} width={190} height={118} rx={12} fill={col} fillOpacity={0.14} stroke={col} strokeWidth={2} />
      <circle cx={x + 24} cy={58} r={13} fill={col} />
      <T x={x + 24} y={58} anchor="middle" size={14} bold color={C.bg}>{n}</T>
      <T x={x + 46} y={58} size={15} bold>{head}</T>
      <T x={x + 95} y={98} anchor="middle" size={13.5}>{l1}</T>
      <T x={x + 95} y={122} anchor="middle" size={13.5} bold>{l2}</T>
    </g>
  )
  return (
    <Diagram w={640} h={290} title="Before calling CQ on an apparently clear frequency: listen, then ask whether it is in use, by sending QRL question mark and your call sign on CW or asking if the frequency is in use and giving your call on phone, then call only if no one answers. If propagation change brings interference during a contact, work it out with the other stations in a mutually acceptable way" caption="No amateur has priority on a frequency, except in emergencies. Ask, then share.">
      {step(10, '1', 'Listen', 'sounds clear?', 'it may not be', C.muted)}
      {step(225, '2', 'Ask', 'CW: "QRL?" + call', 'Phone: "in use?" + call', C.current)}
      {step(440, '3', 'Then call', 'no reply: call CQ', 'reply: find another', C.good)}
      <Ln x1={202} y1={93} x2={223} y2={93} color={C.ink} width={2.5} arrow />
      <Ln x1={417} y1={93} x2={438} y2={93} color={C.ink} width={2.5} arrow />
      <rect x={10} y={182} width={620} height={90} rx={12} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={26} y={204} size={15} bold color={C.resist}>Interference mid-contact (propagation changed)?</T>
      <T x={26} y={232} size={14}>Work it out with the other stations in a <tspan fontWeight={700}>mutually acceptable</tspan> way.</T>
      <T x={26} y={254} size={13} color={C.muted}>Not: claim priority, cut power, or flip sidebands.</T>
    </Diagram>
  )
}
