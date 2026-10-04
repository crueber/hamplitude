import { C, Diagram, Ln, T } from '../kit'

/** Two phone calling habits: break in with your call sign once; answer CQ DX only from outside the caller's area. */
export function G2A_Calling() {
  const bubble = (x: number, y: number, w: number, label: string, col: string, sub?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={sub ? 46 : 34} rx={9} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={y + (sub ? 16 : 17)} anchor="middle" size={14} bold>{label}</T>
      {sub && <T x={x + w / 2} y={y + 34} anchor="middle" size={12.5} color={C.muted}>{sub}</T>}
    </g>
  )
  return (
    <Diagram w={640} h={290} title="Left: two stations are in a contact and a third breaks in by saying only its call sign once. Right: a station in the contiguous 48 states calls CQ DX, and only stations outside the lower 48 should answer; stations inside should wait" caption="Break in short. Answer CQ DX only from outside the caller's area.">
      <T x={14} y={20} size={14} bold color={C.current}>Breaking into a contact</T>
      {bubble(14, 44, 112, 'W1AW', C.signal, 'in contact')}
      {bubble(158, 44, 112, 'K5ABC', C.signal, 'in contact')}
      <Ln x1={126} y1={67} x2={158} y2={67} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={142} y1={170} x2={142} y2={118} color={C.good} width={2.5} arrow />
      {bubble(46, 176, 192, '"N0XYZ"', C.good)}
      <T x={142} y={232} anchor="middle" size={13.5} bold color={C.good}>call sign once</T>
      <T x={142} y={254} anchor="middle" size={13} color={C.bad}>no "QRZ" runs, no "Breaker"</T>

      <Ln x1={316} y1={20} x2={316} y2={278} color={C.fill2} width={2} />

      <T x={334} y={20} size={14} bold color={C.current}>Answering "CQ DX"</T>
      <rect x={334} y={42} width={150} height={150} rx={14} fill={C.fill} stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
      <T x={409} y={58} anchor="middle" size={13} color={C.muted}>lower 48 states</T>
      {bubble(354, 76, 110, 'CQ DX', C.signal)}
      <T x={409} y={134} anchor="middle" size={13} bold color={C.bad}>✗ wait</T>
      <T x={409} y={158} anchor="middle" size={12.5} color={C.muted}>stations here</T>
      <T x={409} y={176} anchor="middle" size={12.5} color={C.muted}>stay quiet</T>
      {['Europe', 'Japan', 'Hawaii'].map((l, i) => (
        <g key={l}>
          <Ln x1={466} y1={93} x2={510} y2={60 + i * 52} color={C.good} width={2} arrow />
          {bubble(512, 44 + i * 52, 112, l, C.good)}
        </g>
      ))}
      <T x={568} y={214} anchor="middle" size={13.5} bold color={C.good}>✓ outside answer</T>
      <T x={334} y={244} size={13} color={C.muted}>DX = distant. For a lower-48 caller,</T>
      <T x={334} y={264} size={13} color={C.muted}>that means outside the lower 48.</T>
    </Diagram>
  )
}
