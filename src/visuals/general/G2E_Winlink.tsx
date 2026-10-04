import { C, Diagram, Ln, T } from '../kit'

/** Winlink: email by radio through a gateway (Remote Message Server). */
export function G2E_Winlink() {
  const box = (x: number, w: number, a: string, b: string, col: string) => (
    <g>
      <rect x={x} y={30} width={w} height={80} rx={12} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={58} anchor="middle" size={15} bold>{a}</T>
      <T x={x + w / 2} y={82} anchor="middle" size={12.5} color={C.muted}>{b}</T>
    </g>
  )
  return (
    <Diagram w={640} h={304} title="Winlink sends email over amateur radio. Your station connects by radio, with protocols such as VARA or PACTOR, to a gateway, also called a Winlink remote message server, which passes messages to and from the internet. You connect by sending a connect message on the gateway's published frequency. PACTOR links are limited to two stations, and interference shows up as retries, timeouts and failed connections" caption="Gateway = Remote Message Server: the bridge between radio and the internet.">
      {box(10, 150, 'Your station', 'VARA / PACTOR', C.signal)}
      {box(235, 170, 'Gateway', 'Remote Message Server', C.resist)}
      {box(480, 150, 'Internet', 'email', C.current)}
      <Ln x1={162} y1={70} x2={243} y2={70} color={C.signal} width={3} arrow="both" />
      <Ln x1={407} y1={70} x2={478} y2={70} color={C.ink} width={3} arrow="both" />
      <T x={202} y={52} anchor="middle" size={12.5} bold color={C.signal}>radio</T>
      <T x={202} y={92} anchor="middle" size={12.5} color={C.muted}>HF or VHF</T>
      <T x={14} y={142} size={13.5} bold color={C.good}>To connect: send a connect message on the gateway's published frequency.</T>
      <rect x={10} y={162} width={300} height={124} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.6} />
      <T x={26} y={184} size={14} bold>PACTOR link</T>
      <circle cx={70} cy={232} r={20} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
      <circle cx={190} cy={232} r={20} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2} />
      <Ln x1={92} y1={232} x2={168} y2={232} color={C.signal} width={2.5} arrow="both" />
      <circle cx={256} cy={232} r={18} fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="4 3" />
      <T x={256} y={232} anchor="middle" size={18} bold color={C.bad}>3?</T>
      <T x={160} y={272} anchor="middle" size={13} color={C.muted}>two stations only: no joining</T>
      <rect x={330} y={162} width={300} height={124} rx={12} fill={C.fill} stroke={C.bad} strokeWidth={1.8} />
      <T x={346} y={184} size={14} bold color={C.bad}>Interference shows up as</T>
      {['frequent retries or timeouts', 'long pauses in the message', 'failure to connect'].map((l, i) => (
        <T key={l} x={350} y={214 + i * 26} size={13.5}>{`•  ${l}`}</T>
      ))}
    </Diagram>
  )
}
