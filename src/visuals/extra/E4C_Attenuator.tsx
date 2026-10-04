import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

// Example levels in dB relative to the external (atmospheric) noise at the antenna.
const STRONG = 50, WANTED = 20, EXT = 0, INT = -20, CEIL = 35
/** On low HF bands, atmospheric noise is far above receiver noise, so an attenuator cuts overload without hurting S/N. */
export function Attenuator() {
  const [a, setA] = useState(15)
  const noise = 10 * Math.log10(10 ** ((EXT - a) / 10) + 10 ** (INT / 10))
  const snr = WANTED - a - noise
  const snr0 = WANTED - 10 * Math.log10(1 + 10 ** (INT / 10))
  const loss = snr0 - snr
  const lo = -40, hi = 56, y0 = 196, y1 = 22
  const Y = (d: number) => y0 - ((d - lo) / (hi - lo)) * (y0 - y1)
  const bar = (x: number, v: number, col: string, label: string, sub?: string) => (
    <g>
      <rect x={x} y={Y(Math.max(v, lo))} width={78} height={Math.max(0, y0 - Y(Math.max(v, lo)))} fill={col} opacity={0.9} rx={3} />
      <T x={x + 39} y={y0 + 14} anchor="middle" size={12} bold color={C.ink}>{label}</T>
      {sub && <T x={x + 39} y={y0 + 30} anchor="middle" size={12} color={C.muted}>{sub}</T>}
    </g>
  )
  const over = STRONG - a > CEIL
  return (
    <>
      <Diagram w={640} h={262} title={`With ${a} dB of attenuation, a strong signal is ${over ? 'still above' : 'brought below'} the receiver's overload level. Atmospheric noise falls with the signal and stays above the receiver's own noise, so the signal-to-noise ratio changes by only ${loss.toFixed(1)} dB.`}
        caption="Example levels in dB. The attenuator cuts signal and atmospheric noise together; the receiver's own noise is the only thing left behind.">
        <Ln x1={30} y1={Y(CEIL)} x2={420} y2={Y(CEIL)} color={C.bad} width={2.5} dash="7 5" />
        <T x={30} y={Y(CEIL) - 12} size={12} bold color={C.bad}>overload level</T>
        {bar(40, STRONG - a, over ? C.bad : C.resist, 'strong', 'station')}
        {bar(140, WANTED - a, C.signal, 'wanted', 'signal')}
        {bar(240, EXT - a, C.muted, 'atmospheric', 'noise')}
        {bar(340, INT, C.power, 'receiver', 'own noise')}
        <Ln x1={30} y1={y0} x2={430} y2={y0} color={C.ink} width={2} />
        <rect x={454} y={22} width={172} height={150} rx={12} fill={C.fill} />
        <T x={540} y={46} anchor="middle" size={13} color={C.muted}>signal-to-noise</T>
        <T x={540} y={80} anchor="middle" bold size={28} mono color={loss < 2 ? C.good : C.bad}>{snr.toFixed(1)} dB</T>
        <T x={540} y={112} anchor="middle" size={13} color={C.muted}>change from no attenuator</T>
        <T x={540} y={138} anchor="middle" bold size={18} mono color={loss < 2 ? C.good : C.bad}>{loss < 0.05 ? '0.0' : `−${loss.toFixed(1)}`} dB</T>
        <T x={540} y={196} anchor="middle" size={13} bold color={over ? C.bad : C.good}>{over ? 'still overloading' : 'overload gone'}</T>
      </Diagram>
      <Controls>
        <Slider label="Input attenuation" value={a} min={0} max={30} onChange={setA} format={(v) => `${v} dB`} color="var(--d-bad)" />
        <Readout label="S/N cost" value={loss < 0.05 ? '0.0' : loss.toFixed(1)} unit=" dB" color="var(--d-good)" />
      </Controls>
    </>
  )
}
