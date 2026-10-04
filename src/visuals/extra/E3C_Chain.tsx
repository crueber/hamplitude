import { C, Diagram, Ln, T } from '../kit'

function Lane({ y, color, title, note, boxes, dash }: { y: number; color: string; title: string; note: string; boxes: string[]; dash?: string }) {
  return (
    <g>
      <T x={20} y={y} size={16} bold color={color}>{title}</T>
      <T x={320} y={y + 30} anchor="middle" size={13} color={C.muted}>{note}</T>
      <T x={20} y={y + 58} size={13} bold color={C.resist}>Sun</T>
      <T x={620} y={y + 58} anchor="end" size={13} bold color={C.current}>Earth</T>
      <Ln x1={62} y1={y + 58} x2={570} y2={y + 58} color={color} width={4} dash={dash} arrow />
      {boxes.map((b, i) => (
        <g key={b}>
          <rect x={20 + i * 302} y={y + 82} width={298} height={36} rx={8} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={2} />
          <T x={169 + i * 302} y={y + 100} anchor="middle" size={14} bold color={color}>{b}</T>
        </g>
      ))}
    </g>
  )
}

/** A flare's light reaches Earth in about 8 minutes; the CME's particles take far longer. */
export function Chain() {
  return (
    <Diagram w={640} h={330} title="A solar flare sends X-rays that reach Earth in about eight minutes and cause a short-term radio blackout and a sudden rise in HF noise. A coronal mass ejection of charged particles arrives hours to days later and causes a geomagnetic storm"
      caption="Schematic timeline. Not to scale.">
      <Lane y={22} color={C.resist} title="1. Solar flare" note="X-rays travel at light speed: about 8 minutes" boxes={['short-term radio blackout', 'sudden rise in HF noise']} />
      <Lane y={180} color={C.power} title="2. Coronal mass ejection (CME)" note="charged particles: hours to days" boxes={['geomagnetic storm', 'CME impact: HF noise rises']} dash="10 8" />
    </Diagram>
  )
}
