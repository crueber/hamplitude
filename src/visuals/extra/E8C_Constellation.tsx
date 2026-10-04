import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, clamp } from '../kit'

type Mode = 'bpsk' | 'qpsk' | 'qam16'
const GRAY2 = ['10', '11', '01', '00'] // Gray order across -3, -1, +1, +3

interface Pt { x: number; y: number; bits: string }
const POINTS: Record<Mode, Pt[]> = {
  bpsk: [{ x: -90, y: 0, bits: '1' }, { x: 90, y: 0, bits: '0' }],
  qpsk: [
    { x: 64, y: 64, bits: '00' }, { x: -64, y: 64, bits: '01' },
    { x: -64, y: -64, bits: '11' }, { x: 64, y: -64, bits: '10' },
  ],
  qam16: [-3, -1, 1, 3].flatMap((i, a) => [3, 1, -1, -3].map((q, b) => ({ x: i * 30, y: q * 30, bits: GRAY2[a] + GRAY2[b] }))),
}

let seed = 11
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return (seed + 1) / 4294967297 }
const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd())
const NOISE = Array.from({ length: 16 * 14 }, () => [gauss(), gauss()] as const)

/** Constellation diagram: each point is one allowed symbol (phase and amplitude). Noise smears the received dots. */
export function Constellation() {
  const [mode, setMode] = useState<Mode>('qpsk')
  const [noise, setNoise] = useState(0.35)
  const pts = POINTS[mode]
  const cx = 190, cy = 160
  const sigma = noise * 30
  let wrong = 0, total = 0
  const dots = pts.flatMap((p, pi) =>
    Array.from({ length: 14 }, (_, k) => {
      const [nx, ny] = NOISE[pi * 14 + k]
      const x = clamp(p.x + nx * sigma, -142, 142), y = clamp(p.y + ny * sigma, -132, 132)
      let best = 0, bd = Infinity
      pts.forEach((q, qi) => { const d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; best = qi } })
      const bad = best !== pi
      total++; if (bad) wrong++
      return { x, y, bad, key: `${pi}-${k}` }
    }),
  )
  const pct = Math.round((wrong / total) * 100)
  const bps = mode === 'bpsk' ? 1 : mode === 'qpsk' ? 2 : 4
  return (
    <>
      <Diagram w={640} h={330} title={`Constellation diagram of ${mode === 'bpsk' ? 'BPSK' : mode === 'qpsk' ? 'QPSK' : '16-QAM'}: ${pts.length} allowed symbols, each carrying ${bps} bits. Noise scatters the received dots; dots that land nearest a wrong point are misread (${pct} percent here).`}
        caption="Each point is one allowed symbol: a phase and an amplitude. Noise smears the dots.">
        <rect x={40} y={20} width={300} height={280} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={44} y1={cy} x2={336} y2={cy} color={C.muted} width={1.5} arrow />
        <Ln x1={cx} y1={296} x2={cx} y2={24} color={C.muted} width={1.5} arrow />
        <T x={332} y={cy + 14} anchor="end" size={12} color={C.muted}>I</T>
        <T x={cx + 10} y={32} size={12} color={C.muted}>Q</T>
        {dots.map((d) => <circle key={d.key} cx={cx + d.x} cy={cy - d.y} r={3} fill={d.bad ? C.bad : C.signal} opacity={0.75} />)}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={cx + p.x} cy={cy - p.y} r={6} fill="none" stroke={C.ink} strokeWidth={2} />
            <T x={cx + p.x} y={cy - p.y - 14} anchor="middle" size={12} mono bold color={C.ink} stroke={C.fill} strokeWidth={3} paintOrder="stroke">{p.bits}</T>
          </g>
        ))}
        <T x={372} y={40} size={14} bold>Reading the diagram</T>
        <Ln x1={372} y1={66} x2={392} y2={66} color={C.ink} width={2} />
        <T x={402} y={66} size={13} color={C.muted}>ideal symbol and its bits</T>
        <circle cx={382} cy={94} r={4} fill={C.signal} />
        <T x={402} y={94} size={13} color={C.muted}>received, read correctly</T>
        <circle cx={382} cy={122} r={4} fill={C.bad} />
        <T x={402} y={122} size={13} color={C.muted}>received, misread</T>
        <T x={372} y={166} size={13} color={C.muted}>Distance from centre = amplitude</T>
        <T x={372} y={186} size={13} color={C.muted}>Angle around centre = phase</T>
        <T x={372} y={226} size={13} color={C.muted}>I and Q: two carriers, 90° apart</T>
        <T x={372} y={246} size={13} color={C.muted}>Neighbours differ by one bit (Gray)</T>
      </Diagram>
      <Controls>
        <Choice label="Modulation" value={mode} onChange={setMode} options={[{ value: 'bpsk', label: 'BPSK' }, { value: 'qpsk', label: 'QPSK' }, { value: 'qam16', label: '16-QAM' }]} />
        <Slider label="Noise" value={noise} min={0} max={1} step={0.05} onChange={setNoise} format={(v) => (v === 0 ? 'none' : `${Math.round(v * 100)}%`)} color="var(--d-bad)" />
        <Readout label="Bits per symbol" value={bps} color="var(--d-signal)" />
        <Readout label="Misread dots" value={`${pct}%`} color={pct ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
