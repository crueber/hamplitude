import { C, Diagram, Ln, T } from '../kit'

// Envelope of "CQ" in Morse (-.-. --.-) at 1 unit = 5 px; used schematically
function Env({ x, y, w }: { x: number; y: number; w: number }) {
  const seq: [number, number][] = [[3, 1], [1, 1], [3, 1], [1, 3], [3, 1], [3, 1], [1, 1], [3, 0]]
  const unit = (w - 4) / 27.5
  let cx = x + 2
  return (
    <g>
      {seq.map(([on, off], i) => {
        const r = <rect key={i} x={cx} y={y} width={on * unit} height={10} rx={3} fill={C.signal} />
        cx += (on + off) * unit
        return r
      })}
    </g>
  )
}

/** How a decoder turns tone bursts into letters. */
export function CwDecoding_Pipeline() {
  const steps = [
    { x: 12, h: '1  Hear the tone', s: 'Filter one pitch' },
    { x: 172, h: '2  On or off', s: 'Above a level?' },
    { x: 332, h: '3  Measure', s: 'Time each tone' },
    { x: 492, h: '4  Classify', s: 'Dit, dah or gap' },
  ]
  return (
    <Diagram w={640} h={242} title="Four steps a CW decoder performs: filter the audio around the tone, decide on or off by a level threshold, measure the length of each on and off period, then classify them as dits, dahs and gaps and look the pattern up as letters. Noise causes errors at the on or off decision, and uneven sending at the classification"
      caption="A decoder is only as good as its on/off decision. Noise and fading fool step 2; uneven hand sending fools step 4.">
      {steps.map((s, i) => (
        <g key={s.h}>
          <rect x={s.x} y={14} width={136} height={118} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
          <T x={s.x + 68} y={34} anchor="middle" size={13.5} bold>{s.h}</T>
          <T x={s.x + 68} y={116} anchor="middle" size={12.5} color={C.muted}>{s.s}</T>
          {i < 3 && <Ln x1={s.x + 138} y1={69} x2={s.x + 158} y2={69} color={C.muted} width={2} arrow />}
        </g>
      ))}
      {/* 1: sine burst */}
      <polyline points={Array.from({ length: 49 }, (_, i) => `${28 + i * 2.2},${70 + (i < 6 || i > 42 ? 0.4 : 1) * Math.sin(i * 1.3) * 16}`).join(' ')} fill="none" stroke={C.signal} strokeWidth={2.2} />
      {/* 2: threshold */}
      <Ln x1={188} y1={84} x2={296} y2={84} color={C.bad} width={1.5} dash="4 4" />
      <rect x={196} y={52} width={24} height={26} fill={C.signal} fillOpacity={0.35} />
      <rect x={236} y={52} width={40} height={26} fill={C.signal} fillOpacity={0.35} />
      <T x={192} y={98} size={12} color={C.bad}>threshold</T>
      {/* 3: timing bars */}
      <Env x={346} y={64} w={108} />

      {/* 4 */}
      <T x={560} y={60} anchor="middle" size={14} mono bold>- . - .</T>
      <T x={560} y={82} anchor="middle" size={20} bold color={C.good}>C</T>
      <Ln x1={14} y1={156} x2={626} y2={156} color={C.fill2} width={1.5} />
      <T x={14} y={178} size={13} bold>Why it is hard</T>
      <T x={14} y={202} size={13} color={C.muted}>Static, fading and neighbours make the on/off decision ambiguous.</T>
      <T x={14} y={222} size={13} color={C.muted}>Hand-sent code has uneven spacing, so a 3:1 ratio rule fails.</T>
    </Diagram>
  )
}
