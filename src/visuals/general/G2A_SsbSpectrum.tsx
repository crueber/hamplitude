import { C, Diagram, Ln, T } from '../kit'

/** Double-sideband (AM) vs SSB: SSB sends one sideband only, so it is narrower and puts all power into the voice. */
export function G2A_SsbSpectrum() {
  const cx = 320
  const sb = (x0: number, x1: number, y: number, col: string, ghost = false) => (
    <path
      d={x0 < cx ? `M${x0},${y} L${x1 - 4},${y - 50} L${x1},${y}` : `M${x0},${y} L${x0 + 4},${y - 50} L${x1},${y}`}
      fill={ghost ? 'none' : col} fillOpacity={0.25} stroke={col} strokeWidth={ghost ? 1.8 : 2.5}
      strokeDasharray={ghost ? '5 4' : undefined} strokeLinejoin="round" opacity={ghost ? 0.7 : 1}
    />
  )
  const carrier = (y: number, ghost = false) => (
    <Ln x1={cx} y1={y} x2={cx} y2={y - 74} color={ghost ? C.muted : C.resist} width={ghost ? 1.8 : 3} dash={ghost ? '5 4' : undefined} />
  )
  const y1 = 110, y2 = 262
  return (
    <Diagram w={640} h={320} title="Spectrum of a double sideband AM signal, which has a carrier plus lower and upper sidebands, compared with a single sideband signal, which sends only the upper sideband. The carrier and the other sideband are suppressed, so SSB is narrower and puts all its power into one sideband" caption="SSB drops the carrier and one sideband: half the width, all the power in the voice.">
      <T x={16} y={18} size={14} bold>Double sideband (AM)</T>
      <Ln x1={30} y1={y1} x2={610} y2={y1} color={C.muted} width={1.5} />
      {sb(cx - 125, cx - 12, y1, C.resist)}
      {sb(cx + 12, cx + 125, y1, C.current)}
      {carrier(y1)}
      <T x={cx} y={y1 - 84} anchor="middle" size={13} bold color={C.resist}>carrier</T>
      <T x={cx - 68} y={y1 + 14} anchor="middle" size={13} color={C.muted}>lower sideband</T>
      <T x={cx + 68} y={y1 + 14} anchor="middle" size={13} color={C.muted}>upper sideband</T>
      <Ln x1={cx - 125} y1={y1 + 38} x2={cx + 125} y2={y1 + 38} color={C.ink} width={2} arrow="both" />
      <T x={cx + 142} y={y1 + 38} size={13} bold>2 sidebands wide</T>

      <T x={16} y={176} size={14} bold>Single sideband (upper shown)</T>
      <Ln x1={30} y1={y2} x2={610} y2={y2} color={C.muted} width={1.5} />
      {sb(cx - 125, cx - 12, y2, C.muted, true)}
      {carrier(y2, true)}
      {sb(cx + 12, cx + 125, y2, C.current)}
      <T x={cx - 68} y={y2 - 24} anchor="middle" size={13} color={C.muted}>suppressed</T>
      <T x={cx} y={y2 - 84} anchor="middle" size={13} color={C.muted}>suppressed</T>
      <T x={cx + 68} y={y2 + 14} anchor="middle" size={13} bold color={C.current}>the only one sent</T>
      <Ln x1={cx + 12} y1={y2 + 38} x2={cx + 125} y2={y2 + 38} color={C.good} width={2.5} arrow="both" />
      <T x={cx + 142} y={y2 + 38} size={13} bold color={C.good}>half the width</T>
    </Diagram>
  )
}
