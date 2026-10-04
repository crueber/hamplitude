import { C, Diagram, Ln, T } from '../kit'

/** A message hops through forwarding stations; the originating station's control operator answers for it. */
export function E1A_Forwarding() {
  const nodes = [
    { x: 30, l: 'Origin', s: 'sends message', res: true },
    { x: 190, l: 'Station 2', s: 'forwards' },
    { x: 350, l: 'Station 3', s: 'forwards' },
    { x: 510, l: 'Destination', s: 'receives' },
  ]
  return (
    <Diagram w={640} h={200} title="A message passes through several forwarding stations. If it violates the rules, the control operator of the originating station is primarily accountable, not the control operators of the stations that relayed it." caption="Relays that pass along a bad message by accident are not primarily accountable.">
      {nodes.map((n, i) => (
        <g key={n.l}>
          <rect x={n.x} y={50} width={100} height={64} rx={10} fill={n.res ? C.bad : C.fill} fillOpacity={n.res ? 0.18 : 1} stroke={n.res ? C.bad : C.ink} strokeWidth={2} />
          <T x={n.x + 50} y={74} anchor="middle" bold size={14}>{n.l}</T>
          <T x={n.x + 50} y={96} anchor="middle" size={12} color={C.muted}>{n.s}</T>
          {i < 3 && <Ln x1={n.x + 104} y1={82} x2={nodes[i + 1].x - 4} y2={82} color={C.signal} width={2.5} arrow />}
        </g>
      ))}
      <T x={80} y={30} anchor="middle" bold size={14} color={C.bad}>message starts here</T>
      <Ln x1={80} y1={120} x2={80} y2={146} color={C.bad} width={2.5} arrow />
      <T x={80} y={162} size={14} bold color={C.bad}>The control operator of the originating station is accountable</T>
    </Diagram>
  )
}
