import { useState } from 'react'
import { Antenna, C, Choice, Diagram, Ln, T, useTime } from '../kit'

const BW = 90, BH = 50, GAP = 24
const bx = (i: number) => 10 + (BW + GAP) * i
const TX_Y = 28, MID_Y = 128, RX_Y = 232

type Pt = [number, number]
function along(pts: Pt[], p: number): Pt {
  const lens = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]))
  let d = p * lens.reduce((a, b) => a + b, 0)
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) return [pts[i][0] + ((pts[i + 1][0] - pts[i][0]) * d) / lens[i], pts[i][1] + ((pts[i + 1][1] - pts[i][1]) * d) / lens[i]]
    d -= lens[i]
  }
  return pts[pts.length - 1]
}

/** Transceiver block diagram. Toggle the PTT to see which path is live. */
export function TransceiverBlocks() {
  const [tx, setTx] = useState(false)
  const { t, ref } = useTime(0.5)
  const blk = (i: number, y: number, label: string, on: boolean, color = C.signal) => (
    <g opacity={on ? 1 : 0.38}>
      <rect x={bx(i)} y={y} width={BW} height={BH} rx={10} fill={C.fill} stroke={on ? color : C.muted} strokeWidth={2} />
      <T x={bx(i) + BW / 2} y={y + BH / 2} anchor="middle" bold size={13}>{label}</T>
    </g>
  )
  const arrow = (x1: number, y1: number, x2: number, y2: number, on: boolean) => (
    <Ln x1={x1} y1={y1} x2={x2} y2={y2} color={on ? C.signal : C.muted} width={2.5} arrow opacity={on ? 1 : 0.38} />
  )
  const hArrows = (y: number, on: boolean, dir: 1 | -1) =>
    [0, 1, 2, 3].map((i) => {
      const a = bx(i) + BW + 2, b = bx(i + 1) - 2
      return <g key={i}>{dir === 1 ? arrow(a, y, b, y, on) : arrow(b, y, a, y, on)}</g>
    })
  const cx = bx(4) + BW / 2
  const txPath: Pt[] = [[bx(0) + BW / 2, TX_Y + BH / 2], [cx, TX_Y + BH / 2], [cx, MID_Y + 27]]
  const rxPath: Pt[] = [[cx, MID_Y + 27], [cx, RX_Y + BH / 2], [bx(0) + BW / 2, RX_Y + BH / 2]]
  const path = tx ? txPath : rxPath
  const pulses = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84].map((o) => along(path, (t * 0.3 + o) % 1))
  const vx = bx(3) + BW / 2
  return (
    <>
      <Diagram w={640} h={318} svgRef={ref} title="Transceiver block diagram. Transmit: microphone, modulator, filter, mixer, power amplifier, antenna. Receive: antenna, preamp, mixer, filter, demodulator, speaker. A VFO feeds both mixers."
        caption="One box, two paths. The PTT input decides which one is live.">
        {pulses.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={C.signal} opacity={0.9} />)}
        <T x={10} y={13} bold size={13} color={tx ? C.signal : C.muted}>TRANSMIT: voice becomes a radio signal</T>
        {blk(0, TX_Y, 'Microphone', tx)}
        {blk(1, TX_Y, 'Modulator', tx)}
        {blk(2, TX_Y, 'Filter', tx)}
        {blk(3, TX_Y, 'Mixer', tx)}
        {blk(4, TX_Y, 'Power amp', tx)}
        {hArrows(TX_Y + BH / 2, tx, 1)}
        {arrow(cx, TX_Y + BH + 2, cx, MID_Y - 2, tx)}

        <g>
          <rect x={bx(4)} y={MID_Y} width={BW} height={54} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
          <Antenna x={cx} y={MID_Y + 46} />
          <T x={bx(4) + BW + 8} y={MID_Y + 27} size={13} bold>Antenna</T>
        </g>

        <rect x={bx(3)} y={MID_Y + 2} width={BW} height={50} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
        <T x={vx} y={MID_Y + 19} anchor="middle" bold size={13}>VFO</T>
        <T x={vx} y={MID_Y + 37} anchor="middle" size={12} color={C.muted}>tuning knob</T>
        <Ln x1={vx} y1={MID_Y + 2} x2={vx} y2={TX_Y + BH + 2} color={C.resist} width={2.5} arrow />
        <Ln x1={vx} y1={MID_Y + 52} x2={vx} y2={RX_Y - 2} color={C.resist} width={2.5} arrow />

        <rect x={bx(0)} y={MID_Y} width={bx(1) + BW - bx(0)} height={54} rx={10} fill={C.fill} stroke={tx ? C.signal : C.muted} strokeWidth={2} />
        <T x={bx(0) + 102} y={MID_Y + 18} anchor="middle" bold size={13}>PTT input</T>
        <T x={bx(0) + 102} y={MID_Y + 38} anchor="middle" size={12} color={tx ? C.signal : C.muted} bold>{tx ? 'grounded = transmit' : 'open = receive'}</T>

        {blk(0, RX_Y, 'Speaker', !tx)}
        {blk(1, RX_Y, 'Demodulator', !tx)}
        {blk(2, RX_Y, 'Filter', !tx)}
        {blk(3, RX_Y, 'Mixer', !tx)}
        {blk(4, RX_Y, 'Preamp', !tx)}
        {hArrows(RX_Y + BH / 2, !tx, -1)}
        {arrow(cx, MID_Y + 56, cx, RX_Y - 2, !tx)}
        <T x={10} y={305} bold size={13} color={!tx ? C.signal : C.muted}>RECEIVE: radio signal becomes sound</T>

      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="PTT" value={tx ? 'tx' : 'rx'} onChange={(v) => setTx(v === 'tx')} options={[{ value: 'rx', label: 'PTT released: receive' }, { value: 'tx', label: 'PTT pressed: transmit' }]} />
      </div>
    </>
  )
}
