import { C, Diagram, Ln, T, TAU } from '../kit'

/** Three ways to carry bits: FSK changes frequency, QPSK changes phase. FT8 is 8-tone FSK. */
export function G8A_DigitalMod() {
  const x0 = 150, x1 = 470, M = 400
  const path = (f: (u: number) => number, cy: number, amp: number) =>
    Array.from({ length: M + 1 }, (_, i) => `${i ? 'L' : 'M'}${(x0 + ((x1 - x0) * i) / M).toFixed(1)},${(cy - amp * f(i / M)).toFixed(1)}`).join('')
  // Row 1: FSK, 8 bits, two frequencies
  const bits = [1, 0, 1, 1, 0, 0, 1, 0]
  let ph = 0
  const fsk: string[] = []
  for (let i = 0; i <= M; i++) {
    const u = i / M, b = bits[Math.min(7, Math.floor(u * 8))]
    ph += TAU * (b ? 14 : 8) * (1 / M)
    fsk.push(`${i ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(78 - 20 * Math.sin(ph)).toFixed(1)}`)
  }
  // Row 2: 8-tone FSK, step levels
  const tones = [3, 6, 0, 5, 2, 7, 1, 4]
  const ty = (t: number) => 156 + 30 - t * 8.5
  const steps = tones.map((t, i) => `${i ? 'L' : 'M'}${x0 + (i * (x1 - x0)) / 8},${ty(t)} L${x0 + ((i + 1) * (x1 - x0)) / 8},${ty(t)}`).join(' ')
  // Row 3: QPSK, phase jumps every symbol
  const phases = [0, 90, 270, 180, 90, 0, 180, 270]
  const qpsk = path((u) => Math.sin(TAU * 20 * u + (phases[Math.min(7, Math.floor(u * 8))] * Math.PI) / 180), 262, 20)
  const row = (y: number, name: string, sub: string, col: string) => (
    <g>
      <T x={14} y={y - 10} size={15} bold color={col}>{name}</T>
      <T x={14} y={y + 10} size={12.5} color={C.muted}>{sub}</T>
    </g>
  )
  const qc = { x: 560, y: 262, r: 34 }
  return (
    <Diagram w={640} h={330} title="Digital modulation sketches. FSK switches between two frequencies. FT8 uses 8-tone FSK: eight different frequencies. QPSK shifts the phase by 0, 90, 180 or 270 degrees, so each phase carries a pair of bits"
      caption="FSK: the bit picks the frequency. PSK: the bits pick the phase. QPSK packs two bits per phase.">
      {row(78, 'FSK', 'two frequencies', C.signal)}
      <path d={fsk.join('')} fill="none" stroke={C.signal} strokeWidth={2} strokeLinejoin="round" />
      {bits.map((b, i) => <T key={i} x={x0 + ((i + 0.5) * (x1 - x0)) / 8} y={34} anchor="middle" size={13} mono color={C.muted}>{b}</T>)}
      <T x={x1 + 14} y={78} size={13} color={C.muted}>bit 1 high, 0 low</T>
      {row(160, 'FT8', '8-tone FSK', C.resist)}
      {Array.from({ length: 8 }, (_, t) => <Ln key={t} x1={x0} y1={ty(t)} x2={x1} y2={ty(t)} color={C.fill2} width={1.5} />)}
      <path d={steps} fill="none" stroke={C.resist} strokeWidth={3} strokeLinejoin="round" />
      <T x={x1 + 14} y={160} size={13} color={C.muted}>8 tones</T>
      {row(262, 'QPSK', 'phase jumps', C.power)}
      <path d={qpsk} fill="none" stroke={C.power} strokeWidth={2} strokeLinejoin="round" />
      {phases.map((p, i) => <T key={i} x={x0 + ((i + 0.5) * (x1 - x0)) / 8} y={308} anchor="middle" size={12} color={C.muted}>{p}°</T>)}
      <circle cx={qc.x} cy={qc.y} r={qc.r} fill="none" stroke={C.fill2} strokeWidth={2} />
      {[0, 90, 180, 270].map((p) => {
        const a = (p * Math.PI) / 180
        return <circle key={p} cx={qc.x + qc.r * Math.cos(a)} cy={qc.y - qc.r * Math.sin(a)} r={5.5} fill={C.power} />
      })}
      <T x={qc.x} y={qc.y} anchor="middle" size={12} color={C.muted}>phase</T>
      <T x={qc.x} y={qc.y - qc.r - 18} anchor="middle" size={12} bold color={C.power}>4 phases</T>
    </Diagram>
  )
}
