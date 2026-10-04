import { C, Diagram, Ln, T, Antenna } from '../kit'

const BW = 92, STEP = 104, X0 = 8
const bx = (i: number) => X0 + i * STEP
const cx = (i: number) => bx(i) + BW / 2

/** Transmit and receive lanes with the parts they share highlighted: synthesizer, IF filter, T/R relay, antenna. */
export function TransceiverBlockDiagram_Shared() {
  const TY = 24, RY = 244, H = 44
  const tx = ['Mic + audio amp', 'Modulator', 'IF filter', 'Mixer', 'Power amp']
  const rx = ['Speaker + audio amp', 'Detector', 'IF filter', 'Mixer', 'RF amp + filter']
  const shared = (i: number) => i === 2 || i === 3
  const lane = (names: string[], y: number, dir: 1 | -1, color: string) =>
    names.map((n, i) => (
      <g key={n + y}>
        <rect x={bx(i)} y={y} width={BW} height={H} rx={10} fill={C.fill} stroke={shared(i) ? C.resist : color} strokeWidth={shared(i) ? 3 : 2} />
        <T x={cx(i)} y={y + H / 2} anchor="middle" bold size={12.5}>{n.includes('+') ? n.split(' + ')[0] + ' +' : n}</T>
        {n.includes('+') && <T x={cx(i)} y={y + H / 2 + 14} anchor="middle" bold size={12.5}>{n.split(' + ')[1]}</T>}
        {i < 4 && (dir === 1
          ? <Ln x1={bx(i) + BW + 2} y1={y + H / 2} x2={bx(i + 1) - 2} y2={y + H / 2} color={color} width={2.5} arrow />
          : <Ln x1={bx(i + 1) - 2} y1={y + H / 2} x2={bx(i) + BW + 2} y2={y + H / 2} color={color} width={2.5} arrow />)}
      </g>
    ))
  return (
    <Diagram w={640} h={330}
      title="Transceiver with shared parts highlighted. The transmit lane runs microphone, modulator, IF filter, mixer, power amplifier. The receive lane runs antenna side RF amplifier, mixer, IF filter, detector, speaker. The synthesizer feeds both mixers. The IF filter may be shared. A transmit-receive relay connects either the power amplifier or the receiver to the one antenna."
      caption="Amber outlines mark parts both paths can use. The relay lets one antenna serve both; the synthesizer is the single source of tuning.">
      <T x={X0} y={10} bold size={13} color={C.signal}>Transmit</T>
      {lane(tx, TY, 1, C.signal)}
      <T x={X0} y={RY + H + 18} bold size={13} color={C.current}>Receive</T>
      {lane(rx, RY, -1, C.current)}

      {/* synthesizer */}
      <rect x={cx(3) - 72} y={128} width={144} height={54} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={3} />
      <T x={cx(3)} y={146} anchor="middle" bold size={13}>Synthesizer</T>
      <T x={cx(3)} y={165} anchor="middle" size={12} color={C.muted}>one crystal reference</T>
      <Ln x1={cx(3)} y1={126} x2={cx(3)} y2={TY + H + 2} color={C.resist} width={2.5} arrow />
      <Ln x1={cx(3)} y1={184} x2={cx(3)} y2={RY - 2} color={C.resist} width={2.5} arrow />

      {/* shared IF filter hint */}
      <Ln x1={cx(2)} y1={TY + H + 2} x2={cx(2)} y2={RY - 2} color={C.resist} width={2} dash="4 4" arrow="both" />
      <T x={cx(2) - 10} y={146} anchor="end" size={12} color={C.muted}>often one filter,</T>
      <T x={cx(2) - 10} y={163} anchor="end" size={12} color={C.muted}>used both ways</T>

      {/* T/R relay + antenna */}
      <Ln x1={bx(4) + BW + 2} y1={TY + H / 2} x2={598} y2={TY + H / 2} color={C.signal} width={2.5} />
      <Ln x1={598} y1={TY + H / 2} x2={598} y2={106} color={C.signal} width={2.5} arrow />
      <Ln x1={598} y1={208} x2={598} y2={RY + H / 2} color={C.current} width={2.5} />
      <Ln x1={598} y1={RY + H / 2} x2={bx(4) + BW + 2} y2={RY + H / 2} color={C.current} width={2.5} arrow />
      <rect x={558} y={106} width={80} height={102} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={3} />
      <T x={598} y={122} anchor="middle" bold size={12.5}>T/R relay</T>
      <Antenna x={598} y={172} />
      <T x={598} y={190} anchor="middle" size={12} color={C.muted}>antenna</T>
    </Diagram>
  )
}
