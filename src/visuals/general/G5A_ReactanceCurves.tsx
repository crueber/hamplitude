import { useState } from 'react'
import { C, Controls, Diagram, Inductor, Capacitor, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

// Example parts: L = 10 µH, C = 100 pF. Plot 2 to 10 MHz, 0 to 800 Ω on both panels.
const L = 10e-6, CAP = 100e-12
const F0 = 2, F1 = 10, YMAX = 800
const xl = (fMHz: number) => TAU * fMHz * 1e6 * L
const xc = (fMHz: number) => 1 / (TAU * fMHz * 1e6 * CAP)

/** Reactance depends on frequency: inductive reactance rises, capacitive reactance falls. */
export function G5A_ReactanceCurves() {
  const [f, setF] = useState(4)
  const pw = 240, ph = 150, py = 78
  const panel = (px: number, fn: (f: number) => number, color: string, title: string, formula: string, up: boolean) => {
    const X = (v: number) => px + ((v - F0) / (F1 - F0)) * pw
    const Y = (v: number) => py + ph - (Math.min(v, YMAX) / YMAX) * ph
    const pts = Array.from({ length: 81 }, (_, i) => {
      const ff = F0 + ((F1 - F0) * i) / 80
      return `${i ? 'L' : 'M'}${X(ff).toFixed(1)},${Y(fn(ff)).toFixed(1)}`
    }).join('')
    const mx = X(f), my = Y(fn(f))
    return (
      <g>
        <T x={px + pw / 2} y={24} anchor="middle" bold size={15} color={color}>{title}</T>
        <T x={px + pw / 2} y={46} anchor="middle" size={13} color={C.muted} mono>{formula}</T>
        <rect x={px} y={py} width={pw} height={ph} fill={C.fill} rx={4} />
        <Ln x1={px} y1={py + ph} x2={px + pw} y2={py + ph} color={C.muted} width={1.5} />
        <Ln x1={px} y1={py} x2={px} y2={py + ph} color={C.muted} width={1.5} />
        {[2, 6, 10].map((v) => <T key={v} x={X(v)} y={py + ph + 16} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        <T x={px + pw / 2} y={py + ph + 34} anchor="middle" size={12} color={C.muted}>frequency (MHz)</T>
        {[0, 400, 800].map((v) => <T key={v} x={px - 6} y={Y(v)} anchor="end" size={12} color={C.muted}>{v}</T>)}
        <path d={pts} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" />
        <Ln x1={mx} y1={py + ph} x2={mx} y2={my} color={color} width={1.5} dash="4 4" />
        <circle cx={mx} cy={my} r={7} fill={color} stroke={C.bg} strokeWidth={3} />
        <T x={px + (up ? 12 : pw - 12)} y={py + 14} anchor={up ? 'start' : 'end'} bold size={13} color={color}>{up ? 'rises with frequency' : 'falls with frequency'}</T>
      </g>
    )
  }
  return (
    <>
      <Diagram w={640} h={278}
        title={`At ${fmt(f)} MHz a 10 microhenry inductor has ${fmt(xl(f), 3)} ohms of reactance and a 100 picofarad capacitor has ${fmt(xc(f), 3)} ohms. Inductive reactance rises with frequency; capacitive reactance falls.`}
        caption="Same AC, higher frequency: the inductor opposes more, the capacitor opposes less.">
        {panel(50, xl, C.current, 'Inductor, XL', 'XL = 2π × f × L', true)}
        {panel(350, xc, C.voltage, 'Capacitor, XC', 'XC = 1 ÷ (2π × f × C)', false)}
        <g transform="translate(88,24)"><Inductor x={0} y={0} len={34} color={C.current} /></g>
        <g transform="translate(386,24)"><Capacitor x={0} y={0} len={34} color={C.voltage} /></g>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={f} min={F0} max={F1} step={0.1} onChange={setF} format={(v) => `${fmt(v)} MHz`} color="var(--d-signal)" />
        <Readout label="Inductive reactance XL (10 µH)" value={fmt(xl(f))} unit="Ω" color="var(--d-current)" />
        <Readout label="Capacitive reactance XC (100 pF)" value={fmt(xc(f))} unit="Ω" color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
