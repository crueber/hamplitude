import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt, si } from '../kit'

const LS = [1, 10, 100] // µH
const CS = [10, 100, 1000] // pF

/** Reactance against frequency on log axes: XL rises as a straight line, XC falls, and they cross at resonance. */
export function ReactanceAndImpedance_Explorer() {
  const [e, setE] = useState(0.85) // log10 of frequency in MHz
  const [li, setLi] = useState(1)
  const [ci, setCi] = useState(1)
  const L = LS[li] * 1e-6, Cap = CS[ci] * 1e-12
  const f = 10 ** e * 1e6
  const xl = TAU * f * L, xc = 1 / (TAU * f * Cap)
  const f0 = 1 / (TAU * Math.sqrt(L * Cap))
  const PX = 64, PW = 540, PT = 44, PH = 220, PB = PT + PH
  const xf = (fHz: number) => PX + ((Math.log10(fHz / 1e6) + 1) / 3) * PW
  const yx = (x: number) => PB - (Math.log10(Math.max(x, 1)) / 4) * PH
  const line = (fn: (f: number) => number) => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const fi = 1e5 * 10 ** ((3 * i) / 120)
      const x = fn(fi)
      if (x >= 1 && x <= 1e4) pts.push(`${xf(fi).toFixed(1)},${yx(x).toFixed(1)}`)
    }
    return pts.join(' ')
  }
  const net = xl - xc
  const f0In = f0 >= 1e5 && f0 <= 1e8
  const mx = xf(f)
  return (
    <>
      <Diagram w={640} h={334}
        title={`Reactance of a ${LS[li]} microhenry inductor and a ${CS[ci]} picofarad capacitor from 0.1 to 100 megahertz. At ${si(f, 'Hz')}: inductive reactance ${fmt(xl)} ohms, capacitive reactance ${fmt(xc)} ohms.`}
        caption="Log axes. Inductive reactance climbs with frequency, capacitive reactance falls, and where they cross the two cancel.">
        {[0, 1, 2, 3, 4].map((d) => (
          <g key={d}>
            <Ln x1={PX} y1={yx(10 ** d)} x2={PX + PW} y2={yx(10 ** d)} color={C.fill2} width={1} />
            <T x={PX - 8} y={yx(10 ** d)} anchor="end" size={12} color={C.muted}>{d === 0 ? '1' : d === 1 ? '10' : d === 2 ? '100' : d === 3 ? '1k' : '10k'}</T>
          </g>
        ))}
        {[0.1, 1, 10, 100].map((m) => (
          <g key={m}>
            <Ln x1={xf(m * 1e6)} y1={PT} x2={xf(m * 1e6)} y2={PB} color={C.fill2} width={1} />
            <T x={xf(m * 1e6)} y={PB + 16} anchor="middle" size={12} color={C.muted}>{m} MHz</T>
          </g>
        ))}
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} width={1.5} />
        <T x={PX - 40} y={16} size={12} color={C.muted}>reactance (Ω)</T>
        <polyline points={line((ff) => TAU * ff * L)} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
        <polyline points={line((ff) => 1 / (TAU * ff * Cap))} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
        {f0In && (
          <g>
            <Ln x1={xf(f0)} y1={PT} x2={xf(f0)} y2={PB} color={C.power} width={1.5} dash="5 4" />
            <T x={xf(f0)} y={PB + 36} anchor="middle" size={12} bold color={C.power}>resonance {si(f0, 'Hz', 3)}</T>
          </g>
        )}
        <Ln x1={mx} y1={PT} x2={mx} y2={PB} color={C.ink} width={1.5} />
        {xl >= 1 && xl <= 1e4 && <circle cx={mx} cy={yx(xl)} r={6} fill={C.current} stroke={C.bg} strokeWidth={2.5} />}
        {xc >= 1 && xc <= 1e4 && <circle cx={mx} cy={yx(xc)} r={6} fill={C.voltage} stroke={C.bg} strokeWidth={2.5} />}
        <T x={PX + 120} y={16} size={13} bold color={C.current}>XL = 2πfL, rises</T>
        <T x={PX + 300} y={16} size={13} bold color={C.voltage}>XC = 1 ÷ 2πfC, falls</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={e} min={-1} max={2} step={0.01} onChange={setE} format={() => si(f, 'Hz', 3)} color="var(--d-signal)" />
        <Choice label="Inductor" value={li} onChange={setLi} options={LS.map((v, i) => ({ value: i, label: `${v} µH` }))} />
        <Choice label="Capacitor" value={ci} onChange={setCi} options={CS.map((v, i) => ({ value: i, label: `${v} pF` }))} />
        <Readout label="Inductive reactance XL" value={fmt(xl, 3)} unit=" Ω" color="var(--d-current)" />
        <Readout label="Capacitive reactance XC" value={fmt(xc, 3)} unit=" Ω" color="var(--d-voltage)" />
        <Readout label="Series total X = XL − XC" value={`${net >= 0 ? '+' : '−'}${fmt(Math.abs(net), 3)}`} unit={net >= 0 ? ' Ω (inductive)' : ' Ω (capacitive)'} color="var(--d-power)" />
      </Controls>
    </>
  )
}
