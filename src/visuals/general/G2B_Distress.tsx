import { C, Diagram, Ln, T } from '../kit'

/** A distress call interrupts a normal contact: acknowledge it and find out what help is needed. */
export function G2B_Distress() {
  const box = (x: number, y: number, w: number, h: number, col: string, a: string, b?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={col} fillOpacity={0.18} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={y + (b ? h / 2 - 9 : h / 2)} anchor="middle" size={14} bold>{a}</T>
      {b && <T x={x + w / 2} y={y + h / 2 + 11} anchor="middle" size={12.5} color={C.muted}>{b}</T>}
    </g>
  )
  return (
    <Diagram w={640} h={300} title="Two stations are in a normal contact when a station in distress breaks in. First, acknowledge the station in distress and determine what assistance is needed. Nets should also have a backup frequency in case of interference or poor conditions" caption="Distress outranks the chat. Answer it first, ask what is needed.">
      {box(14, 20, 120, 52, C.signal, 'You', 'in a contact')}
      {box(178, 20, 120, 52, C.signal, 'Other station', 'in a contact')}
      <Ln x1={134} y1={46} x2={178} y2={46} color={C.signal} width={2.5} arrow="both" />
      {box(430, 20, 196, 52, C.bad, 'Station in distress', 'breaks in')}
      <Ln x1={430} y1={46} x2={304} y2={46} color={C.bad} width={3} arrow />
      <T x={14} y={104} size={14} bold color={C.good}>Your move, in order</T>
      {box(14, 120, 290, 56, C.good, '1  Acknowledge the station', 'let them know you hear them')}
      {box(336, 120, 290, 56, C.good, '2  Find out what help is needed', 'so you know how to help')}
      <Ln x1={304} y1={148} x2={334} y2={148} color={C.good} width={2.5} arrow />
      <T x={14} y={206} size={13} color={C.bad}>Not first: tell a coordinator, drop power, or just go silent.</T>
      <rect x={14} y={234} width={612} height={50} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.8} />
      <T x={30} y={259} size={14}><tspan fontWeight={700}>Running a net?</tspan> Keep a backup frequency for interference or poor conditions.</T>
    </Diagram>
  )
}
