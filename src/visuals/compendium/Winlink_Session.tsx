import { C, Diagram, Ln, T } from '../kit'

/** A Winlink message is written offline, exchanged in one short radio session, and read offline. */
export function Winlink_Session() {
  const steps = [
    { t: 'Write', d: 'Compose email on your computer, no radio needed.', col: C.good },
    { t: 'Connect', d: 'Radio link to a gateway or to another station.', col: C.signal },
    { t: 'Exchange', d: 'Outgoing and incoming messages swap in one session.', col: C.power },
    { t: 'Disconnect', d: 'Link closes. Read replies at your leisure.', col: C.current },
  ]
  return (
    <Diagram w={640} h={314}
      title="A Winlink session in four steps: write the message offline, connect by radio, exchange outgoing and incoming messages in one short session, then disconnect and read. Below, two ways to connect: through a gateway to the internet, or directly peer to peer between two radio stations with no internet at all."
      caption="Store-and-forward: the radio link is only needed for the exchange, not for writing or reading.">
      {steps.map((s, i) => {
        const x = 8 + i * 158
        return (
          <g key={s.t}>
            <rect x={x} y={14} width={140} height={128} rx={12} fill={C.fill} stroke={s.col} strokeWidth={2.4} />
            <circle cx={x + 24} cy={38} r={13} fill={s.col} fillOpacity={0.25} stroke={s.col} strokeWidth={2} />
            <T x={x + 24} y={38} anchor="middle" size={13} bold>{i + 1}</T>
            <T x={x + 46} y={38} size={15} bold>{s.t}</T>
            {wrap(s.d, 19).map((l, j) => <T key={j} x={x + 12} y={72 + j * 20} size={13}>{l}</T>)}
            {i < 3 && <Ln x1={x + 142} y1={78} x2={x + 156} y2={78} color={C.muted} width={2} arrow />}
          </g>
        )
      })}
      <T x={14} y={170} size={13} bold color={C.muted}>Two ways to make the connection</T>
      <rect x={14} y={186} width={300} height={116} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={26} y={206} size={14} bold color={C.signal}>Through a gateway</T>
      <T x={26} y={232} size={13}>You  →  gateway  →  internet email</T>
      <T x={26} y={256} size={12.5} color={C.muted}>Reaches any email address, but needs a</T>
      <T x={26} y={274} size={12.5} color={C.muted}>gateway you can hear and be heard by.</T>
      <rect x={326} y={186} width={300} height={116} rx={12} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={338} y={206} size={14} bold color={C.good}>Peer to peer</T>
      <T x={338} y={232} size={13}>You  ↔  another station</T>
      <T x={338} y={256} size={12.5} color={C.muted}>No gateway and no internet at all: the</T>
      <T x={338} y={274} size={12.5} color={C.muted}>whole path is radio.</T>
    </Diagram>
  )
}

function wrap(s: string, n: number): string[] {
  const out: string[] = []
  let cur = ''
  for (const w of s.split(' ')) {
    if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w } else cur = (cur + ' ' + w).trim()
  }
  if (cur) out.push(cur)
  return out
}
