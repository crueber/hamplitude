import { C, Diagram, T } from '../kit'

/** Cross-sections: a flat strap has far more surface than a round wire, and RF travels on the surface. */
export function Strap() {
  return (
    <Diagram w={640} h={220} title="Cross-section of a round wire and a flat copper strap: the strap has much more surface area, where RF current flows"
      caption="Highlighted outline = where RF current flows. The strap has far more of it.">
      <g>
        <circle cx={170} cy={96} r={22} fill={C.resist} opacity={0.5} stroke={C.signal} strokeWidth={4} />
        <T x={170} y={150} anchor="middle" bold size={14}>Round wire</T>
        <T x={170} y={170} anchor="middle" size={13} color={C.muted}>little surface</T>
      </g>
      <g>
        <rect x={340} y={90} width={200} height={12} rx={2} fill={C.resist} opacity={0.5} stroke={C.signal} strokeWidth={4} />
        <T x={440} y={150} anchor="middle" bold size={14} color={C.good}>Flat copper strap</T>
        <T x={440} y={170} anchor="middle" size={13} color={C.muted}>lots of surface: best for RF bonding</T>
      </g>
      <T x={20} y={26} size={13} color={C.muted}>RF current rides on the surface of a conductor</T>
    </Diagram>
  )
}
