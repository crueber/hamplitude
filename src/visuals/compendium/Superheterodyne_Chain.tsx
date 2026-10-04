import { C, Diagram, Ln, T, Lines } from '../kit'

const BW = 92, STEP = 107, X0 = 7.5
const bx = (i: number) => X0 + i * STEP
const cx = (i: number) => bx(i) + BW / 2

/** Superhet receiver with a worked frequency example: 14.200 MHz in, 9 MHz IF, 700 Hz tone out. */
export function Superheterodyne_Chain() {
  const names = ['Antenna', 'RF stage', 'Mixer', 'IF filter', 'Detector', 'Audio amp']
  const freqs: [string, string][] = [
    ['14.200 MHz', '+ whole band'],
    ['14.200 MHz', 'band-pass'],
    ['9.000 MHz', 'LO minus RF'],
    ['9.000 MHz', 'narrow, fixed'],
    ['700 Hz', 'BFO minus IF'],
    ['700 Hz', 'louder'],
  ]
  return (
    <Diagram w={640} h={330}
      title="Superheterodyne receiver with a worked example: a 14.200 MHz signal is mixed with a 23.200 MHz local oscillator to give a 9.000 MHz intermediate frequency; a 9.0007 MHz beat-frequency oscillator in the detector then gives a 700 Hz tone. The image frequency 32.200 MHz would also produce 9.000 MHz."
      caption="Worked example with a 9 MHz IF, tuned to a CW signal at 14.200 MHz. Everything right of the mixer stays on 9 MHz however you tune.">
      {names.map((n, i) => (
        <g key={n}>
          <rect x={bx(i)} y={50} width={BW} height={44} rx={10} fill={C.fill} stroke={i === 2 || i === 3 || i === 4 ? C.resist : C.signal} strokeWidth={2} />
          <T x={cx(i)} y={72} anchor="middle" bold size={13.5}>{n}</T>
          {i < 5 && <Ln x1={bx(i) + BW + 2} y1={72} x2={bx(i + 1) - 2} y2={72} color={C.signal} width={2.5} arrow />}
          <T x={cx(i)} y={16} anchor="middle" mono bold size={13} color={i < 2 ? C.signal : i < 4 ? C.resist : C.power}>{freqs[i][0]}</T>
          <T x={cx(i)} y={34} anchor="middle" size={12} color={C.muted}>{freqs[i][1]}</T>
        </g>
      ))}
      {/* fixed-IF bracket */}
      <Ln x1={bx(2)} y1={116} x2={bx(4) + BW} y2={116} color={C.resist} width={2} />
      <Ln x1={bx(2)} y1={110} x2={bx(2)} y2={116} color={C.resist} width={2} />
      <Ln x1={bx(4) + BW} y1={110} x2={bx(4) + BW} y2={116} color={C.resist} width={2} />
      <T x={(bx(2) + bx(4) + BW) / 2} y={134} anchor="middle" size={12.5} bold color={C.resist}>fixed 9 MHz from here</T>

      {/* LO and BFO */}
      <rect x={cx(2) - 80} y={158} width={160} height={50} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={cx(2)} y={175} anchor="middle" bold size={13}>Local oscillator</T>
      <T x={cx(2)} y={194} anchor="middle" mono bold size={13} color={C.resist}>23.200 MHz</T>
      <Ln x1={cx(2)} y1={156} x2={cx(2)} y2={96} color={C.resist} width={2.5} arrow />
      <T x={cx(2) - 8} y={140} anchor="end" size={12} color={C.muted}>tuning knob</T>
      <rect x={cx(4) - 80} y={158} width={160} height={50} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={cx(4)} y={175} anchor="middle" bold size={13}>BFO</T>
      <T x={cx(4)} y={194} anchor="middle" mono bold size={13} color={C.power}>9.0007 MHz</T>
      <Ln x1={cx(4)} y1={156} x2={cx(4)} y2={96} color={C.power} width={2.5} arrow />

      {/* arithmetic */}
      <rect x={10} y={228} width={620} height={90} rx={10} fill={C.fill2} stroke={C.muted} strokeOpacity={0.4} />
      <Lines x={24} y={246} size={13} lh={22} mono lines={[
        'LO − RF = IF     23.200 − 14.200 = 9.000 MHz',
        'image = LO + IF  23.200 + 9.000 = 32.200 MHz: also gives 9.000',
        'BFO − IF = tone  9.0007 − 9.000 = 0.0007 MHz = 700 Hz',
      ]} />
    </Diagram>
  )
}
