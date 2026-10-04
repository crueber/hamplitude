import { C, Diagram, Ln, T, Lines } from '../kit'

/** Ferrite on a coax: inside currents cancel, the common-mode current on the outside of the shield meets impedance. */
export function CommonMode() {
  const cy = 150
  return (
    <Diagram w={640} h={310} title="A coax cable from radio to antenna. Inside, the signal current and the shield return current are equal and opposite and pass the ferrite without trouble. Unwanted common-mode current flows along the outside of the shield. The ferrite adds impedance to that path, so it is cut down."
      caption="The ferrite adds impedance to common-mode current only. The wanted signal passes untouched.">
      <T x={40} y={cy + 66} anchor="middle" bold size={14}>Radio</T>
      <T x={600} y={cy + 66} anchor="middle" bold size={14}>Antenna</T>
      <rect x={14} y={cy - 24} width={52} height={48} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <rect x={574} y={cy - 24} width={52} height={48} rx={8} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <rect x={66} y={cy - 18} width={508} height={36} fill={C.fill} stroke={C.muted} strokeWidth={2.5} />
      <line x1={66} y1={cy} x2={574} y2={cy} stroke={C.muted} strokeWidth={2} />
      <Ln x1={110} y1={cy - 7} x2={250} y2={cy - 7} color={C.signal} width={3} arrow />
      <Ln x1={250} y1={cy + 8} x2={110} y2={cy + 8} color={C.signal} width={3} arrow />
      <T x={180} y={cy + 32} anchor="middle" size={12} bold color={C.signal}>equal and opposite</T>
      <Ln x1={390} y1={cy - 7} x2={540} y2={cy - 7} color={C.signal} width={3} arrow />
      <Ln x1={540} y1={cy + 8} x2={390} y2={cy + 8} color={C.signal} width={3} arrow />
      <T x={470} y={cy + 32} anchor="middle" size={12} bold color={C.signal}>they cancel outside</T>
      {/* ferrite */}
      <rect x={290} y={cy - 40} width={60} height={80} rx={10} fill={C.fill2} stroke={C.power} strokeWidth={3} />
      <T x={320} y={cy} anchor="middle" bold size={14} color={C.power}>ferrite</T>
      {/* common-mode on outside */}
      <Ln x1={540} y1={cy - 56} x2={360} y2={cy - 56} color={C.bad} width={4.5} arrow />
      <Ln x1={280} y1={cy - 56} x2={90} y2={cy - 56} color={C.bad} width={1.5} arrow />
      <T x={470} y={cy - 78} anchor="middle" size={13} bold color={C.bad}>common-mode current</T>
      <T x={470} y={cy - 98} anchor="middle" size={12} color={C.muted}>on the outside of the shield</T>
      <T x={185} y={cy - 74} anchor="middle" size={13} bold color={C.bad}>much weaker</T>
      <Lines x={320} y={252} anchor="middle" size={13} color={C.muted} lh={20} lines={['Ferrite = impedance in the path of the unwanted current.', 'It does not cancel it or convert it to another mode.']} />
    </Diagram>
  )
}
