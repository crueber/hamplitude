import { C, Diagram, Ln, T } from '../kit'

const TH = (25 * Math.PI) / 180 // example takeoff angle
const tan = Math.tan(TH)

/** The ground acts like a mirror: a horizontal antenna's image is reversed, a vertical antenna's image points the same way. */
export function GroundAndHeight_Image() {
  const gy = 202 // ground line
  const panel = (ox: number, h: number, kind: 'horiz' | 'vert') => {
    const sx = ox + 52 // antenna x
    const sy = gy - h // antenna (centre) y
    const iy = gy + h // image y
    const bx = sx + h / tan // ground bounce x
    const ex = ox + 240
    const dyDirect = (ex - sx) * tan
    const dyRefl = (ex - bx) * tan
    return (
      <g>
        <rect x={ox} y={gy} width={304} height={100} fill={C.fill} />
        <Ln x1={ox} y1={gy} x2={ox + 304} y2={gy} color={C.muted} width={3} />
        <T x={ox + 298} y={gy + 86} size={12.5} anchor="end" color={C.muted}>ground acts as a mirror</T>
        {/* image */}
        {kind === 'horiz' ? (
          <>
            <circle cx={sx} cy={sy} r={9} fill={C.bg} stroke={C.ink} strokeWidth={3} />
            <Ln x1={sx - 4.5} y1={sy - 4.5} x2={sx + 4.5} y2={sy + 4.5} color={C.current} width={2.5} />
            <Ln x1={sx - 4.5} y1={sy + 4.5} x2={sx + 4.5} y2={sy - 4.5} color={C.current} width={2.5} />
            <circle cx={sx} cy={iy} r={9} fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="4 3" />
            <circle cx={sx} cy={iy} r={3} fill={C.current} />
          </>
        ) : (
          <>
            <Ln x1={sx} y1={gy} x2={sx} y2={gy - 2 * h} color={C.ink} width={5} />
            <Ln x1={sx + 13} y1={gy - 14} x2={sx + 13} y2={gy - 2 * h + 16} color={C.current} width={3} arrow />
            <Ln x1={sx} y1={gy} x2={sx} y2={gy + 2 * h} color={C.muted} width={5} dash="5 4" />
            <Ln x1={sx + 13} y1={gy + 2 * h - 16} x2={sx + 13} y2={gy + 14} color={C.current} width={3} arrow />
          </>
        )}
        {/* direct ray */}
        <Ln x1={sx + 14} y1={sy - 14 * tan} x2={ex} y2={sy - dyDirect} color={C.signal} width={3} arrow />
        {/* reflected ray: from the image, through the ground, on to the distant station */}
        <Ln x1={sx + 14} y1={iy - 14 * tan} x2={bx} y2={gy} color={C.signal} width={2} dash="4 4" />
        <Ln x1={bx} y1={gy} x2={ex} y2={gy - dyRefl} color={C.signal} width={3} arrow />
        <T x={ex + 8} y={sy - dyDirect} size={12.5} color={C.signal} bold>direct</T>
        <T x={ex + 8} y={gy - dyRefl} size={12.5} color={C.signal} bold>reflected</T>
        <T x={sx + 22} y={iy + (kind === 'horiz' ? 4 : 0)} size={12.5} color={C.muted}>image</T>
        {kind === 'horiz' && <T x={sx + 22} y={sy + 4} size={12.5} color={C.muted}>antenna</T>}
      </g>
    )
  }
  return (
    <Diagram w={640} h={350} title="The image idea. A horizontal wire over ground has an image below the surface carrying current the opposite way, so direct and reflected waves cancel at low angles. A vertical antenna's image carries current the same way, so they add at low angles."
      caption="Treat the ground as a mirror. The wave reflected from the ground behaves as if it came from an image of the antenna below the surface.">
      <T x={8} y={24} size={14} bold>Horizontal antenna</T>
      <T x={8} y={44} size={12.5} color={C.muted}>image current reversed: low angles cancel</T>
      {panel(0, 56, 'horiz')}
      <T x={332} y={24} size={14} bold>Vertical antenna</T>
      <T x={332} y={44} size={12.5} color={C.muted}>image current the same way: low angles add</T>
      {panel(332, 44, 'vert')}
      <T x={8} y={318} size={12.5} color={C.muted}>× current into the page, • current out of it (wire seen end-on)</T>
      <T x={8} y={336} size={12.5} color={C.muted}>Schematic at a 25° takeoff angle. Real ground is not a perfect mirror.</T>
    </Diagram>
  )
}
