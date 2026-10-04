import { C, Diagram, Ln, T } from '../kit'

/** SAR: the rate at which the body absorbs RF energy. */
export function Sar() {
  return (
    <Diagram w={640} h={200} title="SAR, specific absorption rate, measures the rate at which RF energy is absorbed by the body, in watts per kilogram of tissue"
      caption="SAR is about absorbed energy, not signal strength or reflection.">
      <rect x={380} y={40} width={220} height={120} rx={14} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2.5} />
      <T x={490} y={72} anchor="middle" size={15} bold color={C.bad}>body tissue</T>
      <T x={490} y={98} anchor="middle" size={13} color={C.muted}>warms as RF is absorbed</T>
      {[56, 100, 144].map((y) => <Ln key={y} x1={200} y1={y} x2={374} y2={y} color={C.signal} width={3} dash="2 7" arrow />)}
      <rect x={24} y={60} width={110} height={80} rx={10} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      <T x={79} y={100} anchor="middle" size={14} bold>RF source</T>
      <T x={490} y={136} anchor="middle" size={20} bold color={C.power}>SAR = W/kg</T>
    </Diagram>
  )
}
