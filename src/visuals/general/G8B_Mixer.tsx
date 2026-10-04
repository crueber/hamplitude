import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const IF = 9
const f2 = (v: number) => v.toFixed(2)

/** Superhet mixing: LO - RF = IF. Tune the LO and a different RF lands on the IF. The image sits 2 x IF away. */
export function G8B_Mixer() {
  const [lo, setLo] = useState(23.2)
  const rf = lo - IF, image = lo + IF, sum = lo + rf
  const x = (f: number) => 30 + ((f - 10) / 30) * 580
  const ay = 262
  const mark = (f: number, col: string, name: string, sub: string, up: number) => (
    <g>
      <Ln x1={x(f)} y1={ay} x2={x(f)} y2={ay - 38} color={col} width={5} />
      <T x={x(f)} y={ay - 74 - up} anchor="middle" size={13} bold color={col}>{name}</T>
      <T x={x(f)} y={ay - 74 - up + 18} anchor="middle" size={12} mono color={col}>{sub}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={330} title={`A mixer with the local oscillator at ${f2(lo)} megahertz outputs the sum, ${f2(sum)}, and the difference, ${f2(IF)} megahertz, the IF. It receives the signal at ${f2(rf)} megahertz. The image at ${f2(image)} megahertz, twice the IF above the desired signal, also lands on the IF`}
        caption="Tune the local oscillator to pull a different signal onto the fixed IF. The image is the unwanted second one.">
        <Box2 x={14} y={14} w={150} h={54} stroke={C.signal} a="RF input" b={`${f2(rf)} MHz`} />
        <Box2 x={14} y={80} w={150} h={54} stroke={C.resist} a="Local oscillator" b={`${f2(lo)} MHz`} />
        <circle cx={262} cy={74} r={30} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <path d="M248,60 L276,88 M276,60 L248,88" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={164} y1={41} x2={236} y2={64} color={C.signal} width={2.5} arrow />
        <Ln x1={164} y1={107} x2={236} y2={84} color={C.resist} width={2.5} arrow />
        <Ln x1={292} y1={64} x2={360} y2={40} color={C.power} width={2.5} arrow />
        <Ln x1={292} y1={84} x2={360} y2={110} color={C.muted} width={2.5} arrow dash="6 4" />
        <rect x={364} y={10} width={266} height={62} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
        <T x={497} y={28} anchor="middle" size={14} bold>Difference = IF</T>
        <T x={497} y={52} anchor="middle" size={13} bold mono color={C.power}>{f2(lo)} − {f2(rf)} = {f2(IF)} MHz</T>
        <rect x={364} y={80} width={266} height={62} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        <T x={497} y={98} anchor="middle" size={14} bold color={C.muted}>Sum (filtered out)</T>
        <T x={497} y={122} anchor="middle" size={13} mono color={C.muted}>{f2(lo)} + {f2(rf)} = {f2(sum)} MHz</T>
        <T x={30} y={160} size={13} bold color={C.muted}>Where the signals sit</T>
        <Ln x1={30} y1={ay} x2={610} y2={ay} color={C.muted} width={2} />
        {[10, 15, 20, 25, 30, 35, 40].map((f) => (
          <g key={f}>
            <Ln x1={x(f)} y1={ay} x2={x(f)} y2={ay + 6} color={C.muted} width={1.5} />
            <T x={x(f)} y={ay + 18} anchor="middle" size={12} color={C.muted}>{f}</T>
          </g>
        ))}
        <T x={610} y={ay + 36} anchor="end" size={12} color={C.muted}>MHz</T>
        {mark(rf, C.signal, 'wanted', f2(rf), 0)}
        {mark(lo, C.resist, 'LO', f2(lo), 0)}
        {mark(image, C.bad, 'image', f2(image), 0)}
        <Ln x1={x(rf) + 4} y1={ay - 20} x2={x(lo) - 4} y2={ay - 20} color={C.power} width={2} arrow="both" />
        <T x={(x(rf) + x(lo)) / 2} y={ay - 32} anchor="middle" size={12} bold color={C.power}>IF</T>
        <Ln x1={x(lo) + 4} y1={ay - 20} x2={x(image) - 4} y2={ay - 20} color={C.power} width={2} arrow="both" />
        <T x={(x(lo) + x(image)) / 2} y={ay - 32} anchor="middle" size={12} bold color={C.power}>IF</T>
        <T x={(x(rf) + x(image)) / 2} y={ay + 40} anchor="middle" size={13} bold color={C.bad}>image = wanted + 2 × IF</T>
      </Diagram>
      <Controls>
        <Slider label="Tune the local oscillator" value={lo} min={22.9} max={23.6} step={0.05} onChange={setLo} format={(v) => `${f2(v)} MHz`} color="var(--d-resist)" />
        <Readout label="Wanted signal" value={`${f2(rf)} MHz`} color="var(--d-signal)" />
        <Readout label="Image" value={`${f2(image)} MHz`} color="var(--d-bad)" />
      </Controls>
    </>
  )
}

function Box2({ x, y, w, h, stroke, a, b }: { x: number; y: number; w: number; h: number; stroke: string; a: string; b: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.fill} stroke={stroke} strokeWidth={2} />
      <T x={x + w / 2} y={y + 18} anchor="middle" size={14} bold>{a}</T>
      <T x={x + w / 2} y={y + 40} anchor="middle" size={13} bold mono color={stroke}>{b}</T>
    </g>
  )
}
