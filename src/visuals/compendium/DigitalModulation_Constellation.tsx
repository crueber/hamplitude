import { useMemo, useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

type Mode = 'bpsk' | 'qpsk' | 'psk8' | 'qam16' | 'qam64'
const NAMES: Record<Mode, string> = { bpsk: 'BPSK', qpsk: 'QPSK', psk8: '8-PSK', qam16: '16-QAM', qam64: '64-QAM' }
const BITS: Record<Mode, number> = { bpsk: 1, qpsk: 2, psk8: 3, qam16: 4, qam64: 6 }

/** Constellation points normalised to unit average power. */
function points(mode: Mode): { x: number; y: number }[] {
  if (mode === 'bpsk') return [{ x: 1, y: 0 }, { x: -1, y: 0 }]
  if (mode === 'qpsk' || mode === 'psk8') {
    const n = mode === 'qpsk' ? 4 : 8
    const off = mode === 'qpsk' ? Math.PI / 4 : 0
    return Array.from({ length: n }, (_, k) => ({ x: Math.cos(off + (TAU * k) / n), y: Math.sin(off + (TAU * k) / n) }))
  }
  const side = mode === 'qam16' ? 4 : 8
  const lv = Array.from({ length: side }, (_, i) => 2 * i - (side - 1))
  const raw = lv.flatMap((a) => lv.map((b) => ({ x: a, y: b })))
  const avg = raw.reduce((s, p) => s + p.x * p.x + p.y * p.y, 0) / raw.length
  const k = 1 / Math.sqrt(avg)
  return raw.map((p) => ({ x: p.x * k, y: p.y * k }))
}

// Fixed pseudo-random noise so the picture is stable while the slider moves.
let seed = 7
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return (seed + 1) / 4294967297 }
const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(TAU * rnd())
const NS = 4000
const NOISE = Array.from({ length: NS }, () => ({ u: rnd(), nx: gauss(), ny: gauss() }))

/** Constellation diagram with adjustable noise: more bits per symbol means points closer together. */
export function DigitalModulation_Constellation() {
  const [mode, setMode] = useState<Mode>('qpsk')
  const [snr, setSnr] = useState(16)
  const pts = useMemo(() => points(mode), [mode])
  const sigma = Math.sqrt(1 / (2 * 10 ** (snr / 10))) // per-axis noise for unit symbol energy
  const { dots, wrongPct } = useMemo(() => {
    let wrong = 0
    const out = NOISE.map(({ u, nx, ny }, i) => {
      const si = Math.min(pts.length - 1, Math.floor(u * pts.length))
      const x = pts[si].x + nx * sigma, y = pts[si].y + ny * sigma
      let best = 0, bd = Infinity
      pts.forEach((q, qi) => { const d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; best = qi } })
      const bad = best !== si
      if (bad) wrong++
      return { x, y, bad, i }
    })
    return { dots: out.slice(0, 500), wrongPct: (wrong / NS) * 100 }
  }, [pts, sigma])
  const R = 86, cx = 170, cy = 160, lim = 140
  const bps = BITS[mode]
  const gray2 = mode === 'qpsk' ? ['00', '01', '11', '10'] : null
  return (
    <>
      <Diagram w={640} h={320}
        title={`${NAMES[mode]} constellation: ${pts.length} allowed symbols, ${bps} bits each, at ${snr} dB signal to noise. About ${fmt(wrongPct, 2)} percent of symbols are misread.`}
        caption="Each cluster is one allowed symbol. Red dots landed nearer a wrong point and would be misread.">
        <rect x={20} y={10} width={300} height={300} rx={8} fill={C.fill} />
        <Ln x1={26} y1={cy} x2={314} y2={cy} color={C.muted} width={1.2} />
        <Ln x1={cx} y1={304} x2={cx} y2={16} color={C.muted} width={1.2} />
        <T x={308} y={cy + 13} anchor="end" size={12} color={C.muted}>I</T>
        <T x={cx + 9} y={24} size={12} color={C.muted}>Q</T>
        {dots.map((d) => {
          const px = cx + Math.max(-lim, Math.min(lim, d.x * R)), py = cy - Math.max(-lim, Math.min(lim, d.y * R))
          return <circle key={d.i} cx={px} cy={py} r={2.2} fill={d.bad ? C.bad : C.signal} opacity={0.7} />
        })}
        {pts.map((p, i) => (
          <circle key={i} cx={cx + p.x * R} cy={cy - p.y * R} r={5.5} fill="none" stroke={C.ink} strokeWidth={2} />
        ))}
        {gray2 && pts.map((p, i) => (
          <T key={i} x={cx + p.x * R + (p.x > 0 ? 30 : -30)} y={cy - p.y * R + (p.y > 0 ? -32 : 32)} anchor="middle" size={12.5} mono bold color={C.ink} stroke={C.fill} strokeWidth={3} paintOrder="stroke">{gray2[i]}</T>
        ))}
        {mode === 'bpsk' && (
          <>
            <T x={cx + R} y={cy - 34} anchor="middle" size={12.5} mono bold color={C.ink}>1</T>
            <T x={cx - R} y={cy - 34} anchor="middle" size={12.5} mono bold color={C.ink}>0</T>
          </>
        )}
        <T x={350} y={34} size={15} bold color={C.ink}>{NAMES[mode]}</T>
        <T x={350} y={58} size={13.5} color={C.ink}>{pts.length} points = {bps} bit{bps > 1 ? 's' : ''} per symbol</T>
        <T x={350} y={90} size={13} color={C.muted}>I: the in-phase part of the carrier</T>
        <T x={350} y={110} size={13} color={C.muted}>Q: the part shifted by 90°</T>
        <T x={350} y={132} size={13} color={C.muted}>A point = one amplitude and phase</T>
        <circle cx={358} cy={170} r={4} fill={C.signal} />
        <T x={372} y={170} size={13} color={C.ink}>read correctly</T>
        <circle cx={358} cy={192} r={4} fill={C.bad} />
        <T x={372} y={192} size={13} color={C.ink}>misread: nearer a wrong point</T>
        <T x={350} y={226} size={13} color={C.muted}>More points per symbol:</T>
        <T x={350} y={246} size={13} color={C.muted}>more bits, but the points sit closer</T>
        <T x={350} y={266} size={13} color={C.muted}>together, so less noise is tolerated.</T>
      </Diagram>
      <Controls>
        <Choice label="Modulation" value={mode} onChange={setMode} options={(Object.keys(NAMES) as Mode[]).map((m) => ({ value: m, label: NAMES[m] }))} />
        <Slider label="Signal-to-noise ratio (per symbol)" value={snr} min={0} max={30} step={1} onChange={setSnr} format={(v) => `${v} dB`} color="var(--d-signal)" />
        <Readout label="Bits per symbol" value={bps} color="var(--d-signal)" />
        <Readout label="Symbols misread" value={fmt(wrongPct, 2)} unit="%" color="var(--d-bad)" />
      </Controls>
    </>
  )
}
