import { C, Diagram, Ln, T, TAU } from '../kit'

const BITS = [1, 0, 1, 1, 0, 0, 1, 0]

/** The same bits sent by shifting amplitude (ASK/OOK), frequency (FSK) and phase (PSK). */
export function DigitalModulation_Keying() {
  const x0 = 160, x1 = 624, bw = (x1 - x0) / BITS.length
  const N = 40 // samples per bit
  const mk = (cy: number, f: (b: number, u: number) => number) => {
    const pts: string[] = []
    BITS.forEach((b, bi) => {
      for (let k = 0; k <= N; k++) {
        pts.push(`${bi || k ? 'L' : 'M'}${(x0 + (bi + k / N) * bw).toFixed(1)},${(cy - f(b, k / N)).toFixed(1)}`)
      }
    })
    return pts.join('')
  }
  const A = 24
  const ask = mk(150, (b, u) => (b ? A : 0) * Math.sin(TAU * 4 * u))
  // FSK: accumulate phase so the carrier stays continuous between bits
  let acc = 0
  const fskPts: string[] = []
  BITS.forEach((b, bi) => {
    const f = b ? 5 : 3
    for (let k = 0; k <= N; k++) {
      const ph = acc + (TAU * f * k) / N
      fskPts.push(`${bi || k ? 'L' : 'M'}${(x0 + (bi + k / N) * bw).toFixed(1)},${(232 - A * Math.sin(ph)).toFixed(1)}`)
    }
    acc += TAU * f
  })
  const psk = mk(314, (b, u) => A * Math.sin(TAU * 4 * u + (b ? 0 : Math.PI)))
  const rows: { y: number; name: string; sub: string; col: string; d: string }[] = [
    { y: 150, name: 'ASK / OOK', sub: 'amplitude: on or off', col: C.resist, d: ask },
    { y: 232, name: 'FSK', sub: 'frequency: two tones', col: C.signal, d: fskPts.join('') },
    { y: 314, name: 'BPSK', sub: 'phase: flip by 180°', col: C.power, d: psk },
  ]
  // data trace
  const data: string[] = []
  BITS.forEach((b, i) => {
    data.push(`${i ? 'L' : 'M'}${x0 + i * bw},${64 - b * 22}`)
    data.push(`L${x0 + (i + 1) * bw},${64 - b * 22}`)
  })
  return (
    <Diagram w={640} h={364}
      title="The same eight bits, 1 0 1 1 0 0 1 0, sent three ways: amplitude shift keying switches the carrier on and off, frequency shift keying switches between two tones, and binary phase shift keying flips the carrier's phase by 180 degrees."
      caption="Same data, three ways to impose it on the carrier. PSK flips at the wave's zero crossing.">
      {BITS.map((_, i) => (
        <g key={i}>
          <Ln x1={x0 + i * bw} y1={26} x2={x0 + i * bw} y2={344} color={C.fill2} width={1} dash="2 5" />
          <T x={x0 + (i + 0.5) * bw} y={14} anchor="middle" size={13} bold mono color={C.ink}>{BITS[i]}</T>
        </g>
      ))}
      <Ln x1={x1} y1={26} x2={x1} y2={344} color={C.fill2} width={1} dash="2 5" />
      <T x={14} y={50} size={14} bold color={C.ink}>Data</T>
      <T x={14} y={68} size={12.5} color={C.muted}>the bits</T>
      <path d={data.join('')} fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      {rows.map((r) => (
        <g key={r.name}>
          <T x={14} y={r.y - 8} size={14} bold color={r.col}>{r.name}</T>
          <T x={14} y={r.y + 12} size={12.5} color={C.muted}>{r.sub}</T>
          <path d={r.d} fill="none" stroke={r.col} strokeWidth={2} strokeLinejoin="round" />
        </g>
      ))}
    </Diagram>
  )
}
