import { C, Diagram, Ln, T } from '../kit'

const X0 = 60, X1 = 600

/** Three offset schemes on a frequency axis: RIT moves only receive, XIT only transmit, split uses two VFOs. */
export function RitXitAndSplit_Offsets() {
  // each panel: axis from lo..hi kHz relative to the dial frequency 14.200 MHz
  const panel = (y: number, title: string, lo: number, hi: number, ticks: number[], rx: number, tx: number, rxLabel: string, txLabel: string, note: string, dec = 1) => {
    const X = (k: number) => X0 + ((k - lo) / (hi - lo)) * (X1 - X0)
    const base = y + 74
    const fmtk = (k: number) => (k === 0 ? '14.200' : (k > 0 ? '+' : '−') + Math.abs(k).toFixed(dec) + ' kHz')
    return (
      <g>
        <T x={20} y={y + 6} bold size={14}>{title}</T>
        <T x={620} y={y + 6} anchor="end" size={12.5} color={C.muted}>{note}</T>
        <Ln x1={X0 - 20} y1={base} x2={X1 + 20} y2={base} color={C.muted} width={1.5} />
        {ticks.map((k) => (
          <g key={k}>
            <Ln x1={X(k)} y1={base - 4} x2={X(k)} y2={base + 4} color={C.muted} width={1.5} />
            <T x={X(k)} y={base + 16} anchor="middle" size={12} color={C.muted}>{fmtk(k)}</T>
          </g>
        ))}
        {/* receive marker: triangle pointing down onto the axis, above */}
        <path d={`M${X(rx) - 8},${base - 30} L${X(rx) + 8},${base - 30} L${X(rx)},${base - 14} Z`} fill={C.current} />
        <T x={X(rx)} y={base - 40} anchor="middle" size={12.5} bold color={C.current}>{rxLabel}</T>
        {rx !== tx && (
          <g>
            <path d={`M${X(tx) - 8},${base - 14} L${X(tx) + 8},${base - 14} L${X(tx)},${base - 30} Z`} fill={C.voltage} />
            <T x={X(tx)} y={base - 40} anchor="middle" size={12.5} bold color={C.voltage}>{txLabel}</T>
          </g>
        )}
      </g>
    )
  }
  return (
    <Diagram w={640} h={368}
      title="RIT, XIT and split on a frequency axis. With RIT the transmit frequency stays at 14.200 MHz and the receive frequency moves up a fraction of a kilohertz to match the other station. With XIT the receive frequency stays and the transmit frequency moves. With split, you listen on one frequency and transmit several kilohertz away."
      caption="Blue: where you listen. Red: where you transmit. Offsets are examples.">
      {panel(8, 'RIT', -1, 1, [-1, 0, 1], 0.3, 0, 'RX +0.3 kHz', 'TX', 'moves RX only; TX stays on the dial', 0)}
      {panel(128, 'XIT', -1, 1, [-1, 0, 1], 0, 0.5, 'RX', 'TX +0.5 kHz', 'moves TX only; RX stays on the dial', 0)}
      {panel(248, 'Split', -1, 7, [0, 5], 0, 5, 'RX 14.200', 'TX +5 kHz', 'two VFOs: listen here, transmit there', 0)}
    </Diagram>
  )
}
