import { C, Diagram, Ln, T, useTime } from '../kit'

const FREQS = ['3.5', '5.3', '7.1', '10.1', '14.1', '18.1']
const CALL = 3 // channel the caller uses

/** ALE: idle radios constantly scan a channel list; the caller transmits its address on one channel; the radio that hears its own call sign stops and answers. */
export function E2E_AleScan() {
  const { t, ref } = useTime(1)
  const cyc = t % 9
  const heard = cyc >= 6.2
  const idx = heard ? CALL : Math.floor(cyc * 1.2) % FREQS.length
  const X0 = 30, CW = 92
  return (
    <Diagram w={640} h={280} svgRef={ref} title="Automatic Link Establishment: each radio constantly scans through a list of channels, listening. A calling station transmits the call sign of the station it wants on one of those channels. When the scanning radio lands on that channel and hears its own call sign, it stops scanning and answers, establishing the link."
      caption="Scan the list, stay quiet, wake when your call sign is heard.">
      <T x={X0} y={20} size={14} bold color={C.muted}>Channel list (MHz, example)</T>
      {FREQS.map((f, i) => {
        const on = i === idx
        return (
          <g key={f}>
            <rect x={X0 + i * (CW + 4)} y={34} width={CW} height={48} rx={8} fill={on ? C.signal : C.fill} fillOpacity={on ? 0.25 : 1} stroke={on ? C.signal : C.fill2} strokeWidth={on ? 3.5 : 2} />
            <T x={X0 + i * (CW + 4) + CW / 2} y={58} anchor="middle" size={16} bold mono color={on ? C.signal : C.muted}>{f}</T>
          </g>
        )
      })}
      <T x={X0} y={112} size={13.5} bold color={C.signal}>Your ALE radio:</T>
      <T x={X0} y={132} size={13.5} bold color={C.signal}>{heard ? 'heard its own call' : 'scanning each channel'}</T>
      <T x={X0} y={152} size={13.5} bold color={C.signal}>{heard ? 'sign: stops, answers' : 'and listening'}</T>
      <Ln x1={X0 + CALL * (CW + 4) + CW / 2} y1={190} x2={X0 + CALL * (CW + 4) + CW / 2} y2={92} color={C.voltage} width={3} arrow dash={heard ? undefined : '5 5'} />
      <rect x={X0 + CALL * (CW + 4) - 70} y={196} width={232} height={44} rx={8} fill={C.fill} stroke={C.voltage} strokeWidth={2} />
      <T x={X0 + CALL * (CW + 4) + CW / 2} y={212} anchor="middle" size={13} bold color={C.voltage}>Caller transmits on one channel</T>
      <T x={X0 + CALL * (CW + 4) + CW / 2} y={229} anchor="middle" size={12.5} color={C.muted}>"K1ABC de W9XYZ"</T>
      <T x={X0} y={268} size={12.5} color={C.muted}>No internet page, no tone code, no echo: the call sign itself wakes the radio.</T>
    </Diagram>
  )
}
