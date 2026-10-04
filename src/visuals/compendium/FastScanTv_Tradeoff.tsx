import { C, Diagram, Ln, T } from '../kit'

// Rounded, illustrative: SSTV about 2.4 kHz for roughly 100 s per picture; fast-scan about 6 MHz for 1/30 s per frame.
const X0 = 90, X1 = 610, Y0 = 36, Y1 = 236
// log axes: time per picture 0.01 s .. 1000 s (5 decades); bandwidth 1 kHz .. 10 MHz (4 decades)
const tx = (s: number) => X0 + ((Math.log10(s) + 2) / 5) * (X1 - X0)
const by = (hz: number) => Y1 - ((Math.log10(hz) - 3) / 4) * (Y1 - Y0)

/** Time and bandwidth are two ways of paying for the same picture detail. */
export function FastScanTv_Tradeoff() {
  const pts = [
    { s: 100, hz: 2400, name: 'SSTV', sub: '2.4 kHz, 100 s', c: C.signal, dx: 12, anchor: 'start' as const, dy: -44 },
    { s: 1 / 30, hz: 6e6, name: 'Fast-scan TV', sub: '6 MHz, 1/30 s a frame', c: C.power, dx: 14, anchor: 'start' as const, dy: -26 },
  ]
  return (
    <Diagram w={640} h={308} title="Time per picture against bandwidth, both on log scales. Slow-scan TV sits at narrow bandwidth and long time, fast-scan TV at wide bandwidth and short time. A line of constant detail joins them: to send a picture faster you need proportionally more bandwidth"
      caption="Rounded, illustrative values. Picture detail differs between the two, but the trade is the same: speed costs bandwidth.">
      <Ln x1={X0} y1={Y1} x2={X1} y2={Y1} color={C.muted} width={2} />
      <Ln x1={X0} y1={Y0 - 8} x2={X0} y2={Y1} color={C.muted} width={2} />
      {([[0.01, '0.01 s'], [1, '1 s'], [100, '100 s']] as [number, string][]).map(([s, l]) => (
        <g key={l}>
          <Ln x1={tx(s)} y1={Y0 - 8} x2={tx(s)} y2={Y1} color={C.fill2} width={1} dash="3 5" />
          <T x={tx(s)} y={Y1 + 16} anchor="middle" size={12.5} color={C.muted}>{l}</T>
        </g>
      ))}
      {([[1e3, '1 kHz'], [1e4, '10 kHz'], [1e5, '100 kHz'], [1e6, '1 MHz'], [1e7, '10 MHz']] as [number, string][]).map(([f, l]) => (
        <g key={l}>
          <Ln x1={X0} y1={by(f)} x2={X1} y2={by(f)} color={C.fill2} width={1} dash="3 5" />
          <T x={X0 - 8} y={by(f)} anchor="end" size={12.5} color={C.muted}>{l}</T>
        </g>
      ))}
      <T x={14} y={14} size={13} bold color={C.muted}>Bandwidth ↑</T>
      <T x={X1} y={Y1 + 38} size={13} bold color={C.muted} anchor="end">Time to send one picture →</T>
      <Ln x1={tx(100)} y1={by(2400)} x2={tx(1 / 30)} y2={by(6e6)} color={C.resist} width={2.5} dash="7 5" />
      <T x={tx(1.2)} y={by(2e4) + 20} size={13} bold color={C.resist} anchor="middle">same detail: faster = wider</T>
      {pts.map((p) => (
        <g key={p.name}>
          <circle cx={tx(p.s)} cy={by(p.hz)} r={9} fill={p.c} stroke={C.bg} strokeWidth={2} />
          <T x={tx(p.s) + p.dx} y={by(p.hz) + p.dy} size={14} bold color={p.c} anchor={p.anchor}>{p.name}</T>
          <T x={tx(p.s) + p.dx} y={by(p.hz) + p.dy + 18} size={12.5} color={C.muted} anchor={p.anchor}>{p.sub}</T>
        </g>
      ))}
    </Diagram>
  )
}
