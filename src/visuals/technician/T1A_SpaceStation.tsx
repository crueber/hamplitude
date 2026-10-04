import { C, Diagram, Ln, T } from '../kit'

/** A space station is an amateur station more than 50 km above the Earth's surface. */
export function T1A_SpaceStation() {
  return (
    <Diagram w={640} h={250} title="A space station is an amateur station located more than 50 kilometers above the Earth's surface" caption="Defined by altitude, not by orbit or crew.">
      <path d="M0,250 Q320,190 640,250 Z" fill={C.fill2} />
      <T x={320} y={236} anchor="middle" size={13} color={C.muted}>Earth's surface</T>
      <Ln x1={10} y1={110} x2={630} y2={110} color={C.signal} width={2.5} dash="8 6" />
      <T x={620} y={96} anchor="end" bold size={14} color={C.signal}>50 km</T>
      {/* satellite */}
      <g transform="translate(150,52)">
        <rect x={-18} y={-12} width={36} height={24} rx={4} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <rect x={-62} y={-8} width={34} height={16} fill={C.signal} fillOpacity={0.25} stroke={C.ink} strokeWidth={1.5} />
        <rect x={28} y={-8} width={34} height={16} fill={C.signal} fillOpacity={0.25} stroke={C.ink} strokeWidth={1.5} />
        <Ln x1={0} y1={-12} x2={0} y2={-26} width={2} />
      </g>
      <T x={250} y={44} bold size={15} color={C.good}>Space station</T>
      <T x={250} y={66} size={13} color={C.muted}>amateur station above 50 km</T>
      {/* balloon */}
      <circle cx={380} cy={150} r={16} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Ln x1={380} y1={166} x2={380} y2={184} width={1.5} />
      <rect x={374} y={184} width={12} height={9} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
      <T x={410} y={146} bold size={14} color={C.bad}>Not a space station</T>
      <T x={410} y={166} size={13} color={C.muted}>below 50 km: balloon, aircraft</T>
    </Diagram>
  )
}
