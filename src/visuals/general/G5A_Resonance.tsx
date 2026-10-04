import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

// Series LC, ideal (no resistance): L = 10 µH, C = 100 pF.
const L = 10e-6, CAP = 100e-12
const F0 = 2, F1 = 10, YMAX = 800
const xl = (f: number) => TAU * f * 1e6 * L
const xc = (f: number) => 1 / (TAU * f * 1e6 * CAP)
const fres = 1 / (TAU * Math.sqrt(L * CAP)) / 1e6 // MHz

/** Series LC: XL rises, XC falls, they cross at resonance and cancel, so impedance dips to nearly nothing. */
export function G5A_Resonance() {
  const [f, setF] = useState(3)
  const px = 56, py = 40, pw = 560, ph = 200
  const X = (v: number) => px + ((v - F0) / (F1 - F0)) * pw
  const Y = (v: number) => py + ph - (Math.min(v, YMAX) / YMAX) * ph
  const curve = (fn: (f: number) => number) =>
    Array.from({ length: 161 }, (_, i) => {
      const ff = F0 + ((F1 - F0) * i) / 160
      return `${i ? 'L' : 'M'}${X(ff).toFixed(1)},${Y(fn(ff)).toFixed(1)}`
    }).join('')
  const z = Math.abs(xl(f) - xc(f))
  const at = Math.abs(f - fres) < 0.06
  const where = at ? 'at' : f < fres ? 'below' : 'above'
  const mx = X(f)
  return (
    <>
      <Diagram w={640} h={292}
        title={`Series LC circuit. Inductive reactance rises and capacitive reactance falls with frequency. They are equal at ${fmt(fres)} megahertz, where they cancel and the impedance is very low. At ${fmt(f)} megahertz XL is ${fmt(xl(f))} ohms, XC is ${fmt(xc(f))} ohms and impedance is ${fmt(z)} ohms.`}
        caption="Where XL and XC cross, they cancel: series impedance drops to almost nothing.">
        <rect x={px} y={py} width={pw} height={ph} fill={C.fill} rx={4} />
        <Ln x1={px} y1={py + ph} x2={px + pw} y2={py + ph} color={C.muted} width={1.5} />
        <Ln x1={px} y1={py} x2={px} y2={py + ph} color={C.muted} width={1.5} />
        {[2, 4, 6, 8, 10].map((v) => <T key={v} x={X(v)} y={py + ph + 16} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        <T x={px + pw / 2} y={py + ph + 36} anchor="middle" size={12} color={C.muted}>frequency (MHz)</T>
        {[0, 400, 800].map((v) => <T key={v} x={px - 8} y={Y(v)} anchor="end" size={12} color={C.muted}>{v}</T>)}
        <T x={px} y={14} size={12} color={C.muted}>ohms</T>
        {([[170, C.current, 'XL', '0'], [250, C.voltage, 'XC', '0'], [330, C.ink, 'Z = XL − XC (series)', '7 5']] as const).map(([lx, col, lab, d]) => (
          <g key={lab}>
            <Ln x1={lx} y1={14} x2={lx + 30} y2={14} color={col} width={3.5} dash={d === '0' ? undefined : d} />
            <T x={lx + 36} y={14} size={13} bold color={col}>{lab}</T>
          </g>
        ))}
        <path d={curve(xl)} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
        <path d={curve(xc)} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
        <path d={curve((ff) => Math.abs(xl(ff) - xc(ff)))} fill="none" stroke={C.ink} strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
        <circle cx={X(fres)} cy={Y(xl(fres))} r={7} fill={C.good} stroke={C.bg} strokeWidth={3} />
        <T x={X(fres) + 14} y={Y(xl(fres)) + 26} anchor="start" size={13} bold color={C.good}>XL = XC</T>
        <T x={X(fres) + 14} y={Y(xl(fres)) + 43} anchor="start" size={12} color={C.muted}>resonance</T>
        <Ln x1={mx} y1={py} x2={mx} y2={py + ph} color={C.signal} width={2} dash="5 4" />
        <circle cx={mx} cy={Y(z)} r={6} fill={C.ink} stroke={C.bg} strokeWidth={2.5} />
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={f} min={F0} max={F1} step={0.01} onChange={setF} format={(v) => `${fmt(v)} MHz`} color="var(--d-signal)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Jump to</span>
          <Choice label="Jump to" value={where} onChange={(v) => setF(v === 'below' ? 3 : v === 'at' ? Math.round(fres * 100) / 100 : 8)}
            options={[{ value: 'below', label: 'Below' }, { value: 'at', label: 'Resonance' }, { value: 'above', label: 'Above' }]} />
        </div>
        <Readout label="XL − XC (series Z)" value={fmt(z, 2)} unit="Ω" color={at ? 'var(--d-good)' : 'var(--d-ink)'} />
      </Controls>
    </>
  )
}
