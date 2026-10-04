import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const IIP3 = 10, FLOOR = -120
const m = (n: number) => (n < 0 ? '−' : n > 0 ? '+' : '') + Math.abs(Math.round(n * 10) / 10)
/** Two-tone input: each tone rises 1 dB per dB, the 3rd-order products 3 dB per dB. Extended, the lines meet at the intercept point. */
export function Intercept() {
  const [p, setP] = useState(-30)
  const im = 3 * p - 2 * IIP3
  const audible = im > FLOOR
  const px0 = 70, px1 = 400, py0 = 232, py1 = 18
  const xl = -130, xh = 20
  const X = (d: number) => px0 + ((d - xl) / (xh - xl)) * (px1 - px0)
  const Y = (d: number) => py0 - ((d - xl) / (xh - xl)) * (py0 - py1)
  const seg = (f: (x: number) => number) => `M${X(xl)},${Y(f(xl))} L${X(xh)},${Y(f(xh))}`
  return (
    <>
      <Diagram w={640} h={266} title={`Third-order intercept. Each tone's level rises 1 dB per dB; the third-order products rise 3 dB per dB, so the lines meet at the intercept point, ${IIP3} dBm in this example. With two tones at ${p} dBm the products are ${m(im)} dBm, ${audible ? 'above' : 'below'} the noise floor.`}
        caption="Example receiver. Both axes in dBm. The products rise three times as fast as the signals, so they climb out of the noise quickly.">
        <clipPath id="ipclip"><rect x={px0} y={py1} width={px1 - px0} height={py0 - py1} /></clipPath>
        <rect x={px0} y={py1} width={px1 - px0} height={py0 - py1} fill={C.fill} />
        <Ln x1={px0} y1={Y(FLOOR)} x2={px1} y2={Y(FLOOR)} color={C.muted} width={2} dash="5 4" />
        <T x={px1 - 6} y={Y(FLOOR) + 12} anchor="end" size={12} bold color={C.muted}>noise floor</T>
        <g clipPath="url(#ipclip)">
          <path d={seg((x) => x)} stroke={C.signal} strokeWidth={3} fill="none" />
          <path d={seg((x) => 3 * x - 2 * IIP3)} stroke={C.bad} strokeWidth={3} fill="none" />
          <Ln x1={X(p)} y1={py0} x2={X(p)} y2={Y(p)} color={C.ink} width={1.5} dash="3 3" />
        </g>
        <circle cx={X(IIP3)} cy={Y(IIP3)} r={6} fill={C.power} />
        <T x={X(IIP3) - 10} y={Y(IIP3) - 4} anchor="end" size={12} bold color={C.power}>intercept</T>
        <circle cx={X(p)} cy={Y(p)} r={5} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        {im > -130 && <circle cx={X(p)} cy={Y(im)} r={5} fill={C.bad} stroke={C.bg} strokeWidth={2} />}
        <T x={px0 + 6} y={py1 + 12} size={12} bold color={C.signal}>tones: 1 dB per dB</T>
        <T x={px0 + 6} y={py1 + 30} size={12} bold color={C.bad}>products: 3 dB per dB</T>
        <T x={(px0 + px1) / 2} y={py0 + 18} anchor="middle" size={12} color={C.muted}>level of each of the two input tones, dBm →</T>
        <rect x={424} y={18} width={202} height={214} rx={12} fill={C.fill} />
        <T x={525} y={42} anchor="middle" size={13} color={C.muted}>each tone</T>
        <T x={525} y={68} anchor="middle" bold size={22} mono color={C.signal}>{m(p)} dBm</T>
        <T x={525} y={102} anchor="middle" size={13} color={C.muted}>3rd-order product</T>
        <T x={525} y={128} anchor="middle" bold size={22} mono color={C.bad}>{m(im)} dBm</T>
        <T x={525} y={150} anchor="middle" size={12} mono color={C.muted}>3 × {m(p)} − 2 × {IIP3}</T>
        <T x={525} y={186} anchor="middle" bold size={14} color={audible ? C.bad : C.good}>{audible ? 'above the noise: heard' : 'below the noise: hidden'}</T>
        <T x={525} y={210} anchor="middle" size={12} color={C.muted}>products {Math.round(p - im)} dB below tones</T>
      </Diagram>
      <Controls>
        <Slider label="Level of each tone" value={p} min={-60} max={0} step={1} onChange={setP} format={(v) => `${m(v)} dBm`} color="var(--d-signal)" />
        <Readout label="3rd-order product" value={m(im)} unit=" dBm" color={audible ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
