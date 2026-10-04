import { C, Diagram, T } from '../kit'

const N = 82, X0 = 24, PW = 592, CW = PW / N
const TOP = 46, BASE = 150, WF0 = 160, ROWS = 10, RH = 10

const hash = (a: number, b: number) => {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return v - Math.floor(v)
}

// kind: ssb = wide flat-topped, cw = narrow keyed, car = narrow steady
const SIGS = [
  { c: 14, hw: 3, amp: 0.5, on: (r: number) => r < 6, label: 'SSB' },
  { c: 36, hw: 3, amp: 0.7, on: (r: number) => r !== 4 && r !== 8, label: 'SSB' },
  { c: 53, hw: 0.6, amp: 0.55, on: (r: number) => r % 3 !== 2, label: 'CW' },
  { c: 70, hw: 0.8, amp: 0.95, on: () => true, label: 'strong' },
]
const TUNED = SIGS[1]

const level = (col: number, row: number) => {
  let v = 0.06 + 0.07 * hash(col, row)
  for (const s of SIGS) {
    if (!s.on(row)) continue
    const d = Math.abs(col - s.c)
    if (d <= s.hw) v += s.amp * (0.75 + 0.25 * hash(col + 3, row))
    else if (d <= s.hw + 1) v += s.amp * 0.18
  }
  return Math.min(v, 1)
}

/** A panadapter: a spectrum trace and waterfall of a whole slice of the band at once. */
export function SdrTransceivers_Panadapter() {
  const tr = Array.from({ length: N }, (_, i) => `${X0 + (i + 0.5) * CW},${BASE - level(i, 0) * (BASE - TOP)}`).join(' ')
  const tx = X0 + (TUNED.c - TUNED.hw - 0.5) * CW, tw = (TUNED.hw * 2 + 1) * CW
  return (
    <Diagram w={640} h={316} title="A panadapter display: a spectrum trace above a scrolling waterfall showing several signals across a slice of a band at once, with the receive filter highlighted on one of them"
      caption="Illustrative. Every signal in the slice is visible at once; the receive filter (amber) picks the one you listen to.">
      <T x={X0} y={16} bold size={13} color={C.muted}>Spectrum: strength against frequency</T>
      {SIGS.map(s => (
        <T key={s.c} x={X0+ (s.c + 0.5) * CW} y={34} anchor="middle" size={12} color={C.muted}>{s.label}</T>
      ))}
      <rect x={X0} y={TOP} width={PW} height={BASE - TOP} fill={C.fill} stroke={C.muted} strokeWidth={1} />
      <polyline points={tr} fill="none" stroke={C.signal} strokeWidth={2} strokeLinejoin="round" />
      <rect x={X0} y={WF0} width={PW} height={ROWS * RH} fill={C.fill} stroke={C.muted} strokeWidth={1} />
      {Array.from({ length: ROWS }).map((_, r) =>
        Array.from({ length: N }).map((__, c) => (
          <rect key={`${r}-${c}`} x={X0 + c * CW} y={WF0 + r * RH} width={CW + 0.3} height={RH + 0.3} fill={C.signal} opacity={Math.min(1, level(c, r) * 1.05)} />
        )),
      )}
      <rect x={tx} y={TOP} width={tw} height={WF0 + ROWS * RH - TOP} fill={C.resist} opacity={0.2} />
      <rect x={tx} y={TOP} width={tw} height={WF0 + ROWS * RH - TOP} fill="none" stroke={C.resist} strokeWidth={2} />
      <T x={X0} y={WF0 + ROWS * RH + 18} size={13} color={C.muted}>Waterfall: newest at top, older scrolls down</T>
      <T x={X0 + PW} y={WF0 + ROWS * RH + 18} size={13} anchor="end" color={C.muted}>frequency →</T>
      <T x={tx + tw / 2} y={WF0 + ROWS * RH + 44} anchor="middle" size={13} bold color={C.resist}>receive filter: what you hear</T>
    </Diagram>
  )
}
