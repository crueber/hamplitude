import { Box, C, Diagram, Ln, T, TAU } from '../kit'

/** Piecewise carrier: amplitude a(u), cycles-per-span f(u) and an extra phase offset p(u), for u in 0..1. */
function wave(x0: number, x1: number, cy: number, a: (u: number) => number, f: (u: number) => number, p: (u: number) => number) {
  const N = 160
  let ph = 0
  const pts: string[] = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    ph += (TAU * f(u)) / N
    pts.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(cy - a(u) * Math.sin(ph + p(u))).toFixed(1)}`)
  }
  return pts.join('')
}

/** The modulation chain, and the three properties of a carrier that can carry information. */
export function ModulationBasics_Chain() {
  const bw = 100, gap = 30, x0 = 10, by = 92, bh = 54
  const bx = (i: number) => x0 + i * (bw + gap)
  const cards: { title: string; color: string; modes: string; wave: string }[] = [
    { title: 'Amplitude', color: C.resist, modes: 'AM · CW keying · ASK', wave: wave(0, 162, 0, (u) => (u < 0.5 ? 22 : 9), () => 8, () => 0) },
    { title: 'Frequency', color: C.signal, modes: 'FM · FSK · RTTY', wave: wave(0, 162, 0, () => 18, (u) => (u < 0.5 ? 5 : 11), () => 0) },
    { title: 'Phase', color: C.power, modes: 'PM · PSK · PSK31', wave: wave(0, 162, 0, () => 18, () => 8, (u) => (u < 0.5 ? 0 : Math.PI)) },
  ]
  const cw = 190, cg = 25, cx0 = 10, cy0 = 208, ch = 120
  return (
    <Diagram w={640} h={346} title="Modulation chain: a message and an unmodulated carrier go into a modulator; the result crosses a noisy channel and a demodulator recovers the message. A carrier has three properties that can carry information: amplitude, frequency and phase."
      caption="Whatever the mode, the modulator changes amplitude, frequency or phase, and the demodulator measures the same property.">
      <Box x={bx(1)} y={12} w={bw} h={40} label="Carrier" sub="steady RF tone" color={C.signal} />
      <Ln x1={bx(1) + bw / 2} y1={52} x2={bx(1) + bw / 2} y2={by - 2} color={C.signal} arrow />
      <Box x={bx(0)} y={by} w={bw} h={bh} label="Message" sub="voice or data" color={C.power} size={13} />
      <Box x={bx(1)} y={by} w={bw} h={bh} label="Modulator" color={C.ink} size={13} />
      <Box x={bx(2)} y={by} w={bw} h={bh} label="Channel" sub="noise, fading" color={C.muted} dash="5 4" size={13} />
      <Box x={bx(3)} y={by} w={bw} h={bh} label="Demodulator" color={C.ink} size={13} />
      <Box x={bx(4)} y={by} w={bw} h={bh} label="Message" sub="recovered" color={C.power} size={13} />
      {[0, 1, 2, 3].map((i) => (
        <Ln key={i} x1={bx(i) + bw + 2} y1={by + bh / 2} x2={bx(i + 1) - 2} y2={by + bh / 2} color={C.ink} width={2} arrow />
      ))}
      <T x={bx(1) + bw / 2} y={by + bh + 18} anchor="middle" size={12.5} color={C.muted}>puts it on</T>
      <T x={bx(3) + bw / 2} y={by + bh + 18} anchor="middle" size={12.5} color={C.muted}>takes it off</T>
      <T x={320} y={196} anchor="middle" size={14} bold color={C.ink}>Three properties of the carrier can be varied</T>
      {cards.map((c, i) => {
        const x = cx0 + i * (cw + cg)
        return (
          <g key={c.title}>
            <rect x={x} y={cy0 + 6} width={cw} height={ch - 10} rx={10} fill={C.fill} stroke={c.color} strokeWidth={2} />
            <T x={x + 14} y={cy0 + 24} size={15} bold color={c.color}>{c.title}</T>
            <g transform={`translate(${x + 14},${cy0 + 62})`}>
              <path d={c.wave} fill="none" stroke={c.color} strokeWidth={2.2} strokeLinejoin="round" />
            </g>
            <T x={x + 14} y={cy0 + 100} size={12.5} color={C.muted}>{c.modes}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
