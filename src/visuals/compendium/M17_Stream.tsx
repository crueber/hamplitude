import { C, Diagram, Ln, T } from '../kit'

/** Simplified shape of an M17 transmission: a link-setup header, then voice frames that each carry a slice of that header. */
export function M17_Stream() {
  const top = [
    { l: 'Sync', w: 56, c: C.muted },
    { l: 'Link setup: from, to, type', w: 190, c: C.power },
    { l: 'Frame 1', w: 72, c: C.signal },
    { l: 'Frame 2', w: 72, c: C.signal },
    { l: 'Frame 3', w: 72, c: C.signal },
    { l: '...', w: 40, c: C.muted },
    { l: 'End', w: 44, c: C.muted },
  ]
  let x = 14
  const pos = top.map((b) => { const p = x; x += b.w + 6; return p })
  const fx = 14, fw = [100, 200, 298]
  const parts = [
    { l: 'Sync', w: fw[0], c: C.muted, t: 'frame start' },
    { l: 'Slice of link setup', w: fw[1], c: C.power, t: 'who is calling, repeated' },
    { l: 'Voice + error protection', w: fw[2], c: C.signal, t: 'vocoder bits (Codec2)' },
  ]
  let px = fx
  const pp = parts.map((b) => { const p = px; px += b.w + 6; return p })
  return (
    <Diagram w={640} h={290}
      title="Simplified M17 transmission: a sync and link-setup header with the call signs, then a series of frames; each frame holds a sync, a slice of the link setup and protected voice data"
      caption="Simplified. Because every frame repeats a slice of the header, a receiver that tunes in late can still learn who is calling.">
      <T x={14} y={22} size={15} bold>One transmission, in time</T>
      {top.map((b, i) => (
        <g key={i}>
          <rect x={pos[i]} y={38} width={b.w} height={56} rx={8} fill={C.fill} stroke={b.c} strokeWidth={2} />
          <T x={pos[i] + b.w / 2} y={66} anchor="middle" size={12.5} bold color={b.c === C.muted ? C.ink : b.c}>{b.l}</T>
        </g>
      ))}
      <Ln x1={pos[3] + 36} y1={98} x2={pos[3] + 36} y2={132} color={C.muted} width={2} dash="4 4" arrow />
      <T x={pos[3] + 48} y={116} size={13} color={C.muted}>inside one frame</T>
      {parts.map((b, i) => (
        <g key={b.l}>
          <rect x={pp[i]} y={140} width={b.w} height={70} rx={8} fill={C.fill} stroke={b.c} strokeWidth={2} />
          <T x={pp[i] + b.w / 2} y={166} anchor="middle" size={13} bold color={b.c === C.muted ? C.ink : b.c}>{b.l}</T>
          <T x={pp[i] + b.w / 2} y={188} anchor="middle" size={12} color={C.muted}>{b.t}</T>
        </g>
      ))}
      <T x={14} y={246} size={13} color={C.muted}>Call signs travel inside the digital stream itself, not just in the audio.</T>
    </Diagram>
  )
}
