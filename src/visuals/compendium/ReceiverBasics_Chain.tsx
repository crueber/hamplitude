import { C, Diagram, Ln, T, TAU, Lines } from '../kit'


export interface SpecItem {
  /** position across the panel, 0..1 */
  at: number
  /** height, 0..1 */
  h: number
  color?: string
  /** width in px; small values draw a thin spike, larger ones a soft block */
  w?: number
  /** drawn faint and dashed: present but removed or ignored at this point */
  dim?: boolean
}

/** A tiny spectrum sketch: a framed baseline with spikes and blocks. Shared by several radio-internals diagrams. */
export function Spec({ x, y, w, h, items, frame = true }: { x: number; y: number; w: number; h: number; items: SpecItem[]; frame?: boolean }) {
  const base = y + h - 8
  const top = y + 8
  return (
    <g>
      {frame && <rect x={x} y={y} width={w} height={h} rx={8} fill={C.fill} stroke={C.muted} strokeOpacity={0.45} />}
      <Ln x1={x + 6} y1={base} x2={x + w - 6} y2={base} color={C.muted} width={1.5} />
      {items.map((it, i) => {
        const cx = x + 10 + it.at * (w - 20)
        const hh = (base - top) * it.h
        const color = it.color ?? C.signal
        const bw = it.w ?? 0
        return bw > 3 ? (
          <rect key={i} x={cx - bw / 2} y={base - hh} width={bw} height={hh} rx={3} fill={color} fillOpacity={it.dim ? 0.12 : 0.5} stroke={color} strokeWidth={1.5} strokeDasharray={it.dim ? '3 3' : undefined} strokeOpacity={it.dim ? 0.6 : 1} />
        ) : (
          <Ln key={i} x1={cx} y1={base} x2={cx} y2={base - hh} color={color} width={3} dash={it.dim ? '3 4' : undefined} opacity={it.dim ? 0.55 : 1} />
        )
      })}
    </g>
  )
}

const BW = 90, STEP = 107, X0 = 7.5
const bx = (i: number) => X0 + i * STEP

function audio(x: number, y: number, w: number, h: number, amp: number) {
  const cy = y + h / 2
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const u = i / 60
    const v = (Math.sin(TAU * 3 * u) * 0.6 + Math.sin(TAU * 5.5 * u + 1) * 0.4) * Math.sin(Math.PI * u) ** 0.5
    pts.push(`${i ? 'L' : 'M'}${(x + 10 + u * (w - 20)).toFixed(1)},${(cy - v * amp).toFixed(1)}`)
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.fill} stroke={C.muted} strokeOpacity={0.45} />
      <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  )
}

/** The six jobs of a receiver, antenna to speaker, with a sketch of the signal after each one. */
export function ReceiverBasics_Chain() {
  const gy = 76, gh = 64
  const many: SpecItem[] = [
    { at: 0.08, h: 0.9, color: C.muted }, { at: 0.2, h: 0.55, color: C.muted }, { at: 0.34, h: 0.75, color: C.muted },
    { at: 0.5, h: 0.14, color: C.signal }, { at: 0.64, h: 0.95, color: C.muted }, { at: 0.78, h: 0.45, color: C.muted }, { at: 0.92, h: 0.7, color: C.muted },
  ]
  const rf: SpecItem[] = [
    { at: 0.08, h: 0.9, color: C.muted, dim: true }, { at: 0.2, h: 0.55, color: C.muted, dim: true }, { at: 0.34, h: 0.75, color: C.muted },
    { at: 0.5, h: 0.3, color: C.signal }, { at: 0.64, h: 0.95, color: C.muted }, { at: 0.78, h: 0.45, color: C.muted, dim: true }, { at: 0.92, h: 0.7, color: C.muted, dim: true },
  ]
  const mixed: SpecItem[] = [
    { at: 0.3, h: 0.75, color: C.muted }, { at: 0.5, h: 0.3, color: C.signal }, { at: 0.64, h: 0.95, color: C.muted },
  ]
  const filt: SpecItem[] = [
    { at: 0.3, h: 0.75, color: C.muted, dim: true }, { at: 0.5, h: 0.6, color: C.signal }, { at: 0.64, h: 0.95, color: C.muted, dim: true },
  ]
  const names = ['Antenna', 'RF stage', 'Mixer', 'IF filter', 'Detector', 'Audio amp']
  const notes = [
    ['Picks up every', 'signal at once,', 'all very weak'],
    ['Filters out of-', 'band signals,', 'adds some gain'],
    ['Moves the wanted', 'signal to one', 'fixed frequency'],
    ['Passes only the', 'wanted signal;', 'the rest is cut'],
    ['Recovers the', 'audio from the', 'radio signal'],
    ['Amplifies audio', 'to drive the', 'speaker'],
  ]
  return (
    <Diagram w={640} h={236}
      title="Receiver chain from antenna to speaker: antenna, RF stage, mixer, IF filter, detector, audio amplifier, each with a sketch of what the signal looks like after that stage"
      caption="Each stage does one job. The wanted signal (teal) starts tiny among stronger neighbours (grey) and ends as sound. Sketches are illustrative.">
      {names.map((n, i) => (
        <g key={n}>
          <rect x={bx(i)} y={10} width={BW} height={44} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
          <T x={bx(i) + BW / 2} y={32} anchor="middle" bold size={13.5}>{n}</T>
          {i < 5 && <Ln x1={bx(i) + BW + 2} y1={32} x2={bx(i + 1) - 2} y2={32} color={C.signal} width={2.5} arrow />}
          <Ln x1={bx(i) + BW / 2} y1={56} x2={bx(i) + BW / 2} y2={gy - 2} color={C.muted} width={1.5} dash="3 3" />
          <Lines x={bx(i) + BW / 2} y={gy + gh + 18} anchor="middle" size={12} color={C.muted} lh={16} lines={notes[i]} />
        </g>
      ))}
      <Spec x={bx(0)} y={gy} w={BW} h={gh} items={many} />
      <Spec x={bx(1)} y={gy} w={BW} h={gh} items={rf} />
      <Spec x={bx(2)} y={gy} w={BW} h={gh} items={mixed.map((m) => ({ ...m, at: m.at - 0.12 }))} />
      <Spec x={bx(3)} y={gy} w={BW} h={gh} items={filt.map((m) => ({ ...m, at: m.at - 0.12 }))} />
      {audio(bx(4), gy, BW, gh, 14)}
      {audio(bx(5), gy, BW, gh, 24)}
    </Diagram>
  )
}
