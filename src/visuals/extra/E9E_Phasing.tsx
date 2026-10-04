import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T, TAU, fmt } from '../kit'

const OPTS = [
  { v: 0, label: 'Equal length lines (in phase)' },
  { v: 90, label: '¼ λ extra line (90°)' },
  { v: 180, label: '½ λ extra line (180°)' },
]

/** Two driven elements λ/4 apart. The phasing line sets their relative phase and so the pattern. */
export function Phasing() {
  const [ph, setPh] = useState(90)
  const R = 96, cx = 470, cy = 150
  // elements on the y axis: front element at +y (direction 90°), rear at -y; spacing λ/4
  const kd = TAU / 4
  const pts: string[] = []
  let max = 0
  const vals: number[] = []
  for (let i = 0; i <= 360; i++) {
    const th = (i * Math.PI) / 180
    // path difference toward direction th (measured from the +x axis); elements separated along y
    const psi = kd * Math.sin(th) + (ph * Math.PI) / 180
    const e = Math.abs(Math.cos(psi / 2))
    vals.push(e)
    max = Math.max(max, e)
  }
  vals.forEach((e, i) => {
    const th = (i * Math.PI) / 180
    const r = (e / max) * R
    pts.push(`${i ? 'L' : 'M'}${(cx + r * Math.cos(th)).toFixed(1)},${(cy - r * Math.sin(th)).toFixed(1)}`)
  })
  // which direction is quiet / strong
  const front = Math.abs(Math.cos((kd + (ph * Math.PI) / 180) / 2)) / max
  const back = Math.abs(Math.cos((-kd + (ph * Math.PI) / 180) / 2)) / max
  const desc = ph === 0 ? 'nearly round, a little stronger out the sides' : ph === 90 ? 'one-way: strong toward the element with the extra line, a null the other way' : 'figure-eight along the line of the elements, nulls out the sides'
  const short = ph === 0 ? 'almost round' : ph === 90 ? 'heart shape: one direction wins' : 'figure-eight along the elements'
  const lineLen = ph === 0 ? 0 : ph === 90 ? 40 : 80
  return (
    <>
      <Diagram w={640} h={300} title={`Two driven elements a quarter wavelength apart. With ${ph} degrees of phase between them the pattern is: ${desc}`}
        caption="Phasing lines delay the signal to each element. The delay sets how the two radiations add or cancel in each direction.">
        <T x={20} y={22} size={13} bold color={C.muted}>Top view</T>
        <Ln x1={80} y1={60} x2={80} y2={110} color={C.resist} width={8} />
        <Ln x1={80} y1={190} x2={80} y2={240} color={C.resist} width={8} />
        <T x={96} y={86} size={12} bold color={C.resist}>element A</T>
        <T x={96} y={214} size={12} bold color={C.resist}>element B</T>
        <T x={96} y={150} size={12} color={C.muted}>¼ λ apart</T>
        <Ln x1={80} y1={118} x2={80} y2={182} color={C.muted} width={1.5} arrow="both" dash="3 4" />
        {/* feed network */}
        <Ln x1={80} y1={110} x2={60} y2={110} color={C.ink} width={3} />
        <Ln x1={60} y1={110} x2={60} y2={150} color={C.ink} width={3} />
        <Ln x1={80} y1={190} x2={60} y2={190} color={C.ink} width={3} />
        <Ln x1={60} y1={190} x2={60} y2={150} color={C.ink} width={3} />
        <Ln x1={60} y1={150} x2={30} y2={150} color={C.ink} width={3} />
        <T x={26} y={122} size={12} bold>from</T>
        <T x={26} y={138} size={12} bold>radio</T>
        {lineLen > 0 && <path d={`M60,190 C${60 - 22},190 ${60 - 22},${190 + lineLen} 60,${190 + lineLen}`} fill="none" stroke={C.power} strokeWidth={4} />}
        {lineLen > 0 && <T x={40} y={190 + lineLen + 18} size={12} bold color={C.power}>phasing line</T>}
        {/* pattern */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={R / 2} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} color={C.fill2} width={1.5} />
        <Ln x1={cx} y1={cy - R - 10} x2={cx} y2={cy + R + 10} color={C.fill2} width={1.5} />
        <path d={pts.join('') + 'Z'} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <Ln x1={cx - 4} y1={cy - 7} x2={cx - 4} y2={cy - 17} color={C.resist} width={5} />
        <Ln x1={cx - 4} y1={cy + 7} x2={cx - 4} y2={cy + 17} color={C.resist} width={5} />
        <T x={cx + 10} y={cy - 14} size={12} bold color={C.resist}>A</T>
        <T x={cx + 10} y={cy + 16} size={12} bold color={C.resist}>B</T>
        <T x={cx} y={32} anchor="middle" size={13} bold color={C.muted}>Radiation pattern</T>
        <T x={cx} y={cy + R + 26} anchor="middle" size={13} bold color={C.signal}>{short}</T>
      </Diagram>
      <Controls>
        <Readout label="Toward element A (top)" value={fmt(front * 100, 3)} unit="% of max" color="var(--d-signal)" />
        <Readout label="Toward element B (bottom)" value={fmt(back * 100, 3)} unit="% of max" color="var(--d-signal)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Phase between elements" value={ph} onChange={setPh} options={OPTS.map((o) => ({ value: o.v, label: o.label }))} />
      </div>
    </>
  )
}
