import { useMemo, useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T } from '../kit'

const RBWS = [10000, 3000, 1000, 300, 100]
const NF = 20 // assumed noise figure, dB (illustrative)
const SPAN = 10000 // Hz displayed
const TONES = [
  { name: 'A', off: -1000, dbm: -30 },
  { name: 'B', off: 1000, dbm: -50 },
  { name: 'C', off: 3500, dbm: -122 },
]
const fmtHz = (h: number) => (h >= 1000 ? `${h / 1000} kHz` : `${h} Hz`)

/** Resolution bandwidth: a narrower filter separates close signals and lowers the noise floor, but the sweep takes much longer. */
export function SpectrumAnalyzers_Rbw() {
  const [rbw, setRbw] = useState(3000)
  const x0 = 64, x1 = 616, yTop = 26, yBot = 236
  const dbTop = -20, dbBot = -140
  const Y = (db: number) => yTop + ((dbTop - db) / (dbTop - dbBot)) * (yBot - yTop)
  const X = (f: number) => x0 + ((f + SPAN / 2) / SPAN) * (x1 - x0)
  const floor = -174 + 10 * Math.log10(rbw) + NF
  const ripple = useMemo(() => {
    let s = 7
    return Array.from({ length: 561 }, () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5) * 3)
  }, [])
  const pts: string[] = []
  for (let i = 0; i <= 560; i++) {
    const f = -SPAN / 2 + (SPAN * i) / 560
    let p = 10 ** ((floor + ripple[i]) / 10)
    for (const t of TONES) p += 10 ** ((t.dbm - 3.01 * ((2 * (f - t.off)) / rbw) ** 2) / 10)
    const y = Y(10 * Math.log10(p))
    pts.push(`${i ? 'L' : 'M'}${(x0 + ((x1 - x0) * i) / 560).toFixed(1)},${y.toFixed(1)}`)
  }
  const rel = (SPAN / rbw) ** 2 // sweep time relative to RBW = span
  const seeC = TONES[2].dbm - floor > 3
  const sepAB = 2000 / rbw // separation in RBW widths
  return (
    <>
      <Diagram w={640} h={306}
        title={`Spectrum analyzer display at ${fmtHz(rbw)} resolution bandwidth. Noise floor about ${floor.toFixed(0)} dBm. Tones A and B are ${sepAB >= 1.3 ? 'separate' : 'merged'}; weak tone C is ${seeC ? 'visible' : 'hidden in the noise'}.`}
        caption="Illustrative: three tones 2 kHz apart and a very weak one. Narrower RBW separates A from B and lowers the floor, revealing C.">
        {[-20, -40, -60, -80, -100, -120, -140].map((d) => (
          <g key={d}>
            <Ln x1={x0} y1={Y(d)} x2={x1} y2={Y(d)} color={C.fill2} width={1} />
            <T x={x0 - 6} y={Y(d)} anchor="end" size={12} color={C.muted}>{d}</T>
          </g>
        ))}
        <T x={14} y={12} size={12} color={C.muted}>dBm</T>
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.2} strokeLinejoin="round" />
        <Ln x1={x0} y1={Y(floor)} x2={x1} y2={Y(floor)} color={C.bad} width={1.5} dash="5 4" />
        {TONES.map((t) => (
          <g key={t.name}>
            <Ln x1={X(t.off)} y1={yBot} x2={X(t.off)} y2={yBot + 6} color={C.ink} width={2} />
            <T x={X(t.off)} y={yBot + 16} anchor="middle" size={13} bold color={C.ink}>{t.name}</T>
          </g>
        ))}
        <T x={x0 + 6} y={Y(floor) - 10} anchor="start" size={12} bold color={C.bad}>noise floor</T>
        <T x={X(0)} y={268} anchor="middle" size={12.5} color={C.muted}>centre frequency</T>
        <T x={x0} y={268} size={12.5} color={C.muted}>span 10 kHz →</T>
        <T x={x1} y={268} anchor="end" size={12.5} color={C.muted}>tones A, B, C at −1, +1, +3.5 kHz</T>
        <T x={320} y={292} anchor="middle" size={13} bold>{`RBW ${fmtHz(rbw)}: floor ${floor.toFixed(0)} dBm, A and B ${sepAB >= 1.3 ? 'resolved' : 'merged'}, C ${seeC ? 'visible' : 'hidden'}`}</T>
      </Diagram>
      <Controls>
        <Choice label="Resolution bandwidth" value={rbw} onChange={setRbw} options={RBWS.map((r) => ({ value: r, label: fmtHz(r) }))} />
        <Readout label="Noise floor" value={floor.toFixed(0)} unit=" dBm" color="var(--d-bad)" />
        <Readout label="Sweep time (relative)" value={`×${rel < 10 ? rel.toFixed(1) : Math.round(rel)}`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
