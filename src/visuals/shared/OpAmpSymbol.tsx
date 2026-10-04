import { C, T } from '../kit'

/** Op-amp triangle. Centre-left x,y; width w, height h. Inverting (−) input on top, + below, output at the tip (x+w, y). */
export function OpAmpSymbol({ x, y, w = 150, h = 140, color = C.ink, fill = C.fill }: { x: number; y: number; w?: number; h?: number; color?: string; fill?: string }) {
  const top = y - h / 2, bot = y + h / 2
  return (
    <g>
      <polygon points={`${x},${top} ${x},${bot} ${x + w},${y}`} fill={fill} stroke={color} strokeWidth={3} strokeLinejoin="round" />
      <T x={x + 14} y={y - h / 4} size={18} bold color={color}>−</T>
      <T x={x + 14} y={y + h / 4} size={18} bold color={color}>+</T>
    </g>
  )
}
